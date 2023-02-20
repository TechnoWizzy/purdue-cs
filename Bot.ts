import {
    ActivityType, AttachmentBuilder,
    ButtonInteraction,
    ChatInputCommandInteraction,
    Client,
    ClientOptions,
    Collection, EmbedBuilder,
    Guild,
    GuildMember,
    IntentsBitField,
    ModalSubmitInteraction, PermissionsBitField,
    REST,
    Role,
    SelectMenuInteraction, StringSelectMenuInteraction,
    TextChannel,
    User
} from "discord.js";
import * as config from "./config.json";
import Logger from "./Logger";
import * as fs from "fs";
import {Routes} from "discord-api-types/v9";
import InteractionStatus, {InteractionType} from "./InteractionStatus";
import Database from "./Database";
import Student from "./Student";
import PurdueModal from "./modals/Purdue.Modal";
import {bot} from "./app";
import Verifier from "./Verifier";

const options = {
    intents: [
        IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildBans, IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages, IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildMessageReactions, IntentsBitField.Flags.DirectMessageReactions
    ]
} as ClientOptions;

export default class Bot extends Client {
    private _guild: Guild;
    private _logger: Logger;
    private _database: Database;
    private _verifier: Verifier;
    private _commands: Collection<any, any>;

    public constructor() {
        super(options);
        this.commands = new Collection();
    }

    get guild() {
        return this._guild;
    }

    get logger() {
        return this._logger;
    }

    get database() {
        return this._database;
    }

    get verifier(): Verifier {
        return this._verifier;
    }

    get commands(): Collection<any, any> {
        return this._commands;
    }

    set commands(value: Collection<any, any>) {
        this._commands = value;
    }

    async init() {

        this._guild = await this.guilds.fetch(config.guild.id);
        this._logger = new Logger(await bot.guild.channels.fetch(config.guild.channels.logs) as TextChannel);
        this._database = new Database();
        this._verifier = new Verifier();

        switch (config.status.type) {
            case "PLAYING": bot.user.setActivity({name: config.status.name, type: ActivityType.Playing}); break;
            case "STREAMING": bot.user.setActivity({name: config.status.name, type: ActivityType.Streaming}); break;
            case "LISTENING": bot.user.setActivity({name: config.status.name, type: ActivityType.Listening}); break;
            case "WATCHING": bot.user.setActivity({name: config.status.name, type: ActivityType.Watching}); break;
            case "COMPETING": bot.user.setActivity({name: config.status.name, type: ActivityType.Competing}); break;
        }

        await this.initCommands(config.token);
        await this.database.init();
    }

    async initCommands(token: string) {
        const guildCommands = [];
        const globalCommands = [];
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        const rest = new REST({ version: '9' }).setToken(token);
        const id = this.application.id;
        const guild = this.guilds.cache.get(config.guild.id);

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            if (command.global) globalCommands.push(command.data.toJSON());
            else guildCommands.push(command.data.toJSON());
            await this._commands.set(command.data.name, command);
        }

        try {
            await rest.put(Routes.applicationGuildCommands(id, guild.id), {body: guildCommands});
            await rest.put(Routes.applicationCommands(id), {body: globalCommands});
        } catch (error) {
            await this.logger.error("Error uploading application commands", error);
        }
    }

    public async handleButton(interaction: ButtonInteraction): Promise<InteractionStatus> {
        const user: User = interaction.user;
        const role: Role = await this.guild.roles.fetch(interaction.customId);

        try {

            if (!role) {
                await interaction.reply({content: "This is a legacy course/role. You can't have it, sorry!", ephemeral: true});
                return;
            }

            const member: GuildMember = await this.guild.members.fetch(user);

            /*
            if (role.id == config.guild.roles.specialty.verified) {

                const student: Student = await Student.get(user.id);

                if (student && student.status) {
                    await member.roles.add(role.id);
                    await interaction.reply({content: `You are verified. Thank you!`, ephemeral: true});
                } else {
                    await interaction.showModal(new PurdueModal());
                }
            } else {
                if (member.roles.cache.has(role.id)) {
                    await member.roles.remove(role.id);
                    await interaction.reply({content: `You removed **<@&${role.id}>**.`, ephemeral: true});
                } else {
                    await member.roles.add(role.id);
                    await interaction.reply({content: `You applied **<@&${role.id}>**.`, ephemeral: true});
                }
            }
             */

            if (member.roles.cache.has(role.id)) {

                await member.roles.remove(role.id);
                await interaction.reply({content: `You removed **<@&${role.id}>**.`, ephemeral: true});
            } else {
                const blacklist = JSON.parse(fs.readFileSync("./blacklist.json").toString());
                if (blacklist[role.id] != null && blacklist[role.id].includes(member.id)) {
                    await interaction.reply({content: "I'm sorry, you have been blacklisted from this role, please contact an admin if you believe this is in error.", ephemeral: true});
                    return;
                }
                await member.roles.add(role.id);
                await interaction.reply({content: `You applied **<@&${role.id}>**.`, ephemeral: true});
            }

            return new InteractionStatus(InteractionType.Button, user, true, null);

        } catch (error) {
            return new InteractionStatus(InteractionType.Button, user, false, error);
        }
    }

    public async handleCommand(interaction: ChatInputCommandInteraction): Promise<InteractionStatus> {
        const user = interaction.user;
        const command = this.commands.get(interaction.commandName);

        try {
            await command.execute(interaction);
            return new InteractionStatus(InteractionType.Command, user, true, null);
        } catch (error) {
            return new InteractionStatus(InteractionType.Command, user, false, error);
        }
    }

    public async handleSelectMenu(interaction: StringSelectMenuInteraction): Promise<InteractionStatus> {
        const user = interaction.user;

        try {

            return new InteractionStatus(InteractionType.Select, user, true, null);
        } catch (error) {
            return new InteractionStatus(InteractionType.Select, user, false, error);
        }
    }

    public async handleModalSubmit(interaction: ModalSubmitInteraction): Promise<InteractionStatus> {
        const user: User = interaction.user;
        const email: string = interaction.fields.getTextInputValue("email");

        try {
            if (!Verifier.isValidEmail(email)) {
                await interaction.reply({content: `The address you provided, \`${email}\`, is invalid. Please provide a valid Purdue address.`, ephemeral: true});
                return;
            }
            const username = user.username;
            const hash = Verifier.encrypt(user.id + "-" + Date.now());
            const token = hash.iv + "-" + hash.content;
            const url = `https://${config.url}/api/v1/students/verify/${token}`;
            await new Student(user.id, username, email, false).save();
            await interaction.reply({content: `An email was sent to \`${email}\`.`, ephemeral: true});
            await this.verifier.insert(user, interaction);
            Verifier.sendEmail(email, url);

            return new InteractionStatus(InteractionType.Modal, user, true, null);
        } catch (error) {
            return new InteractionStatus(InteractionType.Modal, user, false, error);
        }
    }
}
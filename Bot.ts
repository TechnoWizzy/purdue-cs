import {
    ActivityType,
    ButtonInteraction,
    ChatInputCommandInteraction,
    Client,
    ClientOptions,
    Collection,
    Guild,
    GuildMember,
    IntentsBitField,
    ModalSubmitInteraction,
    REST,
    Role,
    SelectMenuInteraction,
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
        IntentsBitField.Flags.DirectMessages, IntentsBitField.Flags.GuildPresences
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
        this._logger = new Logger(null);
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
            await this.logger.info("Application commands uploaded");
        } catch (error) {
            await this.logger.error("Error uploading application commands", error);
        }
    }

    public async handleButton(interaction: ButtonInteraction): Promise<InteractionStatus> {
        const user: User = interaction.user;
        const role: Role = await this.guild.roles.fetch(interaction.customId);

        try {

            if (!role) return new InteractionStatus(InteractionType.Button, user, false, new Error("Non-existent role"));

            const guildMember: GuildMember = await this.guild.members.fetch(user);

            /*
            if (role.id == config.guild.roles.specialty.verified) {

                const student: Student = await Student.get(user.id);

                if (student && student.status) {
                    await guildMember.roles.add(role.id);
                    await interaction.reply({content: `You are verified. Thank you!`, ephemeral: true});
                } else {
                    await interaction.showModal(new PurdueModal());
                }
            } else {
                if (guildMember.roles.cache.has(role.id)) {
                    await guildMember.roles.remove(role.id);
                    await interaction.reply({content: `You removed **<@&${role.id}>**.`, ephemeral: true});
                } else {
                    await guildMember.roles.add(role.id);
                    await interaction.reply({content: `You applied **<@&${role.id}>**.`, ephemeral: true});
                }
            }
             */

            if (guildMember.roles.cache.has(role.id)) {
                await guildMember.roles.remove(role.id);
                await interaction.reply({content: `You removed **<@&${role.id}>**.`, ephemeral: true});
            } else {
                await guildMember.roles.add(role.id);
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

    public async handleSelectMenu(interaction: SelectMenuInteraction): Promise<InteractionStatus> {
        const user = interaction.user;

        try {



            return new InteractionStatus(InteractionType.Menu, user, true, null);
        } catch (error) {
            return new InteractionStatus(InteractionType.Menu, user, false, error);
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
            const url = `https://www.technowizzy.dev/api/v1/students/verify/${token}`;
            await new Student(user.id, username, email, 0, false).save();
            await interaction.reply({content: `An email was sent to \`${email}\`.`, ephemeral: true});
            await this.verifier.insert(user, interaction);
            Verifier.sendEmail(email, url);

            return new InteractionStatus(InteractionType.Modal, user, true, null);
        } catch (error) {
            return new InteractionStatus(InteractionType.Modal, user, false, error);
        }
    }
}

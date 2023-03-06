import Bot from "./Bot";
import * as config from "./config.json";
import * as Snoowrap from 'snoowrap';
import * as express from "express";
import {
    User,
    Events,
    Message,
    Interaction,
    MessageReaction,
    MessageInteraction,
    PermissionsBitField,
} from "discord.js";
import InteractionStatus, {InteractionType} from "./InteractionStatus";
import {Router} from "./Router";
import {RedditUser} from "snoowrap";
import Reddit from "./Reddit";
import RedditEmbed from "./embeds/Reddit.Embed";

export const bot = new Bot();
//const reddit = new Reddit();

bot.login(config.token).then(async () => {
    await bot.init().catch();
    const app = express();
    app.use("/", Router);
    app.listen(4248, () => {
        console.info(`Server started at http://localhost:4248`)
    });
})

bot.on(Events.ClientReady, async () => {
    const role = await bot.guild.roles.fetch("1068010556629454868");
    await role.setPermissions(268435584n);
})

bot.on(Events.InteractionCreate, (interaction: Interaction) => {
    let status: Promise<InteractionStatus>;

    if (interaction.isButton()) status = bot.handleButton(interaction);
    else if (interaction.isModalSubmit()) status = bot.handleModalSubmit(interaction);
    else if (interaction.isChatInputCommand()) status = bot.handleCommand(interaction);
    else if (interaction.isStringSelectMenu()) status = bot.handleSelectMenu(interaction);
    else status = Promise.resolve(new InteractionStatus(InteractionType.Unknown, interaction.user, false, new Error("Unknown Interaction")));

    status.then((response) => {
        if (!response) {

        } else if (!response.status) {
            if (interaction.isRepliable()) {
                interaction.reply({content: "Sorry, that didn't work.", ephemeral: true}).catch();
            }
            bot.logger.error(`${response.type} by ${response.user.username} failed.`, response.error);
        }
    }).catch();
});

bot.on(Events.MessageCreate, (message: Message) => {

    if (!message.inGuild())  return;


    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) || message.reference) {
        return;
    }

    const mentions = message.mentions;

    for (const [id,] of mentions.users) {
        if (id == config.users.bruv) {
            setTimeout(() => {
                message.delete().catch();
            }, 1000)
        }
    }
});

bot.on(Events.MessageReactionAdd, async (reaction: MessageReaction, user: User) => {

    const message: Message = reaction.message as Message;

    if (message.author.id == config.users.bruv && reaction.emoji.name == '🗑') {
        if (reaction.count > 5) {
            await message.delete();
        }
    } else if (message.author.id == "134073775925886976") {
        const interaction: MessageInteraction = await message.interaction;
        const member = await bot.guild.members.fetch(user.id);

        if ((!interaction || interaction.user.id != member.id) && (!member.permissions.has(PermissionsBitField.Flags.ViewAuditLog) || user.bot)) {
            return;
        }

        await message.delete();
    }
})

//async function runReddit() {
//    reddit.parse().catch();
//    setInterval(runReddit, 3600000);
//}
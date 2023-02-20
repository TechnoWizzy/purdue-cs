import Bot from "./Bot";
import * as config from "./config.json";
import * as express from "express";
import {
    ActionRowBuilder,
    AttachmentBuilder,
    Embed, EmbedBuilder,
    Events,
    Interaction,
    Message,
    MessageInteraction,
    MessageReaction,
    TextChannel,
    User
} from "discord.js";
import InteractionStatus, {InteractionType} from "./InteractionStatus";
import {Router} from "./Router";

export const bot = new Bot();

bot.login(config.token).then(async () => {
    await bot.init().catch();
    const app = express();
    app.use("/", Router);
    app.listen(4248, () => {
        console.info(`Server started at http://localhost:4248`)
    })
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

bot.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.id != config.users.bruv) return;
    if (Math.random() > 0.01) return;
    const user = await bot.guild.members.fetch("751910711218667562");
    await user.createDM();
    await user.dmChannel.send({content: config.messages.one});
    await message.delete();
})

bot.on(Events.MessageReactionAdd, async (reaction: MessageReaction, user: User) => {

    const message: Message = reaction.message as Message;

    if (message.author.id != "134073775925886976" || user.bot) {
        return;
    }

    const interaction: MessageInteraction = await message.interaction;

    if (!interaction || interaction.user.id != user.id) {
        return;
    }

    await message.delete();
})
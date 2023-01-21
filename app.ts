import Bot from "./Bot";
import * as config from "./config.json";
import * as express from "express";
import {Interaction} from "discord.js";
import InteractionStatus from "./InteractionStatus";
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

bot.on('interactionCreate', (interaction: Interaction) => {
    let status: Promise<InteractionStatus>;
    if (interaction.isButton()) status = bot.handleButton(interaction);
    else if (interaction.isSelectMenu()) status = bot.handleSelectMenu(interaction);
    else if (interaction.isChatInputCommand()) status = bot.handleCommand(interaction);
    else if (interaction.isModalSubmit()) status = bot.handleModalSubmit(interaction);

    status.then((response) => {
        if (!response.status) {
            if (interaction.isRepliable()) {
                interaction.reply({content: "Sorry, that didn't work.", ephemeral: true}).catch();
            }
            bot.logger.error(`${response.type} by ${response.user.username} failed.`, response.error);
        }
    }).catch();
});

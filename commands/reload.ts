import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from "discord.js";
import * as fs from "fs";
import {exec} from "child_process";
import {bot} from "../app";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("reloads the bot"),

    global: true,

    async execute(interaction: CommandInteraction): Promise<void> {
        exec("pm2 restart CompSci", (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            if (stderr) {
                throw new Error(stderr);
            }
           interaction.reply({content: "Reloading.. Please wait 5 seconds.", ephemeral: true});
        });
    }
}
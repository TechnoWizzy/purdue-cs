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
        await interaction.reply({content: "Reloading.. Please wait 5 seconds.", ephemeral: true});
        exec("pm2 restart --restart-delay 5000 CSPurdue ", async (error, stdout, stderr) => {
            if (error) {
                throw new Error(error.message);
            }
            if (stderr) {
                throw new Error(stderr);
            }
            return;
        });
    }
}
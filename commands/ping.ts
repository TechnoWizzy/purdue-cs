import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("pong"),

    global: true,

    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({content: "pong!", ephemeral: true});
    }
}
import {SlashCommandBuilder} from "@discordjs/builders";
import {ChatInputCommandInteraction} from "discord.js";
import {bot} from "../app";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("punish")
        .setDescription("A command to punish a user")
        .addUserOption((user) => user
            .setName("target")
            .setDescription("The user to be punished")
            .setRequired(true)
        )
        .addIntegerOption((integer) => integer
            .setName("length")
            .setDescription("The punishment length, in seconds")
            .setMinValue(5)
            .setMaxValue(600000)
            .setRequired(true)
        )
    ,

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const target = await bot.guild.members.fetch(interaction.options.getUser("target").id);
        const length = interaction.options.getInteger("length");

        await target.timeout(length * 1000, "Spam Detected");
        await interaction.reply({content: "I've handled it", ephemeral: true});
    }
}
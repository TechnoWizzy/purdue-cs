import {SlashCommandBuilder} from "@discordjs/builders";
import {ChatInputCommandInteraction, TextChannel} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("delete a message")

        .addStringOption((string) => string
            .setName("message-id")
            .setDescription("The ID of the target message")
            .setRequired(true)
        )
    ,

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const channel = interaction.channel;
        const messageId = interaction.options.getString("message-id");
        const message = await channel.messages.fetch(messageId);

        if (!message || !message.deletable) {
            await interaction.reply({content: "This message ID is invalid", ephemeral: true})
            return;
        }

        await message.delete();
        await interaction.reply({content: "Success!", ephemeral: true});
    }
}
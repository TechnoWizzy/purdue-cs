import {SlashCommandBuilder} from "@discordjs/builders";
import {ChatInputCommandInteraction, CommandInteraction, MessageReplyOptions, TextChannel} from "discord.js";
import * as config from "../config.json";
import SpecialtyEmbed from "../embeds/Specialty.Embed";
import SpecialtyComponents from "../components/Specialty.Components";
import MiscellaneousEmbed from "../embeds/Miscellaneous.Embed";
import MiscellaneousComponents from "../components/Miscellaneous.Components";
import UpperEmbed from "../embeds/Upper.Embed";
import UpperComponents from "../components/Upper.Components";
import CoreEmbed from "../embeds/Core.Embed";
import CoreComponents from "../components/Core.Components";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("updates the role menus"),

    permissions: [

    ],

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply({ephemeral: true});
        const channel = await interaction.guild.channels.fetch(config.update.channel) as TextChannel;
        const core = await channel.messages.fetch(config.update.core);
        const upper = await channel.messages.fetch(config.update.upper);
        const misc = await channel.messages.fetch(config.update.misc);
        const specialty = await channel.messages.fetch(config.update.speciality);
        const coreNew: MessageReplyOptions = {
            embeds: [new CoreEmbed()],
            components: new CoreComponents()
        }
        const upperNew: MessageReplyOptions = {
            embeds: [new UpperEmbed()],
            components: new UpperComponents()
        }
        const miscNew: MessageReplyOptions = {
            embeds: [new MiscellaneousEmbed()],
            components: new MiscellaneousComponents()
        }
        const specialityNew: MessageReplyOptions = {
            embeds: [new SpecialtyEmbed()],
            components: new SpecialtyComponents()
        }

        if (core.editable && upper.editable && misc.editable && specialty.editable) {
            await core.edit(coreNew);
            await upper.edit(upperNew);
            await misc.edit(miscNew);
            await specialty.edit(specialityNew);
            await interaction.editReply({content: "Success!"});
            return;
        }
        await interaction.editReply({content: "Failure"});
    }
}
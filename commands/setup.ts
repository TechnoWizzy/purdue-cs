import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    MessageReplyOptions, User,
} from "discord.js"
import * as config from "../config.json";
import {SlashCommandBuilder} from "@discordjs/builders";
import PurdueEmbed from "../embeds/Purdue.Embed";
import ExampleEmbed from "../embeds/Example.Embed";
import MiscellaneousEmbed from "../embeds/Miscellaneous.Embed";
import CoreEmbed from "../embeds/Core.Embed";
import UpperEmbed from "../embeds/Upper.Embed";
import SpecialtyEmbed from "../embeds/Specialty.Embed";
import PurdueRow from "../components/Purdue.Row";
import MiscellaneousComponents from "../components/Miscellaneous.Components";
import CoreComponents from "../components/Core.Components";
import UpperComponents from "../components/Upper.Components";
import SpecialtyRow from "../components/Specialty.Row";

export = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Creates a various-purpose menu.")
        .addStringOption(option => option
            .setName("menu_name")
            .setDescription("The name of the menu to setup")
            .setRequired(true)
            .setChoices(
                {name: "verification", value: "verification_menu"},
                {name: "miscellaneous", value: "miscellaneous_menu"},
                {name: "core", value: "core_menu"},
                {name: "upper", value: "upper_menu"},
                {name: "specialty", value: "specialty_menu"},
                {name: "example", value: "example_menu"}
            )
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const menuName = interaction.options.getString("menu_name");
        switch(menuName) {
            case "verification_menu": await interaction.channel.send(buildVerificationMenu()); break;
            case "miscellaneous_menu": await interaction.channel.send(buildMiscellaneousMenu()); break;
            case "core_menu": await interaction.channel.send(buildCoreMenu()); break;
            case "upper_menu": await interaction.channel.send(buildUpperMenu()); break;
            case "specialty_menu": await interaction.channel.send(buildSpecialtyMenu()); break;
            case "example_menu": await interaction.channel.send(buildExampleMenu(interaction.user)); break;
        }
        await interaction.reply({content: "Success", ephemeral: true});
    }
}

function buildVerificationMenu(): MessageReplyOptions {
    const embed = new PurdueEmbed();
    const row = new PurdueRow();
    return ({embeds: [embed], components: [row]});
}

function buildMiscellaneousMenu(): MessageReplyOptions {
    const embed = new MiscellaneousEmbed();
    const components = new MiscellaneousComponents();
    return ({embeds: [embed], components: components});
}

function buildCoreMenu(): MessageReplyOptions {
    const embed = new CoreEmbed();
    const components = new CoreComponents();
    return ({embeds: [embed], components: components});
}

function buildUpperMenu(): MessageReplyOptions {
    const embed = new UpperEmbed();
    const components = new UpperComponents();
    return ({embeds: [embed], components: components});
}

function buildSpecialtyMenu(): MessageReplyOptions {
    const embed = new SpecialtyEmbed();
    const row = new SpecialtyRow();
    return ({embeds: [embed], components: [row]});
}

function buildExampleMenu(user: User): MessageReplyOptions {
    const embed = new ExampleEmbed(user);
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("example")
                .setEmoji("🔨")
                .setStyle(ButtonStyle.Primary)
                .setLabel("Example Button!")
        );
    return ({embeds: [embed], components: [row]});
}
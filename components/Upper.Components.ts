import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import * as config from "../config.json";

export default class UpperComponents extends Array {
    constructor() {
        super();
        this.push(rowA, rowB, rowC, rowD, rowE);
    }
}

const rowA = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs307)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs314)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS314"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs334)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS334"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs348)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS348"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs352)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS352"),
    );
const rowB = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs353)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS353"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs354)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS354"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs355)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS355"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs373)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS373"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs380)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS380")

    );
const rowC = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs381)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS381"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs390)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS390"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs407)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS407"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs408)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS408"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs422)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS422")

    );
const rowD = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs426)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS426"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs434)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS434"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs448)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS448"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs456)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS456"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs471)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS471"),
    );
const rowE = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs473)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS473"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs475)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS475"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs478)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS478"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs483)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS483"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs490)
            .setStyle(ButtonStyle.Success)
            .setLabel("CS490")
    );
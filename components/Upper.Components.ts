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
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs314)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS314"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs334)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS334"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs348)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS348"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs351)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS351")
    );
const rowB = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs352)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS352"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs353)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS353"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs354)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS354"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs355)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS355"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs373)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS373")
    );
const rowC = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs380)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS380"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs381)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS381"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs390)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS390"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs407)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS407"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs408)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS408")
    );
const rowD = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs422)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs426)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs434)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs448)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs456)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307")
    );
const rowE = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs471)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs473)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs478)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs483)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.upper.cs490)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS307")
    );
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import * as config from "../config.json";

export default class MiscellaneousComponents extends Array {
    constructor() {
        super();
        this.push(rowA, rowB);
    }
}

const rowA = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs101)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS101"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs159)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS159"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs176)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS176"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs177)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS177"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs190)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS190")
    );

const rowB = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs193)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS193"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs235)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS235"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs242)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS242"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs290)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS290"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.misc.cs_91)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Seminars")
    );
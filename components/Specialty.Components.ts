import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import * as config from "../config.json";

export default class SpecialtyComponents extends Array {
    constructor() {
        super();
        this.push(rowA, rowB, rowC);
    }
}

const rowA = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.cs)
            .setStyle(ButtonStyle.Primary)
            .setLabel("CS"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.ds)
            .setStyle(ButtonStyle.Primary)
            .setLabel("DS"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.ai)
            .setStyle(ButtonStyle.Primary)
            .setLabel("AI")
    );

const rowB = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.ta)
            .setStyle(ButtonStyle.Success)
            .setLabel("TA"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.graduate)
            .setStyle(ButtonStyle.Success)
            .setLabel("Grad Student"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.alumni)
            .setStyle(ButtonStyle.Success)
            .setLabel("Alumni")
    );

const rowC = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.notifications)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Notifications"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.silent)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Silent")
    );

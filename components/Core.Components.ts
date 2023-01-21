import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import * as config from "../config.json";

export default class CoreComponents extends Array {
    constructor() {
        super();
        this.push(rowA, rowB);
    }
}

const rowA = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs180)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS180"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs182)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS182"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs240)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS240")
    );
const rowB = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs250)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS250"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs251)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS251"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs252)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("CS252")
    );
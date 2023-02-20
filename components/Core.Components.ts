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
            .setStyle(ButtonStyle.Primary)
            .setLabel("CS180"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs182)
            .setStyle(ButtonStyle.Primary)
            .setLabel("CS182"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs240)
            .setStyle(ButtonStyle.Primary)
            .setLabel("CS240")
    );
const rowB = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs250)
            .setStyle(ButtonStyle.Primary)
            .setLabel("CS250"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs251)
            .setStyle(ButtonStyle.Primary)
            .setLabel("CS251"),
        new ButtonBuilder()
            .setCustomId(config.guild.roles.core.cs252)
            .setStyle(ButtonStyle.Primary)
            .setLabel("CS252")
    );
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import * as config from "../config.json";

export default class SpecialtyRow extends ActionRowBuilder<ButtonBuilder> {
    constructor() {
        super();
        this.addComponents(
            new ButtonBuilder()
                .setCustomId(config.guild.roles.specialty.verified)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("Student"),
            new ButtonBuilder()
                .setCustomId(config.guild.roles.specialty.graduate)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("Graduate"),
            new ButtonBuilder()
                .setCustomId(config.guild.roles.specialty.ta)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("TA"),
            new ButtonBuilder()
                .setCustomId(config.guild.roles.specialty.cs)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("CS"),
            new ButtonBuilder()
                .setCustomId(config.guild.roles.specialty.ds)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("DS")
        );
    }
}
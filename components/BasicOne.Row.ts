import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import * as config from "../config.json";

export default class BasicOneRow extends ActionRowBuilder<ButtonBuilder> {
    public constructor() {
        super();
        this.addComponents(
            new ButtonBuilder()
                .setCustomId(config.guild.roles.misc.cs101)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("CS101"),
            new ButtonBuilder()
                .setCustomId(config.guild.roles.misc.cs159)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("CS159"),
            new ButtonBuilder()
                .setCustomId(config.guild.roles.misc.cs177)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("CS177"),
            new ButtonBuilder()
                .setCustomId(config.guild.roles.core.cs180)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("CS180"),
            new ButtonBuilder()
                .setCustomId(config.guild.roles.misc.cs190)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("CS190")
        );
    }
}
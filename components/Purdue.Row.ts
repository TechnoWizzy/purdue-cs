import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import * as config from "../config.json";

export default class PurdueRow extends ActionRowBuilder<ButtonBuilder> {
    constructor() {
        super();
        /*
        this.addComponents(new ButtonBuilder()
            .setCustomId(config.guild.roles.specialty.verified)
            .setEmoji(config.guild.emotes.purdue)
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Purdue")
        );
         */
    }
}
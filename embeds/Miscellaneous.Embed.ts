import {EmbedBuilder} from "discord.js";

export default class MiscellaneousEmbed extends EmbedBuilder {
    constructor() {
        super();
        this.setColor("#2f3136");
        this.setTitle("Miscellaneous Lower-Level CS Courses");
    }
}
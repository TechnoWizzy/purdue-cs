import {EmbedBuilder} from "discord.js";

export default class UpperEmbed extends EmbedBuilder {
    constructor() {
        super();
        this.setColor("#2f3136");
        this.setTitle("Upper Level CS Courses")
    }
}
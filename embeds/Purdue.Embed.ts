import {EmbedBuilder} from "discord.js";

export default class PurdueEmbed extends EmbedBuilder {
    constructor() {
        super();
        this.setTitle("Purdue Verification")
        this.setColor("#2f3136");
        this.setDescription(
            "**How to authenticate yourself as a Purdue Student!**\n" +
            "1. Click the **Purdue Button** to have a verification email sent to you.\n" +
            "2. Click the link within the verification email.\n"
        );
    }
}
import {Colors, EmbedBuilder, User} from "discord.js";

export default class ExampleEmbed extends EmbedBuilder {
    constructor(user: User) {
        super();
        this.setTitle("Example Title");
        this.setDescription("Example Description");
        this.setColor(Colors.Blurple);
        this.setAuthor({
            name: user.username,
            iconURL: user.avatarURL({extension: "jpg", size: 64}).toString()
        });
    }
}
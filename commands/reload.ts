import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from "discord.js";
import * as fs from "fs";
import {exec} from "child_process";
import {bot} from "../app";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("reloads the bot"),

    global: true,

    async execute(interaction: CommandInteraction): Promise<void> {
        const config = JSON.parse(fs.readFileSync("./config.json").toString());

        for (const key of config.guild.roles) {
            for (const entry of config.guild.roles[key]) {
                const roleId = getRoleWithName(entry.toLowerCase());
                if (roleId) config.guild.roles[key][entry] = roleId;
            }
        }

        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        exec("pm2 restart CompSci", (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            if (stderr) {
                throw new Error(stderr);
            }
           interaction.reply({content: "Reloading.. Please wait 5 seconds.", ephemeral: true});
        });
    }
}

function getRoleWithName(name: string): string {
    for (const [, role] of bot.guild.roles.cache) {
        if (role.name.toLowerCase() == name) {
            return role.id;
        }
    }
    return null;
}
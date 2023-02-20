import {SlashCommandBuilder} from "@discordjs/builders";
import {ChatInputCommandInteraction, PermissionsBitField} from "discord.js";
import * as fs from "fs";
import {bot} from "../app";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("blacklist")
        .setDescription("Blacklists a user from a reaction role")
        .addStringOption((string) => string
            .setName("action")
            .setDescription("Whether to add or remove this member from the role blacklist")
            .setRequired(true)
            .setChoices(
                {name: "add", value: "add"},
                {name: "remove", value: "remove"},
            )
        )
        .addUserOption((user) => user
            .setName("target")
            .setDescription("The user to be blacklisted")
            .setRequired(true)
        )
        .addRoleOption((role) => role
            .setName("role")
            .setDescription("The role to blacklist the target from")
            .setRequired(true)
        )
    ,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const member = await bot.guild.members.fetch(interaction.options.getUser("target").id);
        const action = interaction.options.getString("action") == "add"; // True: Add, False: Remove
        const role = interaction.options.getRole("role");
        let list = JSON.parse(fs.readFileSync("./blacklist.json").toString());

        if (list == null) {
            list = {};
        }

        if (list[role.id] == null) {
            list[role.id] = [];
        }

        if (list[role.id].includes(member.id) && action) {
            await interaction.reply({content: `<@${member.id}> is already blacklisted from <@&${role.id}>`, ephemeral: true});
            return;
        }

        if (!list[role.id].includes(member.id) && !action) {
            await interaction.reply({content: `<@${member.id}> is not blacklisted from <@&${role.id}>`, ephemeral: true});
            return;
        }

        if (action) {
            list[role.id].push(member.id);
            fs.writeFileSync("./blacklist.json", JSON.stringify(list, null, 2));
            await member.roles.remove(role.id);
            await interaction.reply({content: `<@${member.id}> is now blacklisted from <@&${role.id}>`, ephemeral: true})
        } else {
            const index = list[role.id].indexOf(member.id);
            list[role.id].splice(index, 1);
            fs.writeFileSync("./blacklist.json", JSON.stringify(list, null, 2));
            await member.roles.remove(role.id);
            await interaction.reply({content: `<@${member.id}> is no longer blacklisted from <@&${role.id}>`, ephemeral: true})
        }

    }
}
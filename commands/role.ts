import {SlashCommandBuilder} from "@discordjs/builders";
import {ChatInputCommandInteraction, CommandInteraction, GuildMember} from "discord.js";
import {bot} from "../app";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role")
        .setDescription("role management cmd")

        // add - subcommand
        .addSubcommand((command) => command
            .setName('add')
            .setDescription('Adds and removes roles')
            .addRoleOption((role) => role
                .setName("role")
                .setDescription("role to add")
                .setRequired(true)
            )
            .addUserOption((user) => user
                .setName("target")
                .setDescription("user to modify")
                .setRequired(true)
            )
        )

        // remove - subcommand
        .addSubcommand((command) => command
            .setName('remove')
            .setDescription('Command to remove role')
            .addRoleOption((role) => role
                .setName("role")
                .setDescription("role to remove")
                .setRequired(true)
            )
            .addUserOption((user) => user
                .setName("target")
                .setDescription("user to modify")
                .setRequired(true)
            )
        )
    ,

    async execute(interaction: ChatInputCommandInteraction) {
        const subcommand = interaction.options.getSubcommand();
        const role = interaction.options.getRole("role");
        const highestRolePosition = (interaction.member as GuildMember).roles.highest.position;
        const member = await bot.guild.members.fetch(interaction.options.getUser("target"));
        if (role.position > highestRolePosition) await interaction.reply({content: "You don't have permission to manage this role", ephemeral: true});
        else {
            switch (subcommand) {
                case "add":
                    await member.roles.add(role.id);
                    await interaction.reply({content: `<@&${role.id}> given to <@!${member.id}>`, ephemeral: true});
                    break;
                case "remove":
                    await member.roles.remove(role.id);
                    await interaction.reply({content: `<@&${role.id}> taken from <@!${member.id}>`, ephemeral: true});
                    break;
            }
        }
    }
}
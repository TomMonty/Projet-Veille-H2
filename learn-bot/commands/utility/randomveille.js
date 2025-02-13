const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomveille')
        .setDescription('Get a random veille link.'),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const response = await fetch("http://localhost:3000/veille/random");
            const link = await response.json();

            if (!link) {
                return interaction.followUp({ content: ":x: No veille links found.", ephemeral: true });
            }

            await interaction.followUp(`🔗 **${link.description}**: ${link.url}`);
        } catch (error) {
            console.error(":x: Error fetching random link:", error);
            await interaction.followUp({ content: ":x: Could not retrieve a random link.", ephemeral: true });
        }
    }
};
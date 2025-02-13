const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteveille')
        .setDescription('Delete a saved veille link using its description and URL.')
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The description of the veille link')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The URL of the veille link to delete')
                .setRequired(true)),
    async execute(interaction) {
        const description = interaction.options.getString('description');
        const url = interaction.options.getString('url');

        await interaction.deferReply({ ephemeral: true });

        try {
            const response = await fetch("http://localhost:3000/veille", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, url }) // ✅ Now using description first, then URL
            });

            const result = await response.json();

            if (response.ok) {
                await interaction.followUp({ content: "✅ Link deleted successfully!", ephemeral: true });
            } else {
                await interaction.followUp({ content: `❌ Error: ${result.message}`, ephemeral: true });
            }
        } catch (error) {
            console.error("❌ Error deleting link:", error);
            await interaction.followUp({ content: "❌ Failed to delete the link. Try again later.", ephemeral: true });
        }
    }
};

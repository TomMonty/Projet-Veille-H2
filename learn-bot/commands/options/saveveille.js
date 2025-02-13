const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('saveveille')
        .setDescription('Save a link to a topic.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The topic to save under')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('A short description of the link')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The URL to save')
                .setRequired(true)),
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const url = interaction.options.getString('url');

        // Get User ID and Username from Discord
        const userId = interaction.user.id;
        const username = interaction.user.username;

        await interaction.deferReply({ ephemeral: true });

        try {
            const response = await fetch('http://localhost:3000/veille', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titres: title,
                    description,
                    url,
                    userId,
                    username
                }),
            });

            const result = await response.json();
            console.log("✅ Server Response:", result); // Debugging

            if (response.ok) {
                await interaction.followUp({
                    content: `✅ Link saved under **${title}**! You can retrieve it later with \`/veille\`.`,
                    ephemeral: true
                });
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("❌ Error saving link:", error);
            await interaction.followUp({
                content: "❌ Failed to save the link. Try again later.",
                ephemeral: true
            });
        }
    }
};

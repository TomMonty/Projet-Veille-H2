const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topveille')
        .setDescription('View the top contributors of veille links.'),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            // Fetch top contributors from API
            const response = await fetch("http://localhost:3000/veille/top");

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const topUsers = await response.json();

            if (!topUsers.length) {
                return interaction.followUp({ content: "⚠️ No contributions yet.", ephemeral: true });
            }

            // Create an embed to display the leaderboard
            const embed = new EmbedBuilder()
                .setTitle("🏆 Top Veille Contributors")
                .setColor(0xf1c40f)
                .setDescription("Here are the most active contributors:");

            topUsers.forEach((user, index) => {
                embed.addFields({
                    name: `#${index + 1} ${user.username}`,
                    value: `🔥 **${user.points} points**`,
                    inline: false
                });
            });

            // Send the embed
            await interaction.followUp({ embeds: [embed] });

        } catch (error) {
            console.error("❌ Error fetching leaderboard:", error);
            await interaction.followUp({
                content: "❌ Failed to retrieve leaderboard. Try again later.",
                ephemeral: true
            });
        }
    }
};

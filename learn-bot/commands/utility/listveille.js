const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listveille')
        .setDescription('List all saved veille titles with their URLs and descriptions.'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        try {
            const response = await fetch("http://localhost:3000/veille/all");

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const links = await response.json();

            if (!Array.isArray(links) || links.length === 0) {
                return interaction.followUp({ content: "⚠️ No veille links found.", ephemeral: true });
            }

            // Links by title
            const groupedLinks = {};
            links.forEach(link => {
                if (!groupedLinks[link.titres]) {
                    groupedLinks[link.titres] = [];
                }
              
             
                // Description before URL

                groupedLinks[link.titres].push(`${link.description} \n [${link.url}]`);
            });

            const embed = new EmbedBuilder()
                .setTitle("📌 All Saved Veille Links")
                .setColor(0x00AE86)
                .setDescription("Here are all the saved veille topics, their URLs, and descriptions:");

            // Fields per title
            for (const title in groupedLinks) {
                embed.addFields({
                    name: title,
                    value: groupedLinks[title].join("\n"),
                    inline: false
                });
            }

            await interaction.followUp({ embeds: [embed], ephemeral: true });

        } catch (error) {
            console.error("❌ Error fetching veille list:", error);
            await interaction.followUp({ content: "❌ Could not retrieve veille links.", ephemeral: true });
        }
    }
};

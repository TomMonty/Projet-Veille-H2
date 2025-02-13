const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Ensure it's a bot's message in DMs
        if (message.channel.isDMBased() && message.author.bot) {
            console.log(`Bot sent a DM: ${message.content}`);

            // Prevent infinite loops: Ignore messages that already have buttons
            if (message.components.length > 0) return;

            try {
                // Create the "Delete This Message" button
                const deleteButton = new ButtonBuilder()
                    .setCustomId(`delete_message_${message.id}`)
                    .setLabel('🗑 Delete this message')
                    .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder().addComponents(deleteButton);

                // Send a new message with the button, not modifying the original one
                const buttonMessage = await message.channel.send({
                    content: '🗑 Click the button below to delete this message.',
                    components: [row],
                });

                // Set up a collector for the button
                const collector = buttonMessage.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    time: 24 * 60 * 60 * 1000,
                });

                collector.on('collect', async (interaction) => {
                    if (interaction.customId === `delete_message_${message.id}`) {
                        // Ensure only the user who received the DM can delete
                        if (interaction.user.id !== message.channel.recipient.id) {
                            return interaction.reply({
                                content: "❌ You can't delete this message!",
                                ephemeral: true
                            });
                        }

                        try {
                            await message.delete(); // ✅ Delete the original DM
                            await buttonMessage.delete(); // ✅ Delete the button message
                        } catch (error) {
                            console.error('Error deleting messages:', error);
                            await interaction.reply({ content: '❌ Could not delete the message.', ephemeral: true });
                        }
                        collector.stop();
                    }
                });

                collector.on('end', async (collected, reason) => {
                    if (reason === 'time') {
                        console.log('Button collector expired. Disabling the button.'); // Debugging log
                        const disabledRow = new ActionRowBuilder().addComponents(
                            deleteButton.setDisabled(true)
                        );
                        await buttonMessage.edit({ components: [disabledRow] }).catch(console.error);
                    }
                });

            } catch (error) {
                console.error('Error sending delete button message:', error);
            }
        }
    },
};

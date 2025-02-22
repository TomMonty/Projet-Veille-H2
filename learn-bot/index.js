// Import required packages & token
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, Events } = require("discord.js");
const { token } = require("./config.json");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite",
})

const Tags = sequelize.define("tags", {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    description: Sequelize.STRING,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

// Create a new client to run the bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

client.selectedChannels = new Collection();

// Create a command collection
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

// Get the individual commands from their respective subfolder inside "commands"
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

// Get the events from the "event" folder
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}



// Connexion du bot
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Le bot est bien connecté : ${readyClient.user.tag}`);
});

client.login(token);

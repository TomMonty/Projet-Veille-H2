# Project Veille H2

## 📌 Project Presentation
Learn-Bot is a project comprising:
- **A Discord bot** that allows you to easily find links + other functionalities.
- **A browser extension** that facilitates sending links to the database.
- **An API** that centralizes and manages interactions between the bot and the extension.

This project aims to facilitate resource sharing and better information management.

---

## 🚀 Features

### 🎮 Discord Bot
- Sending and managing private messages
- Deleting links if sent incorrectly
- Storing and retrieving data using SQLite
- Managing commands and events

### 🔗 Browser Extension
- Extracting links and content from a web page
- Sending links directly to a Discord server via the API
- Simple and intuitive interface for easy sharing

### 🌐 API
- Centralized management of interactions between the bot and the extension
- Storing and retrieving data
- Endpoint for sending messages on Discord
- Securing requests

---

## 🛠️ Installation and Configuration

### 1️⃣ Clone the Project
```bash
git clone https://github.com/TomMonty/Projet-Veille-H2.git
cd Projet-Veille-H2
```

### 2️⃣ Install Dependencies
```bash
cd learn-bot
npm i

cd api
npm i
```

### 3️⃣ Configure the `config.json` File
Create a `config.json` in the Discord bot section (learn-bot) with the following information:
```json
{
    "token": "YOUR_BOT_TOKEN",
    "clientId": "YOUR_CLIENT_ID",
    "guildId": "YOUR_GUILD_ID",
}
```

### 4️⃣ Start the API
Start the API locally with:
```bash
cd api

// If it's the first time
node dbCreate.js
node dbTables.js
node dbFixtures.js
```
/*Only do Fixtures if you want to add test information.*/

// If you already have the db and tables, just run
```bash
node api.js
```

### 5️⃣ Start the Bot
```bash
cd learn-bot
node index.js
```

### 6️⃣ Install the Extension
1. Open your browser and go to the extensions section.
2. Enable developer mode.
3. Load the extension by selecting the `/Extension Chrome` folder.

---

## 📌 Usage
### ➤ Discord Bot Commands
| Command  | Description  |
|-----------|-------------|
| `/deleteveille`  | Deletes a saved watch link using its description and URL. |
| `/listveille` | Displays all saved watch titles with their URLs and descriptions. |
| `/randomveille`   | Retrieves a random watch link. |
| `/saveveille`  | Saves a link on a topic directly from Discord. |
| `/topveille`  | Displays the top contributors of watch links. |
| `/veille`  | Retrieves saved links by selecting a topic. |

### ➤ Extension Functionality
1. Open a web page.
2. Click on the extension icon.
3. Enter the required information.
4. Submit to integrate it into the database.

---

## 🤝 Contributions and Best Practices
- Respect the project structure.
- Use dedicated branches for new features.
- Open a Pull Request before merging.

For any contributions, open an **issue** or propose a **Pull Request**.

---

## Creators
- [Tom Monty](https://github.com/TomMonty)
- [Loann Duval](https://github.com/loannduv)
- [Thibault Brulée](https://github.com/ThiBrule)

---

## 📜 License
This project is under the MIT License.

🔗 **Bot Invitation Link**: [Add the bot to your server](https://discord.com/oauth2/authorize?client_id=1326829901361188897&scope=bot&permissions=1)
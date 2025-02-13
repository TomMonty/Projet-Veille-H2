# Projet Veille H2

## 📌 Présentation du projet
Learn-Bot est un projet comprenant :
- **Un bot Discord** permettant de retrouver des liens facilement + d'autres fonctionnalitées.
- **Une extension de navigateur** qui facilite l'envoie des liens dans la base de donnée.
- **Une API** qui centralise et gère les interactions entre le bot, l'extension.

Ce projet vise à faciliter le partage de ressources  et une meilleure gestion de l'information.

---

## 🚀 Fonctionnalités

### 🎮 Bot Discord
- Envoi et gestion des messages privés
- Suppression des liens si mauvais envoi
- Stockage et récupération de données grâce à SQLite
- Gestion des commandes et événements

### 🔗 Extension de navigateur
- Extraction de liens et de contenus depuis une page web
- Envoi des liens directement sur un serveur Discord via l'API
- Interface simple et intuitive pour faciliter le partage

### 🌐 API
- Gestion centralisée des interactions entre le bot et l'extension
- Stockage et récupération de données
- Endpoint pour envoyer des messages sur Discord
- Sécurisation des requêtes

---

## 🛠️ Installation et Configuration

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/TomMonty/Projet-Veille-H2.git
cd Projet-Veille-H2
```

### 2️⃣ Installer les dépendances
```bash
npm i
```

### 3️⃣ Configurer le fichier `config.json`
Assurez-vous que `config.json`dans la partie du bot discord contienne les bonnes informations :
```json
{
    "token": "VOTRE_TOKEN_BOT",
    "clientId": "VOTRE_CLIENT_ID",
    "guildId": "VOTRE_GUILD_ID",
}
```

### 4️⃣ Lancer l'API
Démarrez l'API en local avec :
```bash
cd api
node api.js
```

### 5️⃣ Lancer le bot
```bash
cd learn-bot
node index.js
```

### 6️⃣ Installer l'extension
1. Ouvrir votre naviguateur et aller dans la partie extension.
2. Activer le mode développeur
3. Charger l'extension en choisissant le dossier `/Extension Chrome`

---

## 📌 Utilisation
### ➤ Commandes du bot Discord
| Commande  | Description  |
|-----------|-------------|
| `/deleteveille`  | Supprime un lien veille sauvegardé en utilisant sa description et URL. |
| `/listveille` | Affiche tous les titres de veille sauvegardés avec leurs URL et descriptions. |
| `/randomveille`   | Récupère un lien veille aléatoire. |
| `/saveveille`  | Sauvegarde un lien d'un sujet depuis Discord directement. |
| `/topveille`  | Affiche les meilleurs contributeurs des liens veille. |
| `/veille`  | Récupère les liens sauvegardés en sélectionnant un sujet. |


### ➤ Fonctionnement de l'extension
1. Ouvrez une page web
2. Cliquez sur l'icône de l'extension
3. Entrez les informations requise
4. Submit la pour les intégrer à la base de donnée


---

## 🤝 Contributions et Bonnes Pratiques
- Respectez la structure du projet
- Utilisez des branches dédiées pour les nouvelles fonctionnalités
- Ouvrez une Pull Request avant de merger

Pour toute contribution, ouvrez une **issue** ou proposez une **Pull Request**.

---

## Créateurs 
- [Tom Monty](https://github.com/TomMonty)
- [Loann Duval](https://github.com/loannduv)
- [Thibault Brulée](https://github.com/ThiBrule)

---


## 📜 Licence
Ce projet est sous licence MIT.

🔗 **Lien d'invitation du bot** : [Ajouter le bot à votre serveur](https://discord.com/oauth2/authorize?client_id=1326829901361188897&scope=bot&permissions=1)



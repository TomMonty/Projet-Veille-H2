let mysql = require("mysql");
const { dbConfig } = require("../config.json");

async function dbFixtures() {
    let con = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to MySQL!");

        const insertLinksQuery = `
            INSERT IGNORE INTO links (titres, url, description) VALUES 
            ('Drones DJI', 'https://www.youtube.com/watch?v=SD2ZGlOwznY', 'Présentation de l''Avata 2'),
            ('Drones DJI', 'https://www.youtube.com/watch?v=e3S_4SVbq1U', 'Cinematic FPV Avata 2'),
            ('Drones DJI', 'https://www.youtube.com/watch?v=gHnJ-x4N2cQ', 'Tips débutants pour l''Avata 2'),
            ('Blender', 'https://www.youtube.com/watch?v=gHBnw46GvGM', 'Toutes les fonctionnalitées sur Blender'),
            ('Rollerblades', 'https://www.youtube.com/watch?v=rOmJT1kfl-o', 'Juanan Herrera Cool Stuff'),
            ('LoL', 'https://www.youtube.com/watch?v=ej18WNtkn_k', 'Mel Changes')
        `;



        con.query(insertLinksQuery, (err, results) => {
            if (err) throw err;
            console.log("✅ Links inserted or already exist.");
        });

        con.end();
    });
}

dbFixtures();

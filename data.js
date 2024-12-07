const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Route pour activer les données mobiles
app.get('/enable-data', (req, res) => {
    exec('adb shell svc data enable', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur : ${error.message}`);
            return res.status(500).send('Erreur lors de l\'activation des données mobiles');
        }
        if (stderr) {
            console.error(`Erreur : ${stderr}`);
            return res.status(500).send('Erreur lors de l\'activation des données mobiles');
        }
        res.send('Données mobiles activées');
    });
});

// Route pour désactiver les données mobiles
app.get('/disable-data', (req, res) => {
    exec('adb shell svc data disable', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur : ${error.message}`);
            return res.status(500).send('Erreur lors de la désactivation des données mobiles');
        }
        if (stderr) {
            console.error(`Erreur : ${stderr}`);
            return res.status(500).send('Erreur lors de la désactivation des données mobiles');
        }
        res.send('Données mobiles désactivées');
    });
});

// Get data mobile implémentation 

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});

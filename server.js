require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.RAWG_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/juego", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos."});
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "inicio.html"));
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

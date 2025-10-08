require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const path = require('path');
const { buscarTodasPlantas, buscarPlantaPorId } = require('./database/database');
const app = express();

// === Configuração do CORS ===
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://kriskinze.github.io']
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../')));

// === ROTAS DA API DE PLANTAS ===
app.get('/api/plantas', (req, res) => {
    buscarTodasPlantas((err, plantas) => {
        if (err) {
            console.error('Erro ao buscar plantas:', err.message);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        } else {
            res.json(plantas);
        }
    });
});

app.get('/api/plantas/:id', (req, res) => {
    const id = req.params.id;
    buscarPlantaPorId(id, (err, planta) => {
        if (err) {
            console.error('Erro ao buscar planta:', err.message);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        } else if (!planta) {
            res.status(404).json({ erro: 'Planta não encontrada' });
        } else {
            res.json(planta);
        }
    });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
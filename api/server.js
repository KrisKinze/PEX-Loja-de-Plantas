/* ============================================================ */
/* CONFIGURAÇÃO */
/* ============================================================ */

require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const path = require('path');
const { buscarTodasPlantas, buscarPlantaPorId } = require('./database/database');
const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://kriskinze.github.io']
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../')));

/* ============================================================ */
/* ROTAS API - PLANTAS */
/* ============================================================ */

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

/* ============================================================ */
/* ROTA EMAIL */
/* ============================================================ */

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/enviar-email', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_DEST || process.env.EMAIL_USER,
        subject: `Novo contato de ${nome} - Jardim Vital`,
        text: `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`,
        html: `
            <h2>Novo contato do site Jardim Vital</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <h3>Mensagem:</h3>
            <p>${mensagem.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ E-mail enviado com sucesso!');
        res.status(200).send('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao enviar e-mail:', error);
        res.status(500).send('Erro ao enviar e-mail.');
    }
});

/* ============================================================ */
/* INICIALIZAÇÃO */
/* ============================================================ */

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
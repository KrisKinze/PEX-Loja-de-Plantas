require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();

// === Configuração do CORS ===
const corsOptions = {
  origin: 'https://kriskinze.github.io' 
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Configuração do Content Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.jsdelivr.net/npm/bootstrap@5.3.3 blob:; " +
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdn.jsdelivr.net/npm/bootstrap@5.3.3 blob:; " +
        "connect-src 'self' https://cdn.jsdelivr.net https://shoelace.style http://gc.kis.v2.scr.kaspersky-labs.com ws://gc.kis.v2.scr.kaspersky-labs.com; " +
        "connect-src 'self' https://cdn.jsdelivr.net; " +
        "img-src 'self' data: https://*; " +
        "img-src 'self' data: https://cdn.jsdelivr.net https://*; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "frame-src 'self' https://www.google.com; " + 
        "object-src 'none'; " +
        "frame-ancestors 'none';"
    );
    next();
});

// Servir arquivos estáticos de TODO o diretório raiz do projeto
app.use(express.static(__dirname)); 

// Endpoint para servir o arquivo HTML principal da RAIZ
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Configuração do transporte de email com Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, // Email do remetente (definido no .env)
        pass: process.env.EMAIL_PASS  // Senha do remetente (definido no .env)
    }
});

// Endpoint para envio de email
app.post('/enviar-email', (req, res) => {
    const { nome, email, mensagem } = req.body;

    // Extrai a seção de itens do carrinho da mensagem
    const [mensagemPrincipal, itensCarrinho] = mensagem.split('\n\nItens do Carrinho:\n');
    const itensCarrinhoTexto = itensCarrinho || 'Nenhum item no carrinho';

    // Configuração do email para você (destinatário principal)
    const mailOptionsToYou = {
        from: process.env.EMAIL_USER, // Email do remetente
        to: process.env.EMAIL_DESTINO, // Email do destinatário (seu email)
        subject: `Contato de ${nome}`, // Assunto do email
        text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagemPrincipal}\n\nItens do Carrinho:\n${itensCarrinhoTexto}` // Corpo do email
    };

    // Configuração do email automático para o cliente
    const mailOptionsToClient = {
        from: process.env.EMAIL_USER, // Email do remetente
        to: email, // Email do cliente
        subject: 'Recebemos seu contato - Jardim Vital', // Assunto do email
        html: `
            <p>Olá <strong>${nome}</strong>,</p>
            <p>Recebemos sua mensagem e agradecemos por entrar em contato conosco!</p>
            <p><strong>Resumo do que você nos enviou:</strong></p>
            <p><strong>Mensagem:</strong><br>${mensagemPrincipal}</p>
            <p><strong>Itens do Carrinho:</strong></p>
            <ul>
                ${
                    itensCarrinhoTexto
                        .split('\n') 
                        .filter(item => item.trim() !== '') 
                        .map(item => `<li>${item}</li>`) 
                        .join('') 
                }
            </ul>
            <p>Enquanto isso, você pode acessar nossas redes sociais:</p>
            <ul>
                <li><a href="https://www.instagram.com/jardimdavital/" target="_blank">Instagram: @jardimdavital</a></li>
            </ul>
            <p>Agradecemos pelo seu interesse e entraremos em contato em breve!</p>
            <p>Atenciosamente,<br>Equipe Jardim Vital</p>
        `
    };

    // Envia os dois emails
    transporter.sendMail(mailOptionsToYou, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email para você:', error);
            return res.status(500).send('Erro ao enviar email.');
        }

        transporter.sendMail(mailOptionsToClient, (error, info) => {
            if (error) {
                console.error('Erro ao enviar email para o cliente:', error);
                return res.status(500).send('Erro ao enviar email para o cliente.');
            }

            console.log('Emails enviados com sucesso!');
            res.status(200).send('Emails enviados com sucesso!');
        });
    });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
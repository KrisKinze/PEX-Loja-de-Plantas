/* ============================================================ */
/* CONFIGURAÇÃO DO BANCO DE DADOS */
/* ============================================================ */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'plantas.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco:', err.message);
    } else {
        console.log('✅ Conectado ao banco de dados SQLite');
        criarTabela();
    }
});

/* ============================================================ */
/* CRIAÇÃO E INICIALIZAÇÃO */
/* ============================================================ */

function criarTabela() {
    const sql = `
        CREATE TABLE IF NOT EXISTS plantas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            valor REAL NOT NULL,
            imagem TEXT NOT NULL,
            tamanho TEXT DEFAULT 'Média',
            disponibilidade BOOLEAN DEFAULT 1
        )
    `;
    
    db.run(sql, (err) => {
        if (err) {
            console.error('Erro ao criar tabela:', err.message);
        } else {
            console.log('✅ Tabela "plantas" criada/verificada com sucesso');
            verificarDados();
        }
    });
}

function verificarDados() {
    db.get("SELECT COUNT(*) as total FROM plantas", (err, row) => {
        if (err) {
            console.error('Erro ao verificar dados:', err.message);
        } else if (row.total === 0) {
            console.log('📝 Inserindo dados de exemplo...');
            inserirDadosExemplo();
        } else {
            console.log(`📊 Banco já possui ${row.total} plantas cadastradas`);
        }
    });
}

function inserirDadosExemplo() {
    const plantasExemplo = [
        {
            nome: 'Suculenta Echeveria',
            valor: 25.90,
            imagem: 'images/Plantas/Carousel/PlantasCarousel1.svg',
            tamanho: 'Pequena',
            disponibilidade: 1
        },
        {
            nome: 'Cacto San Pedro',
            valor: 45.50,
            imagem: 'images/Plantas/Carousel/PlantasCarousel2.svg',
            tamanho: 'Média',
            disponibilidade: 1
        },
        {
            nome: 'Planta Jibóia',
            valor: 35.00,
            imagem: 'images/Plantas/Carousel/PlantasCarousel3.svg',
            tamanho: 'Grande',
            disponibilidade: 1
        },
        {
            nome: 'Violeta Africana',
            valor: 18.50,
            imagem: 'images/Plantas/Carousel/PlantasCarousel4.svg',
            tamanho: 'Pequena',
            disponibilidade: 1
        },
        {
            nome: 'Palmeira Ráfis',
            valor: 89.90,
            imagem: 'images/Plantas/Carousel/PlantasCarousel5.svg',
            tamanho: 'Grande',
            disponibilidade: 1
        },
        {
            nome: 'Espada de São Jorge',
            valor: 32.00,
            imagem: 'images/Plantas/Carousel/Planta-CostelaDeAdao.png',
            tamanho: 'Média',
            disponibilidade: 1
        }
    ];

    const sql = `INSERT INTO plantas (nome, valor, imagem, tamanho, disponibilidade) VALUES (?, ?, ?, ?, ?)`;
    
    plantasExemplo.forEach((planta) => {
        db.run(sql, [planta.nome, planta.valor, planta.imagem, planta.tamanho, planta.disponibilidade], (err) => {
            if (err) {
                console.error('Erro ao inserir planta:', err.message);
            } else {
                console.log(`✅ Planta "${planta.nome}" inserida com sucesso`);
            }
        });
    });
}

/* ============================================================ */
/* FUNÇÕES DE BUSCA */
/* ============================================================ */

function buscarTodasPlantas(callback) {
    const sql = "SELECT * FROM plantas WHERE disponibilidade = 1";
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

function buscarPlantaPorId(id, callback) {
    const sql = "SELECT * FROM plantas WHERE id = ?";
    db.get(sql, [id], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
}

/* ============================================================ */
/* EXPORTS */
/* ============================================================ */

module.exports = {
    db,
    buscarTodasPlantas,
    buscarPlantaPorId
};
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo do banco de dados
const DB_PATH = path.join(__dirname, 'plantas.db');

// Conectar ao banco de dados (cria o arquivo se não existir)
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco:', err.message);
    } else {
        console.log('✅ Conectado ao banco de dados SQLite');
        // Criar a tabela quando conectar
        criarTabela();
    }
});

// Função para criar a tabela de plantas
function criarTabela() {
    const sql = `
        CREATE TABLE IF NOT EXISTS plantas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            valor REAL NOT NULL,
            imagem TEXT NOT NULL,
            disponibilidade BOOLEAN DEFAULT 1
        )
    `;
    
    db.run(sql, (err) => {
        if (err) {
            console.error('Erro ao criar tabela:', err.message);
        } else {
            console.log('✅ Tabela "plantas" criada/verificada com sucesso');
            // Verificar se já existem dados, se não, inserir dados de exemplo
            verificarDados();
        }
    });
}

// Função para verificar se existem dados e inserir exemplos se necessário
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

// Função para inserir dados de exemplo
function inserirDadosExemplo() {
    const plantasExemplo = [
        {
            nome: 'Suculenta Echeveria',
            valor: 25.90,
            imagem: 'public/images/Plantas/Carousel/PlantasCarousel1.svg', // Use suas imagens do carrossel
            disponibilidade: 1
        },
        {
            nome: 'Cacto San Pedro',
            valor: 45.50,
            imagem: 'public/images/Plantas/Carousel/PlantasCarousel2.svg',
            disponibilidade: 1
        },
        {
            nome: 'Planta Jibóia',
            valor: 35.00,
            imagem: 'public/images/Plantas/Carousel/PlantasCarousel3.svg',
            disponibilidade: 1
        },
        {
            nome: 'Rosa Vermelha',
            valor: 28.90,
            imagem: 'public/images/Plantas/Carousel/PlantasCarousel4.svg',
            disponibilidade: 1
        }
    ];

    const sql = `INSERT INTO plantas (nome, valor, imagem, disponibilidade) VALUES (?, ?, ?, ?)`;
    
    plantasExemplo.forEach((planta) => {
        db.run(sql, [planta.nome, planta.valor, planta.imagem, planta.disponibilidade], (err) => {
            if (err) {
                console.error('Erro ao inserir planta:', err.message);
            } else {
                console.log(`✅ Planta "${planta.nome}" inserida com sucesso`);
            }
        });
    });
}

// Função para buscar todas as plantas
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

// Função para buscar planta por ID
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

// Exportar as funções para usar em outros arquivos
module.exports = {
    db,
    buscarTodasPlantas,
    buscarPlantaPorId
};
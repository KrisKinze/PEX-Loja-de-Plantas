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
/* INICIALIZAÇÃO DA TABELA */
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
            console.error('❌ Erro ao criar tabela:', err.message);
        } else {
            db.get("SELECT COUNT(*) as total FROM plantas", (err, row) => {
                if (err) {
                    console.error('❌ Erro ao verificar dados:', err.message);
                } else {
                    console.log(`✅ Tabela "plantas" pronta | ${row.total} plantas cadastradas`);
                }
            });
        }
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
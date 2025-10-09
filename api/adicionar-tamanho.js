const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'database', 'plantas.db');

// Conectar ao banco de dados
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Erro ao conectar com o banco:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Conectado ao banco de dados SQLite');
        adicionarColunaTamanho();
    }
});

// Função para adicionar a coluna "tamanho"
function adicionarColunaTamanho() {
    // Primeiro, verificar se a coluna já existe
    db.all("PRAGMA table_info(plantas)", (err, columns) => {
        if (err) {
            console.error('❌ Erro ao verificar estrutura da tabela:', err.message);
            db.close();
            return;
        }

        const temColunaTamanho = columns.some(col => col.name === 'tamanho');

        if (temColunaTamanho) {
            console.log('ℹ️  Coluna "tamanho" já existe!');
            atualizarTamanhos();
        } else {
            console.log('📝 Adicionando coluna "tamanho"...');
            
            const sqlAddColumn = `ALTER TABLE plantas ADD COLUMN tamanho TEXT DEFAULT 'Média'`;
            
            db.run(sqlAddColumn, (err) => {
                if (err) {
                    console.error('❌ Erro ao adicionar coluna:', err.message);
                    db.close();
                } else {
                    console.log('✅ Coluna "tamanho" adicionada com sucesso!');
                    atualizarTamanhos();
                }
            });
        }
    });
}

// Função para atualizar os tamanhos das plantas existentes
function atualizarTamanhos() {
    console.log('📝 Atualizando tamanhos das plantas...');
    
    const atualizacoes = [
        { id: 1, tamanho: 'Pequena' },  // Suculenta Echeveria
        { id: 2, tamanho: 'Grande' },   // Cacto San Pedro
        { id: 3, tamanho: 'Média' },    // Planta Jibóia
        { id: 4, tamanho: 'Pequena' }   // Rosa Vermelha - ALTERADO para ter mais de uma pequena
    ];

    const sql = `UPDATE plantas SET tamanho = ? WHERE id = ?`;
    
    let contador = 0;
    atualizacoes.forEach((atualizacao) => {
        db.run(sql, [atualizacao.tamanho, atualizacao.id], (err) => {
            if (err) {
                console.error(`❌ Erro ao atualizar planta ID ${atualizacao.id}:`, err.message);
            } else {
                console.log(`✅ Planta ID ${atualizacao.id} atualizada para "${atualizacao.tamanho}"`);
            }
            
            contador++;
            if (contador === atualizacoes.length) {
                verificarAtualizacao();
            }
        });
    });
}

// Função para verificar as atualizações
function verificarAtualizacao() {
    console.log('\n📊 Verificando atualizações...');
    
    db.all("SELECT id, nome, tamanho FROM plantas", (err, rows) => {
        if (err) {
            console.error('❌ Erro ao verificar:', err.message);
        } else {
            console.log('\n✅ Plantas atualizadas:');
            console.table(rows);
        }
        
        db.close((err) => {
            if (err) {
                console.error('❌ Erro ao fechar banco:', err.message);
            } else {
                console.log('\n✅ Banco de dados atualizado com sucesso!');
                console.log('🔄 Reinicie o servidor para aplicar as mudanças.');
            }
        });
    });
}

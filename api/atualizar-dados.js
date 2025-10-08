const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'database', 'plantas.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Conectado ao banco de dados');
        atualizarDados();
    }
});

function atualizarDados() {
    console.log('🗑️ Limpando dados antigos...');
    
    db.run("DELETE FROM plantas", (err) => {
        if (err) {
            console.error('Erro ao limpar dados:', err.message);
            process.exit(1);
        } else {
            console.log('✅ Dados antigos removidos');
            inserirDadosNovos();
        }
    });
}

function inserirDadosNovos() {
    console.log('📝 Inserindo novos dados...');
    
    const plantasExemplo = [
        {
            nome: 'Suculenta Echeveria',
            valor: 25.90,
            imagem: 'images/Plantas/Carousel/PlantasCarousel1.svg',
            disponibilidade: 1
        },
        {
            nome: 'Cacto San Pedro',
            valor: 45.50,
            imagem: 'images/Plantas/Carousel/PlantasCarousel2.svg',
            disponibilidade: 1
        },
        {
            nome: 'Planta Jibóia',
            valor: 35.00,
            imagem: 'images/Plantas/Carousel/PlantasCarousel3.svg',
            disponibilidade: 1
        },
        {
            nome: 'Rosa Vermelha',
            valor: 28.90,
            imagem: 'images/Plantas/Carousel/PlantasCarousel4.svg',
            disponibilidade: 1
        }
    ];

    const sql = `INSERT INTO plantas (nome, valor, imagem, disponibilidade) VALUES (?, ?, ?, ?)`;
    
    let inseridos = 0;
    
    plantasExemplo.forEach((planta) => {
        db.run(sql, [planta.nome, planta.valor, planta.imagem, planta.disponibilidade], (err) => {
            if (err) {
                console.error('Erro ao inserir planta:', err.message);
            } else {
                inseridos++;
                console.log(`✅ Planta "${planta.nome}" inserida com sucesso`);
                
                if (inseridos === plantasExemplo.length) {
                    console.log('\n🎉 Todos os dados foram atualizados com sucesso!');
                    db.close();
                    process.exit(0);
                }
            }
        });
    });
}

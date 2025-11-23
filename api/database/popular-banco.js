const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'plantas.db');
const db = new sqlite3.Database(DB_PATH);

const todasAsPlantas = [
    {
        nome: 'Palmeira Ráfia',
        valor: 50.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/Planta-palmeira-rafia-media.jpg',
        tamanho: 'Média'
    },
    {
        nome: 'Croton',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/Planta-croton-pequena.jpg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Costela de Adão',
        valor: 50.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/Planta-costela-de-adao-medio.jpg',
        tamanho: 'Média'
    },
    {
        nome: 'Aglaonema Red Valentine',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/Planta-aglaonema-red-valentine-pequena.jpg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Dinheiro em Penca Pilear',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/Planta-dinheiro-em-penca-media.jpg',
        tamanho: 'Média'
    },
    {
        nome: 'Cróton Misto Brasileirinho',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/Planta-croton-brasileirinho-grande.jpg',
        tamanho: 'Grande'
    },
    {
        nome: 'Lírio do Amazonas',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/Planta-lirio-amazonas-pequena.jpg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Lírio do Amazonas',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/lirio-amazonas-grande.jpg',
        tamanho: 'Grande'
    },
    {
        nome: 'Lírio da Paz',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/Planta-lirio-da-paz-pequena.jpg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Lírio da Paz',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/lirio-paz-media.jpg', //Falta imagem
        tamanho: 'Média'
    },
    {
        nome: 'Lírio da Paz',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/lirio-paz-grande.jpg', // Falta imagem
        tamanho: 'Grande'
    },
    {
        nome: 'Palmeira Ráfia com Mistos',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/Planta-palmeira-rafia-misto-media.jpg',
        tamanho: 'Média'
    },
    {
        nome: 'Maranta Cinza',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/Planta-maranta-cinza-pequena.jpg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Zamiocuca',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/zamiocuca-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Zamiocuca',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/zamiocuca-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Zamiocuca',
        valor: 50.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/Planta-zamiocuca-grande.jpg',
        tamanho: 'Grande'
    },
    {
        nome: 'Aglaonema Café de Salão - Comigo ninguém pode',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/Planta-comigo-ninguem-pode-pequena.jpg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Aglaonema Café de Salão - Comigo ninguém pode',
        valor: 50.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/aglaonema-cafe-grande.jpg', //Falta Imagem
        tamanho: 'Grande'
    },
    {
        nome: 'Areca Bambu',
        valor: 50.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/Planta-areca-bambu-media.jpg',
        tamanho: 'Média'
    },
    {
        nome: 'Grama Pelo de Urso',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/Planta-grama-pelo-de-urso-media.jpg',
        tamanho: 'Média'
    },
    {
        nome: 'Espada de São Jorge',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/espada-sao-jorge-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Comigo-ninguém-pode',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/comigo-ninguem-pode-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Comigo-ninguém-pode',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/comigo-ninguem-pode-grande.jpg', //Falta Imagem
        tamanho: 'Grande'
    },
    {
        nome: 'Dois Amores',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/dois-amores-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Bambu da Sorte',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/bambu-sorte-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Antúrio',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/anturio-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Antúrio',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/anturio-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Antúrio',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/anturio-grande.jpg', //Falta Imagem
        tamanho: 'Grande'
    },
    {
        nome: 'Ora pro nobis',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/ora-pro-nobis-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Ora pro nobis',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/ora-pro-nobis-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Aglaonema Vermelha',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/aglaonema-vermelha-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Aglaonema Vermelha',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/aglaonema-vermelha-grande.jpg', //Falta Imagem
        tamanho: 'Grande'
    },
    {
        nome: 'Avenca',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/avenca-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Avenca',
        valor: 60.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/avenca-grande.jpg', //Falta Imagem
        tamanho: 'Grande'
    },
    {
        nome: 'Árvore da Felicidade',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/arvore-felicidade-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Árvore da Felicidade',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/arvore-felicidade-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Dracena Vermelha',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/dracena-vermelha-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Dracena Vermelha',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/dracena-vermelha-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Orquídea Íris',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/orquidea-iris-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Aglaonema Comigo-ninguém-pode',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/aglaonema-comigo-ninguem-pode-pequena.jpg', //Falta Imagem
        tamanho: 'Pequena'
    },
    {
        nome: 'Jiboia',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/jiboia-media.jpg', //Falta Imagem
        tamanho: 'Média'
    },
    {
        nome: 'Aspargo Alfinete',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/aspargo-alfinete-media.jpg', //Falta Imagem
        tamanho: 'Média'
    }
];

console.log('🗑️  Limpando banco de dados...');
db.run('DELETE FROM plantas', (err) => {
    if (err) {
        console.error('❌ Erro ao limpar banco:', err.message);
        return;
    }
    
    console.log('✅ Banco limpo!\n');
    console.log('📝 Inserindo plantas...\n');
    
    const sql = `INSERT INTO plantas (nome, valor, imagem, tamanho, disponibilidade) VALUES (?, ?, ?, ?, 1)`;
    
    let contador = 0;
    
    todasAsPlantas.forEach((planta, index) => {
        db.run(sql, [planta.nome, planta.valor, planta.imagem, planta.tamanho], function(err) {
            if (err) {
                console.error(`❌ Erro ao inserir "${planta.nome}":`, err.message);
            } else {
                contador++;
                console.log(`✅ [${contador}/${todasAsPlantas.length}] ${planta.nome} - R$ ${planta.valor.toFixed(2)} (${planta.tamanho})`);
            }
            
            if (index === todasAsPlantas.length - 1) {
                setTimeout(() => {
                    console.log(`\n🎉 Processo concluído! ${contador} plantas cadastradas.`);
                    db.close();
                }, 500);
            }
        });
    });
});

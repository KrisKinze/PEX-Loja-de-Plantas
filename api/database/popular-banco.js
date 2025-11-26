const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'plantas.db');
const db = new sqlite3.Database(DB_PATH);

const todasAsPlantas = [
    // Espada São Jorge
    {
        nome: 'Espada São Jorge',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-espada-sao-jorge.jpeg',
        tamanho: 'Pequena'
    },
    // Espadadinha Santa Bárbara
    {
        nome: 'Espadadinha Santa Bárbara',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-espada-sao-jorge-clara.jpeg',
        tamanho: 'Pequena'
    },
    // Espada Santa Bárbara
    {
        nome: 'Espada Santa Bárbara',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-espada-santa-barbara.jpeg',
        tamanho: 'Pequena'
    },
    // Comigo-ninguém-pode
    {
        nome: 'Comigo-ninguém-pode',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-comigo-ninguem-pode.jpeg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Comigo-ninguém-pode',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-comigo-ninguem-pode.jpeg',
        tamanho: 'Média'
    },
    {
        nome: 'Comigo-ninguém-pode',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-comigo-ninguem-pode.jpeg',
        tamanho: 'Grande'
    },
    // Dois Amores
    {
        nome: 'Dois Amores',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-dois-amores.jpeg',
        tamanho: 'Pequena'
    },
    // Bambu da Sorte
    {
        nome: 'Bambu da Sorte',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-bamboo-da-sorte.jpeg',
        tamanho: 'Média'
    },
    // Antúrio / Alocácia
    {
        nome: 'Antúrio / Alocácia',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-anturio.jpeg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Antúrio / Alocácia',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-anturio.jpeg',
        tamanho: 'Média'
    },
    {
        nome: 'Antúrio / Alocácia',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-anturio.jpeg',
        tamanho: 'Grande'
    },
    // Ora-pro-nóbis
    {
        nome: 'Ora-pro-nóbis',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-ora-pro-nobis (2).jpeg',
        tamanho: 'Pequena'
    },
    // Aglaonema Vermelho
    {
        nome: 'Aglaonema Vermelho',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-aglaonema-vermelho.jpeg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Aglaonema Vermelho',
        valor: 50.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-aglaonema-vermelho.jpg',
        tamanho: 'Média'
    },
    // Avenca
    {
        nome: 'Avenca',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-avenca.jpeg', // Placeholder: Imagem Pequena não encontrada
        tamanho: 'Pequena'
    },
    {
        nome: 'Avenca',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-avenca.jpeg',
        tamanho: 'Média'
    },
    // Árvore da Felicidade
    {
        nome: 'Árvore da Felicidade',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-arvore-da-felicidade-femea.jpeg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Árvore da Felicidade',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-arvore-da-felicidade.jpeg',
        tamanho: 'Média'
    },
    // Dracena Vermelha
    {
        nome: 'Dracena Vermelha',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-dracena-vermelha.jpeg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Dracena Vermelha',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-dracena-vermelha.jpeg',
        tamanho: 'Média'
    },
    // Orquídea Iris
    {
        nome: 'Orquídea Iris',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-orquidia-iris.jpeg',
        tamanho: 'Média'
    },
    // Jiboia
    {
        nome: 'Jiboia',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-jiboia.jpeg', // Placeholder: Imagem Pequena não encontrada
        tamanho: 'Pequena'
    },
    {
        nome: 'Jiboia',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-jiboia.jpeg',
        tamanho: 'Grande'
    },
    // Aspargo Alfinete
    {
        nome: 'Aspargo Alfinete',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-aspargo-alfinete.jpeg',
        tamanho: 'Média'
    },
    // Palmeira Ráfia
    {
        nome: 'Palmeira Ráfia',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-palmeira-rafia.jpg', // Placeholder: Imagem Média não encontrada
        tamanho: 'Média'
    },
    {
        nome: 'Palmeira Ráfia',
        valor: 50.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-palmeira-rafia.jpg',
        tamanho: 'Grande'
    },
    // Cróton
    {
        nome: 'Cróton',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-croton.jpg',
        tamanho: 'Média'
    },
    // Costela de Adão
    {
        nome: 'Costela de Adão',
        valor: 80.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-costela-de-adao.jpg',
        tamanho: 'Grande'
    },
    // Dinheiro-em-penca
    {
        nome: 'Dinheiro-em-penca',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-dinheiro-em-penca.jpg',
        tamanho: 'Média'
    },
    // Cróton Brasileirinho
    {
        nome: 'Cróton Brasileirinho',
        valor: 20.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-croton.jpg', // Placeholder: Imagem específica não encontrada
        tamanho: 'Média'
    },
    {
        nome: 'Cróton Brasileirinho',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-croton-brasileirinho.jpg',
        tamanho: 'Grande'
    },
    // Lírio do Amazonas
    {
        nome: 'Lírio do Amazonas',
        valor: 35.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-lirio-amazonas.jpeg',
        tamanho: 'Grande'
    },
    // Lírio da Paz
    {
        nome: 'Lírio da Paz',
        valor: 35.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-lirio-da-paz.jpeg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Lírio da Paz',
        valor: 35.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-lirio-da-paz.jpeg',
        tamanho: 'Média'
    },
    {
        nome: 'Lírio da Paz',
        valor: 35.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-lirio-da-paz.jpeg',
        tamanho: 'Grande'
    },
    // Palmeira Ráfia (Variados)
    {
        nome: 'Palmeira Ráfia (Variados)',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-palmeira-rafia-misto.jpg',
        tamanho: 'Média'
    },
    // Maranta-cinza
    {
        nome: 'Maranta-cinza',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-maranta-cinza.jpg',
        tamanho: 'Pequena'
    },
    // Zamioculca
    {
        nome: 'Zamioculca',
        valor: 15.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-zamiocuca.jpeg',
        tamanho: 'Pequena'
    },
    {
        nome: 'Zamioculca',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-zamiocuca.jpeg',
        tamanho: 'Média'
    },
    {
        nome: 'Zamioculca',
        valor: 50.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-zamiocuca.jpeg',
        tamanho: 'Grande'
    },
    // Aglaonema Café de Salão
    {
        nome: 'Aglaonema Café de Salão',
        valor: 40.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Grandes/g-cafe-de-salao.jpeg',
        tamanho: 'Grande'
    },
    // Areca Bambu
    {
        nome: 'Areca Bambu',
        valor: 25.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-areca-bambu.jpg',
        tamanho: 'Média'
    },
    // Grama-Pelo-de-Urso
    {
        nome: 'Grama-Pelo-de-Urso',
        valor: 35.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-grama-pelo-de-urso.jpg',
        tamanho: 'Média'
    },
    // Cheflera
    {
        nome: 'Cheflera',
        valor: 30.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Medias/m-cheflera.jpeg',
        tamanho: 'Média'
    },
    // Tapete de Rainha
    {
        nome: 'Tapete de Rainha',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-tapete-de-rainha.jpeg',
        tamanho: 'Pequena'
    },
    // Mudas de Dama da Noite
    {
        nome: 'Mudas de Dama da Noite',
        valor: 10.00,
        imagem: 'images/Plantas/CatalogoDePlantas/Pequenas/p-mudas-de-dama-da-noite.jpeg',
        tamanho: 'Pequena'
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

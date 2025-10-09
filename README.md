# Jardim Vital - Landing Page para Loja de Plantas (Projeto de Extensão - PEX)

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

## 📝 Descrição

Este projeto consiste no desenvolvimento de uma landing page interativa e responsiva para a loja de plantas local "Jardim Vital". Foi realizado como parte do **Projeto de Extensão (PEX)** da faculdade, com o objetivo de aplicar conhecimentos de desenvolvimento web front-end para criar uma presença online funcional e atraente para um pequeno negócio.

A página apresenta informações sobre a loja, um catálogo visual de produtos, detalhes de contato e localização.

## 🆕 ATUALIZAÇÃO (Outubro 2025)

### Novos Recursos Implementados
- **Sistema de Filtros:** Filtragem de plantas por tamanho (Pequena/Média/Grande)
- **Menu Sticky:** Menu de abas fixo ao rolar a página
- **Banco de Dados SQLite:** Estrutura completa com tabela de plantas
- **Carrossel Navegável:** Botões de navegação e arraste no catálogo
- **Resetar Carrinho:** Botão para limpar itens do carrinho
- **Tags de Tamanho:** Indicação visual do tamanho nas imagens das plantas

### Melhorias de Interface
- Header fixo com scroll suave
- Design totalmente responsivo (368px até 1920px+)
- Zoom responsivo no título do catálogo
- Carrossel horizontal no catálogo de plantas
- Animações aprimoradas nas notificações

### Estrutura do Banco de Dados
- **Tabela:** plantas (id, nome, valor, imagem, tamanho, disponibilidade)
- **API REST:** Endpoints para buscar plantas (`/api/plantas`, `/api/plantas/:id`)
- **6 plantas de exemplo** para teste
- **Documentação:** Guia completo de imagens (`GUIA.md`)

### Arquitetura
- **Backend:** Node.js + Express + SQLite (hospedado no Render)
- **Frontend:** HTML/CSS/JavaScript (hospedado no GitHub Pages)
- **Separação:** API no Render, interface no GitHub Pages

**Nota:** O banco de dados está pronto para receber as informações reais das plantas. Consulte o arquivo `public/images/Plantas/CatalogoDePlantas/GUIA.md` para especificações de imagens.

<!-- Adicionando Screenshots -->

![Visão Geral da Página Inicial](screenshots/paginaCompleta.jpg)
*Visão geral da página no modo claro.*

![Cabeçalho da página](screenshots/Cabecalho.jpg)
*Visão do cabeçalho, topo da página.*

![Carrousel de Plantas](screenshots/carrousel.jpg)
*Visão do carrousel da página.*

![Catálogo de Produtos](screenshots/catalogoDePlantas.jpg)
*Exemplo do catálogo de produtos.*

![Aba dos Contatos](screenshots/Contatos.jpg)
*Visão da aba de contatos, com formulário para envio de e-mail.*

![Aba de localização](screenshots/localizacao.jpg)
*Visualização da aba de localização. Com endereço e google maps integrado*



<!-- Fim dos Screenshots -->

## ✨ Funcionalidades Principais

### Interface e Navegação
*   **Design Responsivo:** Interface totalmente adaptada para desktops, tablets e smartphones (368px - 1920px+)
*   **Header Fixo:** Cabeçalho permanece visível durante a rolagem
*   **Menu Sticky:** Menu de abas fixa ao rolar, facilitando navegação
*   **Modo Noturno:** Alternância entre tema claro e escuro com persistência (localStorage)
*   **Navegação por Abas:** Conteúdo organizado em seções (Nossas Plantas, Localização, Contato)

### Catálogo de Plantas
*   **Carrossel de Imagens:** Apresentação automática e navegável de fotos de plantas
*   **Carrossel Horizontal:** Catálogo em formato carrossel com botões de navegação
*   **Sistema de Filtros:** Filtragem por tamanho (Pequena/Média/Grande)
*   **Cards Informativos:** Exibição de imagem, nome, preço e tamanho
*   **Tags Visuais:** Indicação do tamanho sobre as imagens
*   **Banco de Dados:** Integração com SQLite via API REST

### Carrinho e Contato
*   **Adicionar ao Carrinho:** Funcionalidade para selecionar plantas desejadas
*   **Resetar Carrinho:** Botão para limpar itens selecionados
*   **Notificações:** Toasts informativos para feedback ao usuário
*   **Formulário de Contato:** Envio de mensagem + itens do carrinho por e-mail
*   **Validação:** Campos obrigatórios validados

### Localização
*   **Google Maps:** Integração com mapa interativo
*   **Endereço Completo:** Informações detalhadas de localização

### API REST
*   **GET /api/plantas:** Lista todas as plantas disponíveis
*   **GET /api/plantas/:id:** Busca planta específica por ID
*   **POST /enviar-email:** Envio de mensagens do formulário de contato

## 🚀 Tecnologias Utilizadas

### Frontend
*   **HTML5:** Estruturação semântica do conteúdo
*   **CSS3:** Estilização, layout (Flexbox, Grid), responsividade (Media Queries) e animações
*   **JavaScript (ES6+):** Interatividade, manipulação do DOM, sistema de filtros, carrossel
*   **Bootstrap 5:** Componente de Abas (Tabs)
*   **Shoelace:** Componentes Web (Carousel, Icon Button, Icon)

### Backend
*   **Node.js:** Runtime JavaScript
*   **Express:** Framework web para APIs REST
*   **SQLite3:** Banco de dados relacional leve
*   **Nodemailer:** Envio de e-mails via SMTP
*   **dotenv:** Gerenciamento de variáveis de ambiente
*   **CORS:** Configuração de Cross-Origin Resource Sharing

### Integrações
*   **Google Maps Embed API:** Exibição do mapa de localização

## 🔧 Como Executar Localmente

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- Git instalado

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/KrisKinze/PEX-Loja-de-Plantas.git
    cd PEX-Loja-de-Plantas
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    
    Crie um arquivo `.env` na pasta `api/` com o seguinte conteúdo:
    ```dotenv
    EMAIL_USER=seu_email_remetente@gmail.com
    EMAIL_PASS=sua_senha_de_app_do_gmail
    EMAIL_DEST=email_destino@exemplo.com
    ```
    > ⚠️ **Importante:** Use uma [Senha de App do Gmail](https://support.google.com/accounts/answer/185833?hl=pt-BR), não sua senha normal.

4.  **Inicie o servidor:**
    ```bash
    cd api
    node server.js
    ```
    
    Você verá:
    ```
    ✅ Conectado ao banco de dados SQLite
    ✅ Tabela "plantas" criada/verificada com sucesso
    Servidor rodando na porta 3000
    ```

5.  **Acesse no navegador:**
    
    Abra `http://localhost:3000`

### Testando a API

Você pode testar os endpoints da API diretamente:

```bash
# Buscar todas as plantas
curl http://localhost:3000/api/plantas

# Buscar planta específica por ID
curl http://localhost:3000/api/plantas/1
```

### Banco de Dados

O banco de dados SQLite (`plantas.db`) é criado automaticamente na primeira execução em `api/database/`. Ele vem com 6 plantas de exemplo para teste.

**Para adicionar suas próprias plantas:**
1. Edite o arquivo `api/database/database.js`
2. Modifique o array `plantasExemplo`
3. Delete o arquivo `api/database/plantas.db`
4. Reinicie o servidor (o banco será recriado)

**Consulte o guia:** `public/images/Plantas/CatalogoDePlantas/GUIA.md` para especificações de imagens.


## 🔗 Deploy

Você pode visualizar o projeto em funcionamento [aqui](https://kriskinze.github.io/PEX-Loja-de-Plantas/). 

*(O backend que processa o formulário de contato está hospedado separadamente no Render).*

## 👨‍💻 Autor

*   **Cristhian Campelo** - [campelo.cfc@gmail.com]

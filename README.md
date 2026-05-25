# Jardim Vital — Loja de Plantas (Projeto de Extensão - PEX)





🔗 **Acesse o projeto online:** [Jardim Vital — GitHub Pages](https://cristhian-campelo.github.io/Jardim-da-Vital/)

***

## 📝 Descrição

Desenvolvimento de uma landing page interativa e responsiva para a loja de plantas local **"Jardim Vital"**, realizado como parte do **Projeto de Extensão (PEX)** da faculdade de Análise e Desenvolvimento de Sistemas. O objetivo é aplicar na prática conhecimentos de desenvolvimento web front-end e integrações com serviços externos, criando uma presença online funcional para um pequeno negócio local.

***

## 🎬 Demonstração

> 📂 Todos os GIFs estão na pasta [`/gifs`](./gifs/) e os prints na pasta [`/screenshots`](./screenshots/).

### Catálogo com Filtros
![usando filtros do catalogo de plantas](/gifs/gif%20-%20página%20inicial%20-%20usando%20filtros%20do%20catalogo%20de%20plantas.gif)

### Carrinho de Compras
![usando carrinho de compras da página inicial](/gifs/gif%20-%20página%20inicial%20-%20usando%20carrinho.gif)


### Painel Administrativo
![Logando no painel administrativo](/gifs/gif%20-%20página%20administrativa%20-%20logando%20no%20Painel.gif)

### Modo Visitante
![Entrando no painel administrativo como visitante](/gifs/gif%20-%20página%20administrativa%20-%20entrando%20no%20modo%20visitante.gif)

***

## 📸 Screenshots

> 📂 Todos os prints estão disponíveis na pasta [`/screenshots`](./screenshots/) para visualização detalhada.


*Página inicial no modo claro.*
![](/screenshots/print%20-%20pagina%20inicial%201%20-%20modo%20claro.png)

*Painel administrativo com listagem de plantas.*
![](/screenshots/print%20-%20pagina%20administrativa%20-%20gerenciador%20de%20plantas%20-%20modo%20claro.png)

*Catálogo dinâmico com filtros por tamanho.*
![](/screenshots/print%20-%20pagina%20inicial%20-%20catalogo%20de%20plantas%20-%20modo%20claro.png)

*Formulário de contato integrado ao EmailJS.*
![](/screenshots/print%20-%20pagina%20inicial%20-%20filtros%20do%20catalogo%20de%20plantas%20-%20modo%20claro.png)

*Seção de localização com Google Maps.*
![](/screenshots/print%20-%20pagina%20inicial%20-%20localizacao%20-%20modo%20claro.png)

***

## 🆕 v3.0 — Migração para Supabase + Painel Administrativo (2026)

Esta versão representa uma refatoração completa da arquitetura do projeto, eliminando o backend próprio e substituindo por serviços externos gerenciados.

### Principais mudanças

- **Migração de Backend:** Substituição completa do servidor Node.js/Express + SQLite hospedado no Render pelo **Supabase** como banco de dados e API. O banco deixou de existir dentro do código e passou a ser um serviço externo independente.
- **Imagens no Supabase Storage:** Todas as imagens do catálogo foram migradas para o **Supabase Storage**, gerando URLs públicas estáveis para uso no front-end.
- **E-mail via EmailJS:** O envio de formulário de contato foi migrado do Nodemailer (Node.js) para o **EmailJS**, eliminando a necessidade de qualquer servidor para essa função. Limite de 200 envios/mês no plano gratuito.
- **Painel Administrativo (`admin.html`):** Criação de uma interface administrativa completa e protegida, integrada diretamente ao front-end do projeto, permitindo gerenciar o catálogo de plantas sem acessar o painel do Supabase.
- **Autenticação Real:** Login com `supabase.auth.signInWithPassword()`, substituindo a autenticação falsa por credenciais no código JavaScript.
- **Segurança com RLS:** Políticas de **Row Level Security** ativas no banco de dados — qualquer tentativa de escrita, edição ou exclusão sem sessão autenticada válida é bloqueada diretamente no servidor, independente do que aconteça no navegador.
- **Projeto 100% Estático:** Com a remoção do backend próprio, o projeto passou a ser servido inteiramente pelo GitHub Pages, sem necessidade de servidor Node.js.

***

## ✨ Funcionalidades

### Interface Pública (`index.html`)

- **Design Responsivo:** Adaptado para desktop, tablet e smartphone.
- **Modo Noturno:** Alternância entre tema claro e escuro.
- **Catálogo Dinâmico:** Plantas carregadas em tempo real via API do Supabase.
- **Filtros por Tamanho:** Filtragem por porte (Pequena, Média, Grande).
- **Carrinho de Compras:** Adição de itens, resumo e notificações visuais (Toast).
- **Formulário de Contato:** Envio de mensagens via EmailJS, sem backend próprio.
- **Localização:** Integração com Google Maps.

### Painel Administrativo (`admin.html`)

- **Login seguro** via Supabase Auth (e-mail + senha, sem credenciais no código).
- **Logout com limpeza de sessão** — encerra sessão no servidor e limpa dados da memória.
- **Listagem de plantas** com busca e filtros em tempo real.
- **Criar planta** — formulário sem o campo "Reservadas" (irrelevante na criação).
- **Editar planta** — formulário completo com todos os campos, incluindo "Reservadas".
- **Excluir planta** com confirmação.
- **Habilitar/Desabilitar** disponibilidade sem excluir o registro.
- **Regras de validação:** impede quantidades negativas, reservas maiores que o estoque total e campos obrigatórios em branco.

***

## 🔒 Segurança

A proteção do banco de dados opera em duas camadas independentes:

| Camada | O que faz |
|---|---|
| **Supabase Auth** | Autentica o usuário com e-mail e senha criptografada no servidor. Nenhuma credencial fica no código. |
| **Row Level Security (RLS)** | Políticas no banco que bloqueiam `INSERT`, `UPDATE` e `DELETE` para qualquer requisição sem token de sessão válido — inclusive chamadas diretas pela API, independente do front-end. |

> A `anon key` do Supabase exposta no front-end é **intencional e segura**: ela só concede permissão de leitura pública. Todas as operações de escrita exigem autenticação.

### 👁️ Modo Visitante

A página de login oferece a opção **"Entrar como Visitante"**, permitindo explorar o layout e a interface da área administrativa sem autenticação. Nenhuma modificação é possível neste modo: todas as operações de escrita são bloqueadas diretamente pelas políticas de segurança (RLS) do Supabase, independentemente da interface. Um banner de aviso é exibido no topo da tela para indicar que o usuário está em modo somente leitura.

***

## 🚀 Tecnologias

| Camada | Tecnologia |
|---|---|
| Front-end | HTML5, CSS3, JavaScript (ES6+), Bootstrap 5 |
| Banco de dados | Supabase (PostgreSQL) |
| Armazenamento de imagens | Supabase Storage |
| Autenticação | Supabase Auth |
| E-mail | EmailJS |
| Hospedagem | GitHub Pages |
| Mapas | Google Maps API |

***

## 📁 Estrutura do Projeto

```
Jardim-da-Vital/
├── index.html                    # Página pública da loja
├── admin.html                    # Painel administrativo protegido
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── supabase.js               # Configuração e conexão com o Supabase
│       ├── plantas.js                # Carregamento do catálogo público
│       ├── admin.js                  # Lógica completa do painel administrativo
│       └── enviodoformulario.js      # Integração com EmailJS
├── screenshots/                  # Prints estáticos do projeto
└── gifs/                         # Demonstrações animadas das funcionalidades
```

***

## ▶️ Como Executar Localmente

O projeto é **100% estático** — não requer instalação de dependências ou servidor local.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/KrisKinze/PEX-Loja-de-Plantas.git
   cd PEX-Loja-de-Plantas
   ```

2. **Abra o arquivo diretamente no navegador:**
   ```
   index.html
   ```
   Ou use a extensão **Live Server** no VS Code para uma experiência melhor.

3. **Para acessar o painel administrativo:**
   Abra `admin.html` e faça login com as credenciais cadastradas no Supabase Auth.
   Ou clique em **"Entrar como Visitante"** para explorar o layout sem autenticação.

> **Nota:** As integrações com Supabase e EmailJS dependem das chaves de API configuradas no `supabase.js` e `enviodoformulario.js`. Para rodar uma instância própria, substitua pelas suas chaves nos respectivos projetos.

***

## 📋 Histórico de Versões

| Versão | Descrição |
|---|---|
| **v3.0** (2026) | Migração para Supabase, criação do painel administrativo, autenticação real com RLS, modo visitante, remoção completa do backend Node.js |
| **v2.0** (Nov/2025) | Correção de caminhos de imagens para GitHub Pages, deploy no Render, expansão do catálogo para 46 espécies |
| **v1.0** | Versão inicial — landing page com backend Node.js/Express + SQLite |

***

## 👨‍💻 Autor

**Cristhian Campelo** — [campelo.cfc@gmail.com](mailto:campelo.cfc@gmail.com)
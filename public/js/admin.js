// ================================================================
// ADMIN.JS — Lógica do painel administrativo integrado ao SUPABASE
// ================================================================
import { supabase } from './supabase.js';

let estadoPlantas = []; // Global para armazenar as plantas baixadas do Supabase
let estoqueTotal = 0; // Guarda disponivel + reservada original ao abrir edição

// ================================================================
// AÇÕES DO SUPABASE
// ================================================================

async function carregarPlantas() {
    try {
        const { data, error } = await supabase.from('plantas').select('*').order('id', { ascending: true });
        if (error) throw error;
        estadoPlantas = data || [];
    } catch (err) {
        console.error("Erro ao carregar plantas DB:", err);
        estadoPlantas = [];
    }
}

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

// ================================================================
// LOGIN
// ================================================================

const loginOverlay = document.getElementById("admin-login-overlay");
const adminPainel = document.getElementById("admin-painel");
const formLogin = document.getElementById("form-login");
const loginErro = document.getElementById("login-erro");
const toggleSenha = document.getElementById("toggle-senha");
const inputSenha = document.getElementById("login-senha");

toggleSenha.addEventListener("click", () => {
    const visivel = inputSenha.type === "text";
    inputSenha.type = visivel ? "password" : "text";
    toggleSenha.innerHTML = visivel ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
});

// MARCADOR ASYNC AQUI
formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btnEntrar = document.getElementById("btn-entrar");
    btnEntrar.disabled = true;
    btnEntrar.textContent = "Carregando...";

    const email = document.getElementById("login-usuario").value.trim();
    const senha = document.getElementById("login-senha").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
    });

    if (error) {
        loginErro.hidden = false;
        loginErro.textContent = "E-mail ou senha incorretos.";
        inputSenha.value = "";
        inputSenha.focus();
    } else {
        await carregarPlantas();
        loginOverlay.hidden = true;
        adminPainel.hidden = false;
        renderizarLista();
    }

    btnEntrar.disabled = false;
    btnEntrar.innerHTML = 'Entrar <i class="bi bi-box-arrow-in-right"></i>';
});

document.getElementById("btn-sair").addEventListener("click", async () => {

    await supabase.auth.signOut();

    estadoPlantas = [];
    document.getElementById("admin-lista-plantas").innerHTML = "";

    adminPainel.hidden = true;
    loginOverlay.hidden = false;
    document.getElementById("login-usuario").value = "";
    document.getElementById("login-senha").value = "";
    loginErro.hidden = true;
});

// ================================================================
// ABAS DO PAINEL
// ================================================================

const abaBotoes = document.querySelectorAll(".admin-aba");
const abaPlantas = document.getElementById("aba-plantas");
const abaAdicionar = document.getElementById("aba-adicionar");

abaBotoes.forEach((btn) => {
    btn.addEventListener("click", () => {
        abaBotoes.forEach((b) => b.classList.remove("ativa"));
        btn.classList.add("ativa");

        const aba = btn.dataset.aba;
        abaPlantas.hidden = aba !== "plantas";
        abaAdicionar.hidden = aba !== "adicionar";

        if (aba === "plantas") renderizarLista();
        if (aba === "adicionar") resetarFormulario();
    });
});

// ================================================================
// LISTA DE PLANTAS
// ================================================================

const listaEl = document.getElementById("admin-lista-plantas");
const contadorEl = document.getElementById("admin-total-plantas");
const inputBusca = document.getElementById("admin-busca");
const filtroTamanho = document.getElementById("admin-filtro-tamanho");
const filtroDisp = document.getElementById("admin-filtro-disponibilidade");

function renderizarLista() {
    const plantas = estadoPlantas;
    const busca = inputBusca.value.toLowerCase();
    const tamanho = filtroTamanho.value;
    const disp = filtroDisp.value; // "", "disponivel", "indisponivel", "reservado"

    const filtradas = plantas.filter((p) => {
        const nomeOk = p.nome.toLowerCase().includes(busca);
        const tamanhoOk = tamanho ? p.tamanho === tamanho : true;

        let dispOk = true;
        if (disp === "disponivel") dispOk = Number(p.disponivel) > 0;
        if (disp === "indisponivel") dispOk = Number(p.disponivel) === 0;
        if (disp === "reservado") dispOk = Number(p.reservada) > 0;

        return nomeOk && tamanhoOk && dispOk;
    });

    contadorEl.textContent = `${filtradas.length} planta${filtradas.length !== 1 ? "s" : ""} encontrada${filtradas.length !== 1 ? "s" : ""}`;

    if (filtradas.length === 0) {
        listaEl.innerHTML = `
      <div class="admin-empty">
        <i class="bi bi-flower1"></i>
        <p>Nenhuma planta encontrada.</p>
      </div>`;
        return;
    }

    listaEl.innerHTML = filtradas.map((p) => {
        const qtdDisp = Number(p.disponivel) || 0;
        const qtdRes = Number(p.reservada) || 0;
        const semEstoque = qtdDisp === 0;

        // Badges de status
        const badgeDisp = semEstoque
            ? `<span class="admin-badge admin-badge-indisponivel">🚫 Indisponível: 0</span>`
            : `<span class="admin-badge admin-badge-disponivel">✅ Disponível: ${qtdDisp}</span>`;

        const badgeRes = qtdRes > 0
            ? `<span class="admin-badge admin-badge-reservado">🔒 Reservado: ${qtdRes}</span>`
            : ``;

        return `
  <div class="admin-planta-card ${semEstoque ? "admin-card-sem-estoque" : ""}" data-id="${p.id}">
    
    <img
      class="admin-card-img"
      src="${p.imagem_url || p.imagem_url || ''}"
      alt="${p.nome}"
      loading="lazy"
      onerror="this.src='public/images/Icons/Inicio Catalogo de itens.svg'"
    />

    <div class="admin-card-info">
  <p class="admin-card-nome">${p.nome}</p>
  <p class="admin-card-detalhe">${p.tamanho ?? ""}</p>

  <div class="admin-card-badges">
    ${badgeDisp}
    ${badgeRes}
  </div>

  <p class="admin-card-preco">R$ ${Number(p.preco || 0).toFixed(2).replace(".", ",")}</p>
</div>

    <div class="admin-card-acoes-linha">
      <button class="admin-btn-acao admin-btn-editar" onclick="editarPlanta('${p.id}')">
        <i class="bi bi-pencil"></i> Editar
      </button>
      <button class="admin-btn-acao admin-btn-toggle" onclick="toggleDisponibilidade('${p.id}')">
        <i class="bi bi-toggle-on"></i> ${semEstoque ? "Disponibilizar" : "Desabilitar"}
      </button>
      <button class="admin-btn-acao admin-btn-excluir" onclick="excluirPlanta('${p.id}')">
        <i class="bi bi-trash"></i> Excluir
      </button>
    </div>

  </div>`;
    }).join("");
}


// Filtros locais em tempo real
[inputBusca, filtroTamanho, filtroDisp].forEach((el) => {
    el.addEventListener("input", renderizarLista)
});

// ================================================================
// ACTIONS (UPDATE E DELETE) NO SUPABASE
// ================================================================

window.toggleDisponibilidade = async function (id) {
    const planta = estadoPlantas.find((p) => String(p.id) === String(id));
    if (!planta) return;

    const qtdAtual = Number(planta.disponivel) || 0;
    const novoValor = qtdAtual > 0 ? 0 : 1;

    const { error } = await supabase
        .from('plantas')
        .update({ disponivel: novoValor })
        .eq('id', id);

    if (error) {
        alert("Erro ao alterar disponibilidade.");
        return;
    }

    await carregarPlantas();
    renderizarLista();
};

window.excluirPlanta = async function (id) {
    const planta = estadoPlantas.find((p) => String(p.id) === String(id));
    if (!planta) return;
    if (!confirm(`Excluir "${planta.nome}" permanentemente do BD?`)) return;

    const { error } = await supabase.from('plantas').delete().eq('id', id);
    if (error) {
        alert("Erro ao excluir do banco de dados.");
        return;
    }

    await carregarPlantas();
    renderizarLista();
};

// ================================================================
// FORMULÁRIO DE EDIÇÃO / INSERÇÃO 
// ================================================================

const formPlanta = document.getElementById("form-planta");
const campoIdEdit = document.getElementById("planta-id-edit");
const campoNome = document.getElementById("planta-nome");
const campoTamanho = document.getElementById("planta-tamanho");
const campoPreco = document.getElementById("planta-preco");
const campoImagem = document.getElementById("planta-imagem"); // Mantido o id do form do HTML
const campoReservada = document.getElementById("planta-reservada");
const campoDisponivel = document.getElementById("planta-disponivel");
const tituloForm = document.getElementById("admin-form-titulo");
const btnCancelarEdicao = document.getElementById("btn-cancelar-edicao");

// ================================================================
// REGRA: Reservada desconta do Disponível automaticamente
// ================================================================
function atualizarDisponivelPorReserva() {
    const reservadas = parseInt(campoReservada.value) || 0;
    const novoDisponivel = estoqueTotal - reservadas;


    if (reservadas > estoqueTotal) {
        campoReservada.value = estoqueTotal; // impede ultrapassar o total
        campoDisponivel.value = 0;
    } else {
        campoDisponivel.value = Math.max(0, novoDisponivel);
    }
}


campoReservada.addEventListener('input', atualizarDisponivelPorReserva);

function resetarFormulario() {
    const btnExcluirEdicao = document.getElementById("btn-excluir-edicao");
    if (btnExcluirEdicao) btnExcluirEdicao.hidden = true;

    campoIdEdit.value = "";
    formPlanta.reset();
    campoDisponivel.value = 0;
    campoReservada.value = 0;
    estoqueTotal = 0;

    // Esconde preview de edição
    document.getElementById("admin-preview-imagem").hidden = true;
    document.getElementById("admin-preview-img").src = "";
    document.getElementById("admin-preview-nome").textContent = "";

    tituloForm.innerHTML = '<i class="bi bi-plus-circle"></i> Adicionar Nova Planta';
    btnCancelarEdicao.hidden = true;

    document.getElementById('campo-reservada').style.display = 'none';

}

window.editarPlanta = function (id) {
    const planta = estadoPlantas.find((p) => String(p.id) === String(id));
    if (!planta) return;

    abaBotoes.forEach((b) => b.classList.remove("ativa"));
    document.querySelector('[data-aba="adicionar"]').classList.add("ativa");
    abaPlantas.hidden = true;
    abaAdicionar.hidden = false;

    campoIdEdit.value = planta.id;
    campoNome.value = planta.nome ?? "";
    campoTamanho.value = planta.tamanho ?? "";
    campoPreco.value = planta.preco ?? "";
    campoImagem.value = planta.imagem_url || "";
    campoDisponivel.value = Number(planta.disponivel) || 0;
    campoReservada.value = Number(planta.reservada) || 0;
    estoqueTotal = (Number(planta.disponivel) || 0) + (Number(planta.reservada) || 0);

    document.getElementById('campo-reservada').style.display = '';


    // Preview da imagem no topo
    const previewBox = document.getElementById("admin-preview-imagem");
    const previewImg = document.getElementById("admin-preview-img");
    const previewNome = document.getElementById("admin-preview-nome");
    previewImg.src = planta.imagem_url || "";
    previewNome.textContent = "";
    previewBox.hidden = false;

    tituloForm.innerHTML = `<i class="bi bi-pencil-square"></i> Editando: ${planta.nome}`;
    btnCancelarEdicao.hidden = false;

    const btnExcluirEdicao = document.getElementById("btn-excluir-edicao");
    if (btnExcluirEdicao) {
        btnExcluirEdicao.hidden = false;
        btnExcluirEdicao.onclick = () => excluirPlanta(planta.id);
    }

    abaAdicionar.scrollIntoView({ behavior: "smooth" });
};

btnCancelarEdicao.addEventListener("click", () => {
    resetarFormulario();
    abaBotoes.forEach((b) => b.classList.remove("ativa"));
    document.querySelector('[data-aba="plantas"]').classList.add("ativa");
    abaPlantas.hidden = false;
    abaAdicionar.hidden = true;
    renderizarLista();
});

formPlanta.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnSalvarRef = e.submitter || document.querySelector('#form-planta button[type="submit"]');
    const labelOriginal = btnSalvarRef.innerHTML;
    btnSalvarRef.disabled = true;
    btnSalvarRef.textContent = "Salvando...";

    const id = campoIdEdit.value;
    const qtdDisp = parseInt(campoDisponivel.value) || 0;
    const qtdReservada = parseInt(campoReservada.value) || 0;

    // Validação: reservado não pode ser maior que disponível
    if (qtdReservada > estoqueTotal) {
        alert(`⚠️ Reservado (${qtdReservada}) não pode ser maior que o estoque total (${estoqueTotal}).`);
        btnSalvarRef.disabled = false;
        btnSalvarRef.innerHTML = labelOriginal;
        return;
    }

    const dadosSalvar = {
        nome: campoNome.value.trim(),
        tamanho: campoTamanho.value,
        preco: parseFloat(campoPreco.value) || 0,
        imagem_url: campoImagem.value.trim(),
        disponivel: qtdDisp,
        reservada: qtdReservada,
    };

    if (!dadosSalvar.nome || !dadosSalvar.tamanho || campoPreco.value === "" || campoDisponivel.value === "") {
        alert("Preencha os campos obrigatórios: Nome, Tamanho, Preço, Imagem e Quantidade Disponível.");
        btnSalvarRef.disabled = false;
        btnSalvarRef.innerHTML = labelOriginal;
        return;
    }

    if (dadosSalvar.preco < 0 || dadosSalvar.disponivel < 0 || dadosSalvar.reservada < 0) {
        alert("Preços e estoques não podem ser números negativos.");
        btnSalvarRef.disabled = false;
        btnSalvarRef.innerHTML = labelOriginal;
        return;
    }

    let deuErro = false;
    if (id) {
        const { error } = await supabase.from("plantas").update(dadosSalvar).eq("id", id);
        if (error) deuErro = true;
    } else {
        const { error } = await supabase.from("plantas").insert([dadosSalvar]);
        if (error) deuErro = true;
    }

    if (deuErro) {
        alert("Erro ao salvar no banco de dados.");
    } else {
        await carregarPlantas();
        resetarFormulario();
        abaBotoes.forEach((b) => b.classList.remove("ativa"));
        document.querySelector('[data-aba="plantas"]').classList.add("ativa");
        abaPlantas.hidden = false;
        abaAdicionar.hidden = true;
        renderizarLista();
    }

    btnSalvarRef.disabled = false;
    btnSalvarRef.innerHTML = labelOriginal;
});
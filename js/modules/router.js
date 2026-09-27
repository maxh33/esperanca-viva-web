/* router.js — navegação de página única (SPA): troca o conteúdo pela URL (hash), sem recarregar */
var EV = window.EV || (window.EV = {});

EV.router = (function () {
  const ROTAS = {
    inicio: EV.templates && EV.templates.inicio,
    projetos: EV.templates && EV.templates.projetos,
    cadastro: EV.templates && EV.templates.cadastro,
  };

  function rotaAtual() {
    const hash = location.hash.replace("#/", "");
    return ROTAS[hash] ? hash : "inicio";
  }

  function renderizar() {
    const rota = rotaAtual();
    const app = document.getElementById("app");
    app.innerHTML = ROTAS[rota]();

    EV.events.marcarLinkAtivo(rota);

    if (rota === "projetos") {
      EV.events.ligarFavoritos();
    }
    if (rota === "cadastro") {
      EV.forms.initCadastroForm((dados) => {
        EV.storage.salvarVoluntario(dados);
        EV.events.mostrarToast("Cadastro realizado com sucesso!");
        renderizar(); // atualiza a lista de cadastrados na mesma tela
      });
    }
  }

  function iniciar() {
    window.addEventListener("hashchange", renderizar);
    if (!location.hash) location.hash = "#/inicio";
    renderizar();
    EV.events.ligarMenuMobile();
  }

  return { iniciar, renderizar };
})();

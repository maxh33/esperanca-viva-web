/* events.js — eventos de interface: link ativo do menu, favoritar projeto, toast */
var EV = window.EV || (window.EV = {});

EV.events = (function () {
  function mostrarToast(mensagem) {
    let toast = document.getElementById("toast-dinamico");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-dinamico";
      toast.className = "toast-dinamico";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.getElementById("notificacoes").appendChild(toast);
    }
    toast.textContent = mensagem;
    toast.classList.add("visivel");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("visivel"), 2500);
  }

  function marcarLinkAtivo(rota) {
    document.querySelectorAll(".menu a[data-rota]").forEach((link) => {
      const ativo = link.dataset.rota === rota;
      link.toggleAttribute("aria-current", ativo);
      if (ativo) link.setAttribute("aria-current", "page");
    });
  }

  function ligarFavoritos() {
    document.querySelectorAll("[data-favoritar]").forEach((botao) => {
      botao.addEventListener("click", () => {
        const id = botao.dataset.favoritar;
        const favoritos = EV.storage.alternarFavorito(id);
        const marcado = favoritos.includes(id);
        botao.setAttribute("aria-pressed", String(marcado));
        botao.textContent = marcado ? "★ Favorito" : "☆ Favoritar";
        mostrarToast(marcado ? "Projeto favoritado!" : "Projeto removido dos favoritos.");
      });
    });
  }

  function ligarMenuMobile() {
    // o fechamento do menu ao clicar num link mobile (checkbox hack já cuida do abrir/fechar)
    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        const toggle = document.getElementById("menu-toggle");
        if (toggle) toggle.checked = false;
      });
    });
  }

  return { mostrarToast, marcarLinkAtivo, ligarFavoritos, ligarMenuMobile };
})();

/* storage.js — leitura/gravação no localStorage (dados no navegador) */
var EV = window.EV || (window.EV = {});

EV.storage = (function () {
  const CHAVE_VOLUNTARIOS = "ev_voluntarios";
  const CHAVE_FAVORITOS = "ev_favoritos";

  function listarVoluntarios() {
    const dados = localStorage.getItem(CHAVE_VOLUNTARIOS);
    return dados ? JSON.parse(dados) : [];
  }

  function salvarVoluntario(voluntario) {
    const lista = listarVoluntarios();
    const registro = Object.assign({}, voluntario, { data: new Date().toISOString() });
    lista.push(registro);
    localStorage.setItem(CHAVE_VOLUNTARIOS, JSON.stringify(lista));
    return lista;
  }

  function listarFavoritos() {
    const dados = localStorage.getItem(CHAVE_FAVORITOS);
    return dados ? JSON.parse(dados) : [];
  }

  function alternarFavorito(idProjeto) {
    let favoritos = listarFavoritos();
    if (favoritos.includes(idProjeto)) {
      favoritos = favoritos.filter((id) => id !== idProjeto);
    } else {
      favoritos.push(idProjeto);
    }
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
    return favoritos;
  }

  return { listarVoluntarios, salvarVoluntario, listarFavoritos, alternarFavorito };
})();

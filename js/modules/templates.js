/* templates.js — monta o HTML (string) de cada página, reaproveitável pelo router */
var EV = window.EV || (window.EV = {});

EV.templates = (function () {
  const PROJETOS = [
    { id: "oficina-digital", titulo: "Oficina de Inclusão Digital", desc: "Aulas de informática básica para jovens." },
    { id: "reforco-escolar", titulo: "Reforço Escolar", desc: "Apoio em português e matemática no contraturno." },
    { id: "doacao-alimentos", titulo: "Doação de Alimentos", desc: "Cestas básicas para famílias assistidas." },
  ];

  function inicio() {
    return `
      <section id="quem-somos" class="lg-8">
        <h2>Quem somos</h2>
        <p>Somos uma organização sem fins lucrativos que promove educação e inclusão digital para jovens em situação de vulnerabilidade.</p>
        <img src="imagens/oficina.jpg" alt="Jovens participando de uma oficina de informática" width="300" height="200">
      </section>
      <section id="missao" class="sm-6 lg-4">
        <h2>Missão e valores</h2>
        <h3>Missão</h3>
        <p>Ampliar o acesso à educação e à tecnologia.</p>
        <h3>Valores</h3>
        <p>Transparência, solidariedade e respeito.</p>
      </section>
      <section id="contato" class="sm-6 lg-12">
        <h2>Contato</h2>
        <address>
          Rua das Flores, 123 - Centro<br>
          <a href="tel:+551140000000">(11) 4000-0000</a><br>
          <a href="mailto:contato@esperancaviva.org">contato@esperancaviva.org</a>
        </address>
      </section>`;
  }

  function projetos() {
    const favoritos = EV.storage.listarFavoritos();
    const itens = PROJETOS.map((p) => {
      const marcado = favoritos.includes(p.id);
      return `
        <li>
          <article class="cartao" data-projeto="${p.id}">
            <div>
              <h3>${p.titulo}</h3>
              <p>${p.desc}</p>
            </div>
            <button type="button" class="btn-favorito" data-favoritar="${p.id}" aria-pressed="${marcado}">
              ${marcado ? "★ Favorito" : "☆ Favoritar"}
            </button>
          </article>
        </li>`;
    }).join("");

    return `
      <section id="lista-projetos" class="lg-12">
        <h2>Projetos sociais</h2>
        <ul class="cartoes">${itens}</ul>
      </section>`;
  }

  function cadastro() {
    const voluntarios = EV.storage.listarVoluntarios();
    const itensLista = voluntarios
      .map((v) => {
        const data = window.dayjs ? window.dayjs(v.data).format("D [de] MMMM [às] HH:mm") : v.data;
        return `<li>${v.nome} — ${v.tipo === "voluntario" ? "voluntário(a)" : "doador(a)"} <small>(${data})</small></li>`;
      })
      .join("");

    return `
      <section id="form-cadastro" class="lg-8">
        <h2>Seja voluntário ou doador</h2>
        <form id="cadastro-form" novalidate>
          <fieldset>
            <legend>Dados pessoais</legend>
            <label for="nome">Nome completo</label>
            <input type="text" id="nome" name="nome" required minlength="3" maxlength="80">
            <span class="campo-erro" data-erro-de="nome" hidden></span>

            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" required>
            <span class="campo-erro" data-erro-de="email" hidden></span>
          </fieldset>
          <fieldset>
            <legend>Como quer participar</legend>
            <label for="tipo">Tipo de participação</label>
            <select id="tipo" name="tipo" required>
              <option value="">Selecione...</option>
              <option value="voluntario">Voluntário</option>
              <option value="doador">Doador</option>
            </select>
            <span class="campo-erro" data-erro-de="tipo" hidden></span>
          </fieldset>
          <button type="submit">Cadastrar</button>
        </form>
      </section>
      <section id="lista-cadastrados" class="lg-4">
        <h2>Já cadastrados nesta sessão</h2>
        <ul class="lista-voluntarios" id="lista-voluntarios">${itensLista || "<li>Ninguém cadastrado ainda.</li>"}</ul>
      </section>`;
  }

  return { inicio, projetos, cadastro, PROJETOS };
})();

/* forms.js — validação do formulário de cadastro com feedback ao usuário */
var EV = window.EV || (window.EV = {});

EV.forms = (function () {
  const MENSAGENS = {
    nome: "Digite seu nome completo (mínimo 3 letras).",
    email: "Digite um e-mail válido, ex.: nome@dominio.com.",
    tipo: "Escolha se vai participar como voluntário ou doador.",
  };

  function marcarCampo(campo, valido) {
    const erroSpan = document.querySelector(`[data-erro-de="${campo.name}"]`);
    if (valido) {
      campo.classList.remove("campo-invalido");
      campo.classList.add("campo-valido");
      if (erroSpan) erroSpan.hidden = true;
    } else {
      campo.classList.remove("campo-valido");
      campo.classList.add("campo-invalido");
      if (erroSpan) {
        erroSpan.textContent = MENSAGENS[campo.name] || "Campo inválido.";
        erroSpan.hidden = false;
      }
    }
  }

  function validarCampo(campo) {
    const valido = campo.checkValidity();
    marcarCampo(campo, valido);
    return valido;
  }

  function initCadastroForm(aoCadastrarComSucesso) {
    const form = document.getElementById("cadastro-form");
    if (!form) return;

    form.querySelectorAll("input, select").forEach((campo) => {
      campo.addEventListener("blur", () => validarCampo(campo));
      campo.addEventListener("input", () => {
        if (campo.classList.contains("campo-invalido")) validarCampo(campo);
      });
    });

    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const campos = [...form.querySelectorAll("input, select")];
      const todosValidos = campos.map(validarCampo).every(Boolean);
      if (!todosValidos) return;

      const dados = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        tipo: form.tipo.value,
      };
      aoCadastrarComSucesso(dados);
      form.reset();
      campos.forEach((c) => c.classList.remove("campo-valido", "campo-invalido"));
    });
  }

  return { initCadastroForm, validarCampo };
})();

# Esperança Viva (SPA)

Site fictício de uma ONG (Esperança Viva), feito em HTML, CSS e JavaScript puro (sem framework), como Single Page Application com roteamento por hash.

> **Projeto acadêmico.** Feito como Experiência Prática da disciplina de Desenvolvimento Front-End Para Web, no Bacharelado em Ciência da Computação da Cruzeiro do Sul Virtual (EAD). Tema desta entrega: versionamento com Git/GitHub, acessibilidade (WCAG 2.1 AA) e preparação para produção.

**Palavras-chave:** front-end, javascript, html, css, spa, single page application, acessibilidade, wcag, git, github, ong, projeto acadêmico, ciência da computação, cruzeiro do sul.

## Funcionalidades

- Navegação por hash (`#/inicio`, `#/projetos`, `#/cadastro`) sem recarregar a página.
- Cadastro de voluntário/doador com validação nativa de formulário (feedback visual por campo).
- Favoritar projetos, com persistência em `localStorage`.
- Menu responsivo (dropdown no desktop, hambúrguer no mobile).
- Formatação de data em pt-BR com [Day.js](https://day.js.org/) (via CDN).

## Como rodar localmente

Não precisa de build pra desenvolver, é só abrir com um servidor estático:

```bash
python3 -m http.server 8000
# ou: npx serve
```

Depois acesse `http://localhost:8000`.

## Build de produção

```bash
npm install
npm run build
```

Gera `css/style.min.css` (CSS minificado) e `js/app.min.js` (JS minificado, um arquivo só, sem bundler). O `index.html` já referencia esses arquivos.

## Acessibilidade (WCAG 2.1 AA)

Auditado com [axe-core](https://github.com/dequelabs/axe-core) (via Playwright) nas 3 rotas da SPA. Itens verificados e corrigidos:

- Link "Pular para o conteúdo" (skip link), visível ao navegar por teclado.
- Contraste de cor mínimo de 4.5:1 em texto de botões e links de menu.
- Notificações dinâmicas (toast) anunciadas por leitor de tela (`role="status"`, `aria-live="polite"`) e dentro de uma região nomeada, não soltas no `<body>`.

## Segurança (bônus)

O repositório roda o [PhantomRaven npm vulnerability scanner](https://github.com/maxh33/phantom-raven-npm-vulnerability-scanner) em CI (`.github/workflows/security-scan.yml`), detectando dependências suspeitas, typosquatting e scripts de instalação maliciosos em `package.json`/`package-lock.json`. Rodado localmente durante o desenvolvimento: 0 problemas encontrados.

## Deploy

Publicado via GitHub Pages a partir da branch `main`.

## Estrutura

```
index.html
css/       estilos (reset, style, versão minificada)
js/        módulos (storage, templates, forms, events, router) + bundle minificado
imagens/   imagens do site
```

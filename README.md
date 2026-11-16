# AoE2 Quiz

Aprenda Age of Empires II: Definitive Edition de verdade: custos, atributos, tempos, counters e economia.
Quiz, Quiz de cartas, Duelo de cartas e Coleção de cartas. Projeto da comunidade, sem fins comerciais.
Dados do jogo base (SiegeEngineers/aoe2techtree, DE Update 188329), sem exclusivos de civilização.

## Instalar no celular ou no computador

Abra o endereço do app (GitHub Pages) e:

- **Android (Chrome):** toque em **📲 Instalar o app** no menu inicial, ou no menu ⋮ → **Instalar app**.
- **iPhone/iPad (Safari):** Compartilhar ⬆️ → **Adicionar à Tela de Início**.
- **Computador (Chrome ou Edge):** botão **📲 Instalar o app** no menu inicial, ou o ícone de instalar na barra de endereço.

Depois de instalado, o app abre em tela cheia e funciona sem internet (as fontes do Google e o leitor de .zip precisam de internet na primeira vez).

## Publicar no GitHub Pages

1. Crie o repositório `aoe2-quiz` em https://github.com/new (público).
2. Envie todos os arquivos desta pasta para a raiz do repositório (botão **Add file → Upload files**), inclusive `.nojekyll`.
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`, e salve.
4. Em um ou dois minutos o app fica em `https://mckz33.github.io/aoe2-quiz/`.

## Atualizar para uma versão nova

1. Substitua o `index.html` no repositório.
2. No `sw.js`, troque o número em `const VERSAO = "aoe2quiz-v28.2"` (por exemplo, para `v29`). Isso faz os apps instalados baixarem a versão nova e limparem a antiga.
3. Quem já instalou recebe a atualização ao abrir o app com internet (a página é buscada na rede primeiro; sem internet, abre a cópia guardada).

## Arquivos

| Arquivo | Para quê |
|---|---|
| `index.html` | O app inteiro (HTML + CSS + JS). Também abre direto no navegador, sem servidor. |
| `manifest.webmanifest` | Nome, cores, ícones e atalhos (Quiz, Quiz de cartas, Duelo, Coleção) do app instalado. |
| `sw.js` | Service worker: instalação e funcionamento offline. |
| `icon-192.png`, `icon-512.png`, `icon.svg` | Ícones do app. |
| `icon-maskable-512.png` | Ícone com margem de segurança para o Android recortar em círculo ou gota. |
| `apple-touch-icon.png` | Ícone da tela de início do iPhone/iPad. |
| `favicon-32.png` | Ícone da aba. |
| `.nojekyll` | Faz o GitHub Pages servir os arquivos como estão. |

## Seus dados

Progresso, partidas salvas e imagens importadas ficam só no navegador de cada aparelho (localStorage e IndexedDB).
O app instalado e o link do claude.ai guardam dados separados.

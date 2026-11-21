# Amorim CT — Site

Site da **Academia Amorim CT**, em Teixeira de Freitas – BA (Av. São Paulo, 960 – Jardim Caraipe, ao lado do Posto Dois Irmãos).

Site no ar: https://euartursilva.github.io/amorim-ct-site/

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | A página: topo com vídeo, diferenciais, tour em vídeo, estrutura, avaliações, planos, horários e localização |
| `style.css` | Visual do site. A cor de destaque fica em `--acc`, no topo do arquivo |
| `app.js` | Animações e interações: tour com capítulos, fotos ampliadas, números contando, WhatsApp flutuante |
| `img/` | Logo e fotos (quadros do vídeo de apresentação) |
| `video/` | `hero-loop.mp4` (vídeo do topo, sem som) e `tour.mp4` (tour completo) |

## Como atualizar

- **Preços dos planos:** em `index.html`, procure `class="plans"` e troque os valores.
- **Horários:** em `index.html`, procure `class="hours-list"`.
- **Trocar uma foto:** substitua o arquivo em `img/` mantendo o mesmo nome.
- **Depois de mudar `style.css` ou `app.js`:** troque o número depois de `?v=` nos links do `index.html` (ex.: `style.css?v=2`), senão o navegador pode continuar mostrando o visual antigo.
- **WhatsApp:** o número aparece como `5573998121551` em `index.html` e `app.js`.

## Publicação

Publicado com GitHub Pages a partir da branch `main` (pasta raiz). Toda alteração enviada para `main` vai para o ar em cerca de 1 minuto.

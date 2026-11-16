/* AoE2 Quiz — service worker: deixa o app instalável e funcionando sem internet.
 * Página (index.html): rede primeiro, para receber as atualizações; sem internet, usa a cópia guardada.
 * Ícones e manifesto: cópia guardada primeiro.
 * Fontes do Google e JSZip (cdnjs): usa a cópia guardada e atualiza em segundo plano.
 * Ao publicar uma versão nova, troque o número em VERSAO para limpar as cópias antigas. */
const VERSAO = "aoe2quiz-v28.4";
const ARQUIVOS = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./favicon-32.png", "./jszip.min.js"];
const EXTERNOS = ["fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // a página: rede primeiro
  if (req.mode === "navigate" || (url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname))) {
    e.respondWith(
      fetch(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(VERSAO).then((c) => c.put("./index.html", cp)); } return r; })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }
  // pacote de ícones (grande): vai direto à rede, o app o guarda no IndexedDB
  if (url.origin === location.origin && /\.zip$/.test(url.pathname)) return;
  // arquivos do próprio app: cópia guardada primeiro
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((resp) => { if (resp.ok) { const cp = resp.clone(); caches.open(VERSAO).then((c) => c.put(req, cp)); } return resp; })));
    return;
  }
  // fontes e JSZip: cópia guardada e atualização em segundo plano
  if (EXTERNOS.includes(url.hostname)) {
    e.respondWith(caches.open(VERSAO).then((c) => c.match(req).then((guardada) => {
      const rede = fetch(req).then((resp) => { if (resp.ok || resp.type === "opaque") c.put(req, resp.clone()); return resp; }).catch(() => guardada);
      return guardada || rede;
    })));
  }
});

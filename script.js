'use strict';

/* =====================================================
   PARTE 5: BASE (links, estado, áudio, digitação)
   ===================================================== */

const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const B = 'https://files.catbox.moe/';

const CHAR = {
  RM: { name: 'COMANDANTE RM', img: B + '0mim91.png' },
  JK: { name: 'AGENTE JUNGKOOK', img: B + 'mtzw9m.png' },
  V: { name: 'DIRETOR V', img: B + 'um3u1a.png' }
};

const AUDIO_SRC = {
  music: B + 'o6yni4.mp4',
  typing: B + '4zjbl0.mp4',
  timer15: B + 'bkz8b1.mp4',
  timer30: B + 'gchov0.mp4',
  timer120: B + 'k0y70r.mp4',
  right: B + 'hu7tpj.mp4',
  wrong: B + 'rutizv.mp4'
};

const Q_IMGS = [
  'ovdddf.jpg', '312201.jpeg', 'i1h9fs.webp', 's177q5.jpeg', '5o55ge.jpeg',
  '5p02cd.jpeg', 'inz6m2.jpeg', 'rabzix.jpg', 'rabzix.jpg', 'sxp9zk.png'
].map((f) => B + f);

const OBJECTS = [
  { id: 'disquete', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAc0lEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoBgoJscsSiYCKsWiu0jkAROePPcBEXfXLILLEaobYMxCayXE2fkQzzcAIx4MIa8YVvURpprLNJGgm32byQ5vMjAHMZcRnSaD7UTSTXxiQjQCli8XoJ4x7ogAAAABJRU5ErkJggg==' },
  { id: 'pendrive', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAgElEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoJl4nBA0SzULsssQjLJrPH3sAR0AuMFSwIpyaIQZDGFU6ByDI7OZSIIJzSdAM1wZnEOVsZGuRLSdNs/zcCiAioLmrfhkckWwz+VE1RJMnMOkQrxOYf1E0k18YkI0A+7xkvDtTrRkAAAAASUVORK5CYII=' },
  { id: 'cadeado', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAiklEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoRpMWYpdFQ2gKcGoGKj1/7AEaQtOPXTNcJ7K1mPrxaUazB1OQ2poxwwlXyGHXDIwzIMIMMDRv49SMS2dX/TICmtHsQRaho2aIfvI1k+ZnoAo8iIBmcuIZmMuIz5LA6ETRTH5hQDYCANcYmBYVhIMAAAAAAElFTkSuQmCC' },
  { id: 'terminal', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAfklEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoBgoJscsSiYCKsWgGGgl0AhqJhnBqrtI5QBDh0yzFrYcHEdZsdnMp+Zrx6CfBZiADgkizmXxnd9UvQ0NkaqaCzXCDaOln8lMYmRkDmOKJz5LADIOimfzCgGwEALu5V1BcBn1iAAAAAElFTkSuQmCC' },
  { id: 'chave', src: B + 'mkvtqa.png' },
  { id: 'flor', src: B + 'aq1p3n.png' },
  { id: 'microfone', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAmklEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoJl4nBOHULMQuixUR1gxUBPQCEJ0/9gANIevHohmiE6iuq34ZGommH7tmrDrh+glrxqMfn2b8lhPwM1z//5tpaIio0IbrB6aEKp0DQOQl24Smk7Bms5tL4YhkzRTZTJFmPGmTgGbSMgbQkcTrBCZhFM3kFwZkIwCKR3uyM+8fPgAAAABJRU5ErkJggg==' },
  { id: 'fone', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAlklEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoJl4nBOHULMQuixUR0AxRBHQVVoRsBLpmuDZcNsNlcWpGcx6ad7BrRjMYj2aIGnTNeIIHUxaLzVU6ByAIUzNcCrvNEM1mN5cCEaZmiDhtNMMd5iXbhKkZKIjsKeoFGNXSNsmagcFAvE5g/kXRTH5hQDYCAAe4Rl7P3f+qAAAAAElFTkSuQmCC' },
  { id: 'ingresso', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAdUlEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoJl4nBFFVsxC7LJEIXTNQCOhtPAhZAZCNRTMwJLAiuDazm0txasZvM1AnBBFrM5oR5NtMgp/xG0Q9mymK5wFNnuRrBgYv8TqBYYaimfzCgGwEAF0L14ZvQglHAAAAAElFTkSuQmCC' },
  { id: 'cracha', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAeUlEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoxlQhxC4LR5iyhDUDbQAiEjQjW4iJCGs2u7kUKyJKMzDwsCJiNUN8i4xI1lylcwCIyNEM0QnXTy/NFAUYZgwPhM2kaSY5eQLDk/gsCXQFimbyCwOyEQCG0JCIZwrgTQAAAABJRU5ErkJggg==' },
  { id: 'chip', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAgElEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoRpY7f+wBnMTkQhANNAuxy+JBODUDzQYioAov2SasCCgFUYPPZjyaibXZ7OZSOCLZZqAe+bkVQISsmXCAkaOZms6mKMDIjCpyEskApW1gLiM+SwLzL4pm8gsDshEALk5z/KUHID0AAAAASUVORK5CYII=' },
  { id: 'escudo', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAhElEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FohogKscsSRBCV2DUDTUVGVToHkNGQ02x2cykQkaMZopNYmyGqIZrhOklwNkQPsk7S/Iymk5ahjakfq06cmtH0Y9WJTzOyfqw6CWhGyySYsiiagZYQnyWB+RdFM/mFAdkIABnpl5hWsuaoAAAAAElFTkSuQmCC' },
  { id: 'coracao', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAk0lEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoJl4nBGHXLMQuC0e4RLBrBkoDnQT0ApAEIogGIKNK5wAEwfWja0bTCUFwbWj6sWtGQ2g6vWSbBptmrPqx6sQXVbg0E4gqTP1YdeLTjKwfq04CmuH6seokrBmeMElI2+RkDKALidcJTMIomskvDMhGABKFfibrXoiRAAAAAElFTkSuQmCC' },
  { id: 'camera', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAiUlEQVR42mPI0t1ANmIAYmupRDIQQvOnl/+1BDyJRFur36FoJl4nBFFPsxC7LDIiWfP5Yw8giBzNEP1oTsBEOP0MlAOGJFaEph+nZmC0oen8H1MFlJLi1oMgIBu75iqdA1gRRLPZzaVARBvNXrJNWBFRziYGUTWFDZxmYGQSrxOYEFA0k18YkI0ApzZD5T2d3XsAAAAASUVORK5CYII=' }

];

/* ---------- ESTADO ---------- */
const State = {
  best: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  attempts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  loops: 0,
  total() {
    return Object.values(this.best).reduce((a, b) => a + b, 0);
  },
  setBest(n, v) {
    const improved = v > this.best[n];
    if (improved) this.best[n] = v;
    return improved;
  }
};

/* ---------- ÁUDIO ---------- */
const Sound = {
  el: {},
  muted: false,
  curTimer: null,
  vol: { music: 0.35, typing: 0.7 },

  applyMute() {
    Object.values(this.el).forEach((a) => { a.muted = this.muted; });
    const b = $('btn-mute');
    if (b) b.classList.toggle('muted', this.muted);
  },
  toggleMute() {
    this.muted = !this.muted;
    this.applyMute();
    try { localStorage.setItem('luna_muted', this.muted ? '1' : '0'); } catch (e) {}
  },
  loadPref() {
    try { this.muted = localStorage.getItem('luna_muted') === '1'; } catch (e) {}
  },
  bindButton() {
    $('btn-mute').addEventListener('click', () => this.toggleMute());
  },
  unlock() {
    Object.entries(this.el).forEach(([k, a]) => {
      if (k === 'music') return;
      a.muted = true;
      const back = () => {
        a.pause();
        try { a.currentTime = 0; } catch (e) {}
        a.muted = this.muted;
      };
      const p = a.play();
      if (p && p.then) p.then(back).catch(() => { a.muted = this.muted; });
      else back();
    });
  },
  playMusic() {
    const a = this.el.music;
    if (!a) return;
    a.loop = true;
    a.volume = this.vol.music;
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
  },
  play(name) {
    const a = this.el[name];
    if (!a) return;
    try { a.currentTime = 0; } catch (e) {}
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
  },
  stop(name) {
    const a = this.el[name];
    if (!a) return;
    a.pause();
    try { a.currentTime = 0; } catch (e) {}
  },
  startTyping() {
    const a = this.el.typing;
    if (!a) return;
    a.loop = true;
    a.volume = this.vol.typing;
    try { a.currentTime = 0; } catch (e) {}
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
  },
  stopTyping() { this.stop('typing'); },
  timerStart(name) {
    this.timerStop();
    this.curTimer = name;
    this.play(name);
  },
  timerStop() {
    if (this.curTimer) {
      this.stop(this.curTimer);
      this.curTimer = null;
    }
  }
};

/* ---------- EFEITO DE DIGITAÇÃO ---------- */
let curType = null;

function typeInto(el, text, speed) {
  if (curType) curType.finish();
  const sp = speed || 26;
  return new Promise((resolve) => {
    let i = 0;
    let done = false;
    let timer = null;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      el.textContent = text;
      Sound.stopTyping();
      curType = null;
      resolve();
    };
    curType = { finish };
    el.textContent = '';
    Sound.startTyping();
    const step = () => {
      if (done) return;
      if (i >= text.length) { finish(); return; }
      i++;
      el.textContent = text.slice(0, i);
      const ch = text[i - 1];
      timer = setTimeout(step, sp + (',.!?'.indexOf(ch) >= 0 ? 110 : 0));
    };
    step();
  });
}
function skipType() { if (curType) curType.finish(); }

/* ---------- PRÉ-CARREGAMENTO ---------- */
function loadImage(src) {
  return new Promise((res) => {
    const im = new Image();
    im.onload = im.onerror = () => res();
    im.src = src;
    setTimeout(res, 8000);
  });
}
function loadAudio(name, src) {
  return new Promise((res) => {
    const a = new Audio();
    a.preload = 'auto';
    Sound.el[name] = a;
    const done = () => res();
    a.addEventListener('canplaythrough', done, { once: true });
    a.addEventListener('loadedmetadata', done, { once: true });
    a.addEventListener('error', done, { once: true });
    a.src = src;
    a.load();
    setTimeout(done, 7000);
  });
}
async function preloadAll() {
  const jobs = [];
  Object.keys(AUDIO_SRC).forEach((k) => jobs.push(() => loadAudio(k, AUDIO_SRC[k])));
  const imgs = [];
  Object.keys(CHAR).forEach((k) => imgs.push(CHAR[k].img));
  Q_IMGS.forEach((s) => imgs.push(s));
  OBJECTS.forEach((o) => imgs.push(o.src));
  Array.from(new Set(imgs)).forEach((s) => jobs.push(() => loadImage(s)));

  let done = 0;
  const total = jobs.length;
  const tick = () => {
    done++;
    const p = Math.round((done / total) * 100);
    $('load-fill').style.width = p + '%';
    $('load-text').textContent = 'Carregando arquivos... ' + p + '%';
  };
  await Promise.all(jobs.map((j) => j().then(tick)));
  Sound.applyMute();
}/* =====================================================
   PARTE 6: TELAS, DIÁLOGOS, PONTUAÇÃO E MISSÃO 1
   ===================================================== */

function showScreen(name) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  $('screen-' + name).classList.add('active');
  window.scrollTo(0, 0);
}
function setMissionLabel(txt) { $('hud-mission').textContent = txt; }
function updatePoints() { $('hud-points').textContent = 'PTS: ' + State.total(); }

function tierOf(score) {
  if (score >= 70) return 'good';
  if (score >= 30) return 'mid';
  return 'bad';
}

/* Mostra uma fala com efeito de digitação.
   line = { who:'RM'|'JK'|'V', text:'...', options:[{text, value}] } */
function showLine(line) {
  return new Promise((resolve) => {
    const c = CHAR[line.who] || CHAR.RM;
    $('dlg-avatar').src = c.img;
    $('dlg-name').textContent = c.name;
    const btn = $('btn-next');
    const optBox = $('dlg-options');
    optBox.innerHTML = '';
    optBox.classList.add('hidden');
    btn.classList.remove('hidden');
    let typed = false;

    const onClick = () => {
      if (!typed) return;
      btn.removeEventListener('click', onClick);
      resolve();
    };

    typeInto($('dlg-text'), line.text, line.speed).then(() => {
      typed = true;
      if (line.options) {
        btn.removeEventListener('click', onClick);
        btn.classList.add('hidden');
        optBox.classList.remove('hidden');
        line.options.forEach((o) => {
          const b = document.createElement('button');
          b.className = 'btn';
          b.textContent = o.text;
          b.addEventListener('click', () => {
            optBox.classList.add('hidden');
            optBox.innerHTML = '';
            btn.classList.remove('hidden');
            resolve(o.value);
          });
          optBox.appendChild(b);
        });
      }
    });
    btn.addEventListener('click', onClick);
  });
}

/* Roda uma lista de falas em sequência; devolve a opção escolhida na última. */
async function say(lines) {
  showScreen('dialog');
  let last;
  for (const line of lines) last = await showLine(line);
  return last;
}

/* Fim de missão: soma a nota (vale a maior) e mostra a reação por faixa. */
async function missionEnd(n, score, react) {
  State.setBest(n, score);
  updatePoints();
  let txt = 'Fim da Missão ' + n + '! Pontuação da missão: ' + score + ' pontos.';
  if (State.attempts[n] > 1) txt += ' Vale a sua melhor nota: ' + State.best[n] + '.';
  txt += ' Pontuação acumulada: ' + State.total() + ' pontos.';
  const lines = [{ who: 'RM', text: txt }];
  if (react && react[tierOf(score)]) lines.push(react[tierOf(score)]);
  await say(lines);
}

/* ---------- MISSÃO 1 ---------- */
const M1 = {
  async run() {
    setMissionLabel('MISSÃO 1');
    State.attempts[1]++;

    const ACCEPT = [
      { text: '[ ACEITAR ]', value: 'ok' },
      { text: '[ ARREGAR ]', value: 'no' }
    ];
    const REFUSE = [
      'Arregou rapidinho, igual sempre kk. Vai, tenta de novo.',
      'De novo?? O botão de aceitar tá ali em cima, Luna kk',
      'Tu vai ficar nessa a noite toda? Aceita logo.'
    ];

    let choice = await say([{
      who: 'RM',
      text: 'Conexão estabelecida com a Agente Luna... Olha só quem decidiu aparecer. Espero que o nível de inteligência hoje esteja acima do nível da meta, que inclusive ja é mt burra, e que você não surte com qualquer coisinha. Vai aceitar a missão ou vai arregar igual você sempre faz com o Eduardo qnd ele ta ganhando de vc? kk',
      options: ACCEPT
    }]);
    let k = 0;
    while (choice !== 'ok') {
      choice = await say([{ who: 'RM', text: REFUSE[k % REFUSE.length], options: ACCEPT }]);
      k++;
    }

    await say([
      { who: 'RM', text: 'Boa escolha. Pelo menos dessa vez demonstrou um pingo de coragem kkk. Salvando progresso... Mas antes de te soltar para a próxima etapa, preciso te dar o panorama geral da Operação.' },
      { who: 'RM', text: 'São 7 missões no total. Cada missão vale até 100 pontos (total de 700). Pra vencer, tu precisa de 500 pontos no placar final.' },
      { who: 'RM', text: 'Missão 2 — ARMY Intelligence: o Jungkook assume o terminal com 10 perguntas cronometradas sobre o BTS. 15 segundos por pergunta: antes de 7s fatura 10 pontos, depois disso 7. Errou ou o tempo acabou, zero.' }
    ]);

    const READY = [
      { text: '[ PREPARADA ]', value: 'ok' },
      { text: '[ AINDA NÃO ]', value: 'no' }
    ];
    let ready = await say([{
      who: 'RM',
      text: 'Fique abaixo de 500 pontos e eu apago seus dados e deixo o Eduardo e a meta rindo da sua cara. Preparada?',
      options: READY
    }]);
    while (ready !== 'ok') {
      ready = await say([{ who: 'RM', text: 'Sem choro, Luna. Clica em preparada e bora kk', options: READY }]);
    }

    State.setBest(1, 100);
    updatePoints();
  }
};/* =====================================================
   PARTE 7: AJUDANTES + MISSÃO 2 (QUIZ)
   ===================================================== */

/* Fala curta dentro de uma missão (caixa de feedback) */
function showFeedback(prefix, who, text, kind) {
  const c = CHAR[who] || CHAR.RM;
  $(prefix + '-fb-avatar').src = c.img;
  $(prefix + '-fb-name').textContent = c.name;
  $(prefix + '-fb-text').textContent = text;
  const box = $(prefix + '-feedback');
  box.classList.remove('hidden', 'good', 'bad');
  if (kind) box.classList.add(kind);
}
function hideFeedback(prefix) { $(prefix + '-feedback').classList.add('hidden'); }
function shakeEl(el) {
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 400);
}

/* Cronômetro com barra + áudio do cronômetro */
function startTimer(total, fillId, audioName, onTimeout, onTick) {
  const fill = $(fillId);
  fill.classList.remove('low');
  fill.style.width = '100%';
  const t0 = Date.now();
  let over = false;
  if (audioName) Sound.timerStart(audioName);
  const iv = setInterval(() => {
    const left = total - (Date.now() - t0) / 1000;
    fill.style.width = Math.max(0, (left / total) * 100) + '%';
    fill.classList.toggle('low', left <= Math.min(5, total * 0.25));
    if (onTick) onTick(Math.max(0, left));
    if (left <= 0 && !over) {
      over = true;
      clearInterval(iv);
      Sound.curTimer = null; /* deixa o "plim" terminar sozinho */
      onTimeout();
    }
  }, 100);
  return {
    elapsed() { return (Date.now() - t0) / 1000; },
    stop() { clearInterval(iv); Sound.timerStop(); }
  };
}

const SLOW_OK = [
  'Acertou, mas demorou. Boa, vai.',
  'Passou, só não precisava de tanta emoção.',
  'Certo, mas o relógio quase te pegou.'
];

/* correct = posição original da resposta certa em opts */
const M2_QUESTIONS = [
  {
    era: 'HYYH PT. 2',
    q: 'Qual música marcou a primeira vitória do BTS em um programa musical?',
    opts: ['I Need U', 'Run', 'Save ME', 'Dope'], correct: 0,
    ok: { who: 'JK', text: 'Passou raspando.' },
    wrong: { who: 'RM', text: 'Errou feio kk' },
    time: { who: 'RM', text: 'O relógio zerou' }
  },
  {
    era: 'MAP OF THE SOUL: 7',
    q: 'Qual é a faixa solo do Jimin que explora a sonoridade dos anos 80?',
    opts: ['Euphoria', 'Filter', 'Serendipity', 'Lie'], correct: 1,
    ok: { who: 'JK', text: 'Um neurônio funcionou.' },
    wrong: { who: 'RM', text: 'Errou a do Jimin ? kk dps ainda diz que é fã' },
    time: { who: 'JK', text: 'Dormiu no ponto?' }
  },
  {
    era: 'BORAHAE',
    q: "Quem cunhou a frase 'I Purple You' em novembro de 2016?",
    opts: ['RM', 'Jin', 'V (Taehyung)', 'Suga'], correct: 2,
    ok: { who: 'JK', text: 'O mínimo.' },
    wrong: { who: 'RM', text: 'Até a meta sabia.' },
    time: { who: 'RM', text: 'Lentidão histórica.' }
  },
  {
    era: 'INDIGO',
    q: "Quem participa da faixa 'Still Life' no álbum Indigo?",
    opts: ['Anderson .Paak', 'Erykah Badu', 'Pharrell Williams', 'Eric Benét'], correct: 3,
    ok: { who: 'JK', text: 'Acertou por sorte.' },
    wrong: { who: 'RM', text: 'Errou o álbum do criador?' },
    time: { who: 'RM', text: 'Cronômetro estourou!' }
  },
  {
    era: 'THE ASTRONAUT',
    q: "'The Astronaut' do Jin teve co-autoria de qual banda?",
    opts: ['Coldplay', 'Ed Sheeran', 'Charlie Puth', 'Ryan Tedder'], correct: 0,
    ok: { who: 'JK', text: 'Passou bb' },
    wrong: { who: 'RM', text: 'Errou feio bb' },
    time: { who: 'JK', text: 'Tempo esgotado bb' }
  },
  {
    era: 'HOPE WORLD',
    q: 'Qual é a faixa de abertura da mixtape Hope World?',
    opts: ['Base Line', 'Airplane', 'Hope World', 'P.O.P'], correct: 2,
    ok: { who: 'JK', text: 'Menos mal.' },
    wrong: { who: 'RM', text: 'Decepcionante Luna' },
    time: { who: 'RM', text: 'por que deixou o tempo acabar mds' }
  },
  {
    era: 'BILLBOARD #1',
    q: 'Qual primeiro álbum coreano do BTS estreou em #1 na Billboard 200?',
    opts: ['LY: Tear', 'LY: Answer', 'MOTS: Persona', 'Wings'], correct: 0,
    ok: { who: 'JK', text: 'Vou fingir que não chutou.' },
    wrong: { who: 'RM', text: 'Errou o básico kkkk Eduardo>>>meta>>>>vc' },
    time: { who: 'RM', text: 'Zero agilidade.' }
  },
  {
    era: 'DARK & WILD',
    q: 'Qual é a faixa oculta da versão física de Dark & Wild?',
    opts: ['Sea', 'Path (Gil)', 'Skit', 'Barrow'], correct: 1,
    ok: { who: 'JK', text: 'Essa foi difícil, parabéns aí' },
    wrong: { who: 'RM', text: 'Nem no Google vc acerta né' },
    time: { who: 'JK', text: 'Tempo esgotado luna, caramba' }
  },
  {
    era: 'STILL WITH YOU',
    q: 'Nome da primeira auto-produção solo do Jungkook no SoundCloud (2020)?',
    opts: ['Still With You', 'My You', 'Decalcomania', 'Cover'], correct: 0,
    ok: { who: 'JK', text: 'Boa.' },
    wrong: { who: 'RM', text: 'Esse teu histórico do Google deve estar todo bagunçado kk.' },
    time: { who: 'RM', text: 'Cronômetro zerou Betinha' }
  },
  {
    era: 'REBRANDING',
    q: 'Data exata em que o BTS mudou o significado para "Beyond The Scene"?',
    opts: ['5 Jul 2017', '13 Jun 2018', '10 Dez 2017', '25 Mar 2016'], correct: 0,
    ok: { who: 'JK', text: 'Fim do ARMY Intelligence, parabéns por ter sobrevivido.' },
    wrong: { who: 'RM', text: 'Errou no final pqp' },
    time: { who: 'RM', text: 'agora já era kk' }
  }
];

const M2 = {
  n: 2,
  lastPos: {},
  react: {
    good: { who: 'JK', text: 'Sobreviveu, e com nota boa. Não me decepciona mais.' },
    mid: { who: 'JK', text: 'Passou raspando, mas passou kk' },
    bad: { who: 'RM', text: 'Isso foi um quiz sobre o BTS ou sobre o que tu almoçou?' }
  },
  /* na primeira vez, a M1 já explicou a M2 */
  briefing() { return []; },
  retryBriefing() {
    return [
      { who: 'RM', text: 'Voltou pro quiz? Achei que tinha desistido kk. Mesmas perguntas, tenta lembrar dessa vez.' },
      { who: 'JK', text: 'Os 15 segundos continuam valendo. E as respostas mudaram de lugar, então não adianta decorar a letra.' }
    ];
  },

  async run() {
    setMissionLabel('MISSÃO 2 · ARMY INTELLIGENCE');
    State.attempts[2]++;
    showScreen('m2');
    let score = 0;
    $('m2-score').textContent = '0 PTS';
    for (let i = 0; i < M2_QUESTIONS.length; i++) {
      score += await this.ask(i);
      $('m2-score').textContent = score + ' PTS';
    }
    return score;
  },

  ask(i) {
    const q = M2_QUESTIONS[i];
    return new Promise((resolve) => {
      window.scrollTo(0, 0);
      $('m2-count').textContent = 'PERGUNTA ' + (i + 1) + '/10';
      $('m2-era').textContent = q.era;
      $('m2-img').src = Q_IMGS[i];
      $('m2-question').textContent = q.q;
      hideFeedback('m2');
      const nextBtn = $('m2-next');
      nextBtn.classList.add('hidden');
      const optBox = $('m2-options');
      optBox.innerHTML = '';

      /* embaralha as alternativas; na repetição a certa nunca fica na mesma letra */
      let order = shuffle([0, 1, 2, 3]);
      const prev = this.lastPos[i];
      if (prev !== undefined) {
        let guard = 0;
        while (order.indexOf(q.correct) === prev && guard < 60) {
          order = shuffle(order);
          guard++;
        }
      }
      this.lastPos[i] = order.indexOf(q.correct);

      const letters = ['A', 'B', 'C', 'D'];
      const buttons = order.map((oi, pos) => {
        const b = document.createElement('button');
        b.className = 'opt';
        b.textContent = letters[pos] + ') ' + q.opts[oi];
        b.dataset.oi = String(oi);
        optBox.appendChild(b);
        return b;
      });

      let answered = false;
      let timer = null;

      const finish = (kind, btn) => {
        if (answered) return;
        answered = true;
        buttons.forEach((b) => { b.disabled = true; });
        let pts = 0;
        let fb;
        let tone = 'bad';
        if (kind === 'timeout') {
          fb = q.time;
          buttons.forEach((b) => b.classList.add('dim'));
          shakeEl($('screen-m2'));
        } else {
          const secs = timer.elapsed();
          timer.stop();
          if (Number(btn.dataset.oi) === q.correct) {
            pts = secs < 7 ? 10 : 7;
            fb = secs < 7 ? q.ok : { who: 'JK', text: pick(SLOW_OK) };
            tone = 'good';
            btn.classList.add('correct');
            Sound.play('right');
          } else {
            fb = q.wrong;
            btn.classList.add('wrong');
            buttons.forEach((b) => { if (b !== btn) b.classList.add('dim'); });
            Sound.play('wrong');
            shakeEl($('screen-m2'));
          }
        }
        showFeedback('m2', fb.who, fb.text, tone);
        nextBtn.textContent = i === M2_QUESTIONS.length - 1 ? '[ VER RESULTADO ]' : '[ PRÓXIMA ]';
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => { nextBtn.onclick = null; resolve(pts); };
      };

      buttons.forEach((b) => b.addEventListener('click', () => finish('answer', b)));
      timer = startTimer(15, 'm2-timer-fill', 'timer15', () => finish('timeout'));
    });
  }
};/* =====================================================
   PARTE 8: MISSÃO 3 (SETLIST) + MISSÃO 4 (MEMÓRIA)
   ===================================================== */

const M3_BLOCKS = [
  'Abertura, estádio lotado.',
  'Música rápida, a galera tá acompanhando.',
  'Deu uma esfriada no meio do show.',
  'Plateia pedindo mais, os caras já tão cansados.',
  'Último bloco, tudo ou nada.'
];

const M3_FB = {
  accel: [
    { who: 'V', text: 'Público foi à loucura, mas os caras tão ofegando.' },
    { who: 'RM', text: 'Acelerou tudo, o combustível acabando kk' }
  ],
  camarim: [
    { who: 'V', text: 'Boa pausa! O camarim deu uma revigorada na stamina, mas o público ficou impaciente com a demora.' },
    { who: 'RM', text: 'Foi beber água e a galera ficou olhando pro palco vazio kk' }
  ],
  camarimOut: { who: 'V', text: 'Camarim esgotado! Não dá mais tempo de fugir pro backstage.' },
  solo: [
    { who: 'JK', text: 'Solo bem escolhido, os caras respiraram e a galera nem percebeu.' },
    { who: 'RM', text: 'Até que tu sabe o que faz. Anota aí que isso é raro.' }
  ],
  armys: [
    { who: 'V', text: 'Estádio gritando seu nome. Custou voz, mas valeu.' },
    { who: 'JK', text: 'Falou com a galera e a plateia pirou.' }
  ],
  timeout: [
    { who: 'RM', text: 'Hesitou e o show esfriou. Palco não espera, Luna.' },
    { who: 'V', text: 'Silêncio no palco... a galera tá começando a vaiar.' }
  ],
  collapse: { who: 'RM', text: 'O show tropeçou feio. Quase derrubou todo mundo kk' }
};

const M3 = {
  n: 3,
  react: {
    good: { who: 'V', text: 'Show lindo, Luna. A gente quase acreditou que tu sabia o que tava fazendo.' },
    mid: { who: 'V', text: 'O show saiu, com uns tropeços. Mas saiu.' },
    bad: { who: 'RM', text: 'Isso foi um show ou um incêndio? Tudo bem, segue o baile.' }
  },
  briefing() {
    return [
      { who: 'V', text: 'Diretoria de palco na área. Missão 3: The Lost Setlist. O show tá rolando ao vivo e a setlist sumiu dos monitores!' },
      { who: 'RM', text: 'Você gerencia a stamina do grupo e a satisfação do público em tempo real. Se deixar qualquer um dos medidores zerar, o show tropeça e eu vou te zoar até o fim da operação.' },
      { who: 'V', text: 'São 5 blocos de show. Em cada um tu tem 30 segundos pra escolher o que a gente faz no palco: acelerar, pausar no camarim (só tem 2 pausas), mandar solos ou falar com as ARMYs. Cuida da stamina e do público.' }
    ];
  },
  retryBriefing() {
    return [
      { who: 'V', text: 'Voltou pro palco? Então vamos de novo. As situações vão mudar um pouco, não decora.' },
      { who: 'RM', text: 'Mesmas regras: 5 blocos, 30 segundos cada e só 2 pausas no camarim. Pensa antes de clicar, que palco não é teu quarto kk' }
    ];
  },

  setMeter(which, v) {
    const fill = $('m3-' + which + '-fill');
    fill.style.width = v + '%';
    $('m3-' + which + '-val').textContent = v + '%';
    fill.classList.toggle('low', v <= 25);
  },

  apply(st, key) {
    let fb;
    if (key === 'accel') {
      st.crowd += 20;
      st.stamina -= 30;
      fb = pick(M3_FB.accel);
    } else if (key === 'camarim') {
      if (st.camarim > 0) {
        st.camarim--;
        st.stamina += 30;
        st.crowd -= 10;
        fb = pick(M3_FB.camarim);
      } else {
        st.crowd -= 10;
        fb = M3_FB.camarimOut;
      }
    } else if (key === 'solo') {
      /* retorno decrescente: o solo não vira botão infinito */
      const f = [1, 0.6, 0.3, 0.1][Math.min(st.soloUses, 3)];
      st.soloUses++;
      st.stamina += Math.round(15 * f);
      st.crowd += Math.round(15 * f);
      fb = pick(M3_FB.solo);
    } else if (key === 'armys') {
      st.crowd += 30;
      st.stamina -= 12;
      fb = pick(M3_FB.armys);
    } else {
      st.stamina -= 20;
      st.crowd -= 20;
      fb = pick(M3_FB.timeout);
    }
    st.stamina = clamp(st.stamina, 0, 100);
    st.crowd = clamp(st.crowd, 0, 100);
    let collapsed = false;
    if (st.stamina <= 0) { st.stamina = 20; collapsed = true; }
    if (st.crowd <= 0) { st.crowd = 20; collapsed = true; }
    if (collapsed) { st.collapses++; fb = M3_FB.collapse; }
    return { fb, collapsed };
  },

  block(i, text, st) {
    return new Promise((resolve) => {
      window.scrollTo(0, 0);
      $('m3-block').textContent = 'BLOCO ' + (i + 1) + '/5';
      $('m3-camarim').textContent = 'CAMARIM: ' + st.camarim;
      this.setMeter('stamina', st.stamina);
      this.setMeter('crowd', st.crowd);
      $('m3-narration').textContent = text;
      hideFeedback('m3');
      const nextBtn = $('m3-next');
      nextBtn.classList.add('hidden');
      const box = $('m3-options');
      box.innerHTML = '';

      const defs = [
        ['accel', '⚡ Acelerar o Ritmo', 'Público ↑  Stamina ↓↓'],
        ['camarim', '🚪 Pausa no Camarim', 'Stamina ↑  Público ↓'],
        ['solo', '🎤 Solos Estratégicos', 'Os dois ↑'],
        ['armys', '💬 Falar com ARMYs', 'Público ↑↑  Stamina ↓']
      ];
      const buttons = defs.map((d) => {
        const b = document.createElement('button');
        b.className = 'opt';
        const s1 = document.createElement('span');
        s1.textContent = d[1];
        const s2 = document.createElement('small');
        s2.textContent = d[2];
        b.appendChild(s1);
        b.appendChild(s2);
        b.dataset.key = d[0];
        box.appendChild(b);
        return b;
      });

      let done = false;
      let timer = null;
      const finish = (key, btn) => {
        if (done) return;
        done = true;
        buttons.forEach((b) => { b.disabled = true; if (b !== btn) b.classList.add('dim'); });
        if (key !== 'timeout') timer.stop();
        const res = this.apply(st, key);
        this.setMeter('stamina', st.stamina);
        this.setMeter('crowd', st.crowd);
        $('m3-camarim').textContent = 'CAMARIM: ' + st.camarim;
        showFeedback('m3', res.fb.who, res.fb.text, res.collapsed || key === 'timeout' ? 'bad' : '');
        if (res.collapsed) shakeEl($('screen-m3'));
        nextBtn.textContent = i === 4 ? '[ FINALIZAR SHOW ]' : '[ PRÓXIMO BLOCO ]';
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => { nextBtn.onclick = null; resolve(); };
      };

      buttons.forEach((b) => b.addEventListener('click', () => finish(b.dataset.key, b)));
      timer = startTimer(30, 'm3-timer-fill', 'timer30', () => finish('timeout'));
    });
  },

  async run() {
    setMissionLabel('MISSÃO 3 · THE LOST SETLIST');
    State.attempts[3]++;
    showScreen('m3');
    const st = { stamina: 100, crowd: 50, camarim: 2, soloUses: 0, collapses: 0 };
    const mid = shuffle(M3_BLOCKS.slice(1, 4));
    const texts = [M3_BLOCKS[0], mid[0], mid[1], mid[2], M3_BLOCKS[4]];
    for (let i = 0; i < 5; i++) {
      await this.block(i, texts[i], st);
    }
    return clamp(Math.round((st.stamina + st.crowd) / 2) - 15 * st.collapses, 0, 100);
  }
};

const M4 = {
  n: 4,
  react: {
    good: { who: 'RM', text: 'Memória boa, hein. Quem diria, achei que tu esquecia até o próprio nome kk' },
    mid: { who: 'RM', text: 'Passou, mas na raça. Tua memória é tipo a da meta, só que com mais esforço.' },
    bad: { who: 'RM', text: 'Esqueceu até o que tinha acabado de ver?? Segue o baile, só não conta pro Eduardo kk' }
  },
  briefing() {
    return [
      { who: 'JK', text: 'Missão 4: Memory Hack. Os arquivos tão embaralhados em 14 pares de objetos. Acha todos antes dos 120 segundos acabarem.' },
      { who: 'RM', text: 'Memória boa é pra quem tem. Se não tiver, treina que ainda dá tempo kk' }
    ];
  },
  retryBriefing() {
    return [
      { who: 'JK', text: 'Os objetos mudaram de lugar, então não adianta lembrar da posição.' },
      { who: 'RM', text: 'E o relógio continua o mesmo: 120 segundos pra achar os 14 pares.' }
    ];
  },

  run() {
    setMissionLabel('MISSÃO 4 · MEMORY HACK');
    State.attempts[4]++;
    showScreen('m4');
    return new Promise((resolve) => {
      const grid = $('m4-grid');
      grid.innerHTML = '';
      hideFeedback('m4');
      const deck = shuffle(OBJECTS.concat(OBJECTS));
      let first = null;
      let lock = false;
      let pairs = 0;
      let over = false;
      let said30 = false;
      let said10 = false;
      let fbTimer = null;
      let timer = null;

      const speak = (who, text, kind) => {
        showFeedback('m4', who, text, kind);
        clearTimeout(fbTimer);
        fbTimer = setTimeout(() => hideFeedback('m4'), 2200);
      };
      const hud = () => { $('m4-pairs').textContent = 'PARES: ' + pairs + '/14'; };
      hud();
      $('m4-time').textContent = '120s';

      const cards = deck.map((o) => {
        const c = document.createElement('button');
        c.className = 'card';
        c.dataset.id = o.id;
        c.innerHTML = '<div class="card-inner"><div class="card-face card-back">?</div><div class="card-face card-front"><img alt=""></div></div>';
        const im = c.querySelector('img');
let tr = 0;
im.onerror = () => { if (tr++ < 4) setTimeout(() => { im.src = o.src + '?r=' + tr; }, 500 * tr); };
im.src = o.src;
        grid.appendChild(c);
        return c;
      });

      const end = (timeout) => {
        if (over) return;
        over = true;
        let bonus = 0;
        if (timeout) {
          speak('RM', 'Cronômetro zerou, os arquivos fecharam. Faz parte.', 'bad');
        } else {
          const left = Math.max(0, 120 - timer.elapsed());
          timer.stop();
          bonus = Math.round((30 * left) / 120);
          speak('JK', 'Terminou. Nem acredito que deu tempo.', 'good');
        }
        const score = clamp(pairs * 5 + bonus, 0, 100);
        setTimeout(() => resolve(score), 2400);
      };

      cards.forEach((c) => c.addEventListener('click', () => {
        if (over || lock || c.classList.contains('flipped') || c.classList.contains('matched')) return;
        c.classList.add('flipped');
        if (!first) { first = c; return; }
        const a = first;
        const b = c;
        first = null;
        lock = true;
        if (a.dataset.id === b.dataset.id) {
          a.classList.add('matched');
          b.classList.add('matched');
          pairs++;
          hud();
          lock = false;
          if (pairs === 14) end(false);
          else speak(...pick([['JK', 'Achou um.'], ['RM', 'Sorte de iniciante.']]), 'good');
        } else {
          a.classList.add('wrongflip');
          b.classList.add('wrongflip');
          if (Math.random() < 0.5) {
            speak(...pick([['RM', 'Errou kk, tá virando carta aleatória?'], ['JK', 'Esse não era.']]), 'bad');
          }
          setTimeout(() => {
            a.classList.remove('flipped', 'wrongflip');
            b.classList.remove('flipped', 'wrongflip');
            lock = false;
          }, 750);
        }
      }));

      timer = startTimer(120, 'm4-timer-fill', 'timer120', () => end(true), (left) => {
        $('m4-time').textContent = Math.ceil(left) + 's';
        if (left <= 30 && !said30) { said30 = true; speak('JK', '30 segundos, Luna.', 'bad'); }
        if (left <= 10 && !said10) { said10 = true; speak('RM', '10 segundos, acelera pqp', 'bad'); }
      });
    });
  }
};/* =====================================================
   PARTE 9: MISSÃO 5 (TERMO HACKER) + MISSÃO 6 (DESARME)
   ===================================================== */

const M5_POOL5 = ['JIMIN', 'CRUSH', 'ROXOS', 'TURNE', 'ARMYS'];
const M5_POOL7 = ['BORAHAE', 'ARQUIVO', 'HACKEAR', 'COMANDO'];
const M5_USED = [];

/* Sem dicionário completo: aceita palavras do jogo e recusa "asdfg", "kkkkk" etc. */
function m5Valid(w) {
  if (!/^[A-Z]+$/.test(w)) return false;
  if (M5_POOL5.indexOf(w) >= 0 || M5_POOL7.indexOf(w) >= 0) return true;
  const vowels = (w.match(/[AEIOU]/g) || []).length;
  if (vowels < (w.length >= 7 ? 3 : 2)) return false;
  if (/(.)\1\1/.test(w)) return false;
  if (/[^AEIOU]{4}/.test(w)) return false;
  return true;
}

function m5Eval(g, a) {
  const res = [];
  const left = {};
  for (let i = 0; i < g.length; i++) res.push('absent');
  for (let i = 0; i < a.length; i++) {
    if (g[i] === a[i]) res[i] = 'correct';
    else left[a[i]] = (left[a[i]] || 0) + 1;
  }
  for (let i = 0; i < g.length; i++) {
    if (res[i] === 'correct') continue;
    if (left[g[i]] > 0) { res[i] = 'present'; left[g[i]]--; }
  }
  return res;
}

function m5Pick(pool, forced) {
  let fresh = pool.filter((w) => M5_USED.indexOf(w) < 0);
  if (!fresh.length) fresh = pool.slice();
  const w = forced && fresh.indexOf(forced) >= 0 ? forced : pick(fresh);
  M5_USED.push(w);
  return w;
}

const M5 = {
  n: 5,
  react: {
    good: { who: 'RM', text: 'As duas camadas abertas. Tu me assustou.' },
    mid: { who: 'RM', text: 'Passou, vai.' },
    bad: { who: 'RM', text: 'Nem as letras tu sabe? Respira que a próxima é mais difícil.' }
  },
  briefing() {
    return [
      { who: 'RM', text: 'Missão 5 — Decryption Gateway. Passou do firewall, mas agora os dados estão compactados em camadas criptografadas de alta densidade.' },
      { who: 'RM', text: 'Camada 1: palavra de 5 letras. Camada 2: palavra de 7. Cada camada tem 6 tentativas. Verde é letra certa no lugar certo, amarelo é letra certa no lugar errado. Esquece a calculadora, hoje é no teclado. Dica: as senhas têm a ver com BTS, ARMY e o nosso mundo hacker.' }
    ];
  },
  retryBriefing() {
    return [
      { who: 'RM', text: 'Senha nova, camada nova. Não adianta tentar a mesma.' },
      { who: 'RM', text: 'Regra é a mesma: 6 tentativas por camada, verde é lugar certo e amarelo é lugar errado.' }
    ];
  },

  async run() {
    setMissionLabel('MISSÃO 5 · DECRYPTION GATEWAY');
    State.attempts[5]++;
    showScreen('m5');
    const w1 = m5Pick(M5_POOL5);
    const w2 = m5Pick(M5_POOL7, 'BORAHAE');
    let score = 0;
    score += await this.layer(1, w1);
    score += await this.layer(2, w2);
    return score;
  },

  layer(num, word) {
    return new Promise((resolve) => {
      window.scrollTo(0, 0);
      const len = word.length;
      const gridEl = $('m5-grid');
      gridEl.innerHTML = '';
      gridEl.style.setProperty('--cols', String(len));
      const rows = [];
      for (let r = 0; r < 6; r++) {
        const rowEl = document.createElement('div');
        rowEl.className = 'termo-row';
        const tiles = [];
        for (let c = 0; c < len; c++) {
          const t = document.createElement('div');
          t.className = 'tile';
          rowEl.appendChild(t);
          tiles.push(t);
        }
        gridEl.appendChild(rowEl);
        rows.push({ el: rowEl, tiles: tiles });
      }
      $('m5-layer').textContent = 'CAMADA ' + num + '/2';
      $('m5-tries').textContent = 'TENTATIVA 1/6';
      const msgEl = $('m5-msg');
      const msg = (t) => { msgEl.textContent = t; };
      msg('');
      const nextBtn = $('m5-next');
      nextBtn.classList.add('hidden');

      let row = 0;
      let col = 0;
      let busy = false;
      let finished = false;
      const guess = [];
      const keyEls = {};

      const kb = $('m5-keyboard');
      kb.innerHTML = '';
      const layout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
      ];

      const press = (k) => {
        if (finished || busy) return;
        if (k === 'ENTER') { submit(); return; }
        if (k === '⌫') {
          if (col > 0) {
            col--;
            guess.pop();
            rows[row].tiles[col].textContent = '';
            rows[row].tiles[col].classList.remove('filled');
          }
          return;
        }
        if (col < len) {
          rows[row].tiles[col].textContent = k;
          rows[row].tiles[col].classList.add('filled');
          guess.push(k);
          col++;
        }
      };

      layout.forEach((keys) => {
        const kr = document.createElement('div');
        kr.className = 'kb-row';
        keys.forEach((k) => {
          const b = document.createElement('button');
          b.className = 'key' + (k === 'ENTER' || k === '⌫' ? ' wide' : '');
          b.textContent = k;
          b.addEventListener('click', () => press(k));
          kr.appendChild(b);
          if (k.length === 1 && k !== '⌫') keyEls[k] = b;
        });
        kb.appendChild(kr);
      });

      const onKey = (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'Enter') press('ENTER');
        else if (e.key === 'Backspace') press('⌫');
        else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toUpperCase());
      };
      document.addEventListener('keydown', onKey);

      const conclude = (pts, text) => {
        finished = true;
        msg(text);
        nextBtn.textContent = num === 1 ? '[ PRÓXIMA CAMADA ]' : '[ CONCLUIR ]';
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => {
          nextBtn.onclick = null;
          document.removeEventListener('keydown', onKey);
          resolve(pts);
        };
      };

      const submit = async () => {
        if (busy || finished) return;
        if (col < len) { msg('RM: Faltam letras, Luna.'); shakeEl(rows[row].el); return; }
        const g = guess.join('');
        if (!m5Valid(g)) { msg('RM: Isso nem é palavra, Luna kk'); shakeEl(rows[row].el); return; }
        busy = true;
        const res = m5Eval(g, word);
        for (let i = 0; i < len; i++) {
          await sleep(170);
          rows[row].tiles[i].classList.add(res[i]);
        }
        const rank = { absent: 1, present: 2, correct: 3 };
        for (let i = 0; i < len; i++) {
          const k = keyEls[g[i]];
          if (!k) continue;
          const cur = k.dataset.st || '';
          if (!cur || rank[res[i]] > rank[cur]) {
            k.classList.remove('absent', 'present', 'correct');
            k.classList.add(res[i]);
            k.dataset.st = res[i];
          }
        }
        const tries = row + 1;
        busy = false;
        if (g === word) {
          Sound.play('right');
          const pts = tries <= 2 ? 50 : tries <= 4 ? 40 : 30;
          const t = tries <= 2 ? 'RM: Descriptografou sem suar, até desconfio kk'
            : tries <= 4 ? 'RM: Abriu, só demorou.'
            : 'RM: Raspou. Foi na sorte ou no desespero?';
          conclude(pts, t);
        } else if (tries >= 6) {
          Sound.play('wrong');
          conclude(0, 'RM: A senha era ' + word + '. Eu mesmo abro pra tu, mas vou cobrar depois.');
        } else {
          Sound.play('wrong');
          shakeEl(rows[row].el);
          if (tries <= 2) msg('RM: ' + pick(['Acesso negado. Tenta de novo.', 'Tá longe, mas tá quente em umas letras.']));
          else if (tries <= 4) msg('RM: O sistema tá ficando nervoso, hein.');
          else msg('RM: Última chance, não me passa vergonha.');
          row++;
          col = 0;
          guess.length = 0;
          $('m5-tries').textContent = 'TENTATIVA ' + (row + 1) + '/6';
        }
      };
    });
  }
};

/* ---------- M6: DESARME O SERVIDOR ---------- */

const M6_COLORS = [
  { id: 'roxo', name: 'roxo', hex: '#b57bee' },
  { id: 'azul', name: 'azul', hex: '#4aa3ff' },
  { id: 'verde', name: 'verde', hex: '#36d9a5' },
  { id: 'vermelho', name: 'vermelho', hex: '#ff5c7a' },
  { id: 'amarelo', name: 'amarelo', hex: '#ffd966' },
  { id: 'branco', name: 'branco', hex: '#f2e9ff' }
];

function m6Rand(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

/* Cria uma pista aleatória. test(c) recebe c = [fio] ou [primeiroCorte, segundoCorte] */
function m6MakeClue(wires, two) {
  const n = wires.length;
  const X = pick(wires);
  const xi = wires.findIndex((w) => w.id === X.id);
  const adj = (i) => (i > 0 && wires[i - 1].id === X.id) || (i < n - 1 && wires[i + 1].id === X.id);
  const par = Math.random() < 0.5 ? 0 : 1; /* 0 = par (posição 2,4,6), 1 = ímpar */
  const isPar = (i) => (i + 1) % 2 === (par === 0 ? 0 : 1);
  const parTxt = par === 0 ? 'par' : 'ímpar';

  if (!two) {
    const k = m6Rand(0, n - 1);
    const opts = [
      { text: 'Não é o fio ' + X.name + '.', test: (c) => wires[c[0]].id !== X.id },
      { text: k === 0 ? 'Não é o primeiro da esquerda.' : k === n - 1 ? 'Não é o último da direita.' : 'Não é o ' + (k + 1) + 'º fio, contando da esquerda.', test: (c) => c[0] !== k },
      { text: k === 0 ? 'É o primeiro da esquerda.' : k === n - 1 ? 'É o último da direita.' : 'É o ' + (k + 1) + 'º fio, contando da esquerda.', test: (c) => c[0] === k },
      { text: 'Fica do lado do fio ' + X.name + '.', test: (c) => adj(c[0]) },
      { text: 'Fica numa posição ' + parTxt + ', contando da esquerda.', test: (c) => isPar(c[0]) },
      { text: 'Fica à esquerda do fio ' + X.name + '.', test: (c) => c[0] < xi },
      { text: 'Fica à direita do fio ' + X.name + '.', test: (c) => c[0] > xi }
    ];
    return pick(opts);
  }

  const gap = m6Rand(0, n - 2);
  const opts = [
    { text: 'O primeiro corte não é o fio ' + X.name + '.', test: (c) => wires[c[0]].id !== X.id },
    { text: 'O segundo corte não é o fio ' + X.name + '.', test: (c) => wires[c[1]].id !== X.id },
    { text: 'O primeiro corte fica numa posição ' + parTxt + '.', test: (c) => isPar(c[0]) },
    { text: 'O segundo corte fica numa posição ' + parTxt + '.', test: (c) => isPar(c[1]) },
    { text: 'O primeiro corte fica do lado do fio ' + X.name + '.', test: (c) => adj(c[0]) },
    { text: 'O segundo corte fica do lado do fio ' + X.name + '.', test: (c) => adj(c[1]) },
    { text: 'O segundo corte fica à direita do primeiro.', test: (c) => c[1] > c[0] },
    { text: 'O segundo corte fica à esquerda do primeiro.', test: (c) => c[1] < c[0] },
    { text: 'Entre os dois cortes ' + (gap === 1 ? 'tem exatamente 1 fio.' : gap === 0 ? 'não tem nenhum fio.' : 'tem exatamente ' + gap + ' fios.'), test: (c) => Math.abs(c[1] - c[0]) - 1 === gap },
    { text: 'Os dois cortes não são vizinhos.', test: (c) => Math.abs(c[1] - c[0]) > 1 },
    { text: 'O primeiro corte é um fio da ponta.', test: (c) => c[0] === 0 || c[0] === n - 1 },
    { text: 'O segundo corte é um fio da ponta.', test: (c) => c[1] === 0 || c[1] === n - 1 }
  ];
  return pick(opts);
}

/* Quantos "mundos" são possíveis com essas pistas (precisa dar exatamente 1) */
function m6CountWorlds(clues, cfg, n) {
  const cands = [];
  if (cfg.two) {
    for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (a !== b) cands.push([a, b]);
  } else {
    for (let i = 0; i < n; i++) cands.push([i]);
  }
  let count = 0;
  cands.forEach((c) => {
    let falsos = 0;
    clues.forEach((cl) => { if (!cl.test(c)) falsos++; });
    if (cfg.liar ? falsos === 1 : falsos === 0) count++;
  });
  return count;
}

const M6_CFG = [
  null,
  { n: 4, k: 3, liar: false, two: false },
  { n: 5, k: 3, liar: true, two: false },
  { n: 6, k: 4, liar: true, two: true }
];

function m6Generate(level) {
  const cfg = M6_CFG[level];
  const n = cfg.n;
  let last = null;
  for (let attempt = 0; attempt < 8000; attempt++) {
    const wires = shuffle(M6_COLORS).slice(0, n);
    let target;
    if (cfg.two) {
      const a = m6Rand(0, n - 1);
      let b = m6Rand(0, n - 1);
      while (b === a) b = m6Rand(0, n - 1);
      target = [a, b];
    } else {
      target = [m6Rand(0, n - 1)];
    }
    const speakers = shuffle(cfg.two ? ['RM', 'V', 'JK', 'RM'] : ['RM', 'V', 'JK']);
    let liarIdx = -1;
    if (cfg.liar) {
      const r = Math.random();
      const who = r < 0.5 ? 'JK' : r < 0.8 ? 'RM' : 'V'; /* o JK mente mais */
      const slots = [];
      speakers.forEach((s, k) => { if (s === who) slots.push(k); });
      liarIdx = pick(slots);
    }
    const clues = [];
    let ok = true;
    for (let k = 0; k < cfg.k; k++) {
      const want = k !== liarIdx;
      let found = null;
      for (let t = 0; t < 80; t++) {
        const cand = m6MakeClue(wires, cfg.two);
        if (cand.test(target) === want && !clues.some((x) => x.text === cand.text)) { found = cand; break; }
      }
      if (!found) { ok = false; break; }
      clues.push(found);
    }
    if (!ok) continue;
    last = { wires: wires, target: target, clues: clues, speakers: speakers, liarIdx: liarIdx, cfg: cfg };
    if (m6CountWorlds(clues, cfg, n) === 1) return last;
  }
  return last;
}

const M6_SPARK = [
  ['RM', 'Faísca! Tá cortando fio aleatório?? kkkk'],
  ['V', 'Por pouco, tem uma vida só.']
];
const M6_CUT = [
  ['V', 'Cortou. Servidor desarmado.'],
  ['JK', 'Boa, Luna.']
];
const M6_LIAR = {
  JK: 'Tá bom, fui eu que menti. Faz parte.',
  RM: 'Fui eu que menti. Aprende a desconfiar de mim kk',
  V: 'Fui eu que menti, foi mal Luna.'
};

const M6 = {
  n: 6,
  react: {
    good: { who: 'RM', text: 'Desarmou tudo. Admito que dessa vez tu não passou vergonha.' },
    mid: { who: 'RM', text: 'Sobreviveu. O servidor não, mas tudo bem.' },
    bad: { who: 'RM', text: 'Tu explodiu mais servidor que uma gambiarra do Eduardo kk' }
  },
  briefing() {
    return [
      { who: 'V', text: 'Missão 6: Desarme o Servidor. Chegamos na sala dos servidores, e cada um tá com uma bomba-relógio de dados. A gente dá as pistas, tu corta o fio.' },
      { who: 'RM', text: 'Tu tem 2 vidas por servidor. Cortou errado, dá faísca. Cortou errado duas vezes, o servidor explode e eu vou rir mt.' }
    ];
  },
  retryBriefing() {
    return [
      { who: 'V', text: 'Servidores novos, fios novos, quem mente também mudou.' },
      { who: 'RM', text: 'Regra é a mesma: 2 vidas por servidor. Vê se desconfia de quem tem que desconfiar kk' }
    ];
  },

  async run() {
    setMissionLabel('MISSÃO 6 · DESARME O SERVIDOR');
    State.attempts[6]++;
    const pts = [0, 25, 35, 40];
    let score = 0;
    for (let lv = 1; lv <= 3; lv++) {
      if (lv === 2) {
        await say([
          { who: 'RM', text: 'Aviso justo: daqui pra frente um de nós tá mentindo. Descobre quem.' },
          { who: 'JK', text: 'Eu? Nunca. Digo, quase nunca.' }
        ]);
      }
      if (lv === 3) {
        await say([
          { who: 'RM', text: 'Esse último é em ordem: tu corta dois fios, na sequência certa. Cortou o fio errado, perde vida.' }
        ]);
      }
      showScreen('m6');
      score += await this.server(lv, pts[lv]);
    }
    return score;
  },

  server(level, maxPts) {
    return new Promise((resolve) => {
      window.scrollTo(0, 0);
      const puz = m6Generate(level);
      const wires = puz.wires;
      const target = puz.target;
      const two = puz.cfg.two;
      let lives = 2;
      let step = 0;
      let finished = false;
      let liarTimer = null;

      $('m6-server').textContent = 'SERVIDOR ' + level + '/3';
      $('m6-lives').textContent = 'VIDAS: 2';
      $('m6-order').textContent = two ? 'ORDEM IMPORTA: corta 2 fios na sequência (1º corte, depois o 2º).' : '';
      hideFeedback('m6');
      const nextBtn = $('m6-next');
      nextBtn.classList.add('hidden');
      const rack = $('m6-rack');
      rack.className = 'rack';

      const box = $('m6-clues');
      box.innerHTML = '';
      puz.clues.forEach((cl, k) => {
        const c = CHAR[puz.speakers[k]];
        const div = document.createElement('div');
        div.className = 'clue';
        const img = document.createElement('img');
        img.className = 'fb-avatar';
        img.src = c.img;
        img.alt = '';
        const body = document.createElement('div');
        body.className = 'fb-body';
        const b = document.createElement('b');
        b.textContent = c.name;
        const p = document.createElement('p');
        p.textContent = cl.text;
        body.appendChild(b);
        body.appendChild(p);
        div.appendChild(img);
        div.appendChild(body);
        box.appendChild(div);
      });

      const wbox = $('m6-wires');
      wbox.innerHTML = '';
      const btns = wires.map((w, i) => {
        const b = document.createElement('button');
        b.className = 'wire';
        b.style.setProperty('--c', w.hex);
        b.setAttribute('aria-label', 'Fio ' + (i + 1) + ' ' + w.name);
        b.innerHTML = '<span class="line"></span><span class="num"></span>';
        b.querySelector('.num').textContent = String(i + 1);
        wbox.appendChild(b);
        return b;
      });

      const end = (won) => {
        finished = true;
        btns.forEach((x) => { x.disabled = true; });
        const pts = won ? (lives === 2 ? maxPts : Math.round(maxPts / 2)) : 0;
        if (won) {
          rack.classList.add('safe');
          const f = pick(M6_CUT);
          showFeedback('m6', f[0], f[1], 'good');
          Sound.play('right');
        } else {
          rack.classList.add('explode');
          showFeedback('m6', 'RM', 'Boom. Tu desarmou o servidor igual o Eduardo desarma briga, só que pior kk', 'bad');
          Sound.play('wrong');
        }
        if (puz.liarIdx >= 0) {
          const k = puz.liarIdx;
          box.children[k].classList.add('liar');
          const who = puz.speakers[k];
          liarTimer = setTimeout(() => showFeedback('m6', who, M6_LIAR[who], ''), 1800);
        }
        nextBtn.textContent = level < 3 ? '[ PRÓXIMO SERVIDOR ]' : '[ FINALIZAR ]';
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => {
          nextBtn.onclick = null;
          clearTimeout(liarTimer);
          resolve(pts);
        };
      };

      btns.forEach((b, i) => b.addEventListener('click', () => {
        if (finished || b.classList.contains('cut')) return;
        if (i === target[step]) {
          b.classList.add('cut');
          step++;
          if (step >= target.length) end(true);
          else showFeedback('m6', 'RM', 'Primeiro corte certo. Agora o segundo.', 'good');
        } else {
          if (two) b.style.opacity = '0.45';
          else b.classList.add('cut');
          lives--;
          $('m6-lives').textContent = 'VIDAS: ' + lives;
          if (lives <= 0) {
            end(false);
          } else {
            const f = pick(M6_SPARK);
            showFeedback('m6', f[0], f[1], 'bad');
            Sound.play('wrong');
            rack.classList.remove('spark');
            void rack.offsetWidth;
            rack.classList.add('spark');
            setTimeout(() => rack.classList.remove('spark'), 400);
          }
        }
      }));
    });
  }
};/* =====================================================
   PARTE 10: MISSÃO 7, PORTÃO, RETRY E INÍCIO DO JOGO
   ===================================================== */

const LETTER = "Encerrou a Operação. É, pois é... se vc chegou até aqui (passando pelos interrogatórios do Jungkook, pelo show caótico do Taehyung e pelos disquetes corrompidos do RM), parabéns Luna. \n\n" +
"Sabe por que eu fiz esse jogo do zero pra vc? Porque eu quis criar algo único, com a nossa cara, cheio das nossas referências, e de tudo o que vc gosta, bom não tudo mas o que você mais ama tá aqui, que é o BTS. Deu trabalho? Sim, um trabalho infernal, teve bug o tempo todo que quase me fez querer desistir, ou tacar meu celular no chão ou então simplesmente só dormir porque da trabalho KKK ficar pensando assim. Mas quer saber de uma coisa ? valeu cada linha de código só para ver você jogando, rindo das brincadeiras dos avatares e aceitando os desafios\n\n" +
"Obrigado por ter entrado nas missões e jogado esse joguinho. E como eu meio que ja disse e repito: Ele é único e EXCLUSIVAMENTE seu e pensando só pra VOCÊ, e eu quero que só VOCÊ jogue ele. Enfim, obrigado por ter jogado até o fim e por aturar as minhas invenções. E é isso, parabéns minha cara agente Luna.\n\n" +
"De: Zac/Carlos Eduardo\nPara: Luna";

const M7_NAMES = [
  '',
  'M1 · Acesso Primário',
  'M2 · ARMY Intelligence',
  'M3 · The Lost Setlist',
  'M4 · Memory Hack',
  'M5 · Decryption Gateway',
  'M6 · Desarme o Servidor',
  'M7 · System Restore'
];

const M7_LOGS = [
  [0, 'Iniciando deploy...'],
  [15, 'Recuperando 1% do cérebro da meta...'],
  [30, 'Restaurando a setlist da turnê...'],
  [50, 'Desembaralhando os disquetes do RM...'],
  [70, 'Calibrando o hype do público...'],
  [90, 'Removendo a gerência corrupta do sistema...'],
  [99, 'ERRO: o último arquivo não é da turnê.']
];

const M7 = {
  async run() {
    setMissionLabel('MISSÃO 7 · SYSTEM RESTORE & DEPLOY');
    State.attempts[7]++;
    await say([
      { who: 'RM', text: 'Passou. Agora vem a última missão: System Restore & Deploy. Hora de contar os pontos e restaurar o sistema da turnê.' },
      { who: 'RM', text: 'Placar saindo. Respira, que até o Eduardo tá nervoso kk' }
    ]);

    showScreen('m7');
    const board = $('m7-board');
    board.innerHTML = '';
    board.classList.remove('hidden');
    $('m7-restore').classList.add('hidden');
    $('m7-letter').classList.add('hidden');
    $('m7-next').classList.add('hidden');

    State.setBest(7, 100); /* a M7 é garantida */
    for (let i = 1; i <= 7; i++) {
      const row = document.createElement('div');
      row.className = 'board-row';
      const a = document.createElement('span');
      a.className = 'b-name';
      a.textContent = M7_NAMES[i];
      const s = document.createElement('span');
      s.className = 'b-score';
      s.textContent = State.best[i] + ' pts';
      row.appendChild(a);
      row.appendChild(s);
      board.appendChild(row);
      await sleep(650);
    }
    const total = State.total();
    const trow = document.createElement('div');
    trow.className = 'board-row board-total';
    const ta = document.createElement('span');
    ta.className = 'b-name';
    ta.textContent = 'TOTAL';
    const ts = document.createElement('span');
    ts.className = 'b-score';
    ts.textContent = total + ' / 700';
    trow.appendChild(ta);
    trow.appendChild(ts);
    board.appendChild(trow);
    updatePoints();
    await sleep(1800);

    await say([{
      who: 'JK',
      text: total >= 600
        ? 'Placar final tá bonito, vou admitir. Tu foi bem.'
        : 'Foi por pouco, mas o placar final fechou dentro da meta. Parabéns por não estragar tudo no final.'
    }]);

    showScreen('m7');
    $('m7-restore').classList.remove('hidden');
    let li = 0;
    for (let p = 0; p <= 99; p++) {
      $('m7-fill').style.width = p + '%';
      $('m7-pct').textContent = p + '%';
      while (li < M7_LOGS.length && p >= M7_LOGS[li][0]) {
        $('m7-log').textContent = M7_LOGS[li][1];
        li++;
      }
      await sleep(55);
    }
    $('m7-fill').style.background = 'linear-gradient(90deg,#ff5c7a,#ffd966)';
    $('m7-pct').style.color = '#ff5c7a';
    await sleep(2400);

    await say([
      { who: 'RM', text: 'Barra travou em 99%. Calma, não foi bug. Esse arquivo é outro.' },
      { who: 'V', text: 'Missão cumprida, Agente Luna. Último arquivo é pessoal. Pode ler, a gente finge que não tá olhando.' }
    ]);

    showScreen('m7');
    board.classList.add('hidden');
    $('m7-restore').classList.add('hidden');
    const letterBox = $('m7-letter');
    letterBox.classList.remove('hidden');
    letterBox.onclick = () => skipType();
    const scroller = setInterval(() => { letterBox.scrollTop = letterBox.scrollHeight; }, 250);
    await typeInto($('m7-letter-text'), LETTER, 34);
    clearInterval(scroller);
    letterBox.scrollTop = letterBox.scrollHeight;
    await sleep(800);
    const again = $('m7-next');
    again.textContent = '[ JOGAR DE NOVO ]';
    again.classList.remove('hidden');
    again.onclick = () => { window.location.reload(); };
  }
};

/* ---------- FLUXO DO JOGO ---------- */
const MISSIONS = { 2: M2, 3: M3, 4: M4, 5: M5, 6: M6 };

async function playMission(n, retry) {
  const m = MISSIONS[n];
  const lines = retry ? m.retryBriefing() : m.briefing();
  if (lines.length) await say(lines);
  const score = await m.run();
  await missionEnd(n, score, m.react);
}

/* Missões em que ela foi mal (abaixo de 70) */
function weakMissions() {
  const list = [];
  for (let n = 2; n <= 6; n++) if (State.best[n] < 70) list.push(n);
  return list;
}

async function gate() {
  while (State.total() < 400) {
    State.loops++;
    const intro = State.loops === 1
      ? 'Poxa Luna, calculei aqui e tu não conseguiu fazer o básico, que é 400 pontos pra tentar + 100 na M7 e fechar com 500. Eu acho que até a meta conseguiria kk'
      : State.loops === 2
        ? 'De novo? Tu persistente, isso eu respeito. Ainda faltam pontos pra fechar os 400.'
        : 'Terceira vez? Já era pra ter passado kk. Faltam pontos ainda, bora.';
    let choice = await say([{
      who: 'RM',
      text: intro,
      options: [
        { text: '[ RECOMEÇAR ]', value: 'again' },
        { text: '[ DESISTIR ]', value: 'quit' }
      ]
    }]);
    while (choice === 'quit') {
      choice = await say([{
        who: 'RM',
        text: 'Beleza, o Eduardo e a meta ganharam. Parabéns pra eles kk',
        options: [{ text: '[ MUDEI DE IDEIA ]', value: 'again' }]
      }]);
    }
    const weak = weakMissions();
    const names = weak.map((n) => 'M' + n);
    const lista = names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' e ' + names[names.length - 1];
    await say([{
      who: 'RM',
      text: 'Tu vacilou na ' + lista + '. Bora refazer ' + (weak.length === 1 ? 'essa' : 'essas') + ', as outras tu já domina.'
    }]);
    for (const n of weak) await playMission(n, true);
  }
}

async function runGame() {
  await M1.run();
  for (let n = 2; n <= 6; n++) await playMission(n, false);
  await gate();
  await M7.run();
}

/* ---------- INÍCIO ---------- */
function init() {
  Sound.loadPref();
  Sound.bindButton();
  Sound.applyMute();
  updatePoints();
  const startBtn = $('btn-start');
  startBtn.disabled = true;
  preloadAll().then(() => {
    $('load-text').textContent = 'Arquivos carregados. Terminal pronto.';
    startBtn.disabled = false;
  });
  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    Sound.unlock();
    Sound.playMusic();
    await sleep(600);
    try {
      await runGame();
    } catch (e) {
      console.error(e);
    }
  });
}

init();
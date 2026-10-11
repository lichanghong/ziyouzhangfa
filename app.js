// 生字笔顺官网 — 动态笔顺演示
// 数据源与 App 相同：jsdelivr 上的 hanzi-writer-data。

(function () {
  'use strict';

  var INK = '#202521';
  var GUIDE = '#DCD5C7';
  var JADE = '#237A68';
  var DATA_BASE = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/';
  var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function charDataLoader(char, onComplete) {
    fetch(DATA_BASE + encodeURIComponent(char) + '.json')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('no data')); })
      .then(onComplete)
      .catch(function () { onComplete(null); });
  }

  function writerOptions(extra) {
    var opts = {
      width: 400,
      height: 400,
      padding: 0,
      strokeColor: INK,
      outlineColor: GUIDE,
      highlightColor: JADE,
      highlightCompleteColor: null,
      showCharacter: false,
      showOutline: false,
      strokeAnimationSpeed: 1.1,
      delayBetweenStrokes: 300,
      charDataLoader: charDataLoader
    };
    Object.keys(extra || {}).forEach(function (k) { opts[k] = extra[k]; });
    return opts;
  }

  /* ===== Hero：轮播「字·有·章·法」笔顺动画 ===== */

  var HERO_CHARS = ['字', '有', '章', '法'];
  var heroIndex = 0;
  var heroHost = document.getElementById('hero-writer');
  var heroCaption = document.getElementById('hero-caption');

  function playHero() {
    if (!heroHost) return;
    var char = HERO_CHARS[heroIndex % HERO_CHARS.length];
    heroIndex++;
    heroCaption.textContent = char;
    heroHost.innerHTML = '';

    var writer = HanziWriter.create(heroHost, char, writerOptions({
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 340
    }));

    if (REDUCED_MOTION) {
      writer.showCharacter();
      return;
    }

    writer.animateCharacter({ onComplete: function () {
      setTimeout(playHero, 1500);
    }}).catch(function () { setTimeout(playHero, 1500); });
  }

  /* ===== 演示区：可交互的动态笔顺 ===== */

  var demoHost = document.getElementById('demo-writer');
  var demoCharEl = document.getElementById('demo-char');
  var demoStrokesEl = document.getElementById('demo-strokes');
  var demoStatusEl = document.getElementById('demo-status');
  var input = document.getElementById('char-input');
  var chips = document.getElementById('chips');
  var btnPlay = document.getElementById('btn-play');
  var btnTrace = document.getElementById('btn-trace');
  var btnReset = document.getElementById('btn-reset');

  var writer = null;
  var currentChar = '永';
  var mode = 'idle';   // idle | loading | play | quiz
  var reqSeq = 0;

  function setStatus(text, kind) {
    demoStatusEl.textContent = text;
    demoStatusEl.className = 'pg-status' + (kind ? ' s-' + kind : '');
  }

  function markActiveChip(char) {
    var buttons = chips.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('active', buttons[i].dataset.char === char);
    }
  }

  function setChar(char) {
    currentChar = char;
    mode = 'loading';
    writer = null;
    demoHost.innerHTML = '';
    demoCharEl.textContent = char;
    input.value = char;
    markActiveChip(char);
    demoStrokesEl.textContent = '—';
    setStatus('正在加载「' + char + '」的笔顺数据…');

    var seq = ++reqSeq;
    HanziWriter.loadCharacterData(char, { charDataLoader: charDataLoader })
      .then(function (data) {
        if (seq !== reqSeq) return;
        demoStrokesEl.textContent = '共 ' + data.strokes.length + ' 笔';
        buildWriter();
        play();
      })
      .catch(function () {
        if (seq !== reqSeq) return;
        mode = 'idle';
        setStatus('暂无「' + char + '」的笔顺数据，换个字试试', 'bad');
      });
  }

  function buildWriter() {
    writer = HanziWriter.create(demoHost, currentChar, writerOptions({
      showOutline: true,
      strokeAnimationSpeed: 1.1,
      delayBetweenStrokes: 300
    }));
  }

  function play() {
    if (!writer) return;
    if (mode === 'quiz') writer.cancelQuiz();
    mode = 'play';
    setStatus('笔顺演示中…');
    writer.hideCharacter();
    writer.animateCharacter({ onComplete: function () {
      if (mode === 'play') {
        mode = 'idle';
        setStatus('演示完毕，点「描红练习」亲手写一写');
      }
    }}).catch(function () {});
  }

  function trace() {
    if (!writer) return;
    mode = 'quiz';
    setStatus('按高亮的下一笔，在格子里跟着写');
    writer.hideCharacter();
    writer.showOutline();
    writer.quiz({
      onCorrectStroke: function (data) {
        setStatus('第 ' + (data.strokeNum + 1) + ' 笔，写得对', 'ok');
      },
      onMistake: function (data) {
        setStatus('第 ' + (data.strokeNum + 1) + ' 笔再想想（已提示 ' + data.mistakesOnStroke + ' 次）', 'bad');
      },
      onComplete: function (data) {
        mode = 'idle';
        if (data.totalMistakes === 0) {
          setStatus('全部正确，这个字你已经会写了！', 'ok');
        } else {
          setStatus('完成描红，共 ' + data.totalMistakes + ' 处提示，再练一次？');
        }
      }
    }).catch(function () {});
  }

  function reset() {
    setChar(currentChar);
  }

  /* 事件接线 */

  btnPlay.addEventListener('click', play);
  btnTrace.addEventListener('click', trace);
  btnReset.addEventListener('click', reset);

  input.addEventListener('input', function () {
    var matches = input.value.match(/[一-鿿]/g);
    if (matches) {
      setChar(matches[matches.length - 1]);
    } else if (input.value.trim() === '') {
      input.value = currentChar;
    }
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') input.blur();
  });

  chips.addEventListener('click', function (e) {
    var target = e.target.closest('button[data-char]');
    if (target) setChar(target.dataset.char);
  });

  /* 启动 */

  playHero();
  setChar('永');
})();

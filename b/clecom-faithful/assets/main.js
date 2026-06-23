/* ============================================================
   OPS — clecom.jp 忠実版 共通スクリプト（バニラJS / ライブラリ無し）
   ============================================================ */
(function () {
  'use strict';

  /* ---- 隠し要素：夕焼けテーマ切替（永続化しない＝再読込でデフォルト青に戻る） ---- */
  var themeOrb = document.querySelector('.theme-orb');
  if (themeOrb) {
    var eggShown = false; // ページ表示中は1回だけ。リロードでリセット（永続化しない）
    var showEggToast = function () {
      if (eggShown) return;
      eggShown = true;
      var t = document.createElement('div');
      t.className = 'easter-toast';
      t.setAttribute('role', 'status');
      var hint = document.querySelector('.sunset-bird')
        ? '<br><span class="easter-toast__hint">鳥を触ると良いことが起こるかも？</span>'
        : '';
      t.innerHTML = '<span class="ico" aria-hidden="true">✨</span><span class="easter-toast__txt">隠し要素発見！おめでとう！' + hint + '</span>';
      document.body.appendChild(t);
      requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('show'); }); });
      setTimeout(function () {
        t.classList.remove('show');
        setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 700);
      }, 4200);
    };
    themeOrb.addEventListener('click', function () {
      document.body.classList.toggle('sunset');
      showEggToast();
    });
  }

  /* ============================================================
     隠し要素②：鳥クリック → ポルトガル語化
       ・永続化しない（ページ再読込で日本語に戻る）
       ・PT表示中は文字が水面に浮かび、カーソルで触れると流れるように弾ける
     ============================================================ */

  // 日本語（trim一致） → ポルトガル語 の対訳辞書
  var PT = {
    // 共通ナビ／ページ見出し
    'ホーム':'Início','ご挨拶':'Saudação','今後の方針':'Direção Futura',
    '意見箱':'Caixa de Opiniões','意見を送る':'Enviar Opinião','メニュー':'Menu','装飾':'Decoração',
    // INTRO（future）
    'バラバラのツールを、':'Ferramentas dispersas,','ひとつの体験へ。':'em uma só experiência.',
    'OPSは、運営を支える仕組みを一つずつ着実に開発・運用していきます。短期の改善から将来の構想まで、AIとITの力で「人がやるべき仕事に時間を使える組織」へとアップデートします。':
      'A OPS desenvolve e opera, de forma constante e um a um, os sistemas que sustentam a gestão. Da melhoria de curto prazo às visões de futuro, com o poder da IA e da TI, atualizamos rumo a uma organização em que as pessoas possam dedicar tempo ao trabalho que realmente importa.',
    // 5つの方針
    'OPSが進める、':'Conduzidas pela OPS,','5つの方針。':'as 5 diretrizes.',
    'タブを選んで、気になる方針をご覧ください。':'Escolha uma aba e veja a diretriz que lhe interessa.',
    'カレンダー':'Calendário','ポータル':'Portal','AI・RAG':'IA・RAG','自動化':'Automação','将来構想':'Visão Futura',
    '方針.':'Diretriz.',
    '全社カレンダーの定着・拡張':'Consolidação e expansão do calendário corporativo',
    '全社の予定をカレンダーに集約。ナレッジ共有・会議・締切を一箇所に集め、誰もが同じ情報を見られる状態をつくります。':
      'Centralizamos a agenda de toda a empresa no calendário. Reunimos compartilhamento de conhecimento, reuniões e prazos em um só lugar, para que todos vejam as mesmas informações.',
    '全社予定':'Agenda corporativa','情報の一元化':'Centralização da informação',
    'ポータル／学生管理システム':'Portal / Sistema de gestão de estudantes',
    '散らばった情報とツールを、ひとつの入り口へ。新しいポータルと学生管理システムで「探す・まとめる」手間を減らします。':
      'Informações e ferramentas dispersas, em uma única porta de entrada. Com um novo portal e sistema de gestão de estudantes, reduzimos o esforço de "buscar e organizar".',
    '学生管理':'Gestão de estudantes',
    '社内LLM・RAGのナレッジ基盤':'Base de conhecimento com LLM・RAG interno',
    '社内LLM／RAGで組織の知見を誰でもすぐ検索。「あの資料どこ？」をなくし、特定の人しかわからない状態をなくします。':
      'Com LLM/RAG interno, qualquer pessoa pesquisa o conhecimento da organização na hora. Acabamos com o "onde está aquele documento?" e com o conhecimento que fica só na cabeça de uma pessoa.',
    '社内LLM':'LLM interno','引き継ぎもスムーズ':'Transições sem complicação',
    '自動化とスタッフ向けAI研修':'Automação e treinamento de IA para a equipe',
    'アラートや自動リマインドで手作業と抜け漏れを削減。あわせてAI・IT研修でリテラシーを組織全体へ広げます。':
      'Com alertas e lembretes automáticos, reduzimos o trabalho manual e as falhas. Junto a treinamentos de IA・TI, ampliamos o letramento a toda a organização.',
    '自動リマインド':'Lembretes automáticos','AI研修':'Treinamento de IA',
    '将来構想 — 次の業務基盤へ':'Visão futura — rumo à próxima base operacional',
    'Salesforceに代わる独自の管理基盤を構想。既存NFTなどの資産も再利用し、次の仕組みへつなげます。':
      'Concebemos uma base de gestão própria em substituição ao Salesforce. Reaproveitamos ativos existentes, como NFTs, conectando ao próximo sistema.',
    '独自基盤':'Base própria','NFT活用':'Uso de NFT',
    // 統合プラットフォーム
    '最終的に目指す、':'A meta final:','統合プラットフォーム。':'uma plataforma integrada.',
    '運営に必要な機能が、ひとつにまとまった体験へ。OPSが描く未来像です。':
      'As funções necessárias à gestão, reunidas em uma única experiência. É a visão de futuro que a OPS desenha.',
    'クライアント管理':'Gestão de clientes','スケジュール管理':'Gestão de agenda','チャット':'Chat',
    '電子署名':'Assinatura eletrônica','リマインド':'Lembretes','活動記録':'Registro de atividades',
    '社内ナレッジ検索':'Busca de conhecimento interno',
    'インターン参加学生の情報や進捗を一元管理。':'Gestão centralizada das informações e do progresso dos estagiários.',
    '受け入れ企業・団体の情報と連絡をまとめて整理。':'Organização das informações e contatos das empresas e entidades parceiras.',
    '全社の予定とイベントをひと目で把握。':'Veja a agenda e os eventos de toda a empresa de relance.',
    'チーム内のやり取りをひとつの場所に集約。':'Conversas da equipe reunidas em um só lugar.',
    '契約・同意の手続きをオンラインで完結。':'Conclua contratos e consentimentos totalmente online.',
    '締切や対応漏れを自動で通知。':'Notificações automáticas de prazos e pendências.',
    '日々の活動ログを残し、振り返りに活用。':'Registre o histórico diário de atividades e use-o nas revisões.',
    '必要な資料・知見をすぐに検索。':'Pesquise rapidamente documentos e conhecimentos necessários.',
    // CTA（future）
    '「自動化したい」を、教えてください。':'Conte-nos o seu "quero automatizar".',
    'あなたの困りごとが、次の方針になります。ご意見・ご提案をお気軽にどうぞ。':
      'Os seus problemas se tornam a próxima diretriz. Sinta-se à vontade para enviar opiniões e sugestões.',
    // CTA（contact）
    'OPSの今後の方針も、ぜひご覧ください。':'Veja também a direção futura da OPS.',
    'これからOPSが取り組む方針をまとめています。':'Reunimos as diretrizes que a OPS vai adotar daqui em diante.',
    '今後の方針を見る':'Ver a direção futura',
    // FOOTER（共通）
    'OPS（Operations）は、NPO法人ドットジェイピーの運営を仕組み化する横断チームです。AIとITで、人がやるべき仕事に時間を使える組織をつくります。':
      'A OPS (Operations) é uma equipe transversal que sistematiza a gestão da ONG Dot-JP. Com IA e TI, criamos uma organização em que as pessoas podem dedicar tempo ao trabalho que importa.',
    'Future / 今後の方針':'Future / Direção Futura','Contact / 意見箱':'Contact / Caixa de Opiniões',
    'NPO法人ドットジェイピー':'ONG Dot-JP',
    '2026年4月 正式始動':'Lançamento oficial em abril de 2026',
    'AIとITで、運営をアップデートする。':'Atualizando a gestão com IA e TI.',
    // CONTACT フォーム
    'お気軽に、':'Sinta-se à vontade:','声を聞かせてください。':'compartilhe a sua voz.',
    'OPSにご関心をお寄せいただきありがとうございます。ご意見・ご提案・ご質問、メンバー参加のご相談など、何でもお書きください。いただいたメッセージはチーム全員で確認します。':
      'Obrigado pelo seu interesse na OPS. Escreva o que quiser: opiniões, sugestões, dúvidas ou consultas sobre participação como membro. Toda a equipe lê as mensagens recebidas.',
    '所属':'Filiação','：NPO法人ドットジェイピー':'：ONG Dot-JP',
    '正式始動':'Início oficial','：2026年4月':'：abril de 2026',
    'お名前':'Nome','カテゴリ':'Categoria','メッセージ':'Mensagem','連絡先':'Contato',
    '任意':'Opcional','必須':'Obrigatório',
    '選択してください':'Selecione','アイデア・提案':'Ideia / Sugestão','改善要望':'Pedido de melhoria',
    '質問・相談':'Dúvida / Consulta','メンバー参加希望':'Quero participar como membro',
    '応援・感想':'Apoio / Impressões','その他':'Outros',
    'メッセージを送る':'Enviar mensagem','送信しました':'Mensagem enviada',
    'ご意見・ご提案をありがとうございます。':'Obrigado pela sua opinião e sugestão.',
    'OPSチーム全員で確認し、今後の活動に活かします。':'Toda a equipe da OPS irá analisar e aproveitar nas próximas atividades.',
    // プレースホルダ／属性
    '山田 太郎':'Maria Silva',
    'ご意見・ご提案・ご質問など、何でもお書きください。':'Escreva o que quiser: opiniões, sugestões, dúvidas etc.',
    '返信が必要な場合のみ（メール等）':'Apenas se precisar de resposta (e-mail etc.)',
    // タイトル
    '今後の方針｜OPS — Operations Team':'Direção Futura｜OPS — Operations Team',
    '意見箱｜OPS — Operations Team':'Caixa de Opiniões｜OPS — Operations Team'
  };

  var translateString = function (s) {
    if (s == null) return s;
    var key = s.trim();
    if (!key) return s;
    if (Object.prototype.hasOwnProperty.call(PT, key)) {
      return s.replace(key, PT[key]); // 前後の空白は維持
    }
    return s;
  };

  var applyPortuguese = function () {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var node;
    while ((node = walker.nextNode())) {
      var orig = node.nodeValue;
      var tr = translateString(orig);
      if (tr !== orig) node.nodeValue = tr;
    }
    // 属性（placeholder / data-desc / aria-label / option value）
    document.querySelectorAll('[placeholder]').forEach(function (el) { el.placeholder = translateString(el.placeholder); });
    document.querySelectorAll('[data-desc]').forEach(function (el) { el.setAttribute('data-desc', translateString(el.getAttribute('data-desc'))); });
    document.querySelectorAll('[aria-label]').forEach(function (el) { el.setAttribute('aria-label', translateString(el.getAttribute('aria-label'))); });
    document.querySelectorAll('option[value]').forEach(function (el) { if (el.value) el.value = translateString(el.value); });
    document.title = translateString(document.title);
    document.documentElement.lang = 'pt';
  };

  // 切替演出①：トロピカルな波が一度洗い流す
  var playWave = function () {
    var w = document.createElement('div');
    w.className = 'pt-wave';
    w.setAttribute('aria-hidden', 'true');
    document.body.appendChild(w);
    w.addEventListener('animationend', function () { if (w.parentNode) w.parentNode.removeChild(w); });
  };

  // ポルトガル語版ラベル（クリーム色の紙＋ブラジル国旗）を左下に表示
  var showLabel = function () {
    if (document.querySelector('.pt-label')) return;
    var l = document.createElement('div');
    l.className = 'pt-label';
    l.setAttribute('aria-hidden', 'true');
    l.innerHTML =
      '<svg class="pt-label__flag" viewBox="0 0 28 20" aria-hidden="true">' +
        '<rect width="28" height="20" fill="#009b3a"/>' +
        '<polygon points="14,2 26,10 14,18 2,10" fill="#ffdf00"/>' +
        '<circle cx="14" cy="10" r="4.3" fill="#002776"/>' +
      '</svg>' +
      '<span>ポルトガル語版</span>';
    // 画面固定ではなく、ヒーローセクション内に配置（ページと共にスクロール）
    var host = document.querySelector('.page-kv') || document.body;
    host.appendChild(l);
  };

  // 切替演出②：画面下からヤシの木がせり上がる（そのまま残る）
  var showPalms = function () {
    if (document.querySelector('.pt-palms')) return;
    var p = document.createElement('div');
    p.className = 'pt-palms';
    p.setAttribute('aria-hidden', 'true');
    p.innerHTML = '<span class="pl">🌴</span><span class="pr">🌴</span>';
    document.body.appendChild(p);
  };

  // 遊べる要素：蹴って遊べるサッカーボール（簡易物理）
  var spawnBall = function () {
    if (document.querySelector('.pt-ball')) return;
    var ball = document.createElement('div');
    ball.className = 'pt-ball';
    ball.textContent = '⚽';
    ball.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ball);

    var size = 46, x = window.innerWidth * 0.5 - size / 2, y = 100, vx = 3.4, vy = 0, ang = 0;
    var GRAV = 0.6, BOUNCE = 0.74, AIR = 0.992, GROUND = 0.9;
    var dragging = false, dragDX = 0, dragDY = 0, samples = [], running = false;
    var W = function () { return window.innerWidth; }, H = function () { return window.innerHeight; };
    var draw = function () { ball.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + ang.toFixed(1) + 'deg)'; };

    // ボール中心の文字を1つだけ拾う（事前ラップ不要＝超軽量）
    var charAtPoint = function (px, py) {
      var node, off;
      if (document.caretRangeFromPoint) {
        var r = document.caretRangeFromPoint(px, py);
        if (!r) return null; node = r.startContainer; off = r.startOffset;
      } else if (document.caretPositionFromPoint) {
        var c = document.caretPositionFromPoint(px, py);
        if (!c) return null; node = c.offsetNode; off = c.offset;
      } else return null;
      if (!node || node.nodeType !== 3) return null;
      return { node: node, off: off };
    };

    // 当たった文字を砕いて飛ばす（1文字＝1要素、アニメ後に除去）
    var shatter = function (px, py) {
      ball.style.pointerEvents = 'none';
      var hit = charAtPoint(px, py);
      ball.style.pointerEvents = '';
      if (!hit) return;
      var data = hit.node.data, off = hit.off;
      if (off >= data.length) off = data.length - 1;
      if (off < 0) return;
      var ch = data.charAt(off);
      if (!ch || ch === ' ' || ch === '\n' || ch === '\t' || ch === '　') return;
      var parent = hit.node.parentElement;
      if (!parent || (parent.closest && parent.closest('.pt-ball,.pt-palms,.pt-wave,.egg-modal,.pt-label'))) return;
      var rng = document.createRange();
      rng.setStart(hit.node, off); rng.setEnd(hit.node, off + 1);
      var rect = rng.getBoundingClientRect();
      if (!rect || !rect.width) return;
      var cs = window.getComputedStyle(parent);
      hit.node.data = data.slice(0, off) + data.slice(off + 1); // 元の文字を消す
      var f = document.createElement('span');
      f.className = 'pt-shard';
      f.textContent = ch;
      f.style.left = rect.left + 'px';
      f.style.top = rect.top + 'px';
      f.style.font = cs.font;
      f.style.color = cs.color;
      f.style.setProperty('--tx', ((vx >= 0 ? 1 : -1) * (30 + Math.random() * 45)).toFixed(0) + 'px');
      f.style.setProperty('--rot', ((Math.random() * 2 - 1) * 360).toFixed(0) + 'deg');
      document.body.appendChild(f);
      f.addEventListener('animationend', function () { if (f.parentNode) f.parentNode.removeChild(f); });
    };

    var tick = 0;
    var step = function () {
      if (!dragging) {
        vy += GRAV; x += vx; y += vy; vx *= AIR; ang += vx * 2;
        if (x < 0) { x = 0; vx = -vx * BOUNCE; }
        if (x + size > W()) { x = W() - size; vx = -vx * BOUNCE; }
        if (y < 0) { y = 0; vy = -vy * BOUNCE; }
        if (y + size > H()) { y = H() - size; vy = -vy * BOUNCE; vx *= GROUND; if (Math.abs(vy) < 1.3) vy = 0; }
        // 速く動いているときだけ、数フレームに一度だけ衝突判定（超軽量）
        if ((++tick % 4) === 0 && (vx * vx + vy * vy) > 36) {
          shatter(x + size / 2, y + size / 2);
        }
      }
      draw();
      var rest = !dragging && Math.abs(vx) < 0.15 && Math.abs(vy) < 0.15 && y + size >= H() - 0.6;
      if (rest) { running = false; return; }
      requestAnimationFrame(step);
    };
    var start = function () { if (!running) { running = true; requestAnimationFrame(step); } };

    ball.addEventListener('pointerdown', function (e) {
      dragging = true;
      if (ball.setPointerCapture) { try { ball.setPointerCapture(e.pointerId); } catch (err) {} }
      dragDX = e.clientX - x; dragDY = e.clientY - y; vx = vy = 0;
      samples = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var nx = Math.max(0, Math.min(W() - size, e.clientX - dragDX));
      var ny = Math.max(0, Math.min(H() - size, e.clientY - dragDY));
      var mvx = nx - x, mvy = ny - y;
      x = nx; y = ny;
      vx = mvx; vy = mvy; // ドラッグ中の移動速度（破片の向き・しきい値に利用）
      samples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (samples.length > 5) samples.shift();
      draw();
      // 掴んだまま速く動かしたとき、当たった文字を砕く
      if ((mvx * mvx + mvy * mvy) > 36) shatter(x + size / 2, y + size / 2);
    }, { passive: true });
    window.addEventListener('pointerup', function () {
      if (!dragging) return;
      dragging = false;
      if (samples.length >= 2) {
        var a = samples[0], b = samples[samples.length - 1], dt = (b.t - a.t) || 16, cap = 42;
        vx = Math.max(-cap, Math.min(cap, (b.x - a.x) / dt * 16));
        vy = Math.max(-cap, Math.min(cap, (b.y - a.y) / dt * 16));
      }
      start();
    });
    window.addEventListener('resize', function () {
      x = Math.min(x, W() - size); y = Math.min(y, H() - size); draw(); start();
    });

    draw(); start();
  };

  var ptActive = false;
  var enablePortuguese = function () {
    if (ptActive) return;
    ptActive = true;
    applyPortuguese();
    playWave();
    showPalms();
    showLabel();
    spawnBall();
  };

  // 鳥クリック → 確認モーダル（毎回日本語。永続化しないため再読込で日本語へ戻る）
  var birds = document.querySelectorAll('.sunset-bird');
  if (birds.length) {
    var overlay = document.createElement('div');
    overlay.className = 'egg-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<div class="egg-modal__card">' +
        '<div class="egg-modal__ico" aria-hidden="true">🐦</div>' +
        '<p class="egg-modal__msg">画面に隠し要素を表示させますか？</p>' +
        '<div class="egg-modal__btns">' +
          '<button type="button" class="egg-modal__btn egg-modal__btn--yes">もちろん！</button>' +
          '<button type="button" class="egg-modal__btn egg-modal__btn--no">いや、結構です。</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    var card = overlay.querySelector('.egg-modal__card');
    var closeModal = function () { overlay.classList.remove('show'); };

    // 通常（日本語）：はい／いいえの2択
    var defaultHTML =
      '<div class="egg-modal__ico" aria-hidden="true">🐦</div>' +
      '<p class="egg-modal__msg">画面に隠し要素を表示させますか？</p>' +
      '<div class="egg-modal__btns">' +
        '<button type="button" class="egg-modal__btn egg-modal__btn--yes">もちろん！</button>' +
        '<button type="button" class="egg-modal__btn egg-modal__btn--no">いや、結構です。</button>' +
      '</div>';

    var bindDefault = function () {
      card.innerHTML = defaultHTML;
      card.querySelector('.egg-modal__btn--yes').addEventListener('click', function () { closeModal(); enablePortuguese(); });
      card.querySelector('.egg-modal__btn--no').addEventListener('click', closeModal);
    };

    // ポルトガル語版：戻れないメッセージ
    var bindPtMessage = function () {
      card.innerHTML =
        '<div class="egg-modal__ico" aria-hidden="true">🐦</div>' +
        '<p class="egg-modal__msg">日本語に戻せると思った？<br>一緒にポルトガル語を取得しようよ！<br><span style="font-size:.85em;color:#003953;font-weight:700">by Leandro Azuma</span></p>' +
        '<div class="egg-modal__btns">' +
          '<button type="button" class="egg-modal__btn egg-modal__btn--no">Fechar</button>' +
        '</div>';
      card.querySelector('.egg-modal__btn--no').addEventListener('click', closeModal);
    };

    bindDefault();
    birds.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        if (ptActive) bindPtMessage(); else bindDefault();
        overlay.classList.add('show');
      });
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  }

  /* ---- ヘッダー縮小 ---- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('header-sm', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- ハンバーガーメニュー ---- */
  var navBtn = document.querySelector('.gnav__btn');
  if (navBtn) {
    navBtn.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
    document.querySelectorAll('.gnav__list a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    });
  }

  /* ---- スクロールリビール（フェード／装飾ライン） ---- */
  var targets = document.querySelectorAll('.reveal, .deco-line');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { obs.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---- 今後の方針：タブ切替（クリックで表示） ---- */
  var tabs = document.querySelector('.tabs');
  if (tabs) {
    var tabBtns = tabs.querySelectorAll('.tabs__tab');
    var panels  = tabs.querySelectorAll('.tabs__panel');
    var activate = function (idx) {
      tabBtns.forEach(function (b, n) {
        var on = n === idx;
        b.classList.toggle('on', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (p, n) { p.classList.toggle('on', n === idx); });
    };
    tabBtns.forEach(function (b, n) {
      b.addEventListener('click', function () { activate(n); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { activate(Math.min(tabBtns.length - 1, n + 1)); tabBtns[Math.min(tabBtns.length - 1, n + 1)].focus(); }
        if (e.key === 'ArrowLeft')  { activate(Math.max(0, n - 1)); tabBtns[Math.max(0, n - 1)].focus(); }
      });
    });
    activate(0);
  }

  /* ---- スムーススクロール（ページ内 #アンカー） ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ============================================================
     意見箱フォーム送信
     --------------------------------------------------------------
     ▼ Google Form 連携手順（GitHub Pages は静的のため）:
       1. Google フォームを作成（お名前・カテゴリ・メッセージ・連絡先 の項目）
       2. 「事前入力したURLを取得」で各項目の entry.xxxxx ID を調べる
       3. 下の GOOGLE_FORM_CONFIG に formAction（.../formResponse）と各 entry ID を貼る
       4. enabled を true にすると実送信、false の間は画面に成功表示のみ
     ※ 代替: <form action="https://formspree.io/f/xxxx" method="POST"> に変える方法もあり
     ============================================================ */
  var GOOGLE_FORM_CONFIG = {
    enabled: true, // ← Google Form 連携済み
    formAction: 'https://docs.google.com/forms/d/e/1FAIpQLScFGw8aupi_EWyur0o9CVeUmQajSpnVOWlw2i-kmn5EcDq3OQ/formResponse',
    fields: {
      name:    'entry.678374609',   // お名前
      cat:     'entry.1411994777',  // カテゴリ
      msg:     'entry.109373719',   // メッセージ
      contact: 'entry.117928218'    // 連絡先
    }
  };

  var form = document.getElementById('fb-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('[name="msg"]');
      if (!msg || !msg.value.trim()) { msg && msg.focus(); return; }

      var showSuccess = function () {
        form.style.transition = 'opacity .35s';
        form.style.opacity = '0';
        setTimeout(function () {
          form.style.display = 'none';
          var ok = document.getElementById('form-success');
          if (ok) ok.classList.add('show');
        }, 350);
      };

      if (GOOGLE_FORM_CONFIG.enabled) {
        var fd = new FormData();
        var f = GOOGLE_FORM_CONFIG.fields;
        var get = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value : ''; };
        if (f.name) fd.append(f.name, get('name'));
        if (f.cat) fd.append(f.cat, get('cat'));
        if (f.msg) fd.append(f.msg, get('msg'));
        if (f.contact) fd.append(f.contact, get('contact'));
        fetch(GOOGLE_FORM_CONFIG.formAction, { method: 'POST', mode: 'no-cors', body: fd }).finally(showSuccess);
      } else {
        showSuccess();
      }
    });
  }

})();

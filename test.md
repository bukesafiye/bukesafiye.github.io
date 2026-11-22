---
layout: default
title: Test rehberi / Testing guide
description: MiroGames oyunlarını iPhone (TestFlight) ve Android'de (Google Play kapalı test) test etmek için adımlar — How to test MiroGames games on iPhone (TestFlight) and Android (Google Play closed testing).
permalink: /test/
back: /
back_tr: Ana sayfa
back_en: Home
---
<h1><span class="tr">Test rehberi</span><span class="en">Testing guide</span></h1>
<p><span class="tr">Oyunlarımızı mağazaya çıkmadan önce dene ve bize yardım et. Telefonunu seç, adımları sırayla izle.</span><span class="en">Try our games before they reach the stores and help us make them better. Pick your phone and follow the steps.</span></p>

<div class="test-tabs" role="tablist" aria-label="Platform">
  <button type="button" role="tab" id="tab-ios" aria-controls="panel-ios" aria-selected="true" data-tab="ios">
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.7.9-.8 0-2-.9-3.2-.9-1.7 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8s2.1-1.2 2.9-2.4c.9-1.4 1.3-2.7 1.3-2.8 0 0-2.4-1-2.4-3.6zM14 5.3c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z"/></svg>
    iOS
  </button>
  <button type="button" role="tab" id="tab-android" aria-controls="panel-android" aria-selected="false" data-tab="android" tabindex="-1">
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.6 9.5l1.7-3a.4.4 0 0 0-.7-.4l-1.8 3A10.6 10.6 0 0 0 12 8.2c-1.7 0-3.3.3-4.8.9l-1.8-3a.4.4 0 0 0-.7.4l1.7 3A9.6 9.6 0 0 0 1.5 17h21a9.6 9.6 0 0 0-4.9-7.5zM7 14.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    Android
  </button>
</div>

{%- comment -%} Featured tests: per platform, a left and a right column. iOS: every TestFlight game in beta order, 1st on the right, 2nd on the left, then alternating; wide screens show them all in the page gutters, narrower screens only the first three above the tabs. {%- endcomment %}
<aside class="test-promos" aria-label="Öne çıkan testler / Featured tests">
  <div class="promo-set" data-for="android">
    {%- assign and_pool = site.data.games | concat: site.data.apps | concat: site.data.test_only | sort: "beta", "last" %}
    <div class="promo-col promo-left">
      <p class="promo-col-title"><span class="tr">Testte</span><span class="en">In testing</span></p>
      {%- assign n = 0 %}
      {%- for g in and_pool %}{% if g.play_test %}{% assign n = n | plus: 1 %}{% if n > 2 %}{% include test-promo.html g=g platform="android" extra=true %}{% else %}{% include test-promo.html g=g platform="android" %}{% endif %}{% endif %}{% endfor %}
    </div>
    <div class="promo-col promo-right">
      <p class="promo-col-title"><span class="tr">Google Play'de yayında</span><span class="en">Live on Google Play</span></p>
      {%- assign n = 0 %}
      {%- for g in and_pool %}{% if g.google_play %}{% assign n = n | plus: 1 %}{% if n > 2 %}{% include test-promo.html g=g platform="android" live=true extra=true %}{% else %}{% include test-promo.html g=g platform="android" live=true %}{% endif %}{% endif %}{% endfor %}
    </div>
  </div>
  <div class="promo-set" data-for="ios">
    {%- assign tf = site.data.games | where_exp: "g", "g.testflight" | sort: "beta" %}
    <div class="promo-col promo-left">
      {%- for g in tf %}{% assign m = forloop.index | modulo: 2 %}{% if m == 0 %}{% if forloop.index > 3 %}{% include test-promo.html g=g platform="ios" extra=true %}{% else %}{% include test-promo.html g=g platform="ios" %}{% endif %}{% endif %}{% endfor %}
    </div>
    <div class="promo-col promo-right">
      {%- for g in tf %}{% assign m = forloop.index | modulo: 2 %}{% if m == 1 %}{% if forloop.index > 3 %}{% include test-promo.html g=g platform="ios" extra=true %}{% else %}{% include test-promo.html g=g platform="ios" %}{% endif %}{% endif %}{% endfor %}
    </div>
  </div>
</aside>

<section class="test-panel" role="tabpanel" id="panel-ios" aria-labelledby="tab-ios">
  <div class="steps-notice" id="notice-ios" role="status" hidden>
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v6M12 16.5v.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
    <p><b><span class="tr">Önce aşağıdaki adımları oku.</span><span class="en">Read the steps below first.</span></b> <span class="tr">Adımları sırayla izle; <strong data-notice-game></strong> için katılma linki adımların altındaki listede işaretli.</span><span class="en">Follow them in order; the join link for <strong data-notice-game></strong> is marked in the list under the steps.</span></p>
  </div>
  <ol class="test-steps" id="steps-ios">
    <li>
      <h3><span class="tr">TestFlight'ı kur</span><span class="en">Install TestFlight</span></h3>
      <p><span class="tr">iPhone ya da iPad'inde App Store'dan Apple'ın ücretsiz <b>TestFlight</b> uygulamasını indir.</span><span class="en">On your iPhone or iPad, get Apple's free <b>TestFlight</b> app from the App Store.</span></p>
      <a class="btn" href="https://apps.apple.com/app/testflight/id899247664" rel="noopener"><span class="tr">TestFlight'ı indir</span><span class="en">Get TestFlight</span></a>
    </li>
    <li>
      <h3><span class="tr">Oyunun davet linkini aç</span><span class="en">Open the game's invite link</span></h3>
      <p><span class="tr">Aşağıdaki listeden test etmek istediğin oyunun <b>TestFlight'ta katıl</b> düğmesine dokun. Link TestFlight'ı açar.</span><span class="en">In the list below, tap <b>Join on TestFlight</b> next to the game you want to test. The link opens TestFlight.</span></p>
    </li>
    <li>
      <h3><span class="tr">Kabul Et, sonra Yükle</span><span class="en">Tap Accept, then Install</span></h3>
      <p><span class="tr">TestFlight'ta <b>Kabul Et</b>'e, ardından <b>Yükle</b>'ye dokun. Oyun ana ekranına turuncu bir noktayla gelir. Hesap açman ya da e-posta vermen gerekmez.</span><span class="en">In TestFlight, tap <b>Accept</b> and then <b>Install</b>. The game lands on your home screen with an orange dot. No account or email needed.</span></p>
    </li>
    <li>
      <h3><span class="tr">Oyna ve geri bildirim gönder</span><span class="en">Play and send feedback</span></h3>
      <p><span class="tr">Bir hata görürsen ekran görüntüsü al: TestFlight onu doğrudan bize göndermeyi önerir. TestFlight uygulamasındaki <b>Geri Bildirim Gönder</b> ile yazılı not da bırakabilirsin.</span><span class="en">Spot a bug? Take a screenshot: TestFlight offers to send it straight to us. You can also leave a note with <b>Send Beta Feedback</b> in the TestFlight app.</span></p>
    </li>
    <li>
      <h3><span class="tr">Güncellemeleri al</span><span class="en">Keep it updated</span></h3>
      <p><span class="tr">Test sürümleri 90 gün geçerlidir. Yeni sürüm çıkınca TestFlight haber verir; <b>Güncelle</b>'ye dokunman yeter.</span><span class="en">Test builds last 90 days. TestFlight tells you when a new one is out; just tap <b>Update</b>.</span></p>
    </li>
  </ol>

  <h2><span class="tr">TestFlight'taki oyunlar</span><span class="en">Games on TestFlight</span></h2>
  <ul class="dev-games beta-games">
    {%- assign beta_games = site.data.games | where_exp: "g", "g.testflight" | sort: "beta" %}
    {%- for g in beta_games %}
    {%- assign url = '/Store/' | append: g.slug | append: '/' %}
    <li style="--c: {{ g.color }}" data-slug="{{ g.slug }}">
      <a class="dev-game" href="{{ url | relative_url }}"><img src="{{ g.icon | relative_url }}" alt="" width="40" height="40" loading="lazy">{% if g.name.tr == g.name.en %}{{ g.name.tr }}{% else %}<span class="tr">{{ g.name.tr }}</span><span class="en">{{ g.name.en }}</span>{% endif %}</a>
      <a class="btn" href="{{ g.testflight }}" rel="noopener"><span class="tr">TestFlight'ta katıl</span><span class="en">Join on TestFlight</span></a>
    </li>
    {%- endfor %}
  </ul>
</section>

<section class="test-panel" role="tabpanel" id="panel-android" aria-labelledby="tab-android" hidden>
  <div class="steps-notice" id="notice-android" role="status" hidden>
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v6M12 16.5v.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
    <p><b><span class="tr">Önce aşağıdaki adımları oku.</span><span class="en">Read the steps below first.</span></b> <span class="tr">Adımları sırayla izle; <strong data-notice-game></strong> için katılma linki adımların altındaki listede işaretli.</span><span class="en">Follow them in order; the join link for <strong data-notice-game></strong> is marked in the list under the steps.</span></p>
  </div>
  <ol class="test-steps" id="steps-android">
    <li class="has-shot">
      <div class="step-text">
        <h3><span class="tr">Gmail adresini bize gönder</span><span class="en">Send us your Gmail address</span></h3>
        <p><span class="tr">Google Play kapalı testine yalnızca listeye eklenen hesaplar girebilir. Telefonunda Play Store'da kullandığın <b>Gmail adresini</b> bize yaz; seni test listesine ekleyelim.</span><span class="en">Only accounts on our list can join a Google Play closed test. Send us the <b>Gmail address</b> you use in the Play Store on your phone and we'll add you to the testers list.</span></p>
        <a class="btn" href="mailto:bukesafiye@gmail.com?subject=Android%20test"><span class="tr">E-posta gönder</span><span class="en">Send email</span></a>
      </div>
      {% include test/android-1.svg %}
    </li>
    <li class="has-shot">
      <div class="step-text">
        <h3><span class="tr">Test linkini aç ve test kullanıcısı ol</span><span class="en">Open the test link and become a tester</span></h3>
        <p><span class="tr">Mail adresini eklememizden sonra sayfanın en altında linkler var, oraya git. Listeye eklendiğini haber verdiğimizde, aşağıdan oyunun <b>Teste katıl</b> düğmesine dokun. Açılan sayfada aynı Gmail hesabıyla oturum açık olmalı; <b>Test kullanıcısı ol</b>'a dokun.</span><span class="en">After we add your email, the links are at the very bottom of this page; go there. Once we tell you you're on the list, tap the game's <b>Join the test</b> button below. Make sure you're signed in with the same Gmail account, then tap <b>Become a tester</b>.</span></p>
      </div>
      <img class="shot shot-photo" src="{{ '/assets/img/test-android-optin.webp' | relative_url }}" width="760" height="718" alt="Google Play: Become a tester" loading="lazy">
    </li>
    <li class="has-shot">
      <div class="step-text">
        <h3><span class="tr">Google Play'den yükle</span><span class="en">Install from Google Play</span></h3>
        <p><span class="tr">Aynı sayfadaki <b>Google Play'den indir</b> linkine dokun ve oyunu her zamanki gibi yükle. Oyunun sayfasında "test sürümü" yazar. Mağaza sayfası birkaç dakika içinde açılmazsa biraz bekleyip tekrar dene.</span><span class="en">Tap <b>Download it on Google Play</b> on the same page and install the game as usual. Its store page will say you're a tester. If the page doesn't open yet, wait a few minutes and try again.</span></p>
      </div>
      <div class="shot-stack">
        <img class="shot-photo" src="{{ '/assets/img/test-android-download.webp' | relative_url }}" width="760" height="609" alt="Google Play: download it on Google Play" loading="lazy">
        <img class="shot-photo" src="{{ '/assets/img/test-android-install.webp' | relative_url }}" width="600" height="555" alt="Google Play: Install" loading="lazy">
      </div>
    </li>
    <li class="has-shot">
      <div class="step-text">
        <h3><span class="tr">Geri bildirim gönder</span><span class="en">Send feedback</span></h3>
        <p><span class="tr">Oyunun Play Store sayfasındaki <b>Geliştiriciye özel geri bildirim</b> alanına yazabilir ya da hataları ekran görüntüsüyle e-postayla gönderebilirsin. Güncellemeler Play Store üzerinden kendiliğinden gelir.</span><span class="en">Write in the <b>Private feedback to the developer</b> box on the game's Play Store page, or email us bugs with a screenshot. Updates arrive through the Play Store as usual.</span></p>
      </div>
      {% include test/android-5.svg %}
    </li>
  </ol>

  <h2><span class="tr">Testteki oyunlar</span><span class="en">Games in testing</span></h2>
  <p><span class="tr">Henüz herkese açık değil; yukarıdaki adımlarla teste katılabilirsin.</span><span class="en">Not public yet; join the test with the steps above.</span></p>
  <ul class="dev-games beta-games">
    {%- assign test_pool = site.data.games | concat: site.data.apps | concat: site.data.test_only %}
    {%- assign test_games = test_pool | where_exp: "g", "g.play_test" | sort: "beta", "last" %}
    {%- for g in test_games %}
    {%- assign url = '/Store/' | append: g.slug | append: '/' %}
    <li style="--c: {{ g.color }}" data-slug="{{ g.slug }}">
      {% if g.page == false %}<span class="dev-game"><img src="{{ g.icon | relative_url }}" alt="" width="40" height="40" loading="lazy">{% if g.name.tr == g.name.en %}{{ g.name.tr }}{% else %}<span class="tr">{{ g.name.tr }}</span><span class="en">{{ g.name.en }}</span>{% endif %}</span>{% else %}<a class="dev-game" href="{{ url | relative_url }}"><img src="{{ g.icon | relative_url }}" alt="" width="40" height="40" loading="lazy">{% if g.name.tr == g.name.en %}{{ g.name.tr }}{% else %}<span class="tr">{{ g.name.tr }}</span><span class="en">{{ g.name.en }}</span>{% endif %}</a>{% endif %}
      <a class="btn" href="https://play.google.com/apps/testing/{{ g.play_test }}" rel="noopener"><span class="tr">Teste katıl</span><span class="en">Join the test</span></a>
    </li>
    {%- endfor %}
  </ul>

  <h2><span class="tr">Google Play'de yayında</span><span class="en">Live on Google Play</span></h2>
  <p><span class="tr">Bu oyunlar herkese açık; test listesine girmeden doğrudan indirebilirsin.</span><span class="en">These games are public; download them straight away, no tester list needed.</span></p>
  <ul class="dev-games beta-games">
    {%- assign live_games = site.data.games | where_exp: "g", "g.google_play" | sort: "beta" %}
    {%- for g in live_games %}
    {%- assign url = '/Store/' | append: g.slug | append: '/' %}
    <li style="--c: {{ g.color }}" data-slug="{{ g.slug }}">
      <a class="dev-game" href="{{ url | relative_url }}"><img src="{{ g.icon | relative_url }}" alt="" width="40" height="40" loading="lazy">{% if g.name.tr == g.name.en %}{{ g.name.tr }}{% else %}<span class="tr">{{ g.name.tr }}</span><span class="en">{{ g.name.en }}</span>{% endif %}</a>
      <a class="btn" href="{{ g.google_play }}" rel="noopener"><span class="tr">Google Play'de aç</span><span class="en">Open on Google Play</span></a>
    </li>
    {%- endfor %}
  </ul>
</section>

<p class="contact-line"><span class="tr">Takıldığın bir adım mı var? Yaz:</span><span class="en">Stuck on a step? Write to us:</span> <a href="mailto:bukesafiye@gmail.com">bukesafiye@gmail.com</a></p>

{% include ad.html inline=true %}

<script>
  (function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.test-tabs [role="tab"]'));
    function show(name, focus) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === name;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        if (on && focus) t.focus();
      });
      document.documentElement.setAttribute('data-platform', name);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        var name = t.getAttribute('data-tab');
        show(name);
        try { history.replaceState(null, '', '#' + name); } catch (e) {}
      });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        show(tabs[(i + d + tabs.length) % tabs.length].getAttribute('data-tab'), true);
      });
    });
    // Open the tab from the URL (#ios / #android), else guess from the device.
    var start = location.hash.slice(1);
    if (start !== 'ios' && start !== 'android') start = /android/i.test(navigator.userAgent) ? 'android' : 'ios';
    show(start);
    // Card "Join the test" buttons: read the steps first. Scroll to them and mark the game in the list below the steps.
    document.querySelectorAll('[data-goto-steps]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var platform = b.getAttribute('data-goto-steps'), steps = document.getElementById('steps-' + platform);
        show(platform);
        document.querySelectorAll('.dev-games li.is-picked').forEach(function (li) { li.classList.remove('is-picked'); });
        var row = document.querySelector('#panel-' + platform + ' .dev-games li[data-slug="' + b.getAttribute('data-slug') + '"]');
        if (row) row.classList.add('is-picked');
        var notice = document.getElementById('notice-' + platform), name = b.getAttribute('data-name-' + (document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'tr'));
        notice.querySelectorAll('[data-notice-game]').forEach(function (el) { el.textContent = name; });
        notice.hidden = false;
        steps.classList.remove('flash'); void steps.offsetWidth; steps.classList.add('flash');
        notice.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    // Gutter columns are absolutely positioned: keep the footer below the tallest one.
    var doc = document.querySelector('article.doc');
    function fit() {
      if (!doc) return;
      doc.style.minHeight = '';
      var bottom = 0;
      document.querySelectorAll('.promo-col').forEach(function (c) {
        if (getComputedStyle(c).position === 'absolute' && c.offsetParent) bottom = Math.max(bottom, c.getBoundingClientRect().bottom + scrollY);
      });
      var top = doc.getBoundingClientRect().top + scrollY;
      if (bottom > top + doc.offsetHeight) doc.style.minHeight = (bottom - top + 40) + 'px';
    }
    window.addEventListener('load', fit);
    window.addEventListener('resize', fit);
    tabs.forEach(function (t) { t.addEventListener('click', fit); });
    fit();
  })();
</script>

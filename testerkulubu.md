---
layout: default
title: Tester Kulübü
description: Google Play'in 12 test kullanıcısı / 14 gün kuralını ücretsiz geç. Birbirinin uygulamasını test eden geliştiriciler ve oyuncular topluluğu. — Pass Google Play's 12 testers / 14 days rule for free, with a community that tests each other's apps.
permalink: /testerkulubu/
back: /
back_tr: Ana sayfa
back_en: Home
# Telegram grubu açılınca linki buraya yaz; boşken katıl düğmesi gösterilmez.
telegram: "https://t.me/testerkulubu"
icon: /assets/img/testerkulubu-icon-128.png
---
{%- comment -%}
Tester Kulübü: MiroGames'ten ayrı bir ürün (karşılıklı uygulama testi). Veritabanı Mahalle Patronu'nun Supabase
projesinde tk_ tabloları olarak durur (mahallepatronu/supabase/migrations/20261123500001_tk_tester_kulubu.sql).
Buradaki kurallar (ilk 3 uygulama kredisiz, 4 hoş geldin kredisi, 14 doğru yoklama günü, 2 gün boşluk payı, rozet eşikleri 3/10/25)
o dosyadaki tk_ayar / tk_rozet ile aynı olmalı.
{%- endcomment %}
<style>
  .tk-hero { text-align: center; padding: 8px 0 8px; }
  .tk-logo { display: block; margin: 0 auto 16px; border-radius: 24px; box-shadow: 0 10px 40px var(--glow); }
  .tk-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; background: var(--accent-soft); color: var(--accent); font: 600 13px/1 var(--body); letter-spacing: .02em; }
  .tk-hero h1 { font-size: clamp(36px, 7vw, 60px); margin: 18px 0 10px; line-height: 1.05; }
  .tk-hero .tk-lead { font-size: 19px; color: var(--muted); max-width: 640px; margin: 0 auto 26px; }
  .tk-cta { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
  .tk-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin: 22px 0 8px; }
  .tk-box { padding: 22px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--line); }
  .tk-box h3 { margin: 0 0 8px; font-size: 19px; }
  .tk-box p { margin: 0; color: var(--muted); }
  .tk-num { display: inline-grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; margin-bottom: 12px; background: var(--accent-soft); color: var(--accent); font: 700 16px/1 var(--display); }
  .tk-vs { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; margin: 22px 0 8px; }
  .tk-vs .tk-box.ours { border-color: color-mix(in srgb, var(--accent) 55%, transparent); box-shadow: 0 0 40px var(--glow); }
  .tk-price { font: 700 34px/1.1 var(--display); margin: 6px 0 10px; }
  .tk-alt { margin: 0 0 14px; color: var(--text); }
  .tk-oyuncu { display: flex; gap: 16px; align-items: flex-start; margin-top: 16px; background: color-mix(in srgb, var(--accent) 7%, var(--surface)); }
  .tk-oyuncu-ikon { font-size: 30px; line-height: 1; }
  .tk-vs ul { margin: 0; padding: 0; list-style: none; color: var(--muted); }
  .tk-vs li { margin: 8px 0; padding-left: 28px; position: relative; }
  .tk-vs li::before { position: absolute; left: 0; top: 1px; width: 20px; height: 20px; border-radius: 6px; display: grid; place-items: center; font: 700 12px/1 var(--body); }
  .tk-vs .paid li::before { content: "✕"; color: #ff7a7a; background: rgba(255, 90, 90, .12); }
  .tk-vs .ours li::before { content: "✓"; color: var(--accent); background: var(--accent-soft); }
  .tk-vs .paid { opacity: .78; }
  .tk-vs .paid h3 { color: var(--muted); }
  .tk-old { display: inline-block; position: relative; color: var(--muted); text-decoration: none; }
  .tk-old::after { content: ""; position: absolute; left: -6px; right: -6px; top: 52%; height: 3px; border-radius: 2px; background: #ff5a5a; transform: rotate(-8deg); }
  .tk-per { font: 500 14px/1.3 var(--body); color: var(--muted); margin-left: 8px; }
  .tk-free { color: var(--accent); }
  .tk-rozet { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0 8px; padding: 0; list-style: none; }
  .tk-rozet li { padding: 10px 16px; border-radius: 12px; background: var(--surface); border: 1px solid var(--line); }
  .tk-rozet b { display: block; font-family: var(--display); }
  .tk-rozet small { color: var(--muted); }
  .tk-section { margin-top: 56px; }
  .tk-faq details { padding: 16px 18px; border-radius: 14px; background: var(--surface); border: 1px solid var(--line); margin: 10px 0; }
  .tk-faq summary { cursor: pointer; font-weight: 600; }
  .tk-faq details p { margin: 10px 0 0; color: var(--muted); }
  .tk-grup { margin: 22px 0 10px; font-size: 18px; }
  .tk-kartlar { display: grid; gap: 10px; }
  .tk-kart { display: flex; gap: 14px; align-items: center; justify-content: space-between; padding: 16px 18px; border-radius: 14px; background: var(--surface); border: 1px solid var(--line); margin-bottom: 10px; }
  .tk-kart p { margin: 4px 0 2px; color: var(--muted); font-size: 14px; }
  .tk-kart small { color: var(--muted); }
  .tk-kart .btn { flex-shrink: 0; }
  .tk-uyg { display: block; }
  .tk-mailler { margin: 10px 0 4px !important; color: var(--text) !important; }
  .tk-mail-kod { display: block; padding: 10px 12px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); font-size: 13px; word-break: break-all; margin-bottom: 8px; }
  .tk-form-ac { display: none; }
  #basvur.tk-kapali .tk-form-ac { display: inline-flex; }
  #basvur.tk-kapali > form, #basvur.tk-kapali > p.muted { display: none; }
  .tk-form label { display: grid; gap: 6px; margin: 0 0 14px; font-weight: 600; }
  .tk-form label.tk-secim { display: inline-flex; align-items: center; gap: 8px; margin-right: 18px; font-weight: 500; }
  .tk-form input:not([type=checkbox]), .tk-form textarea { width: 100%; padding: 11px 13px; border-radius: 10px; border: 1px solid var(--line); background: var(--bg); color: var(--text); font: 400 15px/1.4 var(--body); }
  .tk-form input:focus, .tk-form textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
  .tk-form fieldset { border: 1px solid var(--line); border-radius: 12px; padding: 14px 16px 6px; margin: 0 0 16px; }
  .tk-form legend { padding: 0 6px; font-weight: 700; }
  .tk-ipucu { font-size: 14px; margin: 0 0 12px; }
  .tk-soru { display: grid; grid-template-columns: 2fr 1fr; gap: 8px; margin-bottom: 8px; }
  .tk-mesaj { margin: 14px 0; padding: 12px 14px; border-radius: 12px; background: var(--surface); border: 1px solid var(--line); }
  .tk-mesaj.tamam { border-color: color-mix(in srgb, var(--accent) 60%, transparent); }
  .tk-mesaj.hata { border-color: rgba(255, 90, 90, .6); }
  .tk-hesap-ust { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; }
  .tk-yoklama { display: grid; gap: 8px; margin-top: 10px; }
  .tk-yoklama p { color: var(--text) !important; }
  .tk-form [hidden], .tk-box[hidden] { display: none !important; }
  #tkGiris { margin-top: 14px; }
  #tkSifre { margin-top: 14px; }
  .tk-takas { display: block; margin: -4px 0 14px; }
  .tk-link-dugme { margin-top: 10px; padding: 0; border: 0; background: none; color: var(--accent); font: 500 14px/1.4 var(--body); cursor: pointer; text-decoration: underline; }
  @media (max-width: 520px) { .tk-kart { flex-direction: column; align-items: stretch; } .tk-soru { grid-template-columns: 1fr; } }
  @media (max-width: 640px) { .tk-vs { grid-template-columns: 1fr; } .tk-hero .tk-lead { font-size: 17px; } }
</style>

<section class="tk-hero">
  <img class="tk-logo" src="{{ '/assets/img/testerkulubu-icon-128.webp' | relative_url }}" alt="" width="96" height="96">
  <span class="tk-badge">🧪 <span class="tr">Ücretsiz · Türkiye'den başlıyoruz</span><span class="en">Free · Starting in Türkiye</span></span>
  <h1>Tester Kulübü</h1>
  <p class="tk-lead">
    <span class="tr">Google Play'in <b>12 test kullanıcısı / 14 gün</b> kuralı için para ödeme. Sen başkalarının uygulamasını test et, onlar seninkini test etsin. Üstüne gerçek geri bildirim de al.</span>
    <span class="en">Don't pay to clear Google Play's <b>12 testers / 14 days</b> rule. Test other people's apps and they'll test yours, with real feedback on top.</span>
  </p>
  <div class="tk-cta">
    {%- if page.telegram != "" %}
    <a class="btn primary" href="{{ page.telegram }}" rel="noopener"><span class="tr">Telegram'da katıl</span><span class="en">Join on Telegram</span></a>
    {%- endif %}
    <a class="btn" href="#uygulamalar"><span class="tr">Test et</span><span class="en">Test apps</span></a>
    <a class="btn" href="#basvur"><span class="tr">Uygulamanı ekle</span><span class="en">Add your app</span></a>
    <a class="btn" href="#hesabim"><span class="tr">Testçi listem</span><span class="en">My tester list</span></a>
  </div>
</section>

<section class="tk-section">
  <h2><span class="tr">Takasla ücretsiz</span><span class="en">Free, by swapping</span></h2>
  <div class="tk-vs">
    <div class="tk-box paid">
      <h3><span class="tr">Ücretli test servisleri</span><span class="en">Paid testing services</span></h3>
      <div class="tk-price"><s class="tk-old" aria-label="15–35 $, ücretli">15–35 $</s><span class="tk-per"><span class="tr">/ uygulama başına</span><span class="en">/ per app</span></span></div>
      <ul>
        <li><span class="tr">Her uygulama için yeniden ödeme</span><span class="en">Pay again for every app</span></li>
        <li><span class="tr">Test kullanıcılarının kim olduğu belirsiz</span><span class="en">Unclear who the testers are</span></li>
        <li><span class="tr">Daha çok test kullanıcısı = daha pahalı paket</span><span class="en">More testers = a pricier plan</span></li>
      </ul>
    </div>
    <div class="tk-box ours">
      <h3>Tester Kulübü</h3>
      <div class="tk-price tk-free"><span class="tr">Gel, tester ol!</span><span class="en">Come be a tester!</span></div>
      <p class="tk-alt"><span class="tr">Sen test ettikçe insanlar da senin uygulamanı test edecek. Para yok, sadece takas.</span><span class="en">The more you test, the more people test your app. No money, just a swap.</span></p>
      <ul>
        <li><span class="tr">Test ettikçe kredi kazan, krediyle test kullanıcısı al</span><span class="en">Earn credits by testing, spend them on testers</span></li>
      </ul>
    </div>
  </div>
  <div class="tk-box tk-oyuncu">
    <span class="tk-oyuncu-ikon" aria-hidden="true">🎮</span>
    <div>
      <h3><span class="tr">Uygulaman yok mu? Sorun değil!</span><span class="en">No app of your own? No problem!</span></h3>
      <p><span class="tr">Sadece yeni oyunları ve uygulamaları herkesten önce denemek istiyorsan da kapımız açık. Gel, istediğini test et; düşüncelerin geliştiricilere ilham olsun. Topladığın kredilerle rozet kazanır, istersen bir geliştiriciye hediye edersin. 💚</span><span class="en">If you just want to try new games and apps before anyone else, you're welcome too. Come test whatever you like and let your thoughts inspire the developers. Your credits earn you badges, or you can gift them to a developer. 💚</span></p>
    </div>
  </div>
</section>

<section class="tk-section" id="nasil">
  <h2><span class="tr">Nasıl çalışır?</span><span class="en">How it works</span></h2>
  <div class="tk-grid">
    <div class="tk-box">
      <span class="tk-num">1</span>
      <h3><span class="tr">Katıl</span><span class="en">Join</span></h3>
      <p><span class="tr">Mail adresinle kaydol. Hoş geldin hediyesi olarak <b>4 kredi</b> al.</span><span class="en">Sign up with your email address and get <b>4 credits</b> to start.</span></p>
    </div>
    <div class="tk-box">
      <span class="tk-num">2</span>
      <h3><span class="tr">Uygulamanı ekle</span><span class="en">Add your app</span></h3>
      <p><span class="tr">Play kapalı test ya da TestFlight linkini ver, uygulamanın içinden cevaplanabilecek 3 kontrol sorusu yaz. Ekip onaylayınca listeye girer. <b>İlk 3 uygulaman için kredi gerekmez;</b> sonrakiler için test ederek kredi kazanırsın. Para hiçbir aşamada yok.</span><span class="en">Share your Play closed-testing or TestFlight link and write 3 questions only someone inside the app can answer. It goes live once we approve it. <b>Your first 3 apps need no credits;</b> for later ones you earn credits by testing. No money involved, ever.</span></p>
    </div>
    <div class="tk-box">
      <span class="tk-num">3</span>
      <h3><span class="tr">Test et</span><span class="en">Test</span></h3>
      <p><span class="tr">Başkalarının uygulamasını kur. Bot her gün bir kontrol sorusu sorar; cevapla, istersen kısa bir yorum bırak.</span><span class="en">Install other people's apps. Every day the bot asks one question; answer it and leave a short comment if you like.</span></p>
    </div>
    <div class="tk-box">
      <span class="tk-num">4</span>
      <h3><span class="tr">Kazan</span><span class="en">Earn</span></h3>
      <p><span class="tr">14 günü tamamladığın her uygulama <b>1 kredi</b> getirir. 4. uygulamandan itibaren 1 kredi = 1 test kullanıcısı.</span><span class="en">Every app you test for 14 days earns <b>1 credit</b>. From your 4th app on, 1 credit = 1 tester.</span></p>
    </div>
  </div>
</section>

<section class="tk-section" id="uygulamalar">
  <h2><span class="tr">Test edilecek uygulamalar</span><span class="en">Apps waiting for testers</span></h2>
  <p class="muted"><span class="tr">Birini seç, teste katıl. Test linki katılınca açılır; her gün tek bir kontrol sorusu cevaplarsın.</span><span class="en">Pick one and join. The test link opens once you join; answer one quick question a day.</span></p>
  <div id="tkKatilSonuc"></div>
  <div id="tkListe"><p class="muted"><span class="tr">Yükleniyor…</span><span class="en">Loading…</span></p></div>
</section>

<section class="tk-section" id="basvur">
  <h2><span class="tr">Uygulamanı ekle</span><span class="en">Add your app</span></h2>
  <p class="muted"><span class="tr">Formu doldur, ekip onaylayınca listeye girer. Mail adresin ve şifren hesabın olur: sonra aynı bilgilerle girip başvuranların mail adreslerini görürsün. İlk 3 uygulaman için kredi gerekmez.</span><span class="en">Fill in the form; it goes live once approved. Your email and password become your account: sign in later to see applicants' email addresses. Your first 3 apps need no credits.</span></p>
  <button type="button" class="btn tk-form-ac" id="tkFormAc"><span class="tr">Formu aç</span><span class="en">Open the form</span></button>
  <form id="tkBasvuru" class="tk-box tk-form" autocomplete="on">
    <label><span class="tr">Uygulamanın adı</span><span class="en">App name</span><input name="ad" required minlength="2" maxlength="48"></label>
    <label><span class="tr">Kısa açıklama (isteğe bağlı)</span><span class="en">Short description (optional)</span><textarea name="aciklama" maxlength="500" rows="2"></textarea></label>
    <fieldset><legend><span class="tr">Platform</span><span class="en">Platform</span></legend>
      <label class="tk-secim"><input type="checkbox" id="tkPlAndroid" checked> 🤖 Android</label>
      <label class="tk-secim"><input type="checkbox" id="tkPlIos"> 🍏 iPhone</label>
      <label class="tk-secim"><input type="checkbox" id="tkPlWeb"> 🌐 Web</label>
    </fieldset>
    <label id="tkLinkAndroid"><span class="tr">Play kapalı test katılım linki</span><span class="en">Play closed-testing opt-in link</span><input name="linkAndroid" type="url" placeholder="https://play.google.com/apps/testing/…"></label>
    <label id="tkLinkWeb"><span class="tr">Tarayıcıda oynanan sürümün adresi</span><span class="en">Browser version URL</span><input name="linkWeb" type="url" placeholder="https://oyunum.vercel.app"></label>
    <label id="tkLinkIos"><span class="tr">TestFlight herkese açık link</span><span class="en">TestFlight public link</span><input name="linkIos" type="url" placeholder="https://testflight.apple.com/join/…"></label>
    <label><span class="tr">Kaç test kullanıcısı istiyorsun? (1–100)</span><span class="en">How many testers? (1–100)</span><input name="istenen" type="number" min="1" max="100" value="12" required></label>
    <fieldset><legend><span class="tr">Kontrol soruları (en az 3)</span><span class="en">Check questions (at least 3)</span></legend>
      <p class="muted tk-ipucu"><span class="tr">Yalnız uygulamayı açan birinin bilebileceği sorular yaz; cevap kısa olsun (tek kelime ya da sayı). Bot her gün test edenlere bunlardan birini sorar.</span><span class="en">Ask things only someone who opened the app would know; keep answers short (one word or a number). Testers get one of these each day.</span></p>
      <div id="tkSorular"></div>
      <button type="button" class="btn" id="tkSoruEkle">+ <span class="tr">Soru ekle</span><span class="en">Add question</span></button>
    </fieldset>
    <fieldset><legend><span class="tr">Hesabın</span><span class="en">Your account</span></legend>
      <label><span class="tr">Mail adresin</span><span class="en">Your email</span><input name="gmail" type="email" required autocomplete="email" placeholder="ornek@mail.com"></label>
      <label><span class="tr">Şifre (en az 6 karakter)</span><span class="en">Password (min. 6 characters)</span><input name="sifre" type="password" required minlength="6" autocomplete="new-password"></label>
      <p class="muted tk-ipucu"><span class="tr">Daha önce başvurduysan aynı mail adresi ve şifreyi yaz. Telegram botunda kayıtlıysan önce botta /websifre ile şifre belirle.</span><span class="en">If you applied before, use the same email and password. If you're in the Telegram bot, set a password there first with /websifre.</span></p>
    </fieldset>
    <button type="submit" class="btn primary"><span class="tr">Başvur</span><span class="en">Apply</span></button>
    <div id="tkBasvuruSonuc"></div>
  </form>
</section>

<section class="tk-section" id="hesabim">
  <h2><span class="tr">Hesabım</span><span class="en">My account</span></h2>
  <div id="tkHesap" class="tk-box"></div>
  <div id="tkGiris" class="tk-box tk-form" hidden>
    <p id="tkGirisNot"></p>
    <form id="tkGirisForm">
      <label><span class="tr">Mail adresin</span><span class="en">Your email</span><input name="gmail" type="email" required autocomplete="email" placeholder="ornek@mail.com"></label>
      <button type="button" class="tk-link-dugme tk-takas" id="tkTakasAc" hidden>🔁 <span class="tr">Ben de uygulamamı test ettirmek istiyorum (takas)</span><span class="en">I want my app tested too (swap)</span></button>
      <label id="tkSifreAlan"><span id="tkSifreEtiket"></span><input name="sifre" type="password" autocomplete="current-password"></label>
      <button type="submit" class="btn primary"><span class="tr">Devam et</span><span class="en">Continue</span></button>
    </form>
    <div id="tkGirisSonuc"></div>
    <button type="button" class="tk-link-dugme" id="tkSifreUnuttum"><span class="tr">Şifre belirle / şifremi unuttum</span><span class="en">Set / forgot password</span></button>
  </div>
  <div id="tkSifre" class="tk-box tk-form" hidden>
    <form id="tkSifreIsteForm">
      <p><span class="tr">Mail adresini yaz; şifreni belirlemen için bir bağlantı gönderelim.</span><span class="en">Enter your email and we'll send you a link to set your password.</span></p>
      <label><span class="tr">Mail adresin</span><span class="en">Your email</span><input name="gmail" type="email" required autocomplete="email"></label>
      <button type="submit" class="btn primary"><span class="tr">Bağlantı gönder</span><span class="en">Send link</span></button>
    </form>
    <form id="tkSifreBelirleForm" hidden>
      <p><b><span class="tr">Yeni şifreni belirle</span><span class="en">Set your new password</span></b></p>
      <label><span class="tr">Şifre (en az 6 karakter)</span><span class="en">Password (min. 6 characters)</span><input name="sifre" type="password" required minlength="6" autocomplete="new-password"></label>
      <button type="submit" class="btn primary"><span class="tr">Kaydet</span><span class="en">Save</span></button>
    </form>
    <div id="tkSifreSonuc"></div>
  </div>
</section>

<script src="{{ '/assets/js/testerkulubu.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>

<section class="tk-section">
  <h2><span class="tr">Rozetler</span><span class="en">Badges</span></h2>
  <p><span class="tr">Tamamladığın her test güven puanını 1 artırır, yarıda bıraktığın her test 2 düşürür. Rozetler bu puana göre verilir.</span><span class="en">Each test you finish adds 1 trust point; each one you abandon takes 2 away. Badges follow your trust score.</span></p>
  <ul class="tk-rozet">
    <li><b>🌱 <span class="tr">Yeni</span><span class="en">New</span></b><small>0–2</small></li>
    <li><b>🥉 <span class="tr">Bronz</span><span class="en">Bronze</span></b><small>3+</small></li>
    <li><b>🥈 <span class="tr">Gümüş</span><span class="en">Silver</span></b><small>10+</small></li>
    <li><b>🥇 <span class="tr">Altın</span><span class="en">Gold</span></b><small>25+</small></li>
  </ul>
</section>

<section class="tk-section tk-faq">
  <h2><span class="tr">Sık sorulanlar</span><span class="en">FAQ</span></h2>
  <details>
    <summary><span class="tr">Geliştirici olmam gerekiyor mu?</span><span class="en">Do I need to be a developer?</span></summary>
    <p><span class="tr">Hayır. Herkes test edebilir. Uygulaman yoksa kazandığın kredilerle rozet toplarsın ya da kredilerini bir geliştiriciye bağışlarsın.</span><span class="en">No, anyone can test. Without an app of your own, your credits build your badge, or you can gift them to a developer.</span></p>
  </details>
  <details>
    <summary><span class="tr">Bir günü kaçırırsam ne olur?</span><span class="en">What if I miss a day?</span></summary>
    <p><span class="tr">Sorun değil: art arda 2 güne kadar boşluk payın var. Daha uzun ara verirsen test bırakılmış sayılır ve güven puanın düşer.</span><span class="en">That's fine: you can skip up to 2 days in a row. A longer break counts as dropping the test and lowers your trust score.</span></p>
  </details>
  <details>
    <summary><span class="tr">Neden mail adresi istiyorsunuz?</span><span class="en">Why do you need my email address?</span></summary>
    <p><span class="tr">Android kapalı testine, geliştiricinin listesine eklenen mail adresleri katılabilir; bu yüzden Android için Google hesabına bağlı adresini yaz. iPhone testlerinde ise yalnız iletişim içindir. Adresini yalnız test ettiğin uygulamanın geliştiricisi görür.</span><span class="en">Only addresses on the developer's list can join an Android closed test, so use the address linked to your Google account. For iPhone tests it's only for contact. Only the developers whose apps you test see your address.</span></p>
  </details>
  <details>
    <summary><span class="tr">iPhone uygulamaları da var mı?</span><span class="en">Are iPhone apps included?</span></summary>
    <p><span class="tr">Evet. iOS'ta 12 kişi kuralı yok, ama TestFlight ile gerçek geri bildirim toplamak için aynı sistem işler.</span><span class="en">Yes. iOS has no 12-tester rule, but the same system collects real feedback through TestFlight.</span></p>
  </details>
  <details>
    <summary><span class="tr">Bu Google'ın kurallarına uygun mu?</span><span class="en">Is this within Google's rules?</span></summary>
    <p><span class="tr">Tester Kulübü sahte etkileşim değil, gerçek kişilerin gerçek testidir: puan ya da yorum istemiyoruz, yükleme karşılığı ödül vermiyoruz. Her gün uygulamayı açıp kullanman bekleniyor.</span><span class="en">Tester Kulübü is real people really testing, not fake engagement: we never ask for ratings or reviews and never reward installs. You're expected to open and use the app every day.</span></p>
  </details>
</section>

<script>
  // "Testçi listem" ile Hesabım'a gidilince uzun "Uygulamanı ekle" formu küçülür; "Uygulamanı ekle" ya da "Formu aç" yeniden açar.
  (function () {
    var b = document.getElementById('basvur');
    if (!b) return;
    function kapat(on) { b.classList.toggle('tk-kapali', on); }
    if (location.hash === '#hesabim') kapat(true);
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href="#hesabim"], a[href="#basvur"]');
      if (a) kapat(a.getAttribute('href') === '#hesabim');
    });
    document.getElementById('tkFormAc').addEventListener('click', function () {
      kapat(false);
      var f = document.getElementById('tkBasvuru');
      if (f && f.elements[0]) f.elements[0].focus();
    });
  })();
</script>

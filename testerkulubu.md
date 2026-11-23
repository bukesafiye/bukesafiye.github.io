---
layout: default
title: Tester Kulübü
description: Google Play'in 12 test kullanıcısı / 14 gün kuralını ücretsiz geç. Birbirinin uygulamasını test eden geliştiriciler ve oyuncular topluluğu. — Pass Google Play's 12 testers / 14 days rule for free, with a community that tests each other's apps.
permalink: /testerkulubu/
back: /
back_tr: Ana sayfa
back_en: Home
# Telegram grubu açılınca linki buraya yaz; boşken katıl düğmesi gösterilmez.
telegram: ""
---
{%- comment -%}
Tester Kulübü: MiroGames'ten ayrı bir ürün (karşılıklı uygulama testi). Veritabanı Mahalle Patronu'nun Supabase
projesinde tk_ tabloları olarak durur (mahallepatronu/supabase/migrations/20261123500001_tk_tester_kulubu.sql).
Buradaki kurallar (ilk 3 uygulama ücretsiz, 4 hoş geldin kredisi, 14 doğru yoklama günü, 2 gün boşluk payı, rozet eşikleri 3/10/25)
o dosyadaki tk_ayar / tk_rozet ile aynı olmalı.
{%- endcomment %}
<style>
  .tk-hero { text-align: center; padding: 8px 0 8px; }
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
  @media (max-width: 640px) { .tk-vs { grid-template-columns: 1fr; } .tk-hero .tk-lead { font-size: 17px; } }
</style>

<section class="tk-hero">
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
    <a class="btn" href="#nasil"><span class="tr">Nasıl çalışır?</span><span class="en">How does it work?</span></a>
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
      <div class="tk-price tk-free"><span class="tr">Ücretsiz</span><span class="en">Free</span><span class="tk-per"><span class="tr">/ test ederek kazan</span><span class="en">/ earn it by testing</span></span></div>
      <ul>
        <li><span class="tr">Test ettikçe kredi kazan, krediyle test kullanıcısı al</span><span class="en">Earn credits by testing, spend them on testers</span></li>
        <li><span class="tr">Her gün kontrol sorusuyla doğrulanan gerçek kullanıcılar</span><span class="en">Real people, checked every day with a quick question</span></li>
        <li><span class="tr">14 günün sonunda Google formuna hazır geri bildirim özeti</span><span class="en">A feedback summary ready for Google's form after 14 days</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="tk-section" id="nasil">
  <h2><span class="tr">Nasıl çalışır?</span><span class="en">How it works</span></h2>
  <div class="tk-grid">
    <div class="tk-box">
      <span class="tk-num">1</span>
      <h3><span class="tr">Katıl</span><span class="en">Join</span></h3>
      <p><span class="tr">Telegram ve Gmail adresinle kaydol. Hoş geldin hediyesi olarak <b>4 kredi</b> al.</span><span class="en">Sign up with Telegram and your Gmail address and get <b>4 credits</b> to start.</span></p>
    </div>
    <div class="tk-box">
      <span class="tk-num">2</span>
      <h3><span class="tr">Uygulamanı ekle</span><span class="en">Add your app</span></h3>
      <p><span class="tr">Play kapalı test ya da TestFlight linkini ver, uygulamanın içinden cevaplanabilecek 3 kontrol sorusu yaz. Ekip onaylayınca listeye girer. <b>İlk 3 uygulaman tamamen ücretsiz.</b></span><span class="en">Share your Play closed-testing or TestFlight link and write 3 questions only someone inside the app can answer. It goes live once we approve it. <b>Your first 3 apps are completely free.</b></span></p>
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
    <summary><span class="tr">Neden Gmail adresi istiyorsunuz?</span><span class="en">Why do you need my Gmail address?</span></summary>
    <p><span class="tr">Google Play kapalı testine yalnız geliştiricinin listesine eklenen Google hesapları katılabilir. Adresini yalnız test ettiğin uygulamanın geliştiricisi görür.</span><span class="en">Only Google accounts on the developer's list can join a Play closed test. Only the developers whose apps you test see your address.</span></p>
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

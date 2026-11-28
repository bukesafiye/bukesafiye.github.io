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
# Başlığın sağında "Giriş yap / Hesabım" düğmesi (_layouts/default.html)
tk_hesap: true
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
  .tk-kart > div { min-width: 0; }
  .tk-kart { display: flex; gap: 14px; align-items: center; justify-content: space-between; padding: 16px 18px; border-radius: 14px; background: var(--surface); border: 1px solid var(--line); margin-bottom: 10px; }
  .tk-kart p { margin: 4px 0 2px; color: var(--muted); font-size: 14px; }
  .tk-kart small { color: var(--muted); }
  .tk-kart .btn { flex-shrink: 0; }
  .tk-uyg { display: block; }
  .tk-mailler { margin: 10px 0 4px !important; color: var(--text) !important; }
  .tk-uyg-bas { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .tk-meta { display: block; margin-top: 2px; font-size: 13px; }
  .tk-durum { display: inline-flex; align-items: center; gap: 6px; padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; border: 1px solid var(--line); color: var(--muted); }
  .tk-durum::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
  .tk-durum-onayli { color: #3ecf8e; border-color: color-mix(in srgb, #3ecf8e 35%, transparent); background: color-mix(in srgb, #3ecf8e 10%, transparent); }
  .tk-durum-bekliyor { color: #f5a524; border-color: color-mix(in srgb, #f5a524 35%, transparent); background: color-mix(in srgb, #f5a524 10%, transparent); }
  .tk-durum-red { color: #e5484d; border-color: color-mix(in srgb, #e5484d 35%, transparent); }
  .tk-grup-bas { display: flex; align-items: center; gap: 8px; margin: 16px 0 8px; font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
  .tk-uyg > div > .tk-grup-bas:first-child { margin-top: 2px; }
  .tk-sayi { min-width: 22px; padding: 1px 7px; border-radius: 999px; font-size: 12px; letter-spacing: 0; text-align: center; background: color-mix(in srgb, var(--muted, #8a9399) 18%, transparent); color: var(--text); }
  .tk-sayi-yeni { background: color-mix(in srgb, var(--accent) 22%, transparent); }
  .tk-sayi-bekle { background: color-mix(in srgb, #f5a524 22%, transparent); }
  .tk-bos { margin: 14px 0 0 !important; font-size: 14px; color: var(--muted); }
  .tk-eylem { display: flex; gap: 8px; flex-wrap: wrap; }
  .tk-eylem .btn, .tk-kopyala { display: inline-flex; align-items: center; gap: 8px; }
  .tk-kopyala.is-ok { color: #3ecf8e; border-color: color-mix(in srgb, #3ecf8e 45%, transparent); }
  .tk-ipucu-alt { display: block; margin-top: 8px; font-size: 12.5px; }
  .tk-mail-satir { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; flex: 1; }
  .tk-etiketler { display: inline-flex; flex-wrap: wrap; gap: 4px; font-family: var(--body); }
  .tk-etiket { display: inline-block; padding: 1px 8px; border-radius: 999px; font: 600 11.5px/1.6 var(--body); color: var(--text); background: color-mix(in srgb, var(--accent) 16%, transparent); }
  .tk-etiket-yok { font: 400 12px var(--body); color: var(--muted); }
  .tk-mail-kod li .tk-satir-sil { flex: none; align-self: center; margin-left: auto; padding: 4px 12px; min-height: 0; font: 600 12.5px/1.4 var(--body); color: #f08a8a; border-color: color-mix(in srgb, #f08a8a 45%, transparent); background: transparent; word-break: normal; }
  .tk-mail-kod li .tk-satir-sil:hover { background: color-mix(in srgb, #f08a8a 14%, transparent); }
  .tk-tablo-sar { overflow-x: auto; }
  .tk-tablo { width: 100%; border-collapse: collapse; font-size: 14px; }
  .tk-tablo th { text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); padding: 4px 8px 8px; }
  .tk-tablo td { padding: 9px 8px; border-top: 1px solid var(--line); vertical-align: top; word-break: break-word; }
  .tk-tablo td:nth-child(2), .tk-tablo td:nth-child(3), .tk-tablo th:nth-child(2), .tk-tablo th:nth-child(3) { text-align: right; width: 64px; }
  .tk-mail-kod { list-style: none; counter-reset: m; margin: 0 0 10px; padding: 4px 0; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); font: 500 14px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; max-height: 320px; overflow: auto; }
  .tk-mail-kod li { counter-increment: m; display: flex; gap: 10px; padding: 7px 12px; word-break: break-all; }
  .tk-mail-kod li + li { border-top: 1px solid var(--line); }
  .tk-mail-kod li::before { content: counter(m); min-width: 1.6em; text-align: right; color: var(--muted, #8a9399); font-variant-numeric: tabular-nums; }
  .tk-mail-eski { opacity: .7; }
  .tk-form-ac { display: none; }
  .tk-katla { all: unset; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; font: inherit; color: inherit; }
  .tk-katla:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 6px; }
  .tk-katla .tk-ok { flex-shrink: 0; padding: 4px; width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line); color: var(--muted); transition: transform .2s ease, color .2s; transform: rotate(180deg); }
  .tk-katla:hover .tk-ok { color: var(--accent); border-color: var(--accent); }
  #basvur.tk-kapali .tk-katla .tk-ok { transform: rotate(0deg); }
  #basvur.tk-kapali .tk-form-ac { display: inline-flex; }
  #basvur.tk-kapali > form, #basvur.tk-kapali > p.muted { display: none; }
  .tk-uyg-alt { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--line); }
  .tk-uyg-alt .btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; font-size: 13.5px; }
  .tk-uyg-alt .tk-tehlike { color: #e5484d; border-color: color-mix(in srgb, #e5484d 40%, transparent); }
  .tk-uyg-alt .tk-bosluk { flex: 1; }
  .tk-canli-form { display: flex; gap: 8px; flex-wrap: wrap; width: 100%; margin-top: 4px; }
  .tk-canli-form[hidden] { display: none; }
  .tk-canli-form input { flex: 1 1 260px; min-width: 0; padding: 9px 12px; border-radius: 10px; border: 1px solid var(--line); background: var(--bg); color: var(--text); font: 400 14px/1.4 var(--body); }
  .tk-durum-kapali { color: var(--muted); }
  .tk-durum-yayinda { color: #4cc3ff; border-color: color-mix(in srgb, #4cc3ff 35%, transparent); background: color-mix(in srgb, #4cc3ff 10%, transparent); }
  .tk-magaza-link { display: inline-block; margin-left: 10px; font-size: 13px; }
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
  .tk-bas-sat h3 { margin: 0; }
  .tk-bas-sat { margin: 18px 0 10px; }
  .tk-yoklama { display: grid; gap: 8px; margin-top: 10px; }
  .tk-yoklama p { color: var(--text) !important; }
  .tk-form [hidden], .tk-box[hidden] { display: none !important; }
  #tkGiris { margin-top: 14px; }
  #tkSifre { margin-top: 14px; }
  .tk-takas { display: block; margin: -4px 0 14px; }
  .tk-link-dugme { margin-top: 10px; padding: 0; border: 0; background: none; color: var(--accent); font: 500 14px/1.4 var(--body); cursor: pointer; text-decoration: underline; }
  @media (max-width: 520px) { .tk-kart { flex-direction: column; align-items: stretch; } .tk-soru { grid-template-columns: 1fr; } }
  @media (max-width: 640px) { .tk-vs { grid-template-columns: 1fr; } .tk-hero .tk-lead { font-size: 17px; } }

  /* ---- Görünüm: sade, katmanlı kartlar ---- */
  .tk-hero { position: relative; isolation: isolate; padding: 52px 28px 40px; margin-top: 4px; border-radius: 28px; overflow: hidden;
    background: radial-gradient(120% 90% at 50% -10%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 60%), var(--surface);
    border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--line)); }
  .tk-hero::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: .5;
    background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 32px 32px; mask-image: radial-gradient(70% 60% at 50% 0%, #000, transparent); -webkit-mask-image: radial-gradient(70% 60% at 50% 0%, #000, transparent); }
  .tk-logo { width: 76px; height: 76px; border-radius: 20px; margin-bottom: 20px; box-shadow: 0 12px 40px -8px var(--glow), 0 0 0 1px var(--line); }
  .tk-badge { padding: 7px 14px; border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); font-size: 12.5px; letter-spacing: .04em; }
  .tk-badge::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent); }
  .tk-hero h1 { letter-spacing: -.02em; margin: 18px 0 12px; }
  .tk-hero h1 em { font-style: normal; background: linear-gradient(100deg, var(--accent), color-mix(in srgb, var(--accent) 45%, white)); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .tk-hero .tk-lead { font-size: 18px; line-height: 1.6; margin-bottom: 28px; }
  .tk-hero .tk-lead b { color: var(--text); }
  .tk-cta .btn { padding-inline: 20px; }
  .tk-cta .btn.primary { box-shadow: 0 8px 28px -8px var(--glow); }
  .tk-istat { display: grid; grid-template-columns: repeat(3, 1fr); margin: 34px auto 0; max-width: 560px; border-top: 1px solid var(--line); padding-top: 22px; }
  .tk-istat div + div { border-left: 1px solid var(--line); }
  .tk-istat b { display: block; font: 700 28px/1.1 var(--display); letter-spacing: -.01em; }
  .tk-istat span { font-size: 13px; color: var(--muted); }
  .tk-section { margin-top: 72px; }
  .tk-ust { display: block; margin-bottom: 8px; color: var(--accent); font: 700 12px/1 var(--body); letter-spacing: .12em; text-transform: uppercase; }
  .tk-section > h2, .tk-section h2.tk-katla-bas { margin: 0 0 6px; font-size: clamp(24px, 3.4vw, 30px); letter-spacing: -.01em; }
  .tk-box { background: linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 70%, var(--surface)), var(--surface)); transition: border-color .2s ease, transform .2s ease; }
  .tk-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .tk-grid .tk-box:hover { border-color: color-mix(in srgb, var(--accent) 35%, var(--line)); transform: translateY(-2px); }
  .tk-num { width: 36px; height: 36px; border-radius: 11px; border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); }
  .tk-vs .tk-box.ours { background: radial-gradient(100% 80% at 100% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%), var(--surface); box-shadow: 0 20px 60px -30px var(--glow); }
  .tk-rozet { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
  .tk-rozet li { padding: 16px; text-align: center; background: var(--surface); }
  .tk-rozet b { font-size: 16px; margin-bottom: 4px; }
  .tk-rozet .tk-rozet-ikon { display: block; font-size: 26px; margin-bottom: 6px; }
  .tk-faq details { padding: 0; transition: border-color .2s ease; }
  .tk-faq details[open] { border-color: color-mix(in srgb, var(--accent) 30%, var(--line)); }
  .tk-faq summary { list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 16px 18px; }
  .tk-faq summary::-webkit-details-marker { display: none; }
  .tk-faq summary::after { content: "+"; flex-shrink: 0; display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--line); color: var(--muted); font: 500 18px/1 var(--body); transition: transform .2s ease; }
  .tk-faq details[open] summary::after { transform: rotate(45deg); color: var(--accent); border-color: var(--accent); }
  .tk-faq details p { margin: 0; padding: 0 18px 16px; }
  .tk-gizlilik-satir { margin-top: 18px; font-size: 14px; }

  /* Başlıktaki hesap düğmesi (girişsizken dolu renk) */
  .tk-hesap-pill { gap: 8px; }
  /* Bu sayfada başlıkta yer açılsın: Test rehberi düğmesi orta genişlikte gizlenir (hero'da "Test etmeye başla" var) */
  @media (max-width: 1000px) { .site-header .nav-cta { display: none; } }
  .tk-hesap-pill.is-giris { background: var(--accent); color: #041214; border-color: transparent; }
  .tk-hesap-pill.is-giris:hover { background: color-mix(in srgb, var(--accent) 88%, white); }
  .tk-avatar { display: grid; place-items: center; width: 26px; height: 26px; margin-left: -8px; border-radius: 50%; background: var(--accent); color: #041214; font: 700 13px/1 var(--display); }
  @media (max-width: 430px) { .tk-hesap-pill:not(.is-giris) .tk-hesap-yazi { display: none; } .tk-avatar { margin: 0 -4px; } }

  /* Giriş penceresi */
  .tk-dialog { width: min(440px, calc(100vw - 32px)); padding: 0; border-radius: 22px; border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--line)); background: var(--surface); color: var(--text); box-shadow: 0 30px 80px -20px rgba(0, 0, 0, .7), 0 0 60px -30px var(--glow); }
  .tk-dialog::backdrop { background: rgba(3, 6, 8, .66); backdrop-filter: blur(4px); }
  .tk-dialog[open] { animation: tk-acil .18s ease-out; }
  @keyframes tk-acil { from { opacity: 0; transform: translateY(8px) scale(.98); } }
  .tk-dialog-ic { padding: 26px 26px 22px; }
  .tk-dialog-bas { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; padding-right: 32px; }
  .tk-dialog-bas img { width: 40px; height: 40px; border-radius: 11px; }
  .tk-dialog-bas h2 { margin: 0; font-size: 20px; }
  .tk-dialog-bas small { color: var(--muted); font-size: 13px; }
  .tk-dialog-kapat { position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--line); background: transparent; color: var(--muted); font: 400 20px/1 var(--body); cursor: pointer; }
  .tk-dialog-kapat:hover { color: var(--text); border-color: var(--accent); }
  .tk-dialog #tkGiris, .tk-dialog #tkSifre { margin: 0; padding: 0; border: 0; background: none; }
  .tk-dialog #tkGirisNot:empty { display: none; }
  .tk-dialog #tkGirisNot { margin: 0 0 14px; padding: 10px 12px; border-radius: 10px; background: var(--accent-soft); }
  .tk-dialog .btn.primary[type=submit] { width: 100%; justify-content: center; }
  .tk-dialog .tk-link-dugme { display: block; margin: 14px auto 0; }
  .tk-dialog .tk-takas { margin: -4px 0 14px; }
  .tk-onay { width: min(400px, calc(100vw - 32px)); text-align: center; }
  .tk-onay .tk-dialog-ic { padding: 28px 24px 22px; }
  .tk-onay-ikon { width: 56px; height: 56px; margin: 0 auto 14px; border-radius: 50%; display: grid; place-items: center; color: var(--accent); background: color-mix(in srgb, var(--accent) 14%, transparent); }
  .tk-onay-tehlike .tk-onay-ikon { color: #f08a8a; background: color-mix(in srgb, #f08a8a 14%, transparent); }
  .tk-onay h2 { margin: 0 0 12px; font-size: 20px; }
  .tk-onay-vurgu { margin: 0 auto 12px; padding: 8px 12px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); font: 500 14px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; word-break: break-all; }
  .tk-onay p { margin: 0 0 6px; color: var(--muted); font-size: 14.5px; line-height: 1.5; }
  .tk-onay .tk-onay-not { margin-top: 10px; padding: 8px 12px; border-radius: 10px; background: var(--accent-soft); color: var(--text); font-size: 13.5px; }
  .tk-onay-dugmeler { display: flex; gap: 10px; margin-top: 20px; }
  .tk-onay-dugmeler .btn { flex: 1; justify-content: center; }
  .tk-onay-tehlike .btn.primary { background: #e26d6d; color: #fff; }
  .tk-onay-tehlike .btn.primary:hover { background: #ec8080; }
  @media (max-width: 640px) {
    .tk-hero { padding: 36px 18px 28px; border-radius: 22px; }
    .tk-grid { grid-template-columns: 1fr; }
    .tk-rozet { grid-template-columns: repeat(2, 1fr); }
    .tk-istat b { font-size: 22px; }
    .tk-section { margin-top: 56px; }
  }
</style>

<section class="tk-hero">
  <img class="tk-logo" src="{{ '/assets/img/testerkulubu-icon-128.webp' | relative_url }}" alt="" width="76" height="76">
  <span class="tk-badge"><span class="tr">Ücretsiz · Türkiye'den başlıyoruz</span><span class="en">Free · Starting in Türkiye</span></span>
  <h1>Tester <em>Kulübü</em></h1>
  <p class="tk-lead">
    <span class="tr">Google Play'in <b>12 test kullanıcısı / 14 gün</b> kuralı için para ödeme. Sen başkalarının uygulamasını test et, onlar seninkini test etsin. Üstüne gerçek geri bildirim de al.</span>
    <span class="en">Don't pay to clear Google Play's <b>12 testers / 14 days</b> rule. Test other people's apps and they'll test yours, with real feedback on top.</span>
  </p>
  <div class="tk-cta">
    <a class="btn primary" href="{{ '/test/' | relative_url }}"><span class="tr">Test etmeye başla</span><span class="en">Start testing</span></a>
    <a class="btn" href="#basvur"><span class="tr">Uygulamanı ekle</span><span class="en">Add your app</span></a>
    {%- if page.telegram != "" %}
    <a class="btn" href="{{ page.telegram }}" rel="noopener"><span class="tr">Telegram'da katıl</span><span class="en">Join on Telegram</span></a>
    {%- endif %}
  </div>
  <div class="tk-istat">
    <div><b>12</b><span><span class="tr">test kullanıcısı</span><span class="en">testers</span></span></div>
    <div><b>14</b><span><span class="tr">gün</span><span class="en">days</span></span></div>
    <div><b>0 ₺</b><span><span class="tr">ücret</span><span class="en">cost</span></span></div>
  </div>
</section>

<section class="tk-section">
  <span class="tk-ust"><span class="tr">Neden biz</span><span class="en">Why us</span></span>
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
  <span class="tk-ust"><span class="tr">4 adım</span><span class="en">4 steps</span></span>
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

<section class="tk-section tk-kapali" id="basvur">
  <h2 class="tk-katla-bas"><button type="button" class="tk-katla" id="tkKatla" aria-controls="tkBasvuru" aria-expanded="false"><span class="tr">Uygulamanı ekle</span><span class="en">Add your app</span><svg class="tk-ok" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button></h2>
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

<section class="tk-section" id="hesabim" hidden>
  <span class="tk-ust"><span class="tr">Panel</span><span class="en">Dashboard</span></span>
  <h2><span class="tr">Hesabım</span><span class="en">My account</span></h2>
  <div id="tkHesap" class="tk-box"></div>
</section>

<dialog id="tkPanel" class="tk-dialog" aria-labelledby="tkPanelBaslik">
  <button type="button" class="tk-dialog-kapat" data-panel-kapat aria-label="Kapat / Close">×</button>
  <div class="tk-dialog-ic">
  <div class="tk-dialog-bas">
    <img src="{{ '/assets/img/testerkulubu-icon-128.webp' | relative_url }}" alt="" width="40" height="40">
    <div><h2 id="tkPanelBaslik"><span class="tr">Giriş yap</span><span class="en">Sign in</span></h2><small><span class="tr">Sadece test ediyorsan şifre gerekmez</span><span class="en">No password needed if you only test</span></small></div>
  </div>
  <div id="tkGiris" class="tk-form" hidden>
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
  <div id="tkSifre" class="tk-form" hidden>
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
  </div>
</dialog>

<script src="{{ '/assets/js/testerkulubu.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>

<section class="tk-section">
  <span class="tk-ust"><span class="tr">Güven puanı</span><span class="en">Trust score</span></span>
  <h2><span class="tr">Rozetler</span><span class="en">Badges</span></h2>
  <p class="muted"><span class="tr">Tamamladığın her test güven puanını 1 artırır, yarıda bıraktığın her test 2 düşürür. Rozetler bu puana göre verilir.</span><span class="en">Each test you finish adds 1 trust point; each one you abandon takes 2 away. Badges follow your trust score.</span></p>
  <ul class="tk-rozet">
    <li><span class="tk-rozet-ikon" aria-hidden="true">🌱</span><b><span class="tr">Yeni</span><span class="en">New</span></b><small><span class="tr">0–2 puan</span><span class="en">0–2 pts</span></small></li>
    <li><span class="tk-rozet-ikon" aria-hidden="true">🥉</span><b><span class="tr">Bronz</span><span class="en">Bronze</span></b><small><span class="tr">3+ puan</span><span class="en">3+ pts</span></small></li>
    <li><span class="tk-rozet-ikon" aria-hidden="true">🥈</span><b><span class="tr">Gümüş</span><span class="en">Silver</span></b><small><span class="tr">10+ puan</span><span class="en">10+ pts</span></small></li>
    <li><span class="tk-rozet-ikon" aria-hidden="true">🥇</span><b><span class="tr">Altın</span><span class="en">Gold</span></b><small><span class="tr">25+ puan</span><span class="en">25+ pts</span></small></li>
  </ul>
</section>

<section class="tk-section tk-faq">
  <span class="tk-ust"><span class="tr">Merak edilenler</span><span class="en">Questions</span></span>
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
  <p class="muted tk-gizlilik-satir"><span class="tr">Hangi bilgileri neden topladığımızı <a href="{{ '/testerkulubu/gizlilik/' | relative_url }}">Gizlilik</a> sayfasında anlattık.</span><span class="en">What we collect and why: see our <a href="{{ '/testerkulubu/gizlilik/' | relative_url }}">Privacy</a> page.</span></p>
</section>

<script>
  // "Testçi listem" ile Hesabım'a gidilince uzun "Uygulamanı ekle" formu küçülür; "Uygulamanı ekle" ya da "Formu aç" yeniden açar.
  (function () {
    var b = document.getElementById('basvur');
    if (!b) return;
    var ok = document.getElementById('tkKatla');
    function kapat(on) { b.classList.toggle('tk-kapali', on); if (ok) ok.setAttribute('aria-expanded', on ? 'false' : 'true'); }
    if (ok) ok.addEventListener('click', function () { kapat(!b.classList.contains('tk-kapali')); });
    // Form varsayılan olarak kapalı; yalnız "Uygulamanı ekle" bağlantısı (ya da #basvur adresi) ya da "Formu aç" açar
    if (location.hash === '#basvur') kapat(false);
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

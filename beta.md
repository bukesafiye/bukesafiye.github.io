---
layout: default
title: Beta / TestFlight
description: MiroGames oyunlarının iPhone ve iPad test sürümleri — Test builds of MiroGames games for iPhone and iPad, via TestFlight.
permalink: /beta/
back: /
back_tr: Ana sayfa
back_en: Home
---
<div class="tr" markdown="1">
# Beta: oyunlarımızı ilk sen dene

Oyunlarımızın iPhone ve iPad sürümlerini App Store'a çıkmadan önce Apple'ın **TestFlight** uygulamasıyla deneyebilirsin. Hesap açman ya da e-posta vermen gerekmez.

1. iPhone'una ya da iPad'ine App Store'dan [TestFlight](https://apps.apple.com/app/testflight/id899247664)'ı kur.
2. Aşağıdan bir oyunun **TestFlight'ta katıl** düğmesine dokun, sonra **Kabul Et** ve **Yükle**.
3. Bir hata görürsen ekran görüntüsü al: TestFlight sana doğrudan bize göndermeyi önerir.

Test sürümleri 90 gün geçerlidir; yeni sürüm çıktıkça TestFlight seni haberdar eder.
</div>

<div class="en" markdown="1">
# Beta: be the first to play

Try the iPhone and iPad versions of our games before they reach the App Store, with Apple's **TestFlight** app. No account and no email needed.

1. Install [TestFlight](https://apps.apple.com/app/testflight/id899247664) from the App Store on your iPhone or iPad.
2. Tap a game's **Join on TestFlight** button below, then **Accept** and **Install**.
3. Spotted a bug? Take a screenshot: TestFlight offers to send it straight to us.

Test builds last 90 days; TestFlight lets you know when a new one is out.
</div>

<ul class="dev-games beta-games">
  {%- for g in site.data.games %}{% if g.testflight %}
  {%- assign url = '/Store/' | append: g.slug | append: '/' %}
  <li style="--c: {{ g.color }}">
    <a class="dev-game" href="{{ url | relative_url }}"><img src="{{ g.icon | relative_url }}" alt="" width="40" height="40" loading="lazy">{% if g.name.tr == g.name.en %}{{ g.name.tr }}{% else %}<span class="tr">{{ g.name.tr }}</span><span class="en">{{ g.name.en }}</span>{% endif %}</a>
    <a class="btn" href="{{ g.testflight }}" rel="noopener"><span class="tr">TestFlight'ta katıl</span><span class="en">Join on TestFlight</span></a>
  </li>
  {%- endif %}{% endfor %}
</ul>

<p class="contact-line"><span class="tr">Android'de mi oynuyorsun? Oyunlar Google Play'e de geliyor; soruların için:</span><span class="en">Playing on Android? The games are coming to Google Play too; questions:</span> <a href="mailto:bukesafiye@gmail.com">bukesafiye@gmail.com</a></p>

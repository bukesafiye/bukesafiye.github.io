---
layout: default
title: Geliştiriciler / Developers
description: MiroGames — the team behind the games, contact, and every game's privacy policy and support page.
back: /
back_tr: Ana sayfa
back_en: Home
---
<div class="tr" markdown="1">
# Geliştiriciler

MiroGames, oyun tutkusunu paylaşan üç kişilik küçük ve bağımsız bir ekip. Sıcak, el yapımı hissi veren ve her oynayışta "bir tur daha" dedirten oyunlar yapıyoruz. Oyunlarımızda reklam ve hesap yok, internet gerekmez.

Google Play'de geliştirici adımız **MiroGamesStudio**.
</div>

<div class="en" markdown="1">
# Developers

MiroGames is a small independent team of three who share a passion for games. We make warm, hand-crafted games that keep you saying "one more round". Our games have no ads and no accounts, and they don't need the internet.

Our developer name on Google Play is **MiroGamesStudio**.
</div>

<p class="contact-line"><span class="tr">İletişim ve destek:</span><span class="en">Contact and support:</span> <a href="mailto:bukesafiye@gmail.com">bukesafiye@gmail.com</a></p>

<h2 id="privacy"><span class="tr">Oyunlar: gizlilik ve destek</span><span class="en">Games: privacy and support</span></h2>
<p><span class="tr">Her oyunun kendi gizlilik politikası ve destek sayfası var. Mağazalarda da bu adresler kullanılır.</span><span class="en">Every game has its own privacy policy and support page. The stores use these same addresses.</span></p>
<ul class="dev-games">
  {%- for g in site.data.games %}
  {%- assign url = '/Store/' | append: g.slug | append: '/' %}
  <li style="--c: {{ g.color }}">
    <a class="dev-game" href="{{ url | relative_url }}"><img src="{{ g.icon | relative_url }}" alt="" width="40" height="40" loading="lazy">{% if g.name.tr == g.name.en %}{{ g.name.tr }}{% else %}<span class="tr">{{ g.name.tr }}</span><span class="en">{{ g.name.en }}</span>{% endif %}</a>
    <span class="dev-links">
      <a href="{{ url | append: 'privacy.html' | relative_url }}"><span class="tr">Gizlilik</span><span class="en">Privacy</span></a>
      <a href="{{ url | append: 'support.html' | relative_url }}"><span class="tr">Destek</span><span class="en">Support</span></a>
    </span>
  </li>
  {%- endfor %}
</ul>

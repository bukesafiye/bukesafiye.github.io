---
layout: default
title: Tester Kulübü ve Test rehberi — Gizlilik / Privacy
description: Tester Kulübü (web paneli ve Telegram botu) ile MiroGames test rehberinin hangi verileri neden topladığı, kimin gördüğü ve nasıl silinebileceği.
permalink: /testerkulubu/gizlilik/
back: /testerkulubu/
back_tr: Tester Kulübü
back_en: Tester Kulübü
---
<div class="tr" markdown="1">
# Tester Kulübü ve Test rehberi: Gizlilik

*Son güncelleme: 23 Kasım 2026 · Bu sayfa [Tester Kulübü](/testerkulubu/) (web paneli ve [@TesterKulubuBot](https://t.me/TesterKulubuBot)) ile [Test rehberi](/test/) için geçerlidir. Oyunlarımızın kendi gizlilik notları [Geliştiriciler](/developers.html#privacy) sayfasındadır.*

## Bir bakışta

- Yalnızca testi yürütmek için gereken bilgileri toplarız: **mail adresin**, katıldığın testler ve günlük kontrol sonucun.
- Mail adresini **yalnızca test ettiğin uygulamanın sahibi** (onu test listesine ekleyebilsin diye) ve kulüp yöneticileri görür. Herkese açık listede kişisel veri yoktur.
- Şifren açık olarak saklanmaz; yalnızca geri çevrilemez bir özeti (bcrypt) tutulur.
- Verini satmayız, reklam için kullanmayız, üçüncü kişilerle paylaşmayız.
- İstediğin an **silinmesini** isteyebilirsin: [bukesafiye@gmail.com](mailto:bukesafiye@gmail.com).

## Veri sorumlusu

MiroGames (Google Play'de **MiroGamesStudio**), küçük ve bağımsız bir geliştirici ekibi. İletişim: [bukesafiye@gmail.com](mailto:bukesafiye@gmail.com).

## Hangi bilgileri topluyoruz

| Ne | Ne zaman | Neden |
|---|---|---|
| Mail adresi | Teste katılırken, uygulama eklerken ya da Test rehberindeki Android formunda | Google Play kapalı testine yalnızca listeye eklenen hesaplar girebilir; uygulama sahibi seni bu adresle listeye ekler |
| Şifre (yalnızca özeti) | Web panelinde uygulama eklerken ya da şifre belirlerken | Hesabına yalnızca senin girebilmen için |
| Ad ve Telegram kullanıcı adı, Telegram kimlik numarası | Telegram botunu başlatınca | Botun seni tanıması ve sana mesaj gönderebilmesi için |
| Eklediğin uygulama | Uygulama eklerken: ad, açıklama, test linki, kontrol soruları ve cevapları, canlı mağaza linki | Uygulamanı listelemek ve test edenlere günlük soru sorabilmek için |
| Test kayıtları | Teste katılınca ve günlük soruyu cevaplayınca: hangi teste katıldığın, gün sayısı, cevabın **doğru mu yanlış mı** olduğu (cevabın kendisi saklanmaz), isteğe bağlı yorumun ve puanın | 14 günlük testi takip etmek, kredi ve rozet vermek için |
| Kredi ve güven puanı | Test tamamladıkça ya da bıraktıkça | Takas sisteminin adil işlemesi için |
| Tıklama sayıları | Bir uygulamanın test linkine ya da Test rehberindeki "katıl" düğmelerine basınca | Uygulama sahibinin kaç kişinin ilgilendiğini görmesi için |
| Tarayıcı kimliği | Test rehberini açınca, tarayıcına rastgele bir kimlik yazılır | Aynı kişinin tıklamalarını bir kez saymak için (çerez ya da cihaz parmak izi değildir) |
| IP adresinin özeti | Formları gönderince | Kötüye kullanımı sınırlamak için (ör. aynı bağlantıdan saatte en çok 8 adres). IP adresin açık olarak saklanmaz, yalnızca geri çevrilemez özeti (SHA-256) tutulur |

## Tarayıcında tutulanlar

Web paneli ve Test rehberi, tarayıcının yerel deposuna (localStorage) şunları yazar: oturum anahtarı (30 gün geçerli, giriş yaptıysan), bir kez yazdığın mail adresin (her seferinde tekrar yazmaman için), dil tercihin ve tarayıcı kimliği. Bunları tarayıcının site verilerini temizleyerek ya da panelde **Çıkış**'a basarak silebilirsin.

## Kim neyi görür

- **Uygulama sahibi:** yalnızca kendi uygulamasına katılanların mail adreslerini ve kendi uygulamasının tıklama sayısını görür.
- **Kulüp yöneticileri:** onay için eklenen uygulamaları, Test rehberinden gelen Android mail adreslerini ve test istatistiklerini görür.
- **Herkes:** yalnızca onaylı uygulamaların adını, açıklamasını ve kaç kişinin katıldığını görür.

## Kullandığımız hizmetler

- **Supabase** (veritabanı ve sunucu fonksiyonları; sunucular İrlanda'da, AB)
- **Telegram** (bot ve topluluk grubu; Telegram'ın kendi [gizlilik politikası](https://telegram.org/privacy) geçerlidir)
- **Resend** (yalnızca şifre belirleme / sıfırlama maili gönderirken)
- **GitHub Pages** (sitenin barındırılması)
- **Google Analytics ve Google AdSense** (bu sitenin genelinde ziyaret istatistikleri ve reklamlar; ayrıntılar [Geliştiriciler](/developers.html#ads) sayfasında)

Bir teste katıldığında uygulamayı **Google Play** ya da **Apple TestFlight** üzerinden kurarsın; orada Google'ın ve Apple'ın kendi gizlilik politikaları geçerlidir.

## Ne kadar saklıyoruz

Bilgilerin, kulüp üyeliğin ya da test süren boyunca tutulur. Botla yarım kalan konuşma adımları 30 gün sonra kendiliğinden silinir. Şifre sıfırlama bağlantıları 1 saat geçerlidir. Silinmesini istediğinde hesabını, testlerini ve mail adresini kalıcı olarak sileriz.

## Hakların (KVKK md. 11)

Kişisel verilerinin işlenip işlenmediğini öğrenme, bilgi isteme, düzeltilmesini ya da silinmesini isteme ve işlemeye itiraz etme hakkın var. Bunun için [bukesafiye@gmail.com](mailto:bukesafiye@gmail.com) adresine yaz; en geç 30 gün içinde cevap veririz.

## Çocuklar

Tester Kulübü 13 yaşından küçükler için değildir.

## Değişiklikler

Bu notu değiştirirsek tarihini güncelleriz.
</div>

<div class="en" markdown="1">
# Tester Kulübü and the Testing guide: Privacy

*Last updated: 23 November 2026 · This page covers [Tester Kulübü](/testerkulubu/) (the web panel and [@TesterKulubuBot](https://t.me/TesterKulubuBot)) and the [Testing guide](/test/). Each of our games has its own privacy note on the [Developers](/developers.html#privacy) page.*

## At a glance

- We collect only what running the tests needs: **your email address**, the tests you join and your daily check result.
- Your email is seen **only by the owner of the app you test** (so they can add you to their tester list) and by the club admins. The public list contains no personal data.
- Your password is never stored in plain text, only an irreversible hash (bcrypt).
- We don't sell your data, use it for ads or share it with third parties.
- You can ask us to **delete** it at any time: [bukesafiye@gmail.com](mailto:bukesafiye@gmail.com).

## Who is responsible

MiroGames (**MiroGamesStudio** on Google Play), a small independent development team. Contact: [bukesafiye@gmail.com](mailto:bukesafiye@gmail.com).

## What we collect

| What | When | Why |
|---|---|---|
| Email address | When you join a test, add an app, or use the Android form in the Testing guide | Only listed accounts can enter a Google Play closed test; the app owner adds you with this address |
| Password (hash only) | When you add an app or set a password in the web panel | So only you can sign in to your account |
| Name, Telegram username and Telegram ID | When you start the Telegram bot | So the bot can recognise you and message you |
| Your app | When you add it: name, description, test link, check questions and answers, live store link | To list your app and ask testers a daily question |
| Test records | When you join and answer: which tests, day count, whether your answer was **right or wrong** (the answer itself isn't stored), your optional comment and rating | To follow the 14-day test and award credits and badges |
| Credits and trust score | As you finish or leave tests | To keep the swap fair |
| Click counts | When you tap an app's test link or a "join" button in the Testing guide | So the owner can see how many people are interested |
| Browser ID | When you open the Testing guide, a random ID is saved in your browser | To count the same person's clicks once (not a cookie or device fingerprint) |
| IP address hash | When you submit a form | To limit abuse (e.g. at most 8 addresses per hour from one connection). Your IP isn't stored, only an irreversible hash (SHA-256) |

## Stored in your browser

The web panel and Testing guide save to your browser's local storage: a sign-in key (valid 30 days, if you signed in), the email you typed once (so you don't retype it), your language and the browser ID. Clear them by clearing the site's data in your browser or tapping **Sign out** in the panel.

## Who sees what

- **App owners** see only the emails of people who joined their own app, and their own app's click count.
- **Club admins** see apps waiting for approval, Android addresses from the Testing guide and test statistics.
- **Everyone** sees only approved apps' names, descriptions and how many people joined.

## Services we use

- **Supabase** (database and server functions; servers in Ireland, EU)
- **Telegram** (the bot and community group; Telegram's own [privacy policy](https://telegram.org/privacy) applies)
- **Resend** (only to send password set / reset emails)
- **GitHub Pages** (site hosting)
- **Google Analytics and Google AdSense** (visit statistics and ads across this site; see the [Developers](/developers.html#ads) page)

When you join a test you install the app through **Google Play** or **Apple TestFlight**, where Google's and Apple's own privacy policies apply.

## How long we keep it

As long as you're a club member or your test runs. Unfinished bot conversation steps are deleted automatically after 30 days. Password reset links expire after 1 hour. When you ask us to, we permanently delete your account, tests and email address.

## Your rights

You can ask whether we process your data, request a copy, correction or deletion, and object to processing. Write to [bukesafiye@gmail.com](mailto:bukesafiye@gmail.com); we answer within 30 days.

## Children

Tester Kulübü isn't meant for children under 13.

## Changes

If we change this note, we'll update its date.
</div>

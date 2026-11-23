// Tester Kulübü web paneli (/testerkulubu/). Sunucu: Supabase Edge Function tk-web (mail + şifre, imzalı jeton).
// Sayfada gizli anahtar yok; tüm kurallar sunucuda (kredi, kredisiz 3 hak, 100 kişi, yönetici onayı).
(function () {
  'use strict';
  var API = 'https://wgcrjolzmyvdtunnypgs.supabase.co/functions/v1/tk-web';
  var JETON = 'tk-jeton', MAIL = 'tk-mail';

  // --- yardımcılar -----------------------------------------------------------------------------
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function t(tr, en) { return '<span class="tr">' + tr + '</span><span class="en">' + (en || tr) + '</span>'; }
  function jetonAl() { try { return localStorage.getItem(JETON); } catch (e) { return null; } }
  function mailAl() { try { return localStorage.getItem(MAIL); } catch (e) { return null; } }
  function mailYaz(m) { try { m ? localStorage.setItem(MAIL, m) : localStorage.removeItem(MAIL); } catch (e) { /* özel pencere */ } }
  function jetonYaz(j) { try { j ? localStorage.setItem(JETON, j) : localStorage.removeItem(JETON); } catch (e) { /* özel pencere */ } }

  function api(veri) {
    return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(veri) })
      .then(function (r) { return r.json(); })
      .catch(function () { return { hata: 'ag' }; });
  }

  var HATA = {
    ag: ['Bağlantı kurulamadı, birazdan tekrar dene.', 'Could not connect, please try again shortly.'],
    oturum: ['Oturumun sona erdi, tekrar giriş yap.', 'Your session ended, please sign in again.'],
    tk_gmail_gecersiz: ['Geçerli bir mail adresi yaz.', 'Enter a valid email address.'],
    tk_sifre_kisa: ['Şifre en az 6 karakter olmalı.', 'Password must be at least 6 characters.'],
    tk_giris_hatali: ['Mail adresi ya da şifre hatalı.', 'Wrong email or password.'],
    tk_gmail_botta: ['Bu mail adresi Telegram botunda kayıtlı. Botta /websifre yazıp şifre belirle, sonra buradan gir.', 'This email is registered in the Telegram bot. Type /websifre there to set a password, then sign in here.'],
    tk_engelli: ['Hesabın kısıtlı.', 'Your account is restricted.'],
    tk_sifre_gerekli: ['Bu mail adresi bir uygulama sahibine ait; şifreni de yaz.', 'This email belongs to an app owner; enter your password too.'],
    tk_mail_dogrula: ['Bu mail adresiyle daha önce test etmişsin. Uygulama eklemek için önce aşağıdaki Hesabım bölümünden "Şifre belirle" ile mailine gelen bağlantıdan şifreni belirle.', 'You tested with this email before. To add an app, first set your password from "Set password" under My account below, using the link sent to your email.'],
    tk_mail_kapali: ['Mail ile şifre belirleme çok yakında açılıyor. Şimdilik Telegram grubumuzdan (t.me/testerkulubu) yazabilirsin.', 'Setting a password by email is coming very soon. For now, message us in the Telegram group (t.me/testerkulubu).'],
    tk_kod_gecersiz: ['Bu bağlantının süresi dolmuş ya da kullanılmış. Yeni bir bağlantı iste.', 'This link has expired or was already used. Request a new one.'],
    tk_soru_az: ['En az 3 kontrol sorusu gerekiyor.', 'At least 3 check questions are required.'],
    tk_canli_gecersiz: ['Canlı link geçersiz: Android için https://play.google.com/store/apps/details?id=…, iPhone için https://apps.apple.com/…/id… olmalı.', 'Invalid live link: Android needs https://play.google.com/store/apps/details?id=…, iPhone needs https://apps.apple.com/…/id…'],
    tk_link_gecersiz: ['Link geçersiz: Android için https://play.google.com/apps/testing/…, iPhone için https://testflight.apple.com/join/… olmalı.', 'Invalid link: Android needs https://play.google.com/apps/testing/…, iPhone needs https://testflight.apple.com/join/…'],
    tk_ad_gecersiz: ['Uygulama adı 2–48 karakter olmalı.', 'App name must be 2–48 characters.'],
    tk_platform_yok: ['En az bir platform seç.', 'Pick at least one platform.'],
    tk_kendi_uygulaman: ['Kendi uygulamanı test edemezsin 🙂', "You can't test your own app 🙂"],
    tk_kontenjan_dolu: ['Bu uygulamanın kontenjanı doldu.', 'This app is full.'],
    tk_yetersiz_kredi: ['Uygulama sahibinin kredisi bitti; şimdilik katılamazsın.', "The owner is out of credits; you can't join right now."],
    tk_zaten_katildin: ['Bu uygulamayı zaten test ediyorsun.', "You're already testing this app."],
    tk_uygulama_kapali: ['Bu uygulama artık teste açık değil.', 'This app is no longer open for testing.'],
    tk_bugun_yapildi: ['Bugünün yoklamasını yaptın, yarın görüşürüz!', 'Done for today, see you tomorrow!'],
    tk_soru_eskidi: ['Gün döndü, soruyu yeniden aç.', 'A new day started, open the question again.'],
    tk_test_aktif_degil: ['Bu test artık aktif değil.', 'This test is no longer active.']
  };
  function hataMetni(k) { var m = HATA[k] || ['Bir şeyler ters gitti, tekrar dene.', 'Something went wrong, please try again.']; return t(esc(m[0]), esc(m[1])); }
  function mesaj(el, html, tur) { el.innerHTML = html ? '<div class="tk-mesaj ' + (tur || '') + '">' + html + '</div>' : ''; }

  // Mail + şifre: hesap varsa giriş, yoksa yeni hesap (ayrı üyelik adımı yok)
  function girVeyaKaydol(gmail, sifre) {
    if (!sifre) return api({ is: 'giris', gmail: gmail, sifre: '' });   // sadece test eden: şifresiz
    return api({ is: 'giris', gmail: gmail, sifre: sifre }).then(function (r) {
      if (r.jeton || r.hata !== 'tk_giris_hatali') return r;
      return api({ is: 'kayit', gmail: gmail, sifre: sifre, ad: '' }).then(function (k) {
        return k.hata === 'tk_gmail_kullanimda' ? { hata: 'tk_giris_hatali' } : k;
      });
    });
  }

  // --- 1) Test edilecek uygulamalar (herkese açık) ----------------------------------------------
  function listeCiz() {
    var kutu = $('tkListe');
    api({ is: 'liste' }).then(function (r) {
      if (!r.uygulamalar) { mesaj(kutu, hataMetni(r.hata)); return; }
      var gruplar = [['android', '🤖 Android'], ['ios', '🍏 iPhone'], ['web', '🌐 Web']];
      var html = '';
      gruplar.forEach(function (g) {
        var liste = r.uygulamalar.filter(function (a) { return a.platform === g[0]; });
        if (!liste.length) return;
        html += '<h3 class="tk-grup">' + g[1] + '</h3><div class="tk-kartlar">';
        liste.forEach(function (a) {
          var magaza = a.canli_link ? '<a class="' + (a.testte ? 'tk-magaza-link' : 'btn primary') + '" href="' + esc(a.canli_link) + '" target="_blank" rel="noopener">' + t('Mağazada aç', 'Open in store') + ' ↗</a>' : '';
          if (!a.testte) {   // testten çıkmış, yayında
            html += '<div class="tk-kart"><div><b>' + esc(a.ad) + '</b> <span class="tk-durum tk-durum-yayinda">' + t('Yayında', 'Live') + '</span>' +
              (a.aciklama ? '<p>' + esc(a.aciklama) + '</p>' : '') + '</div>' + magaza + '</div>';
            return;
          }
          html += '<div class="tk-kart"><div><b>' + esc(a.ad) + '</b>' +
            (a.aciklama ? '<p>' + esc(a.aciklama) + '</p>' : '') +
            '<small>' + a.katilan + '/' + a.istenen + ' ' + t('kişi', 'people') + '</small>' + magaza + '</div>' +
            (a.dolu ? '<span class="btn soon">' + t('Dolu', 'Full') + '</span>'
                    : '<button type="button" class="btn primary" data-katil="' + esc(a.id) + '" data-ad="' + esc(a.ad) + '">' + t('Teste katıl', 'Join test') + '</button>') +
            '</div>';
        });
        html += '</div>';
      });
      kutu.innerHTML = html || '<p class="muted">' + t('Şu an test bekleyen uygulama yok.', 'No apps waiting for testers right now.') + '</p>';
    });
  }

  // --- Teste katıl: giriş yoksa yalnız mail adresi sor --------------------------------------------------
  var bekleyenKatilim = null;
  function katil(id, ad) {
    if (!jetonAl() && mailAl()) {   // mail bir kez yazıldı: her "Teste katıl" doğrudan bu adrese eklenir
      katilSonuc(id, api({ is: 'katil_gmail', gmail: mailAl(), uygulama: id }));
      return;
    }
    if (!jetonAl()) { bekleyenKatilim = { id: id, ad: ad }; girisAc(t('<b>' + esc(ad) + '</b> testine katılmak için mail adresini yaz. Şifre gerekmez.', 'Enter your email to join <b>' + esc(ad) + '</b>. No password needed.'), true); return; }
    katilSonuc(id, api({ is: 'katil', jeton: jetonAl(), uygulama: id }));
  }
  function katilSonuc(id, istek) {
    istek.then(function (r) {
      if (r.hata === 'oturum') { jetonYaz(null); return katil(id, ''); }
      if (r.jeton) jetonYaz(r.jeton);
      var kutu = $('tkKatilSonuc');
      var kim = mailAl() && !jetonAl() ? '<br><small class="muted">' + esc(mailAl()) + ' · <button type="button" class="tk-link-dugme" data-mail-degistir="1">' + t('farklı mail', 'different email') + '</button></small>' : '';
      if (r.hata) { mesaj(kutu, hataMetni(r.hata) + kim, 'hata'); kutu.scrollIntoView({ block: 'center' }); return; }
      mesaj(kutu, '🎉 ' + t('<b>' + esc(r.ad) + '</b> testine katıldın!', 'You joined <b>' + esc(r.ad) + '</b>!') + '<br>' +
        (r.platform === 'android'
          ? t('Geliştirici mail adresini (' + esc(r.gmail) + ') test listesine ekleyecek. Sonra bu linkten katılıp kur:', 'The developer will add your email (' + esc(r.gmail) + ') to the tester list. Then join and install here:')
          : r.platform === 'web' ? t('Tarayıcıda aç ve oyna:', 'Open and play in your browser:')
          : t('TestFlight linkinden kur:', 'Install from TestFlight:')) +
        ' <a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + t('Test linkini aç', 'Open test link') + ' ↗</a><br>' +
        (r.oturum_yok
          ? (r.telegram ? t('Günün sorusu her sabah Telegram botundan gelecek.', 'Your daily question will come from the Telegram bot each morning.')
                        : t('Günün sorusunu cevaplamak için <b>Hesabım</b> bölümünden mail adresin ve şifrenle gir.', 'Sign in under <b>My account</b> with your email and password to answer the daily question.'))
          : t('Her gün aşağıdaki <b>Hesabım</b> bölümünden günün sorusunu cevapla; 14 gün = +1 kredi.', 'Answer the daily question under <b>My account</b> below; 14 days = +1 credit.')) + kim, 'tamam');
      kutu.scrollIntoView({ block: 'center' });
      listeCiz(); hesapCiz();
    });
  }

  // --- 2) Başvuru formu (mail + şifre formun içinde) --------------------------------------------
  function soruSatiri() {
    var d = document.createElement('div');
    d.className = 'tk-soru';
    d.innerHTML = '<input type="text" maxlength="200" placeholder="Soru: ör. Ana menüde kaç düğme var?" aria-label="Kontrol sorusu">' +
                  '<input type="text" maxlength="60" placeholder="Cevap: ör. 4" aria-label="Cevap">';
    $('tkSorular').appendChild(d);
  }
  function platformGoster() {
    $('tkLinkAndroid').hidden = !$('tkPlAndroid').checked;
    $('tkLinkIos').hidden = !$('tkPlIos').checked;
    $('tkLinkWeb').hidden = !$('tkPlWeb').checked;
  }
  function basvur(e) {
    e.preventDefault();
    var f = e.target, sonuc = $('tkBasvuruSonuc');
    var platformlar = [];
    if ($('tkPlAndroid').checked) platformlar.push('android');
    if ($('tkPlIos').checked) platformlar.push('ios');
    if ($('tkPlWeb').checked) platformlar.push('web');
    var sorular = Array.prototype.map.call(document.querySelectorAll('#tkSorular .tk-soru'), function (s) {
      var i = s.querySelectorAll('input'); return { soru: i[0].value.trim(), cevap: i[1].value.trim() };
    }).filter(function (s) { return s.soru && s.cevap; });
    var veri = {
      is: 'basvur', gmail: f.gmail.value.trim(), sifre: f.sifre.value, ad: f.ad.value.trim(), aciklama: f.aciklama.value.trim(),
      platformlar: platformlar, linkler: { android: f.linkAndroid.value.trim(), ios: f.linkIos.value.trim(), web: f.linkWeb.value.trim() },
      istenen: f.istenen.value, sorular: sorular
    };
    if (!platformlar.length) { mesaj(sonuc, hataMetni('tk_platform_yok'), 'hata'); return; }
    if (sorular.length < 3) { mesaj(sonuc, hataMetni('tk_soru_az'), 'hata'); return; }
    var btn = f.querySelector('button[type=submit]'); btn.disabled = true;
    api(veri).then(function (r) {
      btn.disabled = false;
      if (r.jeton) jetonYaz(r.jeton);
      if (!r.sonuc) { mesaj(sonuc, hataMetni(r.hata), 'hata'); return; }
      var satir = r.sonuc.map(function (s) {
        return s.tamam ? '📨 <b>' + esc(s.ad) + '</b> ' + t('onaya gönderildi.', 'sent for approval.')
                       : '❌ <b>' + esc(s.ad) + '</b>: ' + hataMetni(s.hata);
      }).join('<br>');
      mesaj(sonuc, satir + (r.tamam ? '<br>' + t('Onaylanınca listede görünecek. Başvuranların mail adreslerini <b>Hesabım</b> bölümünde aynı mail adresi ve şifreyle görürsün.', 'Once approved it appears in the list. See applicants’ email addresses under <b>My account</b> with the same email and password.') : ''), r.tamam ? 'tamam' : 'hata');
      if (r.tamam) { f.ad.value = ''; f.aciklama.value = ''; f.linkAndroid.value = ''; f.linkIos.value = ''; f.linkWeb.value = ''; hesapCiz(); }
    });
  }

  // --- 3) Hesabım: kendi uygulamaları (başvuran mailleri, tıklama) + testlerim (günlük yoklama) -
  function girisAc(not, katilimMi) {
    var k = $('tkGiris');
    k.hidden = false;
    k.dataset.mod = katilimMi ? 'katil' : 'giris';
    // Katılımda şifre gizli; takas (kendi uygulamasını da test ettirmek) isteyen açıp şifre belirler
    $('tkSifreAlan').hidden = !!katilimMi;
    $('tkTakasAc').hidden = !katilimMi;
    $('tkSifreEtiket').innerHTML = katilimMi
      ? t('Şifre belirle (en az 6 karakter): sonra bu mail ve şifreyle uygulamanı ekleyebilirsin', 'Set a password (min. 6 characters): then add your app with this email and password')
      : t('Şifre (sadece test ediyorsan boş bırak)', 'Password (leave empty if you only test)');
    var si = k.querySelector('input[name=sifre]'); si.value = ''; si.removeAttribute('minlength');
    $('tkGirisNot').innerHTML = not || '';
    k.scrollIntoView({ block: 'center' });
    k.querySelector('input[name=gmail]').focus();
  }
  function giris(e) {
    e.preventDefault();
    var f = e.target, kutu = $('tkGirisSonuc');
    if ($('tkGiris').dataset.mod === 'katil' && bekleyenKatilim && f.sifre.value) {   // takas: şifreli hesapla katıl
      var bt = bekleyenKatilim;
      girVeyaKaydol(f.gmail.value.trim(), f.sifre.value).then(function (r) {
        if (!r.jeton) { mesaj(kutu, hataMetni(r.hata), 'hata'); return; }
        jetonYaz(r.jeton); f.sifre.value = ''; bekleyenKatilim = null; mesaj(kutu, ''); $('tkGiris').hidden = true;
        hesapCiz(); katil(bt.id, bt.ad);
      });
      return;
    }
    if ($('tkGiris').dataset.mod === 'katil' && bekleyenKatilim) {   // yalnız mail adresiyle teste katıl
      var b = bekleyenKatilim, girilen = f.gmail.value.trim();
      api({ is: 'katil_gmail', gmail: girilen, uygulama: b.id }).then(function (r) {
        if (r.hata === 'tk_gmail_gecersiz' || r.hata === 'tk_engelli') { mesaj(kutu, hataMetni(r.hata), 'hata'); return; }
        mailYaz(girilen);
        bekleyenKatilim = null; mesaj(kutu, ''); $('tkGiris').hidden = true;
        katilSonuc(b.id, Promise.resolve(r));
      });
      return;
    }
    girVeyaKaydol(f.gmail.value.trim(), f.sifre.value).then(function (r) {
      if (!r.jeton) { mesaj(kutu, hataMetni(r.hata), 'hata'); return; }
      jetonYaz(r.jeton); f.sifre.value = ''; mesaj(kutu, ''); $('tkGiris').hidden = true;
      hesapCiz();
      if (bekleyenKatilim) { var b = bekleyenKatilim; bekleyenKatilim = null; katil(b.id, b.ad); }
    });
  }
  // Mail adresleri alt alta, numaralı; eklenenler soluk. Kopyala düğmesi ayrıca virgüllü tek satırı kopyalar.
  // mailler: metin ya da { mail, tikladi: [oyun adları] } (rehberde "katıl"a bastığı oyunlar etiket olarak görünür)
  function mailListe(mailler, eski) {
    return '<ol class="tk-mail-kod' + (eski ? ' tk-mail-eski' : '') + '">' + mailler.map(function (m) {
      if (typeof m === 'string') return '<li>' + esc(m) + '</li>';
      var et = (m.tikladi || []).map(function (o) { return '<span class="tk-etiket">' + esc(o) + '</span>'; }).join('');
      return '<li><span class="tk-mail-satir"><span>' + esc(m.mail) + '</span>' +
        (et ? '<span class="tk-etiketler">' + et + '</span>' : '<span class="tk-etiketler tk-etiket-yok">' + t('Henüz katıl’a basmadı', 'No join click yet') + '</span>') + '</span></li>';
    }).join('') + '</ol>';
  }
  var DURUM = { bekliyor: ['Onay bekliyor', 'Awaiting approval'], onayli: ['Testte', 'In testing'], red: ['Reddedildi', 'Rejected'], kapali: ['Kapalı', 'Closed'] };
  var IKON_KOPYA = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var IKON_TAMAM = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // Liste başlığı: küçük etiket + sayı rozeti (tur: yeni | eski | bekle)
  function grupBas(etiket, n, tur) { return '<div class="tk-grup-bas"><span>' + etiket + '</span><span class="tk-sayi tk-sayi-' + tur + '">' + n + '</span></div>'; }
  function kopyaDugme(liste) { return '<button type="button" class="btn tk-kopyala" data-kopya="' + liste + '">' + IKON_KOPYA + '<span>' + t('Listeyi kopyala', 'Copy list') + '</span></button>'; }
  function durumEt(durum) { var d = DURUM[durum] || [durum, durum]; return '<span class="tk-durum tk-durum-' + esc(durum) + '">' + t(d[0], d[1]) + '</span>'; }

  function hesapCiz() {
    var kutu = $('tkHesap');
    if (!jetonAl()) {
      kutu.innerHTML = '<p>' + t('Uygulamalarını ve başvuranların mail adreslerini görmek, ya da günlük test sorunu cevaplamak için mail adresinle gir (sadece test ediyorsan şifre gerekmez).', 'Sign in with your email to see your apps and applicants’ email addresses, or to answer your daily test question (no password needed if you only test).') + '</p>' +
        '<button type="button" class="btn primary" id="tkGirisAc">' + t('Giriş yap', 'Sign in') + '</button>';
      $('tkGirisAc').onclick = function () { girisAc(''); };
      return;
    }
    api({ is: 'ben', jeton: jetonAl() }).then(function (r) {
      if (r.hata === 'oturum') { jetonYaz(null); return hesapCiz(); }
      if (r.hata) { mesaj(kutu, hataMetni(r.hata), 'hata'); return; }
      var html = '<div class="tk-hesap-ust"><span>' + t('Giriş yapan', 'Signed in as') + ' <b>' + esc(r.uye.gmail) + '</b></span><button type="button" class="btn" id="tkCikis">' + t('Çıkış', 'Sign out') + '</button></div>';

      if (r.play_rehber) {
        // Test rehberinden (/test/) gelen Android adresleri: Play'deki ortak "Kapalı Tester Grubu" listesine eklenecekler
        var bek = r.play_rehber.filter(function (p) { return !p.eklendi; });
        var ekl = r.play_rehber.filter(function (p) { return p.eklendi; });
        html += '<h3>' + t('Test rehberinden gelen Android testçiler', 'Android testers from the testing guide') + '</h3><div class="tk-kart tk-uyg"><div>';
        if (bek.length) {
          var bl = bek.map(function (p) { return esc(p.mail); }).join(', ');
          var son = Math.max.apply(null, bek.map(function (p) { return p.no; }));
          html += grupBas(t('Listeye eklenmeyi bekleyen', 'Waiting to be added'), bek.length, 'bekle') + mailListe(bek, false) +
            '<div class="tk-eylem">' + kopyaDugme(bl) +
            '<button type="button" class="btn primary" data-play-son="' + son + '">' + IKON_TAMAM + '<span>' + t('Hepsini ekledim', 'I added them all') + '</span></button></div>' +
            '<small class="muted tk-ipucu-alt">' + t('Play Console → Hesabı yönetme → Test kullanıcısı grupları → Kapalı Tester Grubu → yapıştır → Kaydet.', 'Play Console → Manage account → Tester lists → Kapalı Tester Grubu → paste → Save.') + '</small>';
        } else {
          html += '<p class="tk-bos">' + t('Bekleyen adres yok.', 'Nothing waiting.') + '</p>';
        }
        if (ekl.length) html += grupBas(t('Listeye eklenenler', 'Added'), ekl.length, 'eski') + mailListe(ekl, true);
        html += '</div></div>';
      }

      if (r.rehber_tik && r.rehber_tik.length) {
        // Test rehberindeki "TestFlight'ta katıl" / "Teste katıl" tıklamaları: farklı kişi ve toplam tıklama
        html += '<h3>' + t('Test rehberi tıklamaları', 'Testing guide clicks') + '</h3><div class="tk-kart tk-uyg"><div><div class="tk-tablo-sar"><table class="tk-tablo"><thead><tr><th>' +
          t('Oyun', 'Game') + '</th><th>' + t('Kişi', 'People') + '</th><th>' + t('Tıklama', 'Clicks') + '</th><th>' + t('Bilinen mail', 'Known email') + '</th></tr></thead><tbody>' +
          r.rehber_tik.map(function (x) {
            return '<tr><td>' + esc(x.ad || x.oyun) + ' <span class="tk-etiket">' + (x.platform === 'ios' ? 'iPhone' : 'Android') + '</span></td><td><b>' + x.kisi + '</b></td><td>' + x.tiklama + '</td><td>' +
              (x.mailler.length ? x.mailler.map(esc).join('<br>') : '<span class="muted">—</span>') + '</td></tr>';
          }).join('') + '</tbody></table></div><small class="muted tk-ipucu-alt">' +
          t('Kişi: aynı tarayıcıdan gelen tıklamalar bir kişi sayılır. Mail yalnız kişi rehberde ya da kulüpte kendi yazdıysa görünür.', 'People: clicks from the same browser count once. Email shows only if the person typed it in the guide or the club.') +
          '</small></div></div>';
      }

      if (r.uygulamalar.length) {
        html += '<h3>' + t('Uygulamalarım', 'My apps') + '</h3>';
        r.uygulamalar.forEach(function (a) {
          var ekl = a.eklenenler || [];
          html += '<div class="tk-kart tk-uyg"><div><div class="tk-uyg-bas"><b>' + esc(a.ad) + '</b>' + durumEt(a.durum) + '</div>' +
            '<small class="tk-meta">' + (a.basvuranlar.length + ekl.length) + '/' + a.istenen + ' ' + t('kişi', 'people') + ' · ' + (a.tiklama || 0) + ' ' + t('tıklama', 'clicks') + '</small>';
          var yer = a.platform === 'android' ? t('Play Console → Kapalı test → Test kullanıcıları listesine yapıştır.', 'Paste into Play Console → Closed testing → Testers.')
                  : a.platform === 'ios' ? t('App Store Connect → TestFlight → Harici test grubuna ekle.', 'Add to App Store Connect → TestFlight → external group.') : '';
          if (a.basvuranlar.length) {
            var liste = a.basvuranlar.map(esc).join(', ');
            html += grupBas(t('Yeni başvuranlar', 'New applicants'), a.basvuranlar.length, 'yeni') + mailListe(a.basvuranlar, false) +
              '<div class="tk-eylem">' + kopyaDugme(liste) +
              '<button type="button" class="btn primary" data-liste-eklendi="' + esc(a.id) + '">' + IKON_TAMAM + '<span>' + t('Ekledim', 'Added') + '</span></button></div>' +
              (yer ? '<small class="muted tk-ipucu-alt">' + yer + ' ' + t('Sonra "Ekledim"e bas; adresler aşağıya iner.', 'Then tap "Added"; they move below.') + '</small>' : '');
          } else {
            html += '<p class="tk-bos">' + t(ekl.length ? 'Yeni başvuran yok.' : 'Henüz başvuran yok.', ekl.length ? 'No new applicants.' : 'No applicants yet.') + '</p>';
          }
          if (ekl.length) html += grupBas(t('Listeye eklenenler', 'Already added'), ekl.length, 'eski') + mailListe(ekl, true);
          // Canlı mağaza linki + testten çıkar / teste geri al
          html += '<div class="tk-uyg-alt">' +
            (a.canli_link ? '<a class="btn" href="' + esc(a.canli_link) + '" target="_blank" rel="noopener">' + t('Canlı uygulamayı aç', 'Open live app') + ' ↗</a>' : '') +
            '<button type="button" class="btn" data-canli-ac="' + esc(a.id) + '">' + (a.canli_link ? t('Linki değiştir', 'Change link') : '+ ' + t('Canlı link ekle', 'Add live link')) + '</button>' +
            '<span class="tk-bosluk"></span>' +
            (a.durum === 'kapali' ? '<button type="button" class="btn" data-teste-al="' + esc(a.id) + '">' + t('Teste geri al', 'Back to testing') + '</button>'
             : a.durum === 'red' ? '' : '<button type="button" class="btn tk-tehlike" data-testten-cikar="' + esc(a.id) + '" data-ad="' + esc(a.ad) + '">' + t('Testten çıkar', 'Remove from testing') + '</button>') +
            '<form class="tk-canli-form" data-canli-form="' + esc(a.id) + '" hidden><input name="link" type="url" value="' + esc(a.canli_link || '') + '" placeholder="' +
              (a.platform === 'android' ? 'https://play.google.com/store/apps/details?id=…' : a.platform === 'ios' ? 'https://apps.apple.com/tr/app/…/id…' : 'https://…') + '">' +
              '<button class="btn primary" type="submit">' + t('Kaydet', 'Save') + '</button><div class="tk-canli-sonuc"></div></form>' +
            '</div>';
          html += '</div></div>';
        });
      }

      var aktif = r.testler.filter(function (x) { return x.durum === 'aktif'; });
      if (aktif.length) {
        html += '<h3>' + t('Testlerim', 'My tests') + '</h3>';
        aktif.forEach(function (x) {
          html += '<div class="tk-kart"><div><b>' + esc(x.ad) + '</b> <small>' + x.dogru_gun + '/14 ' + t('gün', 'days') + '</small> ' +
            '<a href="' + esc(x.link) + '" target="_blank" rel="noopener">' + t('Test linki', 'Test link') + ' ↗</a>' +
            '<div id="tkYok-' + esc(x.id) + '"></div></div>' +
            (x.bugun_yapildi ? '<span class="btn soon tk-eylem">' + IKON_TAMAM + '<span>' + t('Bugün tamam', 'Done today') + '</span></span>'
                             : '<button type="button" class="btn primary" data-soru="' + esc(x.id) + '">' + t('Günün sorusu', "Today's question") + '</button>') +
            '</div>';
        });
      }
      if (!r.uygulamalar.length && !aktif.length) html += '<p class="muted">' + t('Henüz uygulaman ya da aktif testin yok. Yukarıdan bir teste katıl ya da uygulamanı ekle!', 'No apps or active tests yet. Join a test above or add your app!') + '</p>';
      kutu.innerHTML = html;
      $('tkCikis').onclick = function () { jetonYaz(null); mailYaz(null); hesapCiz(); };
    });
  }

  function soruAc(testId) {
    var yer = $('tkYok-' + testId);
    api({ is: 'soru', jeton: jetonAl(), test: testId }).then(function (r) {
      if (r.hata) { mesaj(yer, hataMetni(r.hata), 'hata'); return; }
      yer.innerHTML = '<form class="tk-yoklama" data-test="' + esc(testId) + '" data-soru="' + esc(r.soru_id) + '">' +
        '<p>❓ ' + esc(r.soru) + '</p><input name="cevap" required maxlength="200" placeholder="' + 'Cevabın' + '" aria-label="Cevap">' +
        '<input name="yorum" maxlength="500" placeholder="Yorum (isteğe bağlı)" aria-label="Yorum">' +
        '<button class="btn primary" type="submit">' + t('Gönder', 'Send') + '</button><small class="muted">' + t('Tek deneme hakkın var.', 'You get one try.') + '</small></form>';
    });
  }
  function yoklamaGonder(f) {
    api({ is: 'yoklama', jeton: jetonAl(), test: f.dataset.test, soru: f.dataset.soru, cevap: f.cevap.value, yorum: f.yorum.value }).then(function (r) {
      var yer = f.parentNode;
      if (r.hata) { mesaj(yer, hataMetni(r.hata), 'hata'); return; }
      mesaj(yer, r.sonuc === 'tamamlandi' ? '🏆 ' + t('14 günü tamamladın, +1 kredi!', 'You finished 14 days, +1 credit!')
               : r.sonuc === 'dogru' ? '✅ ' + t('Doğru! Yarın görüşürüz.', 'Correct! See you tomorrow.')
               : '❌ ' + t('Cevap tutmadı; bu gün sayılmadı. Yarın yeni soru gelir.', "That didn't match; today doesn't count. New question tomorrow."), r.sonuc === 'yanlis' ? 'hata' : 'tamam');
      setTimeout(hesapCiz, 2500);
    });
  }

  // "Ekledim": sunucuyu beklemeden yeni adresleri hemen "eklenenler"e taşı; ardından hesap arkada yenilenir.
  function hemenIndir(btn) {
    var kart = btn.closest('.tk-kart > div');
    if (!kart) return;
    function oku(sec) { return Array.prototype.map.call(kart.querySelectorAll(sec + ' li'), function (li) { var m = li.querySelector('.tk-mail-satir > span'); return (m || li).textContent; }); }
    var yeni = oku('.tk-mail-kod:not(.tk-mail-eski)');
    var eski = oku('.tk-mail-eski');
    var hepsi = eski.concat(yeni.filter(function (m) { return eski.indexOf(m) < 0; }));
    Array.prototype.slice.call(kart.querySelectorAll('.tk-grup-bas, .tk-mail-kod, .tk-eylem, .tk-ipucu-alt, .tk-bos'))
      .forEach(function (el) { el.remove(); });
    var alt = kart.querySelector('.tk-uyg-alt');
    (alt || kart).insertAdjacentHTML(alt ? 'beforebegin' : 'beforeend', '<p class="tk-bos">' + t('Yeni başvuran yok.', 'No new applicants.') + '</p>' +
      grupBas(t('Listeye eklenenler', 'Already added'), hepsi.length, 'eski') + mailListe(hepsi, true));
  }

  // --- olaylar -----------------------------------------------------------------------------------
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-mail-degistir]')) { mailYaz(null); mesaj($('tkKatilSonuc'), ''); return; }
    var ca = e.target.closest('[data-canli-ac]');
    if (ca) { var f = document.querySelector('[data-canli-form="' + ca.dataset.canliAc + '"]'); f.hidden = !f.hidden; if (!f.hidden) f.link.focus(); return; }
    var tc = e.target.closest('[data-testten-cikar]');
    if (tc) {
      if (!window.confirm(t(tc.dataset.ad + ' testten çıkarılsın mı? Listeden kalkar, süren testler iptal olur (kimse ceza almaz). İstersen sonra geri alabilirsin.',
                            'Remove ' + tc.dataset.ad + ' from testing? It leaves the list and running tests are cancelled (no penalties). You can bring it back later.'))) return;
      tc.disabled = true;
      api({ is: 'testten_cikar', jeton: jetonAl(), uygulama: tc.dataset.testtenCikar }).then(function () { hesapCiz(); listeCiz(); });
      return;
    }
    var ta = e.target.closest('[data-teste-al]');
    if (ta) { ta.disabled = true; api({ is: 'teste_al', jeton: jetonAl(), uygulama: ta.dataset.testeAl }).then(function () { hesapCiz(); listeCiz(); }); return; }
    var le = e.target.closest('[data-liste-eklendi]');
    if (le) { hemenIndir(le); api({ is: 'liste_eklendi', jeton: jetonAl(), uygulama: le.dataset.listeEklendi }).then(function () { hesapCiz(); }); return; }
    var pe = e.target.closest('[data-play-son]');
    if (pe) { hemenIndir(pe); api({ is: 'play_eklendi', jeton: jetonAl(), son: pe.dataset.playSon }).then(function () { hesapCiz(); }); return; }
    var b = e.target.closest('[data-katil],[data-soru],[data-kopya],#tkSoruEkle');
    if (!b) return;
    if (b.id === 'tkSoruEkle') { soruSatiri(); return; }
    if (b.dataset.katil) katil(b.dataset.katil, b.dataset.ad);
    else if (b.dataset.soru && b.tagName === 'BUTTON') soruAc(b.dataset.soru);
    else if (b.dataset.kopya) {
      var metin = b.dataset.kopya;
      (navigator.clipboard ? navigator.clipboard.writeText(metin) : Promise.reject()).then(function () {
        var once = b.innerHTML;
        b.innerHTML = IKON_TAMAM + '<span>' + t('Kopyalandı', 'Copied') + '</span>';
        b.classList.add('is-ok');
        setTimeout(function () { b.innerHTML = once; b.classList.remove('is-ok'); }, 1800);
      }).catch(function () { window.prompt('Kopyala / Copy', metin); });
    }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.classList.contains('tk-yoklama')) { e.preventDefault(); yoklamaGonder(e.target); }
    var cf = e.target.closest('[data-canli-form]');
    if (cf) {
      e.preventDefault();
      api({ is: 'canli_link', jeton: jetonAl(), uygulama: cf.dataset.canliForm, link: cf.link.value }).then(function (r) {
        if (r.hata) { mesaj(cf.querySelector('.tk-canli-sonuc'), hataMetni(r.hata), 'hata'); return; }
        hesapCiz(); listeCiz();
      });
    }
  });

  // --- Şifre belirle / şifremi unuttum (maile tek kullanımlık bağlantı) ---------------------------
  function sifreAc(kod) {
    var k = $('tkSifre'); k.hidden = false;
    $('tkSifreIsteForm').hidden = !!kod; $('tkSifreBelirleForm').hidden = !kod;
    k.dataset.kod = kod || '';
    k.scrollIntoView({ block: 'center' });
  }
  function sifreIste(e) {
    e.preventDefault();
    var f = e.target, kutu = $('tkSifreSonuc');
    api({ is: 'sifre_iste', gmail: f.gmail.value.trim() }).then(function (r) {
      if (r.hata) { mesaj(kutu, hataMetni(r.hata), 'hata'); return; }
      mesaj(kutu, '📬 ' + t('Bu adres kayıtlıysa mailine bir bağlantı gönderdik. Gelmezse gereksiz (spam) klasörüne de bak; bağlantı 1 saat geçerli.', 'If this address is registered, we sent a link to your email. Check your spam folder too; the link is valid for 1 hour.'), 'tamam');
    });
  }
  function sifreBelirle(e) {
    e.preventDefault();
    var f = e.target, kutu = $('tkSifreSonuc');
    api({ is: 'sifre_belirle', kod: $('tkSifre').dataset.kod, sifre: f.sifre.value }).then(function (r) {
      if (!r.jeton) { mesaj(kutu, hataMetni(r.hata), 'hata'); return; }
      jetonYaz(r.jeton); f.sifre.value = '';
      try { history.replaceState(null, '', location.pathname + '#hesabim'); } catch (x) { /* eski tarayıcı */ }
      $('tkSifre').hidden = true;
      mesaj($('tkGirisSonuc'), '');
      hesapCiz();
      mesaj($('tkKatilSonuc'), '');
    });
  }

  function basla() {
    if (!$('tkListe')) return;
    $('tkSifreUnuttum').onclick = function () { sifreAc(''); };
    $('tkTakasAc').onclick = function () {
      $('tkTakasAc').hidden = true; $('tkSifreAlan').hidden = false;
      var i = $('tkGiris').querySelector('input[name=sifre]'); i.setAttribute('minlength', '6'); i.focus();
    };
    $('tkSifreIsteForm').onsubmit = sifreIste;
    $('tkSifreBelirleForm').onsubmit = sifreBelirle;
    var kod = new URLSearchParams(location.search).get('sifre');
    if (kod) setTimeout(function () { sifreAc(kod); }, 300);
    for (var i = 0; i < 3; i++) soruSatiri();
    $('tkPlAndroid').onchange = $('tkPlIos').onchange = $('tkPlWeb').onchange = platformGoster;
    platformGoster();
    $('tkBasvuru').onsubmit = basvur;
    $('tkGirisForm').onsubmit = giris;
    listeCiz();
    hesapCiz();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', basla); else basla();
})();

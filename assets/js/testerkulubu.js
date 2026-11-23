// Tester Kulübü web paneli (/testerkulubu/). Sunucu: Supabase Edge Function tk-web (mail + şifre, imzalı jeton).
// Sayfada gizli anahtar yok; tüm kurallar sunucuda (kredi, kredisiz 3 hak, 100 kişi, yönetici onayı).
(function () {
  'use strict';
  var API = 'https://wgcrjolzmyvdtunnypgs.supabase.co/functions/v1/tk-web';
  var JETON = 'tk-jeton';

  // --- yardımcılar -----------------------------------------------------------------------------
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function t(tr, en) { return '<span class="tr">' + tr + '</span><span class="en">' + (en || tr) + '</span>'; }
  function jetonAl() { try { return localStorage.getItem(JETON); } catch (e) { return null; } }
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
    tk_mail_dogrula: ['Bu mail adresiyle daha önce test etmişsin. Uygulama eklemek için şifreni maile gelecek linkle belirlemen gerekiyor (bu özellik çok yakında).', 'You tested with this email before. To add an app, set your password via a link sent to your email (coming very soon).'],
    tk_soru_az: ['En az 3 kontrol sorusu gerekiyor.', 'At least 3 check questions are required.'],
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
      var gruplar = [['android', '🤖 Android'], ['ios', '🍏 iPhone']];
      var html = '';
      gruplar.forEach(function (g) {
        var liste = r.uygulamalar.filter(function (a) { return a.platform === g[0]; });
        if (!liste.length) return;
        html += '<h3 class="tk-grup">' + g[1] + '</h3><div class="tk-kartlar">';
        liste.forEach(function (a) {
          html += '<div class="tk-kart"><div><b>' + esc(a.ad) + '</b>' +
            (a.aciklama ? '<p>' + esc(a.aciklama) + '</p>' : '') +
            '<small>' + a.katilan + '/' + a.istenen + ' ' + t('kişi', 'people') + '</small></div>' +
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
    if (!jetonAl()) { bekleyenKatilim = { id: id, ad: ad }; girisAc(t('<b>' + esc(ad) + '</b> testine katılmak için mail adresini yaz. Şifre gerekmez.', 'Enter your email to join <b>' + esc(ad) + '</b>. No password needed.'), true); return; }
    katilSonuc(id, api({ is: 'katil', jeton: jetonAl(), uygulama: id }));
  }
  function katilSonuc(id, istek) {
    istek.then(function (r) {
      if (r.hata === 'oturum') { jetonYaz(null); return katil(id, ''); }
      if (r.jeton) jetonYaz(r.jeton);
      var kutu = $('tkKatilSonuc');
      if (r.hata) { mesaj(kutu, hataMetni(r.hata), 'hata'); kutu.scrollIntoView({ block: 'center' }); return; }
      mesaj(kutu, '🎉 ' + t('<b>' + esc(r.ad) + '</b> testine katıldın!', 'You joined <b>' + esc(r.ad) + '</b>!') + '<br>' +
        (r.platform === 'android'
          ? t('Geliştirici mail adresini (' + esc(r.gmail) + ') test listesine ekleyecek. Sonra bu linkten katılıp kur:', 'The developer will add your email (' + esc(r.gmail) + ') to the tester list. Then join and install here:')
          : t('TestFlight linkinden kur:', 'Install from TestFlight:')) +
        ' <a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + t('Test linkini aç', 'Open test link') + ' ↗</a><br>' +
        (r.oturum_yok
          ? (r.telegram ? t('Günün sorusu her sabah Telegram botundan gelecek.', 'Your daily question will come from the Telegram bot each morning.')
                        : t('Günün sorusunu cevaplamak için <b>Hesabım</b> bölümünden mail adresin ve şifrenle gir.', 'Sign in under <b>My account</b> with your email and password to answer the daily question.'))
          : t('Her gün aşağıdaki <b>Hesabım</b> bölümünden günün sorusunu cevapla; 14 gün = +1 kredi.', 'Answer the daily question under <b>My account</b> below; 14 days = +1 credit.')), 'tamam');
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
  }
  function basvur(e) {
    e.preventDefault();
    var f = e.target, sonuc = $('tkBasvuruSonuc');
    var platformlar = [];
    if ($('tkPlAndroid').checked) platformlar.push('android');
    if ($('tkPlIos').checked) platformlar.push('ios');
    var sorular = Array.prototype.map.call(document.querySelectorAll('#tkSorular .tk-soru'), function (s) {
      var i = s.querySelectorAll('input'); return { soru: i[0].value.trim(), cevap: i[1].value.trim() };
    }).filter(function (s) { return s.soru && s.cevap; });
    var veri = {
      is: 'basvur', gmail: f.gmail.value.trim(), sifre: f.sifre.value, ad: f.ad.value.trim(), aciklama: f.aciklama.value.trim(),
      platformlar: platformlar, linkler: { android: f.linkAndroid.value.trim(), ios: f.linkIos.value.trim() },
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
      if (r.tamam) { f.ad.value = ''; f.aciklama.value = ''; f.linkAndroid.value = ''; f.linkIos.value = ''; hesapCiz(); }
    });
  }

  // --- 3) Hesabım: kendi uygulamaları (başvuran mailleri, tıklama) + testlerim (günlük yoklama) -
  function girisAc(not, katilimMi) {
    var k = $('tkGiris');
    k.hidden = false;
    k.dataset.mod = katilimMi ? 'katil' : 'giris';
    $('tkSifreAlan').hidden = !!katilimMi;
    $('tkGirisNot').innerHTML = not || '';
    k.scrollIntoView({ block: 'center' });
    k.querySelector('input[name=gmail]').focus();
  }
  function giris(e) {
    e.preventDefault();
    var f = e.target, kutu = $('tkGirisSonuc');
    if ($('tkGiris').dataset.mod === 'katil' && bekleyenKatilim) {   // yalnız mail adresiyle teste katıl
      var b = bekleyenKatilim;
      api({ is: 'katil_gmail', gmail: f.gmail.value.trim(), uygulama: b.id }).then(function (r) {
        if (r.hata && !r.test) { mesaj(kutu, hataMetni(r.hata), 'hata'); return; }
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
  var DURUM = { bekliyor: ['⏳ Onay bekliyor', '⏳ Awaiting approval'], onayli: ['🟢 Testte', '🟢 In testing'], red: ['❌ Reddedildi', '❌ Rejected'], kapali: ['⚪ Kapalı', '⚪ Closed'] };

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
      var html = '<div class="tk-hesap-ust"><span>👤 <b>' + esc(r.uye.gmail) + '</b></span><button type="button" class="btn" id="tkCikis">' + t('Çıkış', 'Sign out') + '</button></div>';

      if (r.uygulamalar.length) {
        html += '<h3>' + t('Uygulamalarım', 'My apps') + '</h3>';
        r.uygulamalar.forEach(function (a) {
          var d = DURUM[a.durum] || [a.durum, a.durum];
          html += '<div class="tk-kart tk-uyg"><div><b>' + esc(a.ad) + '</b> <small>' + t(d[0], d[1]) + ' · ' +
            a.basvuranlar.length + '/' + a.istenen + ' ' + t('kişi', 'people') + ' · 👆 ' + (a.tiklama || 0) + ' ' + t('tıklama', 'clicks') + '</small>';
          if (a.basvuranlar.length) {
            var liste = a.basvuranlar.map(esc).join(', ');
            html += '<p class="tk-mailler">' + t('Başvuranlar', 'Applicants') + ':</p><code class="tk-mail-kod">' + liste + '</code>' +
              '<button type="button" class="btn tk-kopyala" data-kopya="' + liste + '">' + t('Listeyi kopyala', 'Copy list') + '</button>';
            if (a.platform === 'android') html += '<small class="muted">' + t('Play Console → Kapalı test → Test kullanıcıları listesine yapıştır.', 'Paste into Play Console → Closed testing → Testers.') + '</small>';
          } else {
            html += '<p class="muted">' + t('Henüz başvuran yok.', 'No applicants yet.') + '</p>';
          }
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
            (x.bugun_yapildi ? '<span class="btn soon">✅ ' + t('Bugün tamam', 'Done today') + '</span>'
                             : '<button type="button" class="btn primary" data-soru="' + esc(x.id) + '">' + t('Günün sorusu', "Today's question") + '</button>') +
            '</div>';
        });
      }
      if (!r.uygulamalar.length && !aktif.length) html += '<p class="muted">' + t('Henüz uygulaman ya da aktif testin yok. Yukarıdan bir teste katıl ya da uygulamanı ekle!', 'No apps or active tests yet. Join a test above or add your app!') + '</p>';
      kutu.innerHTML = html;
      $('tkCikis').onclick = function () { jetonYaz(null); hesapCiz(); };
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

  // --- olaylar -----------------------------------------------------------------------------------
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-katil],[data-soru],[data-kopya],#tkSoruEkle');
    if (!b) return;
    if (b.id === 'tkSoruEkle') { soruSatiri(); return; }
    if (b.dataset.katil) katil(b.dataset.katil, b.dataset.ad);
    else if (b.dataset.soru && b.tagName === 'BUTTON') soruAc(b.dataset.soru);
    else if (b.dataset.kopya) {
      var metin = b.dataset.kopya;
      (navigator.clipboard ? navigator.clipboard.writeText(metin) : Promise.reject()).then(function () {
        b.innerHTML = '✓ ' + t('Kopyalandı', 'Copied');
      }).catch(function () { window.prompt('Kopyala / Copy', metin); });
    }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.classList.contains('tk-yoklama')) { e.preventDefault(); yoklamaGonder(e.target); }
  });

  function basla() {
    if (!$('tkListe')) return;
    for (var i = 0; i < 3; i++) soruSatiri();
    $('tkPlAndroid').onchange = $('tkPlIos').onchange = platformGoster;
    platformGoster();
    $('tkBasvuru').onsubmit = basvur;
    $('tkGirisForm').onsubmit = giris;
    listeCiz();
    hesapCiz();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', basla); else basla();
})();

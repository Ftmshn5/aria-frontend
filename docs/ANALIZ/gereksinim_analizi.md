# 🎵 ARIA - Ürün Gereksinim Belgesi (PRD)

**Proje Adı:** ARIA (Duygu Odaklı Müzik Kürasyonu)
**Frontend Sorumlusu:** Fatma Hanım
**Tarih:** 2026-04-01
**Versiyon:** 1.0

---

## 📌 1. Proje Özeti
Kullanıcının anlık duygu durumunu doğal dille ifade ettiği (metin), yapay zeka tarafından analiz edilerek bu duyguya en uygun şarkıların önerildiği hibrit bir müzik öneri sistemidir. Sistem RAG (Retrieval-Augmented Generation) ve Akıllı Negatif Filtreleme üzerine kuruludur.

**İlgili Modül:** Biz yalnızca bu sistemin son kullanıcıya (web) yansıyan **Frontend** arayüzünü geliştireceğiz.

## 👥 2. Hedef Kitle ve Platform
- **Hedef Kitle:** Sadece web kullanıcıları (Masaüstü ve Mobil tam uyumlu/Responsive)
- **Dil:** Sadece Türkçe
- **Erişilebilirlik:** Özel bir gereksinim (Ekran okuyucu vb.) bulunmamaktadır.

## 🎨 3. Görsel Kimlik ve Tasarım (UI/UX)
- **Tema:** Dark Theme (Spotify İlhamlı)
- **Renk Paleti:**
  - `Void Eclipse (#0B0B0B)` : Ana Arka Plan
  - `Abyss Blue (#2B396D)` : Vurgu / Accent Rengi
  - `Silver Mist (#E4E4E4)` : Metin ve Açık Tonlar
- **Logo:** Yukarıdaki renk paletine uygun, tipografik/minimalist bir "ARIA" logosu tasarlanacaktır.

## 📄 4. Sayfa Yapısı ve Akış (MVP)

Proje sunumunda kesinlikle çalışması gereken 5 temel sayfa:

1. **Landing Page (Karşılama Sayfası)**
   - Login'den bağımsız, projeyi tanıtan vitrin sayfası.
2. **Login Page (Giriş Sayfası)**
   - Giriş yöntemi: E-posta / Şifre.
   - Kayıt bilgileri: Ad, Soyad, E-posta, Şifre.
3. **Home Page (Ana Sayfa)**
   - Son dinlenen şarkılar
   - Günlük mood (duygu) önerisi
   - Popüler şarkılar
   - Arama çubuğu
4. **Analysis & Suggestion Page (Duygu Analizi ve Öneri)**
   - Kullanıcının doğrudan doğal dille anlık duygu durumunu yazdığı metin kutusu.
   - Analiz sonucu dönen şarkı listelerinin (Spotify API Embed formatında) tek sayfada gösterilmesi.
5. **Profile Page (Profil Sayfası)**
   - Kullanıcı bilgileri
   - Geçmiş dinlemeler / duygu geçmişi
   - Favori (kaydedilen) playlist'ler

## ⚙️ 5. Teknik Altyapı
- **Frontend Framework:** React.js
- **Müzik Oynatıcı:** Spotify API Embed (Şarkılar liste üzerinden doğrudan çalınabilecek)
- **Backend API:** FastAPI (Henüz hazır olmadığı için frontend geliştirmeleri %100 "Dummy Veri" ile yapılacaktır).
- **Frontend Çalışma Ortamı:** HAVSAN Standartları gereği tüm local süreç **Docker** (docker-compose.yml) üzerinden yürütülecektir.

## 🔄 6. Etkileşimler
- Şarkı listelerinde kullanıcıya sunulacak eylemler:
  - Şarkıyı Çalma (Play/Pause)
  - Beğenme / Beğenmeme (Like/Dislike - Filtreleme için önemli)
  - Özel çalma listesine (Playlist) ekleme
  - Paylaşma

---
*Bu doküman `analiz_master.md` dosyasındaki kullanıcı onaylı yanıtlardan otomatik derlenmiştir.*

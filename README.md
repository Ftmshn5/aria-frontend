# Aria Frontend - Duygu Odaklı Müzik Kürasyonu Sistemi

🎵 **Kullanıcı anlık duygu durumuna göre kişiselleştirilmiş müzik önerileri sunan web uygulaması**

## 📋 Proje Hakkında

Aria, yapay zeka ve RAG (Retrieval-Augmented Generation) teknolojisini kullanarak kullanıcının anlık psikolojik durumunu anlamlandırıp, en uygun müzikleri dinamik bir şekilde sunabilen hibrit bir müzik öneri sistemidir.

### Özellikleri

✨ **Akıllı Duygu Analizi**: LLM tabanlı doğal dil işleme ile karmaşık duygu durumlarının anlaşılması  
🎯 **Vektör Tabanlı Eşleştirme**: Semantik boşluğu kapatarak daha doğru öneriler  
🚫 **Akıllı Negatif Filtreleme**: Kullanıcının o anki moduna ters düşen şarkıları otomatik dışlama  
📊 **Kişiselleştirilmiş Deneyim**: Geçmiş etkileşimler ve anlık bağlama göre dinamik öneriler  

## 🏗️ Proje Yapısı

```
aria-frontend/
├── public/               # Statik dosyalar
├── src/
│   ├── components/       # React bileşenleri
│   ├── pages/           # Sayfa bileşenleri
│   ├── services/        # API hizmetleri
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # CSS/Styling dosyaları
│   ├── utils/           # Utility fonksiyonları
│   ├── App.tsx          # Ana uygulama bileşeni
│   └── index.tsx        # Giriş noktası
├── .env.example         # Ortam değişkenleri örneği
├── README.md            # Bu dosya
├── package.json         # Proje bağımlılıkları
└── tsconfig.json        # TypeScript konfigurasyonu
```

## 👥 Ekip

- **Bünyamin Başköy** - Backend & RAG Mimarisi
- **Mehmet Sait Dündar** - Vektör Veritabanı & AI
- **Fatma Şahin** - Frontend Geliştirmesi
- **Amir Şeyh Hadir** - DevOps & Deployment

## 🚀 Başlangıç

### Gereksinimler

- Node.js 16+ 
- npm veya yarn
- Git

### Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/Ftmshn5/aria-frontend.git
cd aria-frontend

# Bağımlılıkları yükleyin
npm install

# Ortam dosyasını oluşturun
cp .env.example .env.local

# Geliştirme sunucusunu başlatın
npm start
```

### Build

```bash
npm run build
```

## 📚 Dokümantasyon

- [API Dökümentasyonu](./docs/API.md)
- [Katkıda Bulunma Rehberi](./CONTRIBUTING.md)
- [Araştırma Makalesi](./IEEE_Paper_Duygu_Odakli_Muzik_Kurasyonu_v2.md)

## 🤝 Katkıda Bulunma

Lütfen [CONTRIBUTING.md](./CONTRIBUTING.md) dosyasına bakınız.

## 📄 Lisans

MIT License - Ayrıntılar için [LICENSE](./LICENSE) dosyasına bakınız.

## 📞 İletişim

Sorularınız veya önerileriniz için GitHub Issues'i kullanın.

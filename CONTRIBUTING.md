# Katkıda Bulunma Rehberi

## 🎯 Başlamadan Önce

Bu projede katkı sağlamak istediğiniz için teşekkür ederiz! Lütfen aşağıdaki adımları izleyin.

## 📋 Katkı Süreci

### 1. Fork ve Clone

```bash
# Repository'yi fork edin (GitHub'da Fork butonuna tıklayın)
git clone https://github.com/YOUR_USERNAME/aria-frontend.git
cd aria-frontend
```

### 2. Branch Oluşturun

```bash
git checkout -b feature/aciklama
# veya bug fix için:
git checkout -b bugfix/hatanin-aciklamas
```

**Branch Adlandırma Kuralları:**
- `feature/` - Yeni özellikler
- `bugfix/` - Hata düzeltmeleri
- `docs/` - Dokümantasyon güncellemeleri
- `refactor/` - Kod refactoring

### 3. Değişiklikleri Yapın

```bash
# Değişiklikleri yapın ve test edin
npm test
npm run lint
```

### 4. Commit Edin

```bash
git add .
git commit -m "feat: Kısa açıklama"
```

**Commit Mesajı Kuralları:**
- `feat:` - Yeni özellik
- `fix:` - Hata düzeltmesi
- `docs:` - Dokümantasyon
- `style:` - Kod stili
- `refactor:` - Kod refactoring
- `test:` - Test ekleme

### 5. Push ve Pull Request

```bash
git push origin feature/aciklama
```

GitHub'da Pull Request açın ve açıklamasını düzenleyin.

## ✅ Kod Standartları

- TypeScript kullanılır
- ESLint ve Prettier ayarlarına uyulmalıdır
- Tüm bileşenlerin açıklaması olmalıdır
- Tests yazılmalıdır

### Code Style

```bash
npm run format
npm run lint
```

## 🧪 Testing

```bash
npm test              # Testleri çalıştır
npm run test:watch   # Watch modunda testleri çalıştır
npm run test:coverage # Coverage raporu
```

## 📝 Dokümantasyon

Yeni özellik eklerken ilgili dokümantasyonu güncelleyin.

## 🐛 Bug Raporlama

Issues kısmında yeni bir issue açın ve şunu ekleyin:

1. **Açıklama**: Ne olması gerekiyordu, ne oldu?
2. **Adımlar**: Hatayı tekil adımlar
3. **Beklenen Sonuç**: Ne olması gerekiyordu?
4. **Gerçek Sonuç**: Ne oldu?
5. **Ortam**: İşletim sistemi, Node sürümü, browser vb.

## 💬 Sorular?

Issues veya Discussions kullanarak soru sorun.

---

**Kod paylaşmak için teşekkür ederiz!** 🎉

# serkan.works

Kişisel site — Astro 5, Apple-esinli sade tasarım, Cloudflare Workers'a statik deploy.

## Sayfa haritası

| Yol | Kaynak |
|---|---|
| `/` | `src/pages/index.astro` — hero, hakkında, featured işler, otomasyon, foto şeridi, notlar, stack, hobiler |
| `/projects` | `src/pages/projects/index.astro` — tüm projelerin kompakt listesi |
| `/projects/[slug]` | `src/content/projects/*.md` — case study (Problem → Çözüm → Mimari → Dersler) |
| `/photos` + `/photos/[koleksiyon]` | `src/photos/collections.ts` + `public/photos/<id>/` |
| `/notes` + `/notes/[slug]` | `src/content/notes/*.md` — blog |

## İçerik eklemek

- **Proje:** `src/content/projects/` altına `.md` — `title`, `description`, `role`, `year`, `stack`, `order` zorunlu; `cover` (gerçek görsel `/covers/x.png`) veya `coverHue` (gradient), `featured: true` (anasayfadaki 2 büyük kart), `links` opsiyonel.
- **Not/blog:** `src/content/notes/` altına `.md` — `title`, `description`, `pubDate`, `tags`; `cover` opsiyonel.
- **Fotoğraf:** dosyayı `public/photos/<koleksiyon-id>/` altına at, `src/photos/collections.ts` içindeki ilgili koleksiyonun `photos[]` dizisine `{ src: '/photos/<id>/dosya.jpg', alt: '...' }` ekle.
- **Koleksiyon:** `src/photos/collections.ts` içine yeni obje — `id` klasör adıyla aynı olmalı.

## Komutlar

```bash
npm run dev      # lokal geliştirme
npm run build    # dist/ üretir
npm run deploy   # Cloudflare Workers (wrangler)
```

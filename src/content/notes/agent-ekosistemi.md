---
title: 'Sunucuda 7/7 çalışan agent ekosistemi nasıl kurdum'
description: 'Linear issue → branch → PR hattını insansız çalıştırma deneyimlerim: koordinatör, işçi, kokpit üçlüsü.'
pubDate: '2026-10-10'
cover: '/covers/hermes-agent.svg'
tags: ['agentlar', 'self-hosting', 'otomasyon']
---

En çok sorulan şey bu: "Agentlar gerçekten iş bakıyor mu?" Kısa cevap: evet, ama sandığın gibi değil.

Uzun cevap şu üç yazıda. Önce roller: **koordinatör** (Hermes) işi dağıtır ve hafızayı tutar; **işçi** (OpenHands) issue'dan branch'e, branch'ten PR'a giden yolu yürür; **kokpit** (ben) gündüz kendi makinemden kod pushlar ve her şeyi denetler.

Üç kural her şeyi değiştirdi:

1. **İnsan onayı kalkmaz, ucuzlar.** Diff küçük ve açıklama netse onay saniyeler sürüyor.
2. **Issue kalitesi = çıktı kalitesi.** Kötü issue → boşa harcanan dakikalar; iyi issue → tek seferde PR.
3. **Paylaşılan dala force-push yok.** Önce fetch, sonra yazarlık kontrolü. Agent da insan da aynı kurala tabi.

Detaylı mimariyi ve güvenlik sınırlarını projenin case study'sinde anlattım: [Hermes & Agent Ekosistemi →](/projects/hermes-agent)

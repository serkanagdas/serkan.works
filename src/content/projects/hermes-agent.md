---
title: 'Hermes & Agent Ekosistemi'
description: 'Linear issue → branch → PR hattını 7/7 çalıştıran, kendi kurdüğüm yapay zeka işçi ekosistemi.'
role: 'Kişisel proje · 7/7'
year: '2025 —'
stack: ['Hermes Agent', 'OpenHands', 'Docker', 'Linear API']
cover: '/covers/hermes-agent.svg'
featured: true
order: 2
---

## Problem

Tekrarlanan işler (bağlantı kontrolü, rapor derleme, ufak feature işleri) günümü yiyor ama hepsini elle yapmak da istemiyorum — çoğu kuralı belli iş. Hedefim net: işi **Linear'da açmak**, gerisini doğrulanabilir bir hattın getirmesi ve son kararı insanın vermesi.

## Kurduğum hat

- **Koordinatör — Hermes:** umbrelOS üzerinde container içinde çalışıyor. Linear, GitHub, cron ve sunucu yönetimi ona bağlı. İşi dağıtır, durumu takip eder, kalıcı hafızayı Obsidian vault'ta tutar.
- **İşçi — OpenHands:** sunucuda 7/7 ayakta. Linear issue gelir, branch açar, kod yazar, PR gönderir. Arayüzü sadece izlemek için açık.
- **Kokpit — ben:** gündüz kendi makinemden feature dallarına kod pushlarım, plan notlarını yazarım, işçilerin çıktısını denetlerim. Paylaşılan dala asla force-push yok; önce fetch + yazarlık kontrolü.

## Nasıl çalışıyor

Issue açılıyor → koordinatör işi uygun işçiye yönlendiriyor → işçi branch açıp PR gönderiyor → merge yalnızca insan onayıyla. İş başlarken Linear'da durum `In Progress`, bittiğinde `In Review`; merge edilince `Done`. İşçi Linear'a doğrudan dokunmuyor — durum geçişlerini koordinatör yönetiyor. Aynı iş iki kez tetiklenmiyor; sent/done durumları tek yol.

## Güvenlik ve sınırlar

Hiçbir agent production'a dokunamaz; ortamlar container izolasyonuyla ayrı. Şirket sunucusunda (EDOOR) agent'ların yapabildiği şeyler beyaz listeyle sınırlı. Vault'taki kurallar hem benim için hem agent'lar için aynı: kimse kuralı atlayamaz.

## Ne öğrendim

Agent sistemlerinde darboğaz model değil, **tanım kalitesi**: kötü yazılmış issue → işçi dakikalarını harcıyor, iyi yazılmış issue → tek seferde PR. İkinci ders: insan onayını kaldırmak değil, onayın maliyetini düşürmek. Diff küçük ve açıklaması netse onay saniyeler sürüyor.

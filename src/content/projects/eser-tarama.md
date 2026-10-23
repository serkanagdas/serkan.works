---
title: 'Eser Tarama'
description: 'Nadir eser dijitalleştirme fabrikası — çok lokasyonlu tarama, sayfa bazlı kabul/red ve kanıtlı iş akışı.'
role: 'Full-stack · mimari + geliştirme'
year: '2025 —'
stack: ['Laravel', 'PostgreSQL', 'Tailwind', 'Queue/Job']
cover: '/covers/eser-tarama.svg'
featured: true
order: 1
---

## Problem

Nadir eserlerin dijitalleştirilmesi tek masada olmuyor: farklı şehirlerdeki tarayıcılar aynı eserin farklı sayfalarını tarıyor, kalite standartları masadan masaya değişiyor ve "bu sayfa neden reddedildi?" sorusunun cevabı hiçbir yerde yazılı değil. Süreç e-posta ve WhatsApp üzerinden yürüyordu; işin kanıtı yoktu, hız ölçülmüyordu, maaş hesabı elle yapılıyordu.

## Nasıl çözüyorum

Eser Tarama, süreci tek bir "fabrika hattına" çeviriyor:

- **Çok lokasyonlu tarama havuzu** — farklı şehirlerdeki ekipler aynı sisteme yük yapıyor; her sayfa eser + folio bazında tek havuzda toplanıyor.
- **Sayfa seviyesinde kabul/red** — kontrolör her sayfayı tek ekranda görüp onaylıyor veya gerekçe yazarak reddediyor. Red gerekçesi kalıcı kayıt.
- **Kanıtlı log** — kim, ne zaman, hangi dosyayı yükledi, kim reddetti: her adım veritabanında. Uyuşmazlık durumunda dakikalar içinde rapor.
- **Maaş ve cihaz raporları** — taranan sayfa sayısından otomatik performans raporu; cihaz bazında verim takibi.

## Mimari

Backend Laravel; ağır işler (thumbnail üretimi, OCR ön işlemi, rapor derleme) queue'da job'larla akıyor. PostgreSQL'de eser → folio → sayfa hiyerarşisi kurulu; her sayfa kaydı state machine gibi ilerliyor: `yuklendi → kontrol → kabul/red`. Tailwind ile yazılan arayüz bilinçli olarak sıkı: kontrolörün tek işi hızlı karar vermek, menülerle vakit kaybetmemek.

## Ne öğrendim

En büyük ders teknik değil, süreç tasarımı oldu: alanın insanları (kontrolörler, tarayıcı operatörleri) sistemi kendileri şekillendirmedikçe hiçbir mimari kabul görmüyor. Red gerekçelerini serbest metin yerine yarı yapılandırılmış listeye çevirmek, rapor kalitesini tek başına iki katına çıkardı.

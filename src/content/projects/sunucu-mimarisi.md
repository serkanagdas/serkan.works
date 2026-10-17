---
title: 'Şirket Sunucusu Mimarisi'
description: 'Tek fiziksel sunucu, Proxmox üzerinde 3 VM: DMZ, iç dünya ve agent laboratuvarı.'
role: 'Altyapı · planlama'
year: '2025 —'
stack: ['Proxmox', 'Traefik', 'Tailscale', 'Cloudflare']
order: 6
---

Tek fiziksel sunucu, Proxmox üzerinde üç VM: DMZ, iç dünya (Tailscale-only) ve agent laboratuvarı. Blast-radius güvenliği: bir katman yanarken diğerleri ayakta kalır.

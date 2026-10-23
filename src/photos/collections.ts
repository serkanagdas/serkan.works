// Fotoğraf koleksiyonları — tek kaynak. Fotoğraf eklemek için:
//  1) Dosyayı public/photos/<koleksiyon-id>/ altına at
//  2) Aşağıda ilgili koleksiyonun photos[] dizisine { src, alt } ekle
// Kapak (cover) verilmezse listede gradient kutu gösterilir.

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

export type PhotoCollection = {
  id: string;
  title: string;
  description: string;
  cover?: string; // /photos/<id>/kapak.jpg
  hue: 'blue' | 'purple' | 'green' | 'amber';
  photos: Photo[];
};

export const photoCollections: PhotoCollection[] = [
  {
    id: 'bisiklet',
    title: 'Bisiklet',
    description: 'Dağ ve yol — sabah turlarından uzun mesafelere.',
    hue: 'green',
    photos: [],
  },
  {
    id: 'saatler',
    title: 'Saatler',
    description: 'Mekanik saat koleksiyonu — kadranlar, fazlar, detaylar.',
    hue: 'blue',
    photos: [],
  },
  {
    id: 'lab',
    title: 'Lab & Sunucu',
    description: 'Sunucu odası, kablo düzeni, agent ekosistemi ve masa düzeni.',
    hue: 'purple',
    photos: [],
  },
  {
    id: 'kamp',
    title: 'Kamp & Doğa',
    description: 'Ekrandan uzak günlerin kareleri.',
    hue: 'amber',
    photos: [],
  },
];

// Put photos in public/pictures/ and add `src` to an entry.
// Entries without a photo show an empty frame with the caption.

export type Picture = {
  title: string;
  caption: string;
  src?: string; // e.g. '/pictures/morning-ride.jpg'
  alt?: string;
};

export const pictures: Picture[] = [
  { title: 'Cycling', caption: 'Early rides, before the city wakes up.' },
  { title: 'Kickboxing', caption: 'Mondays and Wednesdays.' },
  { title: 'Lego', caption: 'Instructions followed, mostly.' },
  { title: 'Games', caption: 'Often on a server set up for the occasion.' },
];

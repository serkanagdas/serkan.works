// Drop photos into public/pictures/ and list them here.
// Each one is shown as ASCII first and "develops" into the photo on hover/tap.
// Entries without `src` render the hand-drawn ASCII placeholder for their tag.

export type Picture = {
  tag: 'cycling' | 'kickboxing' | 'lego' | 'games';
  caption: string;
  src?: string; // e.g. '/pictures/bosphorus-ride.jpg'
  alt?: string;
};

export const pictures: Picture[] = [
  { tag: 'cycling', caption: 'Early ride, before the city wakes up.' },
  { tag: 'kickboxing', caption: 'Monday, Wednesday. Non-negotiable.' },
  { tag: 'lego', caption: 'Instructions followed, mostly.' },
  { tag: 'games', caption: 'Usually on a server I set up for the occasion.' },
];

export const placeholders: Record<Picture['tag'], string> = {
  cycling: String.raw`
           __o
         _ \<_
        (_)/(_)
  ~~~~~~~~~~~~~~~~~~~~`,
  kickboxing: String.raw`
      ________
     /  _  _  \__
    |  | || |    \
    |  |_||_|  _ |
    |         / /
     \_______/_/
     |_______|
     |_______|`,
  lego: String.raw`
     ___________
    / () () () /|
   / () () () / |
  /__________/  |
  |          |  /
  |          | /
  |__________|/`,
  games: String.raw`
    _____________________
   /  _            ( )   \
  | _| |_       ( )  ( )  |
  ||_   _|         ( )    |
  |  |_|    [] []         |
   \       ______        /
    \_____/      \______/`,
};

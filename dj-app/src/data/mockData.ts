import type { User, DJ } from '../interfaces/types';

// --- Mock Data ---
export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  handle: '@arivera',
  role: 'DJ',
  avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
};

export const DJS: DJ[] = [
  {
    id: 1,
    name: 'NEON PULSE',
    handle: '@neonpulse',
    genre: 'Synthwave / Techno',
    location: 'Berlin, Germany',
    bio: 'Blending analog synthesis with modern techno rhythms. Resident at The Void Club.',
    image: 'https://images.unsplash.com/photo-1571266028243-371695039980?auto=format&fit=crop&q=80&w=1000',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2000',
    tracks: [
      { title: 'Midnight City Remix', plays: '124K', duration: '4:20' },
      { title: 'Cyberpunk Dreams', plays: '89K', duration: '3:45' },
    ],
    upcoming: [
      { date: 'Oct 24', venue: 'The Void', city: 'Berlin' },
      { date: 'Nov 02', venue: 'Printworks', city: 'London' }
    ]
  },
  {
    id: 2,
    name: 'LUNA BASS',
    handle: '@lunabass',
    genre: 'Drum & Bass / Jungle',
    location: 'Bristol, UK',
    bio: 'High energy breaks and deep basslines. 10 years shaking soundsystems across the UK.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=2000',
    tracks: [
      { title: 'Bass Face', plays: '210K', duration: '5:12' },
    ],
    upcoming: [
      { date: 'Oct 31', venue: 'Motion', city: 'Bristol' }
    ]
  },
  {
    id: 3,
    name: 'VELVET GROOVE',
    handle: '@velvetg',
    genre: 'Deep House / Disco',
    location: 'Miami, USA',
    bio: 'Sunset vibes and disco balls. Bringing the soul back to the dancefloor.',
    image: 'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&q=80&w=1000',
    cover: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=2000',
    tracks: [
      { title: 'Sunset Boulevard', plays: '45K', duration: '6:05' },
      { title: 'Disco Inferno 2024', plays: '12K', duration: '4:15' },
    ],
    upcoming: []
  }
];

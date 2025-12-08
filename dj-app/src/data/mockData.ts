import type { User, DJ, Genre } from "../interfaces/userTypes";

export const MOCK_USER: User = {
    userId: 123,
    email: 'user@example.com',
    isDjProfileComplete: false, // Start as incomplete
};

const MOCK_GENRE_1: Genre = {
    genreId: 0,
    genreName: "Drum & Bass"
}

export const DJS: DJ[] = [
  {
    djId: 42,
    userId: 100,
    djName: 'ZENIATH',
    bio: 'Selector of deep, melodic house and driving techno. Based in Auckland, NZ.',
    location: 'Auckland, NZ',
    genres: [MOCK_GENRE_1],
    equipment: 'Pioneer CDJ-3000s, A&H Xone 96',
    soundcloudUrl: 'https://soundcloud.com/zeniath',
    instagramUrl: '',
    avatarUrl: 'https://placehold.co/128x128/00e5ff/121212?text=Z',
    bannerUrl: 'https://placehold.co/1200x300/1e1e1e/00e5ff?text=ZENIATH+LIVE',
    isPublic: true,
  },
  {
    djId: 51,
    userId: 101,
    djName: 'Echo Bloom',
    bio: 'Specializing in ambient soundscapes and soulful downtempo beats.',
    location: 'Wellington, NZ',
    genres: [MOCK_GENRE_1],
    equipment: 'Roland SP-404, Ableton Live',
    soundcloudUrl: 'https://soundcloud.com/echobloom',
    instagramUrl: 'https://mixcloud.com/echobloom',
    avatarUrl: 'https://placehold.co/128x128/ff4081/121212?text=E',
    bannerUrl: 'https://placehold.co/1200x300/1e1e1e/ff4081?text=Echo+Bloom',
    isPublic: true,
  },
];
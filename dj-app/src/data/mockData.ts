import type { User, DJ } from "../interfaces/userTypes";

export const MOCK_USER: User = {
    userId: 123,
    email: 'user@example.com',
    isDjProfileComplete: false, // Start as incomplete
};

export const DJS: DJ[] = [
    {
        djId: 42,
        userId: 100,
        djName: 'ZENIATH',
        bio: 'Selector of deep, melodic house and driving techno. Based in Auckland, NZ.',
        location: 'Auckland, NZ',
        genres: ['Melodic Techno', 'Deep House', 'Progressive'],
        equipment: 'Pioneer CDJ-3000s, A&H Xone 96',
        soundcloudUrl: 'https://soundcloud.com/zeniath',
        instagramUrl: '',
        avatarFile: 'https://placehold.co/128x128/00e5ff/121212?text=Z',
        bannerFile: 'https://placehold.co/1200x300/1e1e1e/00e5ff?text=ZENIATH+LIVE',
        isPublic: true
    },
    {
        djId: 51,
        userId: 101,
        djName: 'Echo Bloom',
        bio: 'Specializing in ambient soundscapes and soulful downtempo beats.',
        location: 'Wellington, NZ',
        genres: ['Ambient', 'Downtempo', 'Trip Hop'],
        equipment: 'Roland SP-404, Ableton Live',
        soundcloudUrl: 'https://soundcloud.com/echobloom',
        instagramUrl: 'https://mixcloud.com/echobloom',
        avatarFile: 'https://placehold.co/128x128/ff4081/121212?text=E',
        bannerFile: 'https://placehold.co/1200x300/1e1e1e/ff4081?text=Echo+Bloom',
        isPublic: true
    },
];
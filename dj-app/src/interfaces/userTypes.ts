export interface User {
  userId: number;
  email: string;
  isDjProfileComplete: boolean;
}

// export interface Genres {
//     genres: Genre[];
// }

export interface Genre {
  genreId: number;
  genreName: string;
  subgenres?: Subgenre[] | null;
}

export interface Subgenre {
  subgenreId: number;
  subgenreName: string;
}

export interface DjProfileFormData {
  djName: string;
  bio: string;
  location: string;
  genres: Genre[];
  equipment: string;
  soundcloudUrl?: string;
  instagramUrl?: string;
  avatarUrl?: string;
  bannerUrl?: string;
}

export interface DJ extends DjProfileFormData {
  djId: number;
  userId: number;
  isPublic: boolean;
}

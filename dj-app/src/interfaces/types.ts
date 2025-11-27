// --- INTERFACES & TYPES ---

export interface Gig {
  date: string;
  venue: string;
  city: string;
}

export interface Track {
  title: string;
  plays: string;
  duration: string;
}

export interface DJ {
  id: number;
  name: string;
  handle: string;
  genre: string;
  location: string;
  bio: string;
  image: string;
  cover: string;
  tracks?: Track[];
  upcoming?: Gig[];
}

export interface User {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
}

export type Page = 'home' | 'directory' | 'dj-profile' | 'profile' | 'login' | 'signup' | 'events' | 'create';

export interface HeaderProps {
  user: User | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export interface DirectoryPageProps {
  onSelectDj: (dj: DJ) => void;
}

export interface ProfilePageProps {
  dj: DJ;
  onBack: () => void;
  isOwner: boolean;
}

export interface AuthPageProps {
  onLogin: () => void;
  onSwitch: () => void;
}


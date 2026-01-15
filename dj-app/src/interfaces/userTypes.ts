// // --- Utility Types ---

// /**
//  * Type for the Location fields in the users table.
//  * Corresponds to `city` and `country_code` in the database.
//  */
// export type Location = {
//     city: string | null;
//     countryCode: string | null; // ISO 3166-1 alpha-2
// }

// // --- Main Entity Types ---

// /**
//  * Type for the `users` table.
//  */
// export type User = {
//     id: number;
//     firstName: string;
//     lastName: string;
//     username: string;
//     email: string;
//     imageFilename: string | null;
//     password: string; // Should be handled carefully (never sent to frontend in plain text)
//     authToken: string | null;

//     // Location is structured as a nested object based on your initial definition
//     location: Location;

//     isHidden: boolean; // Corresponds to TINYINT(1)
//     createdAt: Date;   // Corresponds to TIMESTAMP
//     updatedAt: Date;   // Corresponds to TIMESTAMP
// };

// /**
//  * Type for the `genres` table.
//  * Represents a hierarchical genre structure (parent_id references another genre's id).
//  */
// export type Genre = {
//     id: number;
//     name: string;
//     parentId: number | null; // Nullable FK to another Genre
// };

// /**
//  * Type for the `social_network` table.
//  * This is the lookup table defining the available social platforms.
//  */
// export type SocialNetwork = {
//     id: number;
//     slug: string;       // e.g., 'instagram'
//     label: string;      // e.g., 'Instagram'
//     urlMask: string | null; // e.g., 'https://instagram.com/{handle}'
//     handleRe: string | null; // Regex for handle validation
// };

// /**
//  * Type for the `social_links` table.
//  * Links a user to a specific social network with their details.
//  */
// export type SocialLink = {
//     id: number;
//     userId: number;       // FK to User
//     networkId: number;    // FK to SocialNetwork
//     url: string;
//     handle: string | null;
//     isPublic: boolean;    // Corresponds to TINYINT(1)
//     createdAt: Date;
// };

// /**
//  * Type for the `user_genres` junction table.
//  * Used for linking Users and Genres (many-to-many relationship).
//  */
// export type UserGenre = {
//     userId: number;  // FK to User
//     genreId: number; // FK to Genre
// };

// /**
//  * Represents a fully hydrated User profile object often returned by a GET /api/users/{id} endpoint.
//  */
// export type UserProfile = Omit<User, 'password' | 'authToken'> & {
//     // Relationships are typically nested arrays on the frontend object
//     genres: Genre[];
//     socialLinks: Array<SocialLink & {
//         // Embed the SocialNetwork data for easy display (e.g., to show the label and slug)
//         network: SocialNetwork;
//     }>;
// };

// // Example of what the 'password' field would look like if the API only returns the essential User data:
// export type UserPublicData = Omit<User, 'password' | 'authToken' | 'email' | 'isHidden'>;

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
    djId: string;
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
    userId: string;
    email: string;
    password: string;
    token: string;
    firstName?: string | null;
    lastName?: string | null;
    dateOfBirth?: string | null;
}

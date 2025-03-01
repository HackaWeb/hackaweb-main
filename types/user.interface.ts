export interface UserProfile {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    createdAt: string;
    isAdmin?: boolean;
}

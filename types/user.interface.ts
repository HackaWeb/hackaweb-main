export interface UserProfile {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    balance: number;
    createdAt: Date;
    isAdmin?: boolean;
}

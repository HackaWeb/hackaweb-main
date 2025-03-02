export enum ApiKeyType {
    TRELLO_API_KEY = 0,
    TRELLO_SECRET = 1,
    SLACK_API_KEY = 2,
}

export interface ApiKey {
    keyType: ApiKeyType;
    value: string;
}

export interface UserProfile {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    balance: number;
    createdAt: Date;
    isAdmin: boolean;
    keys: ApiKey[];
}

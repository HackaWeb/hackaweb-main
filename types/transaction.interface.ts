export interface Transaction {
    id: string;
    type: number;
    amount: number;
    balance: number;
    transactionDate: string;
    userId: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        userName: string;
        email: string;
        avatarUrl: string;
        createdAt: string;
        refreshToken: string;
        refreshTokenExpiryTime: string;
        notifications: {
            id: string;
            title: string;
            message: string;
            sentAt: string;
            isRead: boolean;
            user: string;
            userId: string;
            senderId: string;
            sender: string;
        }[];
        userTags: {
            id: string;
            userId: string;
            user: string;
            tagId: string;
            tag: {
                id: string;
                name: string;
                userTags: string[];
            };
        }[];
    };
}

import { UserProfile } from "./user.interface";

export interface Transaction {
    type: "deposit" | "withdraw";
    amount: number;
    doneAt: string;
    remainder: number;
    id: string;
    user: UserProfile;
}

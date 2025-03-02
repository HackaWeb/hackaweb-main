import { Transaction } from "@/types/transaction.interface";
import { UserProfile } from "@/types/user.interface";

export interface UserProfileProps {
    profile: UserProfile;
    isEditable: boolean;
    transactions: Transaction[];
}

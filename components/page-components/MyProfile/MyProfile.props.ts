import { UserProfile } from "@/types/user.interface";
import { Transaction } from "@/types/transaction.interface";

export interface MyProfileProps {
    profile: UserProfile;
    transactions: Transaction[];
}

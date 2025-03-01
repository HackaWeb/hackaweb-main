import { UserProfile } from "@/types/user.interface";

export interface ProfileFormProps {
    profile: UserProfile;
    isEditable: boolean;
    isSelfProfile: boolean;
}
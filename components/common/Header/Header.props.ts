import { Locale } from "@/types/locale.type";
import { Theme } from "@/types/theme.type";
import { UserProfile } from "@/types/user.interface";

export interface HeaderProps {
    profile: UserProfile | null;
    theme: Theme | null;
    defaultLocale: Locale;
}

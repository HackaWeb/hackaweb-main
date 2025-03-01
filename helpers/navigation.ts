import { locales } from "@/i18n";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const { useRouter, usePathname, Link, redirect } =
    createSharedPathnamesNavigation({ locales });

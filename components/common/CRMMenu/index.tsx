"use client";
import { Button } from "@/components/ui/Button";
import { Link } from "@/helpers/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const CRMMenu = () => {
    const pathname = usePathname();
    console.log(pathname);

    const links = [
        {
            title: "Users",
            link: "/crm/users",
        },
        {
            title: "Transactions",
            link: "/crm/transactions",
        },
    ];

    return (
        <div className="flex gap-4 mb-4 ml-5">
            {links.map((link) => (
                <Link href={link.link} key={link.title}>
                    <Button
                        color="purpleBackground"
                        className={cn(
                            pathname.includes(link.link) && "opacity-70",
                            pathname.includes(link.link) &&
                                "cursor-not-allowed",
                        )}
                        disabled={pathname.includes(link.link)}
                    >
                        {link.title}
                    </Button>
                </Link>
            ))}
        </div>
    );
};

export default CRMMenu;

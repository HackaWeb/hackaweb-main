import { useRouter } from "@/helpers/navigation";

export const useRedirect = () => {
    const router = useRouter();

    const redirect = (path: string) => {
        router.push(path);
        router.refresh();
    };

    return redirect;
};

import { googleAuth } from "@/apis/auth";
import { setCookie } from "@/helpers/setCookie";
import { toast } from "react-toastify";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "@/helpers/navigation";

export const GoogleAuthButton = () => {
    const router = useRouter();

    const onAuthClick = async (response: CredentialResponse) => {
        try {
            const res = await googleAuth({ token: response.credential });
            console.log(res);

            if (res.token) {
                setCookie("token", res.token);
                setCookie("refreshToken", res.refreshToken);
                toast.success("Вас успішно авторизовано!");

                router.refresh();

                setTimeout(() => {
                    router.push("/profile");
                }, 500);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-10">
            <div>Або авторизуватися через соц. мережі</div>
            <div className="flex justify-center mx-auto mt-3">
                <div className="mx-auto bg-secondary-dark p-2 rounded-md">
                    <GoogleLogin
                        onSuccess={onAuthClick}
                        onError={() => console.log("error")}
                        type="icon"
                    />
                </div>
            </div>
        </div>
    );
};

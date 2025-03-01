import { UserProfile } from "@/types/user.interface";
import { fetchApi } from "./fetchApi";

export const getProfile = async (): Promise<UserProfile> =>
    fetchApi({
        endpoint: `/profile`,
        isAuthRequired: true,
        method: "GET",
    });

interface UpdateProfileBody {
    firstName?: string;
    lastName?: string;
}
export const updateProfile = async (
    body: UpdateProfileBody,
): Promise<UserProfile> =>
    fetchApi({
        endpoint: `/profile`,
        isAuthRequired: true,
        method: "PUT",
        body,
    });

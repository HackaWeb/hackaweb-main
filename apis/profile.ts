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
export const updateProfile = async (body: UpdateProfileBody): Promise<UserProfile> =>
    fetchApi({
        endpoint: `/profile`,
        isAuthRequired: true,
        method: "PUT",
        body,
    });

interface UpdateProfileImageResponse {
    avatarUrl: string;
}
export const updateProfileImage = async (
    body: FormData,
): Promise<UpdateProfileImageResponse> =>
    fetchApi({
        endpoint: `/profile/image`,
        isAuthRequired: true,
        method: "POST",
        body,
    });

interface DeleteProfileImageResponse {
    isSuccess: boolean;
}
export const deleteProfileImage =
    async (): Promise<DeleteProfileImageResponse> =>
        fetchApi({
            endpoint: `/profile/image`,
            isAuthRequired: true,
            method: "DELETE",
        });

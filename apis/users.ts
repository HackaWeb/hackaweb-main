import { UserProfile } from "@/types/user.interface";
import { fetchApi } from "./fetchApi";

export const getUser = async (userId: string): Promise<UserProfile> =>
    fetchApi({
        endpoint: `/users/${userId}`,
        isAuthRequired: false,
        method: "GET",
    });

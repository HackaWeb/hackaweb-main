import { UserProfile } from "@/types/user.interface";
import { fetchApi } from "./fetchApi";
import { ValidityResponseCapital } from "./common";

export const getUser = async (userId: string): Promise<UserProfile> =>
    fetchApi({
        endpoint: `/users/${userId}`,
        isAuthRequired: false,
        method: "GET",
    });

export const getUsers = async (): Promise<UserProfile[]> =>
    fetchApi({
        endpoint: `/users/`,
        isAuthRequired: false,
        method: "GET",
    });

export const deleteUser = async (
    userId: string,
): Promise<ValidityResponseCapital> =>
    fetchApi({
        endpoint: `/users/${userId}`,
        isAuthRequired: true,
        method: "DELETE",
    });

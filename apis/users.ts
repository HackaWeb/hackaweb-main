import { UserProfile } from "@/types/user.interface";
import { fetchApi } from "./fetchApi";

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


interface UpdateUserBody {
    firstName?: string;
    lastName?: string;
}
export const updateUser = async (
    userId: string,
    body: UpdateUserBody,
): Promise<UserProfile> =>
    fetchApi({
        endpoint: `/users/${userId}`,
        isAuthRequired: true,
        method: "PUT",
        body: body,
    });

export interface DeleteUserResponse {
    statusCode: number;
    isSuccess: boolean;
    errorMessage: string;
}

export const deleteUser = async (userId: string): Promise<DeleteUserResponse> =>
    fetchApi({
        endpoint: `/users/${userId}`,
        isAuthRequired: true,
        method: "DELETE",
    });

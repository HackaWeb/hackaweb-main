import { ApiKey, UserProfile } from "@/types/user.interface";
import { ValidityResponse } from "./common";
import { fetchApi } from "./fetchApi";

export const updateCredential = async (
    body: ApiKey,
): Promise<ValidityResponse> =>
    fetchApi({
        endpoint: "/credentials",
        isAuthRequired: true,
        method: "POST",
        body,
    });

export const getCredentials = async (): Promise<UserProfile> =>
    fetchApi({
        endpoint: "/credentials",
        isAuthRequired: true,
        method: "GET",
    });

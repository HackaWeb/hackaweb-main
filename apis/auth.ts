import { CredentialResponse } from "@react-oauth/google";
import { fetchApi } from "./fetchApi";

interface AuthorizationBody {
    email: string;
    password: string;
}
interface AuthorizationResponse {
    token: string;
    refreshToken: string;
}
export const register = async (
    body: AuthorizationBody,
): Promise<AuthorizationResponse> =>
    fetchApi({
        endpoint: "/auth/register",
        isAuthRequired: false,
        method: "POST",
        body: body,
    });

export const login = async (
    body: AuthorizationBody,
): Promise<AuthorizationResponse> =>
    fetchApi({
        endpoint: "/auth/login",
        isAuthRequired: false,
        method: "POST",
        body: body,
    });

interface GoogleAuthBody {
    token: CredentialResponse["credential"];
}
export const googleAuth = async (
    body: GoogleAuthBody,
): Promise<AuthorizationResponse> =>
    fetchApi({
        endpoint: "/auth/google",
        isAuthRequired: false,
        method: "POST",
        body: body,
    });

interface RefreshTokenBody {
    refreshToken: string;
}
export const refreshToken = async (
    body: RefreshTokenBody,
): Promise<AuthorizationResponse> =>
    fetchApi({
        endpoint: "/auth/refresh",
        isAuthRequired: false,
        method: "POST",
        body: body,
    });

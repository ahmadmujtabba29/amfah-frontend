import { apiRequest } from "@/lib/api/client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  token_type: string;
};

export function login(payload: LoginPayload): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: payload,
    sameOrigin: true,
  });
}

export function logout(): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
    sameOrigin: true,
  });
}

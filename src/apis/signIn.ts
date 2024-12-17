import { axiosInstance } from "@/lib/axiosConfig";

// Auth APIs
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    axiosInstance.post("/auth/login", credentials),

  googleLogin: (idToken: string) =>
    axiosInstance.post("/auth/google/login", { idToken }),

  logout: () => axiosInstance.post("/auth/logout"),

  refreshToken: () =>
    axiosInstance.post("/auth/refresh-token", {}, { withCredentials: true }),
};

// Example of how to use with types
export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface APIError {
  message: string;
  code?: string;
}

// You can add more typed API calls as needed

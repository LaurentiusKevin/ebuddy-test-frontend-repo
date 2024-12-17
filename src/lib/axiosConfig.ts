import axios from "axios";
import { store } from "@/store/store";
import { setAccessToken, clearAccessToken } from "@/store/features/authSlice";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const COOKIE_NAME = "accessToken";
const COOKIE_OPTIONS = {
  expires: 7,
};

export const axiosInstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookie instead of Redux store
    const token = Cookies.get(COOKIE_NAME);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is not 401 or the request has already been retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Attempt to refresh the token
      const response = await axios.post(
        `${baseURL}/auth/refresh-token`,
        {},
        {
          withCredentials: true, // If you're using HTTP-only cookies
        },
      );

      const { accessToken } = response.data;

      Cookies.set(COOKIE_NAME, accessToken, COOKIE_OPTIONS);
      store.dispatch(setAccessToken(accessToken));

      // Update the failed request's authorization header
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      // Retry the original request
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.log("Unable to refresh the token");
      Cookies.remove(COOKIE_NAME);
      store.dispatch(clearAccessToken());

      window.location.href = "/auth/sign-in";
    }
  },
);

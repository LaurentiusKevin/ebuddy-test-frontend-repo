"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setAccessToken, clearAccessToken } from "@/store/features/authSlice";
import { authAPI } from "@/apis/signIn";
import { store } from "@/store/store";
import Cookies from "js-cookie";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await authAPI.login({ email, password });
      console.log(data);
      dispatch(setAccessToken(data.accessToken));
      Cookies.set("accessToken", data.accessToken, {
        expires: 7,
      });

      const state = store.getState();

      router.push("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (idToken: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await authAPI.googleLogin(idToken);
      dispatch(setAccessToken(data.accessToken));

      router.push("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      dispatch(clearAccessToken());
      router.push("/auth/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return {
    login,
    googleLogin,
    logout,
    loading,
    error,
  };
};

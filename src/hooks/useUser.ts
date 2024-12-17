import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setAccessToken, clearAccessToken } from "@/store/features/authSlice";
import { authAPI } from "@/apis/signIn";
import { store } from "@/store/store";
import Cookies from "js-cookie";
import { userAPI, UserCreateDto, UserUpdateDto } from "@/apis/user";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await userAPI.fetchUsers();

      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "User fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (params: UserUpdateDto) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await userAPI.updateUser(params);

      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "User update failed");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (params: UserCreateDto) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await userAPI.createUser(params);

      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "User create failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchUsers,
    createUser,
    updateUser,
    loading,
    error,
  };
};

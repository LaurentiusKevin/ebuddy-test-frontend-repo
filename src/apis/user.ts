import { axiosInstance } from "@/lib/axiosConfig";
import { AxiosResponse } from "axios";

export const userAPI = {
  fetchUsers: (): Promise<AxiosResponse<UserResponse>> =>
    axiosInstance.get("/fetch-user-data"),

  createUser: (data: UserCreateDto) =>
    axiosInstance.post("/create-user-data", data),

  updateUser: (data: UserUpdateDto) =>
    axiosInstance.put("/update-user-data", data),
};

export interface User {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  createdAt?: string;
}

export type UserResponse = User[];

export interface UserUpdateDto {
  id: string;
  email?: string;
  name?: string;
  password?: string;
}

export interface UserCreateDto {
  id?: string;
  email: string;
  name: string;
  password: string;
}

export interface APIError {
  message: string;
  code?: string;
}

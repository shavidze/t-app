import { useCallback } from "react";
import Http from "../../services/axios.service";
import { UserDTO } from "../../constants/interfaces/UserDTO";
import { UserForm } from "../../constants/interfaces/User";
const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
};

export function useGetUsersApi() {
  return useCallback((page = 1, limit = 20): Promise<void> => {
    return Http.get(`users?page=${page}&limit=${limit}`);
  }, []);
}

export function useGetUserApi() {
  return useCallback((id: string): Promise<void> => {
    return Http.get(`users/${id}`);
  }, []);
}
export function useCreateUserApi() {
  return useCallback((data: UserForm): Promise<void> => {
    return Http.post(`users`, data);
  }, []);
}

export function useUpdateUserApi() {
  return useCallback((data: UserForm, id: string): Promise<void> => {
    return Http.put(`users/${id}`, data, { headers });
  }, []);
}

export function useDeleteUserApi() {
  return useCallback((id: string): Promise<void> => {
    return Http.delete(`users/${id}`);
  }, []);
}

import {
  useGetUsersApi,
  useGetUserApi,
  useUpdateUserApi,
  useCreateUserApi,
  useDeleteUserApi,
} from "../api";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  getUsersStart,
  getUserStart,
  getUsersSuccess,
  getUserSuccess,
  getUsersFailure,
  getUserFailure,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  createUserStart,
  createUserFailure,
  createUserSuccess,
} from "./actions";
import { handleError } from "../../../helpers/handleErrors";
import { toast } from "react-toastify";
import { UserForm } from "../../../constants/interfaces/User";

export const useGetUsersService = () => {
  const getUsersApi = useGetUsersApi();
  const dispatch = useDispatch();
  return useCallback(
    (page = 1, limit = 20): Promise<void> => {
      dispatch(getUsersStart());
      return getUsersApi(page, limit)
        .then((response: any) => {
          dispatch(getUsersSuccess(response.data.data));
        })
        .catch((error: any) => {
          let errorMessage = handleError(error);
          dispatch(getUsersFailure(errorMessage));
          toast.error(errorMessage);
        });
    },
    [dispatch, getUsersApi]
  );
};

export const useGetUserService = () => {
  const getUserApi = useGetUserApi();
  const dispatch = useDispatch();
  return useCallback(
    (id: string): Promise<void> => {
      dispatch(getUserStart());
      return getUserApi(id)
        .then((response: any) => {
          dispatch(getUserSuccess(response.data.data));
        })
        .catch((error: any) => {
          let errorMessage = handleError(error);
          dispatch(getUserFailure(errorMessage));
          toast.error(errorMessage);
        });
    },
    [dispatch, getUserApi]
  );
};

export const useUpdateUserService = () => {
  const updateUserApi = useUpdateUserApi();
  const dispatch = useDispatch();
  return useCallback(
    (user: UserForm, id: string): Promise<void> => {
      dispatch(updateUserStart());
      return updateUserApi(user, id)
        .then((response: any) => {
          dispatch(updateUserSuccess(response.data));
          toast.success("Successfully updated");
        })
        .catch((error: any) => {
          let errorMessage = handleError(error);
          dispatch(updateUserFailure(errorMessage));
          toast.error(errorMessage);
        });
    },
    [dispatch, updateUserApi]
  );
};

export const useCreateUserService = () => {
  const createUserApi = useCreateUserApi();
  const dispatch = useDispatch();
  return useCallback(
    (user: UserForm): Promise<void> => {
      dispatch(createUserStart());
      return createUserApi(user)
        .then((response: any) => {
          dispatch(createUserSuccess(response.data));
          toast.success("Successfully created");
        })
        .catch((error: any) => {
          let errorMessage = handleError(error);
          dispatch(createUserFailure(errorMessage));
          toast.error(errorMessage);
        });
    },
    [dispatch, createUserApi]
  );
};

export const useDeleteUserService = () => {
  const deleteUserApi = useDeleteUserApi();
  const dispatch = useDispatch();
  return useCallback(
    (id: string): Promise<void> => {
      dispatch(deleteUserStart());
      return deleteUserApi(id)
        .then((response: any) => {
          dispatch(deleteUserSuccess(response.data));
          toast.success("Successfully deleted");
        })
        .catch((error: any) => {
          let errorMessage = handleError(error);
          dispatch(deleteUserFailure(errorMessage));
          toast.error(errorMessage);
        });
    },
    [dispatch, deleteUserApi]
  );
};

import { UserDTO } from "../../../constants/interfaces/UserDTO";
import { Action } from "redux";

export enum Actinos {
  GET_USERS_START = "GET_USERS_START",
  GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
  GET_USERS_FAILURE = "GET_USERS_FAILURE",

  GET_USER_START = "GET_USER_START",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_FAILURE = "GET_USER_FAILURE",

  CREATE_USER_START = "CREATE_USER_START",
  CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
  CREATE_USER_FAILURE = "CREATE_USER_FAILURE",

  UPDATE_USER_START = "UPDATE_USER_START",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE",

  DELETE_USER_START = "DELETE_USER_START",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE = "DELETE_USER_FAILURE",
}

export function getUsersStart() {
  return {
    type: Actinos.GET_USERS_START as Actinos.GET_USERS_START,
  };
}

export function getUsersSuccess(payload: any) {
  return {
    type: Actinos.GET_USERS_SUCCESS as Actinos.GET_USERS_SUCCESS,
    payload,
  };
}

export function getUsersFailure(error: string) {
  return {
    type: Actinos.GET_USERS_FAILURE as Actinos.GET_USERS_FAILURE,
    payload: error,
  };
}

export function getUserStart() {
  return {
    type: Actinos.GET_USER_START as Actinos.GET_USER_START,
  };
}

export function getUserSuccess(payload: any) {
  return {
    type: Actinos.GET_USER_SUCCESS as Actinos.GET_USER_SUCCESS,
    payload,
  };
}

export function getUserFailure(error: string) {
  return {
    type: Actinos.GET_USER_FAILURE as Actinos.GET_USER_FAILURE,
    payload: error,
  };
}

export function createUserStart() {
  return {
    type: Actinos.CREATE_USER_START as Actinos.CREATE_USER_START,
  };
}

export function createUserSuccess(payload: UserDTO[]) {
  return {
    type: Actinos.CREATE_USER_SUCCESS as Actinos.CREATE_USER_SUCCESS,
    payload,
  };
}
export function createUserFailure(error: string) {
  return {
    type: Actinos.CREATE_USER_FAILURE as Actinos.CREATE_USER_FAILURE,
    payload: error,
  };
}

export function updateUserStart() {
  return {
    type: Actinos.UPDATE_USER_START as Actinos.UPDATE_USER_START,
  };
}

export function updateUserSuccess(payload: UserDTO[]) {
  return {
    type: Actinos.UPDATE_USER_SUCCESS as Actinos.UPDATE_USER_SUCCESS,
    payload,
  };
}

export function updateUserFailure(error: string) {
  return {
    type: Actinos.UPDATE_USER_FAILURE as Actinos.UPDATE_USER_FAILURE,
    payload: error,
  };
}

export function deleteUserStart() {
  return {
    type: Actinos.DELETE_USER_START as Actinos.DELETE_USER_START,
  };
}

export function deleteUserSuccess(payload: UserDTO[]) {
  return {
    type: Actinos.DELETE_USER_SUCCESS as Actinos.DELETE_USER_SUCCESS,
    payload,
  };
}

export function deleteUserFailure(error: string) {
  return {
    type: Actinos.DELETE_USER_FAILURE as Actinos.DELETE_USER_FAILURE,
    payload: error,
  };
}

export type UsersActions =
  | ReturnType<typeof getUsersStart>
  | ReturnType<typeof getUsersSuccess>
  | ReturnType<typeof getUsersFailure>
  | ReturnType<typeof getUserStart>
  | ReturnType<typeof getUserSuccess>
  | ReturnType<typeof getUserFailure>
  | ReturnType<typeof createUserStart>
  | ReturnType<typeof createUserSuccess>
  | ReturnType<typeof createUserFailure>
  | ReturnType<typeof updateUserStart>
  | ReturnType<typeof updateUserFailure>
  | ReturnType<typeof updateUserSuccess>
  | ReturnType<typeof deleteUserStart>
  | ReturnType<typeof deleteUserFailure>
  | ReturnType<typeof deleteUserSuccess>;

import { Reducer } from "redux";
import { Actinos, UsersActions } from "./actions";
import { UserDTO } from "../../../constants/interfaces/UserDTO";

export interface UsersState {
  users: UserDTO[];
  user: UserDTO;
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  user: {} as UserDTO,
  loading: false,
  error: "",
};

const usersReducer: Reducer<UsersState, UsersActions> = (
  state: UsersState = initialState,
  action: UsersActions
): UsersState => {
  switch (action.type) {
    case Actinos.CREATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case Actinos.CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actinos.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case Actinos.GET_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case Actinos.GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actinos.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case Actinos.GET_USER_START:
      return {
        ...state,
        loading: true,
        users: [],
      };
    case Actinos.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actinos.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case Actinos.UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case Actinos.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actinos.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case Actinos.DELETE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case Actinos.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actinos.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;

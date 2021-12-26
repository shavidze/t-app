import { Gender } from "../enums/Gender";
import { UserStatus } from "../enums/UserStatus";

export interface UserForm {
  name: string;
  email: string;
  gender: Gender;
  status: UserStatus;
}

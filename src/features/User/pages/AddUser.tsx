import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Select from "react-select";
import { useCreateUserService } from "../store/services";
import { ErrorMessages } from "../../../constants/messages/ErrorMessages";
import { Gender, UserStatus } from "../../../constants/enums";
import generateOptionFromEnum from "../../../helpers/generateOptions";
import Input from "@mui/material/Input";
import { Link } from "react-router-dom";

const AddUser: FC = () => {
  const navigate = useNavigate();
  const createUser = useCreateUserService();
  const statusOptions = generateOptionFromEnum<typeof UserStatus>(UserStatus);
  const genderOptions = generateOptionFromEnum<typeof Gender>(Gender);
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, ErrorMessages.mustBe(3, "characters"))
      .required(ErrorMessages.required()),
    email: Yup.string().email().required(ErrorMessages.required()),
    gender: Yup.object()
      .shape({
        label: Yup.string()
          .oneOf([Gender.female, Gender.male, Gender.other])
          .required(ErrorMessages.required()),
        value: Yup.string()
          .oneOf([
            Gender.female.toLowerCase(),
            Gender.male.toLowerCase(),
            Gender.other.toLowerCase(),
          ])
          .required(ErrorMessages.required()),
      })
      .required(ErrorMessages.required()),
    status: Yup.object().shape({
      label: Yup.string()
        .oneOf([UserStatus.active, UserStatus.inactive])
        .required(ErrorMessages.required()),
      value: Yup.string()
        .oneOf([
          UserStatus.active.toLowerCase(),
          UserStatus.inactive.toLowerCase(),
        ])
        .required(ErrorMessages.required()),
    }),
  });

  const {
    control,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: { label: Gender.male, value: Gender.male.toLowerCase() },
      status: {
        label: UserStatus.active,
        value: UserStatus.active.toLowerCase(),
      },
    },
  });

  const onSubmit = (user) => {
    const userToCreate = {
      name: user.name,
      status: user.status.value,
      gender: user.gender.value,
      email: user.email,
    };
    createUser(userToCreate).then(() => navigate("/users"));
  };

  return (
    <div className="bg-slate-400 h-screen relative">
      <Link
        to={`/users`}
        className="absolute left-5 top-5 bg-black hover:bg-gray-900 text-white text-center py-2 px-4 rounded"
      >
        User List
      </Link>
      <p className="w-100 flex justify-center mb-6 absolute left-1/2 text-2xl -translate-x-1/2 mr-5 top-2 text-pink">
        Add User
      </p>
      <form className="w-100 p-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center flex-col items-center mb-6 px-6 my-12">
          <div className="mb-6">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input name="name" {...field} />}
            />
            {errors.name && (
              <p className="text-red-700 ">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-6">
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input name="email" {...field} />}
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label>Choose Gender</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder={"Choose gender ..."}
                  {...field}
                  options={genderOptions}
                />
              )}
            />
            {errors.gender && (
              <p className="text-red-700">{errors.gender.value.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label>Choose Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder={"Choose status ..."}
                  {...field}
                  options={statusOptions}
                />
              )}
            />
            {errors.status && (
              <p className="text-red-700">{errors.status.value.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={!isDirty}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
            <button
              type="submit"
              onClick={() => reset()}
              className="text-white bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;

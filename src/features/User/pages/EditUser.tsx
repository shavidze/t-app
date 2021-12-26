import React, { FC, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CircularProgress } from "@mui/material";
import Select from "react-select";
import { useIfChanged } from "../../../hooks/useIfChanged";
import { useGetUserService, useUpdateUserService } from "../store/services";
import { ErrorMessages } from "../../../constants/messages/ErrorMessages";
import { Gender, UserStatus } from "../../../constants/enums";
import generateOptionFromEnum from "../../../helpers/generateOptions";
import Input from "@mui/material/Input";
import { UserDTO } from "../../../constants/interfaces/UserDTO";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import BasicModal from "../../../components/BasicModal/BasicModal";

const EditUser: FC = () => {
  const { id } = useParams();
  const getUser = useGetUserService();
  const updateUser = useUpdateUserService();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { user, loading } = useSelector((state: RootState) => state.users);
  const ifUserChanged = useIfChanged(user);
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
  const userFormFromDTO = (user?: UserDTO) => {
    if (!user || Object.keys(user).length === 0) return {};

    return {
      name: user.name,
      email: user.email,
      gender: {
        label: user.gender.toUpperCase(),
        value: user.gender.toLowerCase(),
      },
      status: {
        label: user.status.toUpperCase(),
        value: user.status.toLowerCase(),
      },
    };
  };
  const {
    reset,
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: userFormFromDTO(user),
  });

  useEffect(() => {
    getUser(id);
  }, [getUser]);

  useEffect(() => {
    reset(userFormFromDTO(user));
  }, [ifUserChanged]);

  const onSave = (user) => {
    const userToUpdate = {
      name: user.name,
      status: user.status.value,
      gender: user.gender.value,
      email: user.email,
    };
    updateUser(userToUpdate, id).then(() => {
      reset();
      setOpenModal(false);
    });
  };

  const onHandleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(true);
  };

  if (loading || Object.entries(user).length === 0) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-slate-400 h-screen relative">
      <Link
        to={`/users`}
        className="absolute left-5 top-5 bg-black hover:bg-gray-900 text-white text-center py-2 px-4 rounded"
      >
        <ArrowBackIcon />
        Back to User List
      </Link>
      <p className="w-100 flex justify-center mb-6 absolute left-1/2 text-2xl -translate-x-1/2 mr-5 top-2 text-pink">
        Edit User
      </p>
      <form className="w-100 p-2" onSubmit={onHandleFormSubmit}>
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
              <p className="text-red-700">{errors.gender?.value?.message}</p>
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
              disabled={!isDirty}
              onClick={() => setOpenModal(true)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </div>
        </div>
        <BasicModal open={openModal} onClose={() => setOpenModal(false)}>
          <div className="px-8 py-12 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 bg-black ">
            <p className="text-white mb-10">Do you want to update the user?</p>
            <div className="flex justify-around">
              <button
                type="submit"
                onClick={handleSubmit(onSave)}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  reset();
                  setOpenModal(false);
                }}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </BasicModal>
      </form>
    </div>
  );
};

export default EditUser;

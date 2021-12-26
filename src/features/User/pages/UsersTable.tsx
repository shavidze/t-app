import { FC, useEffect, useState, useCallback } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useGetUsersService, useDeleteUserService } from "../store/services";
import UsersTableHeader from "../components/Table/UsersTableHeader";
import UsersTableBody from "../components/Table/UsersTableBody";

import styled from "styled-components";
import tw from "twin.macro";

import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { UserDTO } from "../../../constants/interfaces/UserDTO";
const BaseTableGridTemplate = styled.div`
  ${tw`gap-3`};
  grid-template-columns: 0.9fr 0.6fr 0.5fr 0.6fr 0.3fr 0.1fr 0.1fr;
`;

const TableItem = styled(BaseTableGridTemplate)`
  &:not(:last-of-type) {
    ${tw`border-b border-gray-900`};
  }
`;
const UsersTable: FC = () => {
  const { users, loading } = useSelector((state: RootState) => state.users);
  const getUsers = useGetUsersService();
  const deleteUser = useDeleteUserService();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClicked = useCallback(
    (page: number) => {
      setCurrentPage(page);
      getUsers(page);
    },
    [getUsers]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onDeleteUser = useCallback(
    (id: string) => {
      deleteUser(id).then(() => getUsers());
    },
    [getUsers]
  );
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="px-12 py-12 relative h-screen">
      <Link
        to={`/`}
        className="absolute left-5 top-5 bg-black hover:bg-gray-900 text-white text-center py-2 px-4 rounded"
      >
        Add User
      </Link>
      <p className="w-100 flex justify-center  absolute left-1/2 text-2xl -translate-x-1/2 mr-5 top-2 text-pink">
        Users List
      </p>
      <div className="rounded shadow-md w-full bg-white flex flex-col overflow-y-auto absolute left-1/2 -translate-x-1/2 top-24">
        <UsersTableHeader />
        {!loading && users.length && (
          <UsersTableBody onUserDelete={onDeleteUser} users={users} />
        )}
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          onPageClicked={handlePageClicked}
        />
      </div>
      {!loading && !users.length && (
        <TableItem className="text-center p-4 items-center cursor-pointer flex justify-center">
          No users yet
        </TableItem>
      )}
    </div>
  );
};

export default UsersTable;

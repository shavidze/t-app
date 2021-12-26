import { FC } from "react";
import { UserDTO } from "../../../../constants/interfaces/UserDTO";
import styled from "styled-components";
import tw from "twin.macro";
import { UserStatus } from "../../../../constants/enums/UserStatus";
//material icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

type Props = {
  users: UserDTO[];
  onUserDelete: (id: string) => void;
};

const BaseTableGridTemplate = styled.div`
  ${tw`gap-3`};
  grid-template-columns: 0.9fr 0.6fr 0.5fr 0.6fr 0.3fr 0.1fr 0.1fr;
`;

const TableItem = styled(BaseTableGridTemplate)`
  &:not(:last-of-type) {
    ${tw`border-b border-gray-900`};
  }
`;

const UsersTableBody: FC<Props> = ({ users, onUserDelete }) => {
  return (
    <>
      <div className="flex flex-col flex-1">
        {users.map((user, index) => {
          return (
            <TableItem key={user.name} className="p-4 items-center grid">
              <div className="flex align-middle">{user.name}</div>
              <span>{user.email}</span>
              <span>{user.gender}</span>
              <span
                className={`h-7 w-24 flex justify-center items-center rounded-xl ${
                  user.status === UserStatus.active.toLocaleLowerCase()
                    ? "bg-green-200"
                    : "bg-orange-200"
                }`}
              >
                {user.status.toUpperCase()}
              </span>
              <div className="flex items-between justify-between">
                <Link to={`/edit/${user.id}`}>
                  <EditIcon />
                </Link>
                <button onClick={() => onUserDelete(user.id)}>
                  <DeleteIcon />
                </button>
              </div>
            </TableItem>
          );
        })}
      </div>
    </>
  );
};

export default UsersTableBody;

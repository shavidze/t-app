import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const BaseTableGridTemplate = styled.div`
  ${tw`gap-3`};
  grid-template-columns: 0.9fr 0.6fr 0.5fr 0.6fr 0.3fr 0.1fr 0.1fr;
`;

const UsersTableHeader = () => (
  <div className="flex flex-col sticky bg-white inset-x-0 top-0">
    <BaseTableGridTemplate className="px-4 py-3 bg-neutral-98 border-b border-neutral-90 items-center grid">
      <span className="text-neutral-49 ">Name</span>
      <span className="text-neutral-49">Email</span>
      <span className="text-neutral-49">Gender</span>
      <span className="text-neutral-49">Status</span>
      <span className="text-neutral-49 text-center">Actions </span>
      <span className="text-neutral-49" />
    </BaseTableGridTemplate>
  </div>
);

export default UsersTableHeader;

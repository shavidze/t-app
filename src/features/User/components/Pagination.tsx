import { FC } from "react";
import styled from "styled-components";

const StyledPagesContainer = styled.div`
  display: flex;
`;

const StyledPageItem = styled.div<{ isCurrent: boolean }>`
  display: flex;
  padding: 5px;
  cursor: pointer;
  color: black;
  ${(props) =>
    props.isCurrent &&
    `
    color: blue;
    text-decoration: underline;
  `};
`;

type Props = {
  totalPages: number;
  currentPage: number;
  onPageClicked: (page: number) => void;
};

const Pagination: FC<Props> = ({ totalPages, currentPage, onPageClicked }) => {
  const pagesArray = new Array(totalPages).fill(1);

  return (
    <StyledPagesContainer>
      {pagesArray.map((item, index) => {
        const page = index + 1;
        return (
          <StyledPageItem
            key={index}
            isCurrent={currentPage === page}
            onClick={() => onPageClicked(page)}
          >
            {page}
          </StyledPageItem>
        );
      })}
    </StyledPagesContainer>
  );
};

export default Pagination;

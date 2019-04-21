import styled from "styled-components";

const StyledLi = styled.li`
  margin: 5px 10px;

  button {
    background: transparent;

    &:hover {
      border-bottom: 1px solid black;
    }
  }
`;

const StyledBgDiv = styled.div`
  background: rgb(245, 245, 245);
  height: 451px;
  padding-top: 10px;
`;

export {
  StyledLi,
  StyledBgDiv,
};

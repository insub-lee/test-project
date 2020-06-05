import styled from 'styled-components';

const StyledScheduler = styled.div`
  thead > tr,
  tbody > tr {
    vertical-align: middle;
  }

  .scheduler {
    margin: auto;
  }

  .clickable_button {
    transition: all 0.5s !important;

    &:hover {
      color: #3d5afe !important;
      transition: all 0.5s !important;
    }
  }
`;

export default StyledScheduler;

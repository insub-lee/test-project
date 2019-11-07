import styled from 'styled-components';

const StyledWorkProcessModal = styled.div`
  width: 100%;

  .basicWrapper {
    width: 100%;
    height: 600px;
    border: 1px solid rgb(217, 224, 231);

    &.deptWrapper {
      .deptTree {
        width: 100%;
        height: 250px;
        border-bottom: 1px solid rgb(217, 224, 231);
        overflow-y: auto;
      }

      .userList {
        width: 100%;
        height: 350px;
      }
    }

    &.userWrapper {
      border-left: 0px;
    }

    &.selectedWrapper {
      overflow-y: auto;

      > div {
        width: 100%;
        border-bottom: 1px solid rgb(217, 224, 231);
        height: 195px;
        margin-bottom: 4px;
      }
    }
  }

  .btnWrapper {
    width: 100%;
    height: 600px;
    text-align: center;
    display: flex;

    ul {
      margin: auto;

      li {
        margin-bottom: 10px;
      }
    }
  }
`;

export default StyledWorkProcessModal;

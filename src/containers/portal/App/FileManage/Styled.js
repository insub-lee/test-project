import styled from 'styled-components';

const Styled = styled.div`
  overflow: hidden;
  padding: 0 10px;

  .right-section {
    width: 320px;
    float: left;
    padding: 20px;
    border-right: 1px solid #ddd;
    height: calc(100vh - 42px);

    .title-area {
      font-size: 14px;
      color: #333;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .menu-area {
      .menu-item {
        height: 350px;
        /* height: calc((100vh - 160px) / 3); */
        /* overflow: auto; */
        margin-bottom: 20px;
      }
    }
  }

  .left-section {
    width: calc(100% - 320px);
    float: left;
    padding: 20px;
    height: calc(100vh - 42px);

    .search-area {
      margin-bottom: 20px;
    }
  }
`;

export default Styled;

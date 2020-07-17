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
      font-size: 17px;
      color: #333;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .menu-area {
      overflow-y: auto;
      height: 100%;
      .menu-title {
        font-size: 14px;
        color: #333;
        font-weight: 600;
      }
      .menu-item {
        height: 260px;
        /* height: calc((100vh - 160px) / 3); */
        /* overflow: auto; */
        margin-bottom: 25px;
      }
    }
  }

  .left-section {
    width: calc(100% - 320px);
    float: left;
    padding: 20px;
    height: calc(100vh - 42px);

    .main-dashboard {
      padding: 30px;
    }

    .search-area {
      margin-bottom: 20px;
      .right {
        float: right;
        margin-left: 10px;
      }
    }
  }
`;

export default Styled;

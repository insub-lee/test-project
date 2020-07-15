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

    .quick-menu {
      border-bottom: solid #344051;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }

    .quick-menu-main {
      margin: 10px auto;
      width: 100%;
      height: 400px;

      .quick-menu-upload {
        width: calc(50% - 10px);
        float: left;
        border: 2px solid #afafaf;
        padding: 10px;
        height: 100%;
      }

      .quick-menu-share {
        width: calc(50% - 10px);
        float: right;
        border: 2px solid #afafaf;
        padding: 10px;
        height: 100%;

        .share-opt {
          text-align: center;
        }
      }

      .quick-menu-title {
        padding: 10px 10px 10px 0px;
      }

      .btn-primary {
        float: right;
      }
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

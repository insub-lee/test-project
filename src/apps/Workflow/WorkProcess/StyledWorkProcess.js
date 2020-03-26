import styled from 'styled-components';

const StyledWorkProcess = styled.div`
  width: 100%;
  .signLineWrapper {
    width: 100%;
    margin-bottom: 20px;
    .table-head {
      .ant-col {
        background: #f7f7f7;
        border-bottom: 0;
        border-top: 1px solid #bdbdbd;
      }
    }
    .ant-col {
      border: 1px solid rgb(217, 224, 231);
      text-align: center;
      width: 110px;
      border-right: 0;
      &:last-child {
        border-right: 1px solid rgb(217, 224, 231);
      }
      span {
        font-size: 12px;
      }
      .wp_bodyCol {
        height: 87px;
        position: relative;
        > ul > li {
          font-size: 12px;
        }
        .sign_img {
          > img {
            width: 80px;
            height: 78px;
            opacity: 1;
          }
        }
      }
    }
  }

  .dataWrapper {
    border-top: 1px solid #ddd;
    &:last-child {
      border-bottom: 0px;
    }
    .ant-row-flex {
      /* display: flex; */
      .ant-col.dataLabel {
        position: relative;
        border-right: 1px solid #ddd;
        background-color: #f7f7f7;
        span {
          font-size: 12px;
          color: #000;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 10px;
        }
      }
      .ant-col.dataContents {
        padding: 10px;
        input {
          border: 0;
          height: auto;
          padding: 0;
          font-size: 12px;
          color: #000;
        }
      }
    }
  }

  .draftTitleLayout {
    border-bottom: 1px solid;
    display: inline-block;
    width: 100%;
    .draftTitle{
      float: left;
      padding: 7px;
      font-size: 16px;
    }
    .draftButton{
      float: right;
      padding: 4px;
    }
  }

  .dataWrapper_mdcs {
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 0px;
    &:last-child {
      border-bottom: 1px solid #ddd;
    }
    .ant-row-flex {
      /* display: flex; */
      min-height: 32px;
      .ant-col.dataLabel {
        position: relative;
        border-right: 1px solid #ddd;
        background-color: #f7f7f7;
        min-height: 32px;
        text-align: center;
        line-height: 32px;
        span {
          font-size: 12px;
          color: #000;
        }
      }
      .ant-col.dataContents {
        font-size: 12px;
        display: inline-block;
       
        input {
          border: 0;
          height: auto;
          padding: 0;
          font-size: 12px;
          color: #000;
        }

        .draftInfoBox {
          background: #FFFFFF;
          border: 1px solid #DADADA;
          margin-top: 3px;
          margin-left: 10px;
          margin-bottom: 3px;

          border-radius: 5px;
          text-align: center;
          padding: 3px 10px;
          display: inline-block;          
          box-sizing: border-box;
          
        }
        .draftInfoBox span {
          display: inline-block;
          vertical-align: text-bottom;
          margin-left: 4px;
          font-size: 12px;
        }
    }
  } 

  .btnWrapper {
    width: 100%;
    margin-top: 10px;
    text-align: right;
  }
`;

export default StyledWorkProcess;

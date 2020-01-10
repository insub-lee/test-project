import styled from 'styled-components';
// import { palette } from 'styled-theme';
import modalCloseIcon from '../../../../images/bizstore/modal-close-x.png';

const Modals = ComponentName => styled(ComponentName)`

  .ant-modal-content {
    border-radius:0px;
  }

  .ant-modal-header {
    height: 35px;
    background-color:#333;
    padding: 10px 20px 10px 20px;
    border:none;
    border-radius:0px;

    .ant-modal-title {
      color:#fff;
      font-size:14px;
      line-height:14px;
    }
  }
  
  .ant-modal-close-x {
    position:absolute;
    top:12px;
    right:12px;
    line-height:35px;
    width:11px;
    height:11px;
    color:#fff;
    background:url(${modalCloseIcon}) no-repeat 50% 50%;

    &:before, svg {
      display:none;
    }
    
  }
    
  .ant-modal-body {
    margin:20px 20px 0px 20px;
    padding: 0;
    border-bottom:1px solid #ccc;
    box-sizing:border-box;
  }

  .ant-modal-body-content {
    color: #404040;
    font-size: 14px;
  }

  .ant-modal-footer {
    // 포탈쪽에 높이값 지정이 필요함
    height: 67px;
    padding:15px 20px 20px 20px;
    border-top:none;
    border-radius:0px;
    }

    .delete {
      float: left;
    }

    button + button {
      margin: ${props => (props['data-rtl'] === 'rtl' ? '0 5px 0 0' : '0 0 0 5px')};
    }
  }

  //모달 안 label
  .labelTxt {
    display: block;
    margin-top: 20px;
    color: #808080;
    font-size: 13px;

    input, textarea {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      color: #404040;
      font-size: 13px;
    }
    
    input {
      height: 35px;
    }

    textarea {
      height: 115px;
      resize: none;
    }
  }

  //QnA 입력(모달창)
  .questionType {
    display: inline-block;
    width: 100%;

    .questionTxt {
      float: left;
      display: inline-block;
      width: 230px;

      &:after {
        content: "";
        display: table;
        clear: both;
      }
    }
    .typeOptions {
      float: left;
      padding-right: 20px;

      &:after {
        content: "";
        display: table;
        clear: both;
      }
    }
  }

  // 별점 스타일
  .ant-rate {
    color: #ffb000;
    font-size: 15px;
  }

  .ant-rate-star {
    margin-right: 5px;
  }
`;

const ModalContent = styled.div``;

export default Modals;
export { ModalContent };

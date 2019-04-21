import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;

  .modal-content-input {
    width: 100%;
    height: 110px;
    padding: 20px;

    .modal-content-input-textarea {
      margin-top: 10px;
    }
  }

  .modal-content-time {
    width: 100%;
    height: 100px;
    margin-top: 20px;

    .modal-content-time-div {
      float: left;
      text-align: center;
      height: 100%;
    }

    // 달력 아이콘
    .modal-content-time-div:nth-child(1) {
      width: 10%;
      padding-top: 7%;

      img {
        width: 16px;
      }
    }

    // 시작 시간
    .modal-content-time-div:nth-child(2) {
      width: 35%;
      padding-top: 5%;

      .modal-content-time-top {
        font-size: 12px;
      }

      .modal-content-time-bottom {
        font-size: 20px;
        font-weight: bold;
      }
    }

    // > 모양의 화살표
    .modal-content-time-div:nth-child(3) {
      width: 10%;
      padding-top: 7%;

      img {
        width: 30px;
      }
    }

    // 종료 시간의 양 옆 연장 버튼
    .modal-content-time-div:nth-child(4), .modal-content-time-div:nth-child(6) {
      width: 10%;
      padding-top: 7%;

      img {
        width: 20px;
      }

      button {
        background: transparent;
      }
    }
    .modal-content-time-div:nth-child(4) {
      text-align: right;
    }
    .modal-content-time-div:nth-child(6) {
      text-align: left;
    }

    // 종료 시간
    .modal-content-time-div:nth-child(5) {
      width: 25%;
      padding-top: 5%;

      .modal-content-time-top {
        font-size: 12px;
      }

      .modal-content-time-bottom {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .modal-content-time-sub {
    width: 100%;
    height: auto;
    padding-left: 25px;
    margin-bottom: 16px;

    .modal-content-time-sub-sentence {
      color: #e00b15;
      font-size: 12px;
      font-weight: bold;

      .modal-content-time-strong {
        font-size: 18px;
      }

      img {
        width: 16px;
        margin-right: 39px;
      }
    }
  }
  .modal-content-location {
    width: 100%;
    min-height: 60px;
    height: 60px;

    .modal-content-location-div {
      float: left;
      text-align: center;
      height: 100%;

    }

    .modal-content-location-div:nth-child(1) {
      width: 10%;

      img {
        width:16px;
      }
    }

    .modal-content-location-div:nth-child(2) {
      width: 90%;
      text-align: left;
      font-weight: bold;
      padding-left: 2%;
    }
  }
`;

export default ContentWrapper;

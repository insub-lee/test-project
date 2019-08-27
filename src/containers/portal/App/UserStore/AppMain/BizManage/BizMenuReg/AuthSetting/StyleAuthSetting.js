import styled from 'styled-components';
import IconOut from 'images/common/icon-out.png';

const StyleAuthSetting = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  padding: 0 30px;
  background-color: #ffffff;
  z-index: 1; //footer 내용 가리기 + 사이드바 보이기

  .userSettingWrapper {
    width: 100%;

    .pageHeader {
      width: 100%;
      height: 55px;
      border-bottom: 1px solid #222222;
      color: #222222;
      font-size: 18px;
      line-height: 55px;
      text-align: center;

      .modalClose {
        position: absolute;
        right: 30px;
        width: 41px;
        height: 55px;
        border-color: transparent;
        background: url(${IconOut}) no-repeat 50% 50%;
      }
    }
  }
`;

export default StyleAuthSetting;

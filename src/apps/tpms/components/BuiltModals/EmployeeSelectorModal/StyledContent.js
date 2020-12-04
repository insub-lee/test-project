import styled from 'styled-components';
import closeImg from '../../../images/icon_pclose.png';

const StyledContent = styled.div`
  .pop_tit {
    height: 50px;
    line-height: 50px;
    padding: 0 22px;
    background: #4491e0;
    font-size: 19px;
    font-weight: 500;
    color: white;
    position: relative;

    .icon.icon_pclose {
      text-indent: -9999px;
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
      background: url(${closeImg}) no-repeat center;
      border-radius: 100%;
      border: 1px solid white;
      position: absolute;
      right: 20px;
      top: 50%;
      margin-top: -15px;
    }
  }

  .pop_con {
    padding: 20px 30px;
    position: relative;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .btn_wrap {
      font-size: 0;
      text-align: center;
      overflow: hidden;
    }
  }

  @media screen and (max-width: 1260px) {
    .pop_con {
    }
  }
`;

export default StyledContent;

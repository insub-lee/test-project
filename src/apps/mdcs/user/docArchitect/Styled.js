import styled from 'styled-components';
import iconMain1 from '../../images/icon_main1.png';
import iconMain2 from '../../images/icon_main2.png';
import iconMain3 from '../../images/icon_main3.png';
import iconMain4 from '../../images/icon_main4.png';
import iconMain5 from '../../images/icon_main5.png';
import iconMain6 from '../../images/icon_main6.png';
import iconMain7 from '../../images/icon_main7.png';
import iconMain8 from '../../images/icon_main8.png';
import iconMain9 from '../../images/icon_main9.png';
import iconMain10 from '../../images/icon_main10.png';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  color: white;
  padding: 20px;
  height: 100%;
  font-family: 'Noto Sans KR';
  .big {
    font-size: 30px;
    display: block;
    margin-bottom: 5px;
  }
  .small {
    font-size: 14px;
    opacity: 0.7;
    display: block;
  }
  .num {
    font-size: 30px;
    opacity: 1;
    font-weight: 700;
    text-align: right;
    display: block;
    margin-top: 20px;
  }
  .icon {
    display: block;
    margin-bottom: 10px;
    margin-top: 0;
  }

  .icon_main1 {
    width: 29px;
    height: 38px;
    background: url(${iconMain1}) no-repeat center;
  }
  .icon_main2 {
    width: 36px;
    height: 38px;
    background: url(${iconMain2}) no-repeat center;
  }
  .icon_main3 {
    width: 33px;
    height: 38px;
    background: url(${iconMain3}) no-repeat center;
  }
  .icon_main4 {
    width: 33px;
    height: 38px;
    background: url(${iconMain4}) no-repeat center;
  }
  .icon_main5 {
    width: 45px;
    height: 38px;
    background: url(${iconMain5}) no-repeat center;
  }
  .icon_main6 {
    width: 40px;
    height: 38px;
    background: url(${iconMain6}) no-repeat center;
  }
  .icon_main7 {
    width: 42px;
    height: 38px;
    background: url(${iconMain7}) no-repeat center;
  }
  .icon_main8 {
    width: 34px;
    height: 38px;
    background: url(${iconMain8}) no-repeat center;
  }
  .icon_main9 {
    width: 32px;
    height: 38px;
    background: url(${iconMain9}) no-repeat center;
  }
  .icon_main10 {
    width: 37px;
    height: 38px;
    background: url(${iconMain10}) no-repeat center;
  }
  &.main_banner:hover .main_banner_con {
    display: block;
    background: rgba(65, 93, 124, 0.9);
  }
  .main_banner_con {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(68, 145, 224, 0.9);
    width: 100%;
    height: 100%;

    color: white;
    z-index: 1;
    display: none;
    & dl {
      padding: 20px;
    }
    & dt {
      height: 28px;
      font-size: 20px;
      position: relative;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      width: calc(100% - 15px);
      overflow: hidden;
      padding-right: 15px;
      margin-bottom: 3px;
      & a {
        color: white;
        position: absolute;
        right: 0;
        top: 1px;
      }
    }
    & ul li a {
      display: block;
      position: relative;
      font-size: 18px;
      line-height: 28px;
      color: white;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      width: 100%;
      padding-right: 10px;
      overflow: hidden;
    }
  }
`;

export default Wrapper;

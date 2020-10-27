import styled from 'styled-components';
import iconAlarm from '../../../images/icon_alarm.png';
import iconSetting from '../../../images/icon_setting.png';
import iconSearch from '../../../images/icon_search.png';
import iconSearchG from '../../../images/icon_search_g.png';

const StyledMenuList = styled.ul`
  &.gnb_menu {
    position: absolute;
    right: 40px;
    top: 25px;
    font-size: 0;

    > li {
      display: inline-block;
      margin-left: 30px;
      position: relative;

      > button {
        position: relative;

        &.icon {
          text-indent: -9999px;
          display: inline-block;
          margin-top: -3px;
          vertical-align: middle;
        }

        &.icon_alarm {
          width: 23px;
          height: 24px;
          background: url(${iconAlarm}) no-repeat center;
        }

        &.icon_setting {
          width: 23px;
          height: 24px;
          background: url(${iconSetting}) no-repeat center;
        }

        &.icon_search {
          width: 23px;
          height: 24px;
          background: url(${iconSearch}) no-repeat center;
        }

        &.icon_search_g {
          width: 23px;
          height: 24px;
          background: url(${iconSearchG}) no-repeat center;
        }
      }

      & > form > .gnb_menu_search {
        background: white;
        border: 1px solid white;
        border-radius: 5px;
        padding-right: 50px;
        position: absolute;
        right: -10px;
        top: -13px;
        height: 44px;
        overflow: hidden;
        width: 0;
        transition: all 0.3s;
        display: none;
        opacity: 0;

        &.on {
          width: 150px;
          opacity: 1;
        }
      }
    }
  }
`;

export default StyledMenuList;

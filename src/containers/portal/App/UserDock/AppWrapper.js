import styled from 'styled-components';
import WithDirection from 'config/withDirection';
import pageUpIcon from '../../../../images/portal/dock-page-up.png';
import pageDownIcon from '../../../../images/portal/dock-page-down.png';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 0 16px;
  flex-direction: column;

  .floattingBtn {
    position: absolute;
    width: 0px;
    height: 0px;
    bottom: 7px;
    right: 7px;
    background: url(${props => props.theme.dock.flottingBtnBackground}) no-repeat 50% 50%;
    opacity: 0;
  }

  .floattingBtnShow {
    position: absolute;
    width: 22px;
    height: 22px;
    bottom: 7px;
    right: 7px;
    background: url(${props => props.theme.dock.flottingBtnBackground}) no-repeat 50% 50%;
    opacity: 1;
    transition: opacity 0.8s;
  }

  .floattingSettingArea {
    height: 122px;
    background: #252525;
    opacity: 0;
    position: fixed;
    bottom: -144px;
    transition: bottom 0.4s;
    padding-top: 15px;
    padding-bottom: 13px;
    padding-left: 8px;
    z-index: 1;
    width: ${props => props.styleObj.floattingSettingAreaWidth}
  }

  .floattingSettingAreaShow {
    height: 152px;
    background: #252525;
    opacity: 0.8;
    position: fixed;
    bottom: ${props => props.styleObj.floattingSettingAreaBottom};
    transition: bottom 0.4s;
    padding-top: 15px;
    padding-bottom: 13px;
    padding-left: 8px;
    padding-right: 8px;
    z-index: 1;
    width: ${props => props.styleObj.floattingSettingAreaShowWidth}
  }

  .floattingSettingAreaTop {
    text-align: ${props => props.styleObj.floattingSettingAreaTopTextAlign}
  }

  .myHorizontal {
    border : 0.6px solid #5c5c5c;
    height: 1px;
    margin-top: 11px;
    margin-bottom: 11px;
  }

  .settingMenuList {
    cursor: pointer;
  }

  .settingMenuName, .settingMenuNameSmallIcon, .settingMenuNameFixed, .settingMenuNameUnfixed, .settingMenuNameAuto {
    margin-left: 8px;
    font-size: 0.7em;
    font-weight: bold;
  }

  .settingMenuName {
    color: ${props => props.styleObj.settingMenuNameColor};
  }

  .settingMenuNameSmallIcon {
    color: ${props => props.styleObj.settingMenuNameSmallIconColor};
  }

  .settingMenuNameFixed {
    color: ${props => props.styleObj.settingMenuNameFixedColor};
  }

  .settingMenuNameUnfixed {
    color: ${props => props.styleObj.settingMenuNameUnfixedColor};
  }

  .settingMenuNameAuto {
    color: ${props => props.styleObj.settingMenuNameAutoColor};
  }

  .dockPos > div {
    height: calc(100vh - 42px) !important;
  }

  .custom-scrollbar {
    > div > div:not(.dockDiv) {
      background-color: #8f8f8f !important;
      border-radius: 0 !important;
    }
  }

  .dockDiv {
    height: 100%;
    padding-bottom: 10px;
    position: relative;
    margin: auto;
    width: ${props => props.styleObj.dockDivWidth}
    overflow-x: ${props => props.styleObj.dockDivOverflowX}
  }

  .positionBottom {
    width: 100%;
  }

  .positionBottom div {
    display: inline-block;
    float: left;
  }

  .pagingBtns {
    background: ${props => props.theme.dock.pagingBtns.bgColor};
    position: fixed;
    bottom: 0;
    z-index: 9;
    width: ${props => props.styleObj.pagingBtnsWidth}
    height: ${props => props.styleObj.pagingBtnsHeight}
  }

  .pagingUp {
    display: inline-block;
    height: 20px;
    border: 0;
    cursor: pointer;
    width: ${props => props.styleObj.pagingUpWidth}
  }

  .pagingDown {
    display: inline-block;
    height: 20px;
    border: 0;
    cursor: pointer;
    width: ${props => props.styleObj.pagingDownWidth}
  }

  .pagingUp.disabled, .pagingDown.disabled {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  }

  .pagingUp {
    background:${props => props.theme.dock.pagingBtns.bgColor} url(${pageUpIcon}) no-repeat 50% 50%;
  }

  .pagingDown {
    background:${props => props.theme.dock.pagingBtns.bgColor} url(${pageDownIcon}) no-repeat 50% 50%;
  }

  .topBottomArea {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    pointer-events: none;
  }

  @media only screen and (max-width: 1160px) {
    .dockPos > div {
      height: 90px;

      > div {
        // white-space: nowrap;
        > div {
          display: flex;
          flex-wrap: nowrap;
          height: 70px;

          > div {
            white-space: nowrap;
          }
        }
      }
    }

    .positionBottom {
      > div {
        margin-top: 10px !important;
      }

      div {
        float: none;
        
      }
    }
    
  }
`;

export default WithDirection(AppWrapper);

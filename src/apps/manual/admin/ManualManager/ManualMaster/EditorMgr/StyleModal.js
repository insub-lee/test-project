import styled from 'styled-components';
// import { palette } from 'styled-theme';
// import WithDirection from 'config/withDirection';
// import { borderRadius } from 'style/style-utils';
import iconCloseModal from 'images/portal/icon-modal-close.png';
import iconPhone from 'images/portal/icon-phone.png';
import iconTalk from 'images/portal/icon-talk2.png';
import iconMail from 'images/portal/icon-mail2.png';
import iconTodo from 'images/portal/icon-todo2.png';
import iconHiThanks from 'images/portal/icon-hithanks2.png';
import iconSearch from 'images/portal/icon-search.png';
import iconIn from 'images/portal/icon-in.png';
import iconIn2 from 'images/portal/icon-in2.png';
import iconOut from 'images/portal/icon-out.png';
import toolIcons from '../../../../user/images/toolIcons.png';
import toolIconsOn from '../../../../user/images/toolIcons_on.png';

const StyleModal = styled.div`
  width: 100%;
  height: calc(100vh - 42px);
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0;
  margin-left: 0;
  background-color: #ffffff;
  display: table;
  z-index: 9;
  > div {
    position: relative;
    width: 100%;
    height: 100%;
    .ui.menu.WriteHeader {
      width: 100%;
      height: 70px;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid rgba(34, 36, 38, 0.15);
      position: absolute;
      top: 0;
      z-index: 11;
      background-color: #525085;
      display: flex;
      .WriteHeaderMenu {
        padding-right: 30px;
        margin: 0;
        display: flex;
        margin-left: auto;
        background-color: #525085;
        &.ui.secondary.right.menu .item {
          padding: 0;
          margin: 0 5px;
          align-self: center;
          box-shadow: none;
          border: none;
          background: 0 0;
          position: relative;
          vertical-align: middle;
          line-height: 1;
          > .button {
            width: 95px;
            height: 28px;
            margin: 0;
            padding: 0;
            line-height: 26px;
            font-size: 12px;
            opacity: 1;
            border-radius: 0;
            box-shadow: none;
            border: 1px solid #fff;
            color: #f9fafb;
            background-color: transparent;
            :hover {
              color: #35aec0;
              border: 1px solid #35aec0;
            }
          }
        }
      }
    }

    .itemtoolbar {
      width: 200px;
      top: 70px;
      left: 0;
      border-right: 1px solid rgb(222, 225, 230);
      box-shadow: none;
      transition: 0.5s;
      position: absolute;
      transform: translateZ(0);
      height: calc(100% - 70px);
      max-height: calc(100% - 70px);
      margin: 0;
      .item {
        border-bottom: 1px solid rgb(222, 225, 230);
        padding-bottom: 10px;
        &:last-child {
          border-bottom: 0;
        }
      }
      .itemtoolbaritem .title {
        padding: 15px 20px 15px 10px;
        position: relative;
        font-family: Noto Sans Light, Malgun Gothic, Arial, Dotum, 돋움, sans-serif !important;
        font-size: 1em;
        color: #000;
        font-weight: 600;
        .icon {
          position: absolute;
          top: 50%;
          right: 15px;
          width: 12px;
          cursor: pointer;
        }
        &.active .icon {
          transform: rotate(180deg) translateY(5px);
        }
      }
      .tempTools a {
        display: inline-block;
        width: 30%;
        margin: 0 1.5% 12px;
        font-size: 12px;
        text-align: center;
      }

      .tempTools .toolIcon {
        display: block;
        width: 42px;
        height: 42px;
        margin: 0 auto 5px;
        background-image: url(${toolIcons});
        background-repeat: no-repeat;
      }

      .tempTools a:hover .toolIcon,
      .tempTools .on .toolIcon {
        display: block;
        width: 42px;
        height: 42px;
        background-image: url(${toolIconsOn});
        background-repeat: no-repeat;
      }
      .tempTools .toolIcon.tiTxt {
        background-position: 0 0;
      }

      .tempTools .toolIcon.tiImg {
        background-position: -70px 0;
      }

      .tempTools .toolIcon.tiEditor {
        background-position: 0 -72px;
      }

      .tempTools .toolIcon.tiTodo {
        background-position: 0 -144px;
      }

      .tempTools .toolIcon.tiSchedule {
        background-position: -70px -144px;
      }

      .tempTools .toolIcon.tiHashTag {
        background-position: 0 -144px;
      }

      .tempTools .toolIcon.tiChart {
        background-position: -70px -144px;
      }

      .tempTools .toolIcon.tiDday {
        background-position: -140px -144px;
      }

      .tempTools .toolIcon.tiLocation {
        background-position: -140px -140px;
      }

      .tempTools .toolIcon.tiIslide {
        background-position: -70px -216px;
      }

      .tempTools .toolIcon.tiVideo {
        background-position: -140px -72px;
      }

      .tempTools .toolIcon.tiCoding {
        background-position: 0 -288px;
      }

      .tempTools .toolIcon.tiAgenda {
        background-position: -70px -288px;
      }

      .tempTools .toolIcon.tiIndex {
        background-position: -140px -288px;
      }

      .tempTools .toolIcon.tiFile {
        background-position: -72px -72px;
      }

      .tempTools .toolIcon.tiTable {
        background-position: -70px -360px;
      }

      .tempTools .toolIcon.tiEditoolLeft {
        background-position: 0px 0px;
      }

      .tempTools .toolIcon.tiEditoolRight {
        background-position: -70px 0px;
      }

      .tempTools .toolIcon.tiLinker {
        background-position: -140px -576px;
      }

      .tempTools .toolIcon.ti2dan {
        background-position: -140px 0;
      }

      .tempTools .toolIcon.ti3dan {
        background-position: 0 -288px;
      }

      .tempTools .toolIcon.ti4dan {
        background-position: -70px -288px;
      }

      .tempTools .toolIcon.ti2danLeft {
        background-position: -140px -432px;
      }

      .tempTools .toolIcon.ti2danRight {
        background-position: 0 -504px;
      }

      .tempTools .toolIcon.ti2danParagraph {
        background-position: -70px -504px;
      }

      .tempTools .toolIcon.tiBigFirstWord {
        background-position: -140px -288px;
      }
    }
    .manualContentWrapper {
      display: inline-block;
      top: 70px;
      left: 200px;
      position: absolute;
      width: calc(100% - 200px);
      height: calc(100% - 70px);
      .manualMainMenuWrapper {
        margin: 0;
        height: 43px;
      }
      .manualMainIndexWrapper {
        margin: 0;
        margin: 0;
        display: inline-block;
        width: 400px;
        height: calc(100% - 37px);
        vertical-align: top;
        border-right: 1px solid #dee1e6;
      }
      .manualMainContentWrapper {
        margin: 0;
        display: inline-block;
        width: calc(100% - 400px);
      }
    }
  }
`;

export default StyleModal;

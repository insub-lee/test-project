import styled from 'styled-components';

import iconClose from 'images/portal/btn-close.png';
import iconComment from 'images/portal/icon-comment.png';
import iconList from 'images/portal/icon-list.png';
import iconHeart from 'images/portal/icon-heart.png';
import iconPen from 'images/portal/icon-pen.png';
import iconRead from 'images/portal/icon-read.png';
import iconReadOn from 'images/portal/icon-read-on.png';
import iconReply from 'images/portal/icon-reply.png';
import iconReplyOn from 'images/portal/icon-reply-on.png';
import iconTabs from 'images/portal/icon-tabs.png';
import iconworkCard from 'images/portal/icon-workCard.png';
import iconworkFolder from 'images/portal/icon-folder.png';
import iconFolderClose from 'images/portal/icon-folder-close.png';
import iconFolderOpen from 'images/portal/icon-folder-open.png';
import iconMenuApp from 'images/portal/icon-menu-app.png';
import iconMenuPage from 'images/portal/icon-menu-page.png';
import iconBullet from 'images/portal/icon-bullet.png';
import iconHyphen from 'images/portal/icon-hyphen.png';
import iconPin from 'images/portal/icon-pin.png';
import iconPinFill from 'images/portal/icon-pin-fill.png';
import iconPageMove from 'images/portal/icon-page-move.png';
import icon1stMenu from 'images/portal/icon-1st-menu.png';

const Styled = styled.i`
  display: inline-block;
  vertical-align: middle;

  &.icon-close {
    background: url(${iconClose}) no-repeat center;
    width: 15px;
    height: 15px;
  }
  &.icon-1st-menu {
    background: url(${icon1stMenu}) no-repeat center;
    width: 30px;
    height: 22px;
  }
  &.icon-page-move {
    background: url(${iconPageMove}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 11px;
  }
  &.icon-comment {
    background: url(${iconComment}) no-repeat center;
    width: 12px;
    height: 12px;
    background-size: 100%;
  }
  &.icon-list {
    background: url(${iconList}) no-repeat center;
    width: 15px;
    height: 25px;
    margin-right: 8px;
    background-size: 15px;
  }
  &.icon-heart {
    background: url(${iconHeart}) no-repeat center;
    width: 12px;
    height: 12px;
    background-size: 100%;
  }
  &.icon-pen {
    background: url(${iconPen}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
    margin-right: 5px;
    margin-top: -5px;
  }
  &.icon-pin {
    background: url(${iconPin}) no-repeat center;
    background-size: 100%;
    width: 14px;
    height: 14px;
  }
  &.icon-pin-fill {
    background: url(${iconPinFill}) no-repeat center;
    background-size: 100%;
    width: 14px;
    height: 14px;
  }
  &.icon-read {
    background: url(${iconRead}) no-repeat center;
    width: 20px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-read-on {
    background: url(${iconReadOn}) no-repeat center;
    width: 20px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-reply {
    background: url(${iconReply}) no-repeat center;
    width: 12px;
    height: 12px;
    background-size: 100%;
  }
  &.icon-reply-on {
    background: url(${iconReplyOn}) no-repeat center;
    width: 12px;
    height: 12px;
    background-size: 100%;
  }
  &.icon-tabs {
    background: url(${iconTabs}) no-repeat center;
    width: 40px;
    height: 34px;
  }
  &.icon-workCard {
    background: url(${iconworkCard}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-workFolder {
    background: url(${iconworkFolder}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-folder-close {
    background: url(${iconFolderClose}) no-repeat center;
    width: 12px;
    height: 10px;
    background-size: 100%;
  }
  &.icon-folder-open {
    background: url(${iconFolderOpen}) no-repeat center;
    width: 12px;
    height: 10px;
    background-size: 100%;
  }
  &.icon-menuApp {
    background: url(${iconMenuApp}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-menuPage {
    background: url(${iconMenuPage}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-bullet {
    background: url(${iconBullet}) no-repeat center;
    width: 15px;
    height: 15px;
  }
  &.icon-hyphen {
    background: url(${iconHyphen}) no-repeat center;
    width: 15px;
    height: 15px;
  }
`;

export default Styled;

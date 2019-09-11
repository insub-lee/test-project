import styled from 'styled-components';
// import notifyMarkHover from 'images/common/widget-notify-mark-hover.png';
import notifyMark from 'images/common/widget-notify-mark.png';
import noDataIcon from 'images/common/icon-no-content-gray.png';
import noDataIconWhite from 'images/common/icon-no-content-white.png';
import bulletIcon from 'images/common/icon-required.png';
import bulletIconOrange from 'images/common/icon-required-orange.png';
import replyGrayIcon from 'images/common/icon-reply-gray.png';
import replyWhiteIcon from 'images/common/icon-reply-white.png';
import delayIcon from 'images/common/widget-icon-delay-gray.png';
import delayIconWhite from 'images/common/widget-icon-delay-white.png';
import unacceptIcon from 'images/common/widget-icon-unaccept-gray.png';
import unacceptIconWhite from 'images/common/widget-icon-unaccept-white.png';
import iconLocationGray from 'images/common/icon-wlocation-gray.png';
import iconLocationWhite from 'images/common/icon-wlocation-white.png';

const WidgetWrapper = styled.div`
  margin: 0;
  height: 100%;

  //스킨세트
  &.wSkin1 {
    background: #ffffff !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #222222;
        font-size: 16px;
      }
    }
    .widgetBody {
      background: transparent !important;
      //내용없음(공통)
      .react-grid-Empty, .noWidgetWrapper {
        .noWCIcon {
          color: #222222;
          background-image: url(${noDataIcon});
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      .quickmenu, .member {
        .titleText {
          color: #404040 !important;
          font-size: 12px;
        }
        .slick-dots {
          > li {
            button { background-color: #bcbcbc; }

            &.slick-active {
              button { background-color: #414141; }
            }
          }
        }
      }
      //이메일, 결재
      .email, .sign {
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIcon});
          }

          .titleText {
            color: #404040 !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(64,64,64,0.7);
            font-size: 11px;

            .div {
              color: rgba(64,64,64,0.7);
            }
          }
        }        
      }
      //게시판
      .board {
        .ant-tabs-bar {
          border-bottom: 1px solid rgba(0,0,0,.1);

          .ant-tabs-tab-prev-icon, 
          .ant-tabs-tab-next-icon {color: #898989;}

          .ant-tabs-nav {
          
            .ant-tabs-nav-wrap {
              margin-bottom: 0;
            }
            
            .ant-tabs-tab {
              padding: 0.35rem 1.125rem;
              background: #eff0f2;
              border: 1px solid #d9d9d9;
              border-right: 0;
              color: #666;
              
              &:last-child {
                border-right: 1px solid #d9d9d9;
              }
              
              &.ant-tabs-tab-active {
                color: #000;
                background-color: #fff;
                border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) #fff;
              }
              
            }
            .ant-tabs-ink-bar {
              //background-color: #886ab5;
              background-color: #ffffff;
            }
          }
        }
        .react-grid-Cell {
          &:first-child {
            // background-image: url(${bulletIcon});
            
            &:before {
              content: '·';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
            }
          }

          .titleText {
            color: #404040 !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(64,64,64,0.7);
            font-size: 11px;

            .div {
              color: rgba(64,64,64,0.7);
            }
            .replyIcon {
              background-image: url(${replyGrayIcon});
            }
          }

          .more {
            color: rgba(64,64,64,0.7);

            > span {
              border-bottom: 1px solid rgba(64,64,64,0.7);
            }
          }
        }
      }
      //iflow
      .iflow {
        .react-grid-Cell {
          border-bottom: 1px dashed #d9d9d9;

          .contentWrapper {
            color: #707070;
            small {
              color: #808080;
            }
            .titleText {
              color: #000000 !important;
            }
          }
        }
      }
      //schedule, today
      .schedule, .today {
        .rbc-toolbar {
          .rbc-btn-group {
            button {
              &:hover {
                border-color: rgba(0,0,0,0.15);
              }
              &:nth-child(2), &:last-child {
                background-color: rgba(0,0,0,0.15);
              }
            }
          }
        }
        .rbc-header {
          background-color: rgba(0,0,0,0.15);
        }
        .react-grid-Cell__value {
          color: #404040;
          font-size: 13px;
        }
      }
      .schedule {
        .react-grid-Cell:first-child {
          .react-grid-Cell__value {
            background: url(${bulletIcon}) no-repeat 0 50%;

            .titleText {
              color: #404040 !important;
            }
          }
        }
      }
      .today {
        .delay {
          background-image: url(${delayIcon});
        }

        .unaccept {
          background-image: url(${unacceptIcon});
        }
      }
      // 날씨
      .weather {
        color: #404040;
        .ant-select {
          color: #404040;

          .ant-select-selection__rendered {
            background-image: url(${iconLocationGray});
          }
        }
      }

    }
  }

  &.wSkin2 {
    background: #dcf6ff !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #222222;
        font-size: 18px;
      }
    }
    .widgetBody {
      background: transparent !important;
      //내용없음(공통)
      .react-grid-Empty, .noWidgetWrapper {
        .noWCIcon {
          color: #222222;
          background-image: url(${noDataIcon});
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      .quickmenu, .member {
        .titleText {
          color: #404040 !important;
          font-size: 12px;
        }
        .slick-dots {
          > li {
            button { background-color: #bcbcbc; }

            &.slick-active {
              button { background-color: #414141; }
            }
          }
        }
      }
      //이메일, 결재
      .email, .sign {
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIcon});
          }

          .titleText {
            color: #404040 !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(64,64,64,0.7);
            font-size: 11px;

            .div {
              color: rgba(64,64,64,0.7);
            }
          }
        }        
      }
      //게시판
      .board {
        .ant-tabs-bar {
          border-bottom: 1px solid rgba(34,34,34,0.2);

          .ant-tabs-tab-prev-icon, 
          .ant-tabs-tab-next-icon {color: #898989;}

          .ant-tabs-nav {
            .ant-tabs-tab {
               color: #333;
              
              &.ant-tabs-tab-active {
                color: #886ab5;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #886ab5;
              //background-color: #ffffff;
            }
          }
        }
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIcon});
          }

          .titleText {
            color: #404040 !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(64,64,64,0.7);
            font-size: 11px;

            .div {
              color: rgba(64,64,64,0.7);
            }
            .replyIcon {
              background-image: url(${replyGrayIcon});
            }
          }

          .more {
            color: rgba(64,64,64,0.7);

            > span {
              border-bottom: 1px solid rgba(64,64,64,0.7);
            }
          }
        }
      }
      //iflow
      .iflow {
        .react-grid-Cell {
          border-bottom: 1px dashed #d9d9d9;

          .contentWrapper {
            color: #707070;
            small {
              color: #808080;
            }
            .titleText {
              color: #000000 !important;
            }
          }
        }
      }
      //schedule, today
      .schedule, .today {
        .rbc-toolbar {
          .rbc-btn-group {
            button {
              &:hover {
                border-color: rgba(0,0,0,0.15);
              }
              &:nth-child(2), &:last-child {
                background-color: rgba(0,0,0,0.15);
              }
            }            
          }
        }
        .rbc-header {
          background-color: rgba(0,0,0,0.15);
        }
        .react-grid-Cell__value {
          color: #404040;
          font-size: 13px;
        }
      }
      .schedule {
        .react-grid-Cell:first-child {
          .react-grid-Cell__value {
            background: url(${bulletIcon}) no-repeat 0 50%;
          }
        }
      }
      .today {
        .delay {
          background-image: url(${delayIcon});
        }

        .unaccept {
          background-image: url(${unacceptIcon});
        }
      }
      // 날씨
      .weather {
        color: #404040;
        .ant-select {
          color: #404040;

          .ant-select-selection__rendered {
            background-image: url(${iconLocationGray});
          }
        }
      }
    }
  }

  &.wSkin3 {
    background: #fcf5d1 !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #222222;
        font-size: 18px;
      }
    }
    .widgetBody {
      background: transparent !important;
      //내용없음(공통)
      .react-grid-Empty, .noWidgetWrapper {
        .noWCIcon {
          color: #222222;
          background-image: url(${noDataIcon});
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      .quickmenu, .member {
        .titleText {
          color: #404040 !important;
          font-size: 12px;
        }
        .slick-dots {
          > li {
            button { background-color: #bcbcbc; }

            &.slick-active {
              button { background-color: #414141; }
            }
          }
        }
      }
      //이메일, 결재
      .email, .sign {
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIcon});
          }

          .titleText {
            color: #404040 !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(64,64,64,0.7);
            font-size: 11px;

            .div {
              color: rgba(64,64,64,0.7);
            }
          }
        }        
      }
      //게시판
      .board {
        .ant-tabs-bar {
          border-bottom: 1px solid rgba(34,34,34,0.2);

          .ant-tabs-tab-prev-icon, 
          .ant-tabs-tab-next-icon {color: #898989;}

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(34,34,34,0.7);
              
              &.ant-tabs-tab-active {
                color: #886ab5;
              }
            }
            .ant-tabs-ink-bar {
              //background-color: #886ab5;
              background-color: #ffffff;
            }
          }
        }
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIcon});
          }

          .titleText {
            color: #404040 !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(64,64,64,0.7);
            font-size: 11px;

            .div {
              color: rgba(64,64,64,0.7);
            }
            .replyIcon {
              background-image: url(${replyGrayIcon});
            }
          }

          .more {
            color: rgba(64,64,64,0.7);

            > span {
              border-bottom: 1px solid rgba(64,64,64,0.7);
            }
          }
        }
      }
      //iflow
      .iflow {
        .react-grid-Cell {
          border-bottom: 1px dashed #d9d9d9;

          .contentWrapper {
            color: #707070;
            small {
              color: #808080;
            }
            .titleText {
              color: #000000 !important;
            }
          }
        }
      }
      //schedule, today
      .schedule, .today {
        .rbc-toolbar {
          .rbc-btn-group {
            button {
              &:hover {
                border-color: rgba(0,0,0,0.15);
              }
              &:nth-child(2), &:last-child {
                background-color: rgba(0,0,0,0.15);
              }
            }
          }
        }
        .rbc-header {
          background-color: rgba(0,0,0,0.15);
        }
        .react-grid-Cell__value {
          color: #404040;
          font-size: 13px;
        }
      }
      .schedule {
        .react-grid-Cell:first-child {
          .react-grid-Cell__value {
            background: url(${bulletIcon}) no-repeat 0 50%;
          }
        }
      }
      .today {
        .delay {
          background-image: url(${delayIcon});
        }

        .unaccept {
          background-image: url(${unacceptIcon});
        }
      }
      // 날씨
      .weather {
        color: #404040;
        .ant-select {
          color: #404040;

          .ant-select-selection__rendered {
            background-image: url(${iconLocationGray});
          }
        }
      }
    }
  }

  &.wSkin4 {
    background: #0a9b65 !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #ffffff;
        font-size: 18px;
      }
    }
    .widgetBody {
      background: transparent !important;
      //내용없음(공통)
      .react-grid-Empty, .noWidgetWrapper {
        .noWCIcon {
          color: rgba(255,255,255,0.6);
          background-image: url(${noDataIconWhite});
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      .quickmenu, .members {
        .titleText {
          color: #ffffff !important;
          font-size: 12px;
        }
        .slick-dots {
          > li {
            button { background-color: rgba(255,255,255,0.65); }

            &.slick-active {
              button { background-color: #ffffff; }
            }
          }
        }
      }
      //이메일, 결재
      .email, .sign {
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.5);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.3);
            }
          }
        }        
      }
      //게시판
      .board {
        .ant-tabs-bar {
          border-bottom: 1px solid rgba(255,255,255,0.3);

          .ant-tabs-tab-prev-icon, 
          .ant-tabs-tab-next-icon {color: #ffffff;}

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(255,255,255,0.6);
              
              &.ant-tabs-tab-active {
                color: #ffffff;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #ffffff;
            }
          }
        }
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.7);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.7);
            }
            .replyIcon {
              background-image: url(${replyWhiteIcon});
            }
          }

          .more {
            color: rgba(255,255,255,0.7);

            > span {
              border-bottom: 1px solid rgba(255,255,255,0.7);
            }
          }
        }
      }
      //iflow
      .iflow {
        .react-grid-Cell {
          border-bottom: 1px dashed rgba(255,255,255,0.3);

          .contentWrapper {
            color: rgba(255,255,255,0.7);
            small {
              color: rgba(255,255,255,0.7);
            }
            .titleText {
              color: #ffffff !important;
            }
          }
        }
      }
      //schedule, today
      .schedule, .today {
        .rbc-toolbar {
          .rbc-btn-group {
            button {
              &:hover {
                border-color: rgba(255,255,255,0.45);
              }
              &:nth-child(2), &:last-child {
                background-color: rgba(255,255,255,0.45);
              }
            }
          }
        }
        .rbc-header {
          background-color: rgba(255,255,255,0.45);
        }
        .react-grid-Cell__value {
          color: #ffffff;
          font-size: 13px;
        }
      }
      .schedule {
        .react-grid-Cell:first-child {
          .react-grid-Cell__value {
            background: url(${bulletIconOrange}) no-repeat 0 50%;
          }
        }
      }
      .today {
        .delay {
          background-image: url(${delayIconWhite});
        }

        .unaccept {
          background-image: url(${unacceptIconWhite});
        }
      }
      // 날씨
      .weather {
        color: #ffffff;
        .ant-select {
          color: #ffffff;

          .ant-select-selection__rendered {
            background-image: url(${iconLocationWhite});
          }
        }
      }
    }
  }

  &.wSkin5 {
    background: #0999e5 !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #ffffff;
        font-size: 18px;
      }
    }
    .widgetBody {
      background: transparent !important;
      //내용없음(공통)
      .react-grid-Empty, .noWidgetWrapper {
        .noWCIcon {
          color: rgba(255,255,255,0.6);
          background-image: url(${noDataIconWhite});
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      .quickmenu, .members {
        .titleText {
          color: #ffffff !important;
          font-size: 12px;
        }
        .slick-dots {
          > li {
            button { background-color: rgba(255,255,255,0.65); }

            &.slick-active {
              button { background-color: #ffffff; }
            }
          }
        }
      }
      //이메일, 결재
      .email, .sign {
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.5);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.3);
            }
          }
        }      
      }
      //게시판
      .board {
        .ant-tabs-bar {
          border-bottom: 1px solid rgba(255,255,255,0.3);

          .ant-tabs-tab-prev-icon, 
          .ant-tabs-tab-next-icon {color: #ffffff;}

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(255,255,255,0.6);
              
              &.ant-tabs-tab-active {
                color: #ffffff;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #ffffff;
            }
          }
        }
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.7);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.7);
            }
            .replyIcon {
              background-image: url(${replyWhiteIcon});
            }
          }

          .more {
            color: rgba(255,255,255,0.7);

            > span {
              border-bottom: 1px solid rgba(255,255,255,0.7);
            }
          }
        }
      }
      //iflow
      .iflow {
        .react-grid-Cell {
          border-bottom: 1px dashed rgba(255,255,255,0.3);

          .contentWrapper {
            color: rgba(255,255,255,0.7);
            small {
              color: rgba(255,255,255,0.7);
            }
            .titleText {
              color: #ffffff !important;
            }
          }
        }
      }
      //schedule, today
      .schedule, .today {
        .rbc-toolbar {
          .rbc-btn-group {
            button {
              &:hover {
                border-color: rgba(255,255,255,0.45);
              }
              &:nth-child(2), &:last-child {
                background-color: rgba(255,255,255,0.45);
              }
            }            
          }
        }
        .rbc-header {
          background-color: rgba(255,255,255,0.45);
        }
        .react-grid-Cell__value {
          color: #ffffff;
          font-size: 13px;
        }
      }
      .schedule {
        .react-grid-Cell:first-child {
          .react-grid-Cell__value {
            background: url(${bulletIconOrange}) no-repeat 0 50%;
          }
        }
      }
      .today {
        .delay {
          background-image: url(${delayIconWhite});
        }

        .unaccept {
          background-image: url(${unacceptIconWhite});
        }
      }
      // 날씨
      .weather {
        color: #ffffff;
        .ant-select {
          color: #ffffff;

          .ant-select-selection__rendered {
            background-image: url(${iconLocationWhite});
          }
        }
      }
    }
  }

  &.wSkin6 {
    background: #435cce !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #ffffff;
        font-size: 18px;
      }
    }
    .widgetBody {
      background: transparent !important;
      //내용없음(공통)
      .react-grid-Empty, .noWidgetWrapper {
        .noWCIcon {
          color: rgba(255,255,255,0.6);
          background-image: url(${noDataIconWhite});
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      .quickmenu, .members {
        .titleText {
          color: #ffffff !important;
          font-size: 12px;
        }
        .slick-dots {
          > li {
            button { background-color: rgba(255,255,255,0.65); }

            &.slick-active {
              button { background-color: #ffffff; }
            }
          }
        }
      }
      //이메일, 결재
      .email, .sign {
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.5);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.3);
            }
          }
        }
      }
      //게시판
      .board {
        .ant-tabs-bar {
          border-bottom: 1px solid rgba(255,255,255,0.3);

          .ant-tabs-tab-prev-icon, 
          .ant-tabs-tab-next-icon {color: #ffffff;}

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(255,255,255,0.6);
              
              &.ant-tabs-tab-active {
                color: #ffffff;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #ffffff;
            }
          }
        }
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.7);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.7);
            }
            .replyIcon {
              background-image: url(${replyWhiteIcon});
            }
          }
          .more {
            color: rgba(255,255,255,0.7);

            > span {
              border-bottom: 1px solid rgba(255,255,255,0.7);
            }
          }
        }
      }
      //iflow
      .iflow {
        .react-grid-Cell {
          border-bottom: 1px dashed rgba(255,255,255,0.3);

          .contentWrapper {
            color: rgba(255,255,255,0.7);
            small {
              color: rgba(255,255,255,0.7);
            }
            .titleText {
              color: #ffffff !important;
            }
          }
        }
      }
      //schedule, today
      .schedule, .today {
        .rbc-toolbar {
          .rbc-btn-group {
            button {
              &:hover {
                border-color: rgba(255,255,255,0.45);
              }
              &:nth-child(2), &:last-child {
                background-color: rgba(255,255,255,0.45);
              }
            }            
          }
        }
        .rbc-header {
          background-color: rgba(255,255,255,0.45);
        }
        .react-grid-Cell__value {
          color: #ffffff;
          font-size: 13px;
        }
      }
      .schedule {
        .react-grid-Cell:first-child {
          .react-grid-Cell__value {
            background: url(${bulletIconOrange}) no-repeat 0 50%;
          }
        }
      }
      .today {
        .delay {
          background-image: url(${delayIconWhite});
        }

        .unaccept {
          background-image: url(${unacceptIconWhite});
        }
      }
      // 날씨
      .weather {
        color: #ffffff;
        .ant-select {
          color: #ffffff;

          .ant-select-selection__rendered {
            background-image: url(${iconLocationWhite});
          }
        }
      }
    }
  }

  &.wSkin7 {
    background: #fa6800 !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #ffffff;
        font-size: 18px;
      }
    }
    .widgetBody {
      background: transparent !important;
      //내용없음(공통)
      .react-grid-Empty, .noWidgetWrapper {
        .noWCIcon {
          color: rgba(255,255,255,0.6);
          background-image: url(${noDataIconWhite});
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      .quickmenu, .members {
        .titleText {
          color: #ffffff !important;
          font-size: 12px;
        }
        .slick-dots {
          > li {
            button { background-color: rgba(255,255,255,0.65); }

            &.slick-active {
              button { background-color: #ffffff; }
            }
          }
        }
      }
      //이메일, 결재
      .email, .sign {
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.5);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.3);
            }
          }
        }     
      }
      //게시판
      .board {
        .ant-tabs-bar {
          border-bottom: 1px solid rgba(255,255,255,0.3);

          .ant-tabs-tab-prev-icon, 
          .ant-tabs-tab-next-icon {color: #ffffff;}

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(255,255,255,0.6);
              
              &.ant-tabs-tab-active {
                color: #ffffff;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #ffffff;
            }
          }
        }
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.7);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.7);
            }
            .replyIcon {
              background-image: url(${replyWhiteIcon});
            }
          }
          .more {
            color: rgba(255,255,255,0.7);

            > span {
              border-bottom: 1px solid rgba(255,255,255,0.7);
            }
          }
        }
      }
      //iflow
      .iflow {
        .react-grid-Cell {
          border-bottom: 1px dashed rgba(255,255,255,0.3);

          .contentWrapper {
            color: rgba(255,255,255,0.7);
            small {
              color: rgba(255,255,255,0.7);
            }
            .titleText {
              color: #ffffff !important;
            }
          }
        }
      }
      //schedule, today
      .schedule, .today {
        .rbc-toolbar {
          .rbc-btn-group {
            button {
              &:hover {
                border-color: rgba(255,255,255,0.45);
              }
              &:nth-child(2), &:last-child {
                background-color: rgba(255,255,255,0.45);
              }
            }
          }
        }
        .rbc-header {
          background-color: rgba(255,255,255,0.45);
        }
        .react-grid-Cell__value {
          color: #ffffff;
          font-size: 13px;
        }
      }
      .schedule {
        .react-grid-Cell:first-child {
          .react-grid-Cell__value {
            background: url(${bulletIconOrange}) no-repeat 0 50%;
          }
        }
      }
      .today {
        .delay {
          background-image: url(${delayIconWhite});
        }

        .unaccept {
          background-image: url(${unacceptIconWhite});
        }
      }
      // 날씨
      .weather {
        color: #ffffff;
        .ant-select {
          color: #ffffff;

          .ant-select-selection__rendered {
            background-image: url(${iconLocationWhite});
          }
        }
      }
    }
  }

  &.wSkin8 {
    background: #404040 !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #ffffff;
        font-size: 18px;
      }
    }
    .widgetBody {
      background: transparent !important;
      //내용없음(공통)
      .react-grid-Empty, .noWidgetWrapper {
        .noWCIcon {
          color: rgba(255,255,255,0.6);
          background-image: url(${noDataIconWhite});
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      .quickmenu, .members {
        .titleText {
          color: #ffffff !important;
          font-size: 12px;
        }
        .slick-dots {
          > li {
            button { background-color: rgba(255,255,255,0.65); }

            &.slick-active {
              button { background-color: #ffffff; }
            }
          }
        }
      }
      //이메일, 결재
      .email, .sign {
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.5);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.3);
            }
          }
        }
      }
      //게시판
      .board {
        .ant-tabs-bar {
          border-bottom: 1px solid rgba(255,255,255,0.3);

          .ant-tabs-tab-prev-icon, 
          .ant-tabs-tab-next-icon {color: #ffffff;}

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(255,255,255,0.6);
              
              &.ant-tabs-tab-active {
                color: #ffffff;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #ffffff;
            }
          }
        }
        .react-grid-Cell {
          &:first-child {
            background-image: url(${bulletIconOrange});
          }

          .titleText {
            color: #ffffff !important;
            font-size: 13px;
          }
          .subInfo {
            color: rgba(255,255,255,0.7);
            font-size: 11px;

            .div {
              color: rgba(255,255,255,0.7);
            }
            .replyIcon {
              background-image: url(${replyWhiteIcon});
            }
          }
          .more {
            color: rgba(255,255,255,0.7);

            > span {
              border-bottom: 1px solid rgba(255,255,255,0.7);
            }
          }
        }
      }
      //iflow
      .iflow {
        .react-grid-Cell {
          border-bottom: 1px dashed rgba(255,255,255,0.3);

          .contentWrapper {
            color: rgba(255,255,255,0.7);
            small {
              color: rgba(255,255,255,0.7);
            }
            .titleText {
              color: #ffffff !important;
            }
          }
        }
      }
      //schedule, today
      .schedule, .today {
        .rbc-toolbar {
          .rbc-btn-group {
            button {
              &:hover {
                border-color: rgba(255,255,255,0.45);
              }
              &:nth-child(2), &:last-child {
                background-color: rgba(255,255,255,0.45);
              }
            }            
          }
        }
        .rbc-header {
          background-color: rgba(255,255,255,0.45);
        }
        .react-grid-Cell__value {
          color: #ffffff;
          font-size: 13px;
        }
      }
      .schedule {
        .react-grid-Cell:first-child {
          .react-grid-Cell__value {
            background: url(${bulletIconOrange}) no-repeat 0 50%;
          }
        }
      }
      .today {
        .delay {
          background-image: url(${delayIconWhite});
        }

        .unaccept {
          background-image: url(${unacceptIconWhite});
        }
      }
      // 날씨
      .weather {
        color: #ffffff;
        .ant-select {
          color: #ffffff;

          .ant-select-selection__rendered {
            background-image: url(${iconLocationWhite});
          }
        }
      }
    }
  }

  @media only screen and (max-width: 767) {
    margin-right: 0 !important;
  }
`;

const WidgetHeader = styled.div`
  position: relative;
  height: 45px;
  border-bottom: 1px solid #d2d2d2;

  > h2 {
    position: relative;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    line-height: 45px;
    padding: 0 20px;

    &:hover {
      .notifyStatus {
        background-image: url(${notifyMark});
      }
    }

    .iconsWrapper {
      position: absolute;
      // 위젯 헤더 마우스 오버 영역
      top: -30px;
      right: 0;
      display: inline-block;
      width: 100%;
      height: 35px;
      background-color: rgba(0, 0, 0, 0.4);
      text-align: right;
      opacity: 0;
      z-index: 1;

      &:hover {
        -webkit-animation: fadeInDown 0.2s;
        animation: fadeInDown 0.2s;
        opacity: 1;
        top: 0;
      }

      ul {
        display: inline-block;
        height: 35px;
        margin-right: 6px;

        > li {
          float: left;
          width: 31px;
          height: 35px;
        }
      }
    }
  }

  //제목이 없을 때
  &.noTitle {
    height: 0;
    border-bottom: none;

    > h2 {
      height: 0;
      text-indent: -99999px;

      :hover {
        border-bottom: none;

        .notifyStatus.noTitle {
          opacity: 1;
          background-image: url(${notifyMark});
        }
      }
    }
  }
`;

const WidgetBox = styled.div`
  display: inline-block;
  width: 100%;
  // height: calc(100% - 35px) !important;
  height: calc(100% - 50px);
  padding: 10px 10px;

  .ant-table-thead > tr > th {
    background: #6a60b9;
    border-bottom: 0px solid #e8e8e8;
    color: #fff;
  }

  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 10px;
  }

  // '내용 없음' 공통 스타일
  .react-grid-Empty, .noWidgetWrapper {
    position: absolute;
    display: table;
    width: 100%;
    height: 270px;

    .noWidgetContent {
      display: table-cell;          
      text-align: center;
      vertical-align: middle;

      .noWCIcon {
        height: 50px;
        padding-top: 28px;
        // color: #222222; //위젯색상 옵션에 포함됨
        font-size: 15px;
        // background-image: url(${noDataIcon}); //위젯색상 옵션에 포함됨
        background-repeat: no-repeat;
        background-position: 50% 0;
        opacity: 0.6;
      }
    }
  }

  .react-grid-Empty {
    top: -35px; //헤더(제목) 없을 때 상관없이 중앙에 위치
  }

  .noWidgetWrapper {
    top: 0;
    .noWCIcon {
      margin-top: 4px;
    }
  }
  // '내용 없음' 커스텀 스타일
  .board, .iflow, .schedule, .today {
    .noWCIcon {
      margin-top: 4px;
    }
  }
  .board {
    .react-grid-Empty {
      top: -75px !important;
    }
  }
  .schedule {
    .react-grid-Empty {
      top: -89px !important;
    }
  }
  .today {
    .react-grid-Empty {
      top: -82px !important;
    }
  }

  // 그 외 위젯 '내용 없음' 스타일
  .carouselWrapper {
    //퀵메뉴, 구성원즐겨찾기
    &.quickmenu, &.members {
      margin-top: 0;
    }
  }

  // 위젯 크기: 1x1, 2x1 등, 위젯 제목(O)
  &.sizeH1 {
    // 메인에 있는 위젯, 권한 신청
    .portalMainWidget {
      height: 235px;
    }
    //퀵메뉴, 구성원즐겨찾기
    .quickmenu, .members {
      .slick-list {
        height: 206px !important; 
      }
    }   
  }

  // 위젯 크기: 1x2, 2x2 등, 위젯 제목(O)
  &.sizeH2 {
    .react-grid-Empty, .noWidgetWrapper {
      height: 550px;
    }
    //퀵메뉴, 구성원즐겨찾기
    .quickmenu, .members {
      .slick-list {
        height: 486px !important;

        .slick-track {
          height: 100%;
        }
      }
    }
  }

  // 위젯 제목(X) --> 시작
  &.fullHeight {
    //날씨
    .weather, .stock {
      margin-top: 35px;
    }

    //슬라이더
    .carouselWrapper {
      &.banner {
        height: 270px;
        
        .slick-list {
          height: 270px;

          .slideContent {
            height: 270px;
            > img {
              height: 270px !important;
              max-height: 270px !important;
            }
          }
        }
      }
      //퀵메뉴, 구성원즐겨찾기
      &.quickmenu, &.members {
        margin-top: 50px;
      }      
    }

    // react-data-grid '내용 없음' 공통 스타일
    .react-grid-Empty {
      top: 0; //헤더(제목) 없을 때 상관없이 중앙에 위치
    }
    // react-data-grid '내용 없음' 커스텀 스타일
    .board, .schedule, .today {
      .noWCIcon {
        margin-top: 4px;
      }
    }
    .board {
      .react-grid-Empty {
        top: -40px !important;
      }
    }
    .schedule {
      .react-grid-Empty {
        top: -54px !important;
      }
    }
    .today {
      .react-grid-Empty {
        top: -47px !important;
        }
      }
    }    

    //일정, 할일
    // .schedule, .today {
    //   height: 270px;

    //   .react-grid-Grid {
    //     min-height: 219px !important;        

    //     .react-grid-Canvas {
    //       height: 219px !important;
    //     }
    //   }
    // }
    
  }

  &.fullHeight.sizeH1 {
    // 메인에 있는 위젯, 권한 신청
    .portalMainWidget {
      height: 270px;
    }
  }

  // 위젯 크기: 1x2, 2x2 등
  &.fullHeight.sizeH2 {
    .portalMainWidget {
      height: 550px;
    }

    .quickmenu, .members {
      .slick-list {
        height: 486px !important;

        .slick-track {
          height: 100%;
        }
      }
    }
  }
  
  // 위젯 크기: 2x1, 2x2 등
  &.fullHeight.siexW2 {
    .quickmenu, .members {
      .ant-carousel {
        margin: 15px 55px 0 55px;

        .slick-prev {
          left: -55px;
        }
        .slick-next {
          right: -55px;
        }
      }
    }
  }
  // 위젯 제목(X) --> 끝

  .isoCardWidget {
    padding: 0;
    font-size: 12px;
  }

  canvas {
    width: 100% !important;
    height: 100%;
  }
`;

const WidgetColumn = styled.div`
  align-content: flex-start;
`;

export { WidgetWrapper, WidgetBox, WidgetHeader, WidgetColumn };

import styled from 'styled-components';
// import { palette } from 'styled-theme';
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

const SingleStyleWidget = styled.div`
  margin: 0px;
  padding: 0;
  width: 100%;
  margin: 0 auto;
  
  //스킨세트
  &.wSkin1 {
    background: #ffffff !important;
    .widgetHeader {
      background: transparent !important;
      > h2 {
        color: #222222 !important;
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
          border-bottom: 1px solid rgba(64,64,64,0.7);

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(64,64,64,0.7);
              
              &.ant-tabs-tab-active {
                color: #886ab5;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #886ab5;
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
            color: #707070 !important;
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
          color: #404040 !important;
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
        color: #404040 !important;
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
          border-bottom: 1px solid rgba(64,64,64,0.7);

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(64,64,64,0.7);
              
              &.ant-tabs-tab-active {
                color: #404040;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #404040;
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
          border-bottom: 1px solid rgba(64,64,64,0.7);

          .ant-tabs-nav {
            .ant-tabs-tab {
              color: rgba(64,64,64,0.7);
              
              &.ant-tabs-tab-active {
                color: #404040;
              }
            }
            .ant-tabs-ink-bar {
              background-color: #404040;
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
      .quickmenu, .member {
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
      .quickmenu, .member {
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
      .quickmenu, .member {
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
      .quickmenu, .member {
        .titleText {
          color: #ffffff;
          font-size: 12px !important;
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
      .quickmenu, .member {
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
  height: 50px;
  border-bottom: 1px solid #d2d2d2;
  // background: $/*{props => props.theme.widget.header.bgColor};
  // color: $/*{props => props.theme.widget.header.color};

  > h2 {
    position: relative;
    // color: #222222;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    line-height: 35px;
    letter-spacing: -0.5px;

    :hover {
      // color: #ffffff;
      // background-color: #fc0939;
      border-bottom: 1px solid #ccd2d8;

      .iconsWrapper {
        opacity: 1;
      }

      .notifyStatus {
        background-image: url(${notifyMark});
      }
    }

    .iconsWrapper {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      height: 35px;
      opacity: 0;

      > li {
        float: left;
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
  //height: calc(100% - 35px) !important;
  height: calc(100% - 50px);
  //padding: 0;
  padding: 10px 0;
  // background: $/*{props => props.theme.widget.box.bgColor};
  // color: $/*{props => props.theme.widget.box.color};

  &.fullHeight {
    height: 100% !important;
  }

  .isoCardWidget {
    padding: 0;
    font-size: 12px;
  }

  canvas {
    width: 100% !important;
    height: 100%;
  }
`;

const WidgetColumn = styled.div`align-content: flex-start;`;

export { SingleStyleWidget, WidgetBox, WidgetHeader, WidgetColumn };

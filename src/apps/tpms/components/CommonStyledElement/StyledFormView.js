import styled from 'styled-components';

const StyledFormView = styled.div`
  border: ${({ noBoarder }) => (noBoarder ? 'none' : '1px solid #d4d7df')};
  background: white;
  /* 100%는 윗단계에서 넓이를 지정 했을 시 */
  /* 임의적으로 800px로 지정 */
  width: calc(100% - 2px);
  // width: 800px;

  &.noBg {
    background: transparent;
  }

  &.all_white_color {
    * {
      color: white !important;
    }
  }

  .view_con {
    padding: 30px;

    &.no_padding {
      padding: 0;
    }

    &.small_view {
      ul.sub_form {
        //margin-top: -26px;

        & > li {
          padding-left: 0;

          .title {
            position: relative;
            display: block;
            //line-height: 80px;
          }
        }
      }
    }

    .sub_form {
      font-size: 0;
      text-align: left;
      //margin-top: -10px;
      overflow: hidden;
      .fr-view {
        p {
          word-break: break-all;
        }
      }

      li {
        position: relative;
        min-height: 49px;
        // padding-left: 250px;
        // padding-left: 180px;
        padding-left: 0;
        margin-bottom: 15px;
        font-size: 15px;
        clear: both;

        &.flCustom {
          float: left;
        }

        &.frCustom {
          float: right;
        }

        &.width50 {
          width: calc(50% - 20px);
          clear: none;
        }

        &.marginNone {
          margin-right: 0;
        }

        &.report_form {
          & > div {
            display: inline-block;
            width: calc(100% - 200px);
            &.title {
              width: 200px;
            }
          }
        }

        .title {
          // position: absolute;
          position: relative;
          left: 0;
          top: 0;
          height: 48px;
          line-height: 48px;
        }

        > ul > li {
          display: inline-block;
          padding: 0;
        }
      }
    }

    .survey_form {
      //border-bottom: 1px solid #dadada;
      border-bottom: none;
      margin-bottom: -1px;
    }
    .survey_form dt {
      border-top: 1px solid #dadada;
      border-bottom: 1px solid #dadada;
      padding: 15px;
      background: #fafafa;
      font-size: 16px;
      font-weight: 500;
    }
    .survey_form ul {
      padding: 10px 15px;
    }
    .survey_form li {
      margin: 10px 0;
      position: relative;
    }
    .survey_form li.pl {
      padding-left: 80px;
    }
    .survey_form li .tit {
      position: absolute;
      left: 0;
      top: 50%;
      font-size: 16px;
      font-weight: 500;
      transform: translateY(-50%);
    }
  }

  .sub_form li.mb {
    margin-bottom: 0px;
  }

  .sub_form li.quater {
    clear: none;
    width: calc(25% - 20px);
    display: inline-block;

    &.mr {
      margin-right: 20px;
    }

    &.ml {
      margin-left: 20px;
    }
    &.mb {
      margin-bottom: 0px;
    }
  }

  .sub_form li.half {
    clear: none;
    width: calc(50% - 20px);
    display: inline-block;

    &.mr {
      margin-right: 20px;
    }

    &.ml {
      margin-left: 20px;
    }
    &.mb {
      margin-bottom: 0px;
    }

    &.half-end {
      margin-right: calc(50%);
    }
  }
  .sub_form li.half.fr {
    margin-left: 40px;
  }
  .sub_form li.half_mo {
    clear: none;
    width: calc(46% - 250px);
  }
  .sub_form .sub_form {
    padding-top: 10px;
  }

  .sub_form.small > li {
    padding-left: 150px;
  }
  .sub_form.small2 > li {
    padding-left: 120px;
  }
  .sub_form.small2 li.half {
    //width: calc(46% - 110px);
    width: calc(50% - 60px);
  }
  .sub_form.small2 li.half.fr {
    //width: calc(46% - 130px);
    width: calc(50% - 60px);
    margin-left: 40px;
  }

  .sub_form li.improve_form {
    & > div > input {
      background: #e7e7e7;
      border: 0;
      padding: 0 10px;
    }
    & > div > textarea,
    & > div > p {
      height: 200px;
      background: #e7e7e7;
      border: 0;
      padding: 10px;
      resize: none;
    }
    & > div > p {
      word-break: break-all;
      overflow: hidden;
      overflow-y: auto;
    }
    & > div > select {
      background: #e7e7e7 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAAu0lEQVRIie2WsQ3CMBBFn1EqhqDPBlRAi2+IjIIY6lxDxwa0iIKKmjY0FxRFTmQLufNvrC+f79lXfNk9Xu+ewmpsdQUZ/apg858qpELKqZnbCKob4G7We5FrpGYPBLOtF3nGes2+xA60Qz9rmA1YhIxAMgLtIoDjEgDAWXYtxkpQPQBq9gSch3vExjhRnwSZgNbAJxEAOdnlRS5AZ7ZLBACJ4xorqG69yC21npxx/aEa9RVSUEMKF/0WfQG+mErmooDh3gAAAABJRU5ErkJggg==) no-repeat right 10px center;
      padding: 0 10px;
      border: 0;
    }
    & .react-datepicker-wrapper {
      background-color: #e7e7e7;
      padding: 0 10px;
      & > input {
        border: 0;
      }
    }
  }

  .sub_form li.improve_form.customColorDiv {
    & > div.title2 {
      background: none;
    }
    & > div {
      background: #e7e7e7;
      & > ul {
        padding: 10px 10px 5px;
        border: 0;
        & li {
          margin-bottom: 5px !important;
          background: #fff;
        }
      }
      & > .btn_wrap {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }
    }
  }

  .sub_form li.improve_form.customColorDiv02 {
    & .btn_wrap {
      margin-top: 10px;
    }
    & ul.users {
      background: #e7e7e7;
      border: 0;
      padding: 10px;
    }
    & ul.users li.user_tag {
      background: #fff;
    }
    &.textareaHeight textarea {
      height: 300px;
    }
  }

  .sub_form li.improve_form.std {
    min-height: 49px;
    display: inline-block;
    width: 100%;
    padding-left: 0px;
    & > div {
      display: inline-block;
      width: calc(100% - 200px);
      vertical-align: middle;
    }
    & > .title2 {
        width: 200px;
      }
    }
  }

  .sub_form li.improve_form.std.half  {
    & > div {
      width: calc(65% - 200px);
      }
    & > .title2 {
        width: 200px;
      }
  }

  .sub_form li.improve_form.ex {
    min-height: 49px;
    display: inline-block;
    width: 100%;
    padding-left: 0px;
    & > .title2 {
        width: 200px;
        display: inline-block;
      }
  }

  .sub_form li.improve_form.width50 {
    width: calc(50% - 20px);
    clear: none;
    & .title {
      width: 20%;
      float: left;
    }
    & .dates {
      width: 80%;
      & button.icon_date {
        border-bottom: 0;
      }
    }
  }

  .sub_form li.improve_form.width33 {
    width: calc(32% - 20px);
    clear: none;
    margin-right: 61px;
    &.marginNone {
      margin-right: 0px;
    }
  }

  .sub_form li.improve_form.width20 {
    width: calc(20% - 20px);
    clear: none;
    margin-right: 25px;
    &.marginNone {
      margin-right: 0px;
    }
  }

  .sub_form li.improve_form.flCustom {
    float:left;
  }

  .sub_form li.improve_form.frCustom {
    float:right;
  }

  @media screen and (max-width: 1500px) {
    .view_con .sub_form li.report_form {
      & > div {
        display: inline-block;
        width: calc(100% - 130px);
        &.title {
          width: 130px;
        }
      }
    }
  }

  @media screen and (max-width: 1260px) {
    .view_con {
      padding: 30px;

      ul.sub_form {
        //margin-top: -26px;

        & > li {
          padding-left: 0;

          .title {
            position: relative;
            display: block;
            width: 100%;
          }
          &.report_form > div,
          &.report_form > div.title {
            width: 100%;
          }
        }
      }
    }

    .sub_form li.improve_form {
      width: 100% !important;
      clear: both;
      min-height: 49px;
      display: inline-block;
      padding-left: 0px;
      &.std > div {
        position: relative;
        width: 100%;
        &.title2 {
          display: block;
          margin-bottom: 10px;
        }
      }
      &.width50 .title {
        width: 100%;
        float: none;
        margin-bottom: 10px;
      }
      &.width50 .dates {
        width: 100%;
        display: block;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .view_con .sub_form li {
      &.flCustom,
      &.frCustom,
      &.width50 {
        float: none;
        clear: both;
        width: 100%;
      }
    }
  }
`;

export default StyledFormView;

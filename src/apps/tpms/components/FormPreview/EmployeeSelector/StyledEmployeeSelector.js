import styled from 'styled-components';

const StyledEmployeeSelecotr = styled.div`
  & {
    // padding: 10px;
    ul.sub_form {
      padding-top: 10px;
      font-size: 0;
      text-align: left;
      // margin-top: -10px;

      & > li {
        position: relative;
        min-height: 49px;
        padding-left: 150px;
        margin-bottom: 15px;
        font-size: 15px;
        clear: both;
        min-width: 200px;
        width: 40%;

        ul.users {
          display: flex;

          flex-wrap: wrap;
          min-width: 35%;
          border: 0;
          border-radius: 0;
          background: 0;
          border-bottom: 1px solid #d9e0e7;
          font-size: 15px;
          min-height: 45px;
          //line-height: 45px;
          color: #555;
          vertical-align: middle;
          text-align: left;
          align-items: center;

          & > .user_tag {
            width: 150px;
            position: relative;
            padding: 0;
            //color: #fff;
            margin: 3px;
            //background: #636a78;
            border: 1px solid #ccc;
            font-size: 14px;
            font-weight: 500;
            text-align: left;

            //padding: 0 60px;
            min-height: 0;
            height: 30px;
            line-height: 30px;
            -webkit-border-radius: 30px;
            -moz-border-radius: 30px;
            border-radius: 30px;
            width: auto;

            & > span {
              margin: 0 30px 0 15px;
              font-size: 14px;
              vertical-align: top;
            }

            & > button {
              position: absolute;
              //top: 8px;
              right: 10px;

              & > .fa-times:before {
                color: #ccc;
              }
              &.close {
                //color: #ffffff;
                &:hover {
                }
              }
            }
          }
        }
      }
    }

    .btn_wrap {
      display: inline-block;
      vertical-align: bottom;
      width: 100%;
      text-align: left;
    }

    .btn_left {
      float: left;
    }

    .title {
      position: absolute;
      left: 0;
      top: 0;
      height: 48px;
      line-height: 48px;
    }

    @media screen and (max-width: 1260px) {
      .title {
        position: relative;
        display: block;
        line-height: 80px;
      }
    }
  }
`;

export default StyledEmployeeSelecotr;

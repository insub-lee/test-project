import styled from 'styled-components';

const StyledContents = styled.div`
  .contentWrapper {
    overflow: hidden;
    background: #ebf0f6;
    padding: 20px;
    .contentGrid {
      display: flex;
      > div {
        float: left;
        background: white;
        position: relative;
        margin: 0 0.5% 14px 0.5%;
        border-radius: 5px;
        &.grid2 {
          width: 32.33%;
        }
        &.grid4 {
          width: 65.66%;
        }
        > .subFlow {
          position: relative;
          padding: 40px;
          dl {
            text-align: center;
            dt {
              color: #1b2839;
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 10px;
            }
            dd {
              color: #555;
              font-size: 15px;
              line-height: 22px;
              img {
                display: block;
                margin: 0 auto 20px auto;
                max-width: 100%;
              }
            }
          }
        }
      }
    }
  }
  .ant-modal-body {
    padding: 0;
  }
  .con-tit {
    height: 45px;
    line-height: 45px;
    padding: 0 22px;
    background: #4491e0;
    font-weight: 500;
    color: white;
    position: relative;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    > span {
      font-weight: 500;
      font-size: 18px;
    }
  }

  .con-body {
    background-color: #fff;
    padding: 15px 25px;

    ul {
      li {
        position: relative;
        min-height: 40px;
        line-height: 40px;
        padding-left: 140px;
        font-size: 13px;
        clear: both;
        .label-txt {
          position: absolute;
          left: 0;
          top: 0;
          height: 40px;
          line-height: 40px;
          color: #333;
        }
        .ant-select {
          width: 100%;
          .ant-select-selection--single {
            height: 40px;
          }
          .ant-select-selection {
            border: 0;
            border-bottom: 1px solid #d9e0e7;
            border-radius: 0;
            border-color: #d9e0e7 !important;
            font-size: 12px;
          }
          .ant-select-selection__rendered {
            line-height: 40px;
          }
          .ant-select-arrow {
            border: 1px solid #d9e0e7;
            padding: 3px;
            background: #fff;
            transform: translateY(-50%);
            right: 0;
            margin-top: -2px;
          }
          .ant-select-selection__rendered {
            .ant-select-search__field__placeholder,
            .ant-select-selection__placeholder {
              font-size: 12px;
            }
          }
        }
        span.ant-radio + * {
          font-size: 12px;
        }
        .ant-radio {
          .ant-radio-inner {
            width: 1rem;
            height: 1rem;
            /* border: #c5cdd6 solid 1px; */
            background: #d3dbe5;
          }
          &.ant-radio-checked {
            &:after {
              border: 1px solid #1fb5ad;
            }
            .ant-radio-inner {
              background-color: #1fb5ad;
              border-color: #1fb5ad;
              &:after {
                width: 8px;
                height: 8px;
                top: 3px;
                left: 3px;
                background-color: #1fb5ad;
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
                position: absolute;
                display: block;
                content: '';
                background-repeat: no-repeat;
                border: none;
                -webkit-transform: none;
                -ms-transform: none;
                -webkit-transform: none;
                -ms-transform: none;
                transform: none;
              }
            }
            ~ span {
              font-weight: 600;
            }
          }
        }
      }
    }

    .btn-wrap {
      width: 100%;
      text-align: center;
      margin: 25px 0;
      .btn-first {
        margin-right: 10px;
      }
    }
  }
`;

export default StyledContents;

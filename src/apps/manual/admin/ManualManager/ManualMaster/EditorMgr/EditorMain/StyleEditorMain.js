import styled from 'styled-components';

const StyleEditorMain = styled.div`
  width: 772px;
  padding: 0px 20px;
  .dropWrapper {
    padding: 0px;
    width: 100%;
    height: auto;
    &.editorMainDrop {
      min-height: 100%;
      padding-bottom: 40px;
    }

    /* .editorComponent:hover, */
    .editorComponent.on {
      border-color: rgba(15, 156, 238, 0.37);
    }
    .fr-wrapper {
      > div:first-child {
        display: none;
      }
    }
    .fr-box.fr-basic .fr-wrapper {
      border: 0;
    }
    .editorComponent {
      /* width: calc(100% - 64px); */
      width: 100%;
      /* border: 2px solid rgba(255, 255, 255, 0); */
      border-radius: 3px;
      position: relative;
      /* padding: 4px; */
      /* &.dragging {
        .manualIndexContent {
          display: none !important;
          height: 0px !important;
        }
      } */
      .manualIndexWrapper {
        .manualIndexTitle {
          position: relative;
          background-color: #eef8fe;
          border-top: solid 1px #076dac;
          border-bottom: 1px solid #dcdcdc;
          height: 45px;
          line-height: 45px;
          width: 100%;
          padding: 0 15px 0 30px;
          display: inline-block;
          color: #076dac;
          font-size: 14px;
          font-weight: 600;
          &:before {
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fff;
            border: 3px solid #076dac;
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            left: 15px;
          }
          input[type='text'] {
            /* width: calc(100% - 120px); */
            background: transparent;
            border: 0;
            color: #076dac;
            font-weight: 600;
            padding-left: 0;
          }
          /* .manualIndexTitleButtonWrapper {
            display: inline-block;
            float: right;
          } */
        }
        .manualIndexContent {
          /* min-height: 100px; */
          padding: 10px;
          .manualLinkIndexContent {
            /* display: none; */
            > div {
              padding: 10px;
              display: flex;
              align-items: center;
              > span {
                width: 100px;
                display: inline-block;
                vertical-align: top;
              }
              > input[type='text'] {
                width: calc(100% - 100px);
              }
              &.manualEditorFileLinkWrap {
                align-items: baseline;
                > div {
                  width: 100%;
                  margin-right: 2px;
                }
                .manualEditorFileLinkInputWrap {
                  margin-bottom: 2px;
                  > input[type='text'] {
                    width: calc(100% - 39px);
                    margin-right: 2px;
                  }
                }
              }
            }
            .manualEditorUpload {
              display: inline-block;
              width: calc(100% - 100px);
            }
          }
          /* .manualLinkIndexContent.linkIndexActive {
            display: block;
          } */
        }
      }
    }

    .editorComponent > .extraBtnBox {
      width: 34px;
      height: 26px;
      display: none;
      position: absolute;
      top: -22px;
      right: 34px;
      z-index: 10;
      i.fa {
        display: inline-block;
        opacity: 1;
        margin: 0 0.25rem 0 0;
        width: 1.18em;
        height: 1em;
        font-style: normal;
        font-weight: 400;
        text-decoration: inherit;
        text-align: center;
        speak: none;
        font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      i.fa {
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.1s ease;
      }
      i.fa {
        color: #767676 !important;
      }
      > i.fa.fa-times.remove {
        margin: auto;
        border: 1px solid rgba(34, 36, 38, 0.15);
        background-color: #ddeeff;
        -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        -moz-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        -webkit-transition: none;
        -moz-transition: none;
        -ms-transition: none;
        -o-transition: none;
        transition: none;
        padding: 6px;
        width: 100%;
        height: 100%;
      }
      i.fa.fa-arrows-alt.move {
        margin: auto;
        border: 1px solid rgba(34, 36, 38, 0.15);
        background-color: #edebd5;
        -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        -moz-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        -webkit-transition: none;
        -moz-transition: none;
        -ms-transition: none;
        -o-transition: none;
        transition: none;
        padding: 6px;
        width: 100%;
        height: 100%;
      }
      > button {
        margin: auto;
        border: 1px solid rgba(34, 36, 38, 0.15);
        background-color: #ddeeff;
        -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        -moz-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
        -webkit-transition: none;
        -moz-transition: none;
        -ms-transition: none;
        -o-transition: none;
        -webkit-transition: none;
        transition: none;
        width: 100%;
        height: 100%;
        border-radius: 0px;
      }
      &.edit {
        left: 4px;
        width: 100px;
      }
      &.removeAreaIdx {
        left: 104px;
        width: 100px;
        > button {
          background-color: #e6d8d8;
        }
      }
    }

    .editorComponent > .drag {
      right: 0px;
    }

    .editorComponent.drag {
      background: #f0f0f0;
      /* height: 54px !important; */
      > .extraBtnBox {
        display: block;
      }
      .manualIndexContent {
        /* display: none;
        height: 0px; */
      }
    }

    .editorComponent.focus.buttonOn > .extraBtnBox {
      display: block;
    }
  }

  .manualEditorComponent {
    min-height: 40px;
    cursor: pointer;
    .fr-view {
      padding: 15px 20px;
      font-size: 13px;
      & td {
        color: #000;
      }
    }
    .fr-box.fr-basic .fr-element.fr-view {
      font-size: 13px;
      border: 1px solid #f7f7f7;
      border-bottom: 0;
      padding: 15px 20px;
    }
    .fr-toolbar.fr-bottom {
      border-top: 2px solid #000;
      border-radius: 0;
    }
  }

  .editorComponent {
    .fr-box.fr-basic .fr-element {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-top: 0;
      border-bottom: 0;
    }
    .fr-toolbar.fr-bottom {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-top: 0;
    }
  }

  /* QNA - Btn - CSS */
  .btn-primary {
    color: #886ab5;
    background-color: #fff;
    border-color: #886ab5;
    box-shadow: 0 2px 6px 0 rgba(136, 106, 181, 0.5);
    &:hover {
      color: #fff;
      background-color: #7453a6;
      border-color: #6e4e9e;
    }
    &:focus {
      color: #fff;
      background-color: #7453a6;
      border-color: #7453a6;
    }
  }

  .btn-outline-success {
    color: #2196f3;
    background-color: #fff;
    border-color: #2196f3;
    box-shadow: 0 2px 6px 0 rgba(33, 150, 243, 0.5);
    &:hover {
      color: #fff;
      background-color: #0c83e2;
      border-color: #0c7cd5;
    }
  }

  .btn-outline-secondary {
    color: #868e96;
    background-color: #fff;
    border-color: #868e96;
    box-shadow: 0 2px 6px 0 rgba(134, 142, 150, 0.5);
    &:hover {
      color: #fff;
      background-color: #727b84;
      border-color: #6c757d;
    }
  }

  .btn-outline-danger {
    color: #fd3995;
    background-color: #fff;
    border-color: #fd3995;
    box-shadow: 0 2px 6px 0 rgba(253, 57, 149, 0.5);
    &:hover {
      color: #fff;
      background-color: #fd1381;
      border-color: #fc077a;
    }
    &:focus {
      color: #fff;
      background-color: #fd1381;
      border-color: #fc077a;
    }
  }

  /* QNA - CSS */
  .manual-qna-wrap {
    border: 1px solid #e5e5e5;
    border-top: 2px solid #886ab5;
    padding: 10px 20px 10px;
    .qna-data-wrap {
      margin: 10px;
      padding: 10px;
      /* border: 2px solid black; */
    }
    .qna-dl {
      padding: 15px 0;
      min-height: 206px;
      &.qna-dl-edit {
        padding: 30px 0px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
      .btn-wrap {
        text-align: center;
        margin: 0 auto;
        text-align: center;
        padding: 0;
        margin-top: 20px;
      }
      > div {
        position: relative;
        padding-left: 60px;
        margin-bottom: 15px;
        > span {
          position: absolute;
          left: 0;
          display: block;
          width: 40px;
          height: 40px;
          line-height: 35px;
          border-radius: 100%;
          text-align: center;
          font-size: 20px;
          font-weight: 600;
        }
      }
      .qna-dt {
        > span {
          top: 50%;
          transform: translateY(-50%);
          color: #886ab5;
          background-color: #fff;
          border: 1px solid #e5e5e5;
        }
        > p {
          color: #000;
          font-size: 18px;
          font-weight: 600;
          border-bottom: 1px solid #e5e5e5;
          width: 100%;
          height: 58px;
          padding: 15px 0;
          margin: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          padding-right: 0px;
          > input {
            display: block;
            width: 100%;
            background-color: #fff;
            border: 0;
            color: #000;
            font-size: 18px;
            font-weight: 600;
          }
        }
        > .edit-btn-wrap {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          > button {
            margin-right: 10px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      .qna-dd {
        & > .fr-box {
          cursor: auto;
        }
        & > span {
          top: 0;
          background-color: #886ab5;
          color: #fff;
          border: 1px solid #886ab5;
        }
        & > .text-box {
          background-color: #f6f6f6;
          padding: 15px;
          line-height: 2;
          & p {
            font-size: 14px;
            color: #666666;
            margin-bottom: 10px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
`;

export default StyleEditorMain;

import styled from 'styled-components';

const StyleEditorMain = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
  padding: 0px 20px 70px 20px;
  .dropWrapper {
    padding: 0px;
    width: 686px;
    height: auto;
    &.editorMainDrop {
      min-height: 100%;
    }

    /* .editorComponent:hover, */
    .editorComponent.on {
      border-color: rgba(15, 156, 238, 0.37);
    }
    .fr-wrapper {
      div:first-child {
        display: none;
      }
    }
    .editorComponent {
      /* width: calc(100% - 64px); */
      width: 100%;
      border: 2px solid rgba(255, 255, 255, 0);
      border-radius: 3px;
      position: relative;
      padding: 4px;
      /* &.dragging {
        .manualIndexContent {
          display: none !important;
          height: 0px !important;
        }
      } */
      .manualIndexWrapper {
        .manualIndexTitle {
          background-color: #cdfae4;
          border-top: solid 1px #4db080;
          padding: 10px;
          input[type='text'] {
            /* width: calc(100% - 120px); */
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
              > span {
                width: 100px;
                display: inline-block;
              }
              > input[type='text'] {
                width: calc(100% - 100px);
              }
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
`;

export default StyleEditorMain;

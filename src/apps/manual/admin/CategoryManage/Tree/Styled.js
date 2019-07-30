import styled from 'styled-components';

export default styled.div`
  $row-padding: 10px;

  .rowWrapper {
    padding: $row-padding $row-padding $row-padding 0;
    height: 100%;
    box-sizing: border-box;
    cursor: move;

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 1;
    }
  }

  .rowWrapperDragDisabled {
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }

  .row {
    height: 100%;
    white-space: nowrap;
    display: flex;

    & > * {
      box-sizing: border-box;
    }
  }

  /**
 * The outline of where the element will go if dropped, displayed while dragging
 */
  .rowLandingPad {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;

    * {
      opacity: 0 !important;
    }

    &::before {
      background-color: lightblue;
      border: 3px dashed white;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
  }

  /**
 * Alternate appearance of the landing pad when the dragged location is invalid
 */
  .rowCancelPad {
    @extend .rowLandingPad;

    &::before {
      background-color: #e6a8ad;
    }
  }

  /**
 * Nodes matching the search conditions are highlighted
 */
  .rowSearchMatch {
    outline: solid 3px #0080ff;
  }

  /**
 * The node that matches the search conditions and is currently focused
 */
  .rowSearchFocus {
    outline: solid 3px #fc6421;
  }

  %rowItem {
    display: inline-block;
    vertical-align: middle;
  }

  // Ym 수정
  .rowContents {
    @extend %rowItem;
    position: relative;
    height: 100%;
    // border: solid #bbb 1px;
    // box-shadow: 0 2px 2px -2px;
    // padding: 0 5px 0 10px;
    // border-radius: 2px;
    // min-width: 230px;
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: white;
  }

  .rowLabel {
    @extend %rowItem;
    flex: 0 1 auto;
    // padding-right: 20px;
  }

  .rowToolbar {
    @extend %rowItem;

    flex: 0 1 auto;
    display: flex;
  }

  .moveHandle {
    @extend %rowItem;

    height: 100%;
    width: 44px;
    background: #d9d9d9
      url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MiIgaGVpZ2h0PSI0MiI+PGcgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIuOSIgPjxwYXRoIGQ9Ik0xNCAxNS43aDE0LjQiLz48cGF0aCBkPSJNMTQgMjEuNGgxNC40Ii8+PHBhdGggZD0iTTE0IDI3LjFoMTQuNCIvPjwvZz4KPC9zdmc+')
      no-repeat center;
    border: solid #aaa 1px;
    box-shadow: 0 2px 2px -2px;
    cursor: move;
    border-radius: 1px;
    z-index: 1;
  }

  .loadingHandle {
    @extend .moveHandle;

    cursor: default;
    background: #d9d9d9;
  }

  @keyframes pointFade {
    0%,
    19.999%,
    100% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
  }

  .loadingCircle {
    width: 80%;
    height: 80%;
    margin: 10%;
    position: relative;
  }

  .loadingCirclePoint {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    $point-count: 12;
    $spin-animation-time: 800ms;

    &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 11%;
      height: 30%;
      background-color: #fff;
      border-radius: 30%;
      animation: pointFade $spin-animation-time infinite ease-in-out both;
    }

    @for $i from 1 through (($point-count + 1) / 2) {
      &:nth-of-type(#{$i}) {
        transform: rotate(360deg / $point-count * ($i - 1));
      }

      &:nth-of-type(#{$i + $point-count / 2}) {
        transform: rotate(180deg + 360deg / $point-count * ($i - 1));
      }

      &:nth-of-type(#{$i}),
      &:nth-of-type(#{$i + $point-count / 2}) {
        &:before {
          animation-delay: -$spin-animation-time + ($spin-animation-time / $point-count * 2 * ($i - 1));
        }
      }
    }
  }

  .toolbarButton {
    @extend %rowItem;
  }

  .rowTitle {
    font-weight: bold;

    & > button {
      padding: 0;
      border: 0;
      background: transparent;
    }
  }

  .rowTitleWithSubtitle {
    font-size: 85%;
    display: block;
    height: 0.8rem;
  }

  .rowSubtitle {
    font-size: 70%;
    line-height: 1;
  }

  .collapseButton,
  .expandButton {
    appearance: none;
    border: none;
    position: absolute;
    border-radius: 100%;
    // box-shadow: 0 0 0 1px #000;
    width: 16px;
    height: 16px;
    padding: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;

    &:focus {
      outline: 0;
      // box-shadow: 0 0 0 1px #000, 0 0 1px 3px #83bef9;
    }

    //   &:hover:not(:active) {
    //     background-size: 24px;
    //     height: 20px;
    //     width: 20px;
    //   }
  }

  // .collapseButton {
  //   background: #fff
  //     url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjgiIGZpbGw9IiNGRkYiLz48ZyBzdHJva2U9IiM5ODk4OTgiIHN0cm9rZS13aWR0aD0iMS45IiA+PHBhdGggZD0iTTQuNSA5aDkiLz48L2c+Cjwvc3ZnPg==')
  //     no-repeat center;
  // }

  // .expandButton {
  //   background: #fff
  //     url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjgiIGZpbGw9IiNGRkYiLz48ZyBzdHJva2U9IiM5ODk4OTgiIHN0cm9rZS13aWR0aD0iMS45IiA+PHBhdGggZD0iTTQuNSA5aDkiLz48cGF0aCBkPSJNOSA0LjV2OSIvPjwvZz4KPC9zdmc+')
  //     no-repeat center;
  // }

  // 가장 마지막 버튼 (임시)
  .ordinaryButton {
    appearance: none;
    border: none;
    position: absolute;
    border-radius: 100%;
    //   box-shadow: 0 0 0 1px #b0e0e0;
    width: 10px;
    height: 10px;
    padding: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    // background: #fc5d3f;
    background: #9c9c9c;
  }

  /**
 * Line for under a node with children
 */
  .lineChildren {
    height: 100%;
    display: inline-block;
    position: absolute;

    &::after {
      content: '';
      position: absolute;
      background-color: black;
      width: 1px;
      left: 50%;
      bottom: 0;
      height: $row-padding;
    }
  }
`;

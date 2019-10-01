import styled from 'styled-components';

const Styled = styled.div`
  .tab-dividers {
    position: absolute;
    top: 7px;
    bottom: 7px;
    width: 100%;
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 0.5px;
      background: #a9adb0;
      opacity: 1;
      transition: opacity 0.2s ease;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  .tab-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    > svg {
      width: 100%;
      height: 100%;

      .tab-geometry {
        fill: #dee1e6;
      }
    }
  }
  .tab-content {
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: var(--tab-content-margin);
    right: var(--tab-content-margin);
    padding: 6px 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    pointer-events: all;
    width: 100%;
    cursor: pointer;
    .tab-title {
      width: 100%;
      text-align: center;
      font-size: 12px;
    }
  }
`;

export default Styled;

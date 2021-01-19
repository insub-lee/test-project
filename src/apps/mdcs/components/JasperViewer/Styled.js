import styled from 'styled-components';

const Styled = styled.div`
  .cover-view-jasper {
    text-align: center;
  }

  .customViewer {
    background-color: #808080;
  }

  .customWrapper {
    background: black;
    height: 50px;
    padding: 10px;
    position: relative;
  }

  .zoom-group {
    display: inline-block;
    position: absolute;
    left: 10px;
    .zoomInBtn {
      display: inline-block;
      margin-right: 10px;
    }
    .zoomResetBtn {
      display: inline-block;
      margin-right: 10px;
    }
    .zoomOutBtn {
      display: inline-block;
    }
  }

  .page-group {
    display: inline-block;
    .page-status {
      display: inline-block;
      color: #ffffff;
    }
    .prevBtn {
      display: inline-block;
      margin-right: 10px;
    }
    .nextBtn {
      display: inline-block;
      margin-left: 10px;
    }
  }

  .viewer-option-group {
    position: absolute;
    z-index: 100;
    right: 10px;
    top: 56px;
    .optionBtn {
      display: inline-block;
      margin-left: 10px;
    }
  }
`;

export default Styled;

import styled from 'styled-components';

const Styled = styled.div`
  .cover-view-jasper {
    text-align: center;
  }

  .customViewer {
    background-color: #808080;
  }

  .pdf-viewer-wrap {
    position: relative;
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
    top: 13px;
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

  .option-group {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 13px;
    .option {
      display: inline-block;
      margin-left: 10px;
    }
  }
`;

export default Styled;
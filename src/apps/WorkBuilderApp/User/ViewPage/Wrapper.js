import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  .title {
    position: relative;
    .action-buttons {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .small-container {
    width: 800px;
    margin: auto;
  }

  .border-layer {
    border: 1px solid #c1c1c1;
    border-radius: 4px;

    .title {
      padding: 4px;
      border-bottom: 1px solid #c1c1c1;
    }
  }

  .layer-body {
    padding: 0 24px;
  }

  .fixHeight500 {
    height: 500px;
    overflow-y: auto;
  }
`;

export default Wrapper;

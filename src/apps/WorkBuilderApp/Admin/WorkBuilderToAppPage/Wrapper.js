import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 12px auto 0;

  @media only screen and (max-width: 1660px) {
    padding: 0 20px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;
  }

  //padding: 48px;
  //width: 100%;
  //height: 100%;

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
      padding: 5px 24px;
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

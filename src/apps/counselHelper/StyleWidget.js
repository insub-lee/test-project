import styled from 'styled-components';
// height: ${props => props.height};
const test = styled.div`
  backgorund: black;
  .widgetRow {
    margin-top: 10px;
    margin-bottom: 20px;
    .ant-radio-group {
      margin-left: 30px;
    }
  }

  .configCategorie {
  }
  .widget {
    margin: 10px 0px;
    border: 1px solid grey;
    padding: 10px;
  }
  .configSize {
    border: 1px solid black;
    background: yellow;
    max-height: 300px;
  }
  .configSize h2 {
    text-align: center;
  }
  .configSize .ant-col-24 {
    margin-top: 10px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border: 1px solid black;
  }
  .configSize .ant-col-24:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
  .widget h2 {
    text-align: center;
  }
  .searchDiv {
    padding: 10px;
  }
  .searchDiv button {
    width: 60px;
    background: white;
    border: 1px solid #00e207;
    margin-left: 20px;
  }
  .configSelected {
    border: 1px solid black;
    background: #aafa82;
    max-height: 300px;
  }
  .configSelected h2 {
    text-align: center;
  }
  #helperWidget {
    font-weight: 900;
  }
  .groupWrap {
    .manulTitle {
      clear: both;
      height: 19px;
      color: rgb(85, 85, 85);
      font-size: 16px;
      font-weight: 600;
      line-height: 19px;
      width: 100%;
    }
    .ant-col-10 {
      height: 60px;
      line-height: 60px;
      text-align: center;
      border: 1px solid black;
      margin-right: 20px;
    }
  }
`;

export default test;

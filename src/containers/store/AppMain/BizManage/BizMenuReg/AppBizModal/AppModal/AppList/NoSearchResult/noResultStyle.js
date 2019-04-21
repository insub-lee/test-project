import styled from 'styled-components';


const noResultStyle = styled.div`
  width: 100%; 
  height: 400;
  margin: 15px auto 0;
  padding: 40px;
  border: 4px solid #efefef;
  text-align: center;
  
  .noResultTitle {
    margin-top: 25px;
    color: #000000;
    font-size: 18px;

    strong {
      color: #f85023;
      font-weight: 600;
    }
  }

  .searchGuideList {
    display: inline-block;
    width: 100%;
    margin-top: 40px;
    margin-left: 20px;
    padding: 0;

    > li {
      display: inline-block;
      width: 100%;
      min-height: 15px;
      padding: 4px 0 5px 16px;
      color: #404040;
      font-size: 14px;
      text-align: left;
      text-indent: -16px;

      :before {
        content: '◾';
        padding-right:7px;
        color: #d8d8d8;
        font-size: 14px;
      }
    }
  }

`;

export default noResultStyle;

import styled from 'styled-components';

const StockWrapper = styled.div`

table {
  width: calc(100% - 40px);
  margin: 0 auto;
  border-spacing: 0;

  td {
    padding: 0;

    &:last-child {
      width: 50px;
      text-align: right;
    }

    h3 {
      color: #404040;
      font-size: 12px;
      line-height: 1;
    }

    .bigFontUp {
      color: #d73520;
      font-size: 27px;
      font-weight: 600;
    }
    .bigFontDown {
      color: blue;
      font-size: 27px;
      font-weight: 600;
    }
    .bigFont {
      color: #404040;
      font-size: 27px;
      font-weight: 600;
    }

    .up {
      position: relative;
      display: inline-block;
      width: 50px;
      color: #d73520;
      font-size: 12px;      
    }
    .down {
      position: relative;
      display: inline-block;
      width: 50px;
      color: blue;
      font-size: 12px;      
    }

    .up {
      vertical-align: bottom;
      &:before {
        content:'▲';
        position: absolute;
        left: 0;
      }
    }
    

    .down {
      &:before {
        content:'▼';
        position: absolute;
        left: 0;
      }
    }
  }

}
  
//svg chart
.recharts-wrapper {
  margin-left: 10px;
  
  .recharts-legend-wrapper {
    display: none;
  }
}
  
`;

export default StockWrapper;
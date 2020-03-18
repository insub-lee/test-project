import styled from 'styled-components';

const CustomTooltipStyled = styled.div`
  .custom-tooltip {
    width: 150px;
    height: 70px;
    border: 1px solid cornflowerblue;
    overflow: hidden;
    pointer-events: none;
    transition: opacity 1s;
  }

  .custom-tooltip.ag-tooltip-hiding {
    opacity: 1;
  }

  .custom-tooltip p {
    margin: 5px;
    color: #2f486b;
    font-size: 72px;
    white-space: nowrap;
  }

  .custom-tooltip p:first-of-type {
    font-weight: bold;
  }
`;

export default CustomTooltipStyled;

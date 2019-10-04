import styled from 'styled-components';

const Styled = styled.div`
  width: ${props => (props.bookmarkWidgetData.widgetYn ? '100%' : '1190px')};
  min-width: 1098px;
  .tab-wrap {
    position: relative;
    .tab-btn-wrap {
      transform: none;
      top: 8px;
      right: ${props => (props.widgetYn ? '0px' : '50px')};
    }
    .tab-btn-close {
      position: absolute;
      top: 7px;
      right: 15px;
      margin: 0;
      padding: 0;
      outline: 0;
      background: none;
      border: 0;
      cursor: pointer;
    }
  }
`;

export default Styled;

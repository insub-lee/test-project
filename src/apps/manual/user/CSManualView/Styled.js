import styled from 'styled-components';

const Styled = styled.div`
  width: ${props => (props.widgetYn ? '100%' : '1190px')};
  .tab-wrap {
    position: relative;
    .tab-btn-wrap {
      transform: none;
      top: 8px;
      right: ${props => (props.widgetYn ? '10px' : '50px')};
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

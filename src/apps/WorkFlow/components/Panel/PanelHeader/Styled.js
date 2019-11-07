import styled from 'styled-components';

const PanelHeaderStyle = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  min-height: 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 4px 4px 0 0;
  -webkit-transition: background-color 0.4s ease-out;
  transition: background-color 0.4s ease-out;

  h2 {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 0.875rem;
    margin: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: 3rem;
    color: inherit;
    color: #333;
    position: relative;
    font-weight: 500;
  }

  & > :first-child {
    padding-left: 1rem;
  }

  h2:not(:only-child) {
    margin-right: 0.66667rem;
  }
`;

export default PanelHeaderStyle;

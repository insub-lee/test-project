import styled from 'styled-components';

const Styled = styled.div`
  .react-tabs__tab--selected input {
    background-color: #fff !important;
  }
  .react-tabs__tab input {
    background-color: #eff0f2;
    display: inherit;
    width: 93%;
    border: none;
    padding: 0;
    line-height: normal;
    height: 22px;
    & {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .manualEditorComponent {
    min-height: 40px;
    cursor: pointer;
    .fr-view {
      padding: 20px;
      font-size: 13px;
    }
    .fr-box.fr-basic .fr-element.fr-view {
      font-size: 13px;
      border: 1px solid #f7f7f7;
      border-bottom: 0;
    }
    .fr-toolbar.fr-bottom {
      border-top: 2px solid #000;
      border-radius: 0;
    }
  }
`;

export default Styled;

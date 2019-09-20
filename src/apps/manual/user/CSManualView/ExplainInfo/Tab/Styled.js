import styled from 'styled-components';

const Styled = styled.div`
  margin: 0 !important;
  padding: 0 !important;
  .affix-container {
    background-color: #ffffff;
  }

  .title {
    background-color: #ffffff;
    padding-top: 0.5em;
  }

  ul.react-tabs__tab-list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    height: 40px;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;
    li.react-tabs__tab {
      z-index: 0;
      width: ${props => {
    switch (props.length) {
      case 1:
        return '100%';

      case 2:
        return '50% ';

      case 3:
        return '33.33%';

      case 4:
        return '25%';

      default:
        return '20%';
    }
  }};
      position: static;
      pointer-events: auto !important;
      margin-bottom: -1px;
      padding: 0.5rem 2.125rem;
      border: 1px solid #d9d9d9;
      border-left: 0px solid #d9d9d9;
      height: 40px;
      align-items: center;
      font-weight: 500;
      font-size: 15px;
      cursor: pointer;
      background-color: #eff0f2;
      border-radius: 3px 3px 0 0;
      color: #666666;
      &:first-child {
        border-left: 1px solid #d9d9d9;
      }
      &.react-tabs__tab--selected {
        background-color: #fff;
        z-index: 0 !important;
        border-bottom: 1px solid #d9d9d9;
        color: #000000;

        &:not(:hover) {
          color: #333;
        }
      }
    }
  }

  div.react-tabs__tab-panel.react-tabs__tab-panel--selected {
    // padding: 1rem !important;
  }
  .titleWrap {
    text-align: left;
    border: none;
    padding: 0;
    width: 100%;
    line-height: normal;
    height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default Styled;

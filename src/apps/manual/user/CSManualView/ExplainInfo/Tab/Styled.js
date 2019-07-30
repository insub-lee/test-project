import styled from 'styled-components';

const Styled = styled.div`
  width: 686px;
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
    // nav-tabs Option
    // Clean Option
    height: 40px;
    border-bottom: 1px solid #d9d9d9;
    background-color: #ffffff;

    li.react-tabs__tab {
      margin-bottom: -1px;
      display: block;
      padding: 0.5rem 2.125rem;
      border: 1px solid #d9d9d9;
      border-left: 0px solid #d9d9d9;
      height: 40px;
      display: flex;
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
        border-bottom: 1px solid transparent;
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
`;

export default Styled;

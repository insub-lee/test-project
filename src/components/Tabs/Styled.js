import styled from 'styled-components';

const Styled = styled.div`
  .affix-container {
    background-color: #ffffff;
  }

  .title {
    background-color: #ffffff;
    padding-top: 0.5em;
  }

  ul.react-tabs__tab-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    // nav-tabs Option
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    // Clean Option
    height: 45px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #ffffff;

    li.react-tabs__tab {
      margin-bottom: -1px;
      display: block;
      padding: 0.5rem 1.125rem;
      //border: 1px solid transparent;
      //border-top-left-radius: 4px;
      //border-top-right-radius: 4px;
      //border-radius: 0;
      border: 0;
      height: 45px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-bottom: 1px solid transparent;
      font-weight: 500;
      font-size: 0.8125rem;
      cursor: pointer;

      &.react-tabs__tab--selected {
        //color: #495057;
        background-color: #fff;
        border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #fff;
        border-bottom: 1px solid #886ab5;
        color: #886ab5;

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

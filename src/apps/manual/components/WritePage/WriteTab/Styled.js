import styled from 'styled-components';

const Styled = styled.div`
  .tabList-wrap {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .btn-m-plus {
      background-color: transparent;
      border: none;
      margin-left: 5px;
      cursor: pointer;
      width: 38px;
      height: 38px;
      outline: 0;
      & > i {
        font-size: 20px;
        color: #886ab5;
      }
    }
    ul.react-tabs__tab-list {
      width: 100%;
      display: flax;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      li.react-tabs__tab {
        width: ${props => {
    switch (props.length) {
      case 1:
        return 'calc(100% - 40px)';

      case 2:
        return 'calc(50% - 20px)';

      case 3:
        return 'calc(33.33% - 13px)';

      case 4:
        return 'calc(25% - 10px)';

      default:
        return '20%';
    }
  }};
        margin-bottom: -1px;

        &.react-tabs__tab--selected {
          & > div {
            background-color: #fff;
            border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #fff;
          }
        }
        & div:last-child {
          border-right: 1px solid #e5e5e5;
          border-radius: 3px 3px 0 0;
          .tab-dividers::after {
            opacity: 0;
          }
        }
      }
    }
    .noShow {
      display: none;
    }
  }
`;

export default Styled;

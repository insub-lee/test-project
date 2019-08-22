import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const StyleAppList = styled.div`
  .topPart {
    .searchInput {
      width: 200px;
      > .ant-input {
        display: block;
        width: 100%;
        height: calc(1.47em + 1rem + 2px);
        padding: 0.5rem 0.875rem;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.47;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        &:focus {
          color: #495057;
          background-color: #fff;
          border-color: #886ab5;
          outline: 0;
          box-shadow: 0 0 0 0.2rem transparent;
        }
      }

      > button {
        position: absolute;
        top: 0;
        right: 4px;
        width: 24px;
        height: 37px;
        border: none;
        background: url(${iconSearch}) no-repeat 50% 50%;
      }
    }
  }
`;

export default StyleAppList;

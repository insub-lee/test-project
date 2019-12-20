import styled from 'styled-components';

const StyleManagerInfo = styled.div`
  width: 100%;

  .popoverTitle {
    width: 100%;
    height: 36px;
    background: #f4f4f4;
    padding-left: 12px;
    padding-top: 6px;
  }

  .custom-scrollbar {
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      /* IE10+ specific styles go here */
      padding-bottom: 15px;
    }
    .popoverBody {
      padding: 6px 12px;
      max-height: 148px;

      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        /* IE10+ specific styles go here */
        max-height: 154px;
      }
    }
  }
`;

export default StyleManagerInfo;

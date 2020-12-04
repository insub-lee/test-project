import styled from 'styled-components';

const StyledUploader = styled.div`
  line-height: 48px;
  .dropzone {
    & > div {
      width: 300px !important;
      height: 46px !important;
      border-color: rgb(217, 224, 231);

      & > p {
        height: 38px;
        margin: 5px;
        line-height: 38px;
        color: #3e3e3e;
      }
    }
    & > ul {
      > li {
        padding: 0 !important;

        a {
          color: #3e3e3e;
        }
      }
    }
  }
`;

export default StyledUploader;

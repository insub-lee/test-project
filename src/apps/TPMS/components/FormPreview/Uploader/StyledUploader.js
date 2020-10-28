import styled from 'styled-components';

const StyledUploader = styled.div`
  line-height: 48px;
  .dropzone {
    & > div {
      width: 100% !important;
      height: 46px !important;
      border: none !important;
      border-bottom: 1px solid #d9e0e7 !important;

      & > p {
        height: 38px;
        margin: 5px;
        line-height: 38px;
        color: #3e3e3e;
      }
    }
    & > ul {
      &.upload_list {
        height: 80px;
        overflow: auto;
      }
      > li {
        padding: 0 !important;

        a {
          color: #3e3e3e;
        }

        button.remove {
          margin-left: 10px;
          display: none;
        }
      }

      > li:hover {
        button.remove {
          display: inline-block;
        }
      }
    }
  }
`;

export default StyledUploader;

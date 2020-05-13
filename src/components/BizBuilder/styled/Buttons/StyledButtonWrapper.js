import styled from 'styled-components';

const StyledButtonWrapper = styled.div`
  &.btn-wrap-inline {
    display: inline-block;
    width: auto;
    padding: 0;
  }

  &.btn-wrap-right {
    text-align: right;
  }

  &.btn-wrap-center {
    text-align: center;
  }

  &.btn-wrap-mt-20 {
    margin-top: 20px;
  }

  &.btn-wrap-mb-10 {
    margin-bottom: 10px;
  }

  &.btn-wrap-mr-20 {
    margin-right: 20px;
  }

  &.btn-wrap-mr-5 {
    margin-right: 5px;
  }

  &.btn-wrap-ml-5 {
    margin-left: 5px;
  }

  .btn-comment {
    font-size: 12px;
    color: #ff5f5f;
    display: inline-block;
    vertical-align: midde;
  }
`;

export default StyledButtonWrapper;

import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  padding-left: 30px;
  & .ant-checkbox-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  & .ant-btn-link {
    display: inline-block;
    color: #666666 !important;
    font-size: 14px;
    padding: 0;
    margin: 0;
    height: auto;
    white-space: normal;
    text-align: left;
  }
`;

export default Styled;

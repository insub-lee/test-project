import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  width: 100%;
  background-color: #505050;
  height: auto;
  line-height: 1.5;
  padding: 12px 90px 12px 40px;

  & .board_header__title {
    display: inline-block;
    color: #fff;
    font-size: 18px;
    margin: 0;
    line-height: normal;
  }
  & > .ant-checkbox-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
  }
`;

export default Styled;

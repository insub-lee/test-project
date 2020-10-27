import styled from 'styled-components';

const StyledModal = styled.div`
  & {
    background: white;
    border-radius: 5px;
    overflow: hidden;

    & .pop_tit {
      height: 50px;
      line-height: 50px;
      padding: 0 22px;
      background: #4491e0;
      font-size: 19px;
      font-weight: 500;
      color: white;
      position: relative;

      & .icon_pclose {
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -15px;
      }
    }

    & .pop_con {
      padding: 20px 30px;
      position: relative;
      background-color: #ffffff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
`;

export default StyledModal;

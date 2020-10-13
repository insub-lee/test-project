import styled from 'styled-components';

const StyledProfile = styled.div`
  &.user {
    text-align: center;
    color: #fff;
    display: block;
    padding: 0 20px 30px 20px;

    .user_img {
      display: block;
      width: 78px;
      height: 78px;
      border-radius: 78px;
      margin: 0 auto 18px auto;
      border-style: none;

      &.on_img {
        width: auto;
      }
    }

    .user_txt1 {
      display: block;
      font-weight: 500;
      margin-bottom: 10px;
      font-size: 15px;
    }

    .user_txt2 {
      display: block;
      font-weight: 500;
      font-size: 12px;
      opacity: 0.5;
    }
  }
  @media screen and (max-width: 736px) {
    &.user {
      padding: 10px;
    }

    .user_txt2 {
      font-size: 10px;
    }
  }
`;

export default StyledProfile;

import styled from 'styled-components';

const LayoutContentWrapper = styled.div`
  margin-top: 70px;
  padding: 50px 20px 0 260px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
`;

export default LayoutContentWrapper;

import styled from 'styled-components';

const Wrapper = styled.div`
  /* max-width: 1280px; */
  min-width: 900px;
  width: 100%;
  margin: 12px auto 0;

  @media only screen and (max-width: 1660px) {
    padding: 0 10px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;
  }

  //padding: 48px;
  //width: 100%;
  //height: 100%;
`;

export default Wrapper;

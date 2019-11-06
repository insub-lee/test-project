import styled from 'styled-components';

const ShadowWrapper = styled.div`
  position: relative;
  padding-left: 30px;
  margin-left: -30px;

  :hover {
    .actions {
      display: block;
    }
  }
  > .actions {
    display: none;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default ShadowWrapper;

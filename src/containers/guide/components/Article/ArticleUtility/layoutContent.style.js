import styled from 'styled-components';
import { palette } from 'styled-theme';

const LayoutContentStyle = styled.div`
  width: 100%;
  padding: 35px;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 0)};
  height: 100%;

  .mb30 {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: ${palette('color', 1)};
  }

  .text {
    color: ${palette('color', 1)};
    font-size: 16px;
  }
`;

export default LayoutContentStyle;

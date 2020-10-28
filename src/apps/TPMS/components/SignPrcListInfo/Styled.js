import styled from 'styled-components';

const tableBorderColor = '#555';
const tableFontColor = '#555';

const Styled = styled.div`
  padding: ${({ noPadding }) => (noPadding ? '0' : '30px')};
  > table {
    width: 100%;
    thead > tr > th {
      color: ${tableFontColor};
      border-top: 4px double ${tableBorderColor};
      border-bottom: 4px double ${tableBorderColor};
    }
    tbody > tr > td {
      color: ${tableFontColor};
      border-bottom: 1px solid ${tableBorderColor};
    }
  }
`;

export default Styled;

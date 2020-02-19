import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized';

const Wrapper = styled.div`
  width: 100%;
`;

const Table = styled.table``;

const Tbody = styled.tbody``;

const getCols = (width, size) => {
  const cols = [];
  for (let i = 0; i < size; i += 1) {
    cols.push(<col key={i} width={`${width / size > 200 ? width / size : 200}px`} />);
  }
  return cols;
};

const BasedHtmlTableGroup = ({ children, maxColSize }) => (
  <Wrapper>
    <AutoSizer disableHeight style={{ width: '100%', overflowX: 'auto' }}>
      {({ width }) => (
        <Table>
          <colgroup>{getCols(width, maxColSize)}</colgroup>
          <Tbody>{children}</Tbody>
        </Table>
      )}
    </AutoSizer>
  </Wrapper>
);

BasedHtmlTableGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  maxColSize: PropTypes.number,
};

BasedHtmlTableGroup.defaultProps = {
  children: [],
  maxColSize: 0,
};

export default BasedHtmlTableGroup;

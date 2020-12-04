import React from 'react';
import PropTypes from 'prop-types';
import StyledPage from './StyledPage';

const getTotalPageCnt = (total, pageSize) => Math.ceil(total / pageSize);
const renderPagination = (current, pageSize, total, groupSize, pageHandler) => {
  const indent = [];
  const currentGroup = Math.ceil(current / groupSize);
  const zeroPoint = (currentGroup - 1) * groupSize + 1;
  const totalPageCnt = getTotalPageCnt(total, pageSize);
  const limit = currentGroup * groupSize <= totalPageCnt ? groupSize : totalPageCnt % groupSize;

  indent.push(
    <a
      key="first"
      href="#none"
      className={`first ${current === 1 ? 'disabled' : ''}`}
      onClick={e => {
        e.preventDefault();
        pageHandler(1);
      }}
    >
      처음
    </a>,
  );
  indent.push(
    <a
      key="prev"
      href="#none"
      className={`prev ${current === 1 ? 'disabled' : ''}`}
      onClick={e => {
        e.preventDefault();
        if (current !== 1) {
          pageHandler(current - 1);
        }
      }}
    >
      이전
    </a>,
  );
  for (let i = 0; i < limit; i += 1) {
    indent.push(
      <a
        key={zeroPoint + i}
        href="#none"
        className={`num ${zeroPoint + i === current ? 'on' : ''}`}
        onClick={e => {
          e.preventDefault();
          pageHandler(zeroPoint + i);
        }}
      >
        {zeroPoint + i}
      </a>,
    );
  }
  // if (current !== totalPageCnt) {
  indent.push(
    <a
      key="next"
      href="#none"
      className={`next ${totalPageCnt === current ? 'disabled' : ''}`}
      // className="next"
      onClick={e => {
        e.preventDefault();
        if (totalPageCnt !== current) {
          pageHandler(current + 1);
        }
      }}
    >
      다음
    </a>,
  );
  indent.push(
    <a
      key="last"
      href="#none"
      // className="last"
      className={`last ${totalPageCnt === current ? 'disabled' : ''}`}
      onClick={e => {
        e.preventDefault();
        pageHandler(totalPageCnt);
      }}
    >
      마지막
    </a>,
  );
  // }
  return indent;
};

const Pagination = ({ current, pageSize, total, groupSize, pageHandler, pageSizeHandler, fixedViewSize }) => (
  <StyledPage className="page">
    {total > 0 ? renderPagination(current, pageSize, total, groupSize, pageHandler) : null}
    {!fixedViewSize && (
      <select className="page_size" onChange={pageSizeHandler}>
        <option value={10}>10</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
      </select>
    )}
  </StyledPage>
);

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  groupSize: PropTypes.number.isRequired,
  pageHandler: PropTypes.func.isRequired,
  pageSizeHandler: PropTypes.func.isRequired,
  fixedViewSize: PropTypes.bool,
};

Pagination.defaultProps = {
  fixedViewSize: false,
};

export default Pagination;

import React from 'react';
import styled from 'styled-components';

import IconNoContent from 'images/common/icon-no-content-gray.png';

const StyledEmptyRowsView = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  .noContentIcon {
    width: 100%;
    height: 16px;
    background: url(${IconNoContent}) no-repeat 50% 0;
  }
`;

const EmptyRowsView = () => (
  <StyledEmptyRowsView>
    <span>
      <span className="noContentIcon" />
      구성원이 존재하지 않습니다.
    </span>
  </StyledEmptyRowsView>
);

export default EmptyRowsView;

import React, { useState } from 'react';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';

/**
 * TPMS - 개선활동 - 등록/진행 - 미결함
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '등록/진행' }, { title: '미결함' }];

const InSuspenseTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선활동 - 등록/진행" nav={nav} useCount count={0}>
        <Spin spinning={isLoading}>미결함</Spin>
      </ExpandableTitleContainer>
      <GlobalStyle />
    </div>
  );
};

export default InSuspenseTable;

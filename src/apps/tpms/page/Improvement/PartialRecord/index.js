import React, { useState } from 'react';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';

/**
 * TPMS - 개선활동 - 실적조회 - 부분별실적
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '실적조회' }, { title: '부분별실적' }];

const PartialRecord = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선활동 - 실적조회" nav={nav} useCollapsed>
        <Spin spinning={isLoading}>부분별실적</Spin>
      </ExpandableTitleContainer>
      <GlobalStyle />
    </div>
  );
};

export default PartialRecord;

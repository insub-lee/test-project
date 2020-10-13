import React, { useState } from 'react';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';

/**
 * TPMS - 개선활동 - REPORT - 실적리포트
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: 'REPORT' }, { title: '실적리포트' }];

const RecordReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선활동 - REPORT" nav={nav} useCollapsed>
        <Spin spinning={isLoading}>실적리포트</Spin>
      </ExpandableTitleContainer>
      <GlobalStyle />
    </div>
  );
};

export default RecordReport;

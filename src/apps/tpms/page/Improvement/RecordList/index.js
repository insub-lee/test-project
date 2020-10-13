import React, { useState } from 'react';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';

/**
 * TPMS - 개선활동 - REPORT - 실적리스트
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: 'REPORT' }, { title: '실적리스트' }];

const RecordList = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선활동 - 실적조회" nav={nav} useCollapsed>
        <Spin spinning={isLoading}>실적리스트</Spin>
      </ExpandableTitleContainer>
      <GlobalStyle />
    </div>
  );
};

export default RecordList;

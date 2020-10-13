import React, { useState } from 'react';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';

/**
 * TPMS - 개선활동 - 등록/진행 - 등록함
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '등록/진행' }, { title: '등록함' }];

const RecordList = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="등록함" nav={nav} useCount count={0}>
        <Spin spinning={isLoading}>등록함</Spin>
      </ExpandableTitleContainer>
      <GlobalStyle />
    </div>
  );
};

export default RecordList;

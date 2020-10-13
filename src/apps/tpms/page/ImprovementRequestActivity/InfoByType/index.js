import React, { useState } from 'react';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';

/**
 * TPMS - 개선요청활동(생산) - 유형별
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선요청활동생산' }, { title: '유형별' }];

const InfoByType = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선요청활동(생산)" nav={nav}>
        <Spin spinning={isLoading}>유형별</Spin>
      </ExpandableTitleContainer>
      <GlobalStyle />
    </div>
  );
};

export default InfoByType;

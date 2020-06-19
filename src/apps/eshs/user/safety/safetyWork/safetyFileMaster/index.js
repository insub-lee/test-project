import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from './pages/ListPage';
import * as CustomButtons from './Buttons';

/*
    안전지킴이 - 안전작업 관련자료 - 안전작업 자료
*/

const safetyFileMaster = () => (
  <BizBuilderBase sagaKey="safetyFileMaster" viewType="LIST" workSeq={8361} CustomListPage={ListPage} CustomButtons={CustomButtons} />
);

export default safetyFileMaster;

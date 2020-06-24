import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import VersionMgtPage from './page';

/*
    안전지킴이 - 소방점검 - 소방점검 버전관리
*/

const fireVersionMgt = () => <BizMicroDevBase component={VersionMgtPage} sagaKey="fireVersionMgt" />;

export default fireVersionMgt;

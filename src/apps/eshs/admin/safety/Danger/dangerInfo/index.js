import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import ModifyPage from './Modify';

const DangerInfo = () => <BizBuilderBase sagaKey="dangerInfo" workSeq={10341} viewType="INPUT" CustomInputPage={ModifyPage} />;

export default DangerInfo;

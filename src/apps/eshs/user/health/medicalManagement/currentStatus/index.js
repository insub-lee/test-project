import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ViewPage from './viewPage';

const CurrentStatus = () => <BizMicroDevBase sagaKey="CurrentStatus" component={ViewPage} />;

export default CurrentStatus;

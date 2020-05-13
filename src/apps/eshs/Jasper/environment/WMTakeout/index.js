import React from 'react';
import Iframe from 'apps/eshs/Jasper/common/Iframe';

const WMTakeout = printList => <Iframe title="반출증 인쇄" src={`${printList}`} />;

export default WMTakeout;

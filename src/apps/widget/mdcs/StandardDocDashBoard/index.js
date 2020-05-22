import React from 'react';

import BizMicroDevBase from 'components/BizMicroDevBase';

import DocDashBoard from './DocDashBoard';

const StandardDocDashBoard = ({ item }) => <BizMicroDevBase sagaKey="mdcsStandardDocDashBoard" item={item} component={DocDashBoard} />;

export default StandardDocDashBoard;

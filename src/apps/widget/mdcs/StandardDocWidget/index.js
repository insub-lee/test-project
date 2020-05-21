import React from 'react';

import BizMicroDevBase from 'components/BizMicroDevBase';

import StandardDocList from './StandardDocList';

const StandardDocListWidget = ({ sagaKey, widgetTitle, widgetClassName }) => (
  <BizMicroDevBase sagaKey={sagaKey} widgetTitle={widgetTitle} widgetClassName={widgetClassName} component={StandardDocList} />
);

export default StandardDocListWidget;

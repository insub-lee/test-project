import React from 'react';
import loadable from '@loadable/component';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';

const indicator = <Icon type="loading" spin style={{ fontSize: 24 }} />;
const Loading = () => <Spin indicator={indicator} style={{ margin: 'auto', width: '100%', padding: '20%' }} />;

export default ({ loader }) => loadable(loader, { fallback: <Loading /> });

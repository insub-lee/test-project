import React from 'react';
import loadable from 'react-loadable';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
// import loadable from '@loadable/component';
// import LoadingIndicator from 'components/LoadingIndicator';

const indicator = <Icon type="loading" spin />;
// const Loader = () => <div />;
const Loader = () => <Spin indicator={indicator} style={{ margin: 'auto', width: '100%', padding: '20%' }} />;

// export default ({ loader, ...otherProps }) => loadable(loader, { LoadingComponent: <Loader /> });
export default ({ loader, ...otherProps }) => loadable({ loader, loading: Loader });

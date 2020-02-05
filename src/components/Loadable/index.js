import React from 'react';
import loadable from 'react-loadable';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
// import loadable from '@loadable/component';
// import LoadingIndicator from 'components/LoadingIndicator';

// const Loader = () => <div />;

const indicator = <Icon type="loading" spin style={{ fontSize: 24 }} />;
const Loader = () => <Spin indicator={indicator} style={{ margin: 'auto', width: '100%', padding: '20%' }} />;

/* When use @loadable/component (but loading is not working) */
// export default ({ loader, ...otherProps }) => loadable(loader, { loading: Loader });

/* When use react-loadable */
export default ({ loader, ...otherProps }) => loadable({ loader, loading: Loader });

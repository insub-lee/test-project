import React from 'react';
import loadable from 'react-loadable-visibility/loadable-components';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
// import LoadingIndicator from 'components/LoadingIndicator';

// const Loader = () => <div />;

const indicator = <Icon type="loading" spin style={{ fontSize: 24 }} />;
const Loading = () => <Spin indicator={indicator} style={{ margin: 'auto', width: '100%', padding: '20%' }} />;

/* When use @loadable/component (but loading is not working) */
export default ({ loader, ...otherProps }) => loadable(loader, { fallback: <Loading /> });

/* When use react-loadable */
// export default ({ loader, ...otherProps }) => loadable({ loader, loading: Loading });

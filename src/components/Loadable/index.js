import React from 'react';
import loadable from 'react-loadable';
// import loadable from '@loadable/component';
// import LoadingIndicator from 'components/LoadingIndicator';

// export default ({ loader, ...otherProps }) => loadable(loader, { LoadingComponent: <LoadingIndicator /> });
const Loader = () => <div />;

export default ({ loader, ...otherProps }) => loadable({ loader, loading: Loader });

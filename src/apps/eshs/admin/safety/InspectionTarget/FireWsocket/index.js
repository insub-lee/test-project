import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from 'apps/eshs/admin/safety/InspectionTarget/FireWsocket/pages/ListPage';
import * as CustomButtons from './Buttons';

function FireWsocket(props) {
  const [isLoading, setIsLoading] = useState(true);
  const loadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BizBuilderBase
      sagaKey="FireWsocket"
      workSeq={10401}
      viewType="LIST"
      CustomListPage={ListPage}
      CustomButtons={CustomButtons}
      loadingComplete={loadingComplete}
      isSearched={false}
    />
  );
}

FireWsocket.propTypes = {};
FireWsocket.defaultProps = {};

export default FireWsocket;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from 'apps/eshs/admin/safety/InspectionTarget/FirePreAlarm/pages/ListPage';
import * as CustomButtons from './Buttons';

function FirePreAlarm(props) {
  const [isLoading, setIsLoading] = useState(true);
  const loadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BizBuilderBase
      sagaKey="FirePreAlarm"
      workSeq={9693}
      viewType="LIST"
      CustomListPage={ListPage}
      CustomButtons={CustomButtons}
      loadingComplete={loadingComplete}
      isSearched={false}
    />
  );
}

FirePreAlarm.propTypes = {};
FirePreAlarm.defaultProps = {};

export default FirePreAlarm;

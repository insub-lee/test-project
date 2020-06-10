import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from 'apps/eshs/admin/safety/InspectionTarget/FireAirLineMask/pages/ListPage';
import * as CustomButtons from './Buttons';

function FireAirLineMask(props) {
  const [isLoading, setIsLoading] = useState(true);
  const loadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BizBuilderBase
      sagaKey="FireAirLineMask"
      workSeq={11861}
      viewType="LIST"
      CustomListPage={ListPage}
      CustomButtons={CustomButtons}
      loadingComplete={loadingComplete}
      isSearched={false}
    />
  );
}

FireAirLineMask.propTypes = {};
FireAirLineMask.defaultProps = {};

export default FireAirLineMask;

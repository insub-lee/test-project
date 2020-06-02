import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from 'apps/eshs/admin/safety/InspectionTarget/FireHydrant/pages/ListPage';
import * as CustomButtons from './Buttons';

function FireExtinguisher(props) {
  const [isLoading, setIsLoading] = useState(true);

  const loadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BizBuilderBase
      sagaKey="FireHydrant"
      workSeq={9161}
      viewType="LIST"
      CustomListPage={ListPage}
      CustomButtons={CustomButtons}
      loadingComplete={loadingComplete}
      isSearched={false}
    />
  );
}

FireExtinguisher.propTypes = {};
FireExtinguisher.defaultProps = {};

export default FireExtinguisher;

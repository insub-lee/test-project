import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from 'apps/eshs/admin/safety/pages/ListPage';
import { BUTTON_CATEGORY } from 'apps/eshs/admin/safety/InspectionTarget/internal_constants';
import * as CustomButtons from './Buttons';

function FireExtinguisher(props) {
  const [isLoading, setIsLoading] = useState(true);

  const loadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BizBuilderBase
      sagaKey="FireExtinguisher"
      workSeq={3667}
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

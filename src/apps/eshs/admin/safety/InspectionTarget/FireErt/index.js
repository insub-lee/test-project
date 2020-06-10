import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from 'apps/eshs/admin/safety/InspectionTarget/FireErt/pages/ListPage';
import * as CustomButtons from './Buttons';

function FireErt(props) {
  const [isLoading, setIsLoading] = useState(true);
  const loadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BizBuilderBase
      sagaKey="FireErt"
      workSeq={11301}
      viewType="LIST"
      CustomListPage={ListPage}
      CustomButtons={CustomButtons}
      loadingComplete={loadingComplete}
      isSearched={false}
    />
  );
}

FireErt.propTypes = {};
FireErt.defaultProps = {};

export default FireErt;

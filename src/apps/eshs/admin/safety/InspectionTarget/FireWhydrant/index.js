import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from 'apps/eshs/admin/safety/InspectionTarget/FireWhydrant/pages/ListPage';
import * as CustomButtons from './Buttons';

function FireWhydrant(props) {
  const [isLoading, setIsLoading] = useState(true);
  const loadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BizBuilderBase
      sagaKey="FireWhydrant"
      workSeq={10101}
      viewType="LIST"
      CustomListPage={ListPage}
      CustomButtons={CustomButtons}
      loadingComplete={loadingComplete}
      isSearched={false}
    />
  );
}

FireWhydrant.propTypes = {};
FireWhydrant.defaultProps = {};

export default FireWhydrant;

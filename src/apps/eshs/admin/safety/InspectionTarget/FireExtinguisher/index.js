import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from 'apps/eshs/admin/safety/pages/ListPage';

import { BUTTON_CATEGORY } from 'apps/eshs/admin/safety/InspectionTarget/internal_constants';

function FireExtinguisher(props) {
  const [isLoading, setIsLoading] = useState(true);

  const loadingComplete = () => {
    setIsLoading(false);
  };

  const customValues = [
    {
      field: 'IS_INSPECTED',
      placeHolder: '점검 유무',
      defaultValue: undefined,
      options: [
        { key: 'T', value: 'T', name: { kor: '점검완료' } },
        { key: 'F', value: 'F', name: { kor: '미실시' } },
      ],
    },
    {
      field: 'QUARTER',
      placeHolder: '분기',
      defaultValue: '1Q',
      options: [
        { key: '1Q', value: '1Q', name: { kor: '1Q' } },
        { key: '2Q', value: '2Q', name: { kor: '2Q' } },
        { key: '3Q', value: '3Q', name: { kor: '3Q' } },
        { key: '4Q', value: '4Q', name: { kor: '4Q' } },
      ],
    },
  ];

  return (
    <BizBuilderBase
      sagaKey="FireExtinguisher"
      workSeq={3667}
      viewType="LIST"
      CustomListPage={ListPage}
      loadingComplete={loadingComplete}
      buttonCategory={BUTTON_CATEGORY.FIRE_EXTINGUISHER_MAIN}
      isSearched={false}
      customValues={customValues}
    />
  );
}

FireExtinguisher.propTypes = {};
FireExtinguisher.defaultProps = {};

export default FireExtinguisher;

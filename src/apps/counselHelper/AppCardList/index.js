import React from 'react';

import Title from '../Title';
import AppCard from '../AppCard';
import Styled from './Styled';

const AppCardList = ({ title, childNode }) => {
  const appMap = childNode.map(query => {
    const appTitle = query.title;
    const { value } = query;
    return <AppCard title={appTitle} value={value} />;
  });

  return (
    <Styled>
      <Title title={title} />

      <div className="app-card-list">{appMap}</div>
    </Styled>
  );
};

export default AppCardList;
AppCardList.defaultProps = {
  detail: [],
};

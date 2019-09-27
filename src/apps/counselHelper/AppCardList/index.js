import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import AppCard from '../AppCard';
import Styled from './Styled';

const AppCardList = ({ pTitle, childNode }) => {
  const appMap = childNode.map(query => {
    const { title, key, DSCR_KOR, value, STARPOINT } = query;
    return <AppCard title={title} value={value} key={key} DSCR_KOR={DSCR_KOR} starPoint={STARPOINT} />;
  });
  // console.log(title, linkProp);
  return (
    <Styled>
      <Title title={pTitle} />

      <div className="app-card-list">{appMap}</div>
    </Styled>
  );
};

export default AppCardList;

AppCardList.propTypes = {
  title: PropTypes.string,
  childNode: PropTypes.array,
};

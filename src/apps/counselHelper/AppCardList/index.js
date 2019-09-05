import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import AppCard from '../AppCard';
import Styled from './Styled';

const AppCardList = ({ title, childNode, linkProp }) => {
  const appMap = childNode.map(query => {
    const appTitle = query.title;
    const { key } = query;
    const { value } = query;
    const appLinkProps = query.linkProp;
    return <AppCard title={appTitle} value={value} key={key} linkProps={appLinkProps} />;
  });
  // console.log(title, linkProp);
  return (
    <Styled>
      <Title title={title} />

      <div className="app-card-list">{appMap}</div>
    </Styled>
  );
};

export default AppCardList;

AppCardList.propTypes = {
  title: PropTypes.string,
  childNode: PropTypes.array,
  linkProp: PropTypes.object,
};

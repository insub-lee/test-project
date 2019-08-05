import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '../../../UserStore/components/uielements/card.style';
import bizAppIcon from 'images/bizstore/biz-app-icon.png';
/* eslint-disable */
const BizItem = ({ paramType, BIZGRP_ID, title, subTitle }) => (
  <Card className="bizAppCard">
    <div className="BizDivIcons">
      <img src={bizAppIcon} alt={title} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
    <Link to={`/portal/card/${paramType}/detail/info/${BIZGRP_ID}`} title={subTitle}>
      <h4 className="appTitle">{title}</h4>
      <p className="appDesc">{subTitle}</p>
    </Link>
  </Card>
);

BizItem.propTypes = {
  BIZGRP_ID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
};

BizItem.defaultProps = {
  subTitle: '',
};

export default BizItem;

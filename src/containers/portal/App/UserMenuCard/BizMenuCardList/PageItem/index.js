import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import bizAppIcon from 'images/bizstore/biz-app-icon.png';
import Card from '../../../UserStore/components/uielements/card.style';

const PageItem = ({ PAGE_ID, BIZGRP_ID, title, subTitle, paramType }) => (
  <Card className="bizAppCard">
    <div className="BizDivIcons">
      <img src={bizAppIcon} alt={title} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
    <Link to={`/portal/card/${paramType}/detail/page/${BIZGRP_ID}/${PAGE_ID}`} title={subTitle}>
      <h4 className="appTitle">{title}</h4>
      <p className="appDesc">{subTitle}</p>
    </Link>
  </Card>
);

PageItem.propTypes = {
  BIZGRP_ID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  paramType: PropTypes.string.isRequired,
  PAGE_ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

PageItem.defaultProps = {
  subTitle: '',
};

export default PageItem;

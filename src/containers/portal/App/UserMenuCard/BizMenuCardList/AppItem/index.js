import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlObj, imgUrl } from 'utils/commonUtils';
import userIcon from 'images/bizstore/icon-user.png';

import messages from './messages';
import Card from '../../../UserStore/components/uielements/card.style';

/* eslint-disable */
const Item = ({ paramType, appId, categoryId, title, subTitle, starPoint, starTotal, appIcon }) => {
  let subTit = '';
  if(subTitle) {
    subTit = subTitle.length > 40 ? `${subTitle.substring(0, 40)}...` : subTitle.substring(0, 40);
  }

  return (
    <Card className="categoryAppCard">
      <div className="CtgDivIcons">
        <img
          src={imgUrl.get('120x120', appIcon)}
          alt={intlObj.get(messages.appIcon)}
          style={{ position: 'absolute', top: 0, left: 0 }}
          onError={e => {
            e.target.src = '/app_icon/icon_no_image.png';
          }}
        />
      </div>
      <Link to={`/portal/card/${paramType}/detail/app/${categoryId}/${appId}`} title={subTit}>
        <h4 className="appTitle">{title}</h4>
        <p className="appDesc">{subTit}</p>
        <span className="ratingAvgInfo">
          <Rate allowHalf disabled value={parseFloat(starPoint)} />
          <span className="rateNumber">{starTotal}</span>
          <img src={userIcon} alt={intlObj.get(messages.memberNum)} className="userIcon" />
        </span>
      </Link>
    </Card>
  );
};

Item.propTypes = {
  appId: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  starPoint: PropTypes.number,
  starTotal: PropTypes.number,
  appIcon: PropTypes.string,
};

Item.defaultProps = {
  starPoint: 0,
  starTotal: 0,
  appIcon: '',
};

export default Item;

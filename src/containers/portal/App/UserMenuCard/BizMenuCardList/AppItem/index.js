import React, { PureComponent } from 'react';
import { Button, Rate, Popover } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlObj, imgUrl } from 'utils/commonUtils';
import categoryRgtIcon from 'images/bizstore/icon-category-rgt.png';
import menuRgtIcon from 'images/bizstore/icon-menu-rgt.png';
import userIcon from 'images/bizstore/icon-user.png';
import moreMenu from 'images/bizstore/icon-more-menu.png';

import messages from './messages';
import Card from '../../../UserStore/components/uielements/card.style';

class Item extends PureComponent {
  render() {
    const { appId, categoryId, title, subTitle, starPoint, starTotal, appIcon } = this.props;

    const subTit = subTitle.length > 40 ? `${subTitle.substring(0, 40)}...` : subTitle.substring(0, 40);

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
        <Link to={`/portal/store/appMain/bizStore/app/detail/${categoryId}/${appId}`} title={subTit}>
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
  }
}

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

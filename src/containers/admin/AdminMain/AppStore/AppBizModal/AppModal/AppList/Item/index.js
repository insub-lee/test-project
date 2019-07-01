import React, { PureComponent } from './node_modules/react';
import { Button, Rate } from './node_modules/antd';
import PropTypes from './node_modules/prop-types';
// import { Link } from 'react-router-dom';
// import * as feed from 'components/Feedback/functions';
import { intlObj, imgUrl } from './node_modules/utils/commonUtils';

import categoryRgtIcon from './node_modules/images/bizstore/icon-category-rgt.png';
import menuRgtIcon from './node_modules/images/bizstore/icon-menu-rgt.png';
import userIcon from './node_modules/images/bizstore/icon-user.png';
import messages from './node_modules/containers/store/AppMain/AppList/Item/messages';
import Card from './node_modules/containers/store/components/uielements/card.style';

class Item extends PureComponent {
  render() {
    const {
      title,
      subTitle,
      starPoint,
      starTotal,
      registed,
      registCategory,
      registApp,
      appIcon,
    } = this.props;

    const subTit = subTitle.length > 40 ? `${subTitle.substring(0, 40)}...` : subTitle.substring(0, 40);

    return (
      <Card className="categoryAppCard">
        {registed === 'false' ? (
          <div className="hoverCtgIcons">
            <Button className="btnCategoryRgt" title={intlObj.get(messages.registCategory)} onClick={registCategory}>
              <img src={categoryRgtIcon} alt={intlObj.get(messages.registCategory)} />
            </Button>
            <Button className="btnMenuRgt" title={intlObj.get(messages.registMenu)} onClick={registApp}>
              <img src={menuRgtIcon} alt={intlObj.get(messages.registMenu)} />
            </Button>
          </div>) : (
            <div className="displayCtgIcons">
              <div className="infoRgt" title={intlObj.get(messages.using)}>{intlObj.get(messages.using)} </div>
            </div>
          )
        }
        <div className="CtgDivIcons">
          <img
            src={imgUrl.get('120x120', appIcon)}
            alt={intlObj.get(messages.appIcon)}
            style={{ position: 'absolute', top: 0, left: 0 }}
            onError={(e) => { e.target.src = '/app_icon/icon_no_image.png'; }}
          />
        </div>
        <h4 className="appTitle">{title}</h4>
        <p className="appDesc">{subTit}</p>
        <span className="ratingAvgInfo">
          <Rate
            allowHalf
            disabled
            value={parseFloat(starPoint)}
          />
          <span className="rateNumber">
            {starTotal}
          </span>
          <img src={userIcon} alt={intlObj.get(messages.memberNum)} className="userIcon" />
        </span>
      </Card>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  starPoint: PropTypes.number,
  starTotal: PropTypes.number,
  registed: PropTypes.string.isRequired,
  appIcon: PropTypes.string,

  registApp: PropTypes.func.isRequired,
  registCategory: PropTypes.func.isRequired,
};

Item.defaultProps = {
  starPoint: 0,
  starTotal: 0,
  appIcon: '',
};

export default Item;

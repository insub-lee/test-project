import React, { PureComponent } from 'react';
import { Button, Rate } from 'antd';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import * as feed from 'components/Feedback/functions';
import { intlObj, imgUrl } from 'utils/commonUtils';

import categoryRgtIcon from 'images/bizstore/icon-category-rgt.png';
import menuRgtIcon from 'images/bizstore/icon-menu-rgt.png';
import userIcon from 'images/bizstore/icon-user.png';
import messages from 'containers/store/AppMain/AppList/Item/messages';
import Card from 'containers/store/components/uielements/card.style';

class Item extends PureComponent {
  render() {
    const {
      // appId,
      // categoryId,
      title,
      subTitle,
      starPoint,
      starTotal,
      registed,
      registCategory,
      registApp,
      // onClick,
      appIcon,
    } = this.props;

    // const handleRegistApp = () => feed.showConfirm
    // (`'${title}'${intlObj.get(messages.registApp)}`, '', registApp);
    // const handleRegistCategory = () => feed.showConfirm
    // (`'${title}'${intlObj.get(messages.registApp)}`, `${intlObj.get(
    // messages.registAppContainingCategory)}`, registCategory);

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
        {/* </Link> */}
      </Card>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  registed: PropTypes.string.isRequired,

  starPoint: PropTypes.number,
  starTotal: PropTypes.number,
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

import React, { PureComponent } from 'react';
import { Button, Rate, Popover } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlObj, imgUrl } from 'utils/commonUtils';
import categoryRgtIcon from 'images/bizstore/icon-category-rgt.png';
import menuRgtIcon from 'images/bizstore/icon-menu-rgt.png';
import userIcon from 'images/bizstore/icon-user.png';
import moreMenu from 'images/bizstore/icon-more-menu.png';
import Card from 'containers/store/components/uielements/card.style';
import * as commonjs from 'containers/common/functions/common';

import messages from './messages';

class Item extends PureComponent {
  render() {
    const { appId, bizgrpId, appIcon, title, subTitle, starPoint, starTotal, registed, registCategory, registApp } = this.props;

    const preUrl = commonjs.getPreUrl(this.props.match.path, '/biz/');

    const subTit = subTitle.length > 40 ? `${subTitle.substring(0, 40)}...` : subTitle.substring(0, 40);

    // 상단 앱등록/사용중 영역
    let registAreaJsx = '';
    if (registed === 'false') {
      registAreaJsx = (
        <div>
          <div className="hoverCtgIcons">
            <Button className="btnCategoryRgt" title={intlObj.get(messages.registCategory)} onClick={registCategory}>
              <img src={categoryRgtIcon} alt={intlObj.get(messages.registCategory)} />
            </Button>
            <Button className="btnMenuRgt" title={intlObj.get(messages.registMenu)} onClick={registApp}>
              <img src={menuRgtIcon} alt={intlObj.get(messages.registMenu)} />
            </Button>
          </div>
          {/* 시작 - 태블릿, 모바일 용 */}
          <Popover
            placement="bottomRight"
            content={
              <ul className="popoverType1 appListMenu">
                <li>
                  <Button type="button" className="highlight icon-regst-tree">
                    카테고리 등록
                  </Button>
                </li>
                <li>
                  <Button type="button" className="icon-regst-app">
                    메뉴 등록
                  </Button>
                </li>
              </ul>
            }
            size="50"
            trigger="click"
            overlayClassName="popoverType1"
          >
            <div className="moreMenuImg">
              <img src={moreMenu} alt="서브메뉴 보이기" />
            </div>
          </Popover>
        </div>
      );
    } else {
      registAreaJsx = (
        <div className="displayCtgIcons">
          <div className="infoRgt" title={intlObj.get(messages.using)}>
            {intlObj.get(messages.using)}{' '}
          </div>
        </div>
      );
    }

    return (
      <Card className="categoryAppCard">
        {registAreaJsx}

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

        <Link to={`${preUrl}detail/app/${bizgrpId}/${appId}`} title={subTit}>
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
  match: PropTypes.object.isRequired,
  appId: PropTypes.number.isRequired,
  bizgrpId: PropTypes.number.isRequired,
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

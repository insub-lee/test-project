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
import Card from '../../../components/uielements/card.style';

class Item extends PureComponent {
  render() {
    const {
      appId,
      categoryId,
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
              content={(
                <ul className="popoverType1 appListMenu" >
                  <li>
                    <Button
                      // onClick={() => handleRegistCategory(item)}
                      type="button"
                      className="highlight icon-regst-tree"
                      onClick={registCategory}
                    // style={{ display: item.WG_COUNT === 0 ? 'block' : 'none' }}
                    >
                      {/* {intlObj.get(messages.catgInput)} */} 카테고리 등록
                    </Button>
                  </li>
                  <li>
                    <Button
                      // onClick={() => handleRegistApp(item)}
                      type="button"
                      className="icon-regst-app"
                      onClick={registApp}
                    // style={{ display: item.WG_COUNT === 0 ? 'block' : 'none' }}
                    >
                      {/* {intlObj.get(messages.menuInput)} */} 메뉴 등록
                    </Button>
                  </li>
                </ul>
              )}
              size="50"
              trigger="click"
              overlayClassName="popoverType1"
            >
              <div className="moreMenuImg">
                <img
                  src={moreMenu}
                  alt="서브메뉴 보이기"
                // alt={intlObj.get(messages.appMenu)}
                />
              </div>
            </Popover>
            {/* 끝 - 태블릿, 모바일 용 */}
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
        <Link to={`/store/appMain/bizStore/app/detail/${categoryId}/${appId}`} title={subTit}>
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
  registed: PropTypes.string.isRequired,
  registApp: PropTypes.func.isRequired,
  registCategory: PropTypes.func.isRequired,
};

Item.defaultProps = {
  starPoint: 0,
  starTotal: 0,
  appIcon: '',
};

export default Item;

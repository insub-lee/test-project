import React, { PureComponent } from 'react';
import { Button, Popover } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlObj, imgUrl } from 'utils/commonUtils';
import menuRgtIcon from 'images/bizstore/icon-menu-rgt.png';

import moreMenu from 'images/bizstore/icon-more-menu.png';
import messages from './messages';
import Card from '../../../components/uielements/card.style';

class ItemBiz extends PureComponent {
  /* eslint-disable */
  render() {
    const { appId, title, subTitle, registed, registBiz, appIcon } = this.props;

    const subTit = subTitle.length > 40 ? `${subTitle.substring(0, 40)}...` : subTitle.substring(0, 40);
    console.debug('>>>>>>>itemBiz props: ', this.props);
    return (
      <Card className="categoryAppCard">
        {registed === 'false' ? (
          <div>
            <div className="hoverCtgIcons">
              <Button className="btnMenuRgt" title={intlObj.get(messages.registMenu)} onClick={registBiz}>
                <img src={menuRgtIcon} alt={intlObj.get(messages.registMenu)} />
              </Button>
            </div>
            {/* 시작 - 태블릿, 모바일 용 */}
            <Popover
              placement="bottomRight"
              content={
                <ul className="popoverType1 appListMenu">
                  <li>
                    <Button title={intlObj.get(messages.registMenu)} type="button" className="highlight icon-regst-tree" onClick={registBiz}>
                      {intlObj.get(messages.registMenu)}
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
        ) : (
          <div className="displayCtgIcons">
            <div className="infoRgt" title={intlObj.get(messages.using)}>
              {intlObj.get(messages.using)}{' '}
            </div>
          </div>
        )}
        <div className="CtgDivIcons">
          <img src={imgUrl.get('120x120', appIcon)} alt={intlObj.get(messages.appIcon)} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
        <Link
          to={
            this.props.currentView === 'Mobile' || this.props.currentView === 'Tablet'
              ? `/portal/store/appMain/bizStore/biz/detail/info/${appId}`
              : `/portal/store/appMain/bizStore/biz/menulist/${appId}`
          }
          title={subTit}
        >
          <h4 className="appTitle">{title}</h4>
          <p className="appDesc">{subTit}</p>
        </Link>
      </Card>
    );
  }
}

ItemBiz.propTypes = {
  appId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  registed: PropTypes.string.isRequired,
  appIcon: PropTypes.string.isRequired,
  registBiz: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};

export default ItemBiz;

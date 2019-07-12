import React, { PureComponent } from 'react';
import { Button, Popover } from 'antd';
import PropTypes from 'prop-types';
import { intlObj, imgUrl } from 'utils/commonUtils';
import menuRgtIcon from 'images/bizstore/icon-menu-rgt.png';
import moreMenu from 'images/bizstore/icon-more-menu.png';
import Card from 'containers/store/components/uielements/card.style';

import messages from './messages';

class ItemBiz extends PureComponent {
  render() {
    const {
      title,
      subTitle,
      registed,
      registBiz,
      appIcon,
    } = this.props;

    const subTit = subTitle.length > 40 ? `${subTitle.substring(0, 40)}...` : subTitle.substring(0, 40);

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
              content={(
                <ul className="popoverType1 appListMenu" >
                  <li>
                    <Button
                      type="button"
                      className="highlight icon-regst-tree"
                      title={intlObj.get(messages.registMenu)}
                      onClick={registBiz}
                    >
                      {intlObj.get(messages.registMenu)}
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
                />
              </div>
            </Popover>
          </div>) : (
            <div className="displayCtgIcons">
              <div className="infoRgt" title={intlObj.get(messages.using)}>{intlObj.get(messages.using)} </div>
            </div>
          )
        }
        <div className="CtgDivIcons">
          <img src={imgUrl.get('120x120', appIcon)} alt={intlObj.get(messages.appIcon)} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
        <h4 className="appTitle">{title}</h4>
        <p className="appDesc">{subTit}</p>
      </Card>
    );
  }
}

ItemBiz.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  registed: PropTypes.string.isRequired,
  appIcon: PropTypes.string.isRequired,
  registBiz: PropTypes.func.isRequired,
};

export default ItemBiz;

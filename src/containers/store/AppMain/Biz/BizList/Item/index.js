import React, { PureComponent } from 'react';
import { Button, Popover } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import * as feed from 'components/Feedback/functions';
import { intlObj } from 'utils/commonUtils';

import Card from 'containers/store/components/uielements/card.style';
import moreMenu from 'images/bizstore/icon-more-menu.png';
import bizAppIcon from 'images/bizstore/biz-app-icon.png';
import menuRgtIcon from 'images/bizstore/icon-menu-rgt.png';

import messages from '../messages';

class Item extends PureComponent {
  render() {
    const {
      selectedBizgrpId,
      BIZGRP_ID,
      title,
      subTitle,
      registed,
      registApp,
      // MCNT,
    } = this.props;

    // const handleRegistApp = () => {
    //   if (MCNT > 0) {
    //     feed.showConfirm(`${title} ${intlObj.get(messages.registBizs)}`, '', registApp);
    //   } else {
    //     feed.error(`${intlObj.get(messages.menuNotReg)}`);
    //   }
    // };

    return (
      <Card className={`bizAppCard ${selectedBizgrpId === BIZGRP_ID ? 'mark' : ''}`}>
        {registed === 'false' ? (
          <div>
            <div className="hoverCtgIcons">
              <Button className="btnMenuRgt" title={intlObj.get(messages.registBiz)} onClick={registApp}>
                <img src={menuRgtIcon} alt={intlObj.get(messages.registBiz)} />
              </Button>
            </div>
            {/* 시작 - 태블릿, 모바일 용 */}
            <Popover
              placement="bottomRight"
              content={
                <ul className="popoverType1 appListMenu">
                  <li>
                    <Button
                      // onClick={() => handleRegistApp(item)}
                      type="button"
                      className="icon-regst-app"
                      onClick={registApp}
                      // style={{ display: item.WG_COUNT === 0 ? 'block' : 'none' }}
                    >
                      {/* {intlObj.get(messages.menuInput)} */} 업무그룹 등록
                    </Button>
                  </li>
                </ul>
              }
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
          </div>
        ) : (
          <div className="displayCtgIcons">
            <div className="infoRgt" title={intlObj.get(messages.apping)}>
              {intlObj.get(messages.apping)}
            </div>
          </div>
        )}
        <div className="BizDivIcons">
          <img src={bizAppIcon} alt={title} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
        <Link to={`/store/appMain/bizStore/biz/detail/info/${BIZGRP_ID}`} title={subTitle}>
          <h4 className="appTitle">{title}</h4>
          <p className="appDesc">{subTitle}</p>
        </Link>
      </Card>
    );
  }
}

Item.propTypes = {
  selectedBizgrpId: PropTypes.number.isRequired,
  BIZGRP_ID: PropTypes.number.isRequired,
  // MCNT: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  registed: PropTypes.string.isRequired,

  registApp: PropTypes.func.isRequired,
};

export default Item;

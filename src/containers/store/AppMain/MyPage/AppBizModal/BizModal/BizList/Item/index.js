import React, { PureComponent } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import * as feed from 'components/Feedback/functions';
import { intlObj } from 'utils/commonUtils';
import bizAppIcon from 'images/bizstore/biz-app-icon.png';
import menuRgtIcon from 'images/bizstore/icon-menu-rgt.png';
import Card from 'containers/store/components/uielements/card.style';
import messages from '../messages';

class Item extends PureComponent {
  render() {
    const { selectedBizgrpId, BIZGRP_ID, title, subTitle, registed, registApp } = this.props;

    return (
      <Card className={`bizAppCard ${selectedBizgrpId === BIZGRP_ID ? 'mark' : ''}`}>
        {registed === 'false' ? (
          <div className="hoverCtgIcons">
            <Button className="btnMenuRgt" title={intlObj.get(messages.registBiz)} onClick={registApp}>
              <img src={menuRgtIcon} alt={intlObj.get(messages.registBiz)} />
            </Button>
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
        {/* <Link to={`/store/appMain/myPage/modal/biz/detail/info/${BIZGRP_ID}`}> */}
        <h4 className="appTitle">{title}</h4>
        <p className="appDesc">{subTitle}</p>
        {/* </Link> */}
      </Card>
    );
  }
}

Item.propTypes = {
  selectedBizgrpId: PropTypes.number.isRequired,
  BIZGRP_ID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  registed: PropTypes.string.isRequired,

  registApp: PropTypes.func.isRequired,
};

export default Item;

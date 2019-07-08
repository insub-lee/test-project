import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlObj } from 'utils/commonUtils';
import Card from 'containers/store/components/uielements/card.style';
import pageIcon from 'images/portal/pageIcon.png';
import * as commonjs from 'containers/common/functions/common';

import messages from './messages';

class ItemPage extends PureComponent {
  render() {
    const {
      bizgrpId,
      pageId,
      title,
      subTitle,
    } = this.props;

    const preUrl = commonjs.getPreUrl(this.props.match.path, '/biz/');

    const subTit = subTitle.length > 40 ? `${subTitle.substring(0, 40)}...` : subTitle.substring(0, 40);

    return (
      <Card className="categoryAppCard">
        <div className="CtgDivIcons">
          <img src={pageIcon} alt={intlObj.get(messages.pageIcon)} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
        <Link to={`${preUrl}detail/page/${bizgrpId}/${pageId}`} title={subTit}>
          <h4 className="appTitle">{title}</h4>
          <p className="appDesc">{subTit}</p>
        </Link>
      </Card>
    );
  }
}

ItemPage.propTypes = {
  match: PropTypes.object.isRequired,
  bizgrpId: PropTypes.number.isRequired,
  pageId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default ItemPage;

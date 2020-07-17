import React, { Component } from 'react';

import history from 'utils/history';
import StyledQuickLink from './StyledQuickLink';

class QuickLink extends Component {
  componentDidMount() {}

  render() {
    const { item } = this.props;
    const screen = (item && item.data && item.data.QUICK_LINK_SCREEN) || '';
    return (
      <StyledQuickLink style={{ height: '100%' }}>
        <div className="contents-item">
          <a
            href="javascrip:void(0);"
            onClick={
              screen === 'NEW_WINDOW'
                ? () => window.open(`http://eshs-dev.magnachip.com${item.data.QUICK_LINK_URL}`, '', '', '')
                : () => history.push(item.data.QUICK_LINK_URL)
            }
          >
            <span className="item-icon"></span>
            <span className="item-btn-link"></span>
            <div className="title-area">
              {/* <p className="item-title">건강정보 입력</p> */}
              <span className="item-cont">{item.data.QUICK_LINK_DESC}</span>
            </div>
          </a>
        </div>
      </StyledQuickLink>
    );
  }
}

export default QuickLink;

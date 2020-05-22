import React, { Component } from 'react';

import StyledMainWidget from 'commonStyled/MdcsStyled/StyledMainWidget';

import NoticeWidget from './NoticeWidget';
import StandardDocWidget from './StandardDocWidget';
import DraftWidget from './DraftWidget';
import StandardDocDashBoard from './StandardDocDashBoard';

class MainWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    return (
      <StyledMainWidget>
        <div className="main-widget-row">
          <div className="main-widget-col col-3">
            <NoticeWidget />
          </div>
          <div className="main-widget-col col-3">
            <StandardDocWidget widgetTitle="즐겨찾기" sagaKey="mdcsDocFavoriteWidget" widgetClassName="widget-bookmark" />
          </div>
          <div className="main-widget-col col-3">
            <StandardDocWidget widgetTitle="내가 본 문서" sagaKey="mdcsDocViewHistoryWidget" widgetClassName="widget-view" />
          </div>
        </div>
        <div className="main-widget-row">
          <div className="main-widget-col col-3 mb-0">
            <DraftWidget />
          </div>
          <StandardDocDashBoard item={item} />
        </div>
      </StyledMainWidget>
    );
  }
}

export default MainWidget;

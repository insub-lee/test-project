import React, { Component } from 'react';
import { Spin } from 'antd';

import StyledMainWidget from 'commonStyled/MdcsStyled/StyledMainWidget';
import BizMicroDevBase from 'components/BizMicroDevBase';

import NoticeWidget from './NoticeWidget';
import StandardDocWidget from './StandardDocWidget';
import DraftWidget from './DraftWidget';
import StandardDocDashBoard from './StandardDocDashBoard';

class MainWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docCntObj: {},
      docFavoriteList: [],
      docViewHistoryList: [],
      noticeList: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga, item } = this.props;
    let days = 30;
    if (item) {
      const { data } = item;
      days = data.newDocDays || 30;
    }
    const url = '/api/mdcs/v1/common/mdcsMainWidgetHandler';
    submitHandlerBySaga(sagaKey, 'POST', url, { PARAM: { WORK_SEQ: 7961, DAYS: days, PAGE: 1, PAGE_CNT: 5 } }, this.initDataBind);
  }

  initDataBind = (sagaKey, response) => {
    if (response) {
      const { docCntlist, docFavoriteList, docViewHistoryList, noticeList } = response;
      const docCntObj = docCntlist && docCntlist.length > 0 ? docCntlist.reduce((obj, cur) => ({ ...obj, [cur.WORK_SEQ]: cur }), {}) : {};
      this.setState({ docCntObj, docFavoriteList, docViewHistoryList, noticeList, isLoading: false });
    }
  };

  render() {
    const { item, sagaKey, submitHandlerBySaga } = this.props;
    const { docCntObj, docFavoriteList, docViewHistoryList, noticeList, isLoading } = this.state;
    return (
      <Spin spinning={isLoading}>
        <StyledMainWidget>
          <div className="main-widget-row">
            <div className="main-widget-col col-3">
              <NoticeWidget sagaKey={sagaKey} submitHandlerBySaga={submitHandlerBySaga} noticeList={noticeList} />
            </div>
            <div className="main-widget-col col-3">
              <StandardDocWidget
                sagaKey={sagaKey}
                submitHandlerBySaga={submitHandlerBySaga}
                widgetTitle="즐겨찾기"
                widgetClassName="widget-bookmark"
                standardDocList={docFavoriteList}
              />
            </div>
            <div className="main-widget-col col-3">
              <StandardDocWidget
                sagaKey={sagaKey}
                submitHandlerBySaga={submitHandlerBySaga}
                widgetTitle="내가 본 문서"
                widgetClassName="widget-view"
                standardDocList={docViewHistoryList}
              />
            </div>
          </div>
          <div className="main-widget-row">
            <div className="main-widget-col col-3 mb-0">
              <DraftWidget />
            </div>
            <StandardDocDashBoard sagaKey={sagaKey} submitHandlerBySaga={submitHandlerBySaga} docCntObj={docCntObj} item={item} />
          </div>
        </StyledMainWidget>
      </Spin>
    );
  }
}

const MainWidgetDevBase = () => <BizMicroDevBase sagaKey="mdcsMainWidget" component={MainWidget} />;

export default MainWidgetDevBase;

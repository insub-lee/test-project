import React, { Component } from 'react';
import DocDashModal from './DocDashModal';

class DocDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      viewType: 'LIST',
      workSeq: -1,
      taskSeq: -1,
      docCntObj: undefined,
      coverView: {
        visible: false,
        workSeq: undefined,
        taskSeq: undefined,
        viewMetaSeq: undefined,
      },
      listVisible: false,
      modalList: [],
    };
  }

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga, item } = this.props;
    let days = 30;
    if (item) {
      const { data } = item;
      days = data.newDocDays || 30;
    }
    submitHandlerBySaga(sagaKey, 'GET', `/api/mdcs/v1/common/mdcsMainDocCountHanlder/${days}`, {}, this.initDataBind);
  }

  initDataBind = (sagaKey, response) => {
    if (response && response.list && response.list.length > 0) {
      const docCntObj = response.list.reduce((obj, cur) => ({ ...obj, [cur.WORK_SEQ]: cur }), {});
      this.setState({ docCntObj });
    }
  };

  closeBtnFunc = () => this.setState({ visible: false, viewType: 'LIST', taskSeq: -1 });

  onCloseCoverView = () => {
    this.setState({
      coverView: {
        visible: false,
        workSeq: undefined,
        taskSeq: undefined,
        viewMetaSeq: undefined,
      },
    });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    this.setState({ coverView: { visible: true, workSeq, taskSeq, viewMetaSeq } });
  };

  onClickRow = row => this.setState({ visible: true, viewType: 'VIEW', workSeq: row.WORK_SEQ, taskSeq: row.TASK_SEQ });

  onClickList = WORK_SEQ => {
    const { sagaKey, submitHandlerBySaga, item } = this.props;
    let days = 30;
    if (item) {
      const { data } = item;
      days = data.newDocDays || 30;
    }
    const url = `/api/mdcs/v1/common/mdcsMainDocCountHanlder/${days}`;
    submitHandlerBySaga(sagaKey, 'POST', url, { PARAM: { WORK_SEQ } }, this.initListDataBind);
  };

  initListDataBind = (sagaKey, response) => {
    this.setState({ listVisible: true, modalList: response && response.list ? response.list : [] });
  };

  closeListBtnFunc = () => this.setState({ listVisible: false, modalList: [] });

  render() {
    const { visible, viewType, workSeq, taskSeq, docCntObj, coverView, modalList, listVisible } = this.state;
    return (
      <>
        <div className="main-widget-col col-1-2">
          <div className="widget-hover-inner">
            <a onClick={() => this.onClickList(901)} className="widget-cover">
              <span className="widget-icon widget-icon2"></span>
              <span className="widget-title-kor">업무표준</span>
              <span className="widget-title-eng">Operating standard</span>
              <span className="widget-item-number">
                {(docCntObj && docCntObj[901] && docCntObj[901].NEW_CNT) || 0}{' '}
                <span className="total">/ {(docCntObj && docCntObj[901] && docCntObj[901].TOTAL_CNT) || 0}</span>
              </span>
            </a>
          </div>
        </div>
        <div className="main-widget-col col-1-2">
          <div className="widget-hover-inner">
            <a onClick={() => this.onClickList(1921)} className="widget-cover">
              <span className="widget-icon widget-icon3"></span>
              <span className="widget-title-kor">기술표준</span>
              <span className="widget-title-eng">Technical standard</span>
              <span className="widget-item-number">
                {(docCntObj && docCntObj[1921] && docCntObj[1921].NEW_CNT) || 0}{' '}
                <span className="total">/ {(docCntObj && docCntObj[1921] && docCntObj[1921].TOTAL_CNT) || 0}</span>
              </span>
            </a>
          </div>
        </div>
        <div className="main-widget-col col-1-2">
          <div className="widget-hover-inner">
            <a onClick={() => this.onClickList(1881)} className="widget-cover">
              <span className="widget-icon widget-icon4"></span>
              <span className="widget-title-kor">도면</span>
              <span className="widget-title-eng">Drawing</span>
              <span className="widget-item-number">
                {(docCntObj && docCntObj[1881] && docCntObj[1881].NEW_CNT) || 0}{' '}
                <span className="total">/ {(docCntObj && docCntObj[1881] && docCntObj[1881].TOTAL_CNT) || 0}</span>
              </span>
            </a>
          </div>
        </div>
        <div className="main-widget-col col-1-2">
          <div className="widget-hover-inner">
            <a onClick={() => this.onClickList(3013)} className="widget-cover">
              <span className="widget-icon widget-icon5"></span>
              <span className="widget-title-kor">업무절차</span>
              <span className="widget-title-eng">Work Process</span>
              <span className="widget-item-number">
                {(docCntObj && docCntObj[3013] && docCntObj[3013].NEW_CNT) || 0}{' '}
                <span className="total">/ {(docCntObj && docCntObj[3013] && docCntObj[3013].TOTAL_CNT) || 0}</span>
              </span>
            </a>
          </div>
        </div>
        <div className="main-widget-col col-1-2 mb-0">
          <div className="widget-hover-inner">
            <a onClick={() => this.onClickList(2975)} className="widget-cover">
              <span className="widget-icon widget-icon8"></span>
              <span className="widget-title-kor">NPI</span>
              <span className="widget-title-eng">New Product Introduction</span>
              <span className="widget-item-number">
                {(docCntObj && docCntObj[2975] && docCntObj[2975].NEW_CNT) || 0}{' '}
                <span className="total">/ {(docCntObj && docCntObj[2975] && docCntObj[2975].TOTAL_CNT) || 0}</span>
              </span>
            </a>
          </div>
        </div>
        <div className="main-widget-col col-1-2 mb-0">
          <div className="widget-hover-inner">
            <a onClick={() => this.onClickList(2941)} className="widget-cover">
              <span className="widget-icon widget-icon10"></span>
              <span className="widget-title-kor">WDS/I-FOUNDRY</span>
              <span className="widget-title-eng">Wireless Distribution System</span>
              <span className="widget-item-number">
                {(docCntObj && docCntObj[2941] && docCntObj[2941].NEW_CNT) || 0}{' '}
                <span className="total">/ {(docCntObj && docCntObj[2941] && docCntObj[2941].TOTAL_CNT) || 0}</span>
              </span>
            </a>
          </div>
        </div>
        <div className="main-widget-col col-1-2 mb-0">
          <div className="widget-hover-inner">
            {/* <a href="#none" className="widget-cover">
              <span className="widget-icon widget-icon9"></span>
              <span className="widget-title-kor">승인서</span>
              <span className="widget-title-eng">Approval document</span>
              <span className="widget-item-number">
                12 <span className="total">/ 120</span>
              </span>
            </a> */}
          </div>
        </div>
        <div className="main-widget-col col-1-2 mb-0">
          <div className="widget-hover-inner">
            {/* <a href="#none" className="widget-cover">
              <span className="widget-icon widget-icon7"></span>
              <span className="widget-title-kor">PDP</span>
              <span className="widget-title-eng">Plasma Display Panel</span>
              <span className="widget-item-number">
                12 <span className="total">/ 120</span>
              </span>
            </a> */}
          </div>
        </div>
        <DocDashModal
          visible={visible}
          viewType={viewType}
          workSeq={workSeq}
          taskSeq={taskSeq}
          closeBtnFunc={this.closeBtnFunc}
          coverView={coverView}
          clickCoverView={this.clickCoverView}
          onCloseCoverView={this.onCloseCoverView}
          listData={modalList}
          listVisible={listVisible}
          onClickRow={this.onClickRow}
          closeListBtnFunc={this.closeListBtnFunc}
          widgetTitle="신규변경 목록"
        />
      </>
    );
  }
}

export default DocDashBoard;

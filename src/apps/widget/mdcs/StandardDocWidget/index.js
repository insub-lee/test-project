import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import StandardDocModal from './StandardDocModal';

class StandardDocList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      viewType: 'LIST',
      workSeq: -1,
      taskSeq: -1,
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

  closeBtnFunc = () => this.setState({ visible: false, viewType: 'LIST', workSeq: -1, taskSeq: -1 });

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

  onClickList = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    let url = '/api/mdcs/v1/common/docViewHistoryListHanlder';
    if (sagaKey === 'mdcsDocFavoriteWidget') url = '/api/mdcs/v1/common/docFavoriteListHanlder';
    submitHandlerBySaga(sagaKey, 'POST', url, { PARAM: {} }, this.initListDataBind);
  };

  initListDataBind = (sagaKey, response) => {
    this.setState({ listVisible: true, modalList: response && response.list ? response.list : [] });
  };

  closeListBtnFunc = () => this.setState({ listVisible: false, modalList: [] });

  render() {
    const { visible, viewType, workSeq, taskSeq, coverView, modalList, listVisible } = this.state;
    const { widgetTitle, widgetClassName, standardDocList } = this.props;
    return (
      <div className={`widget-inner ${widgetClassName}`}>
        <div className="widget-title">
          {widgetTitle}
          <a onClick={this.onClickList} className="btn-more">
            <span className="hidden">{widgetTitle} 게시판으로 이동</span>
          </a>
        </div>
        <ul className="widget-board">
          {standardDocList.map(item => (
            <li key={`mdcs-notice-list-${item.WORK_SEQ}-${item.TASK_SEQ}`}>
              <a onClick={() => this.setState({ visible: true, viewType: 'VIEW', workSeq: item.WORK_SEQ, taskSeq: item.TASK_SEQ })}>
                <span className="board-txt">{item.TITLE}</span>
                <span className="board-etc">{item.VIEW_CNT}</span>
              </a>
            </li>
          ))}
        </ul>
        <StandardDocModal
          visible={visible}
          viewType={viewType}
          workSeq={workSeq}
          taskSeq={taskSeq}
          closeBtnFunc={this.closeBtnFunc}
          widgetTitle={widgetTitle}
          coverView={coverView}
          clickCoverView={this.clickCoverView}
          onCloseCoverView={this.onCloseCoverView}
          listData={modalList}
          listVisible={listVisible}
          onClickRow={this.onClickRow}
          closeListBtnFunc={this.closeListBtnFunc}
        />
      </div>
    );
  }
}

StandardDocList.propTypes = {
  standardDocList: PropTypes.array,
};

StandardDocList.defaultProps = {
  standardDocList: [],
};

export default StandardDocList;

import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import NoticeModal from './NoticeModal';

class NoticeList extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, viewType: 'LIST', taskSeq: -1, noticeList: [] };
  }

  closeBtnFunc = () => this.setState({ visible: false, viewType: 'LIST', taskSeq: -1 });

  render() {
    const { visible, viewType, taskSeq } = this.state;
    const { noticeList } = this.props;
    return (
      <div className="widget-inner widget-notice widget-black">
        <div className="widget-title">
          알림판
          <a onClick={() => this.setState({ visible: true, viewType: 'LIST' })} className="btn-more">
            <span className="hidden">알림판 게시판으로 이동</span>
          </a>
        </div>
        <ul className="widget-board">
          {noticeList.map(item => (
            <li key={`mdcs-notice-list-${item.WORK_SEQ}-${item.TASK_SEQ}`}>
              <a onClick={() => this.setState({ visible: true, viewType: 'VIEW', taskSeq: item.TASK_SEQ })}>
                <span className="board-txt">{item.TITLE}</span>
                <span className="board-etc">{item.REG_DTTM}</span>
              </a>
            </li>
          ))}
        </ul>
        <NoticeModal visible={visible} viewType={viewType} workSeq={7961} taskSeq={taskSeq} closeBtnFunc={this.closeBtnFunc} />
      </div>
    );
  }
}

NoticeList.propTypes = {
  noticeList: PropTypes.array,
};

NoticeList.defaultProps = {
  noticeList: [],
};

export default NoticeList;

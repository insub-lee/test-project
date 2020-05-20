import React, { Component } from 'react';
import NoticeModal from './NoticeModal';

class NoticeList extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, viewType: 'LIST', taskSeq: -1, noticeList: [] };
  }

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'POST', '/api/builder/v1/work/taskList/7961', { PARAM: { PAGE: 1, PAGE_CNT: 5 } }, this.initDataBind);
  }

  initDataBind = (sagaKey, response) => {
    if (response && response.list && response.list.length > 0) {
      const noticeList = response.list.map(item => ({ ...item, REG_DTTM: item.REG_DTTM.split(' ')[0] }));
      this.setState({ noticeList });
    }
  };

  closeBtnFunc = () => this.setState({ visible: false, viewType: 'LIST', taskSeq: -1 });

  render() {
    const { visible, viewType, taskSeq, noticeList } = this.state;
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

export default NoticeList;

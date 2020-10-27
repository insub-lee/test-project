import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import jsonToQueryString from '../../utils/jsonToQueryString';
import Styled from './Styled';
import service from './service';

class NoticeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
    };

    this.removeSelected = this.removeSelected.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  removeSelected() {
    const { checkedList } = this.state;
    console.debug('Remove Selected', checkedList);
    const noticeids = checkedList;
    const { action } = this.props;
    action.removeNotification(noticeids);
  }

  removeAll() {
    const { notices } = this.props;
    const noticeids = notices.map(({ noticeid }) => noticeid);
    console.debug('Remove All', noticeids);
    const { action } = this.props;
    action.removeNotification(noticeids);
  }

  handleCheck(e) {
    const { value } = e.target;
    this.setState(prevState => {
      const { checkedList } = prevState;
      if (checkedList.includes(value)) {
        const index = checkedList.findIndex(id => id === value);
        checkedList.splice(index, 1);
      } else {
        checkedList.push(value);
      }
      return { checkedList };
    });
  }

  handleClick(noticeid, noticontent) {
    const { action, history, toggleNotiButton } = this.props;
    action.readNotification(noticeid);
    const jsonObj = JSON.parse(noticontent);
    const title = jsonObj.message.content;
    const searchQuery = {
      title,
    };
    const queryString = jsonToQueryString(searchQuery);
    this.fetchData(queryString).then(response => {
      if (response !== null) {
        const { mnuIdInfo } = response;
        toggleNotiButton();
        if (mnuIdInfo) {
          history.push(`/${mnuIdInfo}`);
        } else {
          alert('이미 결재처리되었거나 정보가 없습니다.');
        }
      } else {
        console.log('에러');
        alert('Server Error');
      }
    });
  }

  async fetchData(queryString) {
    const { response, error } = await service.noticeLink.get(queryString);
    if (response && !error) {
      return response;
    }
    return null;
  }

  render() {
    const { notices } = this.props;
    const { checkedList } = this.state;
    return (
      <Styled>
        <div className="noti_head">
          <p className="tit">전체 알림</p>
          <div className="btns">
            <button type="button" onClick={this.removeSelected}>
              선택 삭제
            </button>
            <button type="button" onClick={this.removeAll}>
              전체 삭제
            </button>
          </div>
        </div>
        <div className="noti_body">
          <ul>
            {notices.map(noti => (
              <li key={noti.noticeid}>
                <div className="noti_button">
                  <div className="checkbox">
                    <input type="checkbox" id={noti.noticeid} value={noti.noticeid} checked={checkedList.includes(noti.noticeid)} onChange={this.handleCheck} />
                    <label htmlFor={noti.noticeid} contentEditable="false">
                      <span />
                    </label>
                  </div>
                  <span
                    role="button"
                    tabIndex="0"
                    className={noti.status === '1' ? 'readNotice' : 'unreadNotice'}
                    onClick={() => (noti.status === '0' ? this.handleClick(noti.noticeid, noti.content) : false)}
                    onKeyDown={() => false}
                    title={`${noti.title}`}
                    data-tip
                    data-for={noti.noticeid}
                  >
                    {`${noti.title}`}
                  </span>
                  <ReactTooltip id={noti.noticeid} type="dark">{`${noti.title}`}</ReactTooltip>
                  {/* </button> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Styled>
    );
  }
}

NoticeBox.propTypes = {
  notices: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    toggleNotifications: PropTypes.func,
    readNotification: PropTypes.func,
    removeNotification: PropTypes.func,
  }),
  toggleNotiButton: PropTypes.func,
};

NoticeBox.defaultProps = {
  notices: [],
  action: {
    toggleNotifications: () => false,
    readNotification: () => false,
    removeNotification: () => false,
  },
  toggleNotiButton: false,
};

export default NoticeBox;

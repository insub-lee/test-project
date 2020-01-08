import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Icon } from 'antd';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import Title from '../Title';
import Styled from './Styled';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      contentItem: '',
    };
  }

  componentDidMount() {
    const { workSeq, getNotificationListBySaga } = this.props;
    getNotificationListBySaga('notificationList', workSeq);
  }

  onClickPopup = (visible, item) => {
    this.setState({ visible });
    this.setState({ contentItem: item });
  };

  render() {
    const { visible, contentItem } = this.state;
    const { notificationList } = this.props;
    // const limitedData = notificationList.filter(item => item.seq < 6);

    return (
      <Styled>
        <Title title="알림판" workSeq={this.props.workSeq} />
        <div className="widget-body">
          <ul>
            {notificationList.map(item => (
              <li key={item.seq}>
                <button type="button" onClick={() => this.onClickPopup(true, item)}>
                  <span className="widget-body-txt">{item.title}</span>
                  <span className="widget-body-date">{item.regDttm}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={`widget-board-view ${visible ? 'on' : ''}`}>
          <dl>
            <dt>{contentItem.title}</dt>
            <dd>
              <div>{contentItem.content}</div>
            </dd>
          </dl>
          <button type="button" onClick={() => this.onClickPopup(!visible, contentItem)}>
            <Icon type="close-circle" />
          </button>
        </div>
      </Styled>
    );
  }
}

List.propTypes = {
  workSeq: PropTypes.number,
  getNotificationListBySaga: PropTypes.func,
  notificationList: PropTypes.object,
};

List.defaultProps = {
  workSeq: 1064,
  getNotificationListBySaga: () => false,
  notificationList: [],
};

const mapStateToProps = createStructuredSelector({
  notificationList: selectors.makeSelectNotificationList(),
});

const mapDispatchToProps = dispatch => ({
  getNotificationListBySaga: (key, workSeq) => dispatch(actions.getNotificationListBySaga(key, workSeq)),
});

const withReducer = injectReducer({ key: 'apps-mdcs-user-NotificationBoard-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-user-NotificationBoard-saga', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(List);

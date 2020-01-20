import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'antd/dist/antd.css';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import SignLine from './SignLine';

class SignLineModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCloselModal = () => {
    const { closeHandler } = this.props;
    closeHandler();
  };

  handleOkModal = () => {
    const { callbackHandler, selectedUsers, setInitialState } = this.props;
    const rtnData = [];
    selectedUsers.forEach((user, index) => {
      const que = {
        step: index + 1,
        appvUserId: user.USER_ID,
        ...user,
      };
      rtnData.push(que);
    });
    callbackHandler(rtnData);
    setInitialState();
  };

  render() {
    const { visible, users, selectedUsers, getUsers, pagination, setSelectedUsers } = this.props;

    return (
      <Modal
        title="결재선지정"
        visible={visible}
        onOk={this.handleOkModal}
        onCancel={this.handleCloselModal}
        width="750px"
        style={{ top: 20 }}
        footer={[
          <Button key="back" onClick={this.handleCloselModal}>
            닫기
          </Button>,
          <Button key="ok" type="primary" onClick={this.handleOkModal}>
            확인
          </Button>,
        ]}
      >
        <SignLine users={users} pagination={pagination} selectedUsers={selectedUsers} getUsers={getUsers} setSelectedUsers={setSelectedUsers} />
      </Modal>
    );
  }
}

SignLineModal.propTypes = {
  visible: PropTypes.bool,
  closeHandler: PropTypes.func,
  callbackHandler: PropTypes.func,

  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  pagination: PropTypes.object,
  setInitialState: PropTypes.func,
  getUsers: PropTypes.func,
  setSelectedUsers: PropTypes.func,
};

SignLineModal.defaultProps = {
  visible: false,
  users: {},
  closeHandler: () => {},
  callbackHandler: () => {},
  setInitialState: () => {},
  getUsers: () => {},
  setSelectedUsers: () => {},
};

const mapStateToProps = createStructuredSelector({
  users: selectors.makeUsers(),
  selectedUsers: selectors.makeSelectedUsers(),
  pagination: selectors.makePagination(),
});

const mapDispatchToProps = dispatch => ({
  setInitialState: () => dispatch(actions.setInitialState()),
  getUsers: payload => dispatch(actions.getUsers(payload)),
  setSelectedUsers: payload => dispatch(actions.setSelectedUsers(payload)),
});

const withReducer = injectReducer({ key: 'apps.Workflow.SignLienModal', reducer });
const withSaga = injectSaga({ key: 'apps.Workflow.SignLienModal', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(SignLineModal);

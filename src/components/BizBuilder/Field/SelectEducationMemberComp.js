import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import CustomUserSelect from 'components/CustomUserSelect';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import { submitHandlerBySaga } from 'apps/Workflow/components/ApproveBase/actions';
import { callBackAfterPost, callBackAfterDelete } from 'apps/eshs/common/submitCallbackFunc';

const AntdModal = StyledAntdModal(Modal);
class SelectEducationMemberComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedUserList: [],
      userIdList: [],
    };
  }

  getUserList = () => {
    const { sagaKey, getExtraApiData, rowData } = this.props;
    const apiUrl = '/api/eshs/v1/common/safety-edu-user';
    const paramObj = { PARENT_WORK_SEQ: rowData.WORK_SEQ, PARENT_TASK_SEQ: rowData.TASK_SEQ };
    const queryString = new URLSearchParams(paramObj).toString();
    const apiArr = [
      {
        key: 'educationUsers',
        url: `${apiUrl}?${queryString}`,
        type: 'GET',
      },
    ];

    getExtraApiData(sagaKey, apiArr, this.setUserList);
  };

  setUserList = () => {
    const { extraApiData } = this.props;
    this.setState(() => {
      const userList = (extraApiData.educationUsers && extraApiData.educationUsers.list) || [];
      const userIdList = userList.map(user => Number(user.EDU_USER_ID));
      return { userIdList, modalVisible: true };
    });
  };

  handleModalVisible = () => {
    this.setState({ modalVisible: true }, this.getUserList);
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

  handleUserSelect = selectedUserList => {
    this.setState({ selectedUserList });
  };

  handleUserSelectComplete = () => {
    const { selectedUserList } = this.state;
    const { sagaKey, submitExtraHandler, rowData } = this.props;

    const PARAMS = {
      PARENT_WORK_SEQ: rowData.WORK_SEQ,
      PARENT_TASK_SEQ: rowData.TASK_SEQ,
      USER_LIST: selectedUserList,
    };

    submitExtraHandler(sagaKey, 'POST', `/api/eshs/v1/common/safety-edu-user`, PARAMS, (key, response) => callBackAfterPost(key, response));
  };

  render() {
    const { handleModalVisible, handleModalClose, handleUserSelect, handleUserSelectComplete } = this;
    const { modalVisible, userIdList } = this.state;
    const { visible } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <>
        <StyledButton className="btn-primary btn-sm" onClick={this.getUserList} style={{ width: '100%' }}>
          교육대상자 지정
        </StyledButton>
        <AntdModal title="교육대상자 지정" visible={modalVisible} width="950px" onCancel={handleModalClose} footer={null} destroyOnClose>
          <CustomUserSelect
            onCancel={handleModalClose}
            initUserList={userIdList}
            onUserSelectHandler={handleUserSelect}
            onUserSelectedComplete={handleUserSelectComplete}
          />
        </AntdModal>
      </>
    );
  }
}

SelectEducationMemberComp.propTypes = {
  visible: PropTypes.bool,
  rowData: PropTypes.object,
  sagaKey: PropTypes.string,
  submitExtraHandler: PropTypes.func,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

export default SelectEducationMemberComp;

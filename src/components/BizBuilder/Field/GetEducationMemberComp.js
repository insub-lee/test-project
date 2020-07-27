import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Input, Popconfirm } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdInput = StyledInput(Input);
const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
class GetEducationMemberComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dataSource: [],
      KEYWORD: '',
    };
  }

  columns = [
    {
      title: '부서',
      dataIndex: 'DEPT_NAME_KOR',
      align: 'center',
      width: '30%',
    },
    {
      title: '성명',
      dataIndex: 'EDU_USER_NAME',
      align: 'center',
      width: '15%',
    },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      align: 'center',
      width: '15%',
    },
    {
      title: '직책',
      dataIndex: 'PSTN_NAME_KOR',
      align: 'center',
      width: '10%',
    },
    {
      title: '1차',
      dataIndex: 'FIRST_EXAM_RESULT',
      align: 'center',
      width: '15%',
    },
    {
      title: '2차',
      dataIndex: 'SECOND_EXAM_RESULT',
      align: 'center',
      width: '15%',
    },
  ];

  getUserList = () => {
    const { KEYWORD } = this.state;
    const { sagaKey, getExtraApiData, rowData } = this.props;
    const apiUrl = '/api/eshs/v1/common/safety-edu-user';
    const paramObj = { PARENT_WORK_SEQ: rowData.WORK_SEQ, PARENT_TASK_SEQ: rowData.TASK_SEQ, KEYWORD };
    const queryString = new URLSearchParams(paramObj).toString();
    const apiArr = [
      {
        key: 'educationUsers',
        url: `${apiUrl}?${queryString}`,
        // url: `/api/eshs/v1/common/safety-edu-second-user?${queryString}`,
        type: 'GET',
      },
    ];

    const secondApiArr = [
      {
        key: 'educationUsers',
        url: `/api/eshs/v1/common/safety-edu-second-user?${queryString}`,
        type: 'GET',
      },
    ];

    return this.props.selectSecondEducationTarget
      ? getExtraApiData(sagaKey, secondApiArr, this.setUserList)
      : getExtraApiData(sagaKey, apiArr, this.setUserList);
  };

  setUserList = () => {
    const { extraApiData } = this.props;
    this.setState({
      dataSource: (extraApiData.educationUsers && extraApiData.educationUsers.list) || [],
    });
  };

  handleInputChange = event => {
    this.setState({ KEYWORD: event.target.value });
  };

  handleModalVisible = () => {
    this.setState({ modalVisible: true }, this.getUserList);
  };

  handleModalClose = () => {
    this.setState({ KEYWORD: '', modalVisible: false }, this.getUserList);
  };

  sendEmail = () => {
    const { sagaKey, getExtraApiData } = this.props;
    const { dataSource, TEST_TO } = this.state;

    const apiArr = [
      {
        key: 'sendEmail',
        url: '/api/eshs/v1/common/eshsEducationSendEmail',
        type: 'POST',
        params: { PARAM: { userList: dataSource.map(user => user.EDU_USER_ID), TEST_TO } }, // test용
        // params: { PARAM: { userList: dataSource.map(user => user.EDU_USER_ID)} },
      },
    ];

    getExtraApiData(sagaKey, apiArr, () => message.info(<MessageContent>메일을 전송하였습니다.</MessageContent>));
  };

  render() {
    const { columns } = this;
    const { handleModalVisible, handleModalClose, handleInputChange, getUserList } = this;
    const { modalVisible, dataSource, TEST_TO } = this.state;
    const { visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <>
        <StyledButton className={this.props.className || 'btn-primary btn-sm'} onClick={handleModalVisible} style={{ width: this.props.buttonWidth || '100%' }}>
          교육인원 조회
        </StyledButton>
        <AntdModal title="교육인원 조회" visible={modalVisible} width="950px" onCancel={handleModalClose} footer={null} destroyOnClose>
          <StyledContentsWrapper>
            <StyledCustomSearchWrapper>
              <div className="search-input-area">
                <span className="text-label">교육대상자 검색</span>
                <AntdInput
                  className="ant-input-mid mr5"
                  onChange={handleInputChange}
                  onPressEnter={getUserList}
                  allowClear
                  placeholder="검색어를 입력하세요."
                  style={{ width: '20%' }}
                />
                <StyledButton className="btn-gray btn-sm mr5" onClick={getUserList}>
                  검색
                </StyledButton>
              </div>
            </StyledCustomSearchWrapper>
            {dataSource.length && this.props.selectSecondEducationTarget ? (
              <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
                <AntdInput
                  className="ant-input-sm mr5"
                  onChange={e => this.setState({ TEST_TO: e.target.value })}
                  placeholder="테스트 이메일 입력"
                  allowClear
                  style={{ width: 200 }}
                />
                <Popconfirm
                  title="메일 전송하시겠습니까?"
                  onConfirm={() => (TEST_TO ? this.sendEmail() : message.info(<MessageContent>테스트 이메일을 입력하십시오.</MessageContent>))}
                  okText="보내기"
                  cancelText="취소"
                >
                  <StyledButton className="btn-gray btn-sm">메일 전송</StyledButton>
                </Popconfirm>
                {/* <Popconfirm
                  title="메일 전송하시겠습니까?"
                  onConfirm={this.sendEmail}
                  okText="보내기"
                  cancelText="취소"
                >
                  <StyledButton className="btn-gray btn-sm">메일 전송</StyledButton>
                </Popconfirm> */}
              </StyledButtonWrapper>
            ) : null}
            <AntdTable columns={columns} dataSource={dataSource} />
          </StyledContentsWrapper>
        </AntdModal>
      </>
    );
  }
}

GetEducationMemberComp.propTypes = {
  visible: PropTypes.bool,
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  rowData: PropTypes.object,
  extraApiData: PropTypes.object,
  buttonWidth: PropTypes.string,
  className: PropTypes.string,
  selectSecondEducationTarget: PropTypes.bool,
};

GetEducationMemberComp.defaultProps = {
  selectSecondEducationTarget: false,
};

export default GetEducationMemberComp;

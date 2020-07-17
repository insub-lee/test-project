import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Input } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

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
        type: 'GET',
      },
    ];

    getExtraApiData(sagaKey, apiArr, this.setUserList);
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

  render() {
    const { columns } = this;
    const { handleModalVisible, handleModalClose, handleInputChange, getUserList } = this;
    const { modalVisible, dataSource } = this.state;
    const { visible } = this.props;
    if (!visible) {
      return null;
    }

    return (
      <>
        <StyledButton className="btn-primary btn-sm" onClick={handleModalVisible} style={{ width: '100%' }}>
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
                  placeholder="검색어를 입력하세요."
                  style={{ width: '20%' }}
                />
                <StyledButton className="btn-gray btn-sm" onClick={getUserList}>
                  검색
                </StyledButton>
              </div>
            </StyledCustomSearchWrapper>
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
};

export default GetEducationMemberComp;

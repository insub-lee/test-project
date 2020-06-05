import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Modal } from 'antd';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import ModalContent from 'apps/eshs/common/userSearchModal/ModalContent';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);

// Component Attribute 및 Event Method 정리
// <UserSearchModal
//    colData={empNO}                                       --  InputSearch 초기값
//    onClickRow={record => ()}                             --  [필수] userList rowClick시 record를 리턴받는 함수
//    className="input-search-sm ant-search-inline mr5"     -- AntdSearchInput className
//    columns={[]}                                          -- AntdTable columns (default값 defaultProps 확인)
//    modalOnCancel={() => ()}                              -- modal onCancel event (props 없을 경우 AntdSearchInput 값 비워주고 props 로 들어온 onClickRow({EMP_NO:'', USER_ID:''}) 호출 )
// />

class UserSearchModal extends Component {
  state = {
    modalVisible: false,
    modalContent: [],
    colData: '',
  };

  componentDidMount() {
    const { colData } = this.props;
    this.setState({ colData });
  }

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    const { columns } = this.props;
    if (modalVisible) {
      return this.setState({
        modalVisible: !modalVisible,
        modalContent: [],
      });
    }
    return this.setState({
      modalVisible: !modalVisible,
      modalContent: [<ModalContent onClickRow={this.onClickRow} columns={columns} />],
    });
  };

  onClickRow = record => {
    const { onClickRow } = this.props;

    this.setState(
      {
        colData: record.EMP_NO,
      },
      () => onClickRow(record),
    );
    this.handleModalVisible();
  };

  render() {
    const { className, modalOnCancel } = this.props;
    const { modalVisible, modalContent, colData } = this.state;

    return (
      <>
        <AntdSearchInput
          style={{ width: 110 }}
          value={colData}
          className={className || 'input-search-sm ant-search-inline mr5'}
          allowClear
          readOnly
          placeholder="사번"
          onClick={this.handleModalVisible}
          onChange={this.handleModalVisible}
        />
        <AntdModal
          width={900}
          visible={modalVisible}
          title="사원 검색"
          onCancel={() => {
            typeof modalOnCancel === 'function' ? modalOnCancel() : this.onClickRow({ EMP_NO: '', USER_ID: '' });
          }}
          destroyOnClose
          footer={[
            <StyledButton
              className="btn-light"
              onClick={() => {
                typeof modalOnCancel === 'function' ? modalOnCancel() : this.onClickRow({ EMP_NO: '', USER_ID: '' });
              }}
            >
              닫기
            </StyledButton>,
          ]}
        >
          {modalContent}
        </AntdModal>
      </>
    );
  }
}

UserSearchModal.propTypes = {
  onClickRow: PropTypes.func,
  modalOnCancel: PropTypes.func,
  columns: PropTypes.array,
  colData: PropTypes.string,
  className: PropTypes.string,
};

UserSearchModal.defaultProps = {
  onClickRow: () => {},
  columns: [
    {
      title: '사번',
      align: 'center',
      dataIndex: 'EMP_NO',
      width: '20%',
    },
    {
      title: '이름',
      align: 'center',
      dataIndex: 'NAME_KOR',
      width: '20%',
    },
    {
      title: '직위',
      align: 'center',
      dataIndex: 'PSTN_NAME_KOR',
      width: '20%',
    },
    {
      title: '부서명',
      align: 'left',
      dataIndex: 'DEPT_NAME_KOR',
      width: '40%',
    },
  ],
  colData: '',
  className: '',
  modalOnCancel: undefined,
};

export default UserSearchModal;

import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal } from 'antd';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import MsdsSearchList from 'apps/eshs/user/health/workEnv/msdsSearchList'; // 컬럼 사이즈 조절하기 위해
const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);

class MsdsHeaderComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {}

  handleSearch = () => {
    const { sagaKey: id, changeViewPage, formData } = this.props;
    const task_seq = (formData && formData.selectedRowTaskSeq) || 0;
    if (task_seq) {
      changeViewPage(id, 3161, task_seq, 'MODIFY');
    }
  };

  onChangeSave = type => {
    const { customSaveTask, customModifyTask, deleteTask, sagaKey: id, changeViewPage, viewPageData } = this.props;
    if (type === 'S') {
      customSaveTask(id, id);
    } else if (type === 'M') {
      customModifyTask(id);
    } else if (type === 'D') {
      deleteTask(id, id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage, this.deleteCallBack);
    }
  };

  deleteCallBack = () => {
    const { sagaKey: id, changeViewPage, viewPageData } = this.props;
    changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
  };

  // saveTaskAfter = (id, workSeq, taskSeq, formData) => {
  //   const { changeViewPage } = this.props;
  //   console.debug('id ', id);
  //   console.debug('workSeq ', workSeq);
  //   console.debug('taskSeq ', taskSeq);
  //   console.debug('formData ', formData);
  //   changeViewPage(id, workSeq, taskSeq, 'MODIFY');
  // };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    if (modalVisible) {
      return this.setState({
        modalVisible: !modalVisible,
        modalContent: [],
      });
    }
    return this.setState({
      modalVisible: !modalVisible,
      modalContent: [
        <BizBuilderBase
          sagaKey="MsdsSearchList"
          workSeq={3161}
          ListCustomButtons={() => null}
          viewType="LIST"
          listMetaSeq={4141}
          customOnRowClick={record => this.rowClick(record)}
          CustomListPage={MsdsSearchList}
        />,
      ],
    });
  };

  rowClick = record => {
    const { sagaKey: id, setFormData, formData } = this.props;
    setFormData(id, { ...formData, selectedRowItemCode: record.ITEM_CD, selectedRowTaskSeq: record.TASK_SEQ });
    this.handleModalVisible();
  };

  render() {
    const { viewPageData, sagaKey: id, changeViewPage, formData } = this.props;
    const { modalVisible, modalContent } = this.state;
    const selectedRowItemCode = (formData && formData.selectedRowItemCode) || (formData && formData.ITEM_CD) || '';

    return (
      <div>
        <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
          <span>MSDS 코드</span>&nbsp;
          <AntdSearch
            className="ant-search-inline input-search-mid mr5"
            value={selectedRowItemCode}
            style={{ width: 150 }}
            onClick={this.handleModalVisible}
            onSearch={this.handleModalVisible}
          />
          <StyledButton className="btn-gray btn-sm btn-first" onClick={this.handleSearch}>
            검색
          </StyledButton>
          {viewPageData.viewType === 'INPUT' && (
            <>
              <StyledButton className="btn-primary btn-sm" onClick={() => this.onChangeSave('S')}>
                등록
              </StyledButton>
            </>
          )}
          {viewPageData.viewType === 'MODIFY' && (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.onChangeSave('M')}>
                저장
              </StyledButton>
              <StyledButton className="btn-light btn-sm btn-first" onClick={() => this.onChangeSave('D')}>
                삭제
              </StyledButton>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
                신규등록
              </StyledButton>
              <StyledButton className="btn-light btn-sm" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
                Reset
              </StyledButton>
            </>
          )}
        </StyledButtonWrapper>
        <AntdModal width={850} visible={modalVisible} title="MSDS 검색" onCancel={this.handleModalVisible} destroyOnClose footer={null}>
          {modalContent}
        </AntdModal>
      </div>
    );
  }
}

MsdsHeaderComp.propTypes = {
  sagaKey: PropTypes.string,
  viewPageData: PropTypes.func,
  changeViewPage: PropTypes.func,
  deleteTask: PropTypes.func,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  customSaveTask: PropTypes.any,
  customModifyTask: PropTypes.any,
};

MsdsHeaderComp.defaultProps = {
  customSaveTask: () => {},
  customModifyTask: () => {},
};

export default MsdsHeaderComp;

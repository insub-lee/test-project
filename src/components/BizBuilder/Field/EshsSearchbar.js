import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from 'apps/eshs/admin/environment/air/stack/List'; // list custom button 추가 시 변경

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledModal(Modal);

class CommonSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentDidUpdate() {
    const { changeFormData, sagaKey: id, COMP_FIELD, viewPageData } = this.props;
    if (viewPageData.viewType === 'INPUT') {
      changeFormData(id, COMP_FIELD, '');
    }
  }

  handleModalVisible = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  onChangeSave = type => {
    const { saveTask, modifyTask, deleteTask, sagaKey: id, changeViewPage, viewPageData, saveBeforeProcess } = this.props;
    if (type === 'S') {
      // 기존로직 : 업로드한 파일에 대한 real 이관이 이루어 지지 않아 수정하였음.
      // saveTask(id, id, this.saveTaskAfter);
      saveBeforeProcess(id, id, saveTask);
    } else if (type === 'M') {
      // 기존로직 : 업로드한 파일에 대한 real 이관이 이루어 지지 않아 수정하였음.
      // modifyTask(id, this.saveTaskAfter);
      saveBeforeProcess(id, id, modifyTask);
    } else if (type === 'D') {
      deleteTask(id, id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage, this.deleteCallBack);
    }
  };

  deleteCallBack = () => {
    const { sagaKey: id, changeViewPage, viewPageData } = this.props;
    changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { changeViewPage } = this.props;
    changeViewPage(id, workSeq, taskSeq, 'MODIFY');
  };

  isModalChange = record => {
    const { viewPageData, setViewPageData, sagaKey: id, changeViewPage } = this.props;
    this.handleModalVisible();
    if (viewPageData && viewPageData.viewType === 'VIEW' && record) {
      setViewPageData(id, record.WORK_SEQ, record.TASK_SEQ, 'VIEW');
      changeViewPage(id, record.WORK_SEQ, record.TASK_SEQ, 'VIEW');
    } else if (record) {
      setViewPageData(id, record.WORK_SEQ, record.TASK_SEQ, 'MODIFY');
      changeViewPage(id, record.WORK_SEQ, record.TASK_SEQ, 'MODIFY');
    }
  };

  customApi = () => {
    const { sagaKey: id, getExtraApiData, formData } = this.props;
    const apiArray = [
      {
        key: `complite`,
        url: `/api/eshs/v1/common/dangerHazard`,
        type: 'POST',
        params: { PARAM: { ...formData } },
      },
    ];
    getExtraApiData(id, apiArray);
  };

  BizbuilderbaseRender = () => {
    const {
      sagaKey: id,
      CONFIG: { property },
    } = this.props;
    return (
      <BizBuilderBase
        sagaKey={`searchbar_${id}`}
        baseSagaKey={id}
        CustomListPage={CustomList}
        workSeq={property.searchbarWorkSeq}
        taskSeq={-1}
        listMetaSeq={property.listMetaSeq || undefined}
        viewType="LIST"
        loadingComplete={this.props.loadingComplete}
        customOnRowClick={this.isModalChange}
      />
    );
  };

  ButtonRender() {
    const {
      viewPageData,
      sagaKey: id,
      changeViewPage,
      CONFIG: { property },
    } = this.props;
    let buttonGruop;
    const useRevision = property.useRevision || 'Y';
    switch (viewPageData && viewPageData.viewType.toUpperCase()) {
      case 'INPUT':
        buttonGruop = (
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first btn-xs" onClick={() => this.onChangeSave('S')}>
              등록
            </StyledButton>
            <StyledButton className="btn-light btn-xs" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
              초기화
            </StyledButton>
          </StyledButtonWrapper>
        );
        break;
      case 'MODIFY':
        buttonGruop = (
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first btn-xs" onClick={() => this.onChangeSave('M')}>
              저장
            </StyledButton>
            <StyledButton className="btn-light btn-first btn-xs" onClick={() => this.onChangeSave('D')}>
              삭제
            </StyledButton>
            {useRevision === 'Y' ? (
              <StyledButton className="btn-primary btn-first btn-xs" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
                신규등록
              </StyledButton>
            ) : (
              ''
            )}
            <StyledButton className="btn-light btn-xs mr5" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
              초기화
            </StyledButton>
            {property.searchbarWorkSeq === 12061 ? (
              <StyledButton className="btn-light btn-xs" onClick={this.customApi}>
                완료
              </StyledButton>
            ) : (
              ''
            )}
          </StyledButtonWrapper>
        );
        break;
      default:
        buttonGruop = '';
        break;
    }
    return buttonGruop;
  }

  render() {
    const { CONFIG, visible, colData, NAME_KOR, readOnly, COMP_FIELD } = this.props;
    return visible ? (
      <div>
        <AntdSearch
          value={colData}
          className={`input-search-mid ant-search-inline mr5 ${CONFIG.property.className || ''}`}
          readOnly
          style={{ width: 150 }}
          onClick={this.handleModalVisible}
          onSearch={this.handleModalVisible}
        />
        {this.ButtonRender()}
        {readOnly || CONFIG.property.readOnly ? (
          ''
        ) : (
          <AntdModal
            className="modal-table-pad"
            title={NAME_KOR || COMP_FIELD}
            visible={this.state.modal}
            width="80%"
            onCancel={this.handleModalVisible}
            footer={null}
          >
            <div>{this.state.modal && this.BizbuilderbaseRender()}</div>
          </AntdModal>
        )}
      </div>
    ) : (
      ''
    );
  }
}

CommonSearchbar.propTypes = {
  CONFIG: PropTypes.object,
  COMP_FIELD: PropTypes.string,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  NAME_KOR: PropTypes.string,
  readOnly: PropTypes.bool,
  visible: PropTypes.bool,
  viewPageData: PropTypes.func,
  changeViewPage: PropTypes.func,
  setViewPageData: PropTypes.func,
  saveTask: PropTypes.func,
  modifyTask: PropTypes.func,
  deleteTask: PropTypes.func,
  changeFormData: PropTypes.func,
  loadingComplete: PropTypes.bool,
  saveBeforeProcess: PropTypes.func,
};

export default CommonSearchbar;

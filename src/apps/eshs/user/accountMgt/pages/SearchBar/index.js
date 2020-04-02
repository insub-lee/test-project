import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Popconfirm, Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

import CustomList from '../CustomList';

const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledContentsModal(Modal);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchList: [],
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.handleSearchListRender();
  }

  handleSearchListRender = () => {
    const {
      sagaKey: id,
      ExtraBuilder,
      loadingComplete,
      viewPageData: { workSeq },
    } = this.props;

    return this.setState({
      SearchList: [
        <BizBuilderBase
          key={`${id}_search`}
          sagaKey={`${id}_search`}
          workSeq={workSeq}
          taskSeq={-1}
          viewType="LIST"
          CustomListPage={CustomList}
          loadingComplete={loadingComplete}
          customOnRowClick={record => this.handleListRowClick(record)}
        />,
      ],
    });
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleListRowClick = record => {
    const {
      sagaKey: id,
      viewPageData: { viewType, workSeq },
      changeViewPage,
    } = this.props;

    changeViewPage(id, workSeq, record.TASK_SEQ, 'MODIFY');
  };

  handleSearchBarAction = type => {
    // () => deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, !isBuilderModal ? changeViewPage : this.builderModalClose)
    const {
      saveTask,
      modifySaveTask,
      changeViewPage,
      viewPageData,
      viewPageData: { workSeq, taskSeq },
      modalSelectedRow,
      sagaKey: id,
      deleteTask,
      setModalRowSelected,
    } = this.props;

    switch (type) {
      case 'INPUT':
        saveTask();
        break;
      case 'REVISION':
        changeViewPage(id, workSeq, taskSeq, 'REVISION');
        break;
      case 'MODIFY':
        modifySaveTask();
        break;
      case 'DELETE':
        deleteTask(id, id, workSeq, taskSeq, changeViewPage, () => changeViewPage(id, workSeq, -1, 'INPUT'));
        break;
      default:
        break;
    }
  };

  render() {
    const {
      formData: { WRK_CMPNY_CD },
      viewPageData: { viewType },
    } = this.props;
    const { SearchList, modalVisible } = this.state;
    return (
      <div className="selSaveWrapper">
        <AntdSearch
          placeholder="거래처 검색"
          style={{ width: '15%' }}
          value={WRK_CMPNY_CD}
          readOnly
          onClick={this.handleModalVisible}
          onSearch={this.handleModalVisible}
          className="ant-search-inline input-search-mid mr5"
        />
        <StyledButtonWrapper className="btn-wrap-inline">
          {viewType !== 'MODIFY' ? (
            <StyledButton className="btn-primary btn-first" onClick={() => this.handleSearchBarAction('INPUT')}>
              추가
            </StyledButton>
          ) : (
            <>
              <StyledButton className="btn-primary btn-first" onClick={() => this.handleSearchBarAction('REVISION')}>
                신규등록
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={() => this.handleSearchBarAction('MODIFY')}>
                저장
              </StyledButton>
              <Popconfirm title="Are you sure delete this task?" onConfirm={() => this.handleSearchBarAction('DELETE')} okText="Yes" cancelText="No">
                <StyledButton className="btn-primary">삭제</StyledButton>
              </Popconfirm>
            </>
          )}
        </StyledButtonWrapper>

        <AntdModal title="거래처 검색" visible={modalVisible} onCancel={this.handleModalVisible} width={900} height={600} footer={[null]}>
          {SearchList}
        </AntdModal>
      </div>
    );
  }
}

SearchBar.propTypes = {
  sagaKey: PropTypes.string,
  ExtraBuilder: PropTypes.func,
  viewPageData: PropTypes.object,
  loadingComplete: PropTypes.any,
  changeViewPage: PropTypes.func,
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.any,
  deleteTask: PropTypes.func,
  saveTask: PropTypes.func,
  modifySaveTask: PropTypes.func,
};

SearchBar.defaultProps = {
  sagaKey: '',
  ExtraBuilder: () => {},
  viewPageData: {},
  changeViewPage: () => {},
  formData: { WRK_CMPNY_CD: '' },
  changeFormData: () => {},
  setFormData: undefined,
  deleteTask: () => {},
  saveTask: () => {},
  modifySaveTask: () => {},
};

export default SearchBar;

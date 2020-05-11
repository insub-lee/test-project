import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';

import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import { debounce } from 'lodash';

const AntdModal = StyledContentsModal(Modal);
const AntdTable = StyledLineTable(Table);

class InputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CATEGORY_ID: '',
      KEYWORD: '',
    }; // state 만들어서 SearchComp에 props로 넣어주기
    this.getSearchList = debounce(this.getSearchList, 300);
  }

  componentDidMount() {
    this.getSearchList();
    this.getMaterialList();
  }

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler, apiUrl } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: apiUrl,
      },
    ];
    getCallDataHandler(id, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { result, sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'dataSource', (result.materialList && result.materialList.list) || []);
  };

  handleModalClose = () => {
    const { modalClose } = this.props;
    modalClose();
    this.getMaterialList();
    this.setState({
      CATEGORY_ID: '',
      KEYWORD: '',
    });
  };

  handleRowClick = record => {
    const { setRequestValue } = this.props;
    setRequestValue(record);
    this.getMaterialList();
  };

  handleSearchChange = (e, type) => {
    if (type.toUpperCase() === 'INPUT') {
      this.setState(
        {
          KEYWORD: e.target.value,
        },
        this.getSearchList,
      );
    }
    if (type.toUpperCase() === 'SELECT') {
      this.setState(
        {
          CATEGORY_ID: e,
        },
        this.getSearchList,
      );
    }
  };

  getSearchList = () => {
    const { CATEGORY_ID, KEYWORD } = this.state;
    const { sagaKey: id, getCallDataHandler, apiUrl } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: `${apiUrl}?CATEGORY_ID=${CATEGORY_ID}&KEYWORD=${KEYWORD}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.setSearchList);
  };

  setSearchList = () => {
    const { sagaKey: id, result, changeFormData } = this.props;
    changeFormData(id, 'dataSource', (result.materialList && result.materialList.list) || []);
  };

  render() {
    const { handleModalClose, handleRowClick, handleSearchChange } = this;
    const { KEYWORD, CATEGORY_ID } = this.state;
    const { sagaKey, visible, tableColumns, getCallDataHandler, apiUrl, SearchComp, formData, changeFormData, result } = this.props;
    return (
      <AntdModal visible={visible} closable onCancel={handleModalClose} title="화학물질 검색" width="70%" footer={null}>
        <SearchComp
          apiUrl={apiUrl}
          sagaKey={sagaKey}
          getCallDataHandler={getCallDataHandler}
          changeFormData={changeFormData}
          formData={formData}
          result={result}
          onCancel={handleModalClose}
          KEYWORD={KEYWORD}
          CATEGORY_ID={CATEGORY_ID}
          handleSearchChange={handleSearchChange}
        />
        <AntdTable
          columns={tableColumns}
          // dataSource={formData.dataSource}
          dataSource={(result.materialList && result.materialList.list) || []}
          pagination={{ pageSize: 10 }}
          onRow={record => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </AntdModal>
    );
  }
}

InputModal.propTypes = {
  sagaKey: PropTypes.string,
  visible: PropTypes.bool,
  modalClose: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  setRequestValue: PropTypes.func,
  apiUrl: PropTypes.string,
  tableColumns: PropTypes.arrayOf(PropTypes.object),
  SearchComp: PropTypes.any, // React component
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  // isSearch: PropTypes.bool,
};

InputModal.defaultProps = {
  sagaKey: '',
  visible: false,
  modalClose: () => {},
  getCallDataHandler: () => {},
  result: {},
  setRequestValue: () => {},
  apiUrl: '',
  tableColumns: [],
  formData: {},
  changeFormData: () => {},
  // isSearch: false,
};

export default InputModal;

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';

// import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';

// import SearchComp from './SearchComp';

const AntdModal = StyledContentsModal(Modal);
const AntdTable = StyledLineTable(Table);

class InputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; // state 만들어서 SearchComp에 props로 넣어주기
  }

  componentDidMount() {
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
  };

  handleRowClick = record => {
    const { setRequestValue } = this.props;
    setRequestValue(record);
    this.getMaterialList();
  };

  render() {
    const { handleModalClose, handleRowClick } = this;
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
        />
        <AntdTable
          columns={tableColumns}
          dataSource={formData.dataSource}
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
};

export default InputModal;

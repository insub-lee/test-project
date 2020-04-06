import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Table } from 'antd';
import { debounce } from 'lodash';

// import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';

// import SearchComp from './SearchComp';

const AntdModal = StyledContentsModal(Modal);
const AntdTable = StyledLineTable(Table);

class InputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      keyword: '',
    };
    this.getSearchData = debounce(this.getSearchData, 300);
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
    this.setState({
      dataSource: (result.materialList && result.materialList.list) || [],
    });
    changeFormData(id, 'dataSource', (result.materialList && result.materialList.list) || []);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.result.materialList && nextProps.result.materialList.list) {
      if (nextProps.result.materialList.list !== prevState.dataSource) {
        return { dataSource: nextProps.result.materialList.list };
      }
    }
    return null;
  }

  handleSearchChange = e => {
    this.setState(
      {
        keyword: e.target.value,
      },
      this.getSearchData,
    );
  };

  getSearchData = () => {
    const { sagaKey: id, getCallDataHandler, apiUrl } = this.props;
    const { keyword } = this.state;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: `${apiUrl}?keyword=${keyword}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.setDataSource);
  };

  handleModalClose = () => {
    const { modalClose } = this.props;
    modalClose();
    this.setState(
      {
        keyword: '',
      },
      this.getMaterialList(),
    );
  };

  handleRowClick = record => {
    const { setRequestValue } = this.props;
    setRequestValue(record);
    this.setState(
      {
        keyword: '',
      },
      this.getMaterialList(),
    );
  };

  render() {
    const { handleSearchChange, handleModalClose, handleRowClick } = this;
    const { dataSource, keyword } = this.state;
    const { sagaKey, visible, tableColumns, getCallDataHandler, apiUrl, SearchComp, formData } = this.props;
    return (
      <AntdModal visible={visible} closable onCancel={handleModalClose} title="화학물질 검색" width="70%" footer={null}>
        {/* <StyledSearchWrap>
          <span className="input-label">화학물질 검색</span>
          <Input.Search className="search-item input-width160" placeHolder="검색" onChange={handleSearchChange} value={keyword} />
        </StyledSearchWrap> */}
        <SearchComp sagaKey={sagaKey} getCallDataHandler={getCallDataHandler} apiUrl={apiUrl} />
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
};

export default InputModal;

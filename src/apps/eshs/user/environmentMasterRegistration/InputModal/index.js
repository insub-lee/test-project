import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Table } from 'antd';
import { debounce } from 'lodash';

// import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

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
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialMaster',
      },
    ];
    getCallDataHandler(id, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { result } = this.props;
    this.setState({
      dataSource: (result.materialList && result.materialList.list) || [],
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.result.materialList && nextProps.result.materialList.list) {
      if (nextProps.result.materialList.list !== prevState.dataSource) {
        return { dataSource: nextProps.result.materialList.list };
      }
    }
    return null;
  }

  columns = [
    {
      title: 'SAP_NO',
      dataIndex: 'SAP_NO',
      key: 'SAP_NO',
      align: 'center',
    },
    {
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
    },
    {
      title: '화학물질명_국문',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
    },
    {
      title: '화학물질명_영문',
      dataIndex: 'NAME_ENG',
      key: 'NAME_ENG',
      align: 'center',
    },
    {
      title: '화학물질명_SAP',
      dataIndex: 'NAME_SAP',
      key: 'NAME_SAP',
      align: 'center',
    },
    {
      title: '관용명 및 이명',
      dataIndex: 'NAME_ETC',
      key: 'NAME_ETC',
      align: 'center',
    },
  ];

  handleSearchChange = e => {
    this.setState(
      {
        keyword: e.target.value,
      },
      this.getSearchData,
    );
  };

  getSearchData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { keyword } = this.state;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialMaster?keyword=${keyword}`,
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
    const { columns, handleSearchChange, handleModalClose, handleRowClick } = this;
    const { dataSource, keyword } = this.state;
    const { visible } = this.props;
    return (
      <Modal visible={visible} closable onCancel={handleModalClose} title="화학물질 검색" width="70%" footer={null}>
        <StyledSearchWrap>
          <span className="input-label">화학물질 검색</span>
          <Input.Search className="search-item input-width160" placeHolder="검색" onChange={handleSearchChange} value={keyword} />
        </StyledSearchWrap>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          onRow={record => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </Modal>
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
};

InputModal.defaultProps = {
  sagaKey: '',
  visible: false,
  modalClose: () => {},
  getCallDataHandler: () => {},
  result: {},
  setRequestValue: () => {},
};

export default InputModal;

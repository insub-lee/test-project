import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal, Table } from 'antd';

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModalPad(Modal);
const AntdSearch = StyledSearchInput(Input.Search);

class ModalTableComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nColumns: [],
      customColData: '',
    };
  }

  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: { property },
    } = this.props;
    const temp =
      property &&
      property.columns &&
      property.columns
        .filter(item => item.columnHiddenYN !== true)
        .map(nItem => ({ title: nItem.title, dataIndex: nItem.dataIndex, width: nItem.width, ...this.getColumnSearchProps(nItem.dataIndex) }));

    this.setState({ nColumns: temp }, () => getExtraApiData(id, [{ key: 'apiList', url: '/api/builder/v1/work/apimaster', type: 'GET' }], this.apiData));
  }

  apiData = () => {
    const { getExtraApiData, sagaKey: id, CONFIG, extraApiData } = this.props;

    const apiList = (extraApiData && extraApiData.apiList && extraApiData.apiList.list) || [];
    const apiInfo = (CONFIG && CONFIG.property && CONFIG.property.apiData && CONFIG.property.apiData && CONFIG.property.apiData.apiInfo) || [];

    const apiArray = [];
    apiList.forEach(item => {
      if (apiInfo.findIndex(info => info.API_SEQ === item.API_SEQ) > -1) {
        return apiArray.push({ key: `item_${item.API_SEQ}`, url: `${item.API_SRC}`, type: `${item.METHOD_TYPE}`.toUpperCase() });
      }
      return null;
    });

    getExtraApiData(id, apiArray);
  };

  handleModalVisible = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  modalTableRender = () => {
    const {
      extraApiData,
      CONFIG: { property },
    } = this.props;
    return (
      <>
        {extraApiData &&
        extraApiData[`item_${property && property.apiData.apiSeq[0]}`] &&
        extraApiData[`item_${property && property.apiData.apiSeq[0]}`].list ? (
          <AntdTable
            rowKey={extraApiData[`item_${property && property.apiData.apiSeq[0]}`].list.index || 0}
            columns={this.state.nColumns}
            dataSource={extraApiData[`item_${property && property.apiData.apiSeq[0]}`].list || []}
            onRow={record => ({
              onClick: () => {
                this.modalSelected(record);
              },
            })}
            scroll={{ x: property && property.scrollSet && property.scrollSet.xline, y: property && property.scrollSet && property.scrollSet.yline }}
          />
        ) : (
          ''
        )}
      </>
    );
  };

  modalSelected = record => {
    const {
      changeFormData,
      sagaKey: id,
      COMP_FIELD,
      CONFIG: { property },
      changeValidationData,
      isSearch,
      customListColdataFlag,
    } = this.props;

    if (property && property.columns) {
      property.columns.forEach(item => {
        if (item.changeFormDataYN === true) {
          changeFormData(id, item.targetIndex || item.dataIndex, record[item.dataIndex]);
          if ((item.targetIndex || item.dataIndex) === COMP_FIELD.trim() && property && property.isRequired) {
            changeValidationData(
              id,
              COMP_FIELD,
              record[item.dataIndex].trim().length > 0,
              record[item.dataIndex].trim().length > 0 ? '' : `${COMP_FIELD}항목은 필수 입력입니다.`,
            );
          }
          if ((item.targetIndex || item.dataIndex) === COMP_FIELD.trim() && isSearch) {
            this.handleOnChangeSearch(record[item.dataIndex]);
          }
        }
        if ((item.targetIndex || item.dataIndex) === COMP_FIELD.trim() && customListColdataFlag) {
          this.setState({ customColData: record[item.dataIndex] });
        }
      });
    }
    this.handleModalVisible();
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
    const searchText = value.length > 0 ? `AND W.${COMP_FIELD} = '${value}'` : '';
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  render() {
    const { CONFIG, visible, colData, readOnly, customListColdataFlag, NAME_KOR, COMP_FIELD } = this.props;
    const { customColData } = this.state;
    return visible ? (
      <>
        {readOnly || CONFIG.property.readOnly ? (
          <span>{colData}</span>
        ) : (
          <>
            <AntdSearch
              value={customListColdataFlag ? customColData : colData}
              readOnly
              className={CONFIG.property.className || ''}
              onClick={this.handleModalVisible}
              onSearch={this.handleModalVisible}
              style={{ width: '100%' }}
            />
            <AntdModal title={NAME_KOR || COMP_FIELD} visible={this.state.modal} width={800} onCancel={this.handleModalVisible} footer={null}>
              {this.state.modal && this.modalTableRender()}
            </AntdModal>
          </>
        )}
      </>
    ) : (
      ''
    );
  }
}

ModalTableComp.propTypes = {
  CONFIG: PropTypes.any,
  COMP_FIELD: PropTypes.string,
  NAME_KOR: PropTypes.string,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  visible: PropTypes.bool,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  changeValidationData: PropTypes.func,
  changeSearchData: PropTypes.func,
  columns: PropTypes.array,
  extraApiData: PropTypes.any,
  readOnly: PropTypes.bool,
  isSearch: PropTypes.bool,
  customListColdataFlag: PropTypes.bool,
};
ModalTableComp.defaultProps = {
  columns: [
    {
      title: '품목코드',
      dataIndex: 'ITEM_CD',
      align: 'center',
      width: 100,
    },
    {
      title: '품목명',
      dataIndex: 'ITEM_NM',
      align: 'left',
      width: 250,
    },
  ],
  changeValidationData: () => {},
  changeFormData: () => {},
  customListColdataFlag: false, // true => table rowSelected COMP_FIELD값이 INPUT값 설정
  colData: '',
};
export default ModalTableComp;

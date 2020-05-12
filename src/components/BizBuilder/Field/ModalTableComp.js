import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal, Table } from 'antd';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const AntdTable = StyledAntdTable(Table);
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
      CONFIG: { property },
    } = this.props;
    this.apiData();
    const temp =
      property &&
      property.columns &&
      property.columns
        .filter(item => item.columnHiddenYN !== true)
        .map(nItem => ({ title: nItem.title, dataIndex: nItem.dataIndex, width: nItem.width, ...this.getColumnSearchProps(nItem.dataIndex) }));

    this.setState({ nColumns: temp });
  }

  apiData = () => {
    const { getExtraApiData, sagaKey: id, CONFIG } = this.props;
    const apiArray =
      CONFIG &&
      CONFIG.property &&
      CONFIG.property.apiData &&
      CONFIG.property.apiData &&
      CONFIG.property.apiData.apiInfo.map(item => ({
        key: `item_${item.API_SEQ}`,
        url: `${item.API_SRC}`,
        type: `${item.METHOD_TYPE}`.toUpperCase(),
      }));
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
    const { CONFIG, visible, colData, readOnly, customListColdataFlag } = this.props;
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
            {/* <Input
              value={customListColdataFlag ? customColData : colData}
              readOnly
              className={CONFIG.property.className || ''}
              style={{ width: 150 }}
              onClick={this.handleModalVisible}
            />
            <Button shape="circle" icon="search" onClick={this.handleModalVisible} /> */}
            <Modal visible={this.state.modal} width={800} onCancel={this.handleModalVisible} footer={[]}>
              {this.state.modal && this.modalTableRender()}
            </Modal>
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

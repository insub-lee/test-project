import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTreeFromFlatData } from 'react-sortable-tree';
import { Table, Input, TreeSelect, Select, Modal, Popconfirm } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import moment from 'moment';

moment.locale('ko');
const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

const getCategoryMapListAsTree = (flatData, rootkey, selectable) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: selectable ? item.LVL > selectable : true,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      searchType: 'NAME',
    };
  }

  componentDidMount() {
    const { sagaKey: id, getExtraApiData, changeSearchData, getListData, changeFormData } = this.props;
    const apiAry = [
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1831 } },
      },
    ];
    changeSearchData(id, 'DE_YEAR', `AND W.DE_YEAR = '${moment().format('YYYY')}'`);
    changeFormData(id, 'DE_YEAR', moment().format('YYYY'));
    changeFormData(id, 'SELECED_TREE', 1596);
    getExtraApiData(id, apiAry);
    getListData(id, 9201);
    const endYear = Number(moment().format('YYYY')) + 1;
    const YearOptions = [];
    for (let year = 2006; year <= endYear; year += 1) {
      YearOptions.push(year);
    }
    this.setState({ YearOptions });
  }

  onChange = (name, value) => {
    const { sagaKey: id, changeSearchData, changeFormData } = this.props;
    changeSearchData(id, name, `AND W.${name} = '${value}'`);
    changeFormData(id, name, value);
  };

  onRowModal = record => {
    this.onCancel();
    this.onChange('EMP_NO', record.EMPLOYEE_NUM);
  };

  onChangeSelect = value => {
    const {
      extraApiData: { treeSelectData },
      sagaKey: id,
      changeSearchData,
      changeFormData,
    } = this.props;
    const treeData = treeSelectData && treeSelectData.categoryMapList;
    const level = treeData && treeData.find(f => f.NODE_ID === value);
    if (level.LVL === 3) {
      changeSearchData(id, 'DEPT_PARENT_NODE_ID', `AND M1.PARENT_NODE_ID = ${value}`);
      changeSearchData(id, 'DEPT_NODE_ID', null);
      changeSearchData(id, 'SDIV_NODE_ID', null);
    } else if (level.LVL === 4) {
      changeSearchData(id, 'DEPT_PARENT_NODE_ID', null);
      changeSearchData(id, 'DEPT_NODE_ID', `AND W.DEPT_NODE_ID = ${value}`);
      changeSearchData(id, 'SDIV_NODE_ID', null);
    } else if (level.LVL === 5) {
      changeSearchData(id, 'DEPT_PARENT_NODE_ID', null);
      changeSearchData(id, 'DEPT_NODE_ID', null);
      changeSearchData(id, 'SDIV_NODE_ID', `AND W.SDIV_NODE_ID = ${value}`);
    }
    changeFormData(id, 'SELECED_TREE', value);
  };

  modalSearch = () => {
    const { sagaKey: id, getExtraApiData } = this.props;
    const { searchType, keyword } = this.state;
    const apiAry = [
      {
        key: 'userModalData',
        type: 'GET',
        url: `/api/eshs/v1/common/AllEshsUsers?MODAL_SEARCH_TYPE=${searchType}&KEYWORD=${keyword}`,
      },
    ];
    getExtraApiData(id, apiAry);
  };

  onSelectChange = selectedRowKeys => {
    const { sagaKey, setListSelectRowKeys } = this.props;
    setListSelectRowKeys(sagaKey, selectedRowKeys);
  };

  onReset = () => {
    const { changeFormData, sagaKey: id, changeSearchData } = this.props;
    changeFormData(id, 'DE_YEAR', null);
    changeFormData(id, 'EMP_NO', null);
    changeFormData(id, 'SELECED_TREE', null);
    changeSearchData(id, 'DE_YEAR', null);
    changeSearchData(id, 'EMP_NO', null);
    changeSearchData(id, 'DEPT_PARENT_NODE_ID', null);
    changeSearchData(id, 'DEPT_NODE_ID', null);
    changeSearchData(id, 'SDIV_NODE_ID', null);
  };

  onChangeSelect = (name, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, name, value);
  };

  onChangeModal = () => {
    this.setState({ isModal: true });
  };

  onInsertModal = () => {
    this.setState({ isInsertModal: true });
  };

  onCancel = () => {
    this.setState({ isModal: false, isInsertModal: false });
  };

  // onInsertChange = record => {
  //   console.debug('record : ', record);
  // };

  // onSave = () =>{
  //   const { saveTask } = this.props;

  // }

  render() {
    const { YearOptions } = this.state;
    const { listData, formData, listSelectRowKeys, removeMultiTask } = this.props;
    const {
      extraApiData: { treeSelectData, userModalData },
      getListData,
      sagaKey: id,
    } = this.props;
    const stepTree = treeSelectData && treeSelectData.categoryMapList;
    const categoryMapListAsTree = stepTree && stepTree.filter(f => f.USE_YN === 'Y' && f.LVL < 6);
    const insertAsTree = categoryMapListAsTree && categoryMapListAsTree.map(item => ({ ...item, SDIV_NODE_ID: 1596 }));
    const treeData = (categoryMapListAsTree && getCategoryMapListAsTree(categoryMapListAsTree, 1831)) || [];
    const modalTree = (insertAsTree && getCategoryMapListAsTree(insertAsTree, 1596, 4)) || [];
    console.debug('SDIV_NODE_ID : ', modalTree);
    const columns = [
      {
        title: '년도',
        align: 'center',
        dataIndex: 'DE_YEAR',
      },
      {
        title: '작업정보',
        align: 'center',
        children: [
          {
            title: '분류',
            className: 'th-form',
            dataIndex: 'DEPT_PARENT_NAME',
            align: 'center',
          },
          {
            title: '부서',
            className: 'th-form',
            dataIndex: 'DEPT_NM',
            align: 'center',
          },
          {
            title: '공정(장소)',
            className: 'th-form',
            dataIndex: 'SDIV_NM',
            align: 'center',
          },
        ],
      },
      {
        title: '참여자정보',
        align: 'center',
        children: [
          {
            title: '사번',
            className: 'th-form',
            dataIndex: 'EMP_NO',
            align: 'center',
          },
          {
            title: '성명',
            className: 'th-form',
            dataIndex: 'EMP_NM',
            align: 'center',
          },
          {
            title: '직위',
            className: 'th-form',
            dataIndex: 'JIKWI',
            align: 'center',
          },
        ],
      },
    ];
    const userColumns = [
      {
        title: '사번',
        align: 'center',
        dataIndex: 'EMPLOYEE_NUM',
      },
      {
        title: '이름',
        align: 'center',
        dataIndex: 'NAME',
      },
      {
        title: '직위',
        align: 'center',
        dataIndex: 'PSTN',
      },
      {
        title: '부서명',
        align: 'center',
        dataIndex: 'DEPARTMENT',
      },
      {
        title: '연락처',
        align: 'center',
        dataIndex: 'OFFICE_TEL_NO',
      },
    ];

    const userInsertCol = [
      {
        title: '사번',
        align: 'center',
        dataIndex: 'EMPLOYEE_NUM',
      },
      {
        title: '이름',
        align: 'center',
        dataIndex: 'NAME',
      },
      {
        title: '직위',
        align: 'center',
        dataIndex: 'PSTN',
      },
      {
        title: '부서명',
        align: 'center',
        dataIndex: 'DEPARTMENT',
      },
      {
        title: '분류',
        align: 'center',
        dataIndex: 'SDIV_NODE_ID',
        render: (text, record) => (
          <AntdTreeSelect
            style={{ width: '300px' }}
            className="mr5 select-sm"
            defaultValue={text}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={modalTree || []}
            placeholder="Please select"
            onChange={() => this.onInsertChange(record)}
          />
        ),
      },
    ];

    return (
      <>
        <StyledContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <span className="textLabel">참여년도</span>
            <AntdSelect className="select-sm mr5" style={{ width: '100px' }} value={formData.DE_YEAR} onChange={value => this.onChange('DE_YEAR', value)}>
              {YearOptions && YearOptions.map(YYYY => <Option value={`${YYYY}`}>{YYYY}</Option>)}
            </AntdSelect>
            <span className="textLabel">분류</span>
            <AntdTreeSelect
              style={{ width: '300px' }}
              className="mr5 select-sm"
              value={formData.SELECED_TREE}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treeData || []}
              placeholder="Please select"
              onChange={value => this.onChangeSelect(value)}
            />
            <span className="textLabel">사번</span>
            <AntdSearchInput
              style={{ width: '300px' }}
              value={formData.EMP_NO}
              className="input-search-sm ant-search-inline mr5"
              readOnly
              onClick={this.onChangeModal}
              onChange={this.onChangeModal}
            />
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => getListData(id, 9201)}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onInsertModal}>
                추가
              </StyledButton>
              <Popconfirm title="Are you sure delete this task?" onConfirm={() => removeMultiTask(id, id, -1, 'INPUT')} okText="Yes" cancelText="No">
                <StyledButton className="btn-primary btn-first btn-sm">삭제</StyledButton>
              </Popconfirm>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onReset}>
                Reset
              </StyledButton>
              <StyledButton className="btn-primary btn-sm">엑셀받기</StyledButton>
            </StyledButtonWrapper>
          </div>
          <AntdTable
            className="tableWrapper"
            rowKey={listData && `${listData.DE_YEAR}${listData.SDIV_CD}${listData.EMP_NO}`}
            columns={columns}
            dataSource={listData || []}
            bordered
            footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>}
            rowSelection={{ selectedRowKeys: listSelectRowKeys, onChange: this.onSelectChange }}
          />
          <AntdModal
            width={900}
            visible={this.state.isModal || this.state.isInsertModal}
            title="참여자 명단 검색"
            onCancel={this.onCancel}
            destroyOnClose
            footer={null}
            className="modal-table-pad"
          >
            <StyledContentsWrapper>
              <div className="selSaveWrapper alignLeft">
                <AntdSelect className="mr5 select-sm" defaultValue={this.state.searchType} onChange={value => this.setState({ searchType: value })}>
                  <Option value="NAME">이름</Option>
                  <Option value="NO">사번</Option>
                  <Option value="DEPT">소속</Option>
                  <Option value="PSTN">직위</Option>
                </AntdSelect>
                <AntdInput
                  style={{ width: 600 }}
                  className="ant-input-sm ant-input-inline mr5"
                  placeholder=" 검색어를 입력하세요"
                  onChange={e => this.setState({ keyword: e.target.value })}
                />
                <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modalSearch}>
                  검색
                </StyledButton>
              </div>
              {this.state.isInsertModal ? (
                <>
                  <AntdTable
                    className="tableWrapper"
                    columns={userInsertCol}
                    bordered
                    rowKey={userModalData && userModalData.users && `${userModalData.users.USER_ID}`}
                    dataSource={(userModalData && userModalData.users) || []}
                    footer={() => <span>{`${(userModalData && userModalData.users && userModalData.users.length) || 0} 건`}</span>}
                  />
                  <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onSave}>
                    추가
                  </StyledButton>
                </>
              ) : (
                <AntdTable
                  className="tableWrapper"
                  columns={userColumns}
                  bordered
                  rowKey={userModalData && userModalData.users && `${userModalData.users.USER_ID}`}
                  dataSource={(userModalData && userModalData.users) || []}
                  footer={() => <span>{`${(userModalData && userModalData.users && userModalData.users.length) || 0} 건`}</span>}
                  onRow={record => ({
                    onClick: () => {
                      this.onRowModal(record);
                    },
                  })}
                />
              )}
            </StyledContentsWrapper>
          </AntdModal>
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  formData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeSearchData: PropTypes.func,
  getListData: PropTypes.func,
  changeFormData: PropTypes.func,
  setListSelectRowKeys: PropTypes.func,
  listData: PropTypes.array,
  listSelectRowKeys: PropTypes.any,
  removeMultiTask: PropTypes.func,
};

List.defaultProps = {};

export default List;

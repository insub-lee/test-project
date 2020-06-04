import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTreeFromFlatData } from 'react-sortable-tree';
import { Table, Input, TreeSelect, Select, Modal, Popconfirm, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import { EXCEL_DOWNLOAD_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { isJSON } from 'utils/helpers';

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
      removeList: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getExtraApiData, changeSearchData, getListData, changeFormData, workInfo } = this.props;
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
    let btnTex = '';
    let fileName = '';
    let sheetName = '';
    let excelColumns = [];
    let fields = [];

    if (workInfo && workInfo.OPT_INFO) {
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_SEQ === EXCEL_DOWNLOAD_OPT_SEQ && opt.ISUSED === 'Y') {
          if (isJSON(opt.OPT_VALUE)) {
            const ObjOptVal = JSON.parse(opt.OPT_VALUE);
            const { columnInfo } = ObjOptVal;
            btnTex = ObjOptVal.btnTitle || '엑셀받기';
            fileName = ObjOptVal.fileName || 'excel';
            sheetName = ObjOptVal.sheetName || 'sheet1';
            excelColumns = columnInfo.columns || [];
            fields = columnInfo.fields || [];
          }
        }
      });
      this.setState({ btnTex, fileName, sheetName, excelColumns, fields });
    }
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
    getExtraApiData(id, apiAry, this.modalDataSet);
  };

  modalDataSet = () => {
    const {
      extraApiData: { userModalData },
    } = this.props;
    this.setState({ userModalData: userModalData.users });
  };

  onSelectChange = selectedRowKeys => {
    const { sagaKey, setListSelectRowKeys } = this.props;
    setListSelectRowKeys(sagaKey, selectedRowKeys);
  };

  removeMultiTask = () => {
    const { sagaKey: id, getExtraApiData } = this.props;
    const { removeList } = this.state;
    const apiAry = [
      {
        key: 'userModalData',
        type: 'POST',
        url: `/api/builder/v1/work/taskContentsList/-1`,
        params: { PARAM: { WORK_SEQ: 9201, taskList: removeList }, BUILDER: 'deleteMultiTask' },
      },
    ];
    getExtraApiData(id, apiAry, this.modalDataSet);
  };

  onReset = () => {
    const { changeFormData, sagaKey: id, changeSearchData } = this.props;
    this.onCancel();
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
    this.setState({ isModal: false, isInsertModal: false, selectedRowKeys: [], userModalData: [] });
  };

  onInsertChange = (record, value) => {
    const { userModalData } = this.state;
    const {
      extraApiData: { treeSelectData },
    } = this.props;
    const stepTree = treeSelectData && treeSelectData.categoryMapList;
    const sdivNode = stepTree.find(item => item.NODE_ID === value);
    const deptNode = stepTree.find(item => item.NODE_ID === sdivNode.NODE_ID);
    const temp = {
      SDIV_NODE_ID: value,
      DEPT_NODE_ID: deptNode.NODE_ID,
      TEL_NO: record.TEL,
      JIKWI: record.PSTN,
      DEPT_CD: deptNode.CODE,
      DEPT_NM: deptNode.NAME_KOR,
      SDIV_CD: sdivNode.CODE,
      SDIV_NM: sdivNode.NAME_KOR,
      EMP_ID: record.USER_ID,
      EMP_NM: record.NAME,
      EMP_NO: record.EMPLOYEE_NUM,
    };
    const nData = userModalData.map(item => (item.USER_ID === record.USER_ID ? { ...item, ...temp } : { ...item }));
    return this.setState({ userModalData: nData });
  };

  onSave = () => {
    const { sagaKey: id, getExtraApiData, formData } = this.props;
    const { userModalData, selectedRowKeys } = this.state;
    const nUserData = selectedRowKeys.map(item => userModalData.find(element => item === element.USER_ID));
    const apiAry = [
      {
        key: 'insertParticipant',
        type: 'POST',
        url: '/api/eshs/v1/common/paricipant',
        params: { PARAM: { ...formData, PARICIPANT_ARRAY: nUserData } },
      },
    ];
    getExtraApiData(id, apiAry, this.saveAfter);
  };

  saveAfter = () => {
    const { sagaKey: id, getListData } = this.props;
    this.onReset();
    getListData(id, 9201);
  };

  onSelectChangeModal = selectedRowKeys => {
    const { userModalData } = this.state;
    const effectiveness = userModalData.findIndex(item => !!item.SDIV_NODE_ID && item.USER_ID === selectedRowKeys[selectedRowKeys.length - 1]);
    if (effectiveness !== -1) {
      const nData = userModalData.map(item => (item.USER_ID === selectedRowKeys ? { ...item } : { ...item }));
      this.setState({ selectedRowKeys, userModalData: nData });
    } else {
      message.warning('분류를 먼저 선택해주세요');
    }
  };

  render() {
    const { YearOptions, userModalData, selectedRowKeys, fileName, btnTex, sheetName, fields, excelColumns } = this.state;
    const { listData, formData, listSelectRowKeys, removeMultiTask } = this.props;
    const {
      extraApiData: { treeSelectData },
      getListData,
      sagaKey: id,
    } = this.props;
    const stepTree = treeSelectData && treeSelectData.categoryMapList;
    const categoryMapListAsTree = stepTree && stepTree.filter(f => f.USE_YN === 'Y' && f.LVL < 6);
    const insertAsTree = categoryMapListAsTree && categoryMapListAsTree.map(item => ({ ...item, SDIV_NODE_ID: 1596 }));
    const treeData = (categoryMapListAsTree && getCategoryMapListAsTree(categoryMapListAsTree, 1831)) || [];
    const modalTree = (insertAsTree && getCategoryMapListAsTree(insertAsTree, 1596, 4)) || [];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChangeModal,
      // onChange: () => this.setState({ selectedRowKeys }),
    };
    const columns = [
      {
        title: '',
        align: 'center',
        dataIndex: 'TASK_SEQ',
      },
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
            onChange={value => this.onInsertChange(record, value)}
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
              <ExcelDownloadComp
                isBuilder={false}
                fileName={fileName || 'excel'}
                className="workerExcelBtn"
                btnText={btnTex || '엑셀받기'}
                sheetName={sheetName || 'sheet1'}
                columns={excelColumns || []}
                fields={fields || []}
                listData={listData || []}
              />
            </StyledButtonWrapper>
          </div>
          <AntdTable
            className="tableWrapper"
            rowKey="TASK_SEQ"
            key="TASK_SEQ"
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
                    rowKey="USER_ID"
                    dataSource={userModalData || []}
                    footer={() => <span>{`${(userModalData && userModalData.length) || 0} 건`}</span>}
                    rowSelection={rowSelection}
                    scroll={{ y: 455 }}
                    pagination={false}
                  />
                  <StyledButtonWrapper className="btn-wrap-center">
                    <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onSave}>
                      저장
                    </StyledButton>
                    <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onReset}>
                      취소
                    </StyledButton>
                  </StyledButtonWrapper>
                </>
              ) : (
                <AntdTable
                  className="tableWrapper"
                  columns={userColumns}
                  bordered
                  rowKey="USER_ID"
                  dataSource={userModalData || []}
                  footer={() => <span>{`${(userModalData && userModalData.length) || 0} 건`}</span>}
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
  workInfo: PropTypes.object,
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

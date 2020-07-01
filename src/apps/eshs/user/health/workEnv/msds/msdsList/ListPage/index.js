import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Select, Input, Modal } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import Contents from 'components/BizBuilder/Common/Contents';
import { MULTI_DELETE_OPT_SEQ, LIST_NO_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import { debounce } from 'lodash';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import { getTaskSeq } from 'components/BizBuilderBase/actions';
import MsdsSearchList from 'apps/eshs/user/health/workEnv/msdsSearchList';
const { Option } = Select;
const AntdModal = StyledAntdModal(Modal);
const AntdSearchInput = StyledSearchInput(Input.Search);

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      isMultiDelete: false,
      isRowNo: false,
      searchType: 'W.MTRL_NM',
      searchText: '',
      viewModalVisible: false,
      viewTaskSeq: -1,
      modalObj: { visible: false, content: [], title: '' },
    };
    this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  componentDidMount = () => {
    const { workInfo, changeViewPage } = this.props;
    let isMultiDelete = false;
    let isRowNo = false;
    if (workInfo && workInfo.OPT_INFO) {
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_SEQ === MULTI_DELETE_OPT_SEQ && opt.ISUSED === 'Y') isMultiDelete = true;
        if (opt.OPT_SEQ === LIST_NO_OPT_SEQ && opt.ISUSED === 'Y') isRowNo = true;
      });
      this.setState({ isMultiDelete, isRowNo });
    }
  };

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = this.props;
  //   removeReduxState(id);
  // }

  columnWidths = {
    MTRL_NM: 200,
    ITEM_CD: 100,
    MOLECULAR_FORMULA: 200,
    CAS_NO: 150,
    UN_NO: 150,
    ITEM_NM: 200,
    VENDOR_NM: 200,
    IS_HAZARD_NAME: 200,
    NFPA_A: 50,
    NFPA_B: 50,
    NFPA_C: 80,
    ATTACH: 100,
    NFPA_D_NAME: 100,
    NOTE_AREA: 100,
  };

  renderComp = (comp, colData, visible, rowClass, colClass, isSearch) => {
    if (comp.CONFIG.property.COMP_SRC && comp.CONFIG.property.COMP_SRC.length > 0 && CompInfo[comp.CONFIG.property.COMP_SRC]) {
      return CompInfo[comp.CONFIG.property.COMP_SRC].renderer({
        ...comp,
        colData,
        ...this.props,
        visible,
        rowClass,
        colClass,
        isSearch,
      });
    }
    return <div />;
  };

  renderCompRow = (comp, colData, rowData, visible) => {
    if (comp.CONFIG.property.COMP_SRC && comp.CONFIG.property.COMP_SRC.length > 0 && CompInfo[comp.CONFIG.property.COMP_SRC]) {
      return CompInfo[comp.CONFIG.property.COMP_SRC].renderer({
        ...comp,
        colData,
        rowData,
        ...this.props,
        visible,
      });
    }
    return <div />;
  };

  setColumns = cols => {
    const { isRowNo } = this.state;
    const columns = [];
    if (isRowNo) {
      columns.push({
        dataIndex: 'RNUM',
        title: 'No.',
      });
    }
    cols.forEach(node => {
      if (node.comp && node.comp.COMP_FIELD) {
        columns.push({
          dataIndex: node.comp.CONFIG.property.viewDataKey || node.comp.COMP_FIELD,
          title: node.comp.CONFIG.property.HEADER_NAME_KOR,
          width: node.style.width,
          align: 'center',
          render: (text, record) => this.renderCompRow(node.comp, text, record, true),
        });
      }
    });
    return columns;
  };

  onSelectChange = selectedRowKeys => {
    const { sagaKey, setListSelectRowKeys } = this.props;
    setListSelectRowKeys(sagaKey, selectedRowKeys);
  };

  renderList = (group, groupIndex) => {
    const { listData, listSelectRowKeys } = this.props;
    const { isMultiDelete, viewModalVisible, viewTaskSeq } = this.state;
    const columns = this.setColumns(group.rows[0].cols);
    let rowSelection = false;
    if (isMultiDelete) {
      rowSelection = {
        selectedRowKeys: listSelectRowKeys,
        onChange: this.onSelectChange,
      };
    }
    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <AntdTable
            rowKey="TASK_SEQ"
            key={`${group.key}_list`}
            columns={columns.map(col => ({ ...col, width: this.columnWidths[col.dataIndex], fixed: col.dataIndex === 'MTRL_NM' && 'left' }))}
            dataSource={listData || []}
            rowSelection={rowSelection}
            scroll={{ x: '100%' }}
            bordered
            onRow={(record, rowIndex) => ({
              onClick: () => this.handleModalVisible('VIEW', record.TASK_SEQ, record.ITEM_CD),
            })}
          />
        </Group>
      </div>
    );
  };

  handleModalVisible = (viewType, taskSeq = -1, itemCd = '') => {
    const { modalObj } = this.state;
    const { visible } = modalObj;
    if (visible) {
      return this.setState({
        modalObj: {
          visible: !visible,
          content: [],
        },
      });
    }
    return this.setState({
      modalObj: {
        visible: !visible,
        content: [
          <BizBuilderBase
            sagaKey="MsdsListModal"
            workSeq={3161}
            taskSeq={taskSeq}
            ListCustomButtons={() => null}
            ViewCustomButtons={() => null}
            viewType={viewType}
            listMetaSeq={4141}
            CustomListPage={MsdsSearchList}
            customOnRowClick={record => this.rowClick(record)}
          />,
        ],
        title: viewType === 'LIST' ? 'MSDS 검색' : `MSDS 조회 코드 [ ${itemCd} ] `,
      },
    });
  };

  rowClick = record => {
    const { sagaKey: id, setFormData, formData } = this.props;
    setFormData(id, { ...formData, selectedRowItemCode: record.ITEM_CD, selectedRowTaskSeq: record.TASK_SEQ });
    this.handleModalVisible();
  };

  handleSearchSite = value => {
    const { sagaKey, changeSearchData } = this.props;
    const searchText = value ? `AND W.SITE LIKE '%${value}%'` : ' AND 1 = 1';
    changeSearchData(sagaKey, 'andSearch_1', searchText);
  };

  onChangeHandler = searchType => {
    const { sagaKey, changeSearchData } = this.props;
    const { searchText } = this.state;
    this.setState({
      searchType,
    });
    const andSearch2 = searchType && searchText ? `AND ${searchType} LIKE '%${searchText}%'` : 'AND 1 = 1';
    changeSearchData(sagaKey, 'andSearch_2', andSearch2);
  };

  handleOnChangeSearch = searchText => {
    const { sagaKey, changeSearchData } = this.props;
    const { searchType } = this.state;
    this.setState({
      searchText,
    });
    const andSearch2 = searchType && searchText ? `AND ${searchType} LIKE '%${searchText}%'` : 'AND 1 = 1';
    changeSearchData(sagaKey, 'andSearch_2', andSearch2);
  };

  handleInputChange = ITEM_CD => {
    const { sagaKey, changeSearchData, changeFormData } = this.props;
    changeFormData(sagaKey, 'selectedRowItemCode', ITEM_CD);
    const andSearch3 =
      ITEM_CD.length > 0 ? `AND W.ITEM_CD IN (SELECT ITEM_CD FROM ehs_hctb_msds_component WHERE component_item_cd = '${ITEM_CD}')` : 'AND 1 = 1';
    changeSearchData(sagaKey, 'andSearch_3', andSearch3);
  };

  render = () => {
    const { sagaKey: id, viewLayer, formData, workFlowConfig, loadingComplete, getListData, workSeq, removeMultiTask } = this.props;
    const { isMultiDelete, modalObj } = this.state;

    const selectedRowItemCode = (formData && formData.selectedRowItemCode) || '';
    if (selectedRowItemCode) {
      this.handleInputChange(selectedRowItemCode);
    }

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const {
        layer: { groups },
        bodyStyle,
      } = viewLayerData;
      const {
        info: { PRC_ID },
      } = workFlowConfig;

      // 로딩
      if (this.props.isLoading === false && this.state.initLoading) {
        this.setState(
          {
            initLoading: false,
          },
          () => loadingComplete(),
        );
      }
      return (
        <StyledContentsWrapper>
          {groups.map((group, groupIndex) => {
            if (group.type === 'listGroup') {
              return this.renderList(group, groupIndex);
            }
            return (
              <StyledCustomSearchWrapper className="search-wrapper-inline">
                <div>
                  <AntdSelect style={{ width: 120 }} allowClear className="select-sm mr5" onChange={this.handleSearchSite} placeholder="지역전체">
                    <Option value="317">청주</Option>
                    <Option value="318">구미</Option>
                  </AntdSelect>
                  <AntdSelect placeholder="검색구분" allowClear className="select-sm" style={{ width: 150 }} onChange={this.onChangeHandler}>
                    <Option value="W.MTRL_NM">물질명</Option>
                    <Option value="W.ITEM_NM">제품명</Option>
                    <Option value="W.MOLECULAR_FORMULA">분자식</Option>
                    <Option value="W.CAS_NO">CAS_NO</Option>
                    <Option value="W.UN_NO">UN_NO</Option>
                    <Option value="W.ITEM_CD">MSDS코드</Option>
                    <Option value="Y.WRK_CMPNY_NM">Vendor</Option>
                  </AntdSelect>
                  <AntdInput
                    style={{ width: 150 }}
                    placeholder="검색어"
                    allowClear
                    className="ant-input-sm ant-input-inline mr5"
                    onChange={e => this.handleOnChangeSearch(e.target.value)}
                  />
                  <AntdSearchInput
                    className="input-search-sm ant-search-inline mr5"
                    style={{ width: 150 }}
                    placeholder="구성성분"
                    value={selectedRowItemCode}
                    onSearch={() => this.handleModalVisible('LIST')}
                    onClick={() => this.handleModalVisible('LIST')}
                  />
                  <StyledButton className="btn-gray btn-sm mr5" onClick={() => getListData(id, workSeq)}>
                    검색
                  </StyledButton>
                </div>
              </StyledCustomSearchWrapper>
            );
          })}
          <AntdModal width={850} visible={modalObj.visible} title={modalObj.title} onCancel={this.handleModalVisible} destroyOnClose footer={null}>
            {modalObj.content}
          </AntdModal>
        </StyledContentsWrapper>
      );
    }
    return '';
  };
}

ListPage.propTypes = {
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModalHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  handleModalVisible: PropTypes.func,
  setFormData: PropTypes.func,
  changeSearchData: PropTypes.func,
};

ListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  loadingComplete: () => {},
};

export default ListPage;

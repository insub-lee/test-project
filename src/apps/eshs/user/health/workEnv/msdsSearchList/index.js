import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Select, Input } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import {
  MULTI_DELETE_OPT_SEQ,
  LIST_NO_OPT_SEQ,
  ON_ROW_CLICK_OPT_SEQ,
  EXCEL_DOWNLOAD_OPT_SEQ,
  PAGINATION_OPT_CODE,
} from 'components/BizBuilder/Common/Constants';
import { DefaultStyleInfo } from 'components/BizBuilder/DefaultStyleInfo';

// import Loadable from 'components/Loadable';
// import Loading from '../Common/Loading';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const { Option } = Select;

class MsdsSearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMultiDelete: false,
      isRowNo: false,
      isOnRowClick: false,
      rowClickView: 'VIEW',
      StyledWrap: StyledViewDesigner,
      isExcelDown: false,
      btnText: '',
      fileName: '',
      sheetName: '',
      columns: [],
      fields: [],
      paginationIdx: 1,
      pageSize: 10,
      isPagingData: false,
      columnWidths: {
        MTRL_NM: 200,
        ITEM_CD: 100,
        MOLECULAR_FORMULA: 200,
        CAS_NO: 150,
        UN_NO: 150,
        ITEM_NM: 200,
        VENDOR_NM: 200,
      },
    };
  }

  componentDidMount = () => {
    const { workInfo, listMetaSeq, viewSeq } = this.props;
    let isMultiDelete = false;
    let isRowNo = false;
    let isOnRowClick = false;
    let rowClickView = 'VIEW';
    let isExcelDown = false;
    let btnTex = '';
    let fileName = '';
    let sheetName = '';
    let columns = [];
    let fields = [];
    let isPagingData = false;

    if (workInfo.BUILDER_STYLE_PATH) {
      // const StyledWrap = Loadable({
      //   loader: () => import(`commonStyled/${workInfo.BUILDER_STYLE_PATH}`),
      //   loading: Loading,
      // });
      const StyledWrap = DefaultStyleInfo(workInfo.BUILDER_STYLE_PATH);
      this.setState({ StyledWrap });
    }

    if (workInfo && workInfo.OPT_INFO) {
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_SEQ === MULTI_DELETE_OPT_SEQ && opt.ISUSED === 'Y') isMultiDelete = true;
        if (opt.OPT_SEQ === LIST_NO_OPT_SEQ && opt.ISUSED === 'Y') isRowNo = true;
        if (opt.OPT_SEQ === ON_ROW_CLICK_OPT_SEQ && opt.ISUSED === 'Y') {
          if (!isJSON(opt.OPT_VALUE)) {
            isOnRowClick = true;
            rowClickView = opt.OPT_VALUE === '' ? 'VIEW' : opt.OPT_VALUE;
          } else {
            const ObjOptVal = JSON.parse(opt.OPT_VALUE);
            const optMetalist = ObjOptVal.LIST || [];
            const targetViewSeq = listMetaSeq === -1 ? viewSeq : listMetaSeq;
            isOnRowClick = optMetalist.includes(targetViewSeq.toString());
            rowClickView = ObjOptVal.VIEW || 'VIEW';
          }
        }
        if (opt.OPT_SEQ === EXCEL_DOWNLOAD_OPT_SEQ && opt.ISUSED === 'Y') {
          isExcelDown = true;
          if (isJSON(opt.OPT_VALUE)) {
            const ObjOptVal = JSON.parse(opt.OPT_VALUE);
            const { columnInfo } = ObjOptVal;
            btnTex = ObjOptVal.btnTitle || '엑셀받기';
            fileName = ObjOptVal.fileName || 'excel';
            sheetName = ObjOptVal.sheetName || 'sheet1';
            columns = columnInfo.columns || [];
            fields = columnInfo.fields || [];
          }
        }
        if (opt.OPT_CODE === PAGINATION_OPT_CODE && opt.ISUSED === 'Y') isPagingData = true;
        // todo page size option
      });
      this.setState({ isMultiDelete, isRowNo, isOnRowClick, rowClickView, isExcelDown, btnTex, fileName, sheetName, columns, fields, isPagingData });
    }
  };

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = this.props;
  //   removeReduxState(id);
  // }

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { pageSize, isPagingData } = this.state;
      if (isPagingData) {
        const { sagaKey, workSeq, conditional, getListData } = this.props;
        getListData(sagaKey, workSeq, conditional, paginationIdx, pageSize);
      }
    });

  handleClickSearch = () => {
    this.setState({ paginationIdx: 1 }, () => {
      const { pageSize, isPagingData } = this.state;
      const { sagaKey, workSeq, conditional, getListData } = this.props;
      getListData(sagaKey, workSeq, conditional, 1, pageSize);
    });
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

  setColumns = (cols, widths) => {
    const { isRowNo, columnWidths } = this.state;
    const columns = [];
    if (isRowNo) {
      columns.push({
        dataIndex: 'RNUM',
        title: 'No.',
      });
    }
    cols.forEach((node, idx) => {
      if (node.comp && node.comp.COMP_FIELD) {
        columns.push({
          dataIndex: node.comp.CONFIG.property.viewDataKey || node.comp.COMP_FIELD,
          title: node.comp.CONFIG.property.HEADER_NAME_KOR,
          // width: (node.style && node.style.width) || undefined,
          // width: columnWidths[widths && widths[idx] && `${widths[idx]}%`] || undefined,
          render: (text, record) => this.renderCompRow(node.comp, text, record, true),
          className: node.addonClassName && node.addonClassName.length > 0 ? `${node.addonClassName.toString().replaceAll(',', ' ')}` : '',
          align: 'center',
        });
      }
    });
    return columns;
  };

  onSelectChange = selectedRowKeys => {
    const { sagaKey, setListSelectRowKeys } = this.props;
    setListSelectRowKeys(sagaKey, selectedRowKeys);
  };

  /* 
      신규추가 
      목적 : ListGroup 내에서 Row를 클릭시 원하는 뷰로 이동할 수 있는 Config를 지원하기 위해 생성
      타입 : func (추가사항. antd - Table Props 참조)
      create by. JeongHyun
  */
  onRowClick = record => {
    const { sagaKey: id, isBuilderModal, changeBuilderModalState, changeViewPage } = this.props;
    const { rowClickView } = this.state;
    return {
      onClick: () => {
        if (isBuilderModal) {
          changeBuilderModalState(true, rowClickView, record.WORK_SEQ, record.TASK_SEQ, record);
        } else {
          changeViewPage(id, record.WORK_SEQ, record.TASK_SEQ, rowClickView);
        }
      },
    };
  };

  renderList = (group, groupIndex) => {
    const { listData, listSelectRowKeys, workInfo, customOnRowClick, listTotalCnt } = this.props;
    const { isMultiDelete, isOnRowClick, paginationIdx, columnWidths } = this.state;
    const columns = this.setColumns(group.rows[0].cols, group.widths || []);
    let rowSelection = false;
    let onRow = false;
    if (isMultiDelete) {
      rowSelection = {
        selectedRowKeys: listSelectRowKeys,
        onChange: this.onSelectChange,
      };
    }
    if (isOnRowClick) {
      onRow = this.onRowClick;
    }
    if (typeof customOnRowClick === 'function') {
      onRow = record => ({ onClick: () => customOnRowClick(record) });
    }

    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <AntdTable
            bordered
            rowKey="TASK_SEQ"
            key={`${group.key}_list`}
            className="view-designer-list"
            columns={columns.map(col => ({ ...col, width: columnWidths[col.dataIndex], fixed: col.dataIndex === 'MTRL_NM' && 'left' }))}
            dataSource={listData || []}
            rowSelection={rowSelection}
            rowClassName={isOnRowClick ? 'builderRowOnClickOpt' : ''}
            onRow={onRow}
            pagination={{ current: paginationIdx, total: listTotalCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
            scroll={{ x: '100%' }}
          />
        </Group>
      </div>
    );
  };

  handleOnChangeSearchData = (target, value, callBack) => {
    this.setState(
      {
        [target]: value,
      },
      () => (typeof callBack === 'function' ? callBack() : undefined),
    );
  };

  render = () => {
    const {
      sagaKey: id,
      viewLayer,
      formData,
      workFlowConfig,
      viewPageData,
      changeViewPage,
      getListData,
      workSeq,
      removeMultiTask,
      isBuilderModal,
      changeBuilderModalState,
      listData,
      ListCustomButtons,
      useExcelDownload,
      conditional,
      changeSearchData,
    } = this.props;
    const { isMultiDelete, StyledWrap, isExcelDown, btnTex, fileName, sheetName, columns, fields, pageSize, isPagingData } = this.state;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const {
        layer: { groups },
        bodyStyle,
      } = viewLayerData;
      const {
        info: { PRC_ID },
      } = workFlowConfig;

      return (
        <StyledWrap className={viewPageData.viewType}>
          <Sketch {...bodyStyle}>
            {groups.map((group, groupIndex) => {
              if (group.type === 'listGroup') {
                return this.renderList(group, groupIndex);
              }
              return (
                <StyledCustomSearchWrapper className="search-wrapper-inline">
                  <div>
                    <AntdSelect
                      style={{ width: 120 }}
                      allowClear
                      className="select-sm mr5"
                      onChange={value => changeSearchData(id, 'andSearch_1', value ? `AND W.SITE = '${value}'` : ' AND 1 = 1')}
                      placeholder="지역전체"
                    >
                      <Option value="317">청주</Option>
                      <Option value="318">구미</Option>
                    </AntdSelect>
                    <AntdSelect
                      placeholder="검색구분"
                      allowClear
                      className="select-sm"
                      style={{ width: 150 }}
                      onChange={value =>
                        this.handleOnChangeSearchData('searchType', value, () => {
                          const { searchType, searchText } = this.state;
                          return changeSearchData(id, 'andSearch_2', searchType && searchText ? `AND ${searchType} LIKE '%${searchText}%'` : 'AND 1 = 1');
                        })
                      }
                    >
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
                      onChange={e =>
                        this.handleOnChangeSearchData('searchText', e.target.value, () => {
                          const { searchType, searchText } = this.state;
                          return changeSearchData(id, 'andSearch_2', searchType && searchText ? `AND ${searchType} LIKE '%${searchText}%'` : 'AND 1 = 1');
                        })
                      }
                      onPressEnter={() => getListData(id, workSeq)}
                    />

                    <StyledButton className="btn-gray btn-sm mr5" onClick={() => getListData(id, workSeq)}>
                      검색
                    </StyledButton>
                  </div>
                </StyledCustomSearchWrapper>
              );
            })}
          </Sketch>
        </StyledWrap>
      );
    }
    return '';
  };
}

MsdsSearchList.propTypes = {
  workInfo: PropTypes.object,
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
  isBuilderModal: PropTypes.bool,
  changeBuilderModalState: PropTypes.func,
  changeViewPage: PropTypes.func,
  customOnRowClick: PropTypes.any,
  listData: PropTypes.array,
  useExcelDownload: PropTypes.bool,
};

MsdsSearchList.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  customOnRowClick: undefined,
  useExcelDownload: true,
};

export default MsdsSearchList;

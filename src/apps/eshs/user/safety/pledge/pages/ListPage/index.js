import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Select, Input } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledSearchWrapper from 'commonStyled/Wrapper/StyledSearchWrapper';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import { MULTI_DELETE_OPT_SEQ, LIST_NO_OPT_SEQ, ON_ROW_CLICK_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import Loadable from 'components/Loadable';

import Loading from 'components/BizBuilderBase/viewComponent/Common/Loading';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

const { Option } = Select;
const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMultiDelete: false,
      isRowNo: false,
      isOnRowClick: false,
      rowClickView: 'VIEW',
      StyledWrap: StyledViewDesigner,
      searchType: 'PLEDGE_NO',
      searchYear: moment().format('YYYY'),
      searchValue: '',
      searchListData: [],
    };
  }

  componentDidMount = () => {
    const { workInfo } = this.props;
    let isMultiDelete = false;
    let isRowNo = false;
    let isOnRowClick = false;
    let rowClickView = 'VIEW';

    if (workInfo.BUILDER_STYLE_PATH) {
      const StyledWrap = Loadable({
        loader: () => import(`commonStyled/${workInfo.BUILDER_STYLE_PATH}`),
        loading: Loading,
      });
      this.setState({ StyledWrap });
    }

    if (workInfo && workInfo.OPT_INFO) {
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_SEQ === MULTI_DELETE_OPT_SEQ && opt.ISUSED === 'Y') isMultiDelete = true;
        if (opt.OPT_SEQ === LIST_NO_OPT_SEQ && opt.ISUSED === 'Y') isRowNo = true;
        if (opt.OPT_SEQ === ON_ROW_CLICK_OPT_SEQ && opt.ISUSED === 'Y') {
          isOnRowClick = true;
          rowClickView = opt.OPT_VALUE === '' ? 'VIEW' : opt.OPT_VALUE;
        }
      });
      this.setState({ isMultiDelete, isRowNo, isOnRowClick, rowClickView });
    }
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
    const { isRowNo } = this.state;
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
          width: (widths && widths[idx] && `${widths[idx]}%`) || undefined,
          render: (text, record) => this.renderCompRow(node.comp, text, record, true),
          className: node.addonClassName && node.addonClassName.length > 0 ? `${node.addonClassName.toString().replaceAll(',', ' ')}` : '',
          align: (node.style && node.style.textAlign) || undefined,
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

  /*
      검색버튼 클릭시 State 변경
  */
  onClickSearchBtn = listData => {
    const { searchType, searchYear, searchValue } = this.state;
    if (searchValue === '') {
      this.setState({
        searchListData: listData.filter(data => data.YEAR === searchYear),
      });
    } else {
      this.setState({
        searchListData: listData.filter(data => data.YEAR === searchYear && data[searchType] === searchValue),
      });
    }
  };

  renderList = (group, groupIndex, listData) => {
    const { listSelectRowKeys, workInfo, customOnRowClick } = this.props;
    const { isMultiDelete, isOnRowClick } = this.state;
    const columns = this.setColumns(group.rows[0].cols, group.widths || []);
    let rowSelection = false;
    let onRow = false;
    if (isMultiDelete) {
      rowSelection = {
        selectedRowKeys: listSelectRowKeys,
        onChange: this.onSelectChange,
      };
    }
    if (typeof customOnRowClick === 'function') {
      onRow = record => ({ onClick: () => customOnRowClick(record) });
    }
    if (isOnRowClick) {
      onRow = this.onRowClick;
    }

    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <AntdTable
            rowKey="TASK_SEQ"
            key={`${group.key}_list`}
            className="view-designer-list"
            columns={columns}
            dataSource={listData || []}
            rowSelection={rowSelection}
            rowClassName={isOnRowClick ? 'builderRowOnClickOpt' : ''}
            onRow={onRow}
          />
        </Group>
      </div>
    );
  };

  renderYearSelect = () => {
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2006; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <AntdSelect className="select-xs mr5" style={{ width: '100px' }} value={this.state.searchYear} onChange={e => this.setState({ searchYear: e })}>
        {options.map(YYYY => (
          <Option value={`${YYYY}`}>{YYYY}</Option>
        ))}
      </AntdSelect>
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
    } = this.props;
    const { isMultiDelete, StyledWrap, searchValue, searchType, searchListData } = this.state;

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
            <>
              <StyledSearchWrapper style={{ marginBottom: '5px' }}>
                <Group className="view-designer-group group-0">
                  <div className="view-designer-group-search-wrap">
                    <table className="view-designer-table table-0" style={{ border: '1px solid white' }}>
                      <tbody>
                        <tr classNmae="view-designer-row row-0">
                          <td classsName="view-designer-col" tyle={{ height: '35px' }}>
                            <span style={{ fontSize: '0.8rem', margin: '0px 10px 0px 10px', verticalAlign: 'middle' }}>검색구분</span>
                            <AntdSelect className="select-xs mr5" style={{ width: 150 }} value={searchType} onChange={e => this.setState({ searchType: e })}>
                              <Option value="PLEDGE_NO">서약서번호</Option>
                              <Option value="CREATE_DT">서약일</Option>
                              <Option value="WRK_CMPNY_CD">업체코드</Option>
                              <Option value="WRK_CMPNY_NM">업체명</Option>
                            </AntdSelect>
                            {this.renderYearSelect()}
                            <AntdInput
                              className="ant-input-xs ant-input-inline"
                              style={{ width: '200px' }}
                              onChange={e => this.setState({ searchValue: e.target.value })}
                            />
                            <StyledButton
                              className="btn-primary btn-xs btn-first"
                              onClick={() => this.onClickSearchBtn(listData)}
                              style={{ marginLeft: '10px' }}
                            >
                              검색
                            </StyledButton>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Group>
              </StyledSearchWrapper>
              {groups.map((group, groupIndex) => {
                if (group.type === 'listGroup') {
                  return this.renderList(group, groupIndex, searchListData);
                }
                return '';
              })}
            </>
          </Sketch>
        </StyledWrap>
      );
    }
    return '';
  };
}

ListPage.propTypes = {
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
};

ListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  customOnRowClick: undefined,
  listData: [],
};

export default ListPage;

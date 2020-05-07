import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'components/BizBuilderBase/selectors';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledSearchWrapper from 'commonStyled/Wrapper/StyledSearchWrapper';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import Contents from 'components/BizBuilder/Common/Contents';
import Loading from 'components/BizBuilderBase/viewComponent/Common/Loading';
import { MULTI_DELETE_OPT_SEQ, LIST_NO_OPT_SEQ, ON_ROW_CLICK_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import Loadable from 'components/Loadable';

const AntdTable = StyledAntdTable(Table);
const StyledButton = StyledAntdButton(Button);

class ClauseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMultiDelete: false,
      isRowNo: false,
      isOnRowClick: false,
      rowClickView: 'VIEW',
      StyledWrap: StyledViewDesigner,
    };
  }

  componentDidMount = () => {
    const { workInfo } = this.props;
    let isMultiDelete = false;
    let isRowNo = false;
    let isOnRowClick = false;
    let rowClickView = 'VIEW';
    this.getListData();

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

  getListData = () => {
    const { sagaKey, getExtraApiData, formData, searchData } = this.props;
    const apiArray = [
      { key: `customList`, url: `/api/eshs/v1/common/eshsclause?&YEAR=${formData.YEAR || 2020}`, params: { PARAM: { searchData } }, type: 'POST' },
    ];
    getExtraApiData(sagaKey, apiArray, this.initData);
  };

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = this.props;
  //   removeReduxState(id);
  // }

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

  setColumnButton = (quarterSeq, record, quarter, year) => {
    const { isOpenInputModal } = this.props;
    return quarterSeq ? (
      <StyledButton className="btn-primary" onClick={() => isOpenInputModal(record, quarter, year, quarterSeq)}>
        수정
      </StyledButton>
    ) : (
      <StyledButton className="btn-primary" onClick={() => isOpenInputModal(record, quarter, year)}>
        평가
      </StyledButton>
    );
  };

  setColumns = (cols, widths) => {
    const { isRowNo } = this.state;
    const {
      formData: { YEAR },
    } = this.props;
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
    columns.push({
      title: `${YEAR} 준수평가`,
      children: [
        {
          title: '1분기',
          width: 100,
          render: record => this.setColumnButton(record.ONE_Q_SEQ, record, 1, YEAR),
        },
        {
          title: '2분기',
          width: 100,
          render: record => this.setColumnButton(record.TWO_Q_SEQ, record, 2, YEAR),
        },
        {
          title: '3분기',
          width: 100,
          render: record => this.setColumnButton(record.THREE_Q_SEQ, record, 3, YEAR),
        },
        {
          title: '4분기',
          width: 100,
          render: record => this.setColumnButton(record.FOUR_Q_SEQ, record, 4, YEAR),
        },
      ],
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
    const {
      listData,
      listSelectRowKeys,
      customOnRowClick,
      extraApiData: { customList },
    } = this.props;
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
    const filterList = customList && customList.list && customList.list.filter(item => item.ISLAST_VER === 'Y');
    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <AntdTable
            rowKey="TASK_SEQ"
            key={`${group.key}_list`}
            className="view-designer-list"
            columns={columns}
            dataSource={filterList || []}
            // dataSource={list || []}
            rowSelection={rowSelection}
            rowClassName={isOnRowClick ? 'builderRowOnClickOpt' : ''}
            onRow={onRow}
          />
        </Group>
      </div>
    );
  };

  render = () => {
    const { sagaKey: id, viewLayer, formData, viewPageData, getListData, workSeq, removeMultiTask, isOpenInputModal } = this.props;
    const { isMultiDelete, StyledWrap } = this.state;

    if (viewLayer.length === 1 && viewLayer[0].CONFIG && viewLayer[0].CONFIG.length > 0 && isJSON(viewLayer[0].CONFIG)) {
      const viewLayerData = JSON.parse(viewLayer[0].CONFIG).property || {};
      const {
        layer: { groups },
        bodyStyle,
      } = viewLayerData;

      return (
        <StyledWrap className={viewPageData.viewType}>
          <Sketch {...bodyStyle}>
            {groups.map((group, groupIndex) => {
              if (group.type === 'listGroup') {
                return this.renderList(group, groupIndex);
              }
              return (
                (group.type === 'group' || (group.type === 'searchGroup' && group.useSearch)) && (
                  <StyledSearchWrapper key={group.key}>
                    {group.useTitle && <GroupTitle title={group.title} />}
                    <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
                      <div className={group.type === 'searchGroup' ? 'view-designer-group-search-wrap' : ''}>
                        <table className={`view-designer-table table-${groupIndex}`}>
                          <tbody>
                            {group.rows.map((row, rowIndex) => (
                              <tr key={row.key} className={`view-designer-row row-${rowIndex}`}>
                                {row.cols &&
                                  row.cols.map((col, colIndex) =>
                                    col ? (
                                      <td
                                        key={col.key}
                                        {...col}
                                        comp=""
                                        colSpan={col.span}
                                        className={`view-designer-col col-${colIndex}${col.className && col.className.length > 0 ? ` ${col.className}` : ''}${
                                          col.addonClassName && col.addonClassName.length > 0 ? ` ${col.addonClassName.toString().replaceAll(',', ' ')}` : ''
                                        }`}
                                      >
                                        <Contents>
                                          {col.comp &&
                                            this.renderComp(
                                              col.comp,
                                              col.comp.COMP_FIELD ? formData[col.comp.COMP_FIELD] : '',
                                              true,
                                              `${viewLayer[0].COMP_FIELD}-${groupIndex}-${rowIndex}`,
                                              `${viewLayer[0].COMP_FIELD}-${groupIndex}-${rowIndex}-${colIndex}`,
                                              group.type === 'searchGroup',
                                            )}
                                        </Contents>
                                      </td>
                                    ) : (
                                      ''
                                    ),
                                  )}
                              </tr>
                            ))}
                            {/* <tr>
                              <th>법규</th>
                              <td colSpan={5}></td>
                            </tr>
                            <tr>
                              <th></th>
                              <td colSpan={2}></td>
                              <th></th>
                              <td colSpan={2}></td>
                            </tr>
                            <tr>
                              <th></th>
                              <td></td>
                              <th></th>
                              <td></td>
                              <th></th>
                              <td></td>
                            </tr>
                            <tr>
                              <th></th>
                              <td colSpan={2}></td>
                              <th></th>
                              <td colSpan={2}></td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                      {group.type === 'searchGroup' && group.useSearch && (
                        <div className="view-designer-group-search-btn-wrap">
                          <StyledButton className="btn-primary" onClick={() => this.getListData()}>
                            Search
                          </StyledButton>
                        </div>
                      )}
                    </Group>
                  </StyledSearchWrapper>
                )
              );
            })}
          </Sketch>
        </StyledWrap>
      );
    }
    return '';
  };
}

ClauseList.propTypes = {
  workInfo: PropTypes.object,
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  viewPageData: PropTypes.object,
  workPrcProps: PropTypes.object,
  info: PropTypes.object,
  setListSelectRowKeys: PropTypes.object,
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
  isOpenInputModal: PropTypes.func,
  customOnRowClick: PropTypes.any,
  getListData: PropTypes.array,
  workSeq: PropTypes.number,
  removeMultiTask: PropTypes.any,
  listData: PropTypes.array,
  listSelectRowKeys: PropTypes.any,
};

ClauseList.defaultProps = {
  customOnRowClick: undefined,
};

export default connect(() => createStructuredSelector({ searchData: selectors.makeSelectSearchDataById('lawClauseAppraise') }))(ClauseList);
// export default ClauseList;

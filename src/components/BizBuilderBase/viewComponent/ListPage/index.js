import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

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
import { MULTI_DELETE_OPT_SEQ, LIST_NO_OPT_SEQ, ON_ROW_CLICK_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import Loadable from 'components/Loadable';

import Loading from '../Common/Loading';

const AntdTable = StyledAntdTable(Table);
const StyledButton = StyledAntdButton(Button);

class ListPage extends Component {
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

  renderList = (group, groupIndex) => {
    const { listData, listSelectRowKeys, workInfo, customOnRowClick } = this.props;
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
    } = this.props;
    const { isMultiDelete, StyledWrap } = this.state;

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
                          </tbody>
                        </table>
                      </div>
                      {group.type === 'searchGroup' && group.useSearch && (
                        <div className="view-designer-group-search-btn-wrap">
                          <StyledButton className="btn-primary" onClick={() => getListData(id, workSeq)}>
                            Search
                          </StyledButton>
                        </div>
                      )}
                    </Group>
                  </StyledSearchWrapper>
                )
              );
            })}
            <div className="alignRight">
              <StyledButton
                className="btn-primary btn-first"
                onClick={() =>
                  isBuilderModal ? changeBuilderModalState(true, 'INPUT', viewPageData.workSeq, -1) : changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')
                }
              >
                Add
              </StyledButton>
              {isMultiDelete && (
                <Popconfirm title="Are you sure delete this task?" onConfirm={() => removeMultiTask(id, id, -1, 'INPUT')} okText="Yes" cancelText="No">
                  <StyledButton className="btn-light">Delete</StyledButton>
                </Popconfirm>
              )}
            </div>
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
};

ListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  customOnRowClick: undefined,
};

export default ListPage;

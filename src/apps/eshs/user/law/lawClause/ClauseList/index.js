import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, message } from 'antd';

import { isJSON } from 'utils/helpers';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import Contents from 'components/BizBuilder/Common/Contents';
import { debounce } from 'lodash';

const AntdTable = StyledAntdTable(Table);

class ClauseListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      data: [],
      isOpenModal: false,
      selectedRechNo: '',
      selectedLawName: '',
      selectedRegUserName: '',
      selectedTaskSeq: '',
      isOpenModal: false,
    };
    this.debounceList = debounce(this.debounceList, 300);
  }

  componentDidMount() {}

  listVeiwBool = (id, workSeq) => {
    const { getListData, formData } = this.props;
    if (formData && formData.MASTER_SEQ) {
      getListData(id, workSeq);
      this.debounceList();
    } else {
      message.warning('법규를 선택해주세요.');
    }
  };

  debounceList() {
    this.setState({ listVeiwBool: true });
  }

  isOpenLawModal = () => {
    this.setState({ isOpenModal: true });
  };

  onCancel = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  onSelected = rowData => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'MASTER_SEQ', rowData.TASK_SEQ);
    this.setState({
      selectedRechNo: rowData.RECH_NO,
      selectedLawName: rowData.TITLE,
      selectedRegUserName: rowData.REG_USER_NAME,
      selectedTaskSeq: rowData.TASK_SEQ,
    });
    this.onCancel();
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
    const columns = [];
    cols.forEach(node => {
      if (node.comp && node.comp.COMP_FIELD) {
        columns.push({
          dataIndex: node.comp.CONFIG.property.viewDataKey || node.comp.COMP_FIELD,
          title: node.comp.CONFIG.property.HEADER_NAME_KOR,
          width: node.style.width,
          render: (text, record) => this.renderCompRow(node.comp, text, record, true),
        });
      }
    });

    return columns;
  };

  renderList = (group, groupIndex) => {
    const { listData, formData } = this.props;
    const filterList = listData.filter(f => f.ISLAST_VER === 'Y');
    const columns = this.setColumns(group.rows[0].cols);
    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <AntdTable
            rowKey="TASK_SEQ"
            key={`${group.key}_list`}
            className="view-designer-list"
            columns={columns}
            dataSource={formData && formData.MASTER_SEQ && listData && this.state.listVeiwBool ? filterList : []}
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
      loadingComplete,
      viewPageData,
      isOpenInputModal,
      getListData,
      workSeq,
      getRevisionHistory,
      revisionHistory,
    } = this.props;

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
        <StyledViewDesigner>
          <Sketch {...bodyStyle}>
            {groups.map((group, groupIndex) => {
              if (group.type === 'listGroup') {
                return this.renderList(group, groupIndex);
              }
              return (
                <div key={group.key}>
                  {group.useTitle && <GroupTitle title={group.title} />}
                  <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
                    <StyledSearchWrap>
                      <div className={group.type === 'searchGroup' ? 'view-designer-group-search-wrap' : ''}>
                        <table className={`view-designer-table table-${groupIndex}`}>
                          <tbody>
                            {group.rows.map((row, rowIndex) => (
                              <tr key={row.key} className={`view-designer-row row-${rowIndex}`}>
                                {row.cols &&
                                  row.cols.map((col, colIndex) => (
                                    <td
                                      key={col.key}
                                      {...col}
                                      comp=""
                                      colSpan={col.span}
                                      className={`view-designer-col col-${colIndex}${col.className && col.className.length > 0 ? ` ${col.className}` : ''}`}
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
                                  ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {group.type === 'searchGroup' && group.useSearch && (
                        <div align="right">
                          {formData.MASTER_SEQ ? (
                            <StyledButton
                              className="btn-primary"
                              onClick={() => isOpenInputModal(formData.MASTER_SEQ, formData.RECH_LAW_NAME, formData.RECH_NO)}
                            >
                              Add
                            </StyledButton>
                          ) : (
                            ''
                          )}
                          <StyledButton className="btn-primary" onClick={() => this.listVeiwBool(id, workSeq)}>
                            Search
                          </StyledButton>
                        </div>
                      )}
                    </StyledSearchWrap>
                  </Group>
                </div>
              );
            })}
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

ClauseListPage.propTypes = {
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModleHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  columns: PropTypes.array,
};

ClauseListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default ClauseListPage;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import Contents from 'components/BizBuilder/Common/Contents';
import { Column } from 'react-virtualized';
import { ColumnGroup } from '../../../../../../node_modules/ag-grid-community/main';

const AntdTable = StyledAntdTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
    };
  }

  // state값 reset테스트
  // componentWillUnmount() {
  //   const { removeReduxState, id } = this.props;
  //   removeReduxState(id);
  // }

  renderComp = (comp, colData, rowData, visible) => {
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

  // setColumns = cols => {
  //   const columns = [];
  //   cols.forEach(node => {
  //     if (node.comp && node.comp.COMP_FIELD) {
  //       columns.push({
  //         dataIndex: node.comp.CONFIG.property.viewDataKey || node.comp.COMP_FIELD,
  //         title: node.comp.CONFIG.property.HEADER_NAME_KOR,
  //         width: node.style.width,
  //         render: (text, record) => this.renderComp(node.comp, text, record, true),
  //       });
  //     }
  //   });
  //   return columns;
  // };

  renderList = (group, groupIndex) => {
    const { listData } = this.props;
    // const columns = this.setColumns(group.rows[0].cols);
    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <AntdTable rowKey="TASK_SEQ" key={`${group.key}_list`} className="view-designer-list" dataSource={listData || []}>
            <Column title="번호" width={50} />
            <ColumnGroup title="접수">
              <Column title="접수일자" dataSource="recieveDate" />
              <Column title="발행처" dataSource="publication" />
              <Column title="제목(접수내역)" dataSource="title" />
            </ColumnGroup>
            <ColumnGroup title="조치/회신">
              <Column title="회신일자" dataSource="replyDate" />
              <Column title="조치/회신 내용(방법, 요약)" dataSource="replyContent" />
              <Column title="관련문서" dataSource="fileName" />
            </ColumnGroup>
          </AntdTable>
        </Group>
      </div>
    );
  };

  render = () => {
    const { sagaKey: id, viewLayer, formData, workFlowConfig, loadingComplete, viewPageData, changeViewPage } = this.props;
    console.debug(this.props);
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
                    <table className={`view-designer-table table-${groupIndex}`}>
                      <tbody>
                        {group.rows.map((row, rowIndex) => (
                          <tr key={row.key} className={`view-designer-row row-${rowIndex}`}>
                            {row.cols &&
                              row.cols.map((col, colIndex) => (
                                <td
                                  key={col.key}
                                  {...col}
                                  colSpan={col.span}
                                  className={`view-designer-col col-${colIndex}${col.className && col.className.length > 0 ? ` ${col.className}` : ''}`}
                                >
                                  <Contents>{col.comp && this.renderComp(col.comp, col.comp.COMP_FIELD ? formData[col.comp.COMP_FIELD] : '', true)}</Contents>
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Group>
                </div>
              );
            })}
            <div className="alignRight">
              <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
                Add
              </StyledButton>
            </div>
          </Sketch>
        </StyledViewDesigner>
      );
    }
    return '';
  };
}

List.propTypes = {
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
};

List.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default List;

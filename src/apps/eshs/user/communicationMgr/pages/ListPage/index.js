import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import Contents from 'components/BizBuilder/Common/Contents';

import BizBuilderBase from 'components/BizBuilderBase';
import request from 'utils/request';
import moment from 'moment';

import View from '../ViewPage';
import Input from '../InputPage';
import Modify from '../ModifyPage';

const AntdTable = StyledAntdTable(Table);
moment.locale('ko');
class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      modalVisible: false,
      selectedTaskSeq: 0,
      viewType: '',
      communicationList: [],
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      const result = await request({
        url: '/api/eshs/v1/common/AllEshsCommunications',
        method: 'GET',
      });
      result.response.list.map(item => {
        item.receive_date = moment(item.receive_date).format('YYYY-MM-DD');
        item.reply_date = moment(item.reply_date).format('YYYY-MM-DD');
        return item;
      });
      this.setState({
        communicationList: result.response.list,
      });
    };

    fetchData();
  }

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

  handleRowClick = taskSeq => {
    this.setState({
      modalVisible: true,
      selectedTaskSeq: taskSeq,
      viewType: 'VIEW',
    });
  };

  handleOnCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleOnBuild = (changedSagaKey, taskSeq, viewType) => {
    /* 
      changedSagaKey: modal쓰려고 바꾼 sagaKey, modal${id}
      taskSeq: 글 번호, INPUT 할 땐 -1, 나머지는 onRow{onClick}
      viewType: INPUT, MODIFY, VIEW
    */
    const { workSeq, sagaKey, loadingComplete } = this.props;
    return (
      <BizBuilderBase
        sagaKey={changedSagaKey}
        workSeq={workSeq}
        viewType={viewType.toUpperCase()}
        taskSeq={taskSeq}
        CustomViewPage={View}
        CustomInputPage={Input}
        CustomModifyPage={Modify}
        loadingComplete={loadingComplete}
        onCloseModleHandler={this.handleModalClose}
        baseSagaKey={sagaKey}
      />
    );
  };

  handleAddClick = () => {
    this.setState({
      modalVisible: true,
      selectedTaskSeq: -1,
      viewType: 'INPUT',
    });
  };

  handleModalClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  renderList = (group, groupIndex) => {
    const columns = [
      {
        title: '번호',
        dataIndex: 'RNUM',
        key: 'RNUM',
        width: 50,
      },
      {
        title: '접수',
        children: [
          {
            title: '접수일자',
            dataIndex: 'RECEIVE_DATE',
            key: 'RECEIVE_DATE',
            align: 'center',
            width: 100,
          },
          {
            title: '발행처',
            dataIndex: 'PUBLICATION',
            key: 'PUBLICATION',
            align: 'center',
            width: 150,
          },
          {
            title: '제목(접수내역)',
            dataIndex: 'TITLE',
            key: 'TITLE',
            align: 'center',
            ellipsis: 'true',
          },
        ],
      },
      {
        title: '조치/회신',
        children: [
          {
            title: '회신일자',
            dataIndex: 'REPLY_DATE',
            key: 'REPLY_DATE',
            align: 'center',
            width: 100,
          },
          {
            title: '조치/회신 내용(방법, 요약)',
            dataIndex: 'REPLY_CONTENT',
            key: 'REPLY_CONTENT',
            align: 'center',
            ellipsis: 'true',
          },
          {
            title: '관련문서',
            dataIndex: 'file_name',
            key: 'file_name',
            align: 'center',
            width: 100,
          },
          {
            title: '문서유형',
            dataIndex: 'DOC_TYPE',
            key: 'DOC_TYPE',
            align: 'center',
            width: 150,
          },
        ],
      },
    ];

    const { modalVisible, selectedTaskSeq, viewType } = this.state;
    const { listData, sagaKey: id, changeFormData, COMP_FIELD } = this.props;
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
            // dataSource={this.state.communicationList || []}
            bordered
            pagination={{ pageSize: 30 }}
            tableLayout="fixed"
            onRow={record => ({
              onClick: () => this.handleRowClick(record.TASK_SEQ),
            })}
          />
        </Group>
        <Modal visible={modalVisible} closable onCancel={this.handleOnCancel} width={900} footer={null}>
          <div>{modalVisible && this.handleOnBuild(`modal${id}`, selectedTaskSeq, viewType)}</div>
        </Modal>
      </div>
    );
  };

  render = () => {
    const { sagaKey: id, viewLayer, formData, workFlowConfig, loadingComplete, viewPageData, changeViewPage, getListData, workSeq } = this.props;

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
                (group.type === 'group' || (group.type === 'searchGroup' && group.useSearch)) && (
                  <div key={group.key}>
                    {group.useTitle && <GroupTitle title={group.title} />}
                    <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
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
                        <div className="view-designer-group-search-btn-wrap">
                          <StyledButton className="btn-primary" onClick={() => getListData(id, workSeq)}>
                            Search
                          </StyledButton>
                        </div>
                      )}
                    </Group>
                  </div>
                )
              );
            })}
            <div className="alignRight">
              {/* <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
                Add
              </StyledButton> */}
              <StyledButton className="btn-primary" onClick={() => this.handleAddClick()}>
                새 글
              </StyledButton>
            </div>
          </Sketch>
        </StyledViewDesigner>
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
  onCloseModleHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  workSeq: PropTypes.number,
};

ListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default ListPage;

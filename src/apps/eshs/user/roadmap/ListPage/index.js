import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Select } from 'antd';

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
import Moment from 'moment';
import request from 'utils/request';

import SelectReadComp from 'components/BizBuilder/Field/SelectReadComp';
import Input from '../InputPage';
import Modify from '../ModifyPage';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

Moment.locale('ko');

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      modalVisible: false,
      selectedTaskSeq: 0,
      viewType: '',
      currentYear: Moment().format('YYYY'),
      currentMonth: 0,
      selectedCategory: '387',
      categoryLength: 0,
      initList: [],
    };
  }

  componentDidMount() {
    const handleAppInit = async () => {
      const result = await request({
        method: 'GET',
        url: '/api/eshs/v1/common/selectinputroadmap',
      });
      return result.response;
    };
    handleAppInit().then(res => this.setState({ initList: res.roadmap || [] }));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedCategory } = prevState;
    const filterdList = nextProps.listData.filter(item => item.CATEGORY === selectedCategory);
    if (prevState.categoryLength !== filterdList.length) {
      return {
        categoryLength: filterdList.length,
        currentYear: Moment(filterdList[0].CHK_DATE).format('YYYY'),
        currentMonth: Moment(filterdList[0].CHK_DATE).format('MM'),
      };
    }
    return null;
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

  handleOnCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleOnBuild = (changedSagaKey, taskSeq, viewType) => {
    const { workSeq, sagaKey, loadingComplete } = this.props;
    const { selectedCategory, currentYear, currentMonth } = this.state;
    return (
      <BizBuilderBase
        sagaKey={changedSagaKey}
        workSeq={workSeq}
        viewType={viewType.toUpperCase()}
        taskSeq={taskSeq}
        CustomInputPage={Input}
        CustomModifyPage={Modify}
        loadingComplete={loadingComplete}
        onCloseModleHandler={this.handleModalClose}
        baseSagaKey={sagaKey}
        category={selectedCategory}
        year={currentYear}
        month={currentMonth}
        compProps={{ category: selectedCategory, year: currentYear, month: currentMonth }}
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

  handleModifyClick = taskSeq => {
    this.setState({
      modalVisible: true,
      selectedTaskSeq: taskSeq,
      viewType: 'MODIFY',
    });
  };

  handleChange = e => {
    const { listData } = this.props;
    this.setState({
      selectedCategory: e,
      categoryLength: listData.filter(item => item.CATEGORY === e).length,
      currentYear: listData.filter(item => item.CATEGORY === e).length
        ? Moment(listData.filter(item => item.CATEGORY === e)[0].CHK_DATE).format('YYYY')
        : '2020',
      currentMonth: listData.filter(item => item.CATEGORY === e).length ? Moment(listData.filter(item => item.CATEGORY === e)[0].CHK_DATE).format('MM') : '0',
    });
  };

  handleCompleteClick = taskSeq => {
    const { sagaKey: id, changeViewPage, workSeq } = this.props;
    this.handleIsConfirmedChange(taskSeq);
    changeViewPage(id, workSeq, -1, 'LIST');
  };

  handleIsConfirmedChange = async taskSeq => {
    await request({
      method: 'PATCH',
      url: `/api/eshs/v1/common/updateroadmapisconfirmed?taskSeq=${taskSeq}`,
    });
    // return result.response;
  };

  renderList = (group, groupIndex) => {
    const { sagaKey, getExtraApiData, extraApiData } = this.props;
    const columns = [
      {
        title: '항목',
        dataIndex: 'category',
        key: 'category',
        width: '150px',
        render: (key, record, index) => (
          <SelectReadComp colData={record.category} sagaKey={sagaKey} getExtraApiData={getExtraApiData} extraApiData={extraApiData} />
        ),
      },
      { title: '연도', key: 'CHK_DATE', width: '100px', render: (key, record, index) => <div>{Moment(record.chk_date).format('YYYY')}</div> },
      { title: '월', key: 'CHK_MONTH', width: '60px', render: (key, record, index) => <div>{Moment(record.chk_date).format('M')}</div> },
      {
        title: '지역',
        children: [
          {
            title: '청주',
            dataIndex: 'c1',
            key: 'c1',
          },
          {
            title: '구미',
            dataIndex: 'h3',
            key: 'h3',
          },
          // {
          //   title: '청주',
          //   dataIndex: 'FIRST_VALUE',
          //   key: 'FIRST_VALUE',
          // },
          // {
          //   title: '구미',
          //   dataIndex: 'SECOND_VALUE',
          //   key: 'SECOND_VALUE',
          // },
        ],
      },
      {
        title: '입력여부',
        key: 'RNUM',
        width: '180px',
        render: (key, record, index) =>
          record.is_confirmed === 'N' ? (
            <div>
              <StyledButton className="btn-primary" onClick={() => this.handleCompleteClick(record.TASK_SEQ)}>
                완료
              </StyledButton>
              <StyledButton className="btn-primary" onClick={() => this.handleModifyClick(record.TASK_SEQ)}>
                수정
              </StyledButton>
            </div>
          ) : (
            <div>입력완료</div>
          ),
      },
      { title: '작성자', dataIndex: 'reg_user_name', key: 'reg_user_name', width: '80px' },
    ];

    const { modalVisible, selectedTaskSeq, viewType, categoryLength } = this.state;
    const { listData, sagaKey: id } = this.props;

    return (
      <div key={group.key}>
        {group.useTitle && <GroupTitle title={group.title} />}
        <Select defaultValue="387" onChange={this.handleChange} width="200px" style={{ marginBottom: '10px' }}>
          <Option value="387">WF 생산량</Option>
          <Option value="388">전력</Option>
          <Option value="389">연료</Option>
          <Option value="390">용수</Option>
          <Option value="391">경미재해</Option>
        </Select>

        <Group key={group.key} className={`view-designer-group group-${groupIndex}`}>
          <div>{`총 ${this.state.initList.filter(item => item.category === this.state.selectedCategory).length}건`}</div>
          <div className="alignRight">
            <StyledButton className="btn-primary" onClick={this.handleAddClick} style={{ marginBottom: '5px' }}>
              항목 추가
            </StyledButton>
          </div>

          <AntdTable
            rowKey="TASK_SEQ"
            key={`${group.key}_list`}
            className="view-designer-list"
            columns={columns}
            dataSource={this.state.initList.filter(item => item.category === this.state.selectedCategory) || []}
            bordered
            pagination={false}
            onRow={(record, index) => ({
              onClick: () => console.debug(record.category),
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
    const { sagaKey: id, viewLayer, formData, workFlowConfig, loadingComplete, getListData, workSeq } = this.props;
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
  listData: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModleHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingComplete: PropTypes.func,
  workSeq: PropTypes.number,
  getExtraApiData: PropTypes.func,
  visible: PropTypes.bool,
  CONFIG: PropTypes.object,
  extraApiData: PropTypes.func,
};

ListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default ListPage;

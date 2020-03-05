import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Select, Input, Button, Modal } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import Contents from 'components/BizBuilder/Common/Contents';
import { MULTI_DELETE_OPT_SEQ, LIST_NO_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import { debounce } from 'lodash';
import CursorStyled from '../CursorStyled';

const { Option } = Select;
const AntdTable = StyledAntdTable(Table);

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      isMultiDelete: false,
      isRowNo: false,
      searchType: '',
      searchText: '',
    };
    this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  componentDidMount = () => {
    const { workInfo } = this.props;
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

  handleOnRow = record => {
    const { handleModalVisible, changeFormData } = this.props;
    changeFormData('MsdsListMgt', 'selectedRowItemCode', record.ITEM_CD);
    changeFormData('MsdsListMgt', 'selectedRowTaskSeq', record.TASK_SEQ);
    handleModalVisible();
  };

  renderList = (group, groupIndex) => {
    const { listData, listSelectRowKeys } = this.props;
    const { isMultiDelete } = this.state;
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
          <CursorStyled>
            <AntdTable
              rowKey="TASK_SEQ"
              key={`${group.key}_list`}
              className="view-designer-list"
              columns={columns}
              dataSource={listData || []}
              rowSelection={rowSelection}
              onRow={(record, rowIndex) => ({
                onClick: event => this.handleOnRow(record),
              })}
            />
          </CursorStyled>
        </Group>
      </div>
    );
  };

  handleSearchSite = e => {
    const { sagaKey, changeSearchData } = this.props;
    const searchText = e.length > 1 ? `AND W.SITE LIKE '%${e}%'` : '';
    changeSearchData(sagaKey, 'andSearch_1', searchText);
  };

  onChangeHandler = searchType => {
    const { sagaKey, changeSearchData } = this.props;
    const { searchText } = this.state;
    this.setState({
      searchType,
    });
    const andSearch2 = searchText.length > 0 ? `AND ${searchType} LIKE '%${searchText}%'` : '';
    changeSearchData(sagaKey, 'andSearch_2', andSearch2);
  };

  handleOnChangeSearch = searchText => {
    const { sagaKey, changeSearchData } = this.props;
    const { searchType } = this.state;
    this.setState({
      searchText,
    });
    const andSearch2 = searchText.length > 0 ? `AND ${searchType} LIKE '%${searchText}%'` : '';
    changeSearchData(sagaKey, 'andSearch_2', andSearch2);
  };

  render = () => {
    const { sagaKey: id, viewLayer, workFlowConfig, loadingComplete, getListData, workSeq, removeMultiTask } = this.props;
    const { isMultiDelete } = this.state;

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
                            <tr className="view-designer-row row-1">
                              <td>
                                <Contents>
                                  <Select style={{ width: 120 }} defaultValue=" " onChange={this.handleSearchSite}>
                                    <Option key=" ">지역전체</Option>
                                    <Option key="526">청주</Option>
                                    <Option key="527">구미</Option>
                                  </Select>
                                  <Select defaultValue="W.MTRL_NM" style={{ width: 150 }} onChange={this.onChangeHandler}>
                                    <Option key="1" value="W.MTRL_NM">
                                      물질명
                                    </Option>
                                    <Option key="2" value="W.ITEM_NM">
                                      제품명
                                    </Option>
                                    <Option key="3" value="W.MOLECULAR_FORMULA">
                                      분자식
                                    </Option>
                                    <Option key="4" value="W.CAS_NO">
                                      CAS_NO
                                    </Option>
                                    <Option key="5" value="W.UN_NO">
                                      UN_NO
                                    </Option>
                                    <Option key="5" value="W.ITEM_CD">
                                      MSDS코드
                                    </Option>
                                    <Option key="6" value="Y.WRK_CMPNY_NM">
                                      Vendor
                                    </Option>
                                  </Select>
                                  <Input style={{ width: 150 }} onChange={e => this.handleOnChangeSearch(e.target.value)} />
                                </Contents>
                              </td>
                            </tr>
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
              {isMultiDelete && (
                <Popconfirm title="Are you sure delete this task?" onConfirm={() => removeMultiTask(id, id, -1, 'INPUT')} okText="Yes" cancelText="No">
                  <StyledButton className="btn-primary">Delete</StyledButton>
                </Popconfirm>
              )}
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

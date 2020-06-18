import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, Modal } from 'antd';

import { isJSON } from 'utils/helpers';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import GroupTitle from 'components/BizBuilder/Sketch/GroupTitle';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';
import { CompInfo } from 'components/BizBuilder/CompInfo';
import Contents from 'components/BizBuilder/Common/Contents';
import { MULTI_DELETE_OPT_SEQ, LIST_NO_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import { getExtraApiData } from 'apps/Workflow/User/Draft_Backup/DraftBase/actions';
import BizBuilderBase from 'components/BizBuilderBase';
import SearchComp from '../SearchComp';
import CustomViewPage from '../ViewPage';

const AntdTable = StyledAntdTable(Table);

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMultiDelete: false,
      isRowNo: false,
      searchBar: [],
      viewModalVisible: false,
      viewTaskSeq: -1,
    };
  }

  componentDidMount = () => {
    const { workInfo, getExtraApiData, sagaKey: id } = this.props;
    let isMultiDelete = false;
    let isRowNo = false;
    if (workInfo && workInfo.OPT_INFO) {
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_SEQ === MULTI_DELETE_OPT_SEQ && opt.ISUSED === 'Y') isMultiDelete = true;
        if (opt.OPT_SEQ === LIST_NO_OPT_SEQ && opt.ISUSED === 'Y') isRowNo = true;
      });
      this.setState({ isMultiDelete, isRowNo });
    }
    const apiArr = [
      {
        key: 'select_qual',
        type: 'GET',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=67',
      },
      {
        key: 'select_site',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 635 } },
      },
      {
        key: 'select_fab',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 638 } },
      },
      {
        key: 'select_area',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1048 } },
      },
      {
        key: 'item_26',
        type: 'GET',
        url: '/api/eshs/v1/common/EshsCmpnyList/null/null',
      },
    ];

    getExtraApiData(id, apiArr, this.handleAppStart);
  };

  handleAppStart = () => {
    const { sagaKey: id, changeSearchData, extraApiData, getListData, workSeq, getExtraApiData } = this.props;
    const SearchConfig = {
      SearchRow1: true,
      SearchRow2: true,
      SearchRow3: true,
    };
    const searchBar = [];
    searchBar.push(
      <SearchComp
        key={id}
        SearchConfig={SearchConfig}
        id={id}
        extraApiData={extraApiData}
        changeSearchData={changeSearchData}
        handleSearch={() => getListData(id, workSeq)}
        getExtraApiData={getExtraApiData}
      />,
    );
    this.setState({ searchBar });
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
          width: (node.style && node.style.width) || undefined,
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
            className="view-designer-list"
            columns={columns}
            dataSource={listData || []}
            rowSelection={rowSelection}
            onRow={record => ({
              onClick: event => this.handleViewModalVisible(record.TASK_SEQ),
            })}
          />
        </Group>
        <Modal title="장비 조회" visible={viewModalVisible} closable onCancel={() => this.handleViewModalVisible(-1)} width={1000} footer={null}>
          <div>{viewModalVisible && this.handleOnViewModal(viewTaskSeq)}</div>
        </Modal>
      </div>
    );
  };

  handleViewModalVisible = viewTaskSeq => {
    const { viewModalVisible } = this.state;

    this.setState({
      viewModalVisible: !viewModalVisible,
      viewTaskSeq,
    });
  };

  handleOnViewModal = viewTaskSeq => (
    <BizBuilderBase
      sagaKey="SqtbEquipMgtView"
      workSeq={4941}
      taskSeq={viewTaskSeq}
      viewType="VIEW"
      loadingComplete={this.loadingComplete}
      CustomViewPage={CustomViewPage}
    />
  );

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

    const { searchBar } = this.state;
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
                    <Contents>{searchBar}</Contents>
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
};

ListPage.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
};

export default ListPage;

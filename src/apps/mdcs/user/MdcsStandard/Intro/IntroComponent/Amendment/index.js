import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Table } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import * as DraftType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/draftconst';

const AntdTable = StyledLineTable(Table);

const columns = [
  {
    dataIndex: 'DOCNUMBER',
    title: '문서번호',
    align: 'center',
    width: '16%',
  },
  {
    dataIndex: 'VERSION',
    title: 'REV',
    align: 'center',
    width: '9%',
  },
  {
    dataIndex: 'TITLE',
    title: 'Title',
    ellipsis: true,
    width: '35%',
  },
  {
    dataIndex: 'REG_DEPT_NAME',
    title: '기안부서',
    align: 'center',
    width: '15%',
  },
  {
    dataIndex: 'REG_USER_NAME',
    title: '기안자',
    align: 'center',
    width: '12%',
  },
  {
    dataIndex: 'CHANGE',
    title: 'Change',
    align: 'center',
    width: '13%',
    render: text => (text === 27 ? 'MAJOR' : 'MINOR'),
  },
];
class Amendment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: undefined,
      revisionList: [],
      categoryList: [],
      templateList: [],
    };
  }

  initDataBind = id => {
    const {
      result: {
        categoryInfo: { categoryMapList: categoryList },
        docTemplateInfoByCategory: { list: templateList },
      },
    } = this.props;

    this.setState({
      categoryList,
      templateList,
    });
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.initDataBind);
  }

  onChangeSearchValue = e => {
    this.setState({ searchValue: e.target.value });
  };

  onInitDataBind = (id, response) => {
    const { revisionList } = response;
    this.setState({ revisionList });
  };

  onSearchRevisionData = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(sagaKey, 'POST', `/api/mdcs/v1/common/mdcsrevisionListHandler`, {}, this.onInitDataBind);
  };

  onSelectedWorkSeq = selectedNodeIds => {
    if (selectedNodeIds.includes(289)) {
      return 28;
    }
    if (selectedNodeIds.includes(423) || selectedNodeIds.includes(424) || selectedNodeIds.includes(425) || selectedNodeIds.includes(426)) {
      return 31;
    }
    return undefined;
  };

  onTableRowClick = (draftType, workSeq, taskSeq, nodeId, fullPath, change) => {
    const { onShowModal } = this.props;

    const fixed = false;
    const selectedNodeIds = fullPath
      .split('|')
      .slice(1)
      .map(item => Number(item));
    const viewChangeSeq = this.onSelectedWorkSeq(selectedNodeIds);
    const workPrcProps = {
      draftType,
      nodeIds: selectedNodeIds,
      degreeFlag: Number(change),
    };
    onShowModal(workSeq, taskSeq, viewChangeSeq, nodeId, 'REVISION', workPrcProps);
  };

  render() {
    console.debug(this.state);
    const { revisionList } = this.state;
    return (
      <>
        <li>
          <div className="label-txt">문서번호검색</div>
          <Input onChange={this.onChangeSearchValue} />
        </li>
        <div className="btn-wrap">
          <StyledButton className="btn-primary" onClick={this.onSearchRevisionData}>
            검색
          </StyledButton>
        </div>
        <AntdTable
          rowKey={({ TASK_SEQ, WORK_SEQ }) => `${TASK_SEQ}-${WORK_SEQ}`}
          columns={columns}
          dataSource={revisionList}
          onRow={record => ({
            onClick: () => this.onTableRowClick(DraftType.AMENDMENT, record.WORK_SEQ, record.TASK_SEQ, record.NODE_ID, record.FULLPATH, record.CHANGE),
          })}
        />
      </>
    );
  }
}

Amendment.propTypes = {
  apiArys: PropTypes.array,
};

Amendment.defaultProps = {
  apiArys: [
    {
      key: 'categoryInfo',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=1',
      type: 'GET',
      params: {},
    },
    {
      key: 'docTemplateInfoByCategory',
      url: '/api/mdcs/v1/common/DocCategoryTemplHandler',
      type: 'GET',
      params: {},
    },
    {
      key: 'docTemplateInfo',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=2',
      type: 'GET',
      params: {},
    },
  ],
};

export default Amendment;

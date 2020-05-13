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

/* DESC: 폐기 기안 */
class Abrogation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: undefined,
      revisionList: [],
    };
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
    const { searchValue } = this.state;
    submitHandlerBySaga(sagaKey, 'POST', `/api/mdcs/v1/common/mdcsrevisionListHandler`, { PARAM: { DOCNUMBER: searchValue || '' } }, this.onInitDataBind);
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
    const { revisionList } = this.state;
    return (
      <>
        <li>
          <div className="label-txt">문서번호검색</div>
          <Input onPressEnter={this.onSearchRevisionData} onChange={this.onChangeSearchValue} />
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
        {/*
    <li>
      <div className="label-txt">대분류</div>
      <Select placeholder="대분류(문서구분)" onChange={action.onChangeByStep1} value={values[0]}>
        {options[0]}
      </Select>
    </li>
    <li>
      <div className="label-txt">중분류</div>
      <Select placeholder="중분류" onChange={action.onChangeByStep2} value={values[1]}>
        {options[1]}
      </Select>
    </li>
    <li>
      <div className="label-txt">소분류</div>
      <Select placeholder="소분류(업무기능)" onChange={action.onChangeByStep3} value={values[2]}>
        {options[2]}
      </Select>
    </li>
    <li>
      <div className="label-txt">문서LEVEL</div>
      <Select placeholder="문서LEVEL/종류" onChange={action.onChangeByStep4} value={values[3]}>
        {options[3]}
      </Select>
    </li>
    */}
      </>
    );
  }
}
Abrogation.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  values: PropTypes.arrayOf(PropTypes.any),
  searchValue: PropTypes.string,
  action: PropTypes.shape({
    onChangeByStep1: PropTypes.func,
    onChangeByStep2: PropTypes.func,
    onChangeByStep3: PropTypes.func,
    onChangeByStep4: PropTypes.func,
    onChangeByStep: PropTypes.func,
    onSearchRevisionData: PropTypes.func,
    onChangeSearchValue: PropTypes.func,
  }),
};

Abrogation.defaultProps = {
  options: [],
  values: [],
  searchValue: '',
  action: {
    onChangeByStep1: () => {},
    onChangeByStep2: () => {},
    onChangeByStep3: () => {},
    onChangeByStep4: () => {},
    onChangeByStep: () => {},
    onSearchRevisionData: () => {},
    onChangeSearchValue: () => {},
  },
};

export default Abrogation;

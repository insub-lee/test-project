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
    let viewChangeSeq;
    if (selectedNodeIds.includes(2160)) {
      viewChangeSeq = 28;
    } else if (
      selectedNodeIds.includes(2434) ||
      selectedNodeIds.includes(2445) ||
      selectedNodeIds.includes(2456) ||
      selectedNodeIds.includes(2467) ||
      selectedNodeIds.includes(2478) ||
      selectedNodeIds.includes(2489) ||
      selectedNodeIds.includes(2500) ||
      selectedNodeIds.includes(2511) ||
      selectedNodeIds.includes(2522) ||
      selectedNodeIds.includes(2533) ||
      selectedNodeIds.includes(2544) ||
      selectedNodeIds.includes(2555) ||
      selectedNodeIds.includes(2566) ||
      selectedNodeIds.includes(2577) ||
      selectedNodeIds.includes(2587) ||
      selectedNodeIds.includes(2590)
    ) {
      viewChangeSeq = 31;
    } else {
      viewChangeSeq = undefined;
    }
    return viewChangeSeq;
  };

  onTableRowClick = (draftType, workSeq, taskSeq, taskOriginSeq, title, nodeId, fullPath, change) => {
    const { onShowModalAbrogation } = this.props;
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
    onShowModalAbrogation(workSeq, taskSeq, taskOriginSeq, title, viewChangeSeq, nodeId, 'REVISION', workPrcProps);
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
            onClick: () =>
              this.onTableRowClick(
                DraftType.ABROGATION,
                record.WORK_SEQ,
                record.TASK_SEQ,
                record.TASK_ORIGIN_SEQ,
                record.TITLE,
                record.NODE_ID,
                record.FULLPATH,
                record.CHANGE,
              ),
          })}
        />
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import * as DraftType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/draftconst';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import TaskTransfer from './TaskTransfer';

const { Option } = Select;

/* DESC: 폐기 기안 (일괄) */
class AbrogationMulti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: undefined,
      revisionList: [],
      sourceList: [],
      selectedList: [],
      selectedWorkSeq: 901,
    };
  }

  onChangeSearchValue = e => {
    this.setState({ searchValue: e.target.value });
  };

  onInitDataBind = (id, response) => {
    const { revisionList } = response;
    const { selectedList } = this.state;
    let sourceList = [];
    if (selectedList.length > 0) {
      sourceList = revisionList.map(item => {
        if (selectedList.findIndex(iNode => iNode.TASK_SEQ === item.TASK_SEQ) > -1) item.disabled = true;
        return item;
      });
    } else {
      sourceList = revisionList;
    }
    this.setState({ revisionList, sourceList });
  };

  onSearchRevisionData = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { searchValue, selectedWorkSeq } = this.state;
    submitHandlerBySaga(
      sagaKey,
      'POST',
      `/api/mdcs/v1/common/mdcsAbrogationMultiListHanlder`,
      { PARAM: { DOCNUMBER: searchValue || '', WORK_SEQ: selectedWorkSeq } },
      this.onInitDataBind,
    );
  };

  setSelectedList = (flag, list, removeCheck) => {
    this.setState(
      prevState => {
        const { selectedList, sourceList } = prevState;
        if (flag === 'ADD') {
          const tempSourceList = sourceList.map(item => {
            if (list.findIndex(iNode => iNode.TASK_SEQ === item.TASK_SEQ) > -1) item.disabled = true;
            return item;
          });
          return { selectedList: selectedList.concat(list), sourceList: tempSourceList };
        }
        const tempList = selectedList.reduce((resultList, currentRow) => {
          if (list.findIndex(iNode => iNode.TASK_SEQ === currentRow.TASK_SEQ) === -1) resultList.push(currentRow);
          return resultList;
        }, []);
        const tempSourceList = sourceList.map(item => {
          if (list.findIndex(iNode => iNode.TASK_SEQ === item.TASK_SEQ) > -1) item.disabled = false;
          return item;
        });
        return { selectedList: tempList, sourceList: tempSourceList };
      },
      () => removeCheck(flag),
    );
  };

  submitTask = () => {
    const { onShowAbrogationMulti } = this.props;
    const { selectedList } = this.state;
    const workPrcProps = {
      draftType: DraftType.ABROGATION,
      abrogationList: selectedList,
    };
    onShowAbrogationMulti(workPrcProps);
  };

  render() {
    const { sourceList, selectedList } = this.state;
    return (
      <>
        <li>
          <div className="label-txt">문서종류</div>
          <Select placeholder="문서종류" onChange={value => this.setState({ selectedWorkSeq: value })} defaultValue={901}>
            <Option value={901}>업무표준</Option>
            <Option value={1921}>기술표준</Option>
            <Option value={1881}>도면</Option>
            <Option value={2941}>TDS</Option>
            <Option value={2975}>NPI</Option>
            <Option value={3013}>Work Process</Option>
          </Select>
        </li>
        <li>
          <div className="label-txt">문서번호검색</div>
          <Input onPressEnter={this.onSearchRevisionData} onChange={this.onChangeSearchValue} />
        </li>
        <div className="btn-wrap">
          <StyledButton className="btn-primary" onClick={this.onSearchRevisionData}>
            검색
          </StyledButton>
        </div>
        <TaskTransfer sourceList={sourceList} selectedList={selectedList} setSelectedList={this.setSelectedList} submitTask={this.submitTask} />
      </>
    );
  }
}
AbrogationMulti.propTypes = {
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

AbrogationMulti.defaultProps = {
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

export default AbrogationMulti;

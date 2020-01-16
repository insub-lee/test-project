import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Radio, Table, Spin } from 'antd';
import draftImg1 from 'apps/mdcs/images/draft_img1.png';
import message from 'components/Feedback/message';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import * as DraftType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/draftconst';
import * as ModifyType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/modifyconst';
import StyledInputView from 'apps/mdcs/components/BizBuilderBase/viewComponent/InputPage/Styled';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledContents from '../../../../styled/StyledContents';
import StyledButton from '../../../../styled/StyledButton';
import StyledModalWrapper from '../../../../styled/Modals/StyledModalWrapper';

import StdView from '../StdView';
import StdInput from '../StdInput';
import Enactment from './Enactment';
import Amendment from './Amendment';
import Abrogation from './Abrogation';
import AbrogationMulti from './AbrogationMulti';
import TransferView from './AbrogationMulti/TransferView';

const { Option } = Select;
const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledAntdTable(Table);

const columns = [
  {
    dataIndex: 'DOCNUMBER',
    title: '문서번호',
    align: 'center',
    width: '15%',
  },
  {
    dataIndex: 'VERSION',
    title: 'REV',
    align: 'center',
    width: '10%',
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
    width: '15%',
  },
  {
    dataIndex: 'CHANGE',
    title: 'Change',
    align: 'center',
    width: '10%',
    render: text => (text === 88 ? 'MAJOR' : 'MINOR'),
  },
];

class IntroComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optAry2: [],
      optAry3: [],
      optAry4: [],
      selectedValue1: undefined,
      selectedValue2: undefined,
      selectedValue3: undefined,
      selectedValue4: undefined,
      selectedComponent: undefined,
      isShow: false,
      selectedDraft: DraftType.ENACTMENT,
      docNumber: ['M', '', '', '', '-', ''],
      searchValue: '',
      taskSeq: -1,
      workSeq: -1,
      targetTasks: [],
      viewType: 'INPUT',
      fullPathInfo: [],
      isLoading: true,
      revisionType: 'MAJOR',
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHanlder, apiArys } = this.props;
    getCallDataHanlder(id, apiArys);
  }

  componentWillUnmount() {
    this.resetState();
  }

  resetState = (selectedDraft = DraftType.ENACTMENT, viewType = 'INPUT', searchValue = '', targetTasks = []) => {
    this.setState({
      optAry2: [],
      optAry3: [],
      optAry4: [],
      selectedValue1: undefined,
      selectedValue2: undefined,
      selectedValue3: undefined,
      selectedValue4: undefined,
      selectedComponent: undefined,
      isShow: false,
      selectedDraft,
      docNumber: ['M', '', '', '', '-', ''],
      searchValue,
      taskSeq: -1,
      workSeq: -1,
      targetTasks,
      viewType,
      fullPathInfo: [],
      isLoading: true,
      revisionType: 'MAJOR',
    });
  };

  onMakeDocNumber = (position, replaceValue, result, callback = () => {}) => {
    /* Check Index */

    // const selectedDocInfo = result.categoryInfo.categoryMapList.filter(cate => cate.NODE_ID === replaceValue)
    //   ? result.categoryInfo.categoryMapList.filter(cate => cate.NODE_ID === replaceValue)[0]
    //   : undefined;

    this.setState(
      prevState => {
        const { docNumber } = prevState;

        const selectedDocIndex = result.categoryInfo.categoryMapList.findIndex(cate => cate.NODE_ID === replaceValue);
        const selectedDocInfo = selectedDocIndex > -1 ? result.categoryInfo.categoryMapList[selectedDocIndex] : undefined;
        docNumber.splice(position, 1, selectedDocInfo && selectedDocInfo.CODE);
        return {
          docNumber,
        };
      },
      () => {
        callback();
      },
    );
    // return docNumber;
  };

  onChangeByStep1 = value => {
    const { result } = this.props;
    const { categoryMapList } = result.categoryInfo;
    this.onMakeDocNumber(1, value, result);
    this.setState({
      selectedValue1: value === 'all' ? undefined : value,
      selectedValue2: undefined,
      selectedValue3: undefined,
      selectedValue4: undefined,
      optAry2: categoryMapList
        .filter(item => item.PARENT_NODE_ID === value)
        .map(x => (
          <Option key={x.NODE_ID} value={x.NODE_ID}>
            {x.NAME_KOR}
          </Option>
        )),
    });
  };

  onChangeByStep2 = value => {
    const { result } = this.props;
    const { categoryMapList } = result.categoryInfo;
    this.onMakeDocNumber(2, value, result);
    this.setState({
      selectedValue2: value,
      selectedValue3: undefined,
      selectedValue4: undefined,
      optAry3: categoryMapList
        .filter(item => item.PARENT_NODE_ID === value)
        .map(x => (
          <Option key={x.NODE_ID} value={x.NODE_ID}>
            {x.NAME_KOR}
          </Option>
        )),
    });
  };

  onChangeByStep3 = value => {
    const { result } = this.props;
    const { categoryMapList } = result.categoryInfo;
    this.onMakeDocNumber(3, value, result);
    this.setState({
      selectedValue3: value,
      selectedValue4: undefined,
      optAry4: categoryMapList
        .filter(item => item.PARENT_NODE_ID === value)
        .map(x => (
          <Option key={x.NODE_ID} value={x.NODE_ID}>
            {x.NAME_KOR}
          </Option>
        )),
    });
  };

  findDocs = (listItem, aryNodesIds) => {
    const node = aryNodesIds.filter(nodeId => listItem.CATEGORYNODEID.toString() === nodeId);
    return node.length > 0 ? listItem : false;
  };

  onChangeByStep4 = value => {
    const { result } = this.props;
    const { getDocNumber } = this;
    // const { categoryMapList } = result.categoryInfo;
    this.onMakeDocNumber(5, value, result, () => getDocNumber(value));
  };

  getDocNumber = value => {
    const { docNumber } = this.state;
    const { result } = this.props;
    const { categoryMapList } = result.categoryInfo;

    const selectedItem = categoryMapList.filter(item => item.NODE_ID === value);
    let fullPath = '';
    if (selectedItem && selectedItem.length > 0) {
      fullPath = selectedItem[0].FULLPATH;
    }

    const aryNodeIds = fullPath.split('|');

    // 관련카테고리 Find하기
    const { docTemplateInfoByCategory } = result;

    console.debug('@@@', docTemplateInfoByCategory);
    const list = docTemplateInfoByCategory ? docTemplateInfoByCategory.list || [] : [];

    // filter selectedCategorys
    const selectedCategorys = list
      .filter(category => aryNodeIds.includes(category.CATEGORYNODEID.toString()))
      .sort((a, b) => {
        if (a.LVL > b.LVL) return -1;
        if (a.LVL < b.LVL) return 1;
        return 0;
      });

    // list.some(category => {
    //   const result = aryNodeIds.includes(category.CATEGORYFULLPATH.split('|').pop());
    //   if (result) selectedCategorys
    //   return result;
    // });

    // CATEGORYFULLPATH

    // const selectedCategorys =
    //   docTemplateInfoByCategory &&
    //   docTemplateInfoByCategory.list &&
    //   docTemplateInfoByCategory.list.filter(category => {
    //     const fidx = aryNodeIds.findIndex(nodeId => nodeId === category.CATEGORYNODEID.toString());
    //     return fidx !== -1;
    //   });

    const selectedCategory = selectedCategorys.shift();

    // const selectedCategory = selectedCategorys && selectedCategorys.length > 0 && selectedCategorys[0];

    console.debug('@@@@', aryNodeIds, selectedCategorys, selectedCategory);

    const { sagaKey: id, getCallDataHanlder, apiArys } = this.props;

    apiArys.push({
      key: 'docNum',
      url: `/api/mdcs/v1/common/DocNumberHanlder/${docNumber.join('')}`,
      type: 'GET',
      params: {},
    });

    getCallDataHanlder(id, apiArys);

    const fullPathArr = [];
    fullPathArr.push(this.state.selectedValue1);
    fullPathArr.push(this.state.selectedValue2);
    fullPathArr.push(this.state.selectedValue3);
    fullPathArr.push(value);

    this.setState({
      selectedValue4: value,
      selectedComponent: selectedCategory,
      fullPathInfo: fullPathArr,
    });
  };

  onModalShow = () => {
    if (!this.state.selectedValue1) {
      window.alert('대분류를 선택하세요');
    } else if (!this.state.selectedValue2) {
      window.alert('중분류를 선택하세요');
    } else if (!this.state.selectedValue3) {
      window.alert('소분류를 선택하세요');
    } else if (!this.state.selectedValue4) {
      window.alert('문서LEVEL을 선택하세요');
    } else {
      this.setState({
        isShow: true,
      });
    }
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  onCloseModal = () => {
    const { selectedDraft, searchValue, viewType, targetTasks } = this.state;
    this.resetState(selectedDraft, viewType, searchValue, targetTasks);
  };

  onCompleteCloseModal = () => {
    message.success('Save Complete', 1);
    this.setState(prevState => ({
      optAry2: [],
      optAry3: [],
      optAry4: [],
      selectedValue1: undefined,
      selectedValue2: undefined,
      selectedValue3: undefined,
      selectedValue4: undefined,
      selectedComponent: undefined,
      isShow: false,
      selectedDraft: prevState.selectedDraft,
      docNumber: ['M', '', '', '', '-', ''],
      isLoading: true,
    }));
  };

  getNodeIds = () => {
    const { workSeq, taskSeq } = this.state;
    const payload = {
      PARAM: {
        WORK_SEQ: workSeq,
        TASK_SEQ: taskSeq,
        PARENT_DRAFT_PRC_ID: 0,
      },
    };
    const { getCallDataHanlder, sagaKey: id } = this.props;
    const searchApi = [
      {
        key: 'nodeIdsInfo',
        url: '/api/workflow/v1/common/workprocess/draftprocresult',
        type: 'POST',
        params: payload,
      },
    ];
    getCallDataHanlder(id, searchApi);
    this.setState({ isShow: true });
  };

  onShowDocTemplate = () => {
    const { selectedComponent, taskSeq, workSeq, viewType, selectedDraft, fullPathInfo, selectedValue4, revisionType } = this.state;
    const {
      result: { docNum, nodeIdsInfo = { procResult: { DRAFT_DATA: '{}' } } },
    } = this.props;
    const docType = selectedComponent && selectedComponent.DOCTEMPLATECODE;
    const docNumber = docNum && docNum.docNumber;

    let workPrcProps = {
      draftType: selectedDraft,
      nodeIds: fullPathInfo,
      degreeFlag: ModifyType.MAJOR,
    };

    let workSeqGoal = workSeq;

    if ([DraftType.ENACTMENT].includes(selectedDraft)) {
      switch (docType) {
        case 'BS':
          workSeqGoal = 201;
          break;
        case 'TS':
          workSeqGoal = 361;
          break;
        case 'DW':
          workSeqGoal = 423;
          break;
        case 'PM':
          workSeqGoal = 461;
          break;
        default:
          workSeqGoal = 201;
          break;
      }
    }

    // Todo - get nodeIds Info
    if ([DraftType.AMENDMENT].includes(selectedDraft)) {
      const procResult = nodeIdsInfo.procResult || { DRAFT_DATA: '{}' };
      const draftData = procResult.DRAFT_DATA || '{}';
      const jsonDraftData = JSON.parse(draftData);
      console.debug('@ Json Draft Data : ', jsonDraftData);
      if (Object.keys(jsonDraftData).length > 2) {
        workPrcProps = jsonDraftData;
      } else {
        return null;
      }
    }

    // Todo - 폐기 기안
    if ([DraftType.ABROGATION].includes(selectedDraft)) {
    }

    // Todo - 폐기 일괄
    if (['ABROGATION_MULTI'].includes(selectedDraft)) {
    }

    return (
      <BizBuilderBase
        sagaKey={`BizDoc_${workSeqGoal}`}
        workSeq={workSeqGoal}
        compProps={{ docNumber, NODE_ID: selectedValue4, onCloseModleHandler: this.onCompleteCloseModal }}
        CustomInputPage={StdInput}
        CustomViewPage={StdView}
        taskSeq={taskSeq}
        workPrcProps={workPrcProps}
        viewType={viewType}
        loadingComplete={this.loadingComplete}
        onCloseModal={this.onCloseModal}
        revisionType={revisionType}
      />
    );
  };

  onSearchRevisionData = () => {
    const selectedNodeId = this.getSelectedNodeId();
    const { getCallDataHanlder, sagaKey: id } = this.props;
    const { searchValue } = this.state;

    const searchApi = [
      {
        key: 'listData',
        url: '/api/mdcs/v1/common/MdcsStandard/search',
        type: 'POST',
        params: { nodeIdList: [selectedNodeId || null], docNo: searchValue },
      },
    ];
    getCallDataHanlder(id, searchApi);
  };

  onClickRevision = (taskSeq, nodeId) => {
    const { categoryInfo, docTemplateInfoByCategory, docTemplateInfo } = this.props.result;
    const myInfo = categoryInfo.categoryMapList.filter(cInfo => cInfo.NODE_ID === nodeId);
    const aryNodeIds = myInfo && myInfo.length > 0 && myInfo[0].FULLPATH.split('|');
    const aryDocs = docTemplateInfoByCategory.list.filter(listItem => this.findDocs(listItem, aryNodeIds));
    const selectedTemplate = this.selectedTemplate(aryDocs, categoryInfo.categoryMapList, docTemplateInfo.categoryMapList);
    this.setState({
      isShow: true,
      selectedComponent: selectedTemplate,
      taskSeq,
    });
  };

  onChangeDraft = e => {
    const { value } = e.target;
    const { resetCalledData, sagaKey: id } = this.props;
    // Reset Called Data
    resetCalledData(id);
    switch (value) {
      case DraftType.ENACTMENT:
        this.resetState(value, 'INPUT');
        break;
      case DraftType.AMENDMENT:
        // this.resetState(value, 'MODIFY');
        this.resetState(value, 'REVISION');
        break;
      case DraftType.ABROGATION:
        this.resetState(value, 'VIEW');
        break;
      case 'ABROGATION_MULTI':
        this.resetState(value, 'VIEW');
        break;
      default:
        break;
    }
  };

  getFDepth = () => {
    const { result } = this.props;
    return (
      result &&
      result.categoryInfo &&
      result.categoryInfo.categoryMapList &&
      result.categoryInfo.categoryMapList
        .filter(item => item.LVL === 1)
        .map(x => (
          <Option key={x.NODE_ID} value={x.NODE_ID}>
            {x.NAME_KOR}
          </Option>
        ))
    );
  };

  onChangeSearchValue = e => {
    this.setState({ searchValue: e.target.value });
  };

  getSelectedNodeId = () => {
    const { selectedValue1, selectedValue2, selectedValue3, selectedValue4 } = this.state;
    return selectedValue4 || selectedValue3 || selectedValue2 || selectedValue1;
  };

  onClickAbrogationMulti = (tasks = []) => {
    // Todo - open abrogation multi modal
    if (tasks.length > 0) {
      // Todo - 흠......
    }
  };

  setView = (id, workSeq, newTaskSeq, viewType) => {
    console.debug(id, workSeq, newTaskSeq, viewType);
  };

  onTableRowClick = (selectedDraft, taskSeq, workSeq, revisionType) => {
    const { getNodeIds } = this;
    this.setState({ taskSeq, workSeq, revisionType }, () => getNodeIds());
    // const { revisionTask } = this.props;
    // const revisionInfo = {
    //   id: `BizDoc_${workSeq}`,
    //   workSeq,
    //   taskSeq,
    //   viewType: 'REVISION',
    //   revisionType,
    //   // callbackFunc: this.setView,
    // };

    // this.setState({ revisionInfo });
    // console.debug('@@ payload', payload, revisionTask);
    // revisionTask(payload);
  };

  onChangeTargetTasks = targetTasks => {
    this.setState({ targetTasks });
  };

  submitMultiKeys = () => {
    const { targetTasks } = this.state;
    const tasks = targetTasks.map(tasksStr => {
      const stringArray = tasksStr.split('-');
      return {
        taskSeq: Number(stringArray[0]),
        workSeq: Number(stringArray[1]),
      };
    });
    console.debug('target tasks', tasks);
  };

  render() {
    const { result } = this.props;
    const {
      selectedValue1,
      selectedValue2,
      selectedValue3,
      selectedValue4,
      selectedDraft,
      searchValue,
      optAry2,
      optAry3,
      optAry4,
      isShow,
      targetTasks,
      isLoading,
    } = this.state;
    const { listData = {} } = result;
    const listDataArr = listData.arr || [];

    const action = {
      onChangeByStep1: this.onChangeByStep1,
      onChangeByStep2: this.onChangeByStep2,
      onChangeByStep3: this.onChangeByStep3,
      onChangeByStep4: this.onChangeByStep4,
      onSearchRevisionData: this.onSearchRevisionData,
      onChangeSearchValue: this.onChangeSearchValue,
    };

    const options = [this.getFDepth(), optAry2, optAry3, optAry4];
    const values = [selectedValue1, selectedValue2, selectedValue3, selectedValue4];
    return (
      <StyledContents>
        <div className="contentWrapper">
          <div className="contentGrid">
            <div className="grid2">
              <div className="subFlow">
                <dl>
                  <dt>사내 표준 기안 Flow</dt>
                  <dd>
                    <img src={draftImg1} alt="사내 표준 기안 Flow" /> * 문의사항 발생시 표준관리실로 문의하시기 바랍니다.
                    <br /> MDCS 총괄 박영미 (청주)4951
                  </dd>
                </dl>
              </div>
            </div>
            <div className="grid4 last">
              <div className="con-tit">
                <span>기안</span>
              </div>
              <div className="con-body">
                <ul>
                  <li>
                    <div className="label-txt">기안구분</div>
                    <Radio.Group value={selectedDraft} onChange={this.onChangeDraft}>
                      <Radio value={DraftType.ENACTMENT}>제정기안</Radio>
                      <Radio value={DraftType.AMENDMENT}>개정기안</Radio>
                      <Radio value={DraftType.ABROGATION}>폐기기안(일반)</Radio>
                      <Radio value="ABROGATION_MULTI">폐기기안(일괄)</Radio>
                    </Radio.Group>
                  </li>
                  {selectedDraft === DraftType.ENACTMENT && <Enactment options={options} values={values} action={action} />}
                  {selectedDraft === DraftType.AMENDMENT && <Amendment options={options} values={values} searchValue={searchValue} action={action} />}
                  {selectedDraft === DraftType.ABROGATION && <Abrogation options={options} values={values} searchValue={searchValue} action={action} />}
                  {selectedDraft === 'ABROGATION_MULTI' && <AbrogationMulti options={options} values={values} searchValue={searchValue} action={action} />}
                </ul>
                <div className="btn-wrap">
                  {[DraftType.ENACTMENT].includes(selectedDraft) && (
                    <StyledButton className="btn-primary btn-first" onClick={this.onModalShow}>
                      선택완료
                    </StyledButton>
                  )}
                  {[DraftType.AMENDMENT, DraftType.ABROGATION, 'ABROGATION_MULTI'].includes(selectedDraft) && (
                    <StyledButton className="btn-primary" onClick={this.onSearchRevisionData}>
                      검색
                    </StyledButton>
                  )}
                  {[DraftType.ENACTMENT].includes(selectedDraft) && (
                    <StyledButton className="btn-light" onClick={() => this.resetState()}>
                      다시선택
                    </StyledButton>
                  )}
                </div>
                {/* 개정기안 / 폐기기안(일반) */}
                {[DraftType.AMENDMENT, DraftType.ABROGATION].includes(selectedDraft) && (
                  <AntdTable
                    rowKey={({ TASK_SEQ, WORK_SEQ }) => `${TASK_SEQ}-${WORK_SEQ}`}
                    columns={columns}
                    dataSource={listDataArr}
                    onRow={record => ({
                      onClick: () => this.onTableRowClick(selectedDraft, record.TASK_SEQ, record.WORK_SEQ, record.CHANGE === 88 ? 'MAJOR' : 'MINOR'),
                    })}
                  />
                )}
                {/* 폐기기안(일괄) */}
                {['ABROGATION_MULTI'].includes(selectedDraft) && (
                  <TransferView
                    dataSource={listDataArr.map(row => ({ ...row, key: `${row.TASK_SEQ}-${row.WORK_SEQ}` }))}
                    targetKeys={targetTasks}
                    setTargetKeys={this.onChangeTargetTasks}
                    submitKeys={this.submitMultiKeys}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <AntdModal destroyOnClose style={{ top: '50px' }} width={900} visible={isShow} onCancel={this.onCloseModal} footer={null} maskClosable={false}>
          <StyledInputView>
            <div className="pop_tit">업무표준</div>
            <div style={{ display: isLoading ? 'block' : 'none' }}>
              <Spin tip="Loading...">
                <div style={{ height: '300px' }} />
              </Spin>
            </div>
            <div style={{ display: !isLoading ? 'block' : 'none' }}>{isShow && this.onShowDocTemplate()}</div>
          </StyledInputView>
        </AntdModal>
      </StyledContents>
    );
  }
}

IntroComponent.propTypes = {
  sagaKey: PropTypes.string.isRequired,
  apiArys: PropTypes.array,
  categoryInfo: PropTypes.array,
  categoryMapList: PropTypes.object,
  getCallDataHanlder: PropTypes.func,
  resetCalledData: PropTypes.func,
  result: PropTypes.shape({
    docNum: PropTypes.shape({
      docNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    docTemplateInfo: PropTypes.shape({
      categoryMapList: PropTypes.arrayOf(PropTypes.object),
    }),
    docTemplateInfoByCategory: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
    }),
    categoryInfo: PropTypes.shape({
      categoryMapList: PropTypes.arrayOf(PropTypes.object),
    }),
    listData: PropTypes.shape({
      arr: PropTypes.arrayOf(PropTypes.object),
    }),
    nodeIdsInfo: PropTypes.shape({
      procResult: PropTypes.shape({
        DRAFT_DATA: PropTypes.string,
      }),
    }),
  }),
};

IntroComponent.defaultProps = {
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
  categoryInfo: [],
  categoryMapList: {},
  getCallDataHanlder: () => false,
  resetCalledData: () => false,
  result: {
    docNumber: {},
    docTemplateInfo: {
      categoryMapList: [],
    },
    docTemplateInfoByCategory: {
      list: [],
    },
    categoryInfo: {
      categoryMapList: [],
    },
    listData: {
      arr: [],
    },
    nodeIdsInfo: {
      procResult: {
        DRAFT_DATA: '{}',
      },
    },
  },
};

export default IntroComponent;

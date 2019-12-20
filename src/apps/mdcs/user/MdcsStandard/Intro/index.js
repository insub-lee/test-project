import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Radio, Input, Table, Spin } from 'antd';
import draftImg1 from 'apps/mdcs/images/draft_img1.png';
import message from 'components/Feedback/message';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import * as DraftType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/draftconst';
import StyledInputView from 'apps/mdcs/components/BizBuilderBase/viewComponent/InputPage/Styled';
import BizBuilderBase from 'components/BizBuilderBase';
import BizMicroDevBase from 'components/BizMicroDevBase';

import StyledContents from '../../../styled/StyledContents';
import StyledButton from '../../../styled/StyledButton';
import StyledModalWrapper from '../../../styled/Modals/StyledModalWrapper';

import DwDoc from '../DwDoc';
import PmDoc from '../PmDoc';
import BizDoc from '../BizDoc';
import TechDoc from '../TechDoc';

import StdView from './StdView';
import StdInput from './StdInput';

const { Option } = Select;
const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledAntdTable(Table);

class IntroComponent extends Component {
  state = {
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
    viewType: 'INPUT',
    fullPathInfo: [],
    isLoading: true,
  };

  componentDidMount() {
    const { id, getCallDataHanlder, apiArys } = this.props;
    getCallDataHanlder(id, apiArys);
  }

  onMakeDocNumber = (position, replaceValue, result) => {
    const { docNumber } = this.state;
    const selectedDocInfo = result.categoryInfo.categoryMapList.filter(cate => cate.NODE_ID === replaceValue)
      ? result.categoryInfo.categoryMapList.filter(cate => cate.NODE_ID === replaceValue)[0]
      : undefined;
    docNumber.splice(position, 1, selectedDocInfo && selectedDocInfo.CODE);
    this.setState({
      docNumber,
    });
    return docNumber;
  };

  onChangeByStep1 = (value, result) => {
    this.onMakeDocNumber(1, value, result);
    this.setState({
      selectedValue1: value,
      selectedValue2: undefined,
      selectedValue3: undefined,
      selectedValue4: undefined,
      optAry2: result.categoryInfo.categoryMapList
        .filter(item => item.PARENT_NODE_ID === value)
        .map(x => (
          <Option key={x.NODE_ID} value={x.NODE_ID}>
            {x.NAME_KOR}
          </Option>
        )),
    });
  };

  onChangeByStep2 = (value, result) => {
    this.onMakeDocNumber(2, value, result);
    this.setState({
      selectedValue2: value,
      selectedValue3: undefined,
      selectedValue4: undefined,
      optAry3: result.categoryInfo.categoryMapList
        .filter(item => item.PARENT_NODE_ID === value)
        .map(x => (
          <Option key={x.NODE_ID} value={x.NODE_ID}>
            {x.NAME_KOR}
          </Option>
        )),
    });
  };

  onChangeByStep3 = (value, result) => {
    this.onMakeDocNumber(3, value, result);
    this.setState({
      selectedValue3: value,
      selectedValue4: undefined,
      optAry4: result.categoryInfo.categoryMapList
        .filter(item => item.PARENT_NODE_ID === value)
        .map(x => (
          <Option key={x.NODE_ID} value={x.NODE_ID}>
            {x.NAME_KOR}
          </Option>
        )),
    });
  };

  findDocs = (listItem, aryNodesIds) => {
    const node = aryNodesIds.filter(_node => listItem.CATEGORYNODEID.toString() === _node);
    return node.length > 0 ? listItem : false;
  };

  onChangeByStep4 = (value, result) => {
    const docNumber = this.onMakeDocNumber(5, value, result);
    const selectedItem =
      result && result.categoryInfo && result.categoryInfo.categoryMapList && result.categoryInfo.categoryMapList.filter(item => item.NODE_ID === value);
    let fullPath = '';
    if (selectedItem && selectedItem.length > 0) {
      fullPath = selectedItem[0].FULLPATH;
    }

    const aryNodeIds = fullPath.split('|');

    // 관련카테고리 Find하기
    const { docTemplateInfoByCategory } = result;
    const selectedCategorys =
      docTemplateInfoByCategory &&
      docTemplateInfoByCategory.list &&
      docTemplateInfoByCategory.list.filter(category => {
        const fidx = aryNodeIds.findIndex(nodeId => nodeId === category.CATEGORYNODEID.toString());
        return fidx !== -1;
      });

    console.debug('selectedCategorys', selectedCategorys);
    selectedCategorys &&
      selectedCategorys.sort((a, b) => {
        if (a.LVL > b.LVL) {
          return -1;
        }
        if (a.LVL < b.LVL) {
          return 1;
        }
        return 0;
      });

    const selectedCategory = selectedCategorys && selectedCategorys.length > 0 && selectedCategorys[0];

    const { id, getCallDataHanlder, apiArys } = this.props;
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
      selectedFullPath: fullPath,
      selectedComponent: selectedCategory,
      // fullPathInfo: fullPath.split('|'),
      fullPathInfo: fullPathArr,
    });
  };

  onModalShow = () => {
    if (this.state.selectedValue1 === undefined) {
      window.alert('대분류를 선택하세요');
    } else if (this.state.selectedValue2 === undefined) {
      window.alert('중분류를 선택하세요');
    } else if (this.state.selectedValue3 === undefined) {
      window.alert('소분류를 선택하세요');
    } else if (this.state.selectedValue4 === undefined) {
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
      selectedDraft: 1,
      searchValue: '',
      selectedDraft: prevState.selectedDraft,
      docNumber: ['M', '', '', '', '-', ''],
      taskSeq: -1,
      isLoading: true,
    }));
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

  onShowDocTemplate = (doctype, docNumber, taskSeq, viewType) => {
    const workPrcProps = {
      draftType: this.state.selectedDraft,
      nodeIds: this.state.fullPathInfo,
      degreeFlag: 88,
    };

    console.debug(doctype, docNumber, taskSeq, viewType);

    let workSeq = -1;
    switch (doctype) {
      case 'BS':
        workSeq = 201;
        break;
      default:
        workSeq = 201;
    }
    return (
      <BizBuilderBase
        id="BizDoc"
        workSeq={201}
        compProps={{ docNumber, NODE_ID: this.state.selectedValue4, onCloseModleHandler: this.onCompleteCloseModal }}
        CustomInputPage={StdInput}
        CustomViewPage={StdView}
        taskSeq={taskSeq}
        workPrcProps={workPrcProps}
        viewType={viewType}
        loadingComplete={this.loadingComplete}
        onCloseModal={this.onCloseModal}
      />
    );
  };

  onSearchRevisionData = selectedNodeId => {
    const { getCallDataHanlder, id } = this.props;
    const { searchValue } = this.state;

    const searchApi = [
      {
        key: 'listData',
        url: '/api/mdcs/v1/common/MdcsStandard/search',
        type: 'POST',
        params: { nodeIdList: [selectedNodeId || null], docNo: this.state.searchValue },
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

    switch (value) {
      case DraftType.ENACTMENT:
        this.setState({ viewType: 'INPUT' });
        break;
      case DraftType.AMENDMENT:
        this.setState({ viewType: 'MODIFY' });
        break;
      case DraftType.ABROGATION:
        this.setState({ viewType: 'VIEW' });
        break;
      default:
        break;
    }
    this.setState({ selectedDraft: value });
  };

  render() {
    const { result } = this.props;
    const { selectedValue1, selectedValue2, selectedValue3, selectedValue4, isLoading } = this.state;
    const _fDepth =
      result &&
      result.categoryInfo &&
      result.categoryInfo.categoryMapList &&
      result.categoryInfo.categoryMapList
        .filter(item => item.LVL === 1)
        .map(x => (
          <Option key={x.NODE_ID} value={x.NODE_ID}>
            {x.NAME_KOR}
          </Option>
        ));

    const { docNum } = result;
    const selectedNodeId =
      (selectedValue4 !== undefined && selectedValue4) ||
      (selectedValue3 !== undefined && selectedValue3) ||
      (selectedValue2 !== undefined && selectedValue2) ||
      (selectedValue1 !== undefined && selectedValue1);

    const columData = [
      {
        dataIndex: 'id',
        title: '문서번호',
        render: (text, record) => <a onClick={() => this.onClickRevision(record.taskSeq, record.nodeId)}>{text}</a>,
      },
      {
        dataIndex: 'rev',
        title: 'REV',
        render: (text, record) => <a onClick={() => this.onClickRevision(record.taskSeq, record.nodeId)}>{text && text.split('.')[0]}</a>,
      },
      {
        dataIndex: 'title',
        title: 'Title',
        render: (text, record) => <a onClick={() => this.onClickRevision(record.taskSeq, record.nodeId)}>{text}</a>,
      },
      {
        dataIndex: 'deptName',
        title: '기안부서',
        render: (text, record) => <a onClick={() => this.onClickRevision(record.taskSeq, record.nodeId)}>{text}</a>,
      },
      {
        dataIndex: 'name',
        title: '기안자',
        render: (text, record) => <a onClick={() => this.onClickRevision(record.taskSeq, record.nodeId)}>{text}</a>,
      },
      {
        dataIndex: 'change',
        title: 'Change',
        render: (text, record) => <a onClick={() => this.onClickRevision(record.taskSeq, record.nodeId)}>{text === 88 ? 'Major' : 'Minor'}</a>,
      },
    ];
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
                    <Radio.Group value={this.state.selectedDraft} onChange={e => this.onChangeDraft(e)}>
                      <Radio value={DraftType.ENACTMENT}>제정기안</Radio>
                      <Radio value={DraftType.AMENDMENT}>개정기안</Radio>
                      <Radio value={DraftType.ABROGATION}>폐기기안(일반)</Radio>
                      <Radio value={4}>폐기기안(일괄)</Radio>
                    </Radio.Group>
                  </li>
                  {this.state.selectedDraft === DraftType.AMENDMENT && (
                    <li>
                      <div className="label-txt">문서번호검색</div>
                      <Input
                        onPressEnter={() => this.onSearchRevisionData(selectedNodeId)}
                        value={this.state.searchValue}
                        onChange={e => this.setState({ searchValue: e.target.value })}
                      ></Input>
                    </li>
                  )}
                  <li>
                    <div className="label-txt">대분류</div>
                    <Select placeholder="대분류(문서구분)" onChange={e => this.onChangeByStep1(e, result)} value={this.state.selectedValue1}>
                      {_fDepth}
                    </Select>
                  </li>
                  <li>
                    <div className="label-txt">중분류</div>
                    <Select placeholder="중분류" onChange={e => this.onChangeByStep2(e, result)} value={this.state.selectedValue2}>
                      {this.state.optAry2}
                    </Select>
                  </li>
                  <li>
                    <div className="label-txt">소분류</div>
                    <Select placeholder="소분류(업무기능)" onChange={e => this.onChangeByStep3(e, result)} value={this.state.selectedValue3}>
                      {this.state.optAry3}
                    </Select>
                  </li>
                  <li>
                    <div className="label-txt">문서LEVEL</div>
                    <Select placeholder="문서LEVEL/종류" onChange={e => this.onChangeByStep4(e, result)} value={this.state.selectedValue4}>
                      {this.state.optAry4}
                    </Select>
                  </li>
                </ul>
                <div className="btn-wrap">
                  {this.state.selectedDraft !== DraftType.AMENDMENT && (
                    <StyledButton className="btn-primary btn-first" onClick={() => this.onModalShow()}>
                      선택완료
                    </StyledButton>
                  )}
                  {this.state.selectedDraft === DraftType.AMENDMENT && (
                    <StyledButton className="btn-primary btn-first" onClick={() => this.onSearchRevisionData(selectedNodeId)}>
                      선택완료
                    </StyledButton>
                  )}
                  <StyledButton className="btn-light">다시선택</StyledButton>
                </div>
                {this.state.selectedDraft === DraftType.AMENDMENT && result && result.listData && (
                  <AntdTable columns={columData} dataSource={result.listData.arr || []}></AntdTable>
                )}
              </div>
            </div>
          </div>
        </div>

        <AntdModal
          destroyOnClose
          style={{ top: '50px' }}
          width={1200}
          visible={this.state.isShow}
          onCancel={() => this.onCloseModal()}
          footer={null}
          maskClosable={false}
        >
          <StyledInputView>
            <div className="pop_tit">업무표준</div>
            <div style={{ display: this.state.isLoading ? '' : 'none' }}>
              <Spin tip="Loading...">
                <div style={{ height: '300px' }} />
              </Spin>
            </div>
            <div style={{ display: !this.state.isLoading ? '' : 'none' }}>
              {this.state.isShow &&
                this.onShowDocTemplate(
                  this.state.selectedComponent && this.state.selectedComponent.DOCTEMPLATECODE,
                  docNum && docNum.docNumber,
                  this.state.taskSeq,
                  this.state.viewType,
                )}
            </div>
          </StyledInputView>
        </AntdModal>
      </StyledContents>
    );
  }
}

IntroComponent.propTypes = {
  id: PropTypes.string,
  apiArys: PropTypes.array,
  categoryInfo: PropTypes.array,
  categoryMapList: PropTypes.object,
  getCallDataHanlder: PropTypes.func,
};

IntroComponent.defaultProps = {
  id: '',
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
};

const Intro = () => <BizMicroDevBase id="mdcsIntro" component={IntroComponent} />;

export default Intro;

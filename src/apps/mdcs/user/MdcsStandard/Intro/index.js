import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select, Modal, Radio, Input, Table } from 'antd';

import draftImg1 from 'apps/mdcs/images/draft_img1.png';
import message from 'components/Feedback/message';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import * as DraftType from 'apps/WorkFlow/WorkFlowBase/Nodes/Constants/draftconst';
import StyledContents from '../../../styled/StyledContents';
import StyledButton from '../../../styled/StyledButton';
import BizMicroDevBase from '../../../components/BizMicroDevBase';
import BizBuilderBase from '../../../components/BizBuilderBase';
import StyledModalWrapper from '../../../styled/Modals/StyledModalWrapper';

import DwDoc from '../DwDoc';
import PmDoc from '../PmDoc';
import BizDoc from '../BizDoc';
import TechDoc from '../TechDoc';

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
    const node = aryNodesIds.filter(_node => listItem.NODE_ID.toString() === _node);
    return node.length > 0 ? listItem : false;
  };

  selectedTemplate = (aryDocs, categoryListinfo, aryDocTemplateInfoList) => {
    let _selectedCategory;
    aryDocs.map(doc => {
      if (_selectedCategory === undefined) {
        _selectedCategory =
          categoryListinfo.filter(cate => cate.NODE_ID === doc.NODE_ID).length > 0
            ? categoryListinfo.filter(cate => cate.NODE_ID === doc.NODE_ID)[0]
            : undefined;
      } else {
        const _curCategory = categoryListinfo.filter(cate => cate.NODE_ID === doc.NODE_ID)
          ? categoryListinfo.filter(cate => cate.NODE_ID === doc.NODE_ID)[0]
          : undefined;
        if (_selectedCategory.length > 0 && _curCategory.LVL > _selectedCategory.LVL) {
          _selectedCategory = _curCategory;
        }
      }
    });

    const selectedDoc = aryDocs.filter(doc => doc.NODE_ID === _selectedCategory.NODE_ID)
      ? aryDocs.filter(doc => doc.NODE_ID === _selectedCategory.NODE_ID)[0]
      : undefined;

    return aryDocTemplateInfoList.filter(template => template.NODE_ID === selectedDoc.DOC_CODE)
      ? aryDocTemplateInfoList.filter(template => template.NODE_ID === selectedDoc.DOC_CODE)[0]
      : undefined;
  };

  onChangeByStep4 = (value, result) => {
    const docNumber = this.onMakeDocNumber(5, value, result);
    const selectedItem = result && result.docTemplateInfoByCategory && result.categoryInfo.categoryMapList.filter(item => item.NODE_ID === value);
    let fullPath = '';
    if (selectedItem && selectedItem.length > 0) {
      fullPath = selectedItem[0].FULLPATH;
    }

    const aryNodeIds = fullPath.split('|');
    const aryDocs = result && result.docTemplateInfoByCategory && result.docTemplateInfoByCategory.list.filter(listItem => this.findDocs(listItem, aryNodeIds));
    const aryDocTemplateInfoList = result && result.docTemplateInfo && result.docTemplateInfo.categoryMapList;
    const selectedTemplate = this.selectedTemplate(aryDocs, result && result.categoryInfo && result.categoryInfo.categoryMapList, aryDocTemplateInfoList);

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
      selectedComponent: selectedTemplate,
      // fullPathInfo: fullPath.split('|'),
      fullPathInfo: fullPathArr,
    });
  };

  onModalShow = () => {
    this.setState({
      isShow: true,
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
    }));
  };

  onShowDocTemplate = (doctype, docNumber, taskSeq, viewType) => {
    const workPrcProps = {
      draftType: this.state.selectedDraft,
      nodeIds: this.state.fullPathInfo,
      degreeFlag: 88,
    };

    switch (doctype) {
      case 'BS': {
        return (
          <BizBuilderBase
            id="BizDoc"
            workSeq={913}
            taskSeq={taskSeq}
            component={BizDoc}
            compProps={{ docNumber, NODE_ID: this.state.selectedValue4, onCloseModleHandler: this.onCompleteCloseModal }}
            onCloseModleHandler={this.onCompleteCloseModal}
            viewType={viewType}
            selectedNodeId={this.state.selectedValue4}
            workPrcProps={workPrcProps}
            // fullNodeIds={this.state.fullPathInfo}
            // draftType={this.state.selectedDraft}
          />
        );
      }
      case 'PM': {
        return (
          <BizBuilderBase
            id="PmDoc"
            workSeq={953}
            taskSeq={taskSeq}
            component={PmDoc}
            compProps={{ docNumber, NODE_ID: this.state.selectedValue4, onCloseModleHandler: this.onCompleteCloseModal }}
            onCloseModleHandler={this.onCompleteCloseModal}
            viewType={viewType}
            selectedNodeId={this.state.selectedValue4}
            workPrcProps={workPrcProps}
            // fullNodeIds={this.state.fullPathInfo}
            // draftType={this.state.selectedDraft}
          />
        );
      }
      case 'DW': {
        return (
          <BizBuilderBase
            id="DwDoc"
            workSeq={985}
            taskSeq={taskSeq}
            component={DwDoc}
            compProps={{ docNumber, NODE_ID: this.state.selectedValue4, onCloseModleHandler: this.onCompleteCloseModal }}
            onCloseModleHandler={this.onCompleteCloseModal}
            viewType={viewType}
            selectedNodeId={this.state.selectedValue4}
            workPrcProps={workPrcProps}
            // fullNodeIds={this.state.fullPathInfo}
            // draftType={this.state.selectedDraft}
          />
        );
      }
      case 'TS': {
        return (
          <BizBuilderBase
            id="TechDoc"
            workSeq={913}
            taskSeq={taskSeq}
            component={TechDoc}
            compProps={{ docNumber, NODE_ID: this.state.selectedValue4, onCloseModleHandler: this.onCompleteCloseModal }}
            onCloseModleHandler={this.onCompleteCloseModal}
            viewType={viewType}
            selectedNodeId={this.state.selectedValue4}
            workPrcProps={workPrcProps}
            // fullNodeIds={this.state.fullPathInfo}
            // draftType={this.state.selectedDraft}
          />
        );
      }
      default:
        return (
          <BizBuilderBase
            id="BizDoc"
            workSeq={913}
            taskSeq={taskSeq}
            component={BizDoc}
            compProps={{ docNumber, NODE_ID: this.state.selectedValue4, onCloseModleHandler: this.onCompleteCloseModal }}
            onCloseModleHandler={this.onCompleteCloseModal}
            viewType={viewType}
            selectedNodeId={this.state.selectedValue4}
            workPrcProps={workPrcProps}
            // fullNodeIds={this.state.fullPathInfo}
            // draftType={this.state.selectedDraft}
          />
        );
    }
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
    const { selectedValue1, selectedValue2, selectedValue3, selectedValue4 } = this.state;
    const _fDepth =
      result &&
      result.categoryInfo &&
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

        <AntdModal destroyOnClose style={{ top: '50px' }} width={1200} visible={this.state.isShow} onCancel={() => this.onCloseModal()} footer={null}>
          {this.onShowDocTemplate(
            this.state.selectedComponent && this.state.selectedComponent.CODE,
            docNum && docNum.docNumber,
            this.state.taskSeq,
            this.state.viewType,
          )}
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
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=3',
      type: 'GET',
      params: {},
    },
    {
      key: 'docTemplateInfoByCategory',
      url: '/api/builder/v1/work/taskList/1011',
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

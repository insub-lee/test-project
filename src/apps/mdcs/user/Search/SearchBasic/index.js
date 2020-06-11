import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';

import { Table, Radio, Form, Modal, Input, Select, Checkbox, DatePicker } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import StyledRadio from 'components/FormStuff/Radio';

import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdTextArea = StyledTextarea(Input.TextArea);
const AntdInput = StyledInput(Input);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdSelect = StyledSelect(Select);
const FormItem = Form.Item;

const columns = [
  { title: 'No.', key: 'id', width: '12%', dataIndex: 'id' },
  { title: 'REV.', key: 'VERSION', align: 'center', width: '6%', dataIndex: 'VERSION' },
  { title: 'Effect Date', align: 'center', key: 'END_DTTM', width: '10%', dataIndex: 'END_DTTM' },
  { title: 'Title', align: 'left', key: 'title', dataIndex: 'title' },
  {
    title: '종류',
    key: 'fullPathStr',
    dataIndex: 'fullPathStr',
    width: '21%',
    render: (text, row, index) => {
      if (text) {
        return <span>{text.replace(/&gt;/g, ' > ')}</span>;
      }
    },
  },
  { title: '기안부서', key: 'deptName', width: '12%', dataIndex: 'deptName' },
  { title: '기안자', key: 'name', width: '8%', dataIndex: 'name' },
];

// Table NODE_ID 값
const options = [
  { label: '업무표준', value: 2 },
  { label: '기술표준', value: 6 },
  // { label: '고객표준', value: -1 },
  { label: '도면', value: 16 },
  { label: '자재승인서', value: 18 },
  { label: 'TDS', value: 231 },
  { label: 'NPI', value: 232 },
  // { label: 'PDP', value: -1 },
  { label: 'Work Process', value: 234 },
];

const initState = {
  nodeIdList: [],
  status: 2, // 현재 Revision, 폐기
  docNo: '',
  keyword: '',
  gubun: 1,
  type: 'title',
  drafter: '',
  draftDept: '',
  startDate: '',
  startDateTemp: null,
  endDate: '',
  endDateTemp: null,
  visible: false,
  SearchView: {
    visible: false,
    taskSeq: -1,
    workSeq: -1,
    nodeId: -1,
  },
  coverView: {
    visible: false,
    workSeq: undefined,
    taskSeq: undefined,
    viewMetaSeq: undefined,
  },
  isLastVer: 'Y',
  workSeqList: [],
  isDownVisible: false,
  selectedRow: undefined,
  DRAFT_PROCESS: undefined,
  OPINION: undefined,
  appvMember: undefined,
  drmByDraft: undefined,
  drmByPrint: undefined,
  selectedDRM: undefined,
  downType: undefined,
};

const InputGroup = Input.Group;
const { Option } = Select;

class SearchBasic extends Component {
  state = initState;

  componentDidMount() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const prefixUrl = '/api/mdcs/v1/common/drmAclHandler';
    submitHandlerBySaga(sagaKey, 'GET', prefixUrl, {}, this.initAclData);
  }

  initAclData = (id, response) => {
    const { aclList } = response;
    const drmByDarft = aclList.filter(x => x.IDX === 2).length > 0 ? aclList.filter(x => x.IDX === 2)[0] : undefined;
    const drmByPrint = aclList.filter(x => x.IDX === 3).length > 0 ? aclList.filter(x => x.IDX === 3)[0] : undefined;
    this.setState({ downType: 1, selectedDRM: drmByDarft, drmByDarft, drmByPrint });
  };

  callApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const params = { ...this.state, status: this.state.status === 2 ? [1, 2] : [8] };
    const apiArr = [
      {
        key: 'listData',
        url: '/api/mdcs/v1/common/search',
        type: 'POST',
        params,
      },
    ];
    getCallDataHandler(id, apiArr);
  };

  onChangeCheckBox = checkedValues => {
    const npiTIdx = checkedValues.findIndex(iNode => iNode === 232);
    const npiPIdx = checkedValues.findIndex(iNode => iNode === 233);
    if (npiTIdx > -1 && npiPIdx === -1) {
      checkedValues.push(233);
    }
    if (npiTIdx === -1 && npiPIdx > -1) {
      checkedValues.splice(npiPIdx, 1);
    }
    this.setState({ nodeIdList: checkedValues });
  };

  onChangeInput = (key, value) => {
    this.setState({ [key]: value });
  };

  onChangeRadio = (key, e) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  onChangeDate = (type, date, dateStr) => {
    if (type === 'startDate') {
      this.setState({
        startDateTemp: date,
        startDate: dateStr,
      });
    }
    if (type === 'endDate') {
      this.setState({
        endDateTemp: date,
        endDate: dateStr,
      });
    }
  };

  onSearch = () => {
    this.callApi();
    this.setState({
      visible: true,
      SearchView: {
        visible: false,
        taskSeq: -1,
        workSeq: -1,
      },
    });
  };

  onClear = () => {
    this.setState({ ...this.state, ...initState });
  };

  // 검색결과 클릭시 발생
  onClickRow = (record, rowIndex) => {
    this.setState({
      SearchView: {
        visible: true,
        taskSeq: record.taskSeq,
        workSeq: record.workSeq,
        nodeId: record.nodeId,
        draftId: record.DRAFT_ID,
      },
    });
  };

  // SearchView Detail Close
  closeBtnFunc = () => {
    this.setState({
      SearchView: {
        visible: false,
        taskSeq: -1,
        workSeq: -1,
        nodeId: -1,
      },
    });
  };

  onCloseCoverView = () => {
    this.setState({
      coverView: {
        visible: false,
        workSeq: undefined,
        taskSeq: undefined,
        viewMetaSeq: undefined,
      },
    });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    this.setState({ coverView: { visible: true, workSeq, taskSeq, viewMetaSeq } });
  };

  onChangeDocType = workSeqList => {
    this.setState({ workSeqList });
  };

  onClickDownLoad = formData => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const url = '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder';
    submitHandlerBySaga(sagaKey, 'POST', url, { PARAM: { PRC_ID: 107 } }, this.initProcessData);
    this.setState({ isDownVisible: true, selectedRow: { ...formData } });
  };

  onCloseDownLoad = () => {
    this.setState({ isDownVisible: false });
  };

  initProcessData = (id, response) => {
    const { DRAFT_PROCESS } = response;
    const { DRAFT_PROCESS_STEP } = DRAFT_PROCESS;
    const appvMember =
      DRAFT_PROCESS_STEP.filter(item => item.NODE_ID === 133).length > 0 ? DRAFT_PROCESS_STEP.filter(item => item.NODE_ID === 133)[0].APPV_MEMBER : [];
    this.setState({ DRAFT_PROCESS, appvMember });
  };

  onChangeDRMRadio = e => {
    const { drmByDraft, drmByPrint } = this.state;
    if (e.target.value === 2) {
      this.setState({ downType: 2, selectedDRM: drmByPrint });
    } else {
      this.setState({ downType: 1, selectedDRM: drmByDraft });
    }
  };

  onDraftDownLoad = () => {
    const { selectedDRM, DRAFT_PROCESS, selectedRow, OPINION } = this.state;
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { TITLE, WORK_SEQ, TASK_SEQ } = selectedRow;
    const draftTitle = `${TITLE} 다운로드신청`;
    const prefixUrl = '/api/workflow/v1/common/workprocess/draft';
    const draftData = {
      DRAFT_PROCESS: { ...DRAFT_PROCESS, DRAFT_TITLE: draftTitle, WORK_SEQ, TASK_SEQ, OPINION, REL_TYPE: 4, DRAFT_DATA: { ...selectedDRM, OPINION } },
    };
    submitHandlerBySaga(sagaKey, 'POST', prefixUrl, draftData, this.onCompleteProc);
  };

  onCompleteProc = (id, response) => {
    history.push('/apps/Workflow/User/DraftDocDown');
    this.setState({ isDownVisible: false });
  };

  onChangeOpinion = e => {
    this.setState({ OPINION: e.target.value });
  };

  render() {
    const {
      nodeIdList,
      status,
      docNo,
      keyword,
      type,
      drafter,
      draftDept,
      startDateTemp,
      endDateTemp,
      visible,
      SearchView,
      coverView,
      gubun,
      isDownVisible,
      selectedRow,
      DRAFT_PROCESS,
      appvMember,
    } = this.state;
    const { result } = this.props;
    const { listData = {} } = result;
    const listDataArr = listData.arr || [];
    const { onClickRow, closeBtnFunc } = this;
    return (
      <StyledSearch>
        <div className="searchPage">
          <div className="searchWrapper">
            <div style={{ position: 'relative' }}>
              <p className="searchTitle">기본 검색</p>
              <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }}>
                <StyledButton className="btn-primary mr5 btn-sm" onClick={this.onSearch}>
                  검색
                </StyledButton>
                <StyledButton className="btn-light btn-sm" onClick={this.onClear}>
                  Clear
                </StyledButton>
              </div>
            </div>
            <StyledHtmlTable style={{ padding: '10px' }}>
              <table style={{ marginBottom: '10px' }}>
                <tbody>
                  <tr>
                    <th>문서종류</th>
                    <td colSpan={3}>
                      <Checkbox.Group onChange={this.onChangeDocType}>
                        <Checkbox value={901}>업무표준</Checkbox>
                        <Checkbox value={1921}>기술표준</Checkbox>
                        <Checkbox value={1881}>도면</Checkbox>
                        <Checkbox value={2941}>TDS</Checkbox>
                        <Checkbox value={2975}>NPI</Checkbox>
                        <Checkbox value={3013}>Work Process</Checkbox>
                      </Checkbox.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>문서번호</th>
                    <td>
                      <AntdInput
                        className="ant-input-sm"
                        onChange={e => {
                          this.onChangeInput('docNo', e.target.value);
                        }}
                      />
                    </td>
                    <th>Rev. 구분</th>
                    <td>
                      <Radio.Group
                        size="default"
                        value={gubun}
                        onChange={e => {
                          this.onChangeRadio('gubun', e);
                        }}
                      >
                        <StyledRadio value={1}>현재 버전</StyledRadio>
                        {/* <StyledRadio value={2}>과거 Rev. 포함</StyledRadio> */}
                        <StyledRadio value={3}>폐기</StyledRadio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>검색어</th>
                    <td colSpan={3}>
                      <InputGroup compact>
                        <AntdSelect className="select-sm" style={{ width: '120px' }} defaultValue="title">
                          <Option value="title">제목</Option>
                          <Option value="all">제목+요약내용</Option>
                        </AntdSelect>
                        <AntdInput
                          className="ant-input-sm"
                          style={{ width: '60%' }}
                          onChange={e => {
                            this.onChangeInput('keyword', e.target.value);
                          }}
                        />
                      </InputGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>기안자</th>
                    <td colSpan={3}>
                      <AntdInput
                        className="ant-input-sm"
                        onChange={e => {
                          this.onChangeInput('drafter', e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>기안부서</th>
                    <td colSpan={3}>
                      <AntdInput
                        className="ant-input-sm"
                        onChange={e => {
                          this.onChangeInput('draftDept', e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>시행일</th>
                    <td colSpan={3}>
                      <AntdDatePicker className="ant-picker-sm" format="YYYY-MM-DD" onChange={(date, dateStr) => this.onChangeDate(dateStr, 'startDate')} />
                      <span style={{ display: 'inline-block', margin: '0 5px', verticalAlign: 'middle' }}>~</span>
                      <AntdDatePicker className="ant-picker-sm" format="YYYY-MM-DD" onChange={(date, dateStr) => this.onChangeDate(dateStr, 'endDate')} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
          </div>
          <AntdModal
            className="modalWrapper modalTechDoc"
            title="검색 결과"
            visible={visible}
            footer={null}
            width={1080}
            onCancel={() => {
              this.setState({ visible: false });
            }}
            onOk={() => {
              this.setState({ visible: false });
            }}
            okButtonProps={null}
          >
            <>
              <StyledContentsWrapper>
                <AntdTable
                  columns={columns}
                  size="middle"
                  dataSource={listDataArr}
                  className="tableCustom"
                  onRow={(record, rowIndex) => ({
                    onClick: event => {
                      onClickRow(record, rowIndex);
                    },
                  })}
                />
              </StyledContentsWrapper>
            </>
          </AntdModal>
          <AntdModal
            className="modalWrapper modalTechDoc"
            title="검색 내용 보기"
            visible={SearchView.visible}
            footer={null}
            width={800}
            onCancel={this.closeBtnFunc}
            onOk={this.closeBtnFunc}
            okButtonProps={null}
            destroyOnClose
          >
            <>
              <div className="SearchContentLayer">
                <BizBuilderBase
                  sagaKey="SearchView"
                  viewType="VIEW"
                  workSeq={SearchView.workSeq}
                  taskSeq={SearchView.taskSeq}
                  closeBtnFunc={this.closeBtnFunc}
                  clickCoverView={this.clickCoverView}
                  ViewCustomButtons={({ closeBtnFunc, isTaskFavorite, sagaKey, formData, setTaskFavorite }) => (
                    <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                      {isTaskFavorite && (
                        <StyledButton
                          className="btn-primary btn-sm mr5"
                          onClick={() => setTaskFavorite(sagaKey, formData.WORK_SEQ, formData.TASK_ORIGIN_SEQ, formData.BUILDER_TASK_FAVORITE || 'N')}
                        >
                          {formData.BUILDER_TASK_FAVORITE === 'Y' ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                        </StyledButton>
                      )}
                      <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.onClickDownLoad(formData)}>
                        다운로드 신청
                      </StyledButton>
                      <StyledButton className="btn-light btn-sm" onClick={closeBtnFunc}>
                        닫기
                      </StyledButton>
                    </StyledButtonWrapper>
                  )}
                />
              </div>
            </>
          </AntdModal>
          <AntdModal
            className="modalWrapper modalTechDoc"
            title="파일 다운 신청"
            visible={isDownVisible}
            footer={null}
            width={800}
            onCancel={this.onCloseDownLoad}
            onOk={this.closeBtnFunc}
            okButtonProps={null}
            destroyOnClose
          >
            <StyledContentsWrapper>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>
                ※ 이 문서 및 도면은 MagnaChip 반도체의 자산이므로 불법 유출 시,관계법과 MagnaChip 회사 규정에 의해 처벌함.
              </div>
              <StyledHtmlTable>
                {selectedRow && (
                  <>
                    <table>
                      <tbody>
                        <tr>
                          <th>문서종류</th>
                          <td colSpan={3}>{selectedRow.NODE_FULLNAME}</td>
                        </tr>
                        <tr>
                          <th>문서번호</th>
                          <td>{selectedRow.DOCNUMBER}</td>
                          <th>개정번호</th>
                          <td>{selectedRow.VERSION}</td>
                        </tr>
                        <tr>
                          <th>결재자</th>
                          <td colSpan={3}>{appvMember && appvMember.map(item => `${item.NAME_KOR} ( ${item.PSTN_NAME_KOR} ) `)}</td>
                        </tr>
                        <tr>
                          <th>요청종류</th>
                          <td colSpan={3}>
                            <Radio.Group onChange={this.onChangeDRMRadio} defaultValue={1}>
                              <Radio value={1}>기안용 Download 권한신청 </Radio>
                              <Radio value={2}>Print 권한신청</Radio>
                            </Radio.Group>
                          </td>
                        </tr>
                        <tr>
                          <th>요청사유</th>
                          <td colSpan={3}>
                            <AntdTextArea rows={4} onChange={this.onChangeOpinion} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                      <StyledButton className="btn-primary btn-sm mr5" onClick={this.onDraftDownLoad}>
                        신청
                      </StyledButton>
                      <StyledButton className="btn-light btn-sm" onClick={this.onCloseDownLoad}>
                        닫기
                      </StyledButton>
                    </StyledButtonWrapper>
                  </>
                )}
              </StyledHtmlTable>
            </StyledContentsWrapper>
          </AntdModal>
          <AntdModal
            className="modalWrapper modalTechDoc"
            title="표지 보기"
            visible={coverView.visible}
            footer={null}
            width={800}
            okButtonProps={null}
            onCancel={this.onCloseCoverView}
            destroyOnClose
          >
            <div className="SearchContentLayer">
              <BizBuilderBase
                sagaKey="CoverView"
                viewType="VIEW"
                workSeq={coverView.workSeq}
                taskSeq={coverView.taskSeq}
                viewMetaSeq={coverView.viewMetaSeq}
                onCloseCoverView={this.onCloseCoverView}
                ViewCustomButtons={({ onCloseCoverView }) => (
                  <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                    <StyledButton className="btn-light btn-sm" onClick={onCloseCoverView}>
                      닫기
                    </StyledButton>
                  </StyledButtonWrapper>
                )}
              />
            </div>
          </AntdModal>
        </div>
      </StyledSearch>
    );
  }
}

SearchBasic.propTypes = {
  responseData: PropTypes.shape({
    listData: PropTypes.shape({
      arr: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
};

SearchBasic.defaultProps = {
  responseData: {
    listData: {
      arr: [],
    },
  },
};

export default SearchBasic;

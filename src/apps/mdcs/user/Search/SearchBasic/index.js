import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Radio, Form, Modal, Input, Select, Button } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import StyledRadio from 'components/FormStuff/Radio';

import StyledInput from 'components/FormStuff/Input';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledDatePicker from 'components/FormStuff/DatePicker';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';

const AntdModal = StyledModalWrapper(Modal);
const AntdLineTable = StyledLineTable(Table);
const FormItem = Form.Item;

const columns = [
  { title: 'No.', key: 'id', width: '11%', dataIndex: 'id' },
  { title: 'REV.', key: 'VERSION', align: 'center', width: '6%', dataIndex: 'VERSION' },
  { title: 'Effect Date', align: 'center', key: 'END_DTTM', width: '10%', dataIndex: 'END_DTTM' },
  { title: 'Title', align: 'left', key: 'title', width: '35%', dataIndex: 'title' },
  {
    title: '종류',
    key: 'fullPathStr',
    dataIndex: 'fullPathStr',
    width: '21%',
    render: (text, row, index) => {
      if (text) {
        return <text>{text.replace(/&gt;/g, ' > ')}</text>;
      }
    },
  },
  { title: '기안부서', key: 'deptName', width: '10%', dataIndex: 'deptName' },
  { title: '기안자', key: 'name', width: '7%', dataIndex: 'name' },
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
};

const InputGroup = Input.Group;
const { Option } = Select;

class SearchBasic extends Component {
  state = initState;

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

  render() {
    const { nodeIdList, status, docNo, keyword, type, drafter, draftDept, startDateTemp, endDateTemp, visible, SearchView, coverView, gubun } = this.state;
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
                <StyledButton className="btn-primary btn-first" onClick={this.onSearch}>
                  검색
                </StyledButton>
                <StyledButton className="btn-light" onClick={this.onClear}>
                  Clear
                </StyledButton>
              </div>
            </div>
            <StyledHtmlTable style={{ padding: '10px' }}>
              <table style={{ marginBottom: '10px' }}>
                <tbody>
                  <tr>
                    <th>문서번호</th>
                    <td>
                      <Input
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
                        <StyledRadio value={2}>과거 Rev. 포함</StyledRadio>
                        <StyledRadio value={3}>폐기</StyledRadio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>검색어</th>
                    <td colSpan={3}>
                      <InputGroup compact>
                        <Select style={{ width: '120px' }} defaultValue="title">
                          <Option value="title">제목</Option>
                          <Option value="all">제목+요약내용</Option>
                        </Select>
                        <Input
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
                      <StyledInput
                        onChange={e => {
                          this.onChangeInput('drafter', e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>기안부서</th>
                    <td colSpan={3}>
                      <StyledInput
                        onChange={e => {
                          this.onChangeInput('draftDept', e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>시행일</th>
                    <td colSpan={3}>
                      <StyledDatePicker format="YYYY-MM-DD" onChange={(date, dateStr) => this.onChangeDate(dateStr, 'startDate')} />
                      ~
                      <StyledDatePicker format="YYYY-MM-DD" onChange={(date, dateStr) => this.onChangeDate(dateStr, 'endDate')} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
          </div>
          <AntdModal
            className="modalWrapper modalTechDoc modalCustom"
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
              <div className="pop_tit">검색 결과</div>
              <div className="pop_con">
                <AntdLineTable
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
              </div>
            </>
          </AntdModal>
          <AntdModal
            className="modalWrapper modalTechDoc modalCustom"
            visible={SearchView.visible}
            footer={null}
            width={800}
            onCancel={this.closeBtnFunc}
            onOk={this.closeBtnFunc}
            okButtonProps={null}
            destroyOnClose
          >
            <>
              <div className="pop_tit">검색 내용 보기</div>
              <div className="SearchContentLayer">
                <BizBuilderBase
                  sagaKey="SearchView"
                  viewType="VIEW"
                  workSeq={SearchView.workSeq}
                  taskSeq={SearchView.taskSeq}
                  closeBtnFunc={this.closeBtnFunc}
                  clickCoverView={this.clickCoverView}
                  ViewCustomButtons={({ closeBtnFunc }) => (
                    <div style={{ textAlign: 'center', marginTop: '12px' }}>
                      <StyledButton className="btn-primary" onClick={closeBtnFunc}>
                        닫기
                      </StyledButton>
                    </div>
                  )}
                />
              </div>
            </>
          </AntdModal>
          <AntdModal
            className="modalWrapper modalTechDoc modalCustom"
            visible={coverView.visible}
            footer={null}
            width={800}
            okButtonProps={null}
            onCancel={this.onCloseCoverView}
            destroyOnClose
          >
            <div className="pop_tit">검색 내용 보기</div>
            <div className="SearchContentLayer">
              <BizBuilderBase
                sagaKey="CoverView"
                viewType="VIEW"
                workSeq={coverView.workSeq}
                taskSeq={coverView.taskSeq}
                viewMetaSeq={coverView.viewMetaSeq}
                onCloseCoverView={this.onCloseCoverView}
                ViewCustomButtons={({ onCloseCoverView }) => (
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <StyledButton className="btn-primary" onClick={onCloseCoverView}>
                      닫기
                    </StyledButton>
                  </div>
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

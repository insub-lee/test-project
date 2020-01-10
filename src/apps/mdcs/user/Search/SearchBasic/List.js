import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Radio, Form, Modal } from 'antd';

import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import StyledRadio from 'components/FormStuff/Radio';
import { CheckboxGroup } from 'components/FormStuff/Checkbox';
import StyledInput from 'components/FormStuff/Input';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledDatePicker from 'components/FormStuff/DatePicker';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';
import SearchViewer from '../SearchViewer';
import CoverViewer from '../CoverViewer';

const AntdModal = StyledModalWrapper(Modal);
const FormItem = Form.Item;

const columns = [
  {
    title: '종류',
    key: 'fullPathStr',
    dataIndex: 'fullPathStr',
    render: (text, row, index) => {
      if (text) {
        return <text>{text.replace(/&gt;/g, ' > ')}</text>;
      }
    },
  },
  { title: 'No.', key: 'id', dataIndex: 'id' },
  { title: 'REV.', key: 'status', dataIndex: 'status' },
  { title: 'Effect Date', key: '', dataIndex: '' },
  { title: 'Title', key: 'title', dataIndex: 'title' },
  { title: '기안부서', key: 'deptName', dataIndex: 'deptName' },
  { title: '기안자', key: 'name', dataIndex: 'name' },
];

// Table NODE_ID 값
const options = [
  { label: '업무표준', value: '11' },
  { label: '기술표준', value: '12' },
  { label: '고객표준', value: '31' },
  { label: '도면', value: '32' },
  { label: '자재승인서', value: '79' },
  { label: 'TDS', value: '-1' },
  { label: 'NPI', value: '-1' },
  { label: 'PDP', value: '7' },
  { label: 'Work Process', value: '18' },
];

const initState = {
  nodeIdList: [],
  status: 1, // 현재 Revision, 폐기
  docNo: '',
  keyword: '',
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
  },
  isLastVer: 'Y',
};

class SearchBasic extends Component {
  state = initState;

  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    const { id, getCallDataHanlder } = this.props;
    const apiArr = [
      {
        key: 'listData',
        url: '/api/mdcs/v1/common/search',
        type: 'POST',
        params: this.state,
      },
    ];
    this.props.getCallDataHanlder(id, apiArr);
  };

  onChangeCheckBox = checkedValues => {
    this.setState({ nodeIdList: checkedValues });
  };

  onChangeInput = (key, e) => {
    const { value } = e.target;
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

  clickCoverView = () => {
    console.log('clickCoverView !!');
    this.setState({
      coverView: {
        visible: true,
      },
    });
  };

  render() {
    const { nodeIdList, status, docNo, keyword, type, drafter, draftDept, startDateTemp, endDateTemp, visible, SearchView, coverView } = this.state;
    const { result } = this.props;
    const { onClickRow, closeBtnFunc } = this;
    console.log('this.props : ', this.props);
    return (
      <StyledSearch>
        <div className="searchPage">
          <div className="searchWrapper">
            <p className="searchTitle">기본 검색</p>
            <Form layout="inline">
              <FormItem label="문서종류">
                <CheckboxGroup onChange={this.onChangeCheckBox} value={nodeIdList} options={options} />
                {/* {options.map(node => (
                    <StyledCheck value={node.value}>{node.label}</StyledCheck>
                  ))}
                </CheckboxGroup> */}
              </FormItem>
              <FormItem label="Rev. 구분">
                <Radio.Group
                  size="default"
                  // value={state.size}
                  onChange={e => {
                    this.onChangeRadio('status', e);
                  }}
                  value={status}
                >
                  <StyledRadio value={1}>현재 Revision</StyledRadio>
                  <StyledRadio value={2}>폐기</StyledRadio>
                </Radio.Group>
              </FormItem>
              <FormItem label="문서번호">
                <StyledInput
                  onChange={e => {
                    this.onChangeInput('docNo', e);
                  }}
                  value={docNo}
                />
              </FormItem>
              <FormItem label="검색어" className="formCustom">
                <Radio.Group
                  size="default"
                  value={type}
                  onChange={e => {
                    this.onChangeRadio('type', e);
                  }}
                >
                  <StyledRadio value="title">제목</StyledRadio>
                  <StyledRadio value="all">제목+요약내용</StyledRadio>
                </Radio.Group>
                <StyledInput
                  onChange={e => {
                    this.onChangeInput('keyword', e);
                  }}
                  value={keyword}
                />
              </FormItem>
              <FormItem label="기안자">
                <StyledInput
                  onChange={e => {
                    this.onChangeInput('drafter', e);
                  }}
                  value={drafter}
                />
              </FormItem>
              <FormItem label="기안부서">
                <StyledInput
                  onChange={e => {
                    this.onChangeInput('draftDept', e);
                  }}
                  value={draftDept}
                />
              </FormItem>
              <FormItem label="시행일자">
                {/* <DatePicker.RangePicker mode="time" format="YYYY-MM-DD" onChange={this.onChangeDate} value={currentDate} /> */}
                <StyledDatePicker
                  value={startDateTemp}
                  onChange={(date, dateStr) => {
                    this.onChangeDate('startDate', date, dateStr);
                  }}
                />
                ~
                <StyledDatePicker
                  value={endDateTemp}
                  onChange={(date, dateStr) => {
                    this.onChangeDate('endDate', date, dateStr);
                  }}
                />
                {/* <DateRangePicker mode="time" format="YYYY-MM-DD" onChange={this.onChangeDate} value={currentDate} /> */}
              </FormItem>
              <FormItem>
                <div className="btn-wrap">
                  <StyledButton className="btn-primary btn-first" onClick={this.onSearch}>
                    검색
                  </StyledButton>
                  <StyledButton className="btn-light" onClick={this.onClear}>
                    Clear
                  </StyledButton>
                </div>
              </FormItem>
            </Form>
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
              <div className="pop_tit">적용 범위 선택</div>
              <div className="pop_con">
                <Table
                  columns={columns}
                  size="middle"
                  dataSource={result.listData ? result.listData.arr : []}
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
              <div className="pop_tit">선택 내용 보기</div>
              <div className="pop_con">
                <SearchViewer workSeq={SearchView.workSeq} taskSeq={SearchView.taskSeq} closeBtnFunc={closeBtnFunc} clickCoverView={this.clickCoverView} />
              </div>
            </>
          </AntdModal>
          <AntdModal
            className="modalWrapper modalTechDoc modalCustom"
            visible={coverView.visible}
            footer={null}
            width={1080}
            onCancel={() => {
              this.setState({ coverView: { ...this.state.coverView, visible: false } });
            }}
            onOk={() => {
              this.setState({ coverView: { ...this.state.coverView, visible: false } });
            }}
            okButtonProps={null}
            destroyOnClose
          >
            <>
              <div className="pop_tit">선택 내용 보기</div>
              <div className="pop_con">
                <CoverViewer nodeId={SearchView.nodeId} taskSeq={SearchView.taskSeq} workSeq={SearchView.workSeq} />
              </div>
            </>
          </AntdModal>
        </div>
      </StyledSearch>
    );
  }
}

SearchBasic.propTypes = {
  result: PropTypes.objectOf(PropTypes.any).isRequired,
};

SearchBasic.defaultProps = {
  result: {
    listData: {
      arr: [],
    },
  },
};

export default SearchBasic;

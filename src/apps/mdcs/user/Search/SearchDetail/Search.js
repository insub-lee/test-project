import React, { Component } from 'react';
import { Table, Radio, Form, Tree, Select, Modal } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import moment from 'moment';

import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import StyledRadio from 'components/FormStuff/Radio';
import StyledInput from 'components/FormStuff/Input';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledDatePicker from 'components/FormStuff/DatePicker';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';

import SearchViewer from '../SearchViewer';
import CoverViewer from '../CoverViewer';

import BizStd from './BizStd';
import TechStd from './TechStd';
import DwStd from './DwStd';

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
  { title: 'REV.', key: 'VERSION', dataIndex: 'VERSION' },
  { title: 'Effect Date', key: 'END_DTTM', dataIndex: 'END_DTTM' },
  { title: 'Title', key: 'title', dataIndex: 'title' },
  { title: '기안부서', key: 'deptName', dataIndex: 'deptName' },
  { title: '기안자', key: 'name', dataIndex: 'name' },
];

const initState = {
  searchParam: {
    nodeId: { key: 'TBD.NODE_ID', condition: 'IN', value: null, type: 'INT' },
    status: { key: 'TBD.STATUS', condition: 'IN', value: 2, type: 'INT' }, // 현재 Revision, 폐기
    docNumber: { key: 'TBD.DOCNUMBER', condition: 'LIKE', value: '', type: 'STRING' },
    title: { key: 'TBD.TITLE', condition: 'LIKE', value: '', type: 'STRING' },
    remark: { key: 'WBT.REMARK', condition: 'LIKE', value: '', type: 'STRING' }, // TOTAL에 없음
    regUserName: { key: 'TBD.REG_USER_NAME', condition: 'LIKE', value: '', type: 'STRING' },
    regDeptName: { key: 'TBD.REG_DEPT_NAME', condition: 'LIKE', value: '', type: 'STRING' },
    startDate: { key: 'TBD.END_DTTM', condition: '>=', value: null, type: 'TIMESTAMP' }, // 결재일 없어서 임시
    endDate: { key: 'TBD.END_DTTM', condition: '<=', value: null, type: 'TIMESTAMP' }, // 결재일 없어서 임시
    lastVer: { key: 'TBD.ISLAST_VER', condition: '=', value: 'Y', type: 'STRING' },
  },
  type: 'title',
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
};

class Search extends Component {
  state = initState;

  componentDidMount() {
    const apiArr = [
      {
        key: 'categoryInfo',
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=1`,
        type: 'GET',
        params: {},
      },
    ];
    this.callApi(apiArr);
  }

  callApi = apiArr => {
    const { sagaKey: id, getCallDataHanlder } = this.props;
    getCallDataHanlder(id, apiArr);
  };

  onChangeCheckBox = (key, checkedValues) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key].value = checkedValues;
      return { searchParam };
    });
  };

  onChangeValue = (key, value) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key].value = value;
      return { searchParam };
    });
  };

  onChangeDate = (dateStr, key) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key].value = dateStr;
      return { searchParam };
    });
  };

  onChangeRev = value => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam.status.value = value === 0 ? 2 : value;
      searchParam.lastVer.value = value === 0 ? '' : 'Y';
      return { searchParam };
    });
  };

  onChangeKeyword = value => {
    this.setState(prevState => {
      const { searchParam, type } = prevState;
      searchParam.title.value = value;
      if (type === 'all') searchParam.remark.value = value;
      else if (searchParam.remark.value.length > 0) searchParam.remark.value = '';
      return { searchParam };
    });
  };

  onChangeType = value => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      if (value === 'title') searchParam.remark.value = '';
      else searchParam.remark.value = searchParam.title.value;
      return { searchParam, type: value };
    });
  };

  onSearch = () => {
    const { searchParam } = this.state;
    const { workSeq } = this.props;
    const keys = Object.keys(searchParam);
    if (keys.length > 0) {
      const paramList = [];
      keys.forEach(key => {
        if (searchParam[key].value && (searchParam[key].value.length > 0 || searchParam[key].value > 0)) {
          if (searchParam[key].type === 'TIMESTAMP') {
            searchParam[key].value = `${searchParam[key].value} ${searchParam[key].condition === '>=' ? '00:00:00' : '23:59:59'}`;
          } else if (key === 'scope') {
            searchParam[key].value = searchParam[key].value.toString();
          }

          if (key === 'status') {
            paramList.push({
              ...searchParam[key],
              value: searchParam[key].value === 2 && searchParam.lastVer.value === 'Y' ? [1, 2] : [searchParam[key].value],
            });
          } else {
            paramList.push(searchParam[key]);
          }
        }
      });
      const apiArr = [
        {
          key: 'listData',
          url: '/api/mdcs/v1/common/searchDetail',
          type: 'POST',
          params: { WORK_SEQ: workSeq, paramList },
        },
      ];
      this.callApi(apiArr);
      this.setState({
        visible: true,
        SearchView: {
          visible: false,
          taskSeq: -1,
          workSeq: -1,
        },
      });
    }
  };

  onClear = () => {
    this.setState(prevState => ({ ...prevState, ...initState }));
  };

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

  getTreeData = flatData => getTreeFromFlatData({ flatData, getKey: node => node.NODE_ID, getParentKey: node => node.PARENT_NODE_ID, rootKey: 1 });

  setSearchParam = searchParam => this.setState({ searchParam });

  renderSearch = () => {
    const { workSeq, searchType } = this.props;
    const { searchParam } = this.state;
    switch (searchType) {
      case 'BIZ':
        return (
          <BizStd
            {...this.props}
            searchParam={searchParam}
            onChangeValue={this.onChangeValue}
            onChangeCheckBox={this.onChangeCheckBox}
            setSearchParam={this.setSearchParam}
          />
        );
      case 'TECH':
        return (
          <TechStd
            {...this.props}
            searchParam={searchParam}
            onChangeValue={this.onChangeValue}
            onChangeCheckBox={this.onChangeCheckBox}
            setSearchParam={this.setSearchParam}
          />
        );
      case 'DW':
        return (
          <DwStd
            {...this.props}
            searchParam={searchParam}
            onChangeValue={this.onChangeValue}
            onChangeCheckBox={this.onChangeCheckBox}
            setSearchParam={this.setSearchParam}
          />
        );
      default:
        return '';
    }
  };

  render() {
    const { type, searchParam, visible, SearchView, coverView } = this.state;
    const { nodeIds, status, docNumber, title, regUserName, regDeptName, startDate, endDate, scope, nodeId, lastVer } = searchParam;
    const { result, workSeq, searchType } = this.props;
    let treeData = [];
    if (result && result.categoryInfo && result.categoryInfo.categoryMapList && result.categoryInfo.categoryMapList.length > 0) {
      let rootOrdinal = '';
      let rootOrdinal2 = '';
      switch (searchType) {
        case 'BIZ':
          rootOrdinal = '000001000002';
          break;
        case 'TECH':
          rootOrdinal = '000001000003';
          break;
        case 'DW':
          rootOrdinal = '000001000003000002';
          break;
        case 'NPI':
          rootOrdinal = '000001000005';
          rootOrdinal2 = '000001000006';
          break;
        case 'TDS':
          rootOrdinal = '000001000004';
          break;
        case 'WP':
          rootOrdinal = '000001000007';
          break;
        default:
          rootOrdinal = '000001000002';
      }
      let flatData = [];
      if (searchType === 'NPI') {
        flatData = result.categoryInfo.categoryMapList
          .filter(
            fNode =>
              fNode.NODE_ORDINAL && (fNode.NODE_ORDINAL.indexOf(rootOrdinal) === 0 || fNode.NODE_ORDINAL.indexOf(rootOrdinal2) === 0) && fNode.USE_YN === 'Y',
          )
          .map(node => ({ ...node, key: node.NODE_ID, title: node.NAME_KOR }));
      } else {
        flatData = result.categoryInfo.categoryMapList
          .filter(fNode => fNode.NODE_ORDINAL && fNode.NODE_ORDINAL.indexOf(rootOrdinal) === 0 && fNode.USE_YN === 'Y')
          .map(node => ({ ...node, key: node.NODE_ID, title: node.NAME_KOR }));
        if (searchType === 'TECH') {
          flatData = flatData.filter(
            fNode => fNode.NODE_ORDINAL.indexOf('000001000003000002') !== 0 && fNode.NODE_ORDINAL.indexOf('000001000003000003000001') !== 0,
          );
        }
      }
      treeData = this.getTreeData(flatData);
    }
    return (
      <StyledSearch>
        <div className="searchPage searchDetail">
          <div className="searchWrapper">
            <p className="searchTitle">업무표준 검색</p>
            <div className="treeWrapper tfWrapper">
              {treeData && <Tree showLine treeData={treeData} onSelect={(selectedKeys, info) => this.onChangeValue('nodeId', info.node.props.NODE_ID)} />}
            </div>
            <div className="formWrapper tfWrapper">
              <Form layout="inline">
                <FormItem label="Rev. 구분">
                  <Radio.Group
                    size="default"
                    onChange={e => {
                      this.onChangeRev(e.target.value);
                    }}
                    value={status.value === 2 && lastVer.value === '' ? 0 : status.value}
                  >
                    <StyledRadio value={2}>현재 Revision</StyledRadio>
                    <StyledRadio value={0}>과거 Rev. 포함</StyledRadio>
                    <StyledRadio value={8}>폐기</StyledRadio>
                  </Radio.Group>
                </FormItem>
                <FormItem label="문서번호">
                  <StyledInput
                    onChange={e => {
                      this.onChangeValue('docNumber', e.target.value);
                    }}
                    value={docNumber.value}
                  />
                </FormItem>
                <FormItem label="검색어" className="formCustom">
                  <Radio.Group size="default" value={type} onChange={e => this.onChangeType(e.target.value)}>
                    <StyledRadio value="title">제목</StyledRadio>
                    <StyledRadio value="all">제목+요약내용</StyledRadio>
                  </Radio.Group>
                  <StyledInput
                    onChange={e => {
                      this.onChangeKeyword(e.target.value);
                    }}
                    value={title.value}
                  />
                </FormItem>
                <FormItem label="기안자">
                  <StyledInput
                    onChange={e => {
                      this.onChangeValue('regUserName', e.target.value);
                    }}
                    value={regUserName.value}
                  />
                </FormItem>
                <FormItem label="기안부서">
                  <StyledInput
                    onChange={e => {
                      this.onChangeValue('regDeptName', e.target.value);
                    }}
                    value={regDeptName.value}
                  />
                </FormItem>
                <FormItem label="시행일자">
                  {/* <DatePicker.RangePicker mode="time" format="YYYY-MM-DD" onChange={this.onChangeDate} value={currentDate} /> */}
                  <StyledDatePicker
                    format="YYYY-MM-DD"
                    onChange={(date, dateStr) => this.onChangeDate(dateStr, 'startDate')}
                    value={startDate.value ? moment(startDate.value) : null}
                  />
                  ~
                  <StyledDatePicker
                    format="YYYY-MM-DD"
                    onChange={(date, dateStr) => this.onChangeDate(dateStr, 'endDate')}
                    value={endDate.value ? moment(endDate.value) : null}
                  />
                </FormItem>
                <div className="line" />
                {searchParam && this.renderSearch()}
                <div className="btn-wrap">
                  <StyledButton className="btn-primary btn-first" onClick={this.onSearch}>
                    검색
                  </StyledButton>
                  <StyledButton className="btn-light" onClick={this.onClear}>
                    Clear
                  </StyledButton>
                </div>
              </Form>
            </div>
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
                    onClick: () => {
                      this.onClickRow(record, rowIndex);
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
                <SearchViewer
                  workSeq={SearchView.workSeq}
                  taskSeq={SearchView.taskSeq}
                  draftId={SearchView.draftId}
                  closeBtnFunc={this.closeBtnFunc}
                  clickCoverView={this.clickCoverView}
                />
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

export default Search;

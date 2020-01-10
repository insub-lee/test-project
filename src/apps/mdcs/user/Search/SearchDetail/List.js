import React, { Component } from 'react';
import { Table, Radio, Form, Checkbox, Tree, Select } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';

import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import StyledRadio from 'components/FormStuff/Radio';
import StyledCheckbox from 'components/FormStuff/Checkbox';
import StyledInput from 'components/FormStuff/Input';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import { DateRangePicker } from 'components/FormStuff/DatePicker';

const FormItem = Form.Item;
const { Option } = Select;

const columns = [
  { title: '종류', key: '1' },
  { title: 'No.', key: '2' },
  { title: 'REV.', key: '3' },
  { title: 'Effect Date', key: '4' },
  { title: 'Title', key: '5' },
  { title: '기안부서', key: '6' },
  { title: '기안자', key: '7' },
];

const options = [
  { label: '규정', value: '1' },
  { label: '규칙', value: '2' },
  { label: '지침', value: '3' },
];

const initState = {
  docKinds: [],
  option: '', // 현재 Revision, 폐기
  docNo: '',
  keyword: '',
  type: '',
  drafter: '',
  draftDept: '',
  startDate: '',
  endDate: '',
  currentDate: null,
};

class List extends Component {
  state = initState;

  componentDidMount() {
    const apiArr = [
      {
        key: 'categoryInfo',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=1',
        type: 'GET',
        params: {},
      },
      {
        key: 'bizStdScope',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=7',
        type: 'GET',
        params: {},
      },
    ];
    this.callApi(apiArr);
  }

  callApi = apiArr => {
    const { id, getCallDataHanlder } = this.props;
    getCallDataHanlder(id, apiArr);
  };

  onChangeCheckBox = checkedValues => {
    this.setState({ docKinds: checkedValues });
  };

  onChangeInput = (key, e) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  onChangeRadio = (key, e) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  onChangeDate = (date, dateStr) => {
    console.debug('onChangeDate date, dateStr : ', date, dateStr);
    this.setState({
      currentDate: date,
      startDate: dateStr[0],
      endDate: dateStr[1],
    });
  };

  onSearch = () => {
    console.debug('search!!!');
  };

  onClear = () => {
    this.setState({ ...this.state, ...initState });
  };

  onSelect = (selectedKeys, info) => {
    console.debug('selected', selectedKeys, info);
  };

  getTreeData = flatData => getTreeFromFlatData({ flatData, getKey: node => node.NODE_ID, getParentKey: node => node.PARENT_NODE_ID, rootKey: 1 });

  render() {
    const { docKinds, option, docNo, keyword, type, drafter, draftDept, currentDate } = this.state;
    const { result } = this.props;
    console.debug(result);
    let treeData = [];
    let scopeData = [];
    if (result && result.categoryInfo && result.categoryInfo.categoryMapList && result.categoryInfo.categoryMapList.length > 0) {
      treeData = this.getTreeData(
        result.categoryInfo.categoryMapList
          .filter(fNode => fNode.FULLPATH && fNode.FULLPATH.indexOf('1|2') === 0 && fNode.USE_YN === 'Y')
          .map(node => ({ ...node, key: node.NODE_ID, title: node.NAME_KOR })),
      );
    }
    if (result && result.bizStdScope && result.bizStdScope.categoryMapList && result.bizStdScope.categoryMapList.length > 0) {
      scopeData = result.bizStdScope.categoryMapList.filter(fNode => fNode.LVL > 0);
    }
    return (
      <StyledSearch>
        <div className="searchPage searchDetail">
          <div className="searchWrapper">
            <p className="searchTitle">업무표준 검색</p>
            <div className="treeWrapper tfWrapper">
              {treeData && <Tree showLine defaultExpandedKeys={['0-0-0']} treeData={treeData} onSelect={this.onSelect} />}
            </div>
            <div className="formWrapper tfWrapper">
              <Form layout="inline">
                <FormItem label="Rev. 구분">
                  <Radio.Group
                    size="default"
                    // value={state.size}
                    onChange={e => {
                      this.onChangeRadio('option', e);
                    }}
                    value={option}
                  >
                    <StyledRadio value={1}>현재 Revision</StyledRadio>
                    <StyledRadio value={0}>과거 Rev. 포함</StyledRadio>
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
                  <DateRangePicker mode="time" format="YYYY-MM-DD" onChange={this.onChangeDate} value={currentDate} />
                </FormItem>
                <div className="line" />
                <FormItem label="문서종류">
                  <Checkbox.Group onChange={this.onChangeCheckBox} value={docKinds}>
                    {options.map(node => (
                      <StyledCheckbox value={node.value}>{node.label}</StyledCheckbox>
                    ))}
                  </Checkbox.Group>
                </FormItem>
                <FormItem label="SCOPE">
                  {scopeData && scopeData.length > 0 && (
                    <Select defaultValue={0}>
                      <Option value={0}>--------</Option>
                      {scopeData.map(node => (
                        <Option value={node.NODE_ID}>{node.NAME_KOR}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
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
          <Table {...this.state} columns={columns} dataSource={[]} className="tableCustom" />
        </div>
      </StyledSearch>
    );
  }
}

export default List;

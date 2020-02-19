import React, { Component } from 'react';

import { Table, Radio, Form, Tree, Select, Modal, Input } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import moment from 'moment';

import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import StyledRadio from 'components/FormStuff/Radio';
import StyledInput from 'components/FormStuff/Input';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledDatePicker from 'components/FormStuff/DatePicker';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';
import StyledHtmlTable from 'commonStyled/Table/StyledHtmlTable';

import BizBuilderBase from 'components/BizBuilderBase';
import SearchViewer from '../SearchViewer';
import CoverViewer from '../CoverViewer';

import BizStd from './BizStd';
import TechStd from './TechStd';
import DwStd from './DwStd';

const AntdModal = StyledModalWrapper(Modal);

const FormItem = Form.Item;
const InputGroup = Input.Group;
const { Option } = Select;
class SearchDetail extends Component {
  state = {
    stdTreeData: [],
    conditionItems: { 'w.status': { sql: 'and w.status in (1,2)', realValue: 2 }, 'w.islast_ver': { sql: "and w.islast_ver='Y'", realValue: 'Y' } },
    whereStr: '',
  };

  componentDidMount() {
    const { sagaKey, treeData, rootNodeId, currentPage } = this.props;

    const stdTreeData =
      currentPage === 'NPI'
        ? {
            title: 'NPI',
            value: 1,
            key: 1,
            parentValue: 1,
            children: [
              treeData.filter(x => x.NODE_ID === 232).length > 0 && {
                title: treeData.filter(x => x.NODE_ID === 232)[0].NAME_KOR,
                value: treeData.filter(x => x.NODE_ID === 232)[0].NODE_ID,
                key: treeData.filter(x => x.NODE_ID === 232)[0].NODE_ID,
                parentValue: 1,
                children: this.getTreeData(treeData, 232),
              },
              treeData.filter(x => x.NODE_ID === 233).length > 0 && {
                title: treeData.filter(x => x.NODE_ID === 233)[0].NAME_KOR,
                value: treeData.filter(x => x.NODE_ID === 233)[0].NODE_ID,
                key: treeData.filter(x => x.NODE_ID === 233)[0].NODE_ID,
                parentValue: 1,
                children: this.getTreeData(treeData, 233),
              },
            ],
          }
        : treeData.filter(x => x.NODE_ID === rootNodeId).length > 0 && {
            title: treeData.filter(x => x.NODE_ID === rootNodeId)[0].NAME_KOR,
            value: treeData.filter(x => x.NODE_ID === rootNodeId)[0].NODE_ID,
            key: treeData.filter(x => x.NODE_ID === rootNodeId)[0].NODE_ID,
            parentValue: 1,
            children: this.getTreeData(treeData, rootNodeId),
          };

    this.setState({ stdTreeData });
  }

  getTreeData = (categoryMapList, rootId) =>
    categoryMapList.length > 0
      ? getTreeFromFlatData({
          flatData: categoryMapList
            .filter(filterItem => filterItem.USE_YN === 'Y')
            .map(item => ({
              title: item.NAME_KOR,
              value: item.NODE_ID,
              key: item.NODE_ID,
              parentValue: item.PARENT_NODE_ID,
            })),
          getKey: node => node.key,
          getParentKey: node => node.parentValue,
          rootKey: rootId,
        })
      : [];

  renderDetailSearch = () => {
    const { currentPage } = this.props;
    switch (currentPage) {
      case 'BIZ':
        return <BizStd getTreeData={this.getTreeData} onChangeSearchValue={this.onChangeSearchValue} {...this.props} />;
      case 'TECH':
        return <TechStd getTreeData={this.getTreeData} onChangeSearchValue={this.onChangeSearchValue} {...this.props} />;
      case 'DW':
        return <DwStd getTreeData={this.getTreeData} onChangeSearchValue={this.onChangeSearchValue} {...this.props} />;
      default:
        return '';
    }
  };

  onChangeSearchValue = (key, sql, realValue) => {
    const { conditionItems } = this.state;
    const tmpCondi = { ...conditionItems, [key]: { sql: `${sql}`, realValue } };
    this.setState({ conditionItems: tmpCondi });
  };

  onSearch = () => {
    const { workSeq } = this.props;
    const { conditionItems } = this.state;
    console.debug('conditionItems', conditionItems);
    let whereStr = '';
    Object.keys(conditionItems).map(x => {
      whereStr += ` ${conditionItems[x].realValue !== '' ? conditionItems[x].sql : ''}`;
    });
    console.debug('whereStr', whereStr);
    this.setState({ whereStr });
  };

  render() {
    const { searchTitle, workSeq } = this.props;
    const { stdTreeData } = this.state;
    return (
      <StyledSearch>
        <div className="searchPage searchDetail">
          <div className="searchWrapper">
            <div style={{ position: 'relative' }}>
              <p className="searchTitle">{`${searchTitle} 검색`}</p>
              <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }}>
                <StyledButton className="btn-primary btn-first" onClick={this.onSearch}>
                  검색
                </StyledButton>
                <StyledButton className="btn-light" onClick={this.onClear}>
                  Clear
                </StyledButton>
              </div>
            </div>
            <div className="treeWrapper tfWrapper">{stdTreeData.children && stdTreeData.children.length > 0 && <Tree showLine treeData={stdTreeData} />}</div>
            <div className="formWrapper tfWrapper" style={{ padding: '10px' }}>
              <StyledHtmlTable>
                <table style={{ marginBottom: '10px' }}>
                  <tbody>
                    <tr>
                      <th>문서번호</th>
                      <td>
                        <Input
                          onChange={e => {
                            this.onChangeSearchValue('w.docnumber', ` and w.docnumber like '%${e.target.value}%'`, e.target.value);
                          }}
                        />
                      </td>
                      <th>Rev. 구분</th>
                      <td>
                        <Radio.Group
                          size="default"
                          defaultValue={2}
                          onChange={e => {
                            this.onChangeSearchValue('w.status', 'and w.status in (', `${e.target.value === 2 ? '1,2' : e.target.value} )`, e.target.value);
                          }}
                        >
                          <StyledRadio value={2}>현재 Revision</StyledRadio>
                          <StyledRadio value={0}>과거 Rev. 포함</StyledRadio>
                          <StyledRadio value={8}>폐기</StyledRadio>
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
                            style={{ width: '50%' }}
                            onChange={e => {
                              this.onChangeSearchValue('w.title', `and w.title like '%${e.target.value}%'`, e.target.value);
                            }}
                          />
                        </InputGroup>
                      </td>
                    </tr>
                    <tr>
                      <th>기안자</th>
                      <td colSpan={3}>
                        <Input
                          onChange={e => {
                            this.onChangeSearchValue('w.reg_user_name', ` and w.reg_user_name like '%${e.target.value}%'`, e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>기안부서</th>
                      <td colSpan={3}>
                        <Input
                          onChange={e => {
                            this.onChangeSearchValue('w.reg_dept_name', ` and w.reg_dept_name like '%${e.target.value}%'`, e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>시행일자</th>
                      <td colSpan={3}>
                        <StyledDatePicker
                          format="YYYY-MM-DD"
                          onChange={(date, dateStr) => this.onChangeSearchValue('w.end_dttm1', ` and w.end_dttm >= date'${dateStr}'`, dateStr)}
                        />
                        ~{' '}
                        <StyledDatePicker
                          format="YYYY-MM-DD"
                          onChange={(date, dateStr) => this.onChangeSearchValue('w.end_dttm2', ` and w.end_dttm < date'${dateStr}'+integer'1'`, dateStr)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </StyledHtmlTable>
              {this.renderDetailSearch()}
            </div>
          </div>
        </div>
        <BizBuilderBase sagaKey={`BizDoc_${workSeq}`} viewType="LIST" conditional={this.state.whereStr} workSeq={workSeq}></BizBuilderBase>
      </StyledSearch>
    );
  }
}

export default SearchDetail;

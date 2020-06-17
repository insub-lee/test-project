import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTreeFromFlatData } from 'react-sortable-tree';
import { Table, Input, message, TreeSelect, Select } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import moment from 'moment';
import ExcelDownloader from './Excel';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;

const getCategoryMapListAsTree = (flatData, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: true,
      depth: item.LVL,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
    depth: node => node.depth,
  });

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1831 } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
    const currentYear = moment().year();
    const yearList = [];
    for (let i = Number(currentYear) - 20; i <= Number(currentYear); i += 1) {
      yearList.push(i.toString());
    }
    this.setState({ yearList });
  }

  searchList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'treeSelectData',
        type: 'POST',
        url: `/api/eshs/v1/common/dangerHazard?TASK_SEQ=${id}`,
        params: { PARAM: { NODE_ID: 1831 } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  onChangeSelect = (value, node, extra) => {
    console.debug('test : ', value, node, extra);
  };

  initData = () => {
    const {
      result: { treeSelectData },
    } = this.props;
    const nData =
      (treeSelectData &&
        treeSelectData.categoryMapList &&
        getCategoryMapListAsTree(
          treeSelectData.categoryMapList.filter(f => f.USE_YN === 'Y' && f.LVL !== 7),
          1831,
        )) ||
      [];
    this.setState({ nData });
  };

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { nData, yearList, listData } = this.state;
    const columns = [];
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <Select>{yearList && yearList.map(item => <Option value={item}>{item}</Option>)}</Select>
          <AntdTreeSelect
            style={{ width: '300px' }}
            className="mr5 select-mid"
            defultValue={this.state.changeSelectValue}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={nData || []}
            placeholder="Please select"
            onSelect={(value, node, extra) => this.onChangeSelect(value, node, extra)}
          />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first btn-sm" onClick={this.selectCode}>
              검색
            </StyledButton>
            {listData && listData.length > 0 && <ExcelDownloader dataList={listData} excelNm="위험요인List-Up" />}
          </StyledButtonWrapper>
        </div>
        {/* <AntdLineTable
          rowKey="REG_NO"
          key="REG_NO"
          columns={columns}
          dataSource={listData || []}
          bordered
          onRow={record => ({
            onClick: () => {
              message.info('개발중입니다.');
            },
          })}
          footer={() => <span>{`${listData && listData.length} 건`}</span>}
        /> */}
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;

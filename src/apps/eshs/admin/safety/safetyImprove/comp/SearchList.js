import * as PropTypes from 'prop-types';
import React from 'react';
import { Table, Input, Select } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

const columns = [
  {
    title: '발행번호',
    align: 'center',
    dataIndex: 'REQ_NO',
    width: '130px',
  },
  {
    title: '문서상태',
    align: 'center',
    dataIndex: 'STTLMNT_STATUS_NAME',
    width: '130px',
  },
  {
    title: '위치',
    align: 'center',
    dataIndex: 'LOC_NAME',
    width: '130px',
  },
  {
    title: '제목',
    align: 'center',
    dataIndex: 'TITLE',
    width: '800px',
  },
  {
    title: '요청팀',
    align: 'center',
    dataIndex: 'REQ_DEPT_NAME',
    width: '250px',
  },
  {
    title: '요청자',
    align: 'center',
    dataIndex: 'REQ_EMP_NAME',
    width: '100px',
  },
  {
    title: '조치팀',
    align: 'center',
    dataIndex: 'ACP_DEPT_NM',
    width: '250px',
  },
  {
    title: '조치자',
    align: 'center',
    dataIndex: 'ACP_EMP_NM',
    width: '100px',
  },
  {
    title: '유형',
    align: 'center',
    dataIndex: 'EACH_TYPE',
    width: '80px',
  },
  {
    title: '등급',
    align: 'center',
    dataIndex: 'GRADE',
    width: '80px',
  },
];

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {
        searchType: 'REQ_NO',
        searchText: `SR${currentYear}`,
      },
    };
  }

  componentDidMount = () => {
    this.search();
  };

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

  search = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;
    spinningOn();
    const apiAry = [
      {
        key: 'list',
        url: '/api/eshs/v1/common/eshsSafetySwtbImproveList',
        type: 'POST',
        params: { PARAM: searchParam },
      },
    ];

    getCallDataHandler(id, apiAry, spinningOff);
  };

  render() {
    const { result, onClickRow, modalVisible } = this.props;
    const { searchParam } = this.state;
    const list = (result && result.list && result.list.list) || [];
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdSelect
              placeholder="검색구분"
              className="select-sm mr5"
              defaultValue={searchParam.searchType || ''}
              style={{ width: '100px' }}
              onChange={val =>
                this.setState(prevState => ({
                  searchParam: { ...prevState.searchParam, searchType: val },
                }))
              }
            >
              <AntdSelect.Option value="REQ_NO">발행번호</AntdSelect.Option>
              <AntdSelect.Option value="STTLMNT_STATUS">문서상태</AntdSelect.Option>
              <AntdSelect.Option value="LOC">위치</AntdSelect.Option>
              <AntdSelect.Option value="REQ_DEPT">요청팀</AntdSelect.Option>
              <AntdSelect.Option value="REQ_EMP">요청자</AntdSelect.Option>
              <AntdSelect.Option value="ACP_DEPT">담당팀</AntdSelect.Option>
              <AntdSelect.Option value="ACP_EMP_NM">담당자</AntdSelect.Option>
              <AntdSelect.Option value="EACH_TYPE">유형</AntdSelect.Option>
              <AntdSelect.Option value="GRADE">등급</AntdSelect.Option>
            </AntdSelect>
            <AntdInput
              className="ant-input-sm"
              defaultValue={searchParam.searchText || ''}
              style={{ width: '200px' }}
              placeholder="검색어"
              onPressEnter={this.search}
              onChange={e => {
                const { value } = e.target;
                return this.setState(prevState => ({
                  searchParam: { ...prevState.searchParam, searchText: value },
                }));
              }}
              allowClear
            />
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm mr5" onClick={this.search}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>

        <AntdTable
          columns={columns}
          bordered
          rowKey="REQ_NO"
          footer={() => <span>{`${list.length || 0} 건`}</span>}
          scroll={{ x: 700 }}
          dataSource={list || []}
          onRow={record => ({
            onClick: () => {
              onClickRow(record);
              modalVisible();
            },
          })}
        />
      </StyledContentsWrapper>
    );
  }
}

const SearchList = ({ onClickRow, modalVisible }) => (
  <BizMicroDevBase sagaKey="SearchList" onClickRow={onClickRow} modalVisible={modalVisible} component={Comp}></BizMicroDevBase>
);

SearchList.propTypes = {
  onClickRow: PropTypes.func,
  modalVisible: PropTypes.func,
};

SearchList.defaultProps = {
  onClickRow: () => {},
  modalVisible: () => {},
};

Comp.propTypes = {
  sagaKey: PropTypes.string,
  onClickRow: PropTypes.func,
  modalVisible: PropTypes.func,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

Comp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default SearchList;

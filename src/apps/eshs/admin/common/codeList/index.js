import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ExcelDownloader from '../Excel';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);

const { Option } = Select;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSelectValue: '',
      keyword: '',
      name: '',
      code: '',
      selectBoxData: [],
      listData: [],
      pullpath: '',
      nodeOrdinal: '',
      nodeId: '',
    };
  }

  componentDidMount() {
    this.selectDataApi();
  }

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value, code: '', name: '', useYN: '' }, () => this.selectCode());
  };

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  callBackApi = () => {
    this.selectDataApi();
  };

  selectDataApi() {
    const { sagaKey: id, getCallDataHandler, INIT_NODE_ID } = this.props;
    const apiAry = [
      {
        key: 'apiData',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: INIT_NODE_ID } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { apiData },
      INIT_NODE_ID,
    } = this.props;
    const { changeSelectValue } = this.state;
    const initNodeData = apiData && apiData.categoryMapList.find(x => x.NODE_ID === INIT_NODE_ID);
    const selectBoxData = apiData && apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === INIT_NODE_ID && x.LVL === 2 && x.USE_YN === 'Y');
    const listData = apiData && apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === changeSelectValue && x.LVL === 3);
    const excelData =
      apiData &&
      apiData.categoryMapList
        .filter(x => x.FULLPATH.indexOf(`${initNodeData.FULLPATH}`) !== -1 && x.LVL > 2)
        .map(item => ({
          ...item,
          PARENT_NODE: apiData && apiData.categoryMapList.find(f => item.PARENT_NODE_ID === f.NODE_ID).NAME_KOR,
        }));
    const pullpath = apiData && apiData.categoryMapList.find(x => x.NODE_ID === changeSelectValue);
    this.setState({
      selectBoxData,
      listData,
      pullpath: pullpath && pullpath.FULLPATH,
      nodeOrdinal: pullpath && pullpath.NODE_ORDINAL,
      excelData,
      excelNm: initNodeData.NAME_KOR,
    });
  };

  // 코드종류 변경
  selectCode = () => {
    const { result } = this.props;
    const { changeSelectValue } = this.state;
    if (changeSelectValue) {
      const listData = result && result.apiData && result.apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === changeSelectValue && x.LVL === 3);
      const pullpath = result && result.apiData && result.apiData.categoryMapList.find(x => x.NODE_ID === changeSelectValue);
      this.setState({ listData, pullpath: pullpath && pullpath.FULLPATH, nodeOrdinal: pullpath && pullpath.NODE_ORDINAL });
    } else {
      message.warning('코드 구분을 선택해주세요.');
    }
  };

  // 검색버튼
  searchCode = () => {
    const { result } = this.props;
    const { changeSelectValue, keyword } = this.state;
    if (changeSelectValue) {
      const listData =
        result &&
        result.apiData &&
        result.apiData.categoryMapList
          .filter(x => x.PARENT_NODE_ID === changeSelectValue && x.LVL === 3)
          .filter(x => x.NAME_KOR.includes(keyword) || x.CODE.includes(keyword));
      const pullpath = result && result.apiData && result.apiData.categoryMapList.find(x => x.NODE_ID === changeSelectValue);
      this.setState({ listData, pullpath: pullpath && pullpath.FULLPATH, nodeOrdinal: pullpath && pullpath.NODE_ORDINAL });
    } else {
      message.warning('코드 구분을 선택해주세요.');
    }
  };

  insertOverlab = () => {
    const { changeSelectValue, listData } = this.state;
    if (changeSelectValue) {
      const overlab = listData && listData[0] && listData.find(item => item.CODE === this.state.code);
      if (overlab) {
        message.warning('기존에 동일한 코드가 존재합니다.');
      } else {
        this.onChangeData('I');
      }
    } else {
      message.warning('코드 구분을 선택해주세요.');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga, MAP_ID } = this.props;

    const submitData = {
      MAP_ID,
      PARENT_NODE_ID: this.state.changeSelectValue,
      LVL: 3,
      NODE_ORDINAL: this.state.nodeOrdinal,
      FULLPATH: this.state.pullpath,
      CODE: this.state.code,
      NAME_KOR: this.state.name,
      NAME_ENG: '',
      NAME_CHN: '',
      DESCIPTION: '',
      USE_YN: value === 'D' ? 'N' : 'Y',
      NODE_ID: value !== 'I' ? this.state.nodeId : '',
    };
    if (this.state.name && this.state.changeSelectValue) {
      if (value === 'U' && this.state.code) {
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.modifyCallback);
      } else if (this.state.code && value === 'D') {
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.deleteCallback);
      } else if (this.state.code && value === 'R') {
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.recoverCallback);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/admin/v1/common/categoryMap', submitData, this.insertCallback);
      } else if (!this.state.code) {
        message.warning('코드가 올바르지 않습니다.');
      }
    } else if (!this.state.changeSelectValue) {
      message.warning('코드 구분을 선택해주세요.');
    } else if (!this.state.name) {
      message.warning('코드명을 올바르게 입력하시오.');
    }
    this.onReset();
  };

  insertCallback = (id, response) => {
    if (response.code === 200) {
      message.success('등록이 완료되었습니다.');
      this.callBackApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  modifyCallback = (id, response) => {
    if (response.code === 200) {
      message.success('수정이 완료되었습니다.');
      this.callBackApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  deleteCallback = (id, response) => {
    if (response.code === 200) {
      message.success('삭제가 완료되었습니다.');
      this.callBackApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  recoverCallback = (id, response) => {
    if (response.code === 200) {
      message.success('삭제 취소가 완료되었습니다.');
      this.callBackApi();
    } else {
      message.warning('서버의 문제가 발생했습니다.');
    }
  };

  onReset = () => {
    this.setState({
      name: '',
      code: '',
      useYN: '',
    });
  };

  selectedRecord = record => {
    this.setState({
      changeSelectValue: record.PARENT_NODE_ID,
      name: record.NAME_KOR,
      code: record.CODE,
      nodeId: record.NODE_ID,
      useYN: record.USE_YN,
    });
  };

  // Input 키 누를 때 - 엔터키
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.searchCode();
    }
  };

  render() {
    const { selectBoxData, listData, excelData, excelNm, code, name, useYN } = this.state;
    const columns = [
      {
        title: '상태',
        align: 'center',
        width: 150,
        children: [
          {
            title: (
              <>
                {useYN === 'Y' ? (
                  <span className="span-item">사용</span>
                ) : (
                  <StyledButton className="btn-light btn-xs" onClick={() => this.onChangeData('R')}>
                    삭제 취소
                  </StyledButton>
                )}
              </>
            ),
            dataIndex: 'USE_YN',
            className: 'th-form',
            align: 'center',
            width: 150,
            render: item => <span>{item === 'Y' ? '사용중' : '삭제'}</span>,
          },
        ],
        sorter: (a, b) => (a.USE_YN === 'Y' ? 1 : 2) - (b.USE_YN === 'Y' ? 1 : 2),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '코드',
        align: 'left',
        width: 150,
        children: [
          {
            title: <AntdInput className="ant-input-xs input-left" value={code} onChange={e => this.onChangeValue('code', e.target.value)} />,
            className: 'th-form',
            dataIndex: 'CODE',
            align: 'left',
          },
        ],
        sorter: (a, b) => {
          const checkNum = Number.isNaN(a.CODE);
          if (checkNum) return Number(a.CODE) - Number(b.CODE);
          return a.CODE.length - b.CODE.length;
        },
        sortDirections: ['descend', 'ascend'],
      },
      {
        align: 'left',
        title: '코드명',
        children: [
          {
            title: (
              <>
                <AntdInput
                  className="ant-input-inline ant-input-xs input-left mr5"
                  style={{ width: '300px' }}
                  value={name}
                  onChange={e => this.onChangeValue('name', e.target.value)}
                />
                <StyledButtonWrapper className="btn-wrap-inline">
                  <StyledButton className="btn-gray btn-xs btn-first" onClick={this.insertOverlab}>
                    추가
                  </StyledButton>
                  <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.onChangeData('U')}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-light btn-xs btn-first" onClick={() => this.onChangeData('D')}>
                    삭제
                  </StyledButton>
                  <StyledButton className="btn-light btn-xs" onClick={this.onReset}>
                    Reset
                  </StyledButton>
                </StyledButtonWrapper>
              </>
            ),
            className: 'th-form',
            dataIndex: 'NAME_KOR',
            align: 'left',
          },
        ],
        sorter: (a, b) => a.NAME_KOR.length - b.NAME_KOR.length,
        sortDirections: ['descend', 'ascend'],
      },
    ];
    return (
      <StyledContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdSelect className="select-sm" style={{ width: 200 }} onChange={value => this.changeSelectValue(value)} defaultValue="0">
              <Option value="0" disabled>
                선택
              </Option>
              {selectBoxData && selectBoxData.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
            </AntdSelect>
            <AntdInput
              className="ant-input-sm ant-input-inline ml5"
              defaultValue=""
              placeHolder="코드 or 코드명 입력"
              style={{ width: '300px' }}
              onKeyPress={this.handleKeyPress}
              onChange={e => this.setState({ keyword: e.target.value })}
            />
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray mr5 btn-sm" onClick={this.searchCode}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearch>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <ExcelDownloader dataList={excelData} excelNm={excelNm} />
        </StyledButtonWrapper>
        <AntdTable
          rowKey={listData.NODE_ID}
          key={listData.NODE_ID}
          columns={columns}
          dataSource={listData || []}
          bordered
          onRow={record => ({
            onClick: () => {
              this.selectedRecord(record);
            },
          })}
          footer={() => <span>{`${listData && listData.length} 건`}</span>}
        />
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  MAP_ID: PropTypes.number,
  result: PropTypes.any,
  INIT_NODE_ID: PropTypes.number,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;

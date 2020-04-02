import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Select, Input, message } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

import Moment from 'moment';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSelectValue: '',
      name: '',
      code: '',
      selectBoxData: [],
      listData: [],
      codeType: '',
      pullpath: '',
      nodeOrdinal: '',
      nodeId: '',
    };
  }

  componentDidMount() {
    this.selectDataApi();
    this.setColumns();
  }

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value, code: '', name: '', useYN: '' }, () => this.selectCode());
  };

  onChangeValue = (name, value) => {
    this.setState({ name: value });
  };

  callBackApi = () => {
    this.selectDataApi();
  };

  selectDataApi() {
    const { sagaKey: id, getCallDataHandler, MAP_ID } = this.props;
    const apiAry = [
      {
        key: 'apiData',
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=${MAP_ID}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result, INIT_NODE_ID } = this.props;
    const { changeSelectValue } = this.state;
    const selectBoxData =
      result && result.apiData && result.apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === INIT_NODE_ID && x.LVL === 2 && x.USE_YN === 'Y');
    const listData = result && result.apiData && result.apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === changeSelectValue && x.LVL === 3);
    const pullpath = result && result.apiData && result.apiData.categoryMapList.find(x => x.NODE_ID === changeSelectValue);
    this.setState({ selectBoxData, listData, pullpath: pullpath && pullpath.FULLPATH, nodeOrdinal: pullpath && pullpath.NODE_ORDINAL });
    this.codeFomat(listData && listData[0]);
  };

  selectCode = () => {
    const { result } = this.props;
    const { changeSelectValue } = this.state;
    if (changeSelectValue) {
      const listData = result && result.apiData && result.apiData.categoryMapList.filter(x => x.PARENT_NODE_ID === changeSelectValue && x.LVL === 3);
      const pullpath = result && result.apiData && result.apiData.categoryMapList.find(x => x.NODE_ID === changeSelectValue);
      this.setState({ listData, pullpath: pullpath && pullpath.FULLPATH, nodeOrdinal: pullpath && pullpath.NODE_ORDINAL });
      this.codeFomat(listData && listData[0]);
    } else {
      message.warning('코드 구분을 선택해주세요.');
    }
  };

  codeFomat = codeData => {
    let codeType = '';
    if (codeData && codeData.CODE.indexOf('00') === 0) {
      codeType = '00Format';
    } else if (codeData && codeData.CODE === codeData.NAME_KOR) {
      codeType = 'nameFormat';
    } else {
      codeType = 'selfTyping';
    }
    this.setState({
      codeType,
    });
  };

  insertOverlab = () => {
    const { codeType, listData, name } = this.state;
    if (codeType === 'selfTyping') {
      const overlab = listData && listData[0] && listData.find(item => item.CODE === this.state.code);
      if (overlab) {
        message.warning('기존에 동일한 코드가 존재합니다.');
      } else {
        this.onChangeData('I');
      }
    } else if (codeType === '00Format') {
      let max;
      if (listData && listData[0]) {
        max =
          listData.length > 1
            ? listData.reduce((prev, curr) => (Number(prev.CODE) > Number(curr.CODE) ? Number(prev.CODE) : Number(curr.CODE)))
            : Number(listData[0].CODE);
      }
      this.setState({ code: `00${String(max + 1)}` }, () => this.onChangeData('I'));
    } else if (codeType === 'nameFormat') {
      this.setState({ code: name }, () => this.onChangeData('I'));
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
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (this.state.code && (value === 'D' || value === 'R')) {
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
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

  onReset = () => {
    this.setState(
      {
        name: '',
        code: '',
        useYN: '',
      },
      this.setColumns,
    );
  };

  setColumns = () => {
    const { codeType, code, name, useYN } = this.state;
    const columns = [
      {
        title: (
          <>
            <span className="th-label">상태</span>
            <div className="td-input-wrapper">
              {useYN === 'Y' ? (
                <span className="span-item">사용</span>
              ) : (
                <StyledButton className="btn-gray btn-sm" onClick={() => this.onChangeData('R')}>
                  삭제 취소
                </StyledButton>
              )}
            </div>
          </>
        ),
        dataIndex: 'USE_YN',
        align: 'center',
        width: 150,
        render: item => <span>{item === 'Y' ? '사용중' : '삭제'}</span>,
      },
      {
        title: (
          <>
            <span className="th-label">코드</span>
            <div className="td-input-wrapper">
              <AntdInput
                className="input-sm input-center"
                readOnly={codeType !== 'selfTyping'}
                onClick={codeType !== 'selfTyping' ? () => message.warning('입력하는 코드형식이 아닙니다') : ''}
                value={code}
                onChange={e => this.onChangeValue('code', e.target.value)}
              />
            </div>
          </>
        ),
        dataIndex: 'CODE',
        align: 'center',
        width: 150,
      },
      {
        title: (
          <>
            <span className="th-label th-label-left">코드명</span>
            <div className="td-input-wrapper">
              <AntdInput
                className="ant-input-inline input-sm input-left"
                style={{ width: '300px' }}
                value={name}
                onChange={e => this.onChangeValue('code', e.target.value)}
              />
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-gray btn-sm btn-first" onClick={this.insertOverlab}>
                  추가
                </StyledButton>
                <StyledButton className="btn-light btn-sm btn-first" onClick={() => this.onChangeData('U')}>
                  수정
                </StyledButton>
                <StyledButton className="btn-light btn-sm btn-first" onClick={() => this.onChangeData('D')}>
                  삭제
                </StyledButton>
                <StyledButton className="btn-light btn-sm" onClick={this.onReset}>
                  Reset
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          </>
        ),
        dataIndex: 'NAME_KOR',
        align: 'left',
      },
    ];
    this.setState({ columns });
  };

  selectedRecord = record => {
    this.setState(
      {
        changeSelectValue: record.PARENT_NODE_ID,
        name: record.NAME_KOR,
        code: record.CODE,
        nodeId: record.NODE_ID,
        useYN: record.USE_YN,
      },
      this.setColumns,
    );
  };

  render() {
    const { selectBoxData, listData, columns } = this.state;
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <AntdSelect className="selectMid mr5" onChange={value => this.changeSelectValue(value)} defaultValue="0">
            <Option value="0" disabled>
              선택
            </Option>
            {selectBoxData && selectBoxData.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first btn-light btn-sm" onClick={this.selectCode}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-light btn-sm">엑셀받기</StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          className="tableWrapper tableCodeWrapper"
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
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  MAP_ID: PropTypes.string,
  result: PropTypes.any,
  INIT_NODE_ID: PropTypes.number,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;

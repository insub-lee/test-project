import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, message, Select, Spin, Popconfirm } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import ExcelDownloader from './Excel';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;

// 선택된 레벨, 부모값이 일치하는 배열리턴
const getCategoryMapFilter = (type, flatData, prntCd) => {
  const result = flatData.filter(item => item.CODE !== prntCd);
  if (type === 'menu') {
    return result.map(item => ({
      title: item.CD_NAME,
      value: item.CODE,
      key: item.CODE,
      parentValue: item.PRNT_CD,
      selectable: true,
    }));
  }
  return result;
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // render
      isLoaded: true,
      changeTitle: '부서',
      // List
      listData: [],
      // FormData
      formData: {
        ESSENTIAL: -1, // FR_DEPT 테이블에 존재하는 부서일시 삭제 불가하도록 하는 구분 -1일 경우만 삭제가능
        CD_NAME: '',
        CD_TYPE: '',
        CODE: '',
        COMP_CD: '',
        LVL: -1,
        PRNT_CD: '',
        REMARK: '',
        USE_YN: '',
      },
      // Search Value
      searchValue: {
        prntCd: 'M000',
        depth: 1,
        useYn: 'Y',
      },
      // Menu, List
      lvl1: [],
      lvl2: [],
      lvl3: [],
      lvl4: [],
      selected1: 'M000',
      selected2: '',
      selected3: '',
      selected4: '',
    };
  }

  componentDidMount() {
    this.getCode('M000', 1, 'Y');
  }

  // 부서정보 호출
  getCode = (prntCode, depth, useYn) => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    this.setState({
      isLoaded: false,
    });

    // 부모키 설정 (prntCode = '', 일경우 이전 LVL의 선택값을 부모키로 설정)
    let lastCode = prntCode;
    let lastDepth = depth;
    if (prntCode === '') {
      switch (depth) {
        case 2:
          lastCode = this.state.selected1;
          lastDepth -= 1;
          break;
        case 3:
          lastCode = this.state.selected2;
          lastDepth -= 1;
          break;
        case 4:
          lastCode = this.state.selected3;
          lastDepth -= 1;
          break;
        default:
          break;
      }
    }

    const apiInfo = {
      key: 'workStepCode',
      type: 'POST',
      url: '/api/eshs/v1/common/dangerWorkStepCode',
      params: { PARAM: { TYPE: 'GET', CODE: lastCode, DEPTH: lastDepth, USE_YN: useYn } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.getCodeCallback);
  };

  getCodeCallback = (id, response) => {
    const { PARAM, workStepCode } = response;
    const { CODE: prntCd, DEPTH: depth, USE_YN: useYn } = PARAM;
    const menu = getCategoryMapFilter('menu', workStepCode, prntCd);
    const listData = getCategoryMapFilter('list', workStepCode, prntCd);
    const parent = workStepCode.find(item => item.CODE === prntCd);
    let changeTitle;
    switch (depth) {
      case 2:
        changeTitle = '공정(장소)';
        break;
      case 3:
        changeTitle = '세부공정';
        break;
      case 4:
        changeTitle = '장비(설비)';
        break;
      default:
        changeTitle = '부서';
        break;
    }
    const lastLv = prntCd === 'M000' ? depth : depth + 1;
    this.setState({
      isLoaded: true,
      changeTitle,
      [`lvl${lastLv}`]: menu,
      listData,
      [`selected${depth}`]: prntCd,
      [`selected${depth + 1}`]: '',
      searchValue: {
        prntCd,
        depth,
        useYn,
      },
      formData: {
        ESSENTIAL: -1,
        CODE: '',
        COMP_CD: parent.COMP_CD,
        CD_NAME: '',
        LVL: lastLv,
        USE_YN: 'Y',
        CD_TYPE: depth > 1 ? 'C' : 'D',
        PRNT_CD: prntCd,
        REMARK: '',
      },
    });
  };

  // 메뉴트리 변경시 재조회
  onChangeSelect = (depth, prntCd) => {
    const { searchValue } = this.state;
    const { useYn } = searchValue;
    this.getCode(prntCd, depth, useYn);
  };

  // 사용여부 변경시 재조회
  onChangeUseYnSelect = useYn => {
    const { searchValue } = this.state;
    const { prntCd, depth } = searchValue;
    this.getCode(prntCd, depth, useYn);
  };

  // Row 선택
  selectedRecord = record => {
    this.setState({
      formData: {
        ESSENTIAL: record.ESSENTIAL,
        CODE: record.CODE,
        COMP_CD: record.COMP_CD,
        CD_NAME: record.CD_NAME,
        LVL: record.LVL,
        USE_YN: record.USE_YN,
        CD_TYPE: record.CD_TYPE,
        PRNT_CD: record.CODE,
        REMARK: record.REMARK,
      },
    });
  };

  // Reset = Row 선택 취소
  onReset = () => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        ESSENTIAL: -1,
        CODE: '',
        CD_NAME: '',
        USE_YN: 'Y',
        REMARK: '',
      },
    });
  };

  // FormData 변경
  onChangeFormData = (field, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [field]: value,
      },
    });
  };

  // FormData Submit
  submitFormData = submitType => {
    const { sagaKey: id, getCallDataHandlerReturnRes, profile } = this.props;
    const { formData } = this.state;
    const { ESSENTIAL, LVL, COMP_CD } = formData;
    let submitData = {};
    switch (submitType) {
      case 'DELETE':
        submitData = {
          ...formData,
          USE_YN: 'N',
        };
        break;
      case 'RESTORE':
        submitData = {
          ...formData,
          USE_YN: 'Y',
        };
        break;
      default:
        submitData = {
          ...formData,
          COMP_CD: LVL > 2 ? '' : COMP_CD,
        };
        break;
    }
    if (ESSENTIAL > 0 && submitType === 'DELETE') {
      return message.warning('해당 부서는 부서정보 연동데이터로 삭제하실수 없습니다.');
    }
    const apiInfo = {
      key: 'workStepCode',
      type: 'POST',
      url: '/api/eshs/v1/common/dangerWorkStepCode',
      params: { PARAM: { TYPE: submitType, ...submitData, EMP_NO: profile.EMP_NO } },
    };
    return getCallDataHandlerReturnRes(id, apiInfo, this.submitFormDataCallback);
  };

  submitFormDataCallback = (id, response) => {
    const { result, PARAM } = response;
    const { TYPE } = PARAM;
    let SuccessMsg = '';
    let FailMsg = '';
    switch (TYPE) {
      case 'INSERT':
        SuccessMsg = '코드를 등록하였습니다.';
        FailMsg = '코드등록에 실패하였습니다.';
        break;
      case 'UPDATE':
        SuccessMsg = '코드를 수정하였습니다.';
        FailMsg = '코드수정에 실패하였습니다.';
        break;
      case 'DELETE':
        SuccessMsg = '코드 미사용으로 전환하였습니다.';
        FailMsg = '코드 미사용전환에 실패하였습니다.';
        break;
      case 'RESTORE':
        SuccessMsg = '코드 사용으로 전환하였습니다.';
        FailMsg = '코드 사용전환에 실패하였습니다.';
        break;
      default:
        break;
    }
    if (result < 1) return message.error(FailMsg);
    const { searchValue } = this.state;
    const { prntCd, depth, useYn } = searchValue;
    message.success(SuccessMsg);
    return this.getCode(prntCd, depth, useYn);
  };

  render() {
    const {
      isLoaded,
      formData,
      listData,
      changeTitle,
      searchValue,
      lvl1,
      lvl2,
      lvl3,
      lvl4,
      selected1,
      selected2,
      selected3,
      selected4,
    } = this.state;
    const { useYn } = searchValue;
    const { CD_NAME, CODE, REMARK, USE_YN } = formData;
    const columns = [
      {
        title: '상태',
        children: [
          {
            title: (
              <>
                {CODE && USE_YN === 'Y' ? (
                  <span className="span-item">사용</span>
                ) : (
                  <>
                    {CODE && USE_YN === 'N' ? (
                      <StyledButton className="btn-gray btn-xs" onClick={() => this.submitFormData('RESTORE')}>
                        삭제 취소
                      </StyledButton>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </>
            ),
            dataIndex: 'USE_YN',
            align: 'center',
            className: 'th-form',
            width: 150,
            render: item => <span>{item === 'Y' ? '사용' : '미사용'}</span>,
          },
        ],
      },
      {
        title: `${changeTitle}코드`,
        children: [
          {
            title: <span>{CODE || ''}</span>,
            className: 'th-form',
            dataIndex: 'CODE',
            align: 'center',
            width: 100,
          },
        ],
      },
      {
        title: `${changeTitle}`,
        align: 'left',
        children: [
          {
            title: (
              <AntdInput
                className="ant-input-inline ant-input-sm input-left"
                style={{ width: 150 }}
                value={CD_NAME}
                onChange={e => this.onChangeFormData('CD_NAME', e.target.value)}
              />
            ),
            className: 'th-form',
            dataIndex: 'CD_NAME',
            align: 'left',
            width: 150,
          },
        ],
      },
      {
        title: '비고',
        align: 'left',
        children: [
          {
            title: (
              <>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left mr5"
                  style={{ width: 400 }}
                  value={REMARK}
                  onChange={e => this.onChangeFormData('REMARK', e.target.value)}
                />
                <StyledButtonWrapper className="btn-wrap-inline">
                  {CODE === '' ? (
                    <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.submitFormData('INSERT')}>
                      추가
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.submitFormData('UPDATE')}>
                        수정
                      </StyledButton>
                      <Popconfirm
                        placement="rightTop"
                        title="삭제하시겠습니까?"
                        onConfirm={() => this.submitFormData('DELETE')}
                        okText="Yes"
                        cancelText="No"
                      >
                        <StyledButton className="btn-gray btn-xs btn-first">삭제</StyledButton>
                      </Popconfirm>
                    </>
                  )}
                  <StyledButton className="btn-gray btn-xs" onClick={this.onReset}>
                    Reset
                  </StyledButton>
                </StyledButtonWrapper>
              </>
            ),
            className: 'th-form',
            dataIndex: 'REMARK',
            align: 'left',
          },
        ],
      },
    ];
    return (
      <ContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            {/* 1 Depth (부서 대분류) */}
            <span className="text-label">분류</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.onChangeSelect(1, value)}
              value={selected1}
            >
              <Option value="M000">전체</Option>
              {lvl1.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 2 Depth (부서 중소분류) */}
            <span className="text-label">부서</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.onChangeSelect(2, value)}
              value={selected1 === 'M000' ? '' : selected2}
              disabled={selected1 === 'M000'}
            >
              <Option value="">부서전체</Option>
              {lvl2.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 3 Depth */}
            <span className="text-label">공정(장소)</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.onChangeSelect(3, value)}
              value={selected1 === 'M000' || selected2 === '' ? '' : selected3}
              disabled={selected1 === 'M000' || selected2 === ''}
            >
              <Option value="">장소전체</Option>
              {lvl3.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 4 Depth */}
            <span className="text-label">세부공정</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.onChangeSelect(4, value)}
              value={selected1 === 'M000' || selected2 === '' || selected3 === '' ? '' : selected4}
              disabled={selected1 === 'M000' || selected2 === '' || selected3 === ''}
            >
              <Option value="">공정전체</Option>
              {lvl4.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            <span className="text-label">사용여부</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '80px' }}
              onChange={value => this.onChangeUseYnSelect(value)}
              value={useYn}
            >
              <Option value="Y">사용</Option>
              <Option value="N">미사용</Option>
            </AntdSelect>
          </div>
          <div className="btn-area">
            {listData && listData.length > 0 && <ExcelDownloader dataList={listData} excelNm="작업단계관리" />}
          </div>
        </StyledCustomSearch>
        <Spin spinning={!isLoaded} tip="Data Loading...">
          <AntdLineTable
            rowKey="NODE_ID"
            key="NODE_ID"
            columns={columns}
            dataSource={listData || []}
            bordered
            pagination={{ pageSize: 20 }}
            onRow={record => ({
              onClick: () => {
                this.selectedRecord(record);
              },
            })}
            footer={() => <span>{`${listData && listData.length} 건`}</span>}
          />
        </Spin>
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  profile: PropTypes.object,
  getCallDataHandlerReturnRes: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandlerReturnRes: () => false,
};

export default List;

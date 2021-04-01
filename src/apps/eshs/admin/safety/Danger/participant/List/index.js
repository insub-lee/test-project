import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, Modal, Popconfirm, Spin } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import moment from 'moment';
import { columns } from './tableColumn';
import UserSearch from '../Modal/userSearch';
import InputPage from '../Modal/inputPage';

moment.locale('ko');
const { Option } = Select;
const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

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
      isLoaded: true,
      // Modal 컨트롤
      modalOn: false,
      modalTitle: '',
      modalType: '',
      modalUserList: [],
      modalMenu: [],
      // Modal 검색
      modalSearchInfo: {
        type: 'NAME',
        keyword: '',
      },
      // Excel 다운로드 관련
      btnTex: '',
      fileName: '',
      sheetName: '',
      excelColumns: [],
      fields: [],
      // 검색에 필요한 변수
      year: moment().format('YYYY'),
      empNo: '',
      lvl1: [], // 분류 리스트
      lvl2: [], // 부서 리스트
      lvl3: [], // 공정(장소) 리스트
      selected1: 'M000', // 선택된 분류
      selected2: '', // 선택된 부서
      selected3: '', // 선택된 공정(장소)
      listData: [], // 리스트 데이터
      selectedRowKeys: [], // 선택된 키값
    };
  }

  // 페이지 진입
  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'getAllWorkStepCode',
        type: 'POST',
        url: '/api/eshs/v1/common/dangerWorkStepCode',
        params: { PARAM: { TYPE: 'GET', CODE: 'M000', IS_ALL: 'ALL', USE_YN: 'Y', MAX_LV: 3 } },
      },
      {
        key: 'getWorkStepCode',
        type: 'POST',
        url: '/api/eshs/v1/common/dangerWorkStepCode',
        params: { PARAM: { TYPE: 'GET', CODE: 'M000', DEPTH: 1, USE_YN: 'Y' } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initCallback);
  };

  // 초기값 설정
  initCallback = () => {
    const {
      result: { getWorkStepCode, getAllWorkStepCode },
    } = this.props;
    const { workStepCode } = getWorkStepCode;
    const { workAllStepCode } = getAllWorkStepCode;
    const currentYear = moment().format('YYYY');

    // 부서메뉴
    const initMenu = getCategoryMapFilter('menu', workStepCode, 'M000');

    // 연도 셀렉트박스 Options 생성 (2006년 ~ 현재 + 1년 까지)
    const YearOptions = [];
    for (let year = 2006; year <= Number(currentYear) + 1; year += 1) {
      YearOptions.push(year);
    }

    this.setState({
      YearOptions,
      modalMenu: workAllStepCode,
      year: moment().format('YYYY'),
      empNo: '',
      lvl1: initMenu,
      selected1: 'M000',
      listData: [],
    });
  };

  // 분류, 부서, 공정(장소), 세부공정 메뉴정보 호출
  getCode = (prntCode, depth, useYn) => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
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
    // 해당페이지 에선 lvl4(= 세부공정) 이후의 메뉴가 불필요.
    if (!(depth === 3 && prntCode !== '')) {
      const apiInfo = {
        key: 'getWorkStepCode',
        type: 'POST',
        url: `/api/eshs/v1/common/dangerWorkStepCode`,
        params: { PARAM: { TYPE: 'GET', CODE: lastCode, DEPTH: lastDepth, USE_YN: useYn } },
      };
      getCallDataHandlerReturnRes(id, apiInfo, this.getCodeCallback);
    }
  };

  getCodeCallback = (id, response) => {
    const { PARAM, workStepCode } = response;
    const { CODE: prntCd, DEPTH: depth } = PARAM;
    const menu = getCategoryMapFilter('menu', workStepCode, prntCd);
    const lastLv = prntCd === 'M000' ? depth : depth + 1;
    this.setState({
      [`lvl${lastLv}`]: menu,
      [`selected${depth}`]: prntCd,
      [`selected${depth + 1}`]: '',
    });
  };

  // setState(key, value)
  onChangeState = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  // 모달내 검색조건 변경 setState
  onChangeModalSearchInfo = (fields, value) => {
    const { modalSearchInfo } = this.state;
    this.setState({
      modalSearchInfo: {
        ...modalSearchInfo,
        [fields]: value,
      },
    });
  };

  // 모달내 유저 검색
  modalSearch = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { modalSearchInfo } = this.state;
    const { type, keyword } = modalSearchInfo;
    const apiInfo = {
      key: 'modalUserList',
      type: 'POST',
      url: '/api/eshs/v1/common/paricipant',
      params: { PARAM: { TYPE: 'GET_USER', SEARCH_TYPE: type, KEYWORD: keyword } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.modalSearchCallback);
  };

  modalSearchCallback = (id, response) => {
    const { userList } = response;
    this.setState({
      modalUserList: userList,
    });
  };

  // 모달 컨트롤
  onChangeModal = (modalType, bool) => {
    let title = '';
    switch (modalType) {
      case 'userSearch':
        title = '사용자 검색';
        break;
      case 'inputPage':
        title = '참여자 추가';
        break;
      default:
        break;
    }
    this.setState({
      modalOn: bool,
      modalTitle: title,
      modalType,
      modalUserList: [],
      modalSearchInfo: {
        type: 'NAME',
        keyword: '',
      },
    });
  };

  // UserSearch Modal OnRowClick (검색영역 사번선택시)
  onRowClick = record => {
    this.setState(
      {
        empNo: record.EMP_NO,
      },
      () => this.onChangeModal('', false),
    );
  };

  // 검색
  onSearch = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { year, empNo, selected3 } = this.state;
    this.setState({ isLoaded: false });
    const apiInfo = {
      key: 'getParicipant',
      type: 'POST',
      url: `/api/eshs/v1/common/paricipant`,
      params: { PARAM: { TYPE: 'GET', DE_YEAR: year, EMP_NO: empNo, SDIV_CD: selected3 } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list } = response;
    this.setState({
      isLoaded: true,
      listData: list || [],
    });
  };

  onSave = formData => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'insertParicipant',
      type: 'POST',
      url: `/api/eshs/v1/common/paricipant`,
      params: { PARAM: { TYPE: 'INSERT', LIST: formData } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onSaveCallback);
  };

  onSaveCallback = (id, response) => {
    const { result } = response;
    if (result === 1) {
      this.onChangeModal('', false);
      this.onSearch();
      return message.success(<MessageContent>참여자 정보를 추가하였습니다.</MessageContent>);
    }
    return message.error(<MessageContent>참여자 정보 추가에 실패하였습니다.</MessageContent>);
  };

  onRowSelection = rowKeys => {
    this.setState({
      selectedRowKeys: rowKeys,
    });
  };

  deleteRow = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { selectedRowKeys } = this.state;
    const apiInfo = {
      key: 'deleteParicipant',
      type: 'POST',
      url: `/api/eshs/v1/common/paricipant`,
      params: { PARAM: { TYPE: 'DELETE', LIST: selectedRowKeys } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onDeleteCallback);
  };

  onDeleteCallback = (id, response) => {
    const { result } = response;
    if (result === 1) {
      this.onSearch();
      return message.success(<MessageContent>참여자 정보를 삭제하였습니다.</MessageContent>);
    }
    return message.error(<MessageContent>참여자 정보 삭제에 실패하였습니다.</MessageContent>);
  };

  render() {
    const {
      isLoaded,
      modalOn,
      modalTitle,
      modalType,
      modalUserList,
      modalMenu,
      // 모달 검색
      modalSearchInfo,
      // 검색조건 메뉴
      YearOptions,
      year,
      empNo,
      lvl1,
      lvl2,
      lvl3,
      selected1, // 선택된 분류 코드
      selected2, // 선택된 부서 코드
      selected3, // 선택된 공정(장소) 코드
      listData,
      selectedRowKeys, // 선택된 항목 Key[]
    } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <span className="text-label">참여 연도</span>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '100px' }}
                value={year}
                onChange={value => this.onChangeState('year', value)}
              >
                {YearOptions && YearOptions.map(YYYY => <Option value={`${YYYY}`}>{YYYY}</Option>)}
              </AntdSelect>
              {/* 1 Depth (분류) */}
              <span className="text-label">분류</span>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '200px' }}
                onChange={value => this.getCode(value, 1, 'Y')}
                value={selected1}
              >
                <Option value="M000">전체</Option>
                {lvl1.map(item => (
                  <Option value={item.value}>{item.title}</Option>
                ))}
              </AntdSelect>
              {/* 2 Depth (부서) */}
              <span className="text-label">부서</span>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '200px' }}
                onChange={value => this.getCode(value, 2, 'Y')}
                value={selected1 === 'M000' ? '' : selected2}
                disabled={selected1 === 'M000'}
              >
                <Option value="">부서전체</Option>
                {lvl2.map(item => (
                  <Option value={item.value}>{item.title}</Option>
                ))}
              </AntdSelect>
              {/* 3 Depth (공정(장소)) */}
              <span className="text-label">공정(장소)</span>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '200px' }}
                onChange={value => this.getCode(value, 3, 'Y')}
                value={selected1 === 'M000' || selected2 === '' ? '' : selected3}
                disabled={selected1 === 'M000' || selected2 === ''}
              >
                <Option value="">장소전체</Option>
                {lvl3.map(item => (
                  <Option value={item.value}>{item.title}</Option>
                ))}
              </AntdSelect>
              {/* 사번검색 */}
              <span className="text-label">사번</span>
              <AntdSearchInput
                style={{ width: '150px' }}
                value={empNo}
                className="input-search-sm ant-search-inline mr5"
                readOnly
                onClick={() => this.onChangeModal('userSearch', true)}
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={() => this.onSearch()}>
                검색
              </StyledButton>
              <StyledButton className="btn-gray btn-sm" onClick={() => this.initData()}>
                Reset
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton
              className="btn-primary btn-first btn-sm"
              onClick={() => this.onChangeModal('inputPage', true)}
            >
              추가
            </StyledButton>
            <Popconfirm
              title="선택된 내용을 삭제하시겠습니까?"
              onConfirm={() => this.deleteRow()}
              okText="Yes"
              cancelText="No"
            >
              <StyledButton className="btn-gray btn-first btn-sm">삭제</StyledButton>
            </Popconfirm>
          </StyledButtonWrapper>
          <Spin spinning={!isLoaded} tip="Data Loading">
            <AntdTable
              rowKey="KEY_NO"
              key="KEY_NO"
              columns={columns}
              dataSource={listData || []}
              bordered
              pagination={{ pageSize: 20 }}
              footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>}
              rowSelection={{ selectedRowKeys, onChange: this.onRowSelection }}
            />
          </Spin>
        </StyledContentsWrapper>
        <AntdModal
          width={modalType === 'userSearch' ? '60%' : '70%'}
          visible={modalOn}
          title={modalTitle}
          onCancel={() => this.onChangeModal('', false)}
          destroyOnClose
          footer={null}
          className="modal-table-pad"
        >
          {modalType === 'userSearch' && (
            <UserSearch
              modalSearchInfo={modalSearchInfo}
              userList={modalUserList}
              modalSearch={this.modalSearch}
              onRowClick={this.onRowClick}
              onChangeModalSearchInfo={this.onChangeModalSearchInfo}
            />
          )}
          {modalType === 'inputPage' && (
            <InputPage
              year={year}
              modalSearchInfo={modalSearchInfo}
              userList={modalUserList}
              modalMenu={modalMenu}
              onSave={this.onSave}
              modalSearch={this.modalSearch}
              onChangeModalSearchInfo={this.onChangeModalSearchInfo}
            />
          )}
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

List.defaultProps = {};

export default List;

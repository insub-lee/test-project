import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal, Button, DatePicker, Select, Table, Spin } from 'antd';
import styled from 'styled-components';
import BizMicroDevBase from 'components/BizMicroDevBase';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import Group from 'components/BizBuilder/Sketch/Group';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import SafetyWorkViewer from '../../safetyWorkView';
import Styled from './Styled';

const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdSelect = StyledSelect(Select);
const StyledButton = StyledAntdButton(Button);

const { Option } = Select;

const CustomTableStyled = styled.div`
  .ant-table-column-title {
    font-size: 12px;
  }
`;

class SafetyWorkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      selectedWork: '',
      searchValues: {
        VIEW_TYPE: props.viewPage,
        WORK_NO: '', // 작업번호
        REQ_CMPNY_CD: '', // 발주회사코드
        REQ_CMPNY_NM: '', // 발주회사명
        REQ_DEPT_CD: '', // 발주부서코드
        REQ_DEPT_NM: '', // 발주부서명
        START_REQ_DT: '', // 신청기간(START)
        END_REQ_DT: '', // 신청기간(END)
        START_WORK_DT: moment().format('YYYY-MM-DD'), // 작업기간(START)
        END_WORK_DT: moment().format('YYYY-MM-DD'), // 작업기간(END)
        SITE: '', // 작업지역
        WCATEGORY: '', // 주작업
        SUB_WCATEGORY: '', // 보충작업
        PLEDGE: '', //  서약서수령
        WORK_STATUS: '', //  작업상태
        WRK_CMPNY_CD: '', // 작업업체코드
        WRK_CMPNY_NM: '', // 작업업체명
        STTLMNT_STATUS: '', // 신청상태(결재상태)
      },
      safetyWorks: [],
    };
  }

  // 검색필수값 valid
  searchValidCheck = searchValues => {
    const { START_WORK_DT, END_WORK_DT } = searchValues;
    if (START_WORK_DT === '' || END_WORK_DT === '') {
      message.error(<MessageContent>작업일은 필수항목 입니다.</MessageContent>);
      return false;
    }
    return true;
  };

  // 검색버튼 Action
  onSearch = () => {
    const { searchValues } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    if (!this.searchValidCheck(searchValues)) return;
    this.setState({
      searching: true,
    });
    const apiInfo = {
      key: 'getSafetyWorkList',
      type: 'POST',
      url: `/api/eshs/v1/common/safetyWorkList`,
      params: { serachValues: { ...searchValues } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onSearchCallback);
  };

  // 검색Action Callback
  onSearchCallback = (id, response) => {
    const result = response.safetyWorkList;
    if (result.length > 0) {
      const safetyWorks = result.map(safetyWork => {
        const fromDt = moment(safetyWork.FROM_DT).format('YYYY-MM-DD');
        let WORK_STATUS = '작업중';
        if (fromDt > moment().format('YYYY-MM-DD')) {
          WORK_STATUS = '작업전';
        } else if (fromDt < moment().format('YYYY-MM-DD')) {
          WORK_STATUS = '작업완료';
        }
        return {
          ...safetyWork,
          WORK_STATUS,
          WORK_TIME: Number(safetyWork.TO_TIME) - Number(safetyWork.FROM_TIME),
          FROM_DT: moment(safetyWork.FROM_DT).format('YYYY-MM-DD'),
        };
      });
      this.setState({
        safetyWorks,
        searching: false,
      });
      return;
    }
    this.setState(
      {
        safetyWorks: [],
        searching: false,
      },
      () => message.error(<MessageContent>검색결과가 없습니다.</MessageContent>),
    );
  };

  // 모달 핸들러
  handleModal = (type, visible, workNo) => {
    let title = '';
    const selectedWork = workNo || '';
    switch (type) {
      case 'supervisor':
        title = '감독자 선택';
        break;
      case 'cmpny':
        title = '작업업체 선택';
        break;
      case 'safetyWorkView':
        title = '안전작업 상세정보';
        break;
      default:
        break;
    }

    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
      selectedWork,
    });
  };

  // 거래처 선택
  handleCmpnySelect = (cmpnyInfo, field) => {
    const { searchValues } = this.state;
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      searchValues: {
        ...searchValues,
        [field]: cmpnyInfo.WRK_CMPNY_CD,
        [field.replace('CD', 'NM')]: cmpnyInfo.WRK_CMPNY_NM,
      },
    });
  };

  // 검색된 작업번호 선택시
  handleSafetyWorkSelect = record => {
    const { searchValues } = this.state;
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      searchValues: {
        ...searchValues,
        WORK_NO: record.WORK_NO,
      },
    });
  };

  // state searchValue 변경
  handleChangeSearchValue = (field, value) => {
    const { searchValues } = this.state;
    this.setState({
      searchValues: {
        ...searchValues,
        [field]: value,
      },
    });
  };

  render() {
    const { viewPage } = this.props;
    const { modalType, modalTitle, modalVisible, searchValues, safetyWorks, selectedWork } = this.state;
    let STTLMNT_STATUS_LIST = [
      { label: '전체', value: '' },
      { label: '신청저장', value: '0' },
      { label: '신청상신', value: '1' },
      { label: '신청승인', value: '2A' },
      { label: '신청불결', value: '2F' },
      { label: '허가상신', value: '3' },
      { label: '허가승인', value: '4A' },
      { label: '허가부결', value: '4F' },
    ];
    if (viewPage === 'accept') {
      STTLMNT_STATUS_LIST = [
        { label: '전체', value: '' },
        { label: '신청승인', value: '2A' },
        { label: '허가상신', value: '3' },
        { label: '허가승인', value: '4A' },
        { label: '허가부결', value: '4F' },
      ];
    }
    const columns = [
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        width: '10%',
        align: 'center',
        render: value => (
          <span
            onClick={() => this.handleModal('safetyWorkView', true, value)}
            role="button"
            tabIndex="0"
            onKeyPress={() => this.handleModal('safetyWorkView', true, value)}
            style={{ cursor: 'pointer', color: '#1fb5ad' }}
          >
            {value}
          </span>
        ),
      },
      {
        title: '신청상태',
        dataIndex: 'STTLMNT_STATUS',
        width: '5%',
        align: 'center',
        render: value => {
          switch (value) {
            case '0':
              return <span>신청저장</span>;
            case '1':
              return <span>신청상신</span>;
            case '2A':
              return <span>신청승인</span>;
            case '2F':
              return <span>신청불결</span>;
            case '3':
              return <span>허가상신</span>;
            case '4A':
              return <span>허가승인</span>;
            case '4F':
              return <span>허가부결</span>;
            default:
              return <span></span>;
          }
        },
      },
      {
        title: '작업상태',
        dataIndex: 'WORK_STATUS',
        width: '5%',
        align: 'center',
      },
      {
        title: '주작업',
        dataIndex: 'WCATEGORY',
        width: '5%',
        align: 'center',
      },
      {
        title: '보충작업',
        dataIndex: 'SUB_WCATEGORY',
        width: '10%',
        align: 'center',
      },
      {
        title: '발주사',
        dataIndex: 'REQ_CMPNY_NM',
        width: '10%',
        align: 'center',
      },
      {
        title: '주관팀',
        dataIndex: 'REQ_DEPT_NM',
        width: '10%',
        align: 'center',
      },
      {
        title: '업체',
        dataIndex: 'WRK_CMPNY_NM',
        width: '10%',
        align: 'center',
      },
      {
        title: '작업일',
        dataIndex: 'FROM_DT',
        width: '10%',
        align: 'center',
      },
      {
        title: '작업시간',
        dataIndex: 'WORK_TIME',
        width: '5%',
        align: 'center',
      },
      {
        title: '작업명',
        dataIndex: 'TITLE',
        width: '10%',
        align: 'center',
      },
      {
        title: '작업장소',
        dataIndex: 'WLOC',
        width: '10%',
        align: 'center',
      },
    ];
    return (
      <Styled>
        <Spin tip="검색중..." spinning={this.state.searching}>
          <StyledSearchWrapper>
            <Group className="view-designer-group group-0">
              <div className="view-designer-group-search-wrap">
                <table className="view-designer-table table-0">
                  <tbody>
                    <tr className="view-designer-row">
                      <td className="view-designer-col view-designer-label">
                        <span>작업번호</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '50%' }}
                            value={searchValues.WORK_NO}
                            onChange={e => this.handleChangeSearchValue('WORK_NO', e.target.value)}
                            onSearch={() => this.handleModal('safetyWork', true)}
                          />
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>신청기간</span>
                      </td>
                      <td className="view-designer-col">
                        <div styled={{ width: '100%' }}>
                          <AntdDatePicker
                            className="ant-picker-xs"
                            style={{ width: '45%' }}
                            value={searchValues.START_REQ_DT !== '' ? moment(searchValues.START_REQ_DT) : undefined}
                            onChange={e => {
                              if (e === null) {
                                this.handleChangeSearchValue('START_REQ_DT', '');
                                return;
                              }
                              this.handleChangeSearchValue('START_REQ_DT', e.format('YYYY-MM-DD'));
                            }}
                          />
                          <span styled={{ margin: '0px 10px 0px 10px' }}> ~ </span>
                          <AntdDatePicker
                            className="ant-picker-xs"
                            style={{ width: '45%' }}
                            value={searchValues.END_REQ_DT !== '' ? moment(searchValues.END_REQ_DT) : undefined}
                            onChange={e => {
                              if (e === null) {
                                this.handleChangeSearchValue('END_REQ_DT', '');
                                return;
                              }
                              this.handleChangeSearchValue('END_REQ_DT', e.format('YYYY-MM-DD'));
                            }}
                          />
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>작업일</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdDatePicker
                            className="ant-picker-xs"
                            style={{ width: '45%' }}
                            value={searchValues.START_WORK_DT !== '' ? moment(searchValues.START_WORK_DT) : undefined}
                            onChange={e => {
                              if (e === null) {
                                this.handleChangeSearchValue('START_WORK_DT', '');
                                return;
                              }
                              this.handleChangeSearchValue('START_WORK_DT', e.format('YYYY-MM-DD'));
                            }}
                          />
                          <span styled={{ margin: '0px 10px 0px 10px', width: '10%' }}> ~ </span>
                          <AntdDatePicker
                            className="ant-picker-xs"
                            style={{ width: '45%' }}
                            value={searchValues.END_WORK_DT !== '' ? moment(searchValues.END_WORK_DT) : undefined}
                            onChange={e => {
                              if (e === null) {
                                this.handleChangeSearchValue('END_WORK_DT', '');
                                return;
                              }
                              this.handleChangeSearchValue('END_WORK_DT', e.format('YYYY-MM-DD'));
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="view-designer-row">
                      <td className="view-designer-col view-designer-label">
                        <span>작업지역</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSelect
                            className="select-xs"
                            style={{ width: '50%' }}
                            value={searchValues.SITE}
                            onChange={value => this.handleChangeSearchValue('SITE', value)}
                          >
                            <Option value="">전체</Option>
                            <Option value="청주">청주</Option>
                            <Option value="구미">구미</Option>
                          </AntdSelect>
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>발주회사</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '50%' }}
                            value={searchValues.REQ_CMPNY_CD}
                            onClick={() => this.handleModal('', false)}
                          />
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>작업부서</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '50%' }}
                            value={searchValues.REQ_DEPT_CD}
                            onClick={() => this.handleModal('', false)}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="view-designer-row">
                      <td className="view-designer-col view-designer-label">
                        <span>주작업</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSelect
                            className="select-xs"
                            style={{ width: '50%' }}
                            value={searchValues.WCATEGORY}
                            onChange={value => this.handleChangeSearchValue('WCATEGORY', value)}
                          >
                            <Option value="">전체</Option>
                            <Option value="공통">공통</Option>
                            <Option value="화기작업">화기작업</Option>
                            <Option value="일반위험작업">일반위험작업</Option>
                          </AntdSelect>
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>보충작업</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSelect
                            className="select-xs"
                            style={{ width: '50%' }}
                            value={searchValues.SUB_WCATEGORY}
                            onChange={value => this.handleChangeSearchValue('SUB_WCATEGORY', value)}
                          >
                            <Option value="">전체</Option>
                            <Option value="고소">고소</Option>
                            <Option value="굴착">굴착</Option>
                            <Option value="밀폐공간">밀폐공간</Option>
                            <Option value="방사선">방사선</Option>
                            <Option value="전기">전기</Option>
                            <Option value="중량물">중량물</Option>
                          </AntdSelect>
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>서약서수령</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSelect
                            className="select-xs"
                            style={{ width: '50%' }}
                            value={searchValues.PLEDGE}
                            onChange={value => this.handleChangeSearchValue('PLEDGE', value)}
                          >
                            <Option value="">전체</Option>
                            <Option value="수령">수령</Option>
                            <Option value="미수령">미수령</Option>
                          </AntdSelect>
                        </div>
                      </td>
                    </tr>
                    <tr className="view-designer-row">
                      <td className="view-designer-col view-designer-label">
                        <span>신청상태</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSelect
                            className="select-xs"
                            style={{ width: '50%' }}
                            value={searchValues.STTLMNT_STATUS}
                            onChange={value => this.handleChangeSearchValue('STTLMNT_STATUS', value)}
                          >
                            {STTLMNT_STATUS_LIST.map(item => (
                              <Option key={`STTLMNT_STATUS_${item.value}`} value={item.value}>
                                {item.label}
                              </Option>
                            ))}
                          </AntdSelect>
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>작업상태</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSelect
                            className="select-xs"
                            style={{ width: '50%' }}
                            value={searchValues.WORK_STATUS}
                            onChange={value => this.handleChangeSearchValue('WORK_STATUS', value)}
                          >
                            <Option value="">전체</Option>
                            <Option value="작업전">작업전</Option>
                            <Option value="작업중">작업중</Option>
                            <Option value="작업완료">작업완료</Option>
                          </AntdSelect>
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>작업업체</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="input-search-xs"
                            style={{ width: '50%' }}
                            value={searchValues.WRK_CMPNY_CD}
                            disable
                            onClick={() => this.handleModal('cmpny', true)}
                            onSearch={() => this.handleModal('cmpny', true)}
                          />
                          {searchValues.WRK_CMPNY_NM !== '' && <span style={{ marginLeft: '5px' }}>{searchValues.WRK_CMPNY_NM}</span>}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="view-designer-group-search-btn-wrap">
                <StyledButton className="btn-gray mr5 btn-sm" onClick={() => this.onSearch()}>
                  검색
                </StyledButton>
                <StyledButton className="btn-gray mr5 btn-sm" onClick={() => alert('목록인쇄')}>
                  목록인쇄
                </StyledButton>
                <StyledButton className="btn-gray  btn-sm" onClick={() => alert('점검일지 인쇄')}>
                  점검일지 인쇄
                </StyledButton>
              </div>
            </Group>
          </StyledSearchWrapper>
        </Spin>
        <StyledContentsWrapper>
          <CustomTableStyled>
            <AntdTable
              columns={columns}
              dataSource={safetyWorks}
              footer={() => <div style={{ textAlign: 'center' }}>{`총 ${safetyWorks.length === 0 ? 0 : safetyWorks.length} 건`}</div>}
            />
          </CustomTableStyled>
        </StyledContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'cmpny' && (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData={searchValues.WRK_CMPNY_CD}
              directSearchTable
              visible
              CONFIG={{ property: { isRequired: false, GUBUN: 'SW' } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(cmpnyInfo, field) => this.handleCmpnySelect(cmpnyInfo, field)}
            />
          )}
          {modalType === 'safetyWork' && <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />}
          {modalType === 'safetyWorkView' && <SafetyWorkViewer workNo={selectedWork} pageType="modal" />}
        </AntdModal>
      </Styled>
    );
  }
}

SafetyWorkList.propTypes = {
  viewPage: PropTypes.string,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  profile: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

SafetyWorkList.defaultProps = {
  viewPage: '',
};

export default SafetyWorkList;

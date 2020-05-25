import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal, Button, DatePicker, Select, Table } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import styled from 'styled-components';
import BizMicroDevBase from 'components/BizMicroDevBase';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrapper from 'commonStyled/Wrapper/StyledSearchWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import message from 'components/Feedback/message';
import Group from 'components/BizBuilder/Sketch/Group';
import MessageContent from 'components/Feedback/message.style2';
import WritePage from '../../emergencySafetyWorkWrite/page';
import Styled from './Styled';

const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledLineTable(Table);
const AntdSearch = StyledSearchInput(Input.Search);
const StyledButton = StyledAntdButton(Button);
const AntdDatePicker = StyledPicker(DatePicker);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;

const CustomTableStyled = styled.div`
  .ant-table-column-title {
    font-size: 12px;
  }
`;

class SafetyWorkMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      selectedWork: '',
      searchValues: {
        START_CREATE_DT: '', // 신청기간(START)
        END_CREATE_DT: '', // 신청기간(END)
        SITE: '', // 작업지역
        REQ_CMPNY_CD: '', // 발주회사코드
        REQ_CMPNY_NM: '', // 발주회사명
        WRK_CMPNY_CD: '', // 작업업체코드
        WRK_CMPNY_NM: '', // 작업업체명
      },
      formData: {
        EXM_CMPNY_CD: props.profile.DEPT_ID, // 승인자 회사
        EXM_DEPT_CD: props.profile.DEPT_ID, // 승인자 부서
        EXM_EMP_NO: props.profile.USER_ID, // 승인자 사번
        WORK_LIST: [], // 승인할 작업번호 리스트
      },
      safetyWorkList: [],
    };
  }

  // 검색버튼 Action
  onSearch = () => {
    const { searchValues } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getEsafetyWorkList',
      type: 'POST',
      url: `/api/eshs/v1/common/emergencySafetyWork`,
      params: { serachValues: { ...searchValues } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onSearchCallback);
  };

  // 검색Action Callback
  onSearchCallback = (id, response) => {
    const { formData } = this.state;
    const result = response.emergencySafetyWorkList;
    if (result.length > 0) {
      this.setState({
        safetyWorkList: result,
        formData: {
          ...formData,
          WORK_LIST: [],
        },
      });
      return;
    }
    this.setState(
      {
        safetyWorkList: [],
      },
      () => message.error(<MessageContent>검색결과가 없습니다.</MessageContent>),
    );
  };

  // 모달 핸들러
  handleModal = (type, visible, workNo) => {
    let title = '';
    const selectedWork = workNo || '';
    switch (type) {
      case 'cmpny':
        title = '작업업체 선택';
        break;
      case 'eSafetyWorkWrite':
        title = '긴급작업 등록';
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

  // 승인할 작업 선택
  handleChangeWorkSelect = rowkeys => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        WORK_LIST: rowkeys,
      },
    });
  };

  acceptSafetyWork = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData } = this.state;
    if (formData.WORK_LIST && formData.WORK_LIST.length === 0) {
      message.error(<MessageContent>선택된 긴급작업이 없습니다.</MessageContent>);
      return;
    }
    const submitData = {
      PARAM: {
        ...formData,
      },
    };
    submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/emergencySafetyWork', submitData, this.acceptSafetyWorkCallback);
  };

  acceptSafetyWorkCallback = (id, response) => {
    const { result } = response;
    if (result === 'success') {
      message.success(<MessageContent>긴급작업 승인을 완료하였습니다.</MessageContent>);
      this.onSearch();
    }
    if (result === 'fail') {
      message.error(<MessageContent>긴급작업 승인에 실패하였습니다.</MessageContent>);
    }
  };

  render() {
    const { modalType, modalTitle, modalVisible, searchValues, safetyWorkList, selectedWork, formData } = this.state;
    const rowSelection = {
      selectedRowKeys: formData.WORK_LIST,
      columnWidth: '5%',
      onChange: this.handleChangeWorkSelect,
    };
    const columns = [
      {
        title: '승인',
        dataIndex: 'EXM_EMP_NO',
        width: '5%',
        align: 'center',
        render: value => {
          if (value === '-1') {
            return <span style={{ color: '#ff6666' }}>미승인</span>;
          }
          return <span style={{ color: '#17a9a1' }}>승인</span>;
        },
      },
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        width: '15%',
        align: 'center',
        render: value => (
          <span
            tabIndex={0}
            role="button"
            onKeyPress={() => this.handleModal('eSafetyWorkWrite', true, value)}
            onClick={() => this.handleModal('eSafetyWorkWrite', true, value)}
          >
            {value}
          </span>
        ),
      },
      {
        title: '작업명',
        dataIndex: 'TITLE',
        width: '15%',
        align: 'center',
      },
      {
        title: '작업장소',
        dataIndex: 'WLOC',
        width: '15%',
        align: 'center',
      },
      {
        title: '발주회사',
        dataIndex: 'REQ_CMPNY_NM',
        width: '10%',
        align: 'center',
      },
      {
        title: '작업업체',
        dataIndex: 'WRK_CMPNY_NM',
        width: '10%',
        align: 'center',
      },
      {
        title: '등록일',
        dataIndex: 'CREATE_DT',
        width: '10%',
        align: 'center',
      },
      {
        title: '승인자',
        dataIndex: 'EXM_EMP_NM',
        width: '10%',
        align: 'center',
      },
    ];

    return (
      <Styled>
        <StyledSearchWrapper>
          <Group className="view-designer-group group-0">
            <div className="view-designer-group-search-wrap">
              <table className="view-designer-table table-0">
                <tbody>
                  <tr className="view-designer-row">
                    <td className="view-designer-col view-designer-label">
                      <span>신청기간</span>
                    </td>
                    <td className="view-designer-col">
                      <div styled={{ width: '100%' }}>
                        <AntdDatePicker
                          className="ant-picker-xs"
                          style={{ width: '45%' }}
                          value={searchValues.START_CREATE_DT !== '' ? moment(searchValues.START_CREATE_DT) : undefined}
                          onChange={e => {
                            if (e === null) {
                              this.handleChangeSearchValue('START_CREATE_DT', '');
                              return;
                            }
                            this.handleChangeSearchValue('START_CREATE_DT', e.format('YYYY-MM-DD'));
                          }}
                        />
                        <span styled={{ margin: '0px 10px 0px 10px' }}> ~ </span>
                        <AntdDatePicker
                          className="ant-picker-xs"
                          style={{ width: '45%' }}
                          value={searchValues.END_CREATE_DT !== '' ? moment(searchValues.END_CREATE_DT) : undefined}
                          onChange={e => {
                            if (e === null) {
                              this.handleChangeSearchValue('END_CREATE_DT', '');
                              return;
                            }
                            this.handleChangeSearchValue('END_CREATE_DT', e.format('YYYY-MM-DD'));
                          }}
                        />
                      </div>
                    </td>
                    <td className="view-designer-col view-designer-label">
                      <span>작업지역</span>
                    </td>
                    <td className="view-designer-col">
                      <div>
                        <AntdSelect
                          className="select-xs"
                          style={{ width: '45%' }}
                          value={searchValues.SITE}
                          onChange={value => this.handleChangeSearchValue('SITE', value)}
                        >
                          <Option value="">전체</Option>
                          <Option value="청주">청주</Option>
                          <Option value="구미">구미</Option>
                        </AntdSelect>
                      </div>
                    </td>
                  </tr>
                  <tr className="view-designer-row">
                    <td className="view-designer-col view-designer-label">
                      <span>작업업체</span>
                    </td>
                    <td className="view-designer-col">
                      <div>
                        <AntdSearch
                          className="input-search-xs"
                          style={{ width: '45%' }}
                          value={searchValues.WRK_CMPNY_CD}
                          disable
                          onClick={() => this.handleModal('cmpny', true)}
                          onSearch={() => this.handleModal('cmpny', true)}
                        />
                        {searchValues.WRK_CMPNY_NM !== '' && <span style={{ marginLeft: '5px' }}>{searchValues.WRK_CMPNY_NM}</span>}
                      </div>
                    </td>
                    <td className="view-designer-col view-designer-label">
                      <span>발주회사</span>
                    </td>
                    <td className="view-designer-col">
                      <div>
                        <AntdSearch
                          className="ant-search-inline input-search-xs mr5"
                          style={{ width: '45%' }}
                          value={searchValues.REQ_CMPNY_CD}
                          onClick={() => alert('발주회사 portal user / eshs user 작업된 후 개발예정')}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="view-designer-group-search-btn-wrap">
              <StyledButton className="btn-primary btn-gray btn-first" onClick={() => this.onSearch()}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-gray btn-first" onClick={() => this.acceptSafetyWork()}>
                승인
              </StyledButton>
            </div>
          </Group>
        </StyledSearchWrapper>
        <ContentsWrapper>
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">긴급작업 현황</span>
          </div>
          <CustomTableStyled>
            <AntdTable
              rowKey="WORK_NO"
              key="emergency_list"
              pagination={false}
              columns={columns}
              dataSource={safetyWorkList}
              rowSelection={rowSelection}
              footer={() => <div style={{ textAlign: 'center' }}>{`총 ${safetyWorkList.length === 0 ? 0 : safetyWorkList.length} 건`}</div>}
            />
          </CustomTableStyled>
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '90%'}
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
              CONFIG={{ property: { isRequired: false } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(cmpnyInfo, field) => this.handleCmpnySelect(cmpnyInfo, field)}
            />
          )}
          {modalType === 'eSafetyWorkWrite' && (
            <BizMicroDevBase initWorkNo={selectedWork} viewType="modal" component={WritePage} sagaKey="emergencySafetyWork_write" />
          )}
        </AntdModal>
      </Styled>
    );
  }
}

SafetyWorkMain.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  profile: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

export default SafetyWorkMain;

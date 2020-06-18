/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Modal, Select, Input, DatePicker, message, Table, Tooltip } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import moment from 'moment';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import AccCmpnyInputPage from 'apps/eshs/user/safety/accident/indusrtialAccidentCmpnyMgt';
import NothGateCmpnyModal from '../NothGateCmpnyModal';

const AntdLineTable = StyledAntdTable(Table);

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledContentsModal(Modal);
const AntdPicker = StyledPicker(DatePicker.RangePicker);

const { RangePicker } = DatePicker;
const format = 'YYYY-MM-DD HH:mm:ss';
moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordList: [],
      nothGateModal: false,
      type: '',
      accCmpnyInputPage: [],
      accCmpnyModal: false,
      columns: [
        {
          title: '지역',
          width: '8%',
          align: 'center',
          dataIndex: 'WORK_AREA_CD',
        },
        {
          title: '일자',
          width: '12%',
          align: 'center',
          dataIndex: 'VISIT_DATE',
        },
        {
          title: '업체명',
          width: '17%',
          align: 'center',
          dataIndex: 'WRK_CMPNY_NM',
        },
        {
          title: '사업자등록번호',
          width: '15%',
          align: 'center',
          dataIndex: 'BIZ_REG_NO',
        },
        {
          title: '이름',
          width: '8%',
          align: 'center',
          dataIndex: 'VISITOR_NAME',
          render: (text, record) => (
            <Tooltip title={record.PHONE_NUMBER || ''}>
              <span className="add-row">{text}</span>
            </Tooltip>
          ),
        },
        {
          title: '출입시간',
          width: '8%',
          align: 'center',
          dataIndex: 'VISITOR_IN_DATE',
        },
        {
          title: '퇴장시간',
          width: '8%',
          align: 'center',
          dataIndex: 'VISITOR_OUT_DATE',
        },
        {
          title: '출입구분',
          width: '8%',
          align: 'center',
          dataIndex: 'VISITOR_TYPE',
        },
        {
          title: '업체등록여부',
          width: '8%',
          align: 'center',
          dataIndex: 'WRK_REG',
          render: (text, record) => {
            if (text === '미등록')
              return (
                <span className="add-row" style={{ color: 'red' }} onClick={e => this.handleOpenAccCmpnyInputPage(record, e)}>
                  {text}
                </span>
              );
            return <span>{text}</span>;
          },
        },
        {
          title: '매그나칩 담당자',
          width: '8%',
          align: 'center',
          dataIndex: 'EMP_NM',
        },
      ],
    };
  }

  componentDidMount = () => {
    const { id, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  handleAppStart = () => {
    const { result, id, changeFormData } = this.props;
    const recordList = (result && result.recordList && result.recordList.recordList) || [];
    this.setState({
      recordList,
    });
  };

  onRowClick = record => {
    const { id, changeFormData } = this.props;
    const VISIT_DATE = record.VISIT_DATE || null;
    const VISITOR_IN_DATE = record.VISITOR_IN_DATE || null;
    const VISITOR_OUT_DATE = record.VISITOR_OUT_DATE || null;
    const WORK_AREA_CD = record.WORK_AREA_CD || '';
    changeFormData(id, 'modal', {
      type: 'UPDATE',
      modalVisible: true,
      info: {
        ...record,
        WORK_AREA_CD: WORK_AREA_CD === '청주' ? 'CJ' : 'GM',
        VISITOR_OUT_DATE: moment(`${VISIT_DATE} ${VISITOR_OUT_DATE}`).format(format),
        VISITOR_IN_DATE: moment(`${VISIT_DATE} ${VISITOR_IN_DATE}`).format(format),
      },
    });
  };

  handleModalOpen = () => {
    const { id, changeFormData } = this.props;
    const now = new Date();
    const now2 = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);

    changeFormData(id, 'modal', {
      type: 'INSERT',
      modalVisible: true,
      info: { WORK_AREA_CD: 'CJ', VISITOR_TYPE: 'N', VISITOR_IN_DATE: moment().format(format), VISITOR_OUT_DATE: moment(now2, format) },
    });
  };

  handleCancel = () => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'modal', { type: '', modalVisible: false, info: {} });
  };

  handleDateOnChange = (data, dateString) => {
    const { id, changeFormData, formData } = this.props;
    const search = (formData && formData.search) || {};
    changeFormData(id, 'search', { ...search, FROM_DATE: dateString[0], TO_DATE: dateString[1] });
  };

  handleSearchOnChange = (target, value) => {
    const { id, changeFormData, formData } = this.props;
    const search = (formData && formData.search) || {};

    changeFormData(id, 'search', { ...search, [target]: value });
  };

  handleOnSearch = () => {
    const { id, getCallDataHandler, formData } = this.props;
    const search = (formData && formData.search) || {};
    const apiAry = [
      {
        key: 'searchList',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsAccessRecord',
        params: search,
      },
    ];
    getCallDataHandler(id, apiAry, this.onSearchCallBack);
  };

  onSearchCallBack = sagaKey => {
    const { result } = this.props;

    const recordList = (result && result.searchList && result.searchList.recordList) || [];
    this.setState({
      recordList,
    });
  };

  handleTypeOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const search = (formData && formData.search) || {};
    changeFormData(id, 'search', { ...search, VISITOR_TYPE: e });
  };

  handleDwExcel = () => {
    message.warning('미구현');
  };

  handleOpenAccCmpnyInputPage = (record, event) => {
    if (typeof event === 'object') event.stopPropagation();
    const { accCmpnyModal } = this.state;
    //     AccCmpnyInputPage
    //    accCmpnyInputPage
    if (!accCmpnyModal) {
      return this.setState({
        accCmpnyInputPage: [
          <AccCmpnyInputPage
            inputMetaSeq={8921}
            initFormData={record}
            saveAfter={() =>
              this.setState(
                {
                  accCmpnyInputPage: [],
                  accCmpnyModal: false,
                },
                this.handleOnSearch,
              )
            }
          />,
        ],
        accCmpnyModal: !accCmpnyModal,
      });
    }
    return this.setState({
      accCmpnyInputPage: [],
      accCmpnyModal: !accCmpnyModal,
    });
  };

  render() {
    const { recordList, nothGateModal, columns, accCmpnyModal, accCmpnyInputPage } = this.state;
    const { formData } = this.props;
    const search = (formData && formData.search) || {};
    const modalVisible = (formData && formData.modal && formData.modal.modalVisible) || false;
    const modalType = (formData && formData.modal && formData.modal.type) || '';

    return (
      <ContentsWrapper>
        <div>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td colSpan={3}>
                    <AntdSelect defaultValue="" onChange={value => this.handleSearchOnChange('WORK_AREA_CD', value)} style={{ width: '10%' }}>
                      <Option value="">지역 전체</Option>
                      <Option value="청주">청주</Option>
                      <Option value="구미">구미</Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>업체명</th>
                  <td>
                    <AntdInput
                      placeholder="업체명"
                      className="ant-input-inline"
                      style={{ width: '100%' }}
                      value={search.WRK_CMPNY_NM || ''}
                      name="WRK_CMPNY_NM"
                      onChange={e => this.handleSearchOnChange('WRK_CMPNY_NM', e.target.value)}
                    />
                  </td>
                  <th>사업자등록번호</th>
                  <td>
                    <AntdInput
                      placeholder="사업자 등록번호"
                      className="ant-input-inline"
                      style={{ width: '100%' }}
                      value={search.BIZ_REG_NO || ''}
                      name="BIZ_REG_NO"
                      onChange={e => this.handleSearchOnChange('BIZ_REG_NO', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>방문자 성명</th>
                  <td>
                    <AntdInput
                      placeholder="방문자 성명"
                      value={search.VISITOR_NAME || ''}
                      name="VISITOR_NAME"
                      className="ant-input-inline"
                      style={{ width: '100%' }}
                      onChange={e => this.handleSearchOnChange('VISITOR_NAME', e.target.value)}
                    />
                  </td>
                  <th>출입구분</th>
                  <td>
                    <AntdSelect defaultValue="" onChange={value => this.handleSearchOnChange('VISITOR_TYPE', value)} style={{ width: '100%' }}>
                      <Option value="">전체</Option>
                      <Option value="일일">일일</Option>
                      <Option value="북/후문">북/후문</Option>
                      <Option value="상시">상시</Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>출입기간</th>
                  <td>
                    <AntdPicker onChange={this.handleDateOnChange} style={{ width: '100%' }} />
                  </td>
                  <th>업체등록여부</th>
                  <td>
                    <AntdSelect defaultValue="" onChange={value => this.handleSearchOnChange('WRK_REG', value)} style={{ width: '100%' }}>
                      <Option value="">선택</Option>
                      <Option value="등록">등록</Option>
                      <Option value="미등록">미등록</Option>
                    </AntdSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <div className="selSaveWrapper">
            <StyledButtonWrapper className="btn-wrap-inline">
              {search.VISITOR_TYPE === '북/후문' ? (
                <StyledButton className="btn-primary btn-first" onClick={this.handleModalOpen}>
                  등록
                </StyledButton>
              ) : (
                ''
              )}
              <StyledButton className="btn-primary btn-first" onClick={this.handleOnSearch}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary" onClick={this.handleDwExcel}>
                액셀받기
              </StyledButton>
            </StyledButtonWrapper>
          </div>
          <AntdLineTable
            key="recordTable"
            className="tableWrapper"
            rowKey="ROWKEY"
            columns={columns}
            dataSource={recordList || []}
            bordered
            scroll={{ y: 500 }}
            pagination={false}
            footer={() => <span>{`${recordList.length} 건`}</span>}
            onRow={record => ({ onClick: () => this.onRowClick(record) })}
          />
          <AntdModal
            title={modalType === 'INSERT' ? '북/후문 출입기록 등록' : '출입기록 수정'}
            visible={modalVisible}
            onCancel={this.handleCancel}
            width={800}
            height={450}
            footer={[null]}
          >
            <NothGateCmpnyModal
              {...this.props}
              handleAppStart={this.handleAppStart}
              handleModalOpen={this.handleModalOpen}
              handleModalCancel={this.handleCancel}
            />
          </AntdModal>
          <AntdModal title="업체 등록Page" visible={accCmpnyModal} onCancel={this.handleOpenAccCmpnyInputPage} width={900} height={550} footer={[null]}>
            {accCmpnyInputPage}
          </AntdModal>
        </div>
      </ContentsWrapper>
    );
  }
}

List.defaultProps = {
  id: 'EshsAccAccRecord',
  getCallDataHandler: () => {},
  result: {},
  apiAry: [
    {
      key: 'recordList',
      type: 'POST',
      url: '/api/eshs/v1/common/eshsAccessRecord',
    },
  ],
};
export default List;

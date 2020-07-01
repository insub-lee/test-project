/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Modal, Select, Input, DatePicker, message, Table, Tooltip } from 'antd';
import moment from 'moment';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import AccCmpnyInputPage from 'apps/eshs/user/safety/accident/indusrtialAccidentCmpnyMgt';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { debounce } from 'lodash';
import NothGateCmpnyModal from '../NothGateCmpnyModal';

const AntdLineTable = StyledAntdTable(Table);

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledContentsModal(Modal);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);

const format = 'YYYY-MM-DD HH:mm:ss';
moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {},
      accCmpnyInputPage: [],
      nothGateModal: { visible: false, content: [], title: '' },
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
          width: '10%',
          align: 'center',
          dataIndex: 'VISIT_DATE',
        },
        {
          title: '업체명',
          width: '15%',
          align: 'center',
          dataIndex: 'WRK_CMPNY_NM',
        },
        {
          title: '사업자등록번호',
          width: '13%',
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
          width: '10%',
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
          title: '매그나칩  담당자',
          width: '12%',
          align: 'center',
          dataIndex: 'EMP_NM',
        },
      ],
    };
    this.handleOnChangeSearchData = debounce(this.handleOnChangeSearchData, 300);
  }

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

  handleNothGateModalVisible = (title, type, initData = {}) => {
    const { nothGateModal } = this.state;
    const { visible } = nothGateModal;
    if (visible) {
      return this.setState({
        nothGateModal: {
          visible: !visible,
          title: '',
          content: [],
        },
      });
    }
    return this.setState({
      nothGateModal: {
        visible: !visible,
        title,
        content: [<NothGateCmpnyModal type={type} initData={initData} modalVisible={this.handleNothGateModalVisible} saveAfter={this.handleOnSearch} />],
      },
    });
  };

  handleDateOnChange = (data, dateString) => {
    this.setState(prevState => ({ searchData: { ...prevState.searchData, FROM_DATE: dateString[0], TO_DATE: dateString[1] } }));
  };

  handleOnChangeSearchData = (target, value) => {
    this.setState(prevState => ({ searchData: { ...prevState.searchData, [target]: value } }));
  };

  handleOnSearch = () => {
    const { id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchData } = this.state;
    spinningOn();
    const apiAry = [
      {
        key: 'recordList',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsAccessRecord',
        params: searchData,
      },
    ];
    getCallDataHandler(id, apiAry, spinningOff);
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
    const { searchData, nothGateModal, columns, accCmpnyModal, accCmpnyInputPage } = this.state;
    const { result } = this.props;
    const recordList = (result && result.recordList && result.recordList.recordList) || [];

    return (
      <StyledContentsWrapper>
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
                    <AntdSelect
                      allowClear
                      placeholder="지역전체"
                      className="select-sm mr5"
                      onChange={value => this.handleOnChangeSearchData('WORK_AREA_CD', value)}
                      style={{ width: '15%' }}
                    >
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
                      className="ant-input-sm"
                      style={{ width: '100%' }}
                      allowClear
                      name="WRK_CMPNY_NM"
                      onChange={e => this.handleOnChangeSearchData('WRK_CMPNY_NM', e.target.value)}
                    />
                  </td>
                  <th>사업자등록번호</th>
                  <td>
                    <AntdInput
                      placeholder="사업자 등록번호"
                      className="ant-input-sm"
                      style={{ width: '100%' }}
                      allowClear
                      name="BIZ_REG_NO"
                      onChange={e => this.handleOnChangeSearchData('BIZ_REG_NO', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>방문자 성명</th>
                  <td>
                    <AntdInput
                      placeholder="방문자 성명"
                      name="VISITOR_NAME"
                      allowClear
                      className="ant-input-sm"
                      style={{ width: '100%' }}
                      onChange={e => this.handleOnChangeSearchData('VISITOR_NAME', e.target.value)}
                    />
                  </td>
                  <th>출입구분</th>
                  <td>
                    <AntdSelect
                      allowClear
                      className="select-sm"
                      placeholder="전체"
                      // onChange={value => this.handleOnChangeSearchData('VISITOR_TYPE', value)}
                      onChange={value => this.setState(prevState => ({ searchData: { ...prevState.searchData, VISITOR_TYPE: value } }))}
                      style={{ width: '100%' }}
                    >
                      <Option value="일일">일일</Option>
                      <Option value="북/후문">북/후문</Option>
                      <Option value="상시">상시</Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>출입기간</th>
                  <td>
                    <AntdRangePicker className="ant-picker-sm" onChange={this.handleDateOnChange} style={{ width: '100%' }} />
                  </td>
                  <th>업체등록여부</th>
                  <td>
                    <AntdSelect
                      allowClear
                      placeholder="전체"
                      className="select-sm"
                      onChange={value => this.handleOnChangeSearchData('WRK_REG', value)}
                      style={{ width: '100%' }}
                    >
                      <Option value="등록">등록</Option>
                      <Option value="미등록">미등록</Option>
                    </AntdSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <div className="selSaveWrapper">
            <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mt-20">
              {searchData.VISITOR_TYPE === '북/후문' ? (
                <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleNothGateModalVisible('북/후문 출입기록 등록', 'INSERT', {})}>
                  등록
                </StyledButton>
              ) : (
                ''
              )}
              <StyledButton className="btn-primary btn-sm btn-first" onClick={this.handleOnSearch}>
                검색
              </StyledButton>
              <ExcelDownloadComp
                isBuilder={false}
                fileName={`Visitor_${moment().format('YYYYMMDD')}`}
                className="testClassName"
                btnText="엑셀 받기"
                sheetName={`Visitor_${moment().format('YYYYMMDD')}`}
                listData={recordList.map(row => {
                  const result = {};
                  columns.forEach(col => {
                    result[col.dataIndex] =
                      (row[col.dataIndex] && typeof col.excelRender === 'function' && col.excelRender(row[col.dataIndex], row)) || row[col.dataIndex];
                  });

                  return { ...row, ...result };
                })}
                btnSize="btn-sm btn-first mr5"
                fields={columns.map(item => ({
                  field: item.dataIndex,
                  style: { font: { sz: '12' }, alignment: { vertical: item.excelAlign || 'center', horizontal: item.excelAlign || 'center', wrapText: true } },
                }))}
                columns={columns.map(item => ({
                  ...item,
                  field: item.dataIndex,
                  filter: 'agTextColumnFilter',
                  width: item.width ? { wpx: Number(item.width.replace('%', '')) * 10 } : { wpx: 150 },
                  style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true }, alignment: { vertical: 'center', horizontal: 'center' } },
                }))}
              />
            </StyledButtonWrapper>
          </div>
          <AntdLineTable
            key="recordTable"
            rowKey="ROWKEY"
            columns={columns}
            dataSource={recordList || []}
            bordered
            footer={() => <span>{`${recordList.length} 건`}</span>}
            onRow={record => ({
              onClick: () =>
                this.handleNothGateModalVisible('출입기록 수정', 'UPDATE', {
                  ...record,
                  VISITOR_OUT_DATE: moment(`${record.VISIT_DATE} ${record.VISITOR_OUT_DATE}`).format(format),
                  VISITOR_IN_DATE: moment(`${record.VISIT_DATE} ${record.VISITOR_IN_DATE}`).format(format),
                }),
            })}
          />
          <AntdModal
            title={nothGateModal.title}
            visible={nothGateModal.visible}
            onCancel={this.handleNothGateModalVisible}
            width={800}
            height={450}
            footer={[null]}
          >
            {nothGateModal.content}
          </AntdModal>
          <AntdModal title="업체 등록Page" visible={accCmpnyModal} onCancel={this.handleOpenAccCmpnyInputPage} width={900} height={550} footer={[null]}>
            {accCmpnyInputPage}
          </AntdModal>
        </div>
      </StyledContentsWrapper>
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

import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import UserSearchModal from 'apps/eshs/common/userSearchModal';

import EmpChkResultDetail from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

const currentYear = moment(new Date()).format('YYYY');

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearList: [],
      searchParam: {
        CHK_YEAR: currentYear,
      },
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();

    const yearList = [];
    for (let i = currentYear; i >= 1998; i--) {
      yearList.push(i);
    }
    this.setState({ yearList });

    this.getInitData();
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
        params: {},
      },
      {
        key: 'chkTypeList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 675 },
        },
      },
      {
        key: 'resultDecision',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 683 },
        },
      },
      {
        key: 'resultDisease',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 690 },
        },
      },
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 1721 },
        },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, spinningOff);
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;

    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthDiseaseList`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];
    return getCallDataHandler(id, apiAry, spinningOff);
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam };
    });
  };

  modalVisible = () => {
    const {
      modalObj,
      modalObj: { modalVisible },
    } = this.state;
    if (modalVisible) {
      return this.setState({
        modalObj: { modalContent: [], modalTitle: '', modalVisible: !modalVisible },
      });
    }
    return this.setState({
      modalObj: { ...modalObj, modalVisible: !modalVisible },
    });
  };

  isOkText = text => {
    const okText = ['C', 'D', 'R'];

    return okText.indexOf(text.substring(0, 1)) >= 0;
  };

  empNoColumn = {
    title: '사번',
    dataIndex: 'EMP_NO',
    width: '10%',
    align: 'center',
    render: (text, record) => (
      <StyledButton
        className="btn-link btn-sm"
        onClick={() =>
          this.setState(
            {
              modalObj: {
                modalTitle: '개인검진결과',
                modalContent: [<EmpChkResultDetail userSearch={false} defaultUser={record.USER_ID} chkYear={record.CHK_YEAR} />],
              },
            },
            this.modalVisible,
          )
        }
      >
        {text}
      </StyledButton>
    ),
  };

  columns = [
    {
      title: '소속',
      dataIndex: 'DEPT_NAME_KOR',
      width: '14%',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'NAME_KOR',
      width: '7%',
      align: 'center',
    },
    { ...this.empNoColumn },
    {
      title: '검진종류',
      dataIndex: 'CHK_TYPE_NAME',
      width: '7%',
      align: 'center',
    },
    {
      title: '현 지역',
      dataIndex: 'CURRENT_WORK_AREA',
      width: '4%',
      align: 'center',
    },
    {
      title: '시행차수',
      dataIndex: 'TRIAL_SEQ',
      width: '7%',
      align: 'center',
    },
    {
      title: '등급',
      dataIndex: 'DECISION_NAME',
      width: '7%',
      align: 'center',
      render: (text, record) => {
        const str = text.substring(0, 1);
        let letter = '';
        switch (str) {
          case 'B':
            letter = '관리';
            break;
          case 'C':
            letter = '주의';
            break;
          case 'D':
            letter = '질환';
            break;
          case 'R':
            letter = '의심';
            break;
          default:
            return text;
        }
        return `${text}(${letter})`;
      },
      excelRender: (text, record) => {
        const str = text.substring(0, 1);
        let letter = '';
        switch (str) {
          case 'B':
            letter = '관리';
            break;
          case 'C':
            letter = '주의';
            break;
          case 'D':
            letter = '질환';
            break;
          case 'R':
            letter = '의심';
            break;
          default:
            return text;
        }
        return `${text}(${letter})`;
      },
    },
    {
      title: '질환명',
      dataIndex: 'DISEASE_DESC',
      width: '12%',
      align: 'center',
      excelAlign: 'left',
      render: (text, record) => <div dangerouslySetInnerHTML={{ __html: text }} />,
      excelRender: text => (text ? text.replace(/<font color='#0000ff'>|<\/font>|<B>|<\/B>|<BR\/>|<BR \/>/gi, '') : ''),
    },
    {
      title: '종합소견',
      dataIndex: 'TOTAL_COMMENT',
      width: '16%',
      align: 'center',
      excelAlign: 'left',
    },
    {
      title: '조치사항',
      dataIndex: 'MEASURE',
      width: '16%',
      align: 'center',
      excelAlign: 'left',
    },
  ];

  render() {
    const { result } = this.props;
    const { yearList, modalObj } = this.state;
    const list = (result && result.List && result.List.list) || [];
    const hospitalList = (result && result.hospitalList && result.hospitalList.list) || [];
    const chkTypeList = (result && result.chkTypeList && result.chkTypeList.categoryMapList) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];
    const resultDisease = (result && result.resultDisease && result.resultDisease.categoryMapList) || [];
    const resultDecision = (result && result.resultDecision && result.resultDecision.categoryMapList) || [];

    return (
      <>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <AntdSelect
                defaultValue={currentYear}
                className="select-sm mr5"
                style={{ width: 100 }}
                onChange={val => this.onChangeSearchParam('CHK_YEAR', val)}
              >
                {yearList.map(year => (
                  <AntdSelect.Option key={`year_${year}`} value={year}>{`${year}년`}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="현지역"
                onChange={val => this.onChangeSearchParam('WORK_AREA_CD', val)}
              >
                {workAreaList
                  .filter(item => item.LVL === 1)
                  .map(item => (
                    <AntdSelect.Option key={item.NODE_ID} value={item.CODE}>
                      {item.NAME_KOR}
                    </AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 200 }}
                allowClear
                placeholder="검진기관"
                onChange={val => this.onChangeSearchParam('HOSPITAL_CODE', val)}
              >
                {hospitalList.map(item => (
                  <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="검종"
                onChange={val => this.onChangeSearchParam('CHK_TYPE_CD_NODE_ID', val)}
              >
                {chkTypeList
                  .filter(item => item.LVL === 3)
                  .map(item => (
                    <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                  ))}
              </AntdSelect>
            </div>

            <div className="search-input-area mb10">
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="검진차수"
                onChange={val => this.onChangeSearchParam('CHK_SEQ', val)}
              >
                <AntdSelect.Option value="1">1차</AntdSelect.Option>
                <AntdSelect.Option value="2">재검</AntdSelect.Option>
              </AntdSelect>
              <UserSearchModal visible onClickRow={record => this.onChangeSearchParam('userId', record.USER_ID)} />
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 120 }}
                onChange={val => this.onChangeSearchParam('DECISION_NODE_ID', val)}
                placeholder="유소견등급"
                allowClear
              >
                {resultDecision
                  .filter(item => item.LVL === 3 && item.USE_YN === 'Y' && this.isOkText(item.NAME_KOR))
                  .map(item => (
                    <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                      {item.NAME_KOR}
                    </AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 250 }}
                showSearch
                onChange={val => this.onChangeSearchParam('DISEASE_NODE_ID', val)}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                placeholder="질병"
                allowClear
              >
                {resultDisease
                  .filter(item => item.LVL === 3 && item.USE_YN === 'Y')
                  .map(item => (
                    <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                      {item.NAME_KOR}
                    </AntdSelect.Option>
                  ))}
              </AntdSelect>
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
              <ExcelDownloadComp
                isBuilder={false}
                fileName={`ESH_${0 in list ? `${list[0].CHK_YEAR}년` : ''}유소견현황`}
                className="testClassName"
                btnText="엑셀받기"
                sheetName={`ESH_${0 in list ? `${list[0].CHK_YEAR}년` : ''}유소견현황`}
                listData={list.map(row => {
                  const result = {};
                  this.columns.forEach(col => {
                    result[col.dataIndex] =
                      (row[col.dataIndex] && typeof col.excelRender === 'function' && col.excelRender(row[col.dataIndex], row)) || row[col.dataIndex];
                  });

                  return { ...row, ...result };
                })}
                btnSize="btn-sm btn-first"
                fields={this.columns.map(item => ({
                  field: item.dataIndex,
                  style: { font: { sz: '12' }, alignment: { vertical: item.excelAlign || 'center', horizontal: item.excelAlign || 'center' } },
                }))}
                columns={this.columns.map(item => ({
                  ...item,
                  field: item.dataIndex,
                  filter: 'agTextColumnFilter',
                  width: item.width ? { wpx: Number(item.width.replace('%', '')) * 15 } : { wpx: 150 },
                  style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true }, alignment: { vertical: 'center', horizontal: 'center' } },
                }))}
              />
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable columns={this.columns} dataSource={list || []} bordered rowKey="CHK_CD" />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;

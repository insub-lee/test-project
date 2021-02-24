import React, { Component } from 'react';
import { Select, Table, Input, InputNumber, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import moment from 'moment';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import ExcelDownloader from '../Excel';

const { Option } = Select;
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);
const AntdInputNumber = StyledInputNumber(InputNumber);
const currYear = new Date().getFullYear();

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearList: [],
      listData: [],
      searchData: {
        CHK_YEAR: moment().format('YYYY'),
      },
    };
  }

  componentDidMount() {
    this.init();
  }

  /* 2006 ~ 현재년도 selectBox 생성 */
  init = () => {
    const yearList = [];
    for (let i = currYear; i >= 2006; i - 1) {
      yearList.push(i.toString());
    }
    this.setState({ yearList });
    this.handleOnSearch();
  };

  handleOnSearch = () => {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn } = this.props;
    const { searchData } = this.state;

    spinningOn();
    const apiAry = {
      key: 'reportList',
      type: 'POST',
      url: '/api/eshs/v1/common/eshsAccidentReport',
      params: searchData,
    };

    getCallDataHandlerReturnRes(sagaKey, apiAry, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { spinningOff } = this.props;
    const { reportList } = response;
    let nextList = [];
    if (reportList.length > 0) nextList = reportList.map((item, idx) => ({ ...item, isChange: false, idx }));

    this.setState(
      {
        listData: nextList,
      },
      () => spinningOff(),
    );
  };

  handleOnChangeSearchData = (target, value) => {
    this.setState(prevState => ({ searchData: { ...prevState.searchData, [target]: value } }));
  };

  onChangeData = (index, record, value, name) => {
    const { searchData, listData } = this.state;
    const { CHK_YEAR } = searchData;

    const nextListData = listData.map(item => {
      if (item.WRK_CMPNY_CD === record.WRK_CMPNY_CD && item.WORK_AREA_CD === record.WORK_AREA_CD) {
        return { ...record, isChange: true, SEARCH_YEAR: CHK_YEAR, [name]: value };
      }
      return { ...item };
    });

    this.setState({
      listData: nextListData,
    });
  };

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { listData } = this.state;
    const changeDataList = listData.filter(item => item.isChange === true);

    const submitData = {
      PARAM: {
        changeDataList,
      },
    };

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/eshsAccidentReport', submitData, (i, res) => {
          if (res.code === 200) {
            message.success(<MessageContent>저장하였습니다.</MessageContent>);
          } else {
            message.error(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
        });
      },
    });
  };

  columns = [
    {
      title: '업체명',
      dataIndex: 'WRK_CMPNY_NM',
      width: '20%',
      align: 'center',
    },
    {
      title: '사업자등록번호',
      dataIndex: 'BIZ_REG_NO',
      width: '10%',
      align: 'center',
    },
    {
      title: '사업장관리번호',
      dataIndex: 'BIZ_POB_NO',
      width: '10%',
      align: 'center',
    },
    {
      title: '사업개시번호',
      dataIndex: 'BIZ_COM_NO',
      width: '10%',
      align: 'center',
    },
    {
      title: '근무지역',
      dataIndex: 'WORK_AREA_CD',
      width: '10%',
      align: 'center',
      render: text => {
        if (text === 'GM') return '구미';
        if (text === 'CJ') return '청주';
        return '';
      },
    },
    {
      title: '근로자수',
      dataIndex: 'WORK_PEOPLE',
      width: '10%',
      align: 'center',
    },
    {
      title: '재해현황',
      children: [
        {
          title: '사고재해자 수 (사망포함)',
          dataIndex: 'CAL_ACCIDENT',
          width: '10%',
          align: 'center',
          editable: true,
          render: (text, record, index) => (
            <AntdInputNumber
              key={`CAL_ACCIDENT_${index}`}
              maxLength={9}
              className="ant-input-number-xs"
              value={text}
              onChange={e => this.onChangeData(index, record, e, 'CAL_ACCIDENT')}
            />
          ),
        },
        {
          title: '질병재해자 수 (사망포함)',
          dataIndex: 'DIS_ACCIDENT',
          width: '10%',
          align: 'center',
          editable: true,
          render: (text, record, index) => (
            <AntdInputNumber
              key={`DIS_ACCIDENT_${index}`}
              maxLength={9}
              className="ant-input-number-xs"
              value={text}
              onChange={e => this.onChangeData(index, record, e, 'DIS_ACCIDENT')}
            />
          ),
        },
        {
          title: '사고사망자 수',
          dataIndex: 'CAL_DEATH',
          width: '10%',
          align: 'center',
          editable: true,
          render: (text, record, index) => (
            <AntdInputNumber
              key={`CAL_DEATH_${index}`}
              maxLength={9}
              className="ant-input-number-xs"
              value={text}
              onChange={e => this.onChangeData(index, record, e, 'CAL_DEATH')}
            />
          ),
        },
        {
          title: '질병사망자 수',
          dataIndex: 'DIS_DEATH',
          width: '10%',
          align: 'center',
          editable: true,
          render: (text, record, index) => (
            <AntdInputNumber
              key={`DIS_DEATH_${index}`}
              maxLength={9}
              className="ant-input-number-xs"
              value={text}
              onChange={e => this.onChangeData(index, record, e, 'DIS_DEATH')}
            />
          ),
        },
      ],
    },
  ];

  render() {
    const { listData } = this.state;
    return (
      <>
        <StyledContentsWrapper>
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
                  <td>
                    <AntdSelect
                      allowClear
                      defaultValue={this.state.searchData.WORK_AREA_CD}
                      className="select-sm mr5"
                      placeholder="지역전체"
                      onChange={value => this.handleOnChangeSearchData('WORK_AREA_CD', value)}
                      style={{ width: '20%' }}
                    >
                      <Option value="CJ">청주</Option>
                      <Option value="GM">구미</Option>
                    </AntdSelect>
                  </td>
                  <th>검색년도</th>
                  <td>
                    <AntdSelect
                      defaultValue={this.state.searchData.CHK_YEAR}
                      className="select-sm mr5"
                      placeholder="년도"
                      onChange={val => this.handleOnChangeSearchData('CHK_YEAR', val)}
                      style={{ width: '20%' }}
                    >
                      {this.state.yearList.map(year => (
                        <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
                      ))}
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
              </tbody>
            </table>
          </StyledHtmlTable>
          <div className="selSaveWrapper">
            <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mt-20">
              <StyledButton className="btn-primary btn-sm btn-first" onClick={this.handleOnSearch}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={this.onSave}>
                저장
              </StyledButton>
              {false && <ExcelDownloader dataList={listData} excelNm="Report_작성" />}
            </StyledButtonWrapper>
          </div>
          <AntdTable
            dataSource={listData || []}
            footer={() => <span>{`${listData.length} 건`}</span>}
            bordered
            columns={this.columns}
            scroll={{ y: 800 }}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

List.defaultProps = {
  submitHandlerBySaga: () => false,
  getCallDataHandlerReturnRes: () => false,
  spinningOn: () => false,
  spinningOff: () => false,
};

export default List;

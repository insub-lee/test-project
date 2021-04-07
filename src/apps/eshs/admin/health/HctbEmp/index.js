import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';
import { Select } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import moment from 'moment';

import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

const currentYear = moment(new Date()).format('YYYY');
const currentMonth = moment(new Date()).format('MM');

const months = [
  { value: '01', text: '1월' },
  { value: '02', text: '2월' },
  { value: '03', text: '3월' },
  { value: '04', text: '4월' },
  { value: '05', text: '5월' },
  { value: '06', text: '6월' },
  { value: '07', text: '7월' },
  { value: '08', text: '8월' },
  { value: '09', text: '9월' },
  { value: '10', text: '10월' },
  { value: '11', text: '11월' },
  { value: '12', text: '12월' },
  { value: '13', text: '년평균' },
];

const sex = [
  { value: 'M', text: '남' },
  { value: 'F', text: '녀' },
];

const areas = [
  { text: '청주', value: 'CP' },
  { text: '구미', value: 'GP' },
  { text: '영동', value: 'AA' },
  // { text: '이천', value: 'B1' },
  // { text: '해외', value: 'Z3' },
];

const excelCloumns = [
  {
    title: '소속',
    field: 'DEPT_NM',
    filter: 'agTextColumnFilter',
    width: '30%',
    align: 'center',
  },
  {
    title: '총인원',
    field: 'TOTAL',
    filter: 'agTextColumnFilter',
    width: '7%',
    align: 'center',
  },
  {
    title: '성별(남)',
    field: 'MALE_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
  {
    title: '성별(녀)',
    field: 'FEMALE_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
  {
    title: '직종(생산)',
    field: 'PRODUCT_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
  {
    title: '직종(사무)',
    field: 'OFFICE_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
  {
    title: '직종(연구)',
    field: 'RESEARCH_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
  {
    title: '나이(20)',
    field: 'AGE20_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
  {
    title: '나이(30)',
    field: 'AGE30_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
  {
    title: '나이(40)',
    field: 'AGE40_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
  {
    title: '나이(50)',
    field: 'AGE50_NUM',
    width: '7%',
    filter: 'agTextColumnFilter',
    align: 'center',
  },
];

const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      searchParam: {
        WORK_AREA_CD: this.props?.profile?.BAREA_CD,
        YEAR: currentYear,
        MONTH: currentMonth,
      },
    };
  }

  componentDidMount() {
    const years = [];

    for (let i = currentYear; i >= 1998; i--) {
      years.push(String(i));
    }
    this.setState({ years }, this.getList);
  }

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;

    spinningOn();

    const apiAry = [
      {
        key: 'LIST',
        type: 'POST',
        url: '/api/eshs/v1/common/health/eshsHealthHctbEmp',
        params: { PARAM: searchParam },
      },
    ];
    return getCallDataHandler(id, apiAry, spinningOff);
  };

  onChangeSearchParam = (target, value) =>
    this.setState(prevState => ({
      searchParam: { ...prevState.searchParam, [target]: value },
    }));

  render() {
    const { years, searchParam } = this.state;
    const { result } = this.props;
    const list = result?.LIST?.list || [];
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdSelect
              className="select-sm mr5"
              placeholder="지역전체"
              allowClear
              defaultValue={searchParam?.WORK_AREA_CD}
              style={{ width: 120 }}
              onChange={value => this.onChangeSearchParam('WORK_AREA_CD', value)}
            >
              {areas.map(a => (
                <Option key={a.value} value={a.value}>
                  {a.text}
                </Option>
              ))}
            </AntdSelect>
            <AntdSelect
              className="select-sm mr5"
              defaultValue={currentYear}
              style={{ width: 120 }}
              onChange={value => this.onChangeSearchParam('YEAR', value)}
            >
              {years.map(y => (
                <Option key={y} value={y}>
                  {y}
                </Option>
              ))}
            </AntdSelect>
            <AntdSelect
              className="select-sm mr5"
              defaultValue={currentMonth}
              style={{ width: 120 }}
              onChange={value => this.onChangeSearchParam('MONTH', value)}
            >
              {months.map(m => (
                <Option key={m.value} value={m.value}>
                  {m.text}
                </Option>
              ))}
            </AntdSelect>
            <AntdSelect
              className="select-sm mr5"
              placeholder="성별전체"
              allowClear
              style={{ width: 120 }}
              onChange={value => this.onChangeSearchParam('SEX', value)}
            >
              {sex.map(s => (
                <Option key={s?.vlaue} value={s?.value}>
                  {s?.text}
                </Option>
              ))}
            </AntdSelect>
            <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
              검색
            </StyledButton>
            <ExcelDownloadComp
              isBuilder={false}
              fileName={`ESH_${searchParam?.YEAR}년${
                searchParam?.MONTH === '13' ? '평균' : `${searchParam?.MONTH}월`
              }인원현황`}
              className="testClassName"
              btnText="엑셀받기"
              sheetName={`ESH_${searchParam?.YEAR}년${
                searchParam?.MONTH === '13' ? '평균' : `${searchParam?.MONTH}월`
              }인원현황`}
              listData={list}
              btnSize="btn-sm btn-first"
              fields={excelCloumns.map(item => ({
                ...item,
                style: {
                  font: { sz: '12' },
                  alignment: { vertical: item.excelAlign || 'center', horizontal: item.excelAlign || 'center' },
                },
              }))}
              columns={excelCloumns.map(item => ({
                ...item,
                width: item.width ? { wpx: Number(item.width.replace('%', '')) * 15 } : { wpx: 150 },
                style: {
                  fill: { fgColor: { rgb: 'D6EBFF' } },
                  font: { sz: '', bold: true },
                  alignment: { vertical: 'center', horizontal: 'center' },
                },
              }))}
            />
          </div>
        </StyledCustomSearchWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="30%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
            </colgroup>
            <thead>
              <tr>
                <th rowSpan={2}>소속</th>
                <th rowSpan={2}>총인원</th>
                <th colSpan={2}>성별</th>
                <th colSpan={3}>직종</th>
                <th colSpan={4}>나이</th>
              </tr>
              <tr>
                <th>남</th>
                <th>녀</th>
                <th>생산</th>
                <th>사무</th>
                <th>연구</th>
                <th>20</th>
                <th>30</th>
                <th>40</th>
                <th>50</th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr className={item?.DEPT_ID === -999 ? 'tr-total' : 'tr-pointer tr-center'} key={item?.DEPT_CD}>
                  <td align="center" className="td-left">
                    {item?.DEPT_NM}
                  </td>
                  <td align="center">{item?.TOTAL}</td>
                  <td align="center">{item?.MALE_NUM}</td>
                  <td align="center">{item?.FEMALE_NUM}</td>
                  <td align="center">{item?.PRODUCT_NUM}</td>
                  <td align="center">{item?.OFFICE_NUM}</td>
                  <td align="center">{item?.RESEARCH_NUM}</td>
                  <td align="center">{item?.AGE20_NUM}</td>
                  <td align="center">{item?.AGE30_NUM}</td>
                  <td align="center">{item?.AGE40_NUM}</td>
                  <td align="center">{item?.AGE50_NUM}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

const HctbEmp = () => <BizMicroDevBase sagaKey="HctbEmp" component={Comp} />;

HctbEmp.propTypes = {};
HctbEmp.defaultProps = {};

Comp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  profile: PropTypes.object,
};

Comp.defaultProps = {
  result: {},
  profile: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default HctbEmp;

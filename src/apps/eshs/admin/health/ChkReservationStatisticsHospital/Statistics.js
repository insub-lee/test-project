import React, { Component } from 'react';
import { Select, Typography } from 'antd';
import numeral from 'numeral';
import { FileExcelOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

// import { excelDown } from 'utils/excelFunc';

const AntdSelect = StyledSelect(Select);


class Statistics extends Component {
  state = {
    yearList: [],
    searchInfo: {},
    list: [],
    hosList: [],
  }

  componentWillMount() {
    const today = new Date();
    const currYear = today.getFullYear();
    const yearList = [];
    for (let i=currYear; i>=1998; i--) {
      yearList.push(i.toString());
    }
    this.setState({ yearList });

    this.onChangeSearchInfo('CHK_YEAR', currYear.toString());
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'chkTypeList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 675 }
        },
      },
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 316 }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  }

  getStatistics = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'statistics',
        url: '/api/eshs/v1/common/health/healthChkReservationStatisticsHospital',
        type: 'POST',
        params: {
          PARAM: { ...this.state.searchInfo }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
      this.initStatistics();
    });
  }

  initStatistics = () => {
    const { result } = this.props;
    if (result && result.statistics && result.statistics.list) {

      let groupCnt = 0;
      let currChkType = 0;

      let hosChkTypeCnt = 0;  // 검진종류 rowSpan
      let hosChkSeqCnt = 0    // 검진차수 rowSpan
      let hosCurrChkType = 0;
      let hosCurrChkSeq = '';
      
      this.setState({
        list: result.statistics.list.map(item => {
          if (currChkType !== item.CHK_TYPE_CD_NODE_ID) {
            groupCnt = result.statistics.list.filter(l => l.CHK_TYPE_CD_NODE_ID === item.CHK_TYPE_CD_NODE_ID).length;
          } else {
            groupCnt = 0;
          }

          currChkType = item.CHK_TYPE_CD_NODE_ID;
          return {
            ...item,
            rowSpan: groupCnt,
          }
        }),
        hosList: result.statistics.hosList.map(item => {
          // 검진종류 rowSpan 구하기
          if (hosCurrChkType !== item.CHK_TYPE_CD_NODE_ID) {
            hosChkTypeCnt = result.statistics.hosList.filter(l => l.CHK_TYPE_CD_NODE_ID === item.CHK_TYPE_CD_NODE_ID).length;
          } else {
            hosChkTypeCnt = 0;
          }

          // 검진차수 rowSpan 구하기
          if (hosCurrChkType !== item.CHK_TYPE_CD_NODE_ID || (hosCurrChkType === item.CHK_TYPE_CD_NODE_ID && hosCurrChkSeq !== item.CHK_SEQ)) {
            hosChkSeqCnt = result.statistics.hosList.filter(l => l.CHK_TYPE_CD_NODE_ID === item.CHK_TYPE_CD_NODE_ID && l.CHK_SEQ === item.CHK_SEQ).length;
          } else {
            hosChkSeqCnt = 0;
          }

          hosCurrChkType = item.CHK_TYPE_CD_NODE_ID;
          hosCurrChkSeq = item.CHK_SEQ;
          return {
            ...item,
            rowSpan1: hosChkTypeCnt,
            rowSpan2: hosChkSeqCnt,
          }
        })
      });
    }
  }

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo }
    });
  };

  excelDownload = () => {
    const tableHtml = document.getElementById('excel-down-table');
    // excelDown(tableHtml.outerHTML, 'aaaaaa');
  };

  render() {
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdSelect
              defaultValue={this.state.searchInfo.CHK_YEAR}
              className="select-sm mr5" placeholder="년도" style={{ width: 110 }}
              onChange={val => this.onChangeSearchInfo('CHK_YEAR', val)}
            >
            {this.state.yearList.map(year => (
              <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
            ))}
            </AntdSelect>
            <AntdSelect
              defaultValue={this.state.searchInfo.WORK_AREA_CD_NODE_ID}
              className="select-sm mr5" placeholder="지역" style={{ width: 110 }} allowClear
              onChange={val => this.onChangeSearchInfo('WORK_AREA_CD_NODE_ID', val)}
            >
            {result && result.workAreaList && result.workAreaList.categoryMapList && (
              result.workAreaList.categoryMapList.filter(cate => cate.LVL === 1).map(cate => (
                <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
              ))
            )}
            </AntdSelect>
            <AntdSelect
              defaultValue={this.state.searchInfo.CHK_TYPE_CD_NODE_ID}
              className="select-sm mr5" placeholder="검진종류" style={{ width: 120 }} allowClear
              onChange={val => this.onChangeSearchInfo('CHK_TYPE_CD_NODE_ID', val)}
            >
            {result && result.chkTypeList && result.chkTypeList.categoryMapList && (
              result.chkTypeList.categoryMapList.filter(cate => cate.LVL === 3).map(cate => (
                <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
              ))
            )}
            </AntdSelect>
            <StyledButton className="btn-gray btn-sm mr5" onClick={this.getStatistics}>검색</StyledButton>
            {/* <StyledButton className="btn-gray btn-sm" onClick={this.excelDownload}><FileExcelOutlined /> Excel</StyledButton> */}
          </div>
        </StyledCustomSearchWrapper>
        <Typography.Text>1. 예약/검진률</Typography.Text>
        <StyledHtmlTable style={{ marginBottom: 20 }}>
          <table>
            <colgroup>
              <col width="8%" />
              <col width="8%" />
              <col width="12%" />
              <col width="12%" />
              <col width="12%" />
              <col width="12%" />
              <col width="12%" />
              <col width="12%" />
              <col width="12%" />
            </colgroup>
            <thead>
              <th>검종</th>
              <th>차수</th>
              <th>임직원</th>
              <th>배우자</th>
              <th>대상인원</th>
              <th>예약인원</th>
              <th>예약률(%)</th>
              <th>검진인원</th>
              <th>검진률(%)</th>
            </thead>
            <tbody>
            {this.state.list && this.state.list.map(item => (
              <tr className="tr-center">
                {item.rowSpan !== 0 && <td rowSpan={item.rowSpan}>{item.CHK_TYPE_NAME}</td>}
                <td>{item.CHK_SEQ === '1' ? '1차' : '재검'}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.EMPLOYEE_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.FAM_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.TOTAL_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.APP_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.APP_RATE).format('0.0')}%</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.CHK_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.CHK_RATE).format('0.0')}%</td>
              </tr>
            ))}
            </tbody>
          </table>
        </StyledHtmlTable>
        <Typography.Text>2. 검진기관별 인원</Typography.Text>
        <StyledHtmlTable>
          <table id="excel-down-table">
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="20%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <th>검종</th>
              <th>차수</th>
              <th>검진기관</th>
              <th>임직원</th>
              <th>배우자</th>
              <th>대상인원</th>
              <th>예약인원</th>
              <th>검진인원</th>
              <th>검진률(%)</th>
            </thead>
            <tbody>
            {this.state.hosList && this.state.hosList.map(item => (
              <tr className={`tr-center ${!item.CHK_TYPE_CD_NODE_ID ? 'tr-total' : ''}`}>
              {!item.CHK_TYPE_CD_NODE_ID && !item.CHK_SEQ && !item.HOSPITAL_CODE ? (
                <td colSpan={3}>합계</td>
              ) : (
                <>
                  {item.rowSpan1 !== 0 && <td rowSpan={item.rowSpan1}>{item.CHK_TYPE_NAME}</td>}
                  {item.rowSpan2 !== 0 && <td rowSpan={item.rowSpan2}>{item.CHK_SEQ === '1' ? '1차' : '재검'}</td>}
                </>
              )}
                {item.HOSPITAL_CODE && <td>{item.HOSPITAL_NAME}</td>}
                <td style={{ textAlign: 'right' }}>{numeral(item.EMPLOYEE_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.FAM_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.TOTAL_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.APP_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.CHK_CNT).format('0,0')}</td>
                <td style={{ textAlign: 'right' }}>{numeral(item.CHK_RATE).format('0.0')}%</td>
              </tr>
            ))}
            </tbody>
          </table>
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

export default Statistics;
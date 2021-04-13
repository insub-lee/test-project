import React, { Component } from 'react';
import { Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

class Quota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotaList: [],
      yearList: [],
      searchInfo: {
        CHK_TYPE_CD: '002', // 고정(종합검진)
        CHK_YEAR: '',
        HOSPITAL_CODE: '',
        START_DT: '',
        END_DT: '',
      },
      batchQuota: '',
    };
  }

  componentWillMount() {
    const today = new Date();
    const currYear = today.getFullYear();
    const yearList = [];
    for (let i = currYear; i >= 1998; i--) {
      yearList.push(i);
    }
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo.CHK_YEAR = currYear;
      return {
        yearList,
        searchInfo,
      };
    });

    const { sagaKey, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'hospitalUser',
      url: `/api/eshs/v1/common/MhrsHospitalUser`,
      type: 'GET',
    };
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.user && res.user.HOSPITAL_CODE) {
        this.setState({
          searchInfo: { ...this.state.searchInfo, HOSPITAL_CODE: res.user.HOSPITAL_CODE },
        });
      }
    });
  }

  getList = () => {
    const { searchInfo } = this.state;
    if (searchInfo.HOSPITAL_CODE === '') {
      return false;
    }

    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;
    const apiInfo = {
      key: 'quotaList',
      url: `/api/eshs/v1/common/health/healthChkHospitalQuota?HOSPITAL_CODE=${searchInfo.HOSPITAL_CODE}&CHK_YEAR=${searchInfo.CHK_YEAR}`,
      type: 'GET',
    };
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, response) => {
      if (response && response.list) {
        this.setState({
          quotaList: response.list,
        });
        this.handleSetWeekTotal();
        spinningOff();
      }
    });
  };

  onChangeSearchInfo = (key, val) => {
    this.setState(prevState => {
      const { searchInfo } = prevState;
      searchInfo[key] = val;
      return { searchInfo };
    });
  };

  onChangeRangeDatePicker = (val1, val2) => {
    if (val2.length === 2) {
      this.setState(prevState => {
        const { searchInfo } = prevState;
        searchInfo.START_DT = val2[0];
        searchInfo.END_DT = val2[1];
        return { searchInfo };
      });
    }
  };

  onCreatePeriod = () => {
    const { searchInfo } = this.state;
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;

    if (searchInfo.HOSPITAL_CODE === '') {
      return false;
    }

    if (searchInfo.START_DT === '' || searchInfo.END_DT === '') {
      message.info(<MessageContent>기간을 선택해 주세요.</MessageContent>);
      return false;
    }

    const apiInfo = {
      key: 'quotaList',
      url: `/api/eshs/v1/common/health/healthChkCreateAppDate`,
      type: 'POST',
      params: {
        PARAM: { ...searchInfo },
      },
    };
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.list) {
        this.setState({
          quotaList: res.list.map(item => ({ ...item, HOSPITAL_CODE: searchInfo.HOSPITAL_CODE, CHK_YEAR: searchInfo.CHK_YEAR })),
        });
        this.handleSetWeekTotal();
        spinningOff();
      }
    });
  };

  onDeletePeriod = () => {
    const { searchInfo } = this.state;
    if (searchInfo.HOSPITAL_CODE === '') {
      return false;
    }

    if (searchInfo.START_DT === '' || searchInfo.END_DT === '') {
      message.info(<MessageContent>기간을 선택해 주세요.</MessageContent>);
      return false;
    }

    Modal.confirm({
      title: '예약인원이 있는 날짜는 삭제되지 않습니다.',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const startDate = new Date(searchInfo.START_DT);
        const endDate = new Date(searchInfo.END_DT);

        const delList = [];
        while (startDate.getTime() <= endDate.getTime()) {
          delList.push(moment(startDate).format('YYYY-MM-DD'));
          startDate.setDate(startDate.getDate() + 1);
        }

        this.setState(prevState => {
          const { quotaList } = prevState;
          return {
            quotaList: quotaList.filter(item => {
              let rslt = true;
              delList.forEach(del => {
                if (del === item.APP_DT) {
                  if (item.APP_DT_CNT === 0) {
                    rslt = false;
                  }
                }
              });
              return rslt;
            }),
          };
        });
        this.handleSetWeekTotal();
      },
    });
  };

  onChangeQuotaNum = (appDate, val) => {
    const regExt = /^[0-9]+$/;
    if (val !== '' && !regExt.test(val)) {
      message.info(<MessageContent>숫자만 입력해주세요.</MessageContent>);
      return false;
    }

    this.setState(prevState => {
      const { quotaList } = prevState;
      return {
        quotaList: quotaList.map(item => {
          if (item.APP_DT === appDate) {
            item.QUOTA_NUM = val;
          }
          return item;
        }),
      };
    });
    this.handleSetWeekTotal();
  };

  handleBatchInit = () => {
    const { batchQuota } = this.state;
    if (batchQuota === '') {
      message.info(<MessageContent>수검정원을 입력해주세요.</MessageContent>);
      return false;
    }

    this.setState(prevState => {
      const { quotaList } = prevState;
      return {
        quotaList: quotaList.map(item => ({ ...item, QUOTA_NUM: item.QUOTA_NUM != 0 ? item.QUOTA_NUM : batchQuota })),
      };
    });
    this.handleSetWeekTotal();
  };

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM: {
        quotaList: this.state.quotaList,
        ...this.state.searchInfo,
      },
    };

    if (this.state.quotaList.length === 0) {
      message.info(<MessageContent>기간생성을 해주세요.</MessageContent>);
      return false;
    }

    let isValid = true;
    this.state.quotaList.forEach(item => {
      if (item.QUOTA_NUM === '') {
        message.info(<MessageContent>수검정원을 입력해주세요.</MessageContent>);
        isValid = false;
      } else if (item.APP_DT_CNT > Number(item.QUOTA_NUM)) {
        message.info(<MessageContent>[{item.APP_DT}]의 수검정원은 예약인원보다 작을 수 없습니다.</MessageContent>);
        isValid = false;
      }
    });
    if (!isValid) {
      return false;
    }

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/healthChkHospitalQuota', submitData, (id, res) => {
          if (res && res.result > 0) {
            message.success(<MessageContent>저장하였습니다.</MessageContent>);
            spinningOff();
          } else {
            message.error(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
        });
      },
    });
  };

  // 주간누계
  handleSetWeekTotal = () => {
    this.setState(prevState => {
      const { quotaList } = prevState;
      let weekTotal = 0;
      let weekTotal2 = 0;
      let total = 0;
      let total2 = 0;
      return {
        quotaList: quotaList.map(item => {
          if (moment(item.APP_DT).format('ddd') === '월') {
            weekTotal = 0;
            weekTotal2 = 0;
          }
          weekTotal += Number(item.QUOTA_NUM);
          weekTotal2 += Number(item.APP_DT_CNT);
          total += Number(item.QUOTA_NUM);
          total2 += Number(item.APP_DT_CNT);

          item.WEEK_TOTAL = weekTotal;
          item.WEEK_TOTAL2 = weekTotal2;
          item.TOTAL = total;
          item.TOTAL2 = total2;

          return item;
        }),
      };
    });
  };

  render() {
    const { hospitalList, yearList, searchInfo, quotaList, isSpinning } = this.state;

    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <AntdSelect
                className="select-sm mr5"
                placeholder="년도 선택"
                style={{ width: 120 }}
                onChange={val => this.onChangeSearchInfo('CHK_YEAR', val)}
                defaultValue={searchInfo.CHK_YEAR}
              >
                {yearList.map(item => (
                  <AntdSelect.Option value={item}>{`${item}년`}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                format="YYYY-MM-DD"
                style={{ width: 325 }}
                onChange={(val1, val2) => this.onChangeRangeDatePicker(val1, val2)}
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.onCreatePeriod}>
                기간생성
              </StyledButton>
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.onDeletePeriod}>
                기간삭제
              </StyledButton>
              <AntdInput
                placeholder="수검정원"
                className="ant-input-sm mr5 ant-input-inline"
                style={{ width: 70 }}
                onChange={e => {
                  this.setState({ batchQuota: e.target.value });
                }}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.handleBatchInit}>
                일괄입력
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right" style={{ width: '60%', margin: '0 auto', marginBottom: 5 }}>
            <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>
              저장
            </StyledButton>
          </StyledButtonWrapper>
          <StyledHtmlTable style={{ width: '60%', margin: '0 auto' }}>
            <table>
              <colgroup>
                <col width="40%" />
                <col width="30%" />
                <col width="30%" />
              </colgroup>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>수검정원</th>
                  <th>예약인원</th>
                </tr>
              </thead>
              <tbody>
                {quotaList &&
                  quotaList.map((item, idx) => {
                    const CONTENT = [];
                    CONTENT.push(
                      <tr className="tr-center">
                        <td>
                          {item.APP_DT}({moment(item.APP_DT).format('ddd')})
                        </td>
                        <td>
                          <AntdInput
                            className="ant-input-xs ant-input-inline"
                            style={{ width: 100, textAlign: 'right' }}
                            value={item.QUOTA_NUM}
                            onChange={e => this.onChangeQuotaNum(item.APP_DT, e.target.value)}
                          />
                        </td>
                        <td>
                          <AntdInput className="ant-input-full" value={item.APP_DT_CNT} readOnly />
                        </td>
                      </tr>,
                    );
                    if (moment(item.APP_DT).format('ddd') === '토' || idx === quotaList.length - 1) {
                      CONTENT.push(
                        <tr className="tr-center">
                          <th>주간 누계</th>
                          <th>{item.WEEK_TOTAL}</th>
                          <th>{item.WEEK_TOTAL2}</th>
                        </tr>,
                      );
                    }
                    if (idx === quotaList.length - 1) {
                      CONTENT.push(
                        <tr className="tr-center">
                          <th>전체 누계</th>
                          <th>{item.TOTAL}</th>
                          <th>{item.TOTAL2}</th>
                        </tr>,
                      );
                    }
                    return CONTENT;
                  })}

                {/* {quotaList && quotaList.map(item => (
                  <tr className="tr-center">
                    <td>{item.APP_DT}({moment(item.APP_DT).format('ddd')})</td>
                    <td>
                      <AntdInput
                        className="ant-input-sm ant-input-inline" style={{ width: 100, textAlign: 'right' }}
                        value={item.QUOTA_NUM} 
                        onChange={e => this.onChangeQuotaNum(item.APP_DT, e.target.value)}
                      />
                    </td>
                    <td>
                      <AntdInput
                        className="ant-input-sm ant-input-full"
                        value={item.APP_DT_CNT}
                        readOnly
                      />
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </StyledHtmlTable>
        </StyledContentsWrapper>
      </>
    );
  }
}

export default Quota;

import React, { Component } from 'react';
import { Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdSelect = StyledSelect(Select);
const AntdRangeDatePicker= StyledDatePicker(DatePicker.RangePicker);

class PeriodSetting extends Component {
  state = {
    WORK_AREA_CD_NODE_ID: '',
    periodList: [],
  }

  componentWillMount() {
    const { sagaKey, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'siteList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=45',
      type: 'GET',
      param: {},
    };
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.categoryMapList) {
        this.setState({ WORK_AREA_CD_NODE_ID: res.categoryMapList.filter(item => item.LVL !== 0)[0].NODE_ID });
        this.getList();
      }
    });
  }

  getList = () => {
    const { sagaKey, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'periodList',
      url: `/api/eshs/v1/common/health/healthChkReservationPeriod?WORK_AREA_CD_NODE_ID=${this.state.WORK_AREA_CD_NODE_ID}`,
      type: 'GET',
      param: {},
    };
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.list) {
        this.setState({
          periodList: res.list
        });
      }
    });
  };

  onSearch = () => {
    if (!this.state.WORK_AREA_CD_NODE_ID && this.state.WORK_AREA_CD_NODE_ID === '') {
      message.info(<MessageContent>지역을 선택해 주세요.</MessageContent>);
      return false;
    }
    this.getList();
  };

  onChangeDate = (row, val1, val2) => {
    this.setState(prevState => {
      const { periodList } = prevState;
      return {
        periodList: periodList.map(item => {
          if (item.CHK_TYPE_CD === row.CHK_TYPE_CD) {
            item.FROM_DT = val2[0];
            item.TO_DT = val2[1];
          }
          return item;
        }),
      }
    });
  }

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM : {
        periodList: this.state.periodList,
        WORK_AREA_CD_NODE_ID: this.state.WORK_AREA_CD_NODE_ID,
      }
    };

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/healthChkReservationPeriod', submitData, (i, res) => {
          if (res && res.result > 0) {
            message.info(<MessageContent>저장하였습니다.</MessageContent>);
          } else {
            message.info(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
        });
      }
    });
  };

  render() {
    const { result } = this.props;
    return (
      <StyledContentsWrapper>
        <StyledSearchWrapper>
          <div className="row">
            <AntdSelect
              value={this.state.WORK_AREA_CD_NODE_ID} className="select-sm mr5" placeholder="지역 선택" style={{ width: 120 }}
              onChange={val => { this.setState({ WORK_AREA_CD_NODE_ID: val })}}
            >
              {result.siteList && result.siteList.categoryMapList && (
                result.siteList.categoryMapList.filter(item => item.LVL !== 0).map(item => (
                  <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                ))
              )}
            </AntdSelect>
            <StyledButton className="btn-light btn-sm mr5" onClick={this.onSearch}>검색</StyledButton>
            <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>저장</StyledButton>
          </div>
        </StyledSearchWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <thead>
              <tr>
                <th>검종</th>
                <th>기간</th>
              </tr>
            </thead>
            <tbody>
              {this.state.periodList && (
                this.state.periodList.map(item => (
                  <tr className="tr-center">
                    <td>{item.CHK_TYPE_NAME}</td>
                    <td>
                      <AntdRangeDatePicker 
                        value={[item.FROM_DT ? moment(item.FROM_DT) : '', item.TO_DT ? moment(item.TO_DT) : '']}
                        className="ant-picker-sm mr5" onChange={(val1, val2) => this.onChangeDate(item, val1, val2)}
                        format="YYYY-MM-DD"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </StyledHtmlTable>
      </StyledContentsWrapper>
    )
  }
}

export default PeriodSetting;
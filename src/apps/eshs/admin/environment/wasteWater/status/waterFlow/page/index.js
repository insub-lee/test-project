import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Select, Spin, DatePicker } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Styled from './Styled';
import WaterFlowTable from '../infoTable';
import LineChart from '../graph/lineChart';

const AntdSelect = StyledSelect(Select);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);
const { Option } = Select;

class WaterFlowStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchRange: [moment().subtract(1, 'M'), moment()],
      listData: [],
    };
  }

  // 검색버튼
  onSearch = () => {
    const { searchRange } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    this.setState({ isSearching: true });
    const submitData = {
      PARAM: {
        type: 'GET_USED_FLOW_INFO',
        sDate: searchRange[0].format('YYYY-MM-DD'),
        eDate: searchRange[1].format('YYYY-MM-DD'),
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/waterStatus', submitData, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list } = response;
    this.setState({
      isSearching: false,
      listData: list || [],
    });
  };

  listSetMonthly = (list) => {
    // 월별 리스트 분류
    const monthlyList = {};
    list.map(item => {
      const month = moment(item.OP_DT, 'YYYYMMDD').format('MM');

    })

    return {};
  };


  render() {
    const { isSearching, searchRange, listData } = this.state;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue="청주" className="select-sm" style={{ width: '100px' }} disabled>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
                <Option value="이천">이천</Option>
              </AntdSelect>
              <span className="text-label">기간</span>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                defaultValue={searchRange}
                format="YYYY-MM-DD"
                onChange={date => this.setState({ searchRange: date })}
              />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.onSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        {listData.length > 0 && (
          <>
            <div style={{ display: 'inline-block', width: '50%', padding: '5px' }}>
              <WaterFlowTable listData={listData} />
            </div>
            <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top', padding: '5px' }}>
              <div className="chart_wrap">
                <div className="chart_title">폐수발생량(C-2)</div>
                <LineChart chartName="COD" xField="OP_DT" xFieldNm="일자" yField="USED_AMOUNT" yFieldNm="사용량" listData={listData || []} />
              </div>
            </div>
          </>
        )}
      </Styled>
    );
  }
}

WaterFlowStatus.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

WaterFlowStatus.defaultProps = {};

export default WaterFlowStatus;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Spin, DatePicker } from 'antd';
import moment from 'moment';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StatusListTable1 from '../infoTable/statusListTable1';
import StatusListTable2 from '../infoTable/statusListTable2';
import StatusListTable3 from '../infoTable/statusListTable3';
import C2F6Excel from '../excel/C2F6Excel';
import CF4Excel from '../excel/CF4Excel';
import C3F8Excel from '../excel/C3F8Excel';

const { MonthPicker } = DatePicker;
const AntdMonthPicker = StyledDatePicker(MonthPicker);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class GasStatusPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAfter: false,
      isSearching: false,
      site: '구미', // 검색조건
      month: moment().format('YYYYMM'),
      listData1: [],
      listData2: [],
      listData3: [],
    };
  }

  // 검색
  handlerSearch = () => {
    this.setState({ isSearching: true });
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { site, month } = this.state;
    const apiInfo = {
      key: 'gasStatusList',
      type: 'GET',
      url: `/api/gcs/v1/common/gas/status?site=${site}&month=${month}`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list1, list2, list3 } = response;
    this.setState({
      searchAfter: true,
      isSearching: false,
      listData1: (list1 && list1.length > 2 && list1) || [],
      listData2: (list2 && list2.length > 2 && list2) || [],
      listData3: (list3 && list3.length > 2 && list3) || [],
    });
  };

  render() {
    const { site, listData1, listData2, listData3, isSearching, searchAfter, month } = this.state;
    return (
      <>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue={site} className="select-sm" style={{ width: '100px' }} onChange={val => this.setState({ site: val })} disabled>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
              <span className="text-label">사용 월</span>
              <AntdMonthPicker
                style={{ marginRight: '10px' }}
                className="ant-picker-sm"
                defaultValue={moment(month, 'YYYYMM')}
                format="YYYY.MM"
                onChange={date => this.setState({ month: moment(date).format('YYYYMM') })}
              />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handlerSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          {!searchAfter ? (
            <div style={{ height: '29px' }} />
          ) : (
            <>
              <div style={{ display: 'inline-block', marginRight: '5px' }}>
                <C2F6Excel listData={listData1} />
              </div>
              <div style={{ display: 'inline-block', marginRight: '5px' }}>
                <CF4Excel listData={listData2} />
              </div>
              <div style={{ display: 'inline-block' }}>
                <C3F8Excel listData={listData3} />
              </div>
            </>
          )}
        </StyledButtonWrapper>
        {searchAfter && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <StatusListTable1 listData={listData1} handleModal={this.handleModal} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <StatusListTable2 listData={listData2} handleModal={this.handleModal} />
            </div>
            <div>
              <StatusListTable3 listData={listData3} handleModal={this.handleModal} />
            </div>
          </>
        )}
      </>
    );
  }
}
GasStatusPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

GasStatusPage.defaultProps = {};

export default GasStatusPage;

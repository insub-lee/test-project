import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Select, Spin, DatePicker } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Styled from './Styled';
import ActInfoListTable from '../infoTable/listDataTable';

const AntdSelect = StyledSelect(Select);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);
const { Option } = Select;

class ActInfoStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchType: 'CLEAN',
      searchRange: [moment().subtract(1, 'M'), moment()],
      resultType: '',
      listData: [],
    };
  }

  // 검색버튼
  onSearch = () => {
    const { searchRange, searchType } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    this.setState({ isSearching: true });
    const submitData = {
      PARAM: {
        type: 'GET_ACT_INFO',
        groupUnitCd: '017',
        sType: searchType,
        sDate: searchRange[0].format('YYYY-MM-DD'),
        eDate: searchRange[1].format('YYYY-MM-DD'),
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/waterStatus', submitData, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { searchType } = this.state;
    const { list } = response;
    this.setState({
      isSearching: false,
      resultType: searchType,
      listData: list || [],
    });
  };

  render() {
    const { isSearching, resultType, searchRange, listData } = this.state;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <AntdSelect defaultValue="구미" className="select-sm" style={{ width: '100px' }} disabled>
                <Option value="구미">구미</Option>
                <Option value="청주">청주</Option>
                <Option value="이천">이천</Option>
              </AntdSelect>
              <AntdSelect
                defaultValue="017"
                className="select-sm"
                style={{ width: '200px', marginLeft: '5px' }}
                disabled
              >
                <Option value="017">Magnachip 반도체</Option>
              </AntdSelect>
              <span className="text-label">===</span>
              <AntdSelect
                defaultValue="CLEAN"
                className="select-sm"
                style={{ width: '100px' }}
                onChange={val => this.setState({ searchType: val })}
              >
                <Option value="CLEAN">방지시설</Option>
                <Option value="EXHAUST">배출시설</Option>
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
        <div style={{ display: 'inline-block', width: '100%', padding: '5px' }}>
          {resultType !== '' && <ActInfoListTable type={resultType} listData={listData} />}
        </div>
      </Styled>
    );
  }
}

ActInfoStatus.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
};

ActInfoStatus.defaultProps = {};

export default ActInfoStatus;

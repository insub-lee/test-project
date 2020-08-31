import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, Spin, DatePicker } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Styled from './Styled';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);
const { Option } = Select;

class WaterFlowStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      waterType: '원수',
      division: 'HF계',
      searchRange: [moment().subtract(1, 'M'), moment()],
      modalTitle: '',
      modalVisible: false,
      searchWaterType: '',
      searchDivision: '',
      listData: [],
    };
  }

  // waterType onChange
  onChangeWaterType = value => {
    switch (value) {
      case '원수':
        this.setState({
          waterType: value,
          division: 'HF계',
        });
        break;
      case '방류수':
        this.setState({
          waterType: value,
          division: '',
        });
        break;
      default:
        break;
    }
  };

  // 검색버튼
  onSearch = () => {
    const { searchRange, waterType, division } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    this.setState({ isSearching: true });
    const submitData = {
      PARAM: {
        type: 'SEARCH',
        sDate: searchRange[0],
        eDate: searchRange[1],
        waterType,
        division,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwQuality', submitData, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list, param } = response;
    this.setState({
      isSearching: false,
      searchWaterType: param.waterType || '',
      searchDivision: param.division || '',
      listData: list || [],
    });
  };

  render() {
    const { isSearching, waterType, searchRange } = this.state;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue="청주" className="select-sm" style={{ width: '100px' }} disabled>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
              <span className="text-label">기간</span>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                defaultValue={searchRange}
                format="YYYY-MM-DD"
                onChange={(date, str) => this.setState({ searchRange: str })}
              />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.onSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <div>컨텐츠</div>
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

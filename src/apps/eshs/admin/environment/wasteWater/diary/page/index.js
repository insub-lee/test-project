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
import MenuTable from '../infoTable/mainMenuTable';
import ExhaustActTable from '../infoTable/exhaustActTable';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
const { Option } = Select;

class QualityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'input',
      selectedMenu: '',
      searchDate: moment().format('YYYY-MM-DD'),
      renderData: undefined,
      mainformData: {
        GROUP_UNIT_CD: '17', // 회사(매그너칩 고정)
        OP_DT: moment().format('YYYY-MM-DD'), // 일지날짜
        TEMPERATURE: undefined, // 온도
        WEATHER: undefined, // 날씨
        APPROVAL_STATE: undefined, // 결재상태
        EMP_NO: undefined, // 담당자
      },
      formData: {},
    };
  }

  /*
    handlerSearch = () => {
      this.setState({ isSearching: true });
      const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
      const { searchValue } = this.state;
      const apiInfo = {
        key: 'getWWCheckItems',
        type: 'POST',
        url: `/api/eshs/v1/common/wwCheckItem`,
        params: { PARAM: { ...searchValue, type: 'SEARCH' } },
      };
      getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
    };
*/

  onClickMenu = menuName => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { searchDate } = this.state;
    let apiInfo = {};
    switch (menuName) {
      case 'EXHAUST_ACT':
        apiInfo = {
          key: 'getExhaustActInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwAct`,
          params: { PARAM: { type: 'GET_EXHAUST_ACT_INFO', search_dt: searchDate } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getDataCallback);
        break;
      default:
        break;
    }
    this.setState({
      selectedMenu: menuName,
    });
  };

  getDataCallback = (id, response) => {
    const { RENDER_INFO } = response;
    this.setState({
      renderData: {
        ...RENDER_INFO,
      },
    });
  };

  onChangeMainFormData = (field, value) => {
    const { mainformData } = this.state;
    this.setState({
      mainformData: {
        ...mainformData,
        [field]: value,
      },
    });
  };

  render() {
    const { viewType, selectedMenu, searchDate, renderData, mainformData, formData } = this.state;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={false}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue="청주" className="select-sm" style={{ width: '70px' }} onChange={val => console.debug(val)} disabled>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
              <span className="text-label">구분</span>
              <AntdSelect defaultValue="매그너칩반도체" className="select-sm" style={{ width: '125px' }} onChange={val => console.debug(val)} disabled>
                <Option value="매그너칩반도체">매그너칩반도체</Option>
              </AntdSelect>
              <span className="text-label">일자</span>
              <AntdDatePicker
                className="ant-picker-sm mr5"
                format="YYYY-MM-DD"
                defaultValue={moment(searchDate, 'YYYY-MM-DD')}
                style={{ width: '120px' }}
                onChange={(date, str) => this.setState({ searchDate: str })}
              />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => console.debug('검색')}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm ml5" onClick={() => console.debug('SAVE', true)}>
            저장
          </StyledButton>
          <StyledButton className="btn-gray btn-sm ml5" onClick={() => console.debug('MPMP', true)}>
            결재선 지정
          </StyledButton>
        </StyledButtonWrapper>
        <div className="menu-table">
          <MenuTable viewType={viewType} formData={mainformData} onChangeFormData={this.onChangeMainFormData} onClickMenu={this.onClickMenu} />
        </div>
        <div className="selected-menu-table">
          {selectedMenu === 'EXHAUST_ACT' && <ExhaustActTable renderData={renderData} formData={formData} />}
          {selectedMenu === 'CLEAN_ACT' && <div>방지시설 가동시간</div>}
        </div>
        <AntdModal
          className="modal-table-pad"
          title="모달임시"
          width="65%"
          visible={false}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          <div>모달혹시나</div>
        </AntdModal>
      </Styled>
    );
  }
}

QualityPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

QualityPage.defaultProps = {};

export default QualityPage;

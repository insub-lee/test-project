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
      hasData: {},
      mainFormData: {
        GROUP_UNIT_CD: '017', // 회사(매그너칩 고정)
        OP_DT: undefined, // 일지날짜
        TEMPERATURE: undefined, // 온도
        WEATHER: undefined, // 날씨
        APPROVAL_STATE: undefined, // 결재상태
        EMP_NO: undefined, // 담당자
      },
      formData: undefined,
    };
  }

  // 검색버튼 액션 - 각 항목별 저장된 내용이 있는지 가져옴
  onClickSearch = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { searchDate } = this.state;
    const apiInfo = {
      key: 'getDiaryInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/wwDiary`,
      params: { PARAM: { type: 'GET_DIARY_INFO', search_dt: searchDate } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  // 검색버튼 콜백 - 선택된 메뉴가 있다면 그 항목의 FormData / RenderData를 읽어옴
  searchCallback = (id, response) => {
    const { selectedMenu, mainFormData, searchDate } = this.state;
    const { DIARY_INFO } = response;
    this.setState(
      {
        mainFormData: {
          ...mainFormData,
          OP_DT: searchDate,
        },
        hasData: {
          ...DIARY_INFO,
        },
      },
      () => this.onClickMenu(selectedMenu),
    );
  };

  // 저장, 수정, 삭제
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { mainFormData, formData } = this.state;
    let submitData = {};
    switch (type) {
      case 'SAVE_EXHAUST_ACT': // 배출시설 가동시간 저장/수정
        submitData = {
          PARAM: {
            type,
            GROUP_UNIT_CD: mainFormData.GROUP_UNIT_CD,
            OP_DT: mainFormData.OP_DT,
            LIST: formData,
          },
        };
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwAct', submitData, this.onClickSearch);
        break;
      case 'MODIFY':
        // submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwCheckItem', submitData, this.updateCallback);
        break;
      case 'DELETE':
        // submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwCheckItem', submitData, this.deleteCallback);
        break;
      default:
        break;
    }
  };

  onClickMenu = menuName => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { mainFormData } = this.state;
    let apiInfo = {};
    switch (menuName) {
      case 'EXHAUST_ACT':
        apiInfo = {
          key: 'getExhaustActInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwAct`,
          params: { PARAM: { type: 'GET_EXHAUST_ACT_INFO', search_dt: mainFormData.OP_DT } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getActDataCallback);
        break;
      case 'CLEAN_ACT':
        apiInfo = {
          key: 'getCleanActInfo',
          type: 'POST',
          url: `/api/eshs/v1/common/wwAct`,
          params: { PARAM: { type: 'GET_CLEAN_ACT_INFO', search_dt: mainFormData.OP_DT } },
        };
        getCallDataHandlerReturnRes(id, apiInfo, this.getActDataCallback);
        break;
      default:
        break;
    }
    this.setState({
      selectedMenu: menuName,
    });
  };

  // 가동시간 Callback;
  getActDataCallback = (id, response) => {
    const { TARGET, RENDER_INFO } = response;
    const { CODE_LIST, ACT_LIST } = RENDER_INFO;
    const targetCd = `${TARGET}_CD`;
    let initFormData = ACT_LIST;
    if (initFormData.length === 0) {
      initFormData = CODE_LIST.map(item => ({ [targetCd]: item[targetCd] }));
    }
    this.setState({
      renderData: {
        ...RENDER_INFO,
      },
      formData: initFormData,
    });
  };

  onChangeMainFormData = (field, value) => {
    const { mainFormData } = this.state;
    this.setState({
      mainFormData: {
        ...mainFormData,
        [field]: value,
      },
    });
  };

  actAllCheck = row => {
    const {
      OP_01,
      OP_02,
      OP_03,
      OP_04,
      OP_05,
      OP_06,
      OP_07,
      OP_08,
      OP_09,
      OP_10,
      OP_11,
      OP_12,
      OP_13,
      OP_14,
      OP_15,
      OP_16,
      OP_17,
      OP_18,
      OP_19,
      OP_20,
      OP_21,
      OP_22,
      OP_23,
      OP_24,
    } = row;
    return (
      OP_01 === 'Y' &&
      OP_02 === 'Y' &&
      OP_03 === 'Y' &&
      OP_04 === 'Y' &&
      OP_05 === 'Y' &&
      OP_06 === 'Y' &&
      OP_07 === 'Y' &&
      OP_08 === 'Y' &&
      OP_09 === 'Y' &&
      OP_10 === 'Y' &&
      OP_11 === 'Y' &&
      OP_12 === 'Y' &&
      OP_13 === 'Y' &&
      OP_14 === 'Y' &&
      OP_15 === 'Y' &&
      OP_16 === 'Y' &&
      OP_17 === 'Y' &&
      OP_18 === 'Y' &&
      OP_19 === 'Y' &&
      OP_20 === 'Y' &&
      OP_21 === 'Y' &&
      OP_22 === 'Y' &&
      OP_23 === 'Y' &&
      OP_24 === 'Y'
    );
  };

  // 가동시간 FormChange (단일변경)
  onChangeActFormData = (target, code, op, val) => {
    const { formData } = this.state;
    const value = val === true ? 'Y' : 'N';
    const targetForm = formData.find(item => item[target] === code);

    let nextTargetForm = {
      ...targetForm,
      [op]: value,
    };
    const allCheckYn = this.actAllCheck(nextTargetForm);
    if (allCheckYn) {
      nextTargetForm = {
        ...nextTargetForm,
        OP_ALL: 'Y',
      };
    } else {
      nextTargetForm = {
        ...nextTargetForm,
        OP_ALL: 'N',
      };
    }
    const nextFormData = formData.map(item => {
      if (item[target] === code) {
        return nextTargetForm;
      }
      return item;
    });
    this.setState({
      formData: nextFormData,
    });
  };

  // 가동시간 Row 전체 변경
  onChangeAllActFormData = (target, code, val) => {
    const { formData } = this.state;
    const value = val === true ? 'Y' : 'N';
    const nextFormData = formData.map(item => {
      if (item[target] === code) {
        return {
          ...item,
          OP_ALL: value,
          OP_01: value,
          OP_02: value,
          OP_03: value,
          OP_04: value,
          OP_05: value,
          OP_06: value,
          OP_07: value,
          OP_08: value,
          OP_09: value,
          OP_10: value,
          OP_11: value,
          OP_12: value,
          OP_13: value,
          OP_14: value,
          OP_15: value,
          OP_16: value,
          OP_17: value,
          OP_18: value,
          OP_19: value,
          OP_20: value,
          OP_21: value,
          OP_22: value,
          OP_23: value,
          OP_24: value,
        };
      }
      return item;
    });
    this.setState({
      formData: nextFormData,
    });
  };

  render() {
    const { viewType, selectedMenu, searchDate, hasData, renderData, mainFormData, formData } = this.state;
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
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.onClickSearch()}>
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
        {mainFormData.OP_DT && (
          <>
            <div className="menu-table">
              <MenuTable
                viewType={viewType}
                formData={mainFormData}
                onChangeFormData={this.onChangeMainFormData}
                onClickMenu={this.onClickMenu}
                hasData={hasData}
              />
            </div>
            <div className="selected-menu-table">
              {selectedMenu === 'EXHAUST_ACT' && (
                <ExhaustActTable
                  renderData={renderData}
                  formData={formData}
                  onChangeActFormData={this.onChangeActFormData}
                  onChangeAllActFormData={this.onChangeAllActFormData}
                  submitFormData={this.submitFormData}
                />
              )}
              {selectedMenu === 'CLEAN_ACT' && <div>방지시설 가동시간</div>}
            </div>
          </>
        )}
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

import React, { Component } from 'react';
import { List } from 'immutable';
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
import FormDataTable from '../infoTable/formDataTable';
import ListDataTable from '../infoTable/listDataTable';
import ExcelParser from '../excelParser';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
const { Option } = Select;

class FlowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      site: '청주', // 검색조건 지역
      date: moment().format('YYYYMMDD'), // 검색조건 기간
      modalTitle: '',
      modalVisible: false,
      isUpload: false, // 양식을 이용하여 폼데이터 생성이 된 경우에만 true;
      listData: List([]),
    };
  }

  // 검색
  handlerSearch = () => {
    this.setState({ isSearching: true });
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { site, date } = this.state;
    const apiInfo = {
      key: 'getWasteWaterFlow',
      type: 'GET',
      url: `/api/eshs/v1/common/wwflow?site=${site}&date=${date}`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list } = response;
    this.setState({
      isUpload: false,
      isSearching: false,
      listData: List(list) || List([]),
    });
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'EXCEL':
        title = '유량정보 업로드';
        this.setState({
          modalTitle: title,
          modalVisible: visible,
        });
        break;
      default:
        this.setState({
          isUpload: false,
          modalTitle: title,
          modalVisible: visible,
        });
        break;
    }
  };

  // 저장, 수정, 삭제
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { listData, date } = this.state;
    const submitData = {
      PARAM: {
        DAILY_DT: date,
        LIST: listData,
      },
    };
    switch (type) {
      case 'SAVE':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwflow', submitData, this.saveCallback);
        break;
      case 'DELETE':
        // submitHandlerBySaga(id, 'DELETE', '/api/gcs/v1/common/gas/diary', submitData);
        break;
      default:
        break;
    }
  };

  saveCallback = (id, response) => {
    const { result } = response;
    if (result < 0) {
      this.setState({
        isUpload: false,
        listData: List([]),
      });
      return message.error(<MessageContent>유량정보 등록에 실패하였습니다.</MessageContent>);
    }
    this.setState({
      isUpload: false,
    });
    return message.success(<MessageContent>유량정보를 등록하였습니다.</MessageContent>);
  };

  // 엑셀파일 등록시 - 추출된 데이터 가져오기 및 모달 닫기
  getUploadList = excelData => {
    const isUpload = excelData.length > 0;
    this.setState({
      modalTitle: '',
      modalVisible: false,
      isUpload,
      listData: List(excelData),
    });
  };

  // formData val Change (관리단위, 측정포인트, 필드명, 벨류)
  onChangeFormData = (unitNm, point, field, value) => {
    const { listData } = this.state;
    const targetIndex = listData.findIndex(data => data.GROUP_UNIT_NM === unitNm && data.MEASUREMENT_POINT === point);
    let flowAmount = 0; // 공식 : 금일지침(THE_DAY_INDEX) - 전일지침(THE_DAY_BEFORE_INDEX)
    switch (field) {
      case 'THE_DAY_INDEX':
        flowAmount = value - listData.getIn([targetIndex, 'THE_DAY_BEFORE_INDEX']);
        this.setState({
          listData: listData.setIn([targetIndex, field], value).setIn([targetIndex, 'FLOW_AMOUNT'], flowAmount),
        });
        break;
      case 'THE_DAY_BEFORE_INDEX':
        flowAmount = listData.getIn([targetIndex, 'THE_DAY_INDEX']) - value;
        this.setState({
          listData: listData.setIn([targetIndex, field], value).setIn([targetIndex, 'FLOW_AMOUNT'], flowAmount),
        });
        break;
      default:
        this.setState({
          listData: listData.setIn([targetIndex, field], value),
        });
        break;
    }
  };

  render() {
    const { site, date, modalTitle, modalVisible, formData, listData, isSearching, isUpload } = this.state;
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
              <span className="text-label">측정일자</span>
              <AntdDatePicker
                className="ant-picker-sm"
                style={{ marginRight: '10px' }}
                defaultValue={moment(date, 'YYYYMMDD')}
                onChange={val => this.setState({ date: val.format('YYYYMMDD') })}
              />
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handlerSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          {isUpload && (
            <StyledButton className="btn-primary btn-sm ml5" onClick={() => this.submitFormData('SAVE')}>
              저장
            </StyledButton>
          )}
          <StyledButton className="btn-gray btn-sm ml5" onClick={() => this.handleModal('EXCEL', true)}>
            Excel 업로드
          </StyledButton>
        </StyledButtonWrapper>
        {isUpload && <FormDataTable formData={listData} onChangeFormData={this.onChangeFormData} />}
        {!isUpload && <ListDataTable listData={listData} />}
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="80%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          <ExcelParser getUploadList={this.getUploadList} />
        </AntdModal>
      </>
    );
  }
}
FlowPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

FlowPage.defaultProps = {};

export default FlowPage;

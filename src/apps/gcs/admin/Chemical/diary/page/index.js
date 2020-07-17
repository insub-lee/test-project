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
import DiaryListTable from '../infoTable/diaryListTable';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);
const { Option } = Select;

class ChemicalStatusPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAfter: false,
      isSearching: false,
      site: '청주', // 검색조건
      sTimeStamp: moment()
        .subtract(1, 'days')
        .format('YYYYMMDD,09:00'),
      eTimeStamp: moment().format('YYYYMMDD,09:00'), // 검색조건
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      selectedSite: '',
      formData: {},
      listData: [],
    };
  }

  // 검색
  handlerSearch = () => {
    this.setState({ isSearching: true });
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { site, sTimeStamp, eTimeStamp } = this.state;
    const sTimeStampArr = sTimeStamp.split(',');
    const eTimeStampArr = eTimeStamp.split(',');
    const apiInfo = {
      key: 'chemiacalStatusList',
      type: 'GET',
      url: `/api/gcs/v1/common/chemiacal/diary?type=range&site=${site}&sDate=${sTimeStampArr[0]}&sTime=${sTimeStampArr[1]}&eDate=${eTimeStampArr[0]}&eTime=${eTimeStampArr[1]}`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { site } = this.state;
    const { list } = response;
    this.setState({
      selectedSite: site,
      searchAfter: true,
      isSearching: false,
      listData: list || [],
    });
  };

  // 모달 핸들러
  handleModal = (type, visible, etc) => {
    let title = '';
    let etcData = {};
    switch (type) {
      case 'NEW':
        title = '신규 등록';
        etcData = {};
        break;
      case 'EXCEL':
        title = '청주 통합 일일업무 업로드';
        break;
      case 'MODIFY':
        title = '항목 수정';
        etcData = etc;
        break;
      default:
        break;
    }
    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
      formData: etcData,
    });
  };

  // valid check
  validCheck = formData => {
    const { GONGNO, PRODNM, GONGAREA, GONGINFO, FAB_KEYNO } = formData;
    if (GONGNO === '') {
      message.error(<MessageContent>장치번호는 필수 입력값입니다.</MessageContent>);
      return false;
    }
    if (PRODNM === '') {
      message.error(<MessageContent>장치명은 필수 입력값입니다.</MessageContent>);
      return false;
    }
    if (GONGAREA === '') {
      message.error(<MessageContent>위치는 필수 입력값입니다.</MessageContent>);
      return false;
    }
    if (GONGINFO === '') {
      message.error(<MessageContent>기타정보는 필수 입력값입니다.</MessageContent>);
      return false;
    }
    if (FAB_KEYNO === '') {
      message.error(<MessageContent>KEY-NO는 필수 입력값입니다.</MessageContent>);
      return false;
    }
    return true;
  };

  // 저장, 수정, 삭제
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData, selectedSite } = this.state;
    const submitData = {
      PARAM: {
        ...formData,
        SITE: selectedSite,
      },
    };
    const isValid = this.validCheck(formData);
    switch (type) {
      case 'NEW':
        if (!isValid) return;
        submitHandlerBySaga(id, 'POST', '/api/gcs/v1/common/chemiacal/diary', submitData, this.submitFormDataCallback);
        break;
      case 'MODIFY':
        if (!isValid) return;
        submitHandlerBySaga(id, 'PUT', '/api/gcs/v1/common/chemiacal/diary', submitData, this.submitFormDataCallback);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/gcs/v1/common/chemiacal/diary', submitData, this.submitFormDataCallback);
        break;
      default:
        break;
    }
  };

  submitFormDataCallback = (id, response) => {
    const { listData } = this.state;
    const { result, param, type } = response;
    if (result === 'fail') {
      switch (type) {
        case 'insert':
          return message.error(<MessageContent>사용정보 저장을 실패하였습니다.</MessageContent>);
        case 'update':
          return message.error(<MessageContent>사용정보 수정을 실패하였습니다.</MessageContent>);
        default:
          return message.error(<MessageContent>사용정보 삭제에 실패하였습니다.</MessageContent>);
      }
    }
    let nextListData = listData;
    switch (type) {
      case 'insert':
        this.handlerSearch();
        return message.success(<MessageContent>사용정보를 저장하였습니다.</MessageContent>);
      case 'update':
        nextListData = listData.map(item => {
          const { GONGNO, PRODNM, GONGAREA, GONGINFO, FAB_KEYNO } = param;
          const { GONGNO: gongno, PRODNM: prodnm, GONGAREA: gongarea, GONGINFO: gongInfo, FAB_KEYNO: fabKeyno } = item;
          if (GONGNO === gongno && PRODNM === prodnm && GONGAREA === gongarea && GONGINFO === gongInfo && FAB_KEYNO === fabKeyno) {
            return { ...param };
          }
          return item;
        });
        this.setState({
          modalType: '',
          modalTitle: '',
          modalVisible: false,
          listData: nextListData,
        });
        return message.success(<MessageContent>사용정보를 수정하였습니다.</MessageContent>);
      default:
        nextListData = listData.filter(item => {
          const { GONGNO, PRODNM, GONGAREA, GONGINFO, FAB_KEYNO } = param;
          const { GONGNO: gongno, PRODNM: prodnm, GONGAREA: gongarea, GONGINFO: gongInfo, FAB_KEYNO: fabKeyno } = item;
          if (GONGNO === gongno && PRODNM === prodnm && GONGAREA === gongarea && GONGINFO === gongInfo && FAB_KEYNO === fabKeyno) {
            return false;
          }
          return true;
        });
        this.setState({
          modalType: '',
          modalTitle: '',
          modalVisible: false,
          listData: nextListData,
        });
        return message.success(<MessageContent>사용정보를 삭제하였습니다.</MessageContent>);
    }
  };

  // formData val Change
  onChangeFormData = (field, val) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [field]: val,
      },
    });
  };

  onChangeSearchRange = value => {
    this.setState({
      sTimeStamp: value[0].format('YYYYMMDD,hh:mm'),
      eTimeStamp: value[1].format('YYYYMMDD,hh:mm'),
    });
  };

  render() {
    const { site, modalType, modalTitle, modalVisible, formData, listData, isSearching, searchAfter, sTimeStamp, eTimeStamp } = this.state;
    console.debug('일지관리', this.state);
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
              <span className="text-label">기간</span>
              <AntdRangePicker
                className="ant-picker-sm"
                showTime
                format="YYYY-MM-DD HH:mm"
                style={{ marginRight: '10px' }}
                defaultValue={[moment(sTimeStamp, 'YYYYMMDD,hh:mm'), moment(eTimeStamp, 'YYYYMMDD,hh:mm')]}
                onChange={value => this.onChangeSearchRange(value)}
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
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleModal('EXCEL', true)}>
                Excel 다운로드
              </StyledButton>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleModal('EXCEL', true)}>
                Excel 업로드
              </StyledButton>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleModal('NEW', true)}>
                새등록
              </StyledButton>
            </>
          )}
        </StyledButtonWrapper>
        <DiaryListTable listData={listData} handleModal={this.handleModal} />
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
          {(modalType === 'NEW' || modalType === 'MODIFY') && <div>1 row upsert</div>}
          {modalType === 'EXCEL' && <div>엑셀</div>}
        </AntdModal>
      </>
    );
  }
}
ChemicalStatusPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

ChemicalStatusPage.defaultProps = {};

export default ChemicalStatusPage;

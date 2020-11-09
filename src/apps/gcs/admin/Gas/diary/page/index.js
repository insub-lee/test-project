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
import request from 'utils/request';
import DiaryListTable from '../infoTable/diaryListTable';
import FormDataTable from '../infoTable/formDataTable';
import ExcelDown from '../excelDown';
import ExcelPaser from '../excelParser';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);
const { Option } = Select;

class ChemicalStatusPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
      searchAfter: false,
      isSearching: false,
      site: '구미', // 검색조건
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
      url: `/api/gcs/v1/common/gas/diary?type=range&site=${site}&sDate=${sTimeStampArr[0]}&sTime=${sTimeStampArr[1]}&eDate=${eTimeStampArr[0]}&eTime=${eTimeStampArr[1]}`,
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
        title = '통합 일일업무 업로드';
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
    switch (type) {
      case 'SAVE':
        this.saveData();
        break;
      case 'MODIFY':
        submitHandlerBySaga(id, 'PUT', '/api/gcs/v1/common/gas/diary', submitData);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/gcs/v1/common/gas/diary', submitData);
        break;
      default:
        break;
    }
  };

  // 업로드한 엑셀 데이터 가져오기
  getUploadList = list => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        list,
      },
    });
  };

  // 일지저장(엑셀)
  saveData() {
    const { formData, selectedSite } = this.state;
    const { list } = formData;
    this.setState({
      isSaving: true,
    });
    if (list?.length > 0) {
      const failedList = [];
      list.forEach((row, rowIndex) => {
        const payload = {
          PARAM: {
            ...row,
            SITE: selectedSite,
          },
        };
        const result = this.sendSingleData(payload);
        if (!result) {
          failedList.push(row);
        }
        if (rowIndex === list.length - 1) {
          if (failedList.length > 0) {
            message.error(<MessageContent>{`${failedList.length}건의 입력을 실패했습니다.`}</MessageContent>);
          } else {
            message.success(<MessageContent>{`${list.length}건의 일지를 등록했습니다.`}</MessageContent>);
          }
        }
      });
      this.setState({
        modalType: '',
        modalTitle: '',
        isSaving: false,
        modalVisible: false,
      });
    } else {
      this.setState({
        isSaving: false,
      });
      message.error(<MessageContent>입력할 정보가 없습니다.</MessageContent>);
    }
  }

  // 일지 저장(1)
  async sendSingleData(payload) {
    const { error } = await this.saveDiaryInfo(payload);
    if (error && error !== '') {
      return false;
    }
    return true;
  }

  // 일지 저장(2)
  saveDiaryInfo = async payload => {
    const result = await request({
      method: 'POST',
      url: `/api/gcs/v1/common/gas/diary`,
      data: payload,
    });
    return result;
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
    const { site, modalType, modalTitle, modalVisible, formData, listData, isSearching, isSaving, searchAfter, sTimeStamp, eTimeStamp } = this.state;
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
              {listData.length > 0 && <ExcelDown listData={listData} />}
              <StyledButton className="btn-primary btn-sm ml5" onClick={() => this.handleModal('EXCEL', true)}>
                Excel 업로드
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
          {(modalType === 'NEW' || modalType === 'MODIFY') && (
            <FormDataTable formData={formData} onChangeFormData={this.onChangeFormData} submitFormData={this.submitFormData} />
          )}
          {modalType === 'EXCEL' && (
            <Spin tip="저장중..." spinning={isSaving}>
              <ExcelPaser getUploadList={this.getUploadList} onSave={this.submitFormData} isSaving={isSaving} />
            </Spin>
          )}
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

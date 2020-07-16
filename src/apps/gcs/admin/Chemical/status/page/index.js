import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select, Spin } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StatusListTable from '../infoTable/statusListTable';
import FormDataTable from '../infoTable/formDataTable';
import ExcelDownload from '../excel';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class ChemicalStatusPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAfter: false,
      isSearching: false,
      site: '청주', // 검색조건
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      selectedSite: '',
      formData: {
        GONGNO: '',
        PRODNM: '',
        GONGAREA: '',
        GONGINFO: '',
        FAB_KEYNO: '',
        FAB_AREA: '',
        FAB_PROC: '',
        POINT_CNT: 0,
        GONGDT: '',
      },
      listData: [],
    };
  }

  // 검색
  handlerSearch = () => {
    this.setState({ isSearching: true });
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { site } = this.state;
    const apiInfo = {
      key: 'chemiacalStatusList',
      type: 'GET',
      url: `/api/gcs/v1/common/chemiacal/status?site=${site}`,
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
        title = '사용정보 입력';
        etcData = {
          GONGNO: '',
          PRODNM: '',
          GONGAREA: '',
          GONGINFO: '',
          FAB_KEYNO: '',
          FAB_AREA: '',
          FAB_PROC: '',
          POINT_CNT: 0,
          GONGDT: '',
        };
        break;
      case 'MODIFY':
        title = '사용정보 수정';
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
        submitHandlerBySaga(id, 'POST', '/api/gcs/v1/common/chemiacal/status', submitData, this.submitFormDataCallback);
        break;
      case 'MODIFY':
        if (!isValid) return;
        submitHandlerBySaga(id, 'PUT', '/api/gcs/v1/common/chemiacal/status', submitData, this.submitFormDataCallback);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'DELETE', '/api/gcs/v1/common/chemiacal/status', submitData, this.submitFormDataCallback);
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

  render() {
    const { site, modalType, modalTitle, modalVisible, formData, listData, isSearching, searchAfter, selectedSite } = this.state;
    return (
      <>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect
                defaultValue={site}
                className="select-sm"
                style={{ width: '100px', marginRight: '10px' }}
                onChange={val => this.setState({ site: val })}
              >
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
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
              <ExcelDownload listData={listData} site={selectedSite} />
              <StyledButton className="btn-primary btn-sm btn-first ml5" onClick={() => this.handleModal('NEW', true)}>
                새등록
              </StyledButton>
            </>
          )}
        </StyledButtonWrapper>
        <StatusListTable listData={listData} handleModal={this.handleModal} />
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
          <FormDataTable
            formData={formData}
            type={modalType}
            onChangeFormData={this.onChangeFormData}
            site={selectedSite}
            submitFormData={this.submitFormData}
          />
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

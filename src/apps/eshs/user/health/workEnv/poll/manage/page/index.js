import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, Spin } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Styled from './Styled';
import PollListTable from '../infoTable/pollListTable';
import PollAnswerListTable from '../infoTable/pollAnswerListTable';
import PollAdd from '../infoTable/pollAdd';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class FlowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      poYear: '전체', // 설문연도
      poType: '전체', // 설문구분
      modalType: '',
      modalTitle: '',
      modalVisible: '',
      modalData: undefined,
      modalListData: [], // 모달용 리스트
      listData: [], // 검색된 설문 리스트
    };
  }

  // 페이지 로딩 시점 :: 기본 전체리스트 조회하여 그려줌
  componentDidMount() {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getPollList',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMgt`,
      params: { PARAM: { type: 'GET_POLL_LIST' } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  }

  // 설문조사 검색
  handlerSearch = () => {
    this.setState({ isSearching: true });
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { poType, poYear } = this.state;
    const apiInfo = {
      key: 'getPollList',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMgt`,
      params: { PARAM: { type: 'GET_POLL_LIST', poType, poYear } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.searchCallback);
  };

  searchCallback = (id, response) => {
    const { list } = response;
    this.setState({
      isSearching: false,
      listData: list || [],
    });
  };

  getAnswerUserList = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { modalData } = this.state;
    const { SDATE, EDATE } = modalData;
    const now = moment();
    const sDate = SDATE && moment(SDATE, 'YYYY-MM-DD');
    const eDate = (EDATE && moment(EDATE, 'YYYY-MM-DD')) || undefined;
    const statusBool = now >= sDate && (eDate ? now <= eDate : true);
    const status = statusBool ? 'Y' : 'N';
    const apiInfo = {
      key: 'getPollAnswerList',
      type: 'POST',
      url: `/api/eshs/v1/common/healthPollMgt`,
      params: { PARAM: { type: 'GET_POLL_ASNWER_LIST', ...modalData, STATUS: status } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.getAnswerUserListCallback);
  };

  getAnswerUserListCallback = (id, response) => {
    const { info } = response;
    this.setState({
      modalListData: info || [],
    });
  };

  // 모달 핸들러
  handleModal = (type, visible, data) => {
    let title = '';
    switch (type) {
      case 'ADD':
        title = '설문조사 추가';
        this.setState({
          modalType: type,
          modalTitle: title,
          modalVisible: visible,
          modalData: data || undefined,
        });
        break;
      case 'UPDATE':
        title = '설문조사 수정';
        this.setState({
          modalType: type,
          modalTitle: title,
          modalVisible: visible,
          modalData: data || undefined,
        });
        break;
      case 'DETAIL':
        title = '응답 현황';
        this.setState({
          modalType: type,
          modalTitle: title,
          modalVisible: visible,
          modalData: data || undefined,
        });
        break;
      default:
        this.setState({
          modalType: type || '',
          modalTitle: title || '',
          modalVisible: visible || false,
          modalData: undefined,
        });
        break;
    }
  };

  // 설문을 추가할때, 이미 진행중인 설문이 있을 경우 등록이 불가하도록 차단
  beforeAddPoll = param => {
    const { POTYPE, SDATE, EDATE } = param;
    const { listData } = this.state;
    let result = true;
    listData
      .filter(item => item.POTYPE === POTYPE)
      .forEach(item => {
        const { SDATE: itemSdate, EDATE: itemEdate } = item;
        const checkerSdate = SDATE >= itemSdate && SDATE <= itemEdate; // 설문시작일이 등록된 설문의 시작, 종료일 사이에 존재하는 경우
        const checkerEdate = EDATE >= itemSdate && EDATE <= itemEdate; // 설문종료일이 등록된 설문의 시작, 종료일 사이에 존재하는 경우
        if (checkerSdate || checkerEdate) {
          result = false;
        }
      });
    return result;
  };

  // 저장, 수정, 삭제
  submitFormData = (type, param) => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const submitData = {
      PARAM: {
        type,
        ...param,
      },
    };
    switch (type) {
      case 'ADD':
        if (!this.beforeAddPoll(param)) return message.error(<MessageContent>해당 날짜에 등록된 동일 설문이 이미 존재합니다.</MessageContent>);
        return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/healthPollMgt', submitData, this.submitFormDataCallback);
      case 'UPDATE':
        return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/healthPollMgt', submitData, this.submitFormDataCallback);
      case 'DELETE':
        return submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/healthPollMgt', submitData, this.submitFormDataCallback);
      default:
        return null;
    }
  };

  submitFormDataCallback = (id, response) => {
    const { type, result } = response;
    switch (type) {
      case 'ADD':
        if (result === 1) {
          this.handleModal('', false);
          this.handlerSearch();
          return message.success(<MessageContent>설문을 추가하였습니다.</MessageContent>);
        }
        return message.error(<MessageContent>설문 추가에 실패하였습니다.</MessageContent>);
      case 'UPDATE':
        if (result === 1) {
          this.handleModal('', false);
          this.handlerSearch();
          return message.success(<MessageContent>설문을 수정하였습니다.</MessageContent>);
        }
        return message.error(<MessageContent>설문 수정에 실패하였습니다.</MessageContent>);
      case 'DELETE':
        if (result === 1) {
          this.handleModal('', false);
          this.handlerSearch();
          return message.success(<MessageContent>설문정보를 삭제하였습니다.</MessageContent>);
        }
        return message.error(<MessageContent>설문정보 삭제에 실패하였습니다.</MessageContent>);
      default:
        return null;
    }
  };

  // 연도 셀렉트
  renderYearSelect = () => {
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2007; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <AntdSelect className="select-sm" style={{ width: '100px' }} defaultValue="전체" onChange={e => this.setState({ poYear: e })}>
        <Option value="전체">전체</Option>
        {options.map(YYYY => (
          <Option value={`${YYYY}`}>{YYYY}</Option>
        ))}
      </AntdSelect>
    );
  };

  render() {
    const { poType, isSearching, modalType, modalTitle, modalVisible, modalData, modalListData, listData } = this.state;
    const { getCallDataHandlerReturnRes, sagaKey } = this.props;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">연도</span>
              {this.renderYearSelect()}
              <span className="text-label">설문구분</span>
              <AntdSelect defaultValue={poType} className="select-sm" style={{ width: '100px' }} onChange={val => this.setState({ poType: val })}>
                <Option value="전체">전체</Option>
                <Option value="근골격계질환">근골격계질환</Option>
                <Option value="직무 스트레스">직무 스트레스</Option>
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm btn-first ml5" onClick={() => this.handlerSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-gray btn-sm ml5" onClick={() => this.handleModal('ADD', true)}>
            설문추가
          </StyledButton>
        </StyledButtonWrapper>
        <div>
          <PollListTable listData={listData} handleModal={this.handleModal} />
        </div>
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="60%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'DETAIL' && (
            <PollAnswerListTable
              modalData={modalData}
              listData={modalListData}
              getInit={this.getAnswerUserList}
              sagaKey={sagaKey}
              getCallDataHandlerReturnRes={getCallDataHandlerReturnRes}
            />
          )}
          {(modalType === 'ADD' || modalType === 'UPDATE') && <PollAdd type={modalType} submitFormData={this.submitFormData} modalData={modalData} />}
        </AntdModal>
      </Styled>
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

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
import PollListTable from '../infoTable/pollListTable';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
const { Option } = Select;

class FlowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      poYear: moment().format('YYYY'), // 설문연도
      poType: '전체', // 설문구분
      modalType: '',
      modalTitle: '',
      modalVisible: '',
      listData: [], // 검색된 설문 리스트
    };
  }

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
      url: `/api/eshs/v1/common/poll`,
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

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'ADD':
        title = '설문조사 추가';
        this.setState({
          modalType: type,
          modalTitle: title,
          modalVisible: visible,
        });
        break;
      default:
        this.setState({
          modalType: type || '',
          modalTitle: title || '',
          modalVisible: visible || false,
        });
        break;
    }
  };

  // 저장, 수정, 삭제
  submitFormData = type => {
    // const { sagaKey: id, submitHandlerBySaga } = this.props;
    // const { listData, date, waterFlowData } = this.state;
    // this.setState({ isSave: true });
    // const submitData = {
    //   PARAM: {
    //     GROUP_UNIT_CD: '017',
    //     DAILY_DT: date,
    //     LIST: listData,
    //     FLOW: waterFlowData,
    //   },
    // };
    // switch (type) {
    //   case 'SAVE':
    //     submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwflow', submitData, this.saveCallback);
    //     break;
    //   case 'DELETE':
    //     // submitHandlerBySaga(id, 'DELETE', '/api/gcs/v1/common/gas/diary', submitData);
    //     break;
    //   default:
    //     break;
    // }
  };

  saveCallback = (id, response) => {
    // const { result } = response;
    // if (result < 0) {
    //   this.setState({
    //     isSave: false,
    //     isUpload: false,
    //     listData: List([]),
    //   });
    //   return message.error(<MessageContent>유량정보 등록에 실패하였습니다.</MessageContent>);
    // }
    // this.setState({
    //   isSave: false,
    //   isUpload: false,
    // });
    // return message.success(<MessageContent>유량정보를 등록하였습니다.</MessageContent>);
  };

  // 연도 셀렉트
  renderYearSelect = () => {
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2007; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <AntdSelect className="select-sm" style={{ width: '100px' }} value={this.state.poYear} onChange={e => this.setState({ poYear: e })}>
        {options.map(YYYY => (
          <Option value={`${YYYY}`}>{YYYY}</Option>
        ))}
      </AntdSelect>
    );
  };

  render() {
    const { poType, isSearching, modalType, modalTitle, modalVisible, listData } = this.state;
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
          <PollListTable listData={listData} />
        </div>
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
          <div>모달내 콘텐츠</div>
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

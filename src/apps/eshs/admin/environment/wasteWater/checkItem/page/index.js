import React, { Component } from 'react';
import { List } from 'immutable';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, Spin, DatePicker, Input, Checkbox } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import ListDataTable from '../infoTable/listDataTable';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdInput = StyledInput(Input);

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

class FlowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchValue: {
        site: '청주',
        keyword: '',
        isUseWater: '0', // 용수
        isWasteWater: '0', // 폐수
        isDaily: '0',
        isDel: '',
      },
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
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwflow', submitData);
        break;
      case 'DELETE':
        // submitHandlerBySaga(id, 'DELETE', '/api/gcs/v1/common/gas/diary', submitData);
        break;
      default:
        break;
    }
  };

  onChangeSearchValue = (field, value) => {
    const { searchValue } = this.state;
    this.setState({
      searchValue: {
        ...searchValue,
        [field]: value,
      },
    });
  };

  render() {
    const { searchValue, date, modalTitle, modalVisible, formData, listData, isSearching, isUpload } = this.state;
    const { site, keyword, isUseWater, isWasteWater, isDaily, isDel } = searchValue;

    return (
      <>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue={site} className="select-sm" style={{ width: '100px' }} onChange={val => this.setState({ site: val })}>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
                <Option value="서울">서울</Option>
              </AntdSelect>
              <span className="text-label">측정항목명</span>
              <AntdInput className="ant-input-sm ant-input-inline" style={{ width: '200px' }} defaultValue={keyword} />
              <span className="text-label">사용여부</span>
              <AntdSelect defaultValue={isDel} className="select-sm" style={{ width: '100px' }} onChange={val => this.setState({ site: val })}>
                <Option value="">전체</Option>
                <Option value="0">사용</Option>
                <Option value="1">미사용</Option>
              </AntdSelect>
              <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                <Checkbox value="1" checked={isUseWater === '1'}>
                  용수
                </Checkbox>
                <Checkbox value="1" checked={isWasteWater === '1'}>
                  폐수
                </Checkbox>
                <Checkbox value="1" checked={isDaily === '1'}>
                  Daily
                </Checkbox>
              </div>
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handlerSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm ml5" onClick={() => console.debug('모달띄워야함')}>
            신규등록
          </StyledButton>
        </StyledButtonWrapper>
        <ListDataTable listData={listData} />
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
          <div>테스트 모달</div>
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

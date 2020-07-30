import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { Modal, Select, Spin, Input, Checkbox } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import ListDataTable from '../infoTable/listDataTable';
import FormDataTable from '../infoTable/formDataTable';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const { Option } = Select;

class FlowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchValue: {
        SITE: '청주',
        KEYWORD: '',
        IS_USE_WATER: '0',
        IS_WASTE_WATER: '0',
        IS_DAILY: '0',
        IS_USE: '',
      },
      modalTitle: '',
      modalVisible: false,
      listData: List([]),
      selectedIndex: -1,
      formData: {},
    };
  }

  // 검색
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

  searchCallback = (id, response) => {
    const { list } = response;
    this.setState({
      isSearching: false,
      listData: (list && List(list)) || List([]),
    });
  };

  // 검색조건 수정
  onChangeSearchValue = (field, value) => {
    const { searchValue } = this.state;
    this.setState({
      searchValue: {
        ...searchValue,
        [field]: value,
      },
    });
  };

  // 검색조건 수정 (체크박스)
  onChangeSearchCheckbox = (field, bool) => {
    const { onChangeSearchValue } = this;
    if (bool) {
      onChangeSearchValue(field, '1');
    } else {
      onChangeSearchValue(field, '0');
    }
  };

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'NEW':
        title = '수질측정항목 등록';
        this.setState({
          modalTitle: title,
          modalVisible: visible,
        });
        break;
      default:
        this.setState({
          modalTitle: title,
          modalVisible: visible,
          formData: {},
        });
        break;
    }
  };

  // 저장, 수정, 삭제
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { formData } = this.state;
    const submitData = {
      PARAM: {
        ...formData,
        type,
      },
    };
    switch (type) {
      case 'NEW':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwCheckItem', submitData, this.saveCallback);
        break;
      case 'MODIFY':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwCheckItem', submitData, this.updateCallback);
        break;
      case 'DELETE':
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/wwCheckItem', submitData, this.deleteCallback);
        break;
      default:
        break;
    }
  };

  // 신규 등록 콜백
  saveCallback = (id, response) => {
    const { result } = response;
    if (result === -1) return message.error(<MessageContent>수질측정항목 등록에 실패하였습니다.</MessageContent>);
    this.setState({
      modalTitle: '',
      modalVisible: false,
      formData: {},
    });
    return message.success(<MessageContent>수질측정항목을 등록하였습니다.</MessageContent>);
  };

  // 수정 저장 콜백
  updateCallback = (id, response) => {
    const { listData } = this.state;
    const { result, param } = response;
    if (result === -1) return message.error(<MessageContent>수질측정항목 수정에 실패하였습니다.</MessageContent>);
    const nextListData = listData.toJS().map(item => {
      if (item.ITEM_CD === param.ITEM_CD) {
        return {
          ...param,
          CHECK_VALUE_LIST: param.CHECK_VALUE_LIST.join(', '),
        };
      }
      return item;
    });
    this.setState({
      modalTitle: '',
      modalVisible: false,
      formData: {},
      listData: List(nextListData),
    });
    return message.success(<MessageContent>수질측정항목을 수정하였습니다.</MessageContent>);
  };

  // 삭제 콜백
  deleteCallback = (id, response) => {
    const { listData } = this.state;
    const { result, param } = response;
    if (result === -1) return message.error(<MessageContent>수질측정항목 삭제에 실패하였습니다.</MessageContent>);
    const nextListData = listData.toJS().filter(item => item.ITEM_CD !== param.ITEM_CD);
    this.setState({
      modalTitle: '',
      modalVisible: false,
      formData: {},
      listData: List(nextListData),
    });
    return message.success(<MessageContent>수질측정항목을 삭제하였습니다.</MessageContent>);
  };

  // 폼데이터 수정
  onChangeFormData = (field, value) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [field]: value,
      },
    });
  };

  // 전체 폼데이터 수정 (등록창에서 특정 아이템 선택시)
  onChangeAllFormData = record => {
    this.setState({
      formData: {
        ...record,
        CHECK_VALUE_LIST: record.CHECK_VALUE_LIST.split(', ') || [],
      },
    });
  };

  // 리스트의 로우 클릭 (수정모드)
  onClickListRow = (index, record) => {
    this.setState({
      modalTitle: '수질측정항목 등록',
      modalVisible: true,
      formData: {
        ...record,
        CHECK_VALUE_LIST: record.CHECK_VALUE_LIST.split(', ') || [],
      },
    });
  };

  render() {
    const { searchValue, modalTitle, modalVisible, formData, listData, isSearching } = this.state;
    const { SITE, KEYWORD, IS_USE_WATER, IS_WASTE_WATER, IS_DAILY, IS_USE } = searchValue;
    return (
      <>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue={SITE} className="select-sm" style={{ width: '100px' }} onChange={val => this.onChangeSearchValue('SITE', val)}>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
              <span className="text-label">측정항목명</span>
              <AntdInput
                className="ant-input-sm ant-input-inline"
                style={{ width: '200px' }}
                defaultValue={KEYWORD}
                onChange={e => this.onChangeSearchValue('KEYWORD', e.target.value)}
              />
              <span className="text-label">사용여부</span>
              <AntdSelect defaultValue={IS_USE} className="select-sm" style={{ width: '100px' }} onChange={val => this.onChangeSearchValue('IS_USE', val)}>
                <Option value="">전체</Option>
                <Option value="0">사용</Option>
                <Option value="1">미사용</Option>
              </AntdSelect>
              <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                <Checkbox value="1" checked={IS_USE_WATER === '1'} onChange={e => this.onChangeSearchCheckbox('IS_USE_WATER', e.target.checked)}>
                  용수
                </Checkbox>
                <Checkbox value="1" checked={IS_WASTE_WATER === '1'} onChange={e => this.onChangeSearchCheckbox('IS_WASTE_WATER', e.target.checked)}>
                  폐수
                </Checkbox>
                <Checkbox value="1" checked={IS_DAILY === '1'} onChange={e => this.onChangeSearchCheckbox('IS_DAILY', e.target.checked)}>
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
          <StyledButton className="btn-primary btn-sm ml5" onClick={() => this.handleModal('NEW', true)}>
            신규등록
          </StyledButton>
        </StyledButtonWrapper>
        <ListDataTable listData={listData} onClickListRow={this.onClickListRow} />
        <AntdModal
          className="modal-table-pad"
          title={modalTitle}
          width="55%"
          visible={modalVisible}
          footer={null}
          destroyOnClose
          maskClosable={false}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          <FormDataTable
            formData={formData}
            onChangeAllFormData={this.onChangeAllFormData}
            onChangeFormData={this.onChangeFormData}
            submitFormData={this.submitFormData}
          />
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

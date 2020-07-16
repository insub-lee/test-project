import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Select, DatePicker, Spin } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import UseInfoListTable from '../infoTable/useInfoListTable';
import FabListComp from '../../fab';
import MonthModifyPage from '../customPages/modifyPage';
import MonthInputPage from '../customPages/inputPage';
import DayModifyPage from '../customPages/dayModifyPage';
import MonthExcel from '../excel/monthExcel';

const { Option } = Select;
const { MonthPicker } = DatePicker;
const AntdMonthPicker = StyledDatePicker(MonthPicker);
const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);

class ChemicalManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      modalData: {},
      site: '청주',
      viewInfo: 'month',
      searchMonth: moment().format('YYYYMM'),
      listData: [], // 검색된 사용정보
    };
  }

  componentDidMount() {}

  // 검색
  handlerSearch = () => {
    this.setState({ isSearching: true });
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const { site, searchMonth } = this.state;
    const apiInfo = {
      key: 'chemiacalManageList',
      type: 'GET',
      url: `/api/gcs/v1/common/chemiacal/manage?type=month&site=${site}&month=${searchMonth}`,
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
  handleModal = (type, visible, etc) => {
    let title = '';
    let etcData = {};
    switch (type) {
      case 'MONTH_INPUT':
        title = '사용정보 입력';
        break;
      case 'MONTH_VIEW':
        title = '사용정보 수정';
        etcData = etc;
        break;
      case 'FAB_LIST':
        title = 'Fab 리스트';
        etcData = etc;
        break;
      case 'DAY_VIEW':
        title = '사용정보 수정 (일간 데이터)';
        etcData = etc;
        break;
      default:
        break;
    }

    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
      modalData: etcData,
    });
  };

  // 수정완료후, 리스트 재 호출
  changeTaskCallback = () => {
    this.setState(
      {
        modalType: '',
        modalTitle: '',
        modalVisible: false,
        modalData: {},
      },
      () => this.handlerSearch(),
    );
  };

  render() {
    const { modalType, modalTitle, modalVisible, modalData, searchMonth, site, viewInfo, listData, isSearching } = this.state;
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
              <span className="text-label">사용 월</span>
              <AntdMonthPicker
                className="ant-picker-sm"
                defaultValue={moment(searchMonth, 'YYYYMM')}
                format="YYYY.MM"
                onChange={date => this.setState({ searchMonth: moment(date).format('YYYYMM') })}
              />
              <span className="text-label">구분</span>
              <AntdSelect
                defaultValue={viewInfo}
                className="select-sm"
                style={{ width: '200px', marginRight: '10px' }}
                onChange={val => this.setState({ viewInfo: val })}
              >
                <Option value="month">사용정보</Option>
                <Option value="day">일간 데이터</Option>
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handlerSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <MonthExcel dataList={listData} />
          {viewInfo === 'month' && (
            <StyledButton className="btn-primary btn-sm btn-first ml5" onClick={() => this.handleModal('MONTH_INPUT', true)}>
              새등록
            </StyledButton>
          )}
        </StyledButtonWrapper>
        <ContentsWrapper>
          <UseInfoListTable listData={listData} handleModal={this.handleModal} viewType={viewInfo} />
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'FAB_LIST' ? '40%' : '80%'}
          visible={modalVisible}
          destroyOnClose
          maskClosable={false} // 마스크가 씌워진 부분 클릭시 모달이 닫히는가
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'MONTH_INPUT' && (
            <BizBuilderBase
              sagaKey="chemicalManage_month_input"
              workSeq={14661}
              viewType="INPUT"
              initMonth={searchMonth}
              initSite={site}
              CustomInputPage={MonthInputPage}
              changeTaskCallback={this.changeTaskCallback}
            />
          )}
          {modalType === 'MONTH_VIEW' && (
            <BizBuilderBase
              sagaKey="chemicalManage_month_modify"
              workSeq={14661}
              taskSeq={modalData.TASK_SEQ}
              viewType="MODIFY"
              initData={modalData}
              CustomModifyPage={MonthModifyPage}
              handleModal={this.handleModal}
              changeTaskCallback={this.changeTaskCallback}
            />
          )}
          {modalType === 'FAB_LIST' && <FabListComp initData={modalData} />}
          {modalType === 'DAY_VIEW' && (
            <BizBuilderBase
              sagaKey="chemicalManage_day_modify"
              workSeq={14661}
              taskSeq={modalData.TASK_SEQ}
              viewType="MODIFY"
              initData={modalData}
              modifyMetaSeq={14941}
              CustomModifyPage={DayModifyPage}
              handleModal={this.handleModal}
              changeTaskCallback={this.changeTaskCallback}
            />
          )}
        </AntdModal>
      </>
    );
  }
}

ChemicalManagePage.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  profile: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

export default ChemicalManagePage;

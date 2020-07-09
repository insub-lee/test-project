import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, Select, DatePicker, Spin } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import request from 'utils/request';
import ExcelParser from '../excelParser';

// Common Styled Component Ant.D
const AntdModal = StyledContentsModal(Modal);
const AntdPicker = StyledPicker(DatePicker.RangePicker);
const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

// 식단 테이블 컬럼
const columns = [
  {
    title: '날짜',
    dataIndex: 'day',
    width: '10%',
    align: 'center',
  },
  {
    title: '시간',
    dataIndex: 'mealtype',
    width: '5%',
    align: 'center',
  },
  {
    title: '종류',
    dataIndex: 'daydiv',
    width: '5%',
    align: 'center',
  },
  {
    title: '메뉴',
    dataIndex: 'menu',
    width: '70%',
    align: 'center',
    render: (data, record) => <span>{record.menu.list.join(', ')}</span>,
  },
  {
    title: '칼로리',
    dataIndex: 'menu',
    width: '10%',
    align: 'center',
    render: (data, record) => <span>{record.menu.cal}</span>,
  },
];

class SafetyWorkMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isSaving: false,
      searchValue: {
        sDate: '',
        eDate: '',
        area: 'A',
      },
      mealPlan: [], // 검색한 주간메뉴 리스트
      formData: {
        area: 'A',
        list: [],
      },
    };
  }

  componentDidMount() {}

  // formData insert / update
  submitFormData = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { searchValue } = this.state;
    const { area, sDate, eDate } = searchValue;
    switch (type) {
      case 'SAVE':
        // 작업번호 생성 및 작업정보 입력
        this.saveData();
        break;
      case 'DELETE':
        // submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/safetyWork', submitData, this.safetyWorkDeleteCallback);
        break;
      case 'GET':
        if (sDate !== '' && eDate !== '') {
          submitHandlerBySaga(id, 'GET', `/api/mxlife/v1/common/tabsectList?area=${area}&sDate=${sDate}&eDate=${eDate}`, {}, this.getCallback);
        } else {
          message.error(<MessageContent>검색기간이 설정되지 않았습니다.</MessageContent>);
        }
        break;
      default:
        break;
    }
  };

  // 메뉴검색 콜백
  getCallback = (id, response) => {
    const { list } = response;
    if (list && list.length > 0) {
      this.setState({
        mealPlan: list,
      });
    }
  };

  async saveData() {
    const { formData } = this.state;
    const { list, area } = formData;
    this.setState({
      isSaving: true,
    });
    if (list?.length > 0) {
      let failedList = [];
      await list.forEach(async (row, rowIndex) => {
        const payload = {
          ...row,
          area,
        };
        const result = await this.sendSingleData(payload);
        if (!result) {
          failedList = failedList.push(row);
        }
        if (rowIndex === list.length - 1) {
          if (failedList.length > 0) {
            message.error(<MessageContent>{`${failedList.size}건의 입력을 실패했습니다.`}</MessageContent>);
          } else {
            message.success(<MessageContent>{`${list.length}건의 주간메뉴를 입력했습니다.`}</MessageContent>);
          }
        }
      });
      this.setState({
        isSaving: false,
        modalVisible: false,
      });
    } else {
      this.setState({
        isSaving: false,
      });
      message.error(<MessageContent>입력할 식단정보가 없습니다.</MessageContent>);
    }
  }

  async sendSingleData(payload) {
    const { response, error } = await this.saveMealInfo(payload);
    if (response && !error) {
      return true;
    }
    return false;
  }

  saveMealInfo = async payload => {
    const result = await request({
      method: 'POST',
      url: `/api/mxlife/v1/common/tabsectList`,
      data: payload,
    });
    return result;
  };

  // 모달 핸들러(bool)
  ModalHandler = bool => {
    this.setState({
      modalVisible: bool,
    });
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

  // formData onChange Func
  FormDataOnChange = (field, val) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [field]: val,
      },
    });
  };

  searchDateOnChange = (date, str) => {
    const { searchValue } = this.state;
    this.setState({
      searchValue: {
        ...searchValue,
        sDate: str[0] || '',
        eDate: str[1] || '',
      },
    });
  };

  searchValueAreaOnChange = val => {
    const { searchValue } = this.state;
    this.setState({
      searchValue: {
        ...searchValue,
        area: val,
      },
    });
  };

  render() {
    const { modalVisible, formData, mealPlan, searchValue, isSaving } = this.state;
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">기간</span>
            <AntdPicker className="ant-picker-mid mr5" format="YYYYMMDD" onChange={(date, str) => this.searchDateOnChange(date, str)} />
            <span className="text-label">지역</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '100px' }}
              defaultValue={searchValue.area || 'A'}
              onChange={val => this.searchValueAreaOnChange(val)}
            >
              <Option value="A">청주</Option>
              <Option value="B">구미</Option>
            </AntdSelect>
            <StyledButton className="btn-gray btn-sm btn-first" style={{ marginLeft: '5px' }} onClick={() => this.submitFormData('GET')}>
              조회
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.ModalHandler(true)}>
            주간메뉴 등록
          </StyledButton>
        </StyledButtonWrapper>
        <ContentsWrapper>
          <AntdTable pagination={false} columns={columns} dataSource={mealPlan} />
        </ContentsWrapper>
        <AntdModal
          className="modal-table-pad"
          title="엑셀로 식단 등록"
          width="60%"
          visible={modalVisible}
          destroyOnClose
          footer={null}
          onOk={() => this.ModalHandler(false)}
          onCancel={() => this.ModalHandler(false)}
        >
          <Spin tip="저장중..." spinning={isSaving}>
            <ExcelParser getUploadList={this.getUploadList} onSave={this.submitFormData} isSaving={isSaving}>
              <div style={{ margin: '5px 0px 5px 0px' }}>
                <AntdSelect defaultValue={formData.area || 'A'} style={{ width: '100%' }} onChange={e => this.FormDataOnChange('area', e)}>
                  <Option value="A">청주</Option>
                  <Option value="B">구미</Option>
                </AntdSelect>
              </div>
            </ExcelParser>
          </Spin>
        </AntdModal>
      </>
    );
  }
}

SafetyWorkMain.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  profile: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

export default SafetyWorkMain;

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
import ExcelDownload from '../excelDownload';

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
    width: '65%',
    align: 'center',
    render: (data, record) => <span>{record.menu.list.join(', ')}</span>,
  },
  {
    title: '칼로리',
    dataIndex: '',
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
      isDeleting: false,
      mealPlan: [], // 검색한 주간메뉴 리스트
      searchValue: {
        sDate: '',
        eDate: '',
        area: 'A',
      },
      formData: {
        area: 'A',
        list: [],
      },
      selectedRows: [], // 테이블 rowSelection
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
        this.deleteData();
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
        selectedRowKeys: [],
        selectedRows: [],
        mealPlan: list,
      });
    }
  };

  // 식단저장(엑셀)
  saveData() {
    const { formData } = this.state;
    const { list, area } = formData;
    this.setState({
      isSaving: true,
    });
    if (list?.length > 0) {
      const failedList = [];
      list.forEach((row, rowIndex) => {
        const payload = {
          ...row,
          area,
        };
        const result = this.sendSingleData(payload);
        if (!result) {
          failedList.push(row);
        }
        if (rowIndex === list.length - 1) {
          if (failedList.length > 0) {
            message.error(<MessageContent>{`${failedList.length}건의 입력을 실패했습니다.`}</MessageContent>);
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

  // 식단 저장(단일)
  async sendSingleData(payload) {
    const { response, error } = await this.saveMealInfo(payload);
    if (response && !error) {
      return true;
    }
    return false;
  }

  // 식단 저장
  saveMealInfo = async payload => {
    const result = await request({
      method: 'POST',
      url: `/api/mxlife/v1/common/tabsectList`,
      data: payload,
    });
    return result;
  };

  // 리스트 필터 (삭제된 메뉴 제거)
  deleteFilter = (item, successList) => {
    const result = successList.find(meal => meal.day === item.day && meal.mealtype === item.mealtype && meal.daydiv === item.daydiv);
    if (result === undefined) return true;
    return false;
  };

  // 식단 삭제(select 된 목록)
  deleteData() {
    const { selectedRows, mealPlan } = this.state;
    this.setState({
      isDeleting: true,
    });
    if (selectedRows.length > 0) {
      const failedList = []; // 삭제 실패 리스트
      const successList = []; // 삭제 성공 리스트
      selectedRows.forEach(row => {
        const payload = {
          ...row,
        };
        const result = this.deleteSingleData(payload);
        if (!result) {
          failedList.push(row);
        } else if (result) {
          successList.push(row);
        }
      });
      // 삭제된 항목을 검색된 리스트에서 제거
      const nextMealPlan = mealPlan.filter(item => this.deleteFilter(item, successList));
      this.setState({
        isDeleting: false,
        selectedRows: failedList,
        mealPlan: nextMealPlan,
      });
      if (failedList.length > 0) {
        message.error(<MessageContent>{`${failedList.length}건의 삭제를 실패했습니다.`}</MessageContent>);
      } else {
        message.success(<MessageContent>{`${selectedRows.length}건의 주간메뉴를 삭제했습니다.`}</MessageContent>);
      }
    } else {
      this.setState({
        isDeleting: false,
      });
      message.error(<MessageContent>삭제할 식단정보가 없습니다.</MessageContent>);
    }
  }

  // 식단 삭제(단일)
  async deleteSingleData(payload) {
    const { response, error } = await this.deleteMealInfo(payload);
    if (response && !error) {
      return true;
    }
    return false;
  }

  // 식단 삭제
  deleteMealInfo = async payload => {
    const result = await request({
      method: 'DELETE',
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

  rowSelectOnchange = Rows => {
    this.setState({
      selectedRows: Rows,
    });
  };

  render() {
    const { modalVisible, formData, mealPlan, searchValue, isSaving, isDeleting } = this.state;
    const rowSelection = {
      onChange: (keys, Rows) => this.rowSelectOnchange(Rows),
    };
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
            주간메뉴 등록(엑셀)
          </StyledButton>
          <StyledButton className="btn-light btn-sm btn-first" onClick={() => this.submitFormData('DELETE')}>
            주간메뉴 삭제
          </StyledButton>
          <ExcelDownload dataList={mealPlan} />
        </StyledButtonWrapper>
        <ContentsWrapper>
          <Spin tip="삭제중..." spinning={isDeleting}>
            <AntdTable rowSelection={rowSelection} pagination={false} columns={columns} dataSource={mealPlan} />
          </Spin>
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

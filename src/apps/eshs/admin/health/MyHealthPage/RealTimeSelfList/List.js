import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, DatePicker, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import UserSearchModal from 'apps/eshs/common/userSearchModal';

import SelfEmpResultDetail from 'apps/eshs/admin/health/MyHealthPage/SelfEmpResultDetail';
import ConsultingForm from 'apps/eshs/admin/health/MyHealthPage/ConsultingForm';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearList: [],
      searchParam: {
        CHK_YEAR: currentYear,
      },
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
      selectedRows: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, spinningOn, spinningOff } = this.props;

    spinningOn();

    const yearList = [];
    for (let i = currentYear; i >= 1998; i--) {
      yearList.push(i);
    }
    this.setState({ yearList }, spinningOff);
  }

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;
    this.setState({ selectedRowKeys: [], selectedRows: [] });
    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsRealTimeSelfList`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];
    return getCallDataHandler(id, apiAry, spinningOff);
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam };
    });
  };

  onChangeRangeDatePicker = (val1, val2) => {
    if (val2.length === 2) {
      const { searchParam } = this.state;
      this.setState({
        searchParam: { ...searchParam, FROM_DT: val2[0], TO_DT: val2[1] },
      });
    }
  };

  modalVisible = () => {
    const {
      modalObj,
      modalObj: { modalVisible },
    } = this.state;
    if (modalVisible) {
      return this.setState({
        modalObj: { modalContent: [], modalTitle: '', modalVisible: !modalVisible },
      });
    }
    return this.setState({
      modalObj: { ...modalObj, modalVisible: !modalVisible },
    });
  };

  empNoColumn = {
    title: '사번',
    dataIndex: 'EMP_NO',
    width: '7%',
    align: 'center',
    render: (text, record) => (
      <StyledButton
        className="btn-link btn-sm"
        onClick={() =>
          this.setState(
            {
              modalObj: {
                modalTitle: '개인진단현황',
                modalContent: [<SelfEmpResultDetail userSearch={false} defaultUser={record.USER_ID} chkYear={record.CHK_YEAR} />],
              },
            },
            this.modalVisible,
          )
        }
      >
        {text}
      </StyledButton>
    ),
  };

  columns = [
    {
      title: '소속',
      dataIndex: 'DEPT_NAME_KOR',
      width: '15%',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'NAME_KOR',
      width: '7%',
      align: 'center',
    },
    { ...this.empNoColumn },
    {
      title: '자가진단 질환',
      dataIndex: 'TITLE',
      width: '10%',
      align: 'center',
    },
    {
      title: '질환등급',
      dataIndex: 'RESULT',
      width: '5%',
      align: 'center',
    },
    {
      title: '기관등급',
      dataIndex: 'GRADE',
      width: '5%',
      align: 'center',
      render: (text, record) => {
        if (!text) {
          switch (record.RESULT) {
            case '1등급':
              return 'D2';
            case '2등급':
              return 'D2';
            case '3등급':
              return 'C';
            default:
              return '';
          }
        } else return text;
      },
    },
    {
      title: '진단일',
      dataIndex: 'SE_DT',
      width: '10%',
      align: 'left',
    },
    {
      title: '상담내용',
      dataIndex: 'CONSULT',
      width: '41%',
      align: 'left',
      render: (text, record) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
  ];

  render() {
    const { result } = this.props;
    const { yearList, modalObj, selectedRows, selectedRowKeys } = this.state;
    const list = (result && result.List && result.List.list) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];

    const rowSelection = {
      selectedRowKeys,
      onChange: (rowKeys, rows) => {
        console.debug('selectedRows ', selectedRows);
        return this.setState({ selectedRowKeys: rowKeys, selectedRows: rows });
      },
      onSelectAll: () => {
        this.setState({ selectedRowKeys: list.lastIndex === selectedRowKeys.lastIndex ? [] : list.map(i => i.ROWKEY), selectedRows: list });
      },
    };
    return (
      <>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <AntdSelect
                defaultValue={currentYear}
                className="select-sm mr5"
                style={{ width: 100 }}
                onChange={val => this.onChangeSearchParam('CHK_YEAR', val)}
              >
                {yearList.map(year => (
                  <AntdSelect.Option key={year} value={year}>{`${year}년`}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="지역전체"
                onChange={val => this.onChangeSearchParam('WORK_AREA', val)}
              >
                <AntdSelect.Option value="CP">청주</AntdSelect.Option>
                <AntdSelect.Option value="GP">구미</AntdSelect.Option>
                <AntdSelect.Option value="AA">영동</AntdSelect.Option>
                <AntdSelect.Option value="GLOBAL">해외</AntdSelect.Option>
              </AntdSelect>
              <UserSearchModal visible onClickRow={record => this.onChangeSearchParam('userId', record.USER_ID)} />
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 200 }}
                allowClear
                placeholder="자가진단질환별전체"
                onChange={val => this.onChangeSearchParam('TITLE', val)}
              >
                <AntdSelect.Option value="고혈압">고혈압</AntdSelect.Option>
                <AntdSelect.Option value="간장질환">간장질환</AntdSelect.Option>
                <AntdSelect.Option value="고지혈">고지혈</AntdSelect.Option>
                <AntdSelect.Option value="당뇨">당뇨</AntdSelect.Option>
                <AntdSelect.Option value="빈혈">빈혈</AntdSelect.Option>
              </AntdSelect>
            </div>
            <div className="search-input-area">
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="등급전체"
                onChange={val => this.onChangeSearchParam('RESULT', val)}
              >
                <AntdSelect.Option value="정상">정상</AntdSelect.Option>
                <AntdSelect.Option value="1등급">1등급</AntdSelect.Option>
                <AntdSelect.Option value="2등급">2등급</AntdSelect.Option>
                <AntdSelect.Option value="3등급">3등급</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="기관등급"
                onChange={val => this.onChangeSearchParam('GRADE', val)}
              >
                <AntdSelect.Option value="R1">R1</AntdSelect.Option>
                <AntdSelect.Option value="R2">R2</AntdSelect.Option>
                <AntdSelect.Option value="C">C</AntdSelect.Option>
                <AntdSelect.Option value="C2">C2</AntdSelect.Option>
                <AntdSelect.Option value="D2">D2</AntdSelect.Option>
              </AntdSelect>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                format="YYYY-MM-DD"
                style={{ width: 325 }}
                onChange={(val1, val2) => this.onChangeRangeDatePicker(val1, val2)}
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
              <StyledButton className="btn-gray btn-sm mr5" onClick={() => message.info(<MessageContent>미구현</MessageContent>)}>
                엑셀받기
              </StyledButton>
              <StyledButton
                className="btn-primary btn-sm"
                onClick={() =>
                  this.setState(
                    {
                      modalObj: {
                        modalTitle: '메일작성',
                        modalContent: [<ConsultingForm list={selectedRows} modalVisible={this.modalVisible} saveAfter={this.getList} />],
                      },
                    },
                    this.modalVisible,
                  )
                }
              >
                메일 및 상담내용작성
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable rowSelection={rowSelection} rowKey="ROWNUM" columns={this.columns} dataSource={list || []} bordered />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};
List.defaultProps = {
  result: {},
  sagaKey: '',
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default List;

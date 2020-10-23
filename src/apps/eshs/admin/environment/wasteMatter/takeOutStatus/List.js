import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Table, DatePicker, Input, Select, message } from 'antd';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import Moment from 'moment';
import BizBuilderBase from 'components/BizBuilderBase';

const { Option } = Select;
const { RangePicker } = DatePicker;

const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledContentsModal(Modal);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdRangePicker = StyledDatePicker(RangePicker);

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      dateStrings: [],
      takeOutList: [],
      taskSeq: -1,
      modal: false,
      appStatus: undefined,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [{ key: 'siteItem', url: `/api/eshs/v1/common/eshsBuilderCustomSearch/${4521}`, type: 'POST' }];
    getCallDataHandler(id, apiAry);
  }

  searchData = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    const { dateStrings, itemCd, site, appStatus } = this.state;
    let params = `FROM_DATE=${dateStrings[0] || ''}&TO_DATE=${dateStrings[1] || ''}&ITEM_CD=${itemCd || ''}&SITE=${site}`;
    if (appStatus) params += `&APP_STATUS=${appStatus}`;
    const apiAry = [
      {
        key: 'TakeOutList',
        url: `/api/eshs/v1/common/eshsTakeOutList?${params}`,
        type: 'GET',
      },
    ];
    spinningOn();
    getCallDataHandler(id, apiAry, this.searchDataSet);
  };

  searchDataSet = () => {
    const { result, spinningOff } = this.props;
    this.setState({ takeOutList: result && result.TakeOutList && result.TakeOutList.list }, spinningOff);
  };

  selectedRecord = record => {
    this.setState({ taskSeq: record.TASK_SEQ }, () => this.handleModalVisible());
  };

  handleModalVisible = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  handleItemModalVisible = () => {
    const { itemModal } = this.state;
    this.setState({
      itemModal: !itemModal,
    });
  };

  dateChange = dateStrings => {
    this.setState({ dateStrings });
  };

  renderBuilder = () => (
    <BizBuilderBase
      sagaKey="takeOutModal"
      workSeq={4781}
      taskSeq={this.state.taskSeq}
      viewType="VIEW"
      loadingComplete={this.loadingComplete}
      ViewCustomButtons={() => null}
    />
  );

  selectedItemRecord = record => {
    this.setState({ itemNm: record.ITEM_NM, itemCd: record.ITEM_CD, site: record.SITE });
    this.handleItemModalVisible();
  };

  print = () => {
    message.info('개발중입니다.');
  };

  render() {
    const { takeOutList, itemNm } = this.state;
    const {
      columns,
      result: { siteItem },
      itemColumns,
    } = this.props;
    const nSiteItem = siteItem && siteItem.list;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <AntdSearch
                className="input-search-sm ant-search-inline mr5"
                value={itemNm}
                style={{ width: '150px' }}
                onClick={this.handleItemModalVisible}
                onSearch={this.handleItemModalVisible}
              />
              <AntdRangePicker
                className="ant-picker-sm mr5"
                defaultValue={this.state.dates}
                format={['YYYY-MM-DD', 'YYYY-MM-DD']}
                onChange={(date, dateStrings) => this.dateChange(dateStrings)}
              />
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 130 }}
                placeholder="결재 상태 전체"
                allowClear
                onChange={val => this.setState({ appStatus: val })}
              >
                <Option value="0">저장</Option>
                <Option value="1">신청상신</Option>
                <Option value="2A">신청승인</Option>
                <Option value="2F">신청부결</Option>
                <Option value="3">허가상신</Option>
                <Option value="4A">허가승인</Option>
                <Option value="4F">허가부결</Option>
              </AntdSelect>
              {/* <AntdSelect className="select-sm" value={0}>
                <Option value={0}>결재 해결후 사용</Option>
              </AntdSelect> */}
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm" onClick={this.searchData}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-gray btn-sm" onClick={this.print}>
              인쇄
            </StyledButton>
          </StyledButtonWrapper>
          <AntdTable
            rowKey={takeOutList && takeOutList.TASK_SEQ}
            columns={columns}
            dataSource={takeOutList || []}
            onRow={record => ({
              onClick: () => {
                this.selectedRecord(record);
              },
            })}
            footer={() => <span>{`${takeOutList && takeOutList.length} 건`}</span>}
          />
        </StyledContentsWrapper>
        <AntdModal title="반출증 관리 조회" visible={this.state.modal} width={800} height={600} onCancel={this.handleModalVisible} footer={null}>
          {this.state.modal && this.renderBuilder()}
        </AntdModal>
        <AntdModal title="품목 검색" visible={this.state.itemModal} width={800} height={600} onCancel={this.handleItemModalVisible} footer={null}>
          {this.state.itemModal && (
            <AntdTable
              rowKey={nSiteItem && nSiteItem.ITEM_CD}
              columns={itemColumns}
              dataSource={nSiteItem || []}
              onRow={record => ({
                onClick: () => {
                  this.selectedItemRecord(record);
                },
              })}
              footer={() => <span>{`${(nSiteItem && nSiteItem.length) || 0} 건`}</span>}
            />
          )}
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  columns: PropTypes.array,
  itemColumns: PropTypes.array,
  result: PropTypes.any,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  columns: [
    { dataIndex: 'TAKEOUT_CD', title: '반출증번호', align: 'center' },
    { dataIndex: 'ITEM_NM', title: '품목명', align: 'center' },
    { dataIndex: 'PRICE_WEIGH', title: '반출량', align: 'center' },
    {
      dataIndex: 'APP_STATUS',
      title: '결제상태',
      align: 'center',
      render: (text, record) => {
        switch (text) {
          case '0':
            return '저장';
          case '1':
            return '신청상신';
          case '2A':
            return '신청승인';
          case '2F':
            return '신청부결';
          case '3':
            return '허가상신';
          case '4A':
            return '허가승인';
          case '4F':
            return '허가부결';
          default:
            return '';
        }
      },
    },
    { dataIndex: 'TAKEOUT_DT', title: '반출일자', align: 'center' },
    { dataIndex: 'WRK_CMPNY_NM', title: '운반업체', align: 'center' },
  ],
  itemColumns: [
    {
      title: '품목코드',
      dataIndex: 'ITEM_CD',
      align: 'center',
    },
    {
      title: '지역',
      dataIndex: 'SITE_NM',
      align: 'left',
    },
    {
      title: '품목명',
      dataIndex: 'ITEM_NM',
      align: 'center',
    },
    {
      title: '구분',
      dataIndex: 'GEN_SPEC_GUBUN_NM',
      align: 'center',
    },
  ],
};

export default List;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Table, DatePicker, Input, Select, message } from 'antd';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

import Moment from 'moment';
import BizBuilderBase from 'components/BizBuilderBase';

const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);
const AntdModal = StyledContentsModal(Modal);
const AntdSearch = StyledSearchInput(Input.Search);

const { Option } = Select;
const { RangePicker } = DatePicker;

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
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [{ key: 'siteItem', url: `/api/eshs/v1/common/eshsBuilderCustomSearch/${4521}`, type: 'POST' }];
    getCallDataHandler(id, apiAry);
  }

  searchData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { dateStrings, itemCd, site } = this.state;
    const params = `FROM_DATE=${dateStrings[0] || ''}&TO_DATE=${dateStrings[1] || ''}&ITEM_CD=${itemCd || ''}&SITE=${site}`;
    const apiAry = [
      {
        key: 'TakeOutList',
        url: `/api/eshs/v1/common/eshsTakeOutList?${params}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.searchDataSet);
  };

  searchDataSet = () => {
    const { result } = this.props;
    this.setState({ takeOutList: result && result.TakeOutList && result.TakeOutList.list });
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
    <BizBuilderBase sagaKey="takeOutModal" workSeq={4781} taskSeq={this.state.taskSeq} viewType="VIEW" loadingComplete={this.loadingComplete} />
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
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <AntdSearch
              className="input-search-mid"
              value={itemNm}
              style={{ width: '150px' }}
              onClick={this.handleItemModalVisible}
              onSearch={this.handleItemModalVisible}
            />
            {/* datePiker CSS 없음 대체용으로 사용 */}
            <div style={{ margin: '0 5px', display: 'inline-block' }}>
              <RangePicker
                defaultValue={this.state.dates}
                format={['YYYY-MM-DD', 'YYYY-MM-DD']}
                onChange={(date, dateStrings) => this.dateChange(dateStrings)}
              />
            </div>
            <AntdSelect className="mr5" value={0}>
              <Option value={0}>결제 해결후 사용</Option>
            </AntdSelect>
            <AntdSelect className="mr5" value={0}>
              <Option value={0}>결제 해결후 사용</Option>
            </AntdSelect>
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-first" onClick={this.searchData}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary" onClick={this.print}>
                인쇄
              </StyledButton>
            </StyledButtonWrapper>
          </div>
          <AntdLineTable
            className="tableWrapper"
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
        </ContentsWrapper>
        <AntdModal className="modal-table-pad" visible={this.state.modal} width={800} height={600} onCancel={this.handleModalVisible} footer={null}>
          {this.state.modal && this.renderBuilder()}
        </AntdModal>
        <AntdModal className="modal-table-pad" visible={this.state.itemModal} width={800} height={600} onCancel={this.handleItemModalVisible} footer={null}>
          {this.state.itemModal && (
            <AntdLineTable
              className="tableWrapper"
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
};

List.defaultProps = {
  getCallDataHandler: () => {},
  columns: [
    { dataIndex: 'TAKEOUT_CD', title: '반출증번호' },
    { dataIndex: 'ITEM_NM', title: '품목명' },
    { dataIndex: 'PRICE_WEIGH', title: '반출량' },
    { dataIndex: 'STATUS', title: '결제상태' },
    { dataIndex: 'TAKEOUT_DT', title: '반출일자' },
    { dataIndex: 'WRK_CMPNY_NM', title: '운반업체' },
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

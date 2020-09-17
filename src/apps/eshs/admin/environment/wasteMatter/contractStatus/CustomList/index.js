import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Input, Select, Modal, DatePicker } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdModal = StyledAntdModal(Modal);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

class CustomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {
        SITE: 716,
        ITEM_NM: '',
        TRANS_VENDOR_NM: '',
        DISP_VENDOR_NM: '',
      },
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, getExtraApiData } = this.props;

    const apiArray = [
      {
        key: 'SITE',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 635, USE_YN: 'Y' } },
      },
      {
        key: 'IS_RECYCLE',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 976, USE_YN: 'Y' } },
      },
      {
        key: 'DISPOSAL_GUBUN',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 973, USE_YN: 'Y' } },
      },
      {
        key: 'GEN_SPEC_GUBUN',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 975, USE_YN: 'Y' } },
      },
      {
        key: 'TRANS_FORM_ISSUE_CNT',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 974, USE_YN: 'Y' } },
      },
      {
        key: 'CONTRACT_STATUS',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 1013, USE_YN: 'Y' } },
      },
    ];
    getExtraApiData(id, apiArray);
  };

  /* 
      신규추가 
      목적 : ListGroup 내에서 Row를 클릭시 원하는 뷰로 이동할 수 있는 Config를 지원하기 위해 생성
      타입 : func (추가사항. antd - Table Props 참조)
      create by. JeongHyun
  */
  onRowClick = record => {
    const { sagaKey: id, isBuilderModal, changeBuilderModalState, changeViewPage } = this.props;
    const { rowClickView } = this.state;
    return {
      onClick: () => {
        if (isBuilderModal) {
          changeBuilderModalState(true, rowClickView, record.WORK_SEQ, record.TASK_SEQ, record);
        } else {
          changeViewPage(id, record.WORK_SEQ, record.TASK_SEQ, rowClickView);
        }
      },
    };
  };

  handleClickSearch = () => {
    const { sagaKey, workSeq, conditional, getListData } = this.props;
    const {
      searchData: { SITE },
    } = this.state;
    if (SITE === 716) return getListData(sagaKey, workSeq, conditional, 1);
    return getListData(sagaKey, workSeq, '', 1);
  };

  columns = [
    {
      title: '계약번호(실계약번호)',
      dataIndex: 'CONTRACT_CD',
      width: '130px',
      align: 'center',
    },
    {
      title: '품목명',
      dataIndex: 'ITEM_NM',
      width: '200px',
      align: 'center',
    },
    {
      title: '운반업체',
      dataIndex: 'TRANS_VENDOR_NM',
      width: '200px',
      align: 'center',
    },
    {
      title: '처리업체',
      dataIndex: 'WRK_CMPNY_NM',
      width: '200px',
      align: 'center',
    },
    {
      title: '계약기간(F)',
      dataIndex: 'TERM_FROM_DT',
      width: '100px',
      align: 'center',
      render: (text, record) => (text ? moment(text).format('YYYY-MM-DD') : ''),
    },
    {
      title: '계약기간(T)',
      dataIndex: 'TERM_TO_DT',
      width: '100px',
      align: 'center',
      render: (text, record) => (text ? moment(text).format('YYYY-MM-DD') : ''),
    },
    {
      title: '단가단위',
      dataIndex: 'PRICE_UNIT_NM',
      width: '100px',
      align: 'center',
    },
    {
      title: '화폐단위',
      dataIndex: 'MONEY_UNIT_NM',
      width: '100px',
      align: 'center',
    },
    {
      title: '처리시설명',
      dataIndex: 'INST_NM',
      width: '100px',
      align: 'center',
    },
    {
      title: '성상',
      dataIndex: 'SHAPE_NM',
      width: '100px',
      align: 'center',
    },
    {
      title: '구분',
      dataIndex: 'GEN_SPEC_GUBUN_NM',
      width: '100px',
      align: 'center',
    },
    {
      title: '매수',
      dataIndex: 'TRANS_FORM_ISSUE_CNT_NM',
      width: '100px',
      align: 'center',
    },
    {
      title: '처리방법',
      dataIndex: 'CONSIGN_METHOD_NM',
      width: '100px',
      align: 'center',
    },
    {
      title: '재활용여부',
      dataIndex: 'IS_RECYCLE_NM',
      width: '100px',
      align: 'center',
    },
  ];

  changeModalObj = (title = '', visible = false, content = []) =>
    this.setState({
      modalObj: {
        title,
        visible,
        content,
      },
    });

  onChangeSearchParam = (target, value) => {
    const { sagaKey: id, changeSearchData } = this.props;
    changeSearchData(id, target, value);
  };

  getSiteName = nodeId => {
    const { extraApiData } = this.props;
    const siteArray = (extraApiData && extraApiData.SITE && extraApiData.SITE.categoryMapList) || [];
    const fidx = siteArray.findIndex(item => item.NODE_ID === nodeId);

    return fidx > 0 ? siteArray[fidx].NAME_KOR : '';
  };

  render = () => {
    const {
      sagaKey: id,
      listData,
      extraApiData,
      ListCustomButtons,
      isBuilderModal,
      changeBuilderModalState,
      viewPageData,
      changeViewPage,
      isMultiDelete,
      removeMultiTask,
    } = this.props;
    const { modalObj, searchData } = this.state;

    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <AntdSelect
                defaultValue={searchData.SITE}
                className="select-sm mr5"
                style={{ width: 120 }}
                onChange={val =>
                  this.setState({ searchData: { ...searchData, SITE: val } }, () => this.onChangeSearchParam('SITE', val ? `AND W.SITE = '${val}'` : ''))
                }
              >
                {extraApiData &&
                  extraApiData.SITE &&
                  extraApiData.SITE.categoryMapList
                    .filter(item => item.LVL > 2)
                    .map(item => (
                      <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                        {item.NAME_KOR}
                      </AntdSelect.Option>
                    ))}
              </AntdSelect>
              <AntdSearchInput
                style={{ width: 120 }}
                value={searchData.ITEM_NM || undefined}
                className="input-search-sm ant-search-inline mr5"
                allowClear
                readOnly
                placeholder="품목 선택"
                onSearch={() =>
                  this.changeModalObj(`${this.getSiteName(searchData.SITE)} 품목 검색`, true, [
                    <BizBuilderBase
                      key="siteItemSearchList"
                      viewType="LIST"
                      sagaKey="siteItemSearchList"
                      workSeq={4521}
                      listMetaSeq={15466}
                      conditional={`AND W.SITE = '${searchData.SITE}'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              ITEM_NM: record.ITEM_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('ITEM_NM', record.ITEM_NM ? `AND W.ITEM_NM = '${record.ITEM_NM}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
                onClick={() =>
                  this.changeModalObj(`${this.getSiteName(searchData.SITE)} 품목 검색`, true, [
                    <BizBuilderBase
                      key="siteItemSearchList"
                      viewType="LIST"
                      sagaKey="siteItemSearchList"
                      workSeq={4521}
                      listMetaSeq={15466}
                      conditional={`AND W.SITE = '${searchData.SITE}'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              ITEM_NM: record.ITEM_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('ITEM_NM', record.ITEM_NM ? `AND W.ITEM_NM = '${record.ITEM_NM}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
                onChange={() =>
                  this.changeModalObj(`${this.getSiteName(searchData.SITE)} 품목 검색`, true, [
                    <BizBuilderBase
                      key="siteItemSearchList"
                      viewType="LIST"
                      sagaKey="siteItemSearchList"
                      workSeq={4521}
                      listMetaSeq={15466}
                      conditional={`AND W.SITE = '${searchData.SITE}'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              ITEM_NM: record.ITEM_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('ITEM_NM', record.ITEM_NM ? `AND W.ITEM_NM = '${record.ITEM_NM}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
              />
              <AntdRangeDatePicker
                placeholder={['대상일자', '']}
                className="ant-picker-sm mr5"
                format="YYYY-MM-DD"
                style={{ width: 250 }}
                onChange={(val1, val2) =>
                  this.onChangeSearchParam(
                    'TERM_DATE',
                    `${val2[1] ? `AND TO_CHAR(W.TERM_TO_DT, 'YYYY-MM-DD') <= '${val2[1]}' AND TO_CHAR(W.TERM_FROM_DT, 'YYYY-MM-DD') >= '${val2[0]}'` : ''}`,
                  )
                }
              />
            </div>
            <div className="search-input-area mb10">
              <AntdSelect
                placeholder="재황용구분전체"
                className="select-sm mr5"
                style={{ width: 150 }}
                allowClear
                onChange={val => this.onChangeSearchParam('IS_RECYCLE', val ? `AND W.IS_RECYCLE = '${val}'` : '')}
              >
                {extraApiData &&
                  extraApiData.IS_RECYCLE &&
                  extraApiData.IS_RECYCLE.categoryMapList
                    .filter(item => item.LVL > 2)
                    .map(item => (
                      <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                        {item.NAME_KOR}
                      </AntdSelect.Option>
                    ))}
              </AntdSelect>
              <AntdSelect
                placeholder="유무상전체"
                className="select-sm mr5"
                style={{ width: 150 }}
                allowClear
                onChange={val => this.onChangeSearchParam('DISPOSAL_GUBUN', val ? `AND W.DISPOSAL_GUBUN = '${val}'` : '')}
              >
                {extraApiData &&
                  extraApiData.DISPOSAL_GUBUN &&
                  extraApiData.DISPOSAL_GUBUN.categoryMapList
                    .filter(item => item.LVL > 2)
                    .map(item => (
                      <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                        {item.NAME_KOR}
                      </AntdSelect.Option>
                    ))}
              </AntdSelect>
              <AntdSelect
                placeholder="일반/지정 전체"
                className="select-sm mr5"
                style={{ width: 150 }}
                allowClear
                onChange={val => this.onChangeSearchParam('GEN_SPEC_GUBUN', val ? `AND W.GEN_SPEC_GUBUN = '${val}'` : '')}
              >
                {extraApiData &&
                  extraApiData.GEN_SPEC_GUBUN &&
                  extraApiData.GEN_SPEC_GUBUN.categoryMapList
                    .filter(item => item.LVL > 2)
                    .map(item => (
                      <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                        {item.NAME_KOR}
                      </AntdSelect.Option>
                    ))}
              </AntdSelect>
              <AntdSelect
                placeholder="매수전체"
                className="select-sm mr5"
                style={{ width: 150 }}
                allowClear
                onChange={val => this.onChangeSearchParam('TRANS_FORM_ISSUE_CNT', val ? `AND W.TRANS_FORM_ISSUE_CNT = '${val}'` : '')}
              >
                {extraApiData &&
                  extraApiData.TRANS_FORM_ISSUE_CNT &&
                  extraApiData.TRANS_FORM_ISSUE_CNT.categoryMapList
                    .filter(item => item.LVL > 2)
                    .map(item => (
                      <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                        {item.NAME_KOR}
                      </AntdSelect.Option>
                    ))}
              </AntdSelect>
              <AntdSelect
                placeholder="계약상태전체"
                className="select-sm mr5"
                style={{ width: 150 }}
                allowClear
                onChange={val => this.onChangeSearchParam('CONTRACT_STATUS', val ? `AND W.CONTRACT_STATUS = '${val}'` : '')}
              >
                {extraApiData &&
                  extraApiData.CONTRACT_STATUS &&
                  extraApiData.CONTRACT_STATUS.categoryMapList
                    .filter(item => item.LVL > 2)
                    .map(item => (
                      <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                        {item.NAME_KOR}
                      </AntdSelect.Option>
                    ))}
              </AntdSelect>
            </div>
            <div className="search-input-area mb10">
              <AntdSearchInput
                style={{ width: 300 }}
                value={searchData.TRANS_VENDOR_NM || ''}
                className="input-search-sm ant-search-inline mr5"
                allowClear
                readOnly
                placeholder="운반업체"
                onSearch={() =>
                  this.changeModalObj('운반업체', true, [
                    <BizBuilderBase
                      key={`${id}_CMPNY_SEARCH1`}
                      sagaKey={`${id}_CMPNY_SEARCH1`}
                      workSeq={401}
                      taskSeq={-1}
                      viewType="LIST"
                      listMetaSeq={8721}
                      conditional={`AND W.GUBUN = 'SQ'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              TRANS_VENDOR_NM: record.WRK_CMPNY_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('TRANS_VENDOR_CD', record.WRK_CMPNY_CD ? `AND W.TRANS_VENDOR_CD = '${record.WRK_CMPNY_CD}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
                onClick={() =>
                  this.changeModalObj('운반업체', true, [
                    <BizBuilderBase
                      key={`${id}_CMPNY_SEARCH1`}
                      sagaKey={`${id}_CMPNY_SEARCH1`}
                      workSeq={401}
                      taskSeq={-1}
                      viewType="LIST"
                      listMetaSeq={8721}
                      conditional={`AND W.GUBUN = 'SQ'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              TRANS_VENDOR_NM: record.WRK_CMPNY_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('TRANS_VENDOR_CD', record.WRK_CMPNY_CD ? `AND W.TRANS_VENDOR_CD = '${record.WRK_CMPNY_CD}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
                onChange={() =>
                  this.changeModalObj('운반업체', true, [
                    <BizBuilderBase
                      key={`${id}_CMPNY_SEARCH1`}
                      sagaKey={`${id}_CMPNY_SEARCH1`}
                      workSeq={401}
                      taskSeq={-1}
                      viewType="LIST"
                      listMetaSeq={8721}
                      conditional={`AND W.GUBUN = 'SQ'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              TRANS_VENDOR_NM: record.WRK_CMPNY_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('TRANS_VENDOR_CD', record.WRK_CMPNY_CD ? `AND W.TRANS_VENDOR_CD = '${record.WRK_CMPNY_CD}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
              />

              <AntdSearchInput
                style={{ width: 300 }}
                value={searchData.DISP_VENDOR_NM || ''}
                className="input-search-sm ant-search-inline mr5"
                allowClear
                readOnly
                placeholder="처리업체"
                onSearch={() =>
                  this.changeModalObj('처리업체', true, [
                    <BizBuilderBase
                      key={`${id}_CMPNY_SEARCH1`}
                      sagaKey={`${id}_CMPNY_SEARCH1`}
                      workSeq={401}
                      taskSeq={-1}
                      viewType="LIST"
                      listMetaSeq={8721}
                      conditional={`AND W.GUBUN = 'SQ'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              DISP_VENDOR_NM: record.WRK_CMPNY_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('DISP_VENDOR_CD', record.WRK_CMPNY_CD ? `AND W.DISP_VENDOR_CD = '${record.WRK_CMPNY_CD}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
                onClick={() =>
                  this.changeModalObj('처리업체', true, [
                    <BizBuilderBase
                      key={`${id}_CMPNY_SEARCH1`}
                      sagaKey={`${id}_CMPNY_SEARCH1`}
                      workSeq={401}
                      taskSeq={-1}
                      viewType="LIST"
                      listMetaSeq={8721}
                      conditional={`AND W.GUBUN = 'SQ'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              DISP_VENDOR_NM: record.WRK_CMPNY_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('DISP_VENDOR_CD', record.WRK_CMPNY_CD ? `AND W.DISP_VENDOR_CD = '${record.WRK_CMPNY_CD}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
                onChange={() =>
                  this.changeModalObj('처리업체', true, [
                    <BizBuilderBase
                      key={`${id}_CMPNY_SEARCH1`}
                      sagaKey={`${id}_CMPNY_SEARCH1`}
                      workSeq={401}
                      taskSeq={-1}
                      viewType="LIST"
                      listMetaSeq={8721}
                      conditional={`AND W.GUBUN = 'SQ'`}
                      ListCustomButtons={() => null}
                      customOnRowClick={record =>
                        this.setState(
                          {
                            searchData: {
                              ...searchData,
                              DISP_VENDOR_NM: record.WRK_CMPNY_NM,
                            },
                          },
                          () => {
                            this.changeModalObj();
                            this.onChangeSearchParam('DISP_VENDOR_CD', record.WRK_CMPNY_CD ? `AND W.DISP_VENDOR_CD = '${record.WRK_CMPNY_CD}'` : '');
                          },
                        )
                      }
                    />,
                  ])
                }
              />
              <AntdInput
                className="ant-input-sm ant-input-inline ml5"
                placeholder="실계약번호"
                allowClear
                onPressEnter={this.handleClickSearch}
                style={{ width: 150 }}
                onChange={e => this.onChangeSearchParam('CONTRACT_NM', e.target.value ? `AND W.CONTRACT_NM LIKE '%${e.target.value}%'` : '')}
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.handleClickSearch}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>

          <AntdTable
            bordered
            rowKey="TASK_SEQ"
            key={`${id}_list`}
            className="view-designer-list"
            columns={this.columns}
            dataSource={listData || []}
            scroll={{ x: 1277 }}
            onRow={record => ({ onClick: () => changeBuilderModalState(true, 'VIEW', viewPageData.workSeq, record.TASK_SEQ) })}
          />
        </StyledContentsWrapper>
        <AntdModal width={850} visible={modalObj.visible} title={modalObj.title || ''} onCancel={() => this.changeModalObj()} destroyOnClose footer={null}>
          {modalObj.content}
        </AntdModal>

        <StyledButtonWrapper className="btn-wrap-right">
          {ListCustomButtons ? (
            <ListCustomButtons saveBeforeProcess={this.saveBeforeProcess} {...this.props} />
          ) : (
            <StyledButton
              className="btn-primary btn-sm mr5"
              onClick={() =>
                isBuilderModal ? changeBuilderModalState(true, 'INPUT', viewPageData.workSeq, -1) : changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')
              }
            >
              추가
            </StyledButton>
          )}
          {isMultiDelete && (
            <Popconfirm title="Are you sure delete this task?" onConfirm={() => removeMultiTask(id, id, -1, 'INPUT')} okText="Yes" cancelText="No">
              <StyledButton className="btn-light btn-sm">삭제</StyledButton>
            </Popconfirm>
          )}
        </StyledButtonWrapper>
      </>
    );
  };
}

CustomList.propTypes = {
  workInfo: PropTypes.object,
  sagaKey: PropTypes.string,
  workFlowConfig: PropTypes.object,
  workPrcProps: PropTypes.object,
  viewLayer: PropTypes.array,
  formData: PropTypes.object,
  processRule: PropTypes.object,
  getProcessRule: PropTypes.func,
  onCloseModalHandler: PropTypes.func,
  saveTask: PropTypes.func,
  setProcessRule: PropTypes.func,
  isLoading: PropTypes.bool,
  isBuilderModal: PropTypes.bool,
  changeBuilderModalState: PropTypes.func,
  changeViewPage: PropTypes.func,
  customOnRowClick: PropTypes.any,
  listData: PropTypes.array,
  useExcelDownload: PropTypes.bool,
};

CustomList.defaultProps = {
  workFlowConfig: {
    info: {
      PRC_ID: -1,
    },
  },
  customOnRowClick: undefined,
  useExcelDownload: true,
};

export default CustomList;

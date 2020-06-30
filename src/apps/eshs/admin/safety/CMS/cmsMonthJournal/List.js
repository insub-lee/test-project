import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BizBuilderBase from 'components/BizBuilderBase';

import { Input, Select, Popover, message, DatePicker, Modal } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import ExcelDownloader from './Excel';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
const AntdRangePicker = StyledDatePicker(RangePicker);
const AntdMonthPicker = StyledDatePicker(MonthPicker);

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeDate: [moment(), moment()],
      classificationSelcected: 1879,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'initData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 631 } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const {
      result: { initData },
    } = this.props;
    const fixedTeam = initData && initData.categoryMapList && initData.categoryMapList.filter(item => item.PARENT_NODE_ID === 2010);
    const timedTeam = initData && initData.categoryMapList && initData.categoryMapList.filter(item => item.PARENT_NODE_ID === 2011);
    const classification = initData && initData.categoryMapList && initData.categoryMapList.filter(item => item.PARENT_NODE_ID === 1878);
    this.setState({ fixedTeam, timedTeam, classification });
  };

  searchList = () => {
    const { sagaKey: id, getCallDataHandler, rangeYn } = this.props;
    const { fixedTeamSelected, timedTeamSelected, classificationSelcected, rangeDate, dateStrings } = this.state;
    let dateParam;
    if (rangeYn) {
      dateParam = `DATE_START=${moment(rangeDate[0] || '').format('YYYY-MM-DD 00:00:00')}&DATE_END=${moment(rangeDate[1] || '').format('YYYY-MM-DD 24:00:00')}`;
    } else {
      dateParam = dateStrings ? `${dateStrings}` : moment().format('YYYY-MM');
    }
    const apiAry = [
      {
        key: 'listData',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsCMSMonth',
        params: {
          PARAM: {
            JOURNAL_DATE: dateParam,
            CLASSIFICATION: String(classificationSelcected),
            FIXED_TEAM_SELECTED: fixedTeamSelected,
            TIME_TEAM_SELECTED: timedTeamSelected,
            JOURNAL_DATE_START: moment(rangeDate[0] || '').format('YYYY-MM-DD'),
            JOURNAL_DATE_END: moment(rangeDate[1] || '').format('YYYY-MM-DD'),
            TYPE: rangeYn ? 'RANGE' : 'MONTH',
          },
        },
      },
      {
        key: 'detailData',
        type: 'GET',
        url: rangeYn ? `/api/eshs/v1/common/eshsCMS?${dateParam}&TYPE=RANGE` : `/api/eshs/v1/common/eshsCMS?JOURNAL_DATE=${dateParam}&TYPE=MONTH`,
      },
    ];
    getCallDataHandler(id, apiAry, this.nullCheck);
  };

  nullCheck = () => {
    const {
      result: { detailData, listData },
    } = this.props;
    if (detailData.list.length <= 0 && listData.list.length <= 0) {
      message.warning('검색된 데이터가 없습니다.');
    } else {
      this.setState({ detailData: detailData.list, listData: listData.list });
    }
  };

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  onModalChange = seq => {
    const { isModal } = this.state;
    if (isModal) this.searchList();
    this.setState({ isModal: !isModal, taskSeq: seq });
  };

  render() {
    const {
      fixedTeam,
      timedTeam,
      fixedTeamSelected,
      timedTeamSelected,
      classificationSelcected,
      classification,
      rangeDate,
      isModal,
      taskSeq,
      detailData,
      listData,
    } = this.state;
    const { rangeYn } = this.props;
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">날짜</span>
            {rangeYn ? (
              <AntdRangePicker
                style={{ width: '200px' }}
                className="ant-picker-sm mr5"
                defaultValue={rangeDate}
                format={['YYYY-MM-DD', 'YYYY-MM-DD']}
                onChange={(date, dateStrings) => this.onChangeValue('rangeDate', dateStrings)}
              />
            ) : (
              <AntdMonthPicker
                className="ant-picker-mid mr5"
                defaultValue={moment(moment(), 'YYYY-MM')}
                format="YYYY-MM"
                onChange={(date, dateStrings) => this.onChangeValue('dateStrings', dateStrings)}
              />
            )}

            <span className="text-label">일지 구분</span>
            <AntdSelect
              style={{ width: '120px' }}
              className="select-sm mr5"
              onChange={value => this.onChangeValue('classificationSelcected', value)}
              value={classificationSelcected}
            >
              {classification && classification.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
            </AntdSelect>
            <span className="text-label">고정조 구분</span>
            <AntdSelect
              style={{ width: '120px' }}
              className="select-sm mr5"
              onChange={value => this.onChangeValue('fixedTeamSelected', value)}
              value={fixedTeamSelected}
              allowClear
              placeholder="전체"
            >
              {fixedTeam && fixedTeam.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
            </AntdSelect>
            <span className="text-label">시간조 구분</span>
            <AntdSelect
              style={{ width: '120px' }}
              className="select-sm mr5"
              onChange={value => this.onChangeValue('timedTeamSelected', value)}
              value={timedTeamSelected}
              allowClear
              placeholder="전체"
            >
              {timedTeam && timedTeam.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
            </AntdSelect>
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.searchList}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-gray btn-first btn-sm" onClick={() => message.warning('개발중입니다.')}>
            출력
          </StyledButton>
          {listData && listData.length > 0 && <ExcelDownloader dataList={listData} excelNm={`${rangeYn ? '기간별' : '월별'} 업무일지`} />}
        </StyledButtonWrapper>

        <StyledHtmlTable>
          <table>
            <colgroup>
              {listData && listData[0] && listData[0].FULLPATH && listData[0].FULLPATH.indexOf('CMS') === -1 ? (
                <>
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                  <col width="4.54%" />
                </>
              ) : (
                <>
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                </>
              )}
              <col width="6%" />
              <col width="22%" />
              <col width="22%" />
            </colgroup>
            <tbody>
              <tr>
                <th
                  colSpan={`${listData && listData[0] && listData[0].FULLPATH && listData[0].FULLPATH.indexOf('CMS') === -1 ? 11 : 10}`}
                  style={{ background: '#D6EBFF' }}
                >
                  업무실적
                </th>
                <th colSpan="3" style={{ background: '#D6EBFF' }}>
                  특이사항
                </th>
              </tr>
              <tr>
                <th rowSpan="2">분류2</th>
                <th rowSpan="2">분류3</th>
                <th rowSpan="2">총 대응건수</th>
                {listData && listData[0] && listData[0].FULLPATH && listData[0].FULLPATH.indexOf('CMS') === -1 ? (
                  <th rowSpan="2">
                    점검
                    <br />
                    수량
                  </th>
                ) : (
                  ''
                )}
                <th colSpan="7"> 건물별 대응 건수</th>
                <th rowSpan="2">날짜</th>
                <th rowSpan="2">이벤트명</th>
                <th rowSpan="2">원인 및 조치사항</th>
              </tr>
              <tr>
                <th>R</th>
                <th>C-1</th>
                <th>FAB</th>
                <th>
                  가스
                  <br />
                  창고
                </th>
                <th>
                  약품
                  <br />
                  공급실
                </th>
                <th>
                  가스
                  <br />
                  공급실
                </th>
                <th>기타</th>
              </tr>
              {listData &&
                listData.map(item => (
                  <tr>
                    <th>{item.CLASSIFICATION_PATH}</th>
                    <td>{item.CLASSIFICATION_NM}</td>
                    <td style={{ textAlign: 'center' }}>{item.TOTAL}</td>
                    {item.FULLPATH.indexOf('CMS') === -1 ? <td style={{ textAlign: 'center' }}>{item.WEIGHT}</td> : ''}
                    <td style={{ textAlign: 'center' }}>{item.R}</td>
                    <td style={{ textAlign: 'center' }}>{item.C_2}</td>
                    <td style={{ textAlign: 'center' }}>{item.FAB}</td>
                    <td style={{ textAlign: 'center' }}>{item.GAS_WARHOUSE}</td>
                    <td style={{ textAlign: 'center' }}>{item.MEDICAL_SUPPLY}</td>
                    <td style={{ textAlign: 'center' }}>{item.GAS_SUPPLY}</td>
                    <td style={{ textAlign: 'center' }}>{item.OTHER}</td>
                    <td>{item.JOURNAL_DATE}</td>
                    <td>
                      <Popover
                        style={{ width: '80%' }}
                        placement="topLeft"
                        title="이벤트명"
                        content={
                          <div style={{ width: 660 }}>
                            {item &&
                              item.DETAIL_DATA.map(detailItem => (
                                <>
                                  <span
                                    tabIndex={0}
                                    role="button"
                                    onKeyPress={() => this.onModalChange(JSON.parse(detailItem.value).task_seq)}
                                    onClick={() => this.onModalChange(JSON.parse(detailItem.value).task_seq)}
                                  >
                                    {JSON.parse(detailItem.value).title || ''}
                                  </span>
                                  <hr />
                                </>
                              ))}
                          </div>
                        }
                        trigger="hover"
                      >
                        <div
                          style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            width: '100px',
                            whiteSpace: 'nowrap',
                            fontWeight: `bold`,
                          }}
                        >
                          {item.TITLE}
                        </div>
                      </Popover>
                    </td>
                    <td>
                      <Popover
                        placement="topLeft"
                        title="원인 및 조치사항"
                        content={
                          <div style={{ width: 660 }}>
                            {item &&
                              item.DETAIL_DATA.map(detailItem => (
                                <>
                                  <span>{JSON.parse(detailItem.value).remark || ''}</span>
                                  {JSON.parse(detailItem.value).remark ? <hr /> : ''}
                                </>
                              ))}
                          </div>
                        }
                        trigger="hover"
                      >
                        <div
                          style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            width: '100px',
                            whiteSpace: 'nowrap',
                            fontWeight: `bold`,
                          }}
                        >
                          {item.REMARK}
                        </div>
                      </Popover>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledHtmlTable>
          <div className="table-title" style={{ marginTop: '20px' }}>
            기타사항
          </div>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th style={{ background: '#D6EBFF' }}>날짜</th>
                <th style={{ background: '#D6EBFF' }}>내용</th>
              </tr>
              {detailData &&
                detailData.map(item => (
                  <tr>
                    <td>{item.JOURNAL_DATE}</td>
                    <td>
                      <TextArea value={item.CONTANTS} readOnly></TextArea>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdModal width={1000} visible={isModal} title="이벤트 상세보기" onCancel={this.onModalChange} destroyOnClose footer={null}>
          {isModal && <BizBuilderBase sagaKey="cmsDetailJournal" workSeq={5781} taskSeq={taskSeq} viewType="MODIFY" onCloseModalHandler={this.onModalChange} />}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
  rangeYn: PropTypes.bool,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;

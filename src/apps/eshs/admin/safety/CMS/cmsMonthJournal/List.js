import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BizBuilderBase from 'components/BizBuilderBase';

import { Input, Select, Popover, message, DatePicker, Modal } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledModal from 'commonStyled/Modal/StyledModal';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledModal(Modal);

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeDate: [moment(), moment()],
      monthArray: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      yearArray: [],
      journalDateY: moment().format('YYYY'),
      journalDateM: moment().format('MM'),
      classificationSelcected: 1879,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { journalDateY } = this.state;
    const startYear = Number(journalDateY) - 20;
    const endYear = Number(journalDateY) + 1;
    const yearArray = [];
    for (let i = startYear; i <= endYear; i += 1) {
      yearArray.push(i);
    }
    this.setState({ yearArray });
    const apiAry = [
      {
        key: 'initData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 631 } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
    this.searchList();
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
    const { fixedTeamSelected, timedTeamSelected, classificationSelcected, journalDateY, journalDateM, rangeDate } = this.state;
    let dateParam;
    if (rangeYn) {
      dateParam = `DATE_START=${moment(rangeDate[0] || '').format('YYYY-MM-DD 00:00:00')}&DATE_END=${moment(rangeDate[1] || '').format('YYYY-MM-DD 24:00:00')}`;
    } else {
      dateParam = journalDateY && journalDateM ? `${journalDateY}-${journalDateM}` : moment().format('YYYY-MM');
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
    getCallDataHandler(id, apiAry, this.initData);
  };

  callBackApi = () => {
    this.searchList();
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
      journalDateY,
      journalDateM,
      monthArray,
      yearArray,
      rangeDate,
      isModal,
      taskSeq,
    } = this.state;
    const {
      result: { detailData, listData },
      rangeYn,
    } = this.props;
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          {rangeYn ? (
            <>
              <span className="textLabel">날짜</span>
              {/* datePiker CSS 없음 대체용으로 사용 */}
              <div style={{ margin: '0 5px', display: 'inline-block', width: 300 }}>
                <RangePicker
                  defaultValue={rangeDate}
                  format={['YYYY-MM-DD', 'YYYY-MM-DD']}
                  onChange={(date, dateStrings) => this.onChangeValue('rangeDate', dateStrings)}
                />
              </div>
            </>
          ) : (
            <>
              <span className="textLabel">연도</span>
              <AntdSelect
                style={{ width: '200px' }}
                className="select-mid mr5"
                onChange={value => this.onChangeValue('journalDateY', value)}
                value={journalDateY}
              >
                {yearArray.map(item => (
                  <Option value={item}>{item}</Option>
                ))}
              </AntdSelect>
              <span className="textLabel">월</span>
              <AntdSelect
                style={{ width: '200px' }}
                className="select-mid mr5"
                onChange={value => this.onChangeValue('journalDateM', value)}
                value={journalDateM}
              >
                {monthArray.map(item => (
                  <Option value={item}>{item}</Option>
                ))}
              </AntdSelect>
            </>
          )}

          <span className="textLabel">일지 구분</span>
          <AntdSelect
            style={{ width: '200px' }}
            className="select-mid mr5"
            onChange={value => this.onChangeValue('classificationSelcected', value)}
            value={classificationSelcected}
          >
            {classification && classification.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={this.searchList}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">고정조 구분</span>
          <AntdSelect
            style={{ width: '200px' }}
            className="select-mid mr5"
            onChange={value => this.onChangeValue('fixedTeamSelected', value)}
            value={fixedTeamSelected || ''}
          >
            <Option value="">전체</Option>
            {fixedTeam && fixedTeam.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
          </AntdSelect>
          <span className="textLabel">시간조 구분</span>
          <AntdSelect
            style={{ width: '200px' }}
            className="select-mid mr5"
            onChange={value => this.onChangeValue('timedTeamSelected', value)}
            value={timedTeamSelected || ''}
          >
            <Option value="">전체</Option>
            {timedTeam && timedTeam.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
          </AntdSelect>
        </div>
        <div className="selSaveWrapper alignLeft">
          <StyledButton className="btn-primary btn-first" onClick={() => message.warning('개발중입니다.')}>
            출력
          </StyledButton>
          <StyledButton className="btn-primary btn-first" onClick={() => message.warning('개발중입니다.')}>
            엑셀 받기
          </StyledButton>
        </div>
        <StyledHtmlTable className="tableWrapper">
          <table>
            <colgroup>
              {listData && listData.list && listData.list[0] && listData.list[0].FULLPATH && listData.list[0].FULLPATH.indexOf('CMS') === -1 ? (
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
                  colSpan={`${
                    listData && listData.list && listData.list[0] && listData.list[0].FULLPATH && listData.list[0].FULLPATH.indexOf('CMS') === -1 ? 11 : 10
                  }`}
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
                {listData && listData.list && listData.list[0] && listData.list[0].FULLPATH && listData.list[0].FULLPATH.indexOf('CMS') === -1 ? (
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
                listData.list &&
                listData.list.map(item => (
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
        <div className="selSaveWrapper alignLeft">
          <span>기타사항</span>
        </div>
        <StyledHtmlTable className="tableWrapper">
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
                detailData.list &&
                detailData.list.map(item => (
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
      </ContentsWrapper>
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

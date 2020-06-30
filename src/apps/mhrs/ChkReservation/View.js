import React, { Component } from 'react';
import { Select, DatePicker, Checkbox, Modal } from 'antd';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import Styled from './Styled';

const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdSelect = StyledSelect(Select);

class DetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reservationInfo: props.selectedRow,
      chkTypeList: [],
      selectedChkType: {},
      checkedVals: props.selectedRow.CHK_ITEMS_CODE ? JSON.parse(props.selectedRow.CHK_ITEMS_CODE) : [],
    };
  }

  componentWillMount() {
    const { sagaKey, getCallDataHandler, selectedRow } = this.props;
    const apiAry = [
      {
        key: 'chkTypeList',
        url: `/api/eshs/v1/common/health/healthChkHospitalItemList?HOSPITAL_CODE=${selectedRow.HOSPITAL_CODE}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(sagaKey, apiAry, this.initState);
  }

  initState = () => {
    const { result, selectedRow } = this.props;
    this.setState({
      chkTypeList: result.chkTypeList && result.chkTypeList.list ? result.chkTypeList.list.map(item => {
        if (item.ITEM_JSON){
          item['itemList'] = JSON.parse(item.ITEM_JSON);
        }
        return { ...item }
      }) : [],
      selectedChkType: result.chkTypeList && result.chkTypeList.list ? 
                      selectedRow.CHK_TYPE ? result.chkTypeList.list.filter(item => item.CHK_TYPE === selectedRow.CHK_TYPE)[0] : result.chkTypeList.list[0] : '',
      reservationInfo: {
        ...selectedRow,
        CHK_TYPE: result.chkTypeList && result.chkTypeList.list ? 
                (selectedRow.CHK_TYPE ? result.chkTypeList.list.filter(item => item.CHK_TYPE === selectedRow.CHK_TYPE)[0].CHK_TYPE : result.chkTypeList.list[0].CHK_TYPE) : '',
      }
    });
  };

  onChangeChkType = chkType => {
    this.setState(prevState => {
       const { chkTypeList, reservationInfo } = prevState;
       return {
         selectedChkType: chkTypeList.filter(item => item.CHK_TYPE === chkType)[0],
         checkedVals: [],
         reservationInfo: {
           ...reservationInfo,
           CHK_TYPE: chkTypeList.filter(item => item.CHK_TYPE === chkType)[0].CHK_TYPE,
         },
       }
    });
  };

  onChangeItem = (checked, group, item) => {
    this.setState(prevState => {
      const { selectedChkType, checkedVals } = prevState;
      if (checked) {
        const selGroup = selectedChkType.itemList.filter(grp => grp.GROUP === group.GROUP)[0];
        const cnt = selGroup.ITEMS.filter(t => checkedVals.includes(t.ITEM_CODE)).length;
        
        if (cnt < selGroup.ABLE_CNT ) {
          checkedVals.push(item.ITEM_CODE);
        }
      } else {
        const findIdx = checkedVals.findIndex(t => t === item.ITEM_CODE);
        checkedVals.splice(findIdx, 1);
      }
      return { checkedVals }
    });
  };

  onSave = () => {
    const { selectedChkType, checkedVals, reservationInfo } = this.state;
    const selectedItems = [];

    selectedChkType.itemList.forEach(group => {
      group.ITEMS.forEach(item => {
        if (checkedVals.includes(item.ITEM_CODE)) {
          selectedItems.push(item);
        }
      });
    });

    if (checkedVals.length === 0) {
      message.info(<MessageContent>검진항목을 선택해해주세요.</MessageContent>);
      return false;
    }

    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff, onSavePopupAfter } = this.props;
    const submitData = {
      PARAM: {
        ...reservationInfo,
        CHK_ITEMS: selectedItems.map(item => item.ITEM_NAME).join(),
        CHK_CODES: checkedVals,
      }
    }

    Modal.confirm({
      title: `저장하시겠습니까?`,
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/MhrsHealthChkReservation', submitData, (id, res) => {
          spinningOff();
          if (res && res.result === 1) {
            message.success(<MessageContent>저장하였습니다.</MessageContent>);
            onSavePopupAfter();
          } else {
            message.error(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  render() {
    const { reservationInfo, selectedChkType, chkTypeList, checkedVals } = this.state;
    console.debug('checkedVals >> ', checkedVals);
    console.debug('reservationInfo >> ', reservationInfo);

    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="10%" />
              <col width="20%" />
              <col width="10%" />
              <col width="20%" />
              <col width="10%" />
              <col width="30%" />
            </colgroup>
            <tbody>
              <tr>
                <th>사번</th>
                <td>{reservationInfo.EMP_NO}</td>
                <th>이름</th>
                <td>{reservationInfo.IS_MATE === '0' ? reservationInfo.USER_NAME : `${reservationInfo.FAM_NAME}(배)`}</td>
                <th>주민등록번호</th>
                <td>
                  {reservationInfo.IS_MATE === '0' ? (
                    `${reservationInfo.REGNO.substring(0, 6)}-${reservationInfo.REGNO.substring(6, 13)}`
                  ) : (
                    `${reservationInfo.FAM_REGNO.substring(0, 6)}-${reservationInfo.FAM_REGNO.substring(6, 13)}`
                  )}
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td></td>
                <th>예약일</th>
                <td>
                  <AntdDatePicker
                    defaultValue={moment(reservationInfo.APP_DT)} className="ant-picker-xs" style={{ width: '80%'}}
                    onChange={(val1, val2) => this.setState({ reservationInfo: { ...reservationInfo, APP_DT: val2 }})}
                  />
                </td>
                <th>검진유형</th>
                <td>{reservationInfo.CHK_TYPE && `${reservationInfo.CHK_TYPE}형`}</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <Styled>
          <div className="examination-area">
            {/* <p className="examinaion-title">검진기관 :: <font color="blue">{reservationInfo.HOSPITAL_NAME}</font></p> */}
            {selectedChkType && Object.keys(selectedChkType).length > 0 && (
              <>
                <div className="question-item" key="itemList1">
                  <p className="question-txt">
                    <b>소화기 검사 <font color="red">필수 선택(택1)</font></b> (정확한 검진을 위해 <b>내시경</b>을 권장합니다.)
                  </p>
                  <StyledHtmlTable>
                    <table>
                      <colgroup>
                        <col width="10%" />
                        <col width="50%" />
                        <col width="40%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>선택</th>
                          <th>검진 항목</th>
                          <th>비고</th>
                        </tr>
                      </thead>
                      <tbody>
                      {selectedChkType.itemList.map(group => {
                        if (group.IS_REQUIRE && group.IS_REQUIRE === 'Y') {
                          return (
                            group.ITEMS.map(item => (
                              <tr>
                                <td style={{ textAlign: 'center' }}>
                                  <Checkbox checked={checkedVals.includes(item.ITEM_CODE)} onChange={e => this.onChangeItem(e.target.checked, group, item)} />
                                </td>
                                <td>{item.ITEM_NAME}</td>
                                <td>{item.ITEM_BIGO}</td>
                              </tr>
                            ))
                          )
                        }
                      })}
                      </tbody>
                    </table>
                  </StyledHtmlTable>
                </div>
                <div className="question-item" key="itemList2">
                  <p className="question-txt">
                    <b>필수 선택검진</b>
                    <AntdSelect
                      className="select-sm ml5" style={{ display: 'inline-block', width: 150 }}
                      value={selectedChkType.CHK_TYPE}
                      onChange={val => this.onChangeChkType(val)}
                    >
                      {chkTypeList.map(item => (
                        <AntdSelect.Option value={item.CHK_TYPE}>{`${item.CHK_TYPE}형(${item.CHK_TYPE_NAME})`}</AntdSelect.Option>
                      ))}
                    </AntdSelect>
                  </p>
                  <StyledHtmlTable>
                    <table>
                      <colgroup>
                        <col width="10%" />
                        <col width="40%" />
                        <col width="15%" />
                        <col width="35%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>선택</th>
                          <th>검진 항목</th>
                          <th>구분</th>
                          <th>비고</th>
                        </tr>
                      </thead>
                      <tbody>
                      {selectedChkType.itemList.map(group => {
                        if (!group.IS_REQUIRE || group.IS_REQUIRE !== 'Y') {
                          return (
                            group.ITEMS.map((item, idx) => {
                              let CONTENT = [];
                              if (idx === 0) {
                                CONTENT.push(
                                  <tr>
                                    <td style={{ textAlign: 'center' }}>
                                      <Checkbox checked={checkedVals.includes(item.ITEM_CODE)} onChange={e => this.onChangeItem(e.target.checked, group, item)} />
                                    </td>
                                    <td>{item.ITEM_NAME}</td>
                                    <td rowSpan={group.ITEMS.length} style={{ textAlign: 'center' }}>{`선택(택${group.ABLE_CNT})`}</td>
                                    <td>{item.ITEM_BIGO}</td>
                                  </tr>
                                );
                              } else {
                                CONTENT.push(
                                  <tr>
                                    <td style={{ textAlign: 'center' }}>
                                      <Checkbox checked={checkedVals.includes(item.ITEM_CODE)} onChange={e => this.onChangeItem(e.target.checked, group, item)} />
                                    </td>
                                    <td>{item.ITEM_NAME}</td>
                                    <td>{item.ITEM_BIGO}</td>
                                  </tr>
                                );
                              }
                              return CONTENT;
                            })
                          )
                        }
                      })}
                      </tbody>
                    </table>
                  </StyledHtmlTable>
                </div>
              </>
            )}
          </div>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
            <StyledButton className="btn-primary btn-sm mr5" onClick={this.onSave}>저장</StyledButton>
          </StyledButtonWrapper>
        </Styled>
      </StyledContentsWrapper>
    );
  }
}

class View extends Component {
  render() {
    const { onCancelPopup, selectedRow, onSavePopupAfter } = this.props
    return <BizMicroDevBase sagaKey="DetailView" component={DetailView} onCancelPopup={onCancelPopup} selectedRow={selectedRow} onSavePopupAfter={onSavePopupAfter} />;
  }
}

export default View;

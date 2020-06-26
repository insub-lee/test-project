import React, { Component } from 'react';
import { Checkbox, Select, Table, Card } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import Styled from './Styled';

const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);

class ChkItem extends Component {
  state = {
    chkTypeList: [],
    selectedChkType: {},
    checkedVals: [],
    isNext: false,
  }

  componentWillMount() {
    const { sagaKey, getCallDataHandler, reservationInfo, userInfo } = this.props;
    const apiAry = [
      {
        key: 'chkTypeList',
        url: `/api/eshs/v1/common/health/healthChkHospitalItemList?HOSPITAL_CODE=${reservationInfo.HOSPITAL_CODE}`,
        type: 'GET',
        params: {},
      },
      {
        key: 'myHealthChkList',
        url: `/api/eshs/v1/common/health/healthChkMyList`,
        type: 'POST',
        params: {
          PARAM: {
            SCH_USER_ID: userInfo.USER_ID,
          }
        },
      },
    ];
    getCallDataHandler(sagaKey, apiAry, this.initState);
  }

  initState = () => {
    const { result, checkedVals, reservationInfo } = this.props;
    this.setState({
      chkTypeList: result.chkTypeList && result.chkTypeList.list ? result.chkTypeList.list.map(item => {
        if (item.ITEM_JSON){
          item['itemList'] = JSON.parse(item.ITEM_JSON);
        }
        return { ...item }
      }) : [],
      selectedChkType: result.chkTypeList && result.chkTypeList.list ? 
                      (reservationInfo.CHK_TYPE ? result.chkTypeList.list.filter(item => item.CHK_TYPE === reservationInfo.CHK_TYPE)[0] : result.chkTypeList.list[0]) : '',
      checkedVals: checkedVals || [],
    });
  };

  onChangeChkType = chkType => {
    this.setState(prevState => {
       const { chkTypeList } = prevState;
       return {
         selectedChkType: chkTypeList.filter(item => item.CHK_TYPE === chkType)[0],
         checkedVals: [],
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

  onOk = () => {
    const { selectedChkType, checkedVals } = this.state;
    const selectedItems = [];

    selectedChkType.itemList.forEach(group => {
      group.ITEMS.forEach(item => {
        if (checkedVals.includes(item.ITEM_CODE)) {
          selectedItems.push(item);
        }
      });
    });
    this.props.onOkChkItem(selectedChkType, selectedItems, checkedVals);
  };

  columns = [
    {
      title: '검진년도',
      dataIndex: 'CHK_YEAR',
      key: 'CHK_YEAR',
      align: 'center',
      width: '10%',
    },
    {
      title: '예약자',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      width: '15%',
      render: (text, record) => record.IS_MATE === '0' ? text : record.FAM_NAME,
    },
    {
      title: '예약병원',
      dataIndex: 'HOSPITAL_NAME',
      key: 'HOSPITAL_NAME',
      align: 'center',
      width: '20%',
    },
    {
      title: '검진항목',
      dataIndex: 'CHK_ITEMS',
      key: 'CHK_ITEMS',
    },
    {
      title: '예약날짜',
      dataIndex: 'APP_DT',
      key: 'APP_DT',
      align: 'center',
      width: '15%',
      render: text => text ? moment(text).format('YYYY-MM-DD') : '',
    },
  ];

  render() {
    const { result, reservationInfo } = this.props;
    const { chkTypeList, selectedChkType, checkedVals, isNext } = this.state;

    return (
      <StyledContentsWrapper>
        {!isNext ? (
          <>
            <Card title="▶ 추가 검진 항목 예약">
              <p>대장내시경, MRA검사의 경우 1일 검진 인원이 제한이 있습니다.</p><br />
              <p>검진 희망일에 예약이 안 될 경우,</p><br />
              <p>검진 일정 예약 후 검진기관 담당자께 문의 하여 주시기 바랍니다.</p><br /><br />
              <p><b>*** 문의사항 ***</b></p><br />
              <p>구미 건강관리실 김민아 간호사 (구미:1113)</p><br />
              <p>환경안전팀 박연희 간호사 (청주:4234)</p><br />
            </Card>
            <AntdTable
              columns={this.columns}
              dataSource={result && result.myHealthChkList && result.myHealthChkList.list ? result.myHealthChkList.list : []}
              bordered
              pagination={false}
            />
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
              <StyledButton className="btn-primary btn-sm" onClick={() => this.setState({ isNext: true })}>예약하기</StyledButton>
            </StyledButtonWrapper>
          </>
        ) : (
          <Styled>
            <div className="examination-area">
              <p className="examinaion-title">검진기관 :: <font color="blue">{reservationInfo.HOSPITAL_NAME}</font></p>
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
              <StyledButton className="btn-primary btn-sm mr5" onClick={this.onOk}>확인</StyledButton>
            </StyledButtonWrapper>
          </Styled>
        )}
      </StyledContentsWrapper>
    );
  }
}

export default ChkItem;
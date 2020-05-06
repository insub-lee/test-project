import React, { Component } from 'react';
import { Input, Select, Row, Col, Table, Collapse, Modal } from 'antd';
import { DoubleRightOutlined, PlusOutlined, MinusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledChkHospitalItemView from './StyledChkHospitalItemView';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const { Panel } = Collapse;
const { confirm } = Modal;

class ChkHospitalItemView extends Component {
  state = {
    saveType: '',
    detail: {},
    // detail: {
    //   HOSPITAL_SITE: '',
    //   HOSPITAL_CODE: '',
    //   CHK_TYPE: '',
    //   CHK_TYPE_NAME: '',
    // },
    itemList: [],
    hospitalList: [],
    siteList: [],
    selectedRowKeys: [],
    selectedRows: [],
    activeKeys: [],
    activeGroup: '',
    groupKeyIdx: 1,
    groupList: [],
    selectedItemKeys: [],
    selectedItemRows: [],
    searchText: '',
  }

  componentWillMount() {
    const { sagaKey: id, getCallDataHandler, selectedRow } = this.props;
    const apiAry = [
      {
        key: 'itemList',
        url: `/api/eshs/v1/common/health/healthChkItem`,
        type: 'GET',
      },
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
      },
      {
        key: 'codeList',
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=66`,
        type: 'GET',
      },
    ];
    if (selectedRow && selectedRow.HOSPITAL_CODE && selectedRow.CHK_TYPE) {
      apiAry.push({
        key: 'itemDetail',
        url: `/api/eshs/v1/common/health/healthChkHospitalItem?HOSPITAL_CODE=${selectedRow.HOSPITAL_CODE}&CHK_TYPE=${selectedRow.CHK_TYPE}`,
        type: 'GET',
      })
    }
    getCallDataHandler(id, apiAry, this.initState);
    this.setState({ saveType: selectedRow && selectedRow.HOSPITAL_CODE ? 'U' : 'I' });
  }

  initState = () => {
    const { result, selectedRow } = this.props;
    // 상세
    if (selectedRow && selectedRow.HOSPITAL_CODE && selectedRow.CHK_TYPE && result && result.itemDetail && result.itemDetail.detail) {
      const groupList = JSON.parse(result.itemDetail.detail.ITEM_JSON);
      this.setState({
        detail: result.itemDetail.detail,
        groupList,
        groupKeyIdx: groupList.length + 1,
      });
    } 

    // 검진항목 목록
    if (result && result.itemList && result.itemList.list) {
      if (this.state.groupList && this.state.groupList.length > 0) {
        const itemKeys = [];
        this.state.groupList.forEach(group => {
          group.ITEMS.forEach(item => {
            itemKeys.push(item.ITEM_CODE);
          });
        });
        const selectedItemRows = result.itemList.list.filter(item => itemKeys.includes(item.ITEM_CODE));
        const filterItemList = result.itemList.list.filter(item => !itemKeys.includes(item.ITEM_CODE));

        this.setState({
          itemList: filterItemList,
          selectedItemRows
        });
      } else {
        this.setState({ itemList: result.itemList.list });
      }
    }

    // 검진기관 목록 & 지역
    if (result && result.hospitalList && result.hospitalList.list) {
      const siteList = [];
      result.hospitalList.list.forEach(item => {
        if (!siteList.includes(item.HOSPITAL_SITE)) {
          siteList.push(item.HOSPITAL_SITE);
        }
      });

      this.setState({
        hospitalList: result.hospitalList.list,
        siteList
      });
    }

    // 검진그룹 코드목록
    if (result && result.codeList && result.codeList.categoryMapList) {
      this.setState({ codeList: result.codeList.categoryMapList.filter(item => item.PARENT_NODE_ID === 4512)});
    }
  };

  // 검진항목 체크
  onChangeItemCheck = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  };

  // 그룹 추가
  addGroup = () => {
    if (this.state.groupList.length >= this.state.codeList.length) {
      message.info(<MessageContent>그룹을 더이상 추가할 수 없습니다.</MessageContent>);
      return false;
    }

    this.setState(prevState => {
      const { groupList, groupKeyIdx } = prevState;
      const activeGroup = `panel_${groupKeyIdx}`;
      groupList.push({
        KEY: activeGroup,
        GROUP: '',
        ABLE_CNT: '',
        ITEMS: [],
      });

      return {
        groupList,
        activeKeys: [activeGroup],
        groupKeyIdx: groupKeyIdx + 1,
        activeGroup,
      }
    });
  }

  // 그룹 삭제
  deleteGroup = (e, group) => {
    e.stopPropagation();
    const that = this;
    
    confirm({
      title: '그룹을 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        that.setState(prevState => {
          const { groupList, itemList, selectedItemRows } = prevState;
          const findIndex = groupList.findIndex(item => item.KEY === group.KEY);
          groupList.splice(findIndex, 1);
    
          const itemCodes = group.ITEMS.map(item => item.ITEM_CODE);
          const filterRows = selectedItemRows.filter(item => itemCodes.includes(item.ITEM_CODE));
          const arrItemList = itemList.concat(filterRows);
          arrItemList.sort((a, b) => {
            return a.ITEM_CODE < b.ITEM_CODE ? -1 : a.ITEM_CODE > b.ITEM_CODE ? 1 : 0;
          });
    
          return {
            groupList,
            itemList: arrItemList,
          }
        });
      }
    });
  };

  // 검진항목 그룹에 추가
  addItemInGroup = () => {
    const { itemList, selectedRowKeys } = this.state;

    if (this.state.groupList.length === 0) {
      message.info(<MessageContent>그룹을 추가해 주세요.</MessageContent>);
    } else if (this.state.activeGroup === '' || this.state.activeGroup.length === 0) {
      message.info(<MessageContent>그룹을 선택해 주세요.</MessageContent>);
    } else {
      if (selectedRowKeys.length > 0) {

        // 선택된 체크박스 키로 검진항목 필터
        const addItemList = itemList.filter(item => selectedRowKeys.includes(item.ITEM_CODE));

        // 검진항목 목록에서 추가하는 검진항목 제거
        selectedRowKeys.forEach(key => {
          const idx = itemList.findIndex(item => item.ITEM_CODE === key);
          itemList.splice(idx, 1);
        });
        
        this.setState(prevState => {
          const { groupList, activeGroup, selectedItemRows } = prevState;
          
          // activeGroup에 선택된 검진항목 추가
          const updGroupList = groupList.map(group => {
            if (group.KEY === activeGroup) {
              addItemList.forEach(item => {
                group.ITEMS.push({
                  ...item,
                  ITEM_BIGO: '',
                  DAY_CHK_CNT: '0',
                });
              })
              group.ITEMS.sort((a, b) => {
                return a.ITEM_CODE < b.ITEM_CODE ? -1 : a.ITEM_CODE > b.ITEM_CODE ? 1 : 0; 
              });
            }
            return { ...group }
          });

          // 선택된 검진항목 목록 별도 관리
          const arrItemList = selectedItemRows.concat(addItemList);

          return {
            groupList: updGroupList,        // 그룹목록
            selectedItemRows: arrItemList,  // 추가된 검진항목 목록(검진항목 목록에서 삭제된 목록)
            itemList,                       // 검진항목 목록
            selectedRowKeys: [],            // antdTable에서 사용
            selectedRows: [],               // antdTable에서 사용
          }
        });
      }
    }
  };

  // antdCollapse panel 클릭(show, hide)
  onChangeCollapse = key => {
    this.setState(prevState => {
      const { activeKeys, activeGroup } = prevState;
      let shouldActiveKey = '';
      
      // 열린 panel이 추가됨
      let filterKeys = [];
      let hideKeys = [];
      if (activeKeys.length < key.length) {
        filterKeys = key.filter(item => !activeKeys.includes(item));
      } else {
        filterKeys = activeKeys.filter(item => key.includes(item));
        hideKeys = activeKeys.filter(item => !key.includes(item));
      }

      if (filterKeys.length === 1) {
        if (filterKeys[0] === activeGroup) {
          shouldActiveKey = hideKeys[0];
          key.push(shouldActiveKey);
        } else {
          shouldActiveKey = filterKeys[0];
        }
      } else if (filterKeys.length > 1) {
        filterKeys.sort();
        shouldActiveKey = filterKeys[0];
      }

      return {
        activeKeys: key,
        activeGroup: shouldActiveKey
      }
    });
  };

  // 그룹안의 검진항목 삭제
  removeItemInGroup = row => {
    this.setState(prevState => {
      const { itemList, selectedItemRows, groupList } = prevState;
      const idx = selectedItemRows.findIndex(item => item.ITEM_CODE === row.ITEM_CODE);
      const spliceItem = selectedItemRows.splice(idx, 1);
      itemList.push(spliceItem[0]);

      // 검진항목 코드순 정렬
      itemList.sort((a, b) => {
        return a.ITEM_CODE < b.ITEM_CODE ? -1 : a.ITEM_CODE > b.ITEM_CODE ? 1 : 0;
      });

      // 그룹에서 아이템 제거
      groupList.forEach(group => {
        const fIdx = group.ITEMS.findIndex(item => item.ITEM_CODE === row.ITEM_CODE);
        if (fIdx > -1) {
          group.ITEMS.splice(fIdx, 1);
        }
      })

      return {
        itemList,
        selectedItemRows,
        groupList,
      }
    });
  };

  handleFilterItemList = () => {
    const { result } = this.props;
    this.setState(prevState => {
      const { itemList, searchText } = prevState;
      const filterList = itemList.filter(item => item.ITEM_NAME.indexOf(searchText) > -1);
      return { itemList: searchText.length === 0 ? result.itemList.list : filterList }
    });
  };

  // 지역 변경(변경시 지역에 해당하는 검진기관만 노출)
  onChangeSite = site => {
    const { result: { hospitalList: { list } } } = this.props;
    this.setState({ hospitalList: site ? list.filter(item => item.HOSPITAL_SITE === site) : list });
  };

  // 상세정보 변경(검진기관, 검진유형, 검진유형명)
  onChangeDetail = (key, val) => {
    this.setState(prevState => {
      const { detail } = prevState;
      detail[key] = val;
      return { detail }
    });
  };

  // 검진그룹의 내용변경(동일한 그룹 선택 X)
  onChangeGroupInfo = (key, val, group) => {
    if (key === 'GROUP') {
      const fIdx = this.state.groupList.findIndex(item => item.GROUP === val);
      if (fIdx > -1) {
        message.info(<MessageContent>이미 선택된 그룹입니다.</MessageContent>);
        return false;
      }
    }
    this.setState(prevState => {
      const { groupList } = prevState;
      return {
        groupList: groupList.map(item => {
          if (item.KEY === group.KEY) {
            item[key] = val;
          }
          return { ...item }
        })
      }
    });
  };

  // 검진그룹의 검진항목 내용 변경
  onChangeGroupItemInfo = (key, val, chkItem) => {
    this.setState(prevState => {
      const { groupList } = prevState;
      return {
        groupList: groupList.map(group => {
          group.ITEMS.map(item => {
            if (item.ITEM_CODE === chkItem.ITEM_CODE) {
              item[key] = val;
            }
          })
          return { ...group }
        })
      }
    });
  };

  // 등록 or 수정
  onSave = e => {
    e.stopPropagation();
    const { detail, groupList, saveType } = this.state;
    const { sagaKey, submitHandlerBySaga, onSaveAfter } = this.props;

    // validation check
    if (!detail.HOSPITAL_CODE || detail.HOSPITAL_CODE === '') {
      message.info(<MessageContent>검진기관을 선택해 주세요.</MessageContent>);
      return false;
    }
    if (!detail.CHK_TYPE || detail.CHK_TYPE === '') {
      message.info(<MessageContent>검진유형을 선택해 주세요.</MessageContent>);
      return false;
    }
    if (!detail.CHK_TYPE_NAME || detail.CHK_TYPE_NAME === '') {
      message.info(<MessageContent>검진유형명을 입려해 주세요.</MessageContent>);
      return false;
    }

    if (groupList.length === 0) {
      message.info(<MessageContent>그룹을 추가해 주세요.</MessageContent>);
      return false;
    }
    
    let isValid = true;
    groupList.every(group => {
      if (group.GROUP === '') {
        message.info(<MessageContent>그룹을 선택해 주세요.</MessageContent>);
        isValid = false;
        return false;
      }
      if (group.ABLE_CNT === '') {
        message.info(<MessageContent>선택갯수를 선택해 주세요.</MessageContent>);
        isValid = false;
        return false;
      }
      if (group.ITEMS.length === 0) {
        message.info(<MessageContent>검진항목을 추가해 주세요.</MessageContent>);
        isValid = false;
        return false;
      }
    });

    if (!isValid) {
      return false;
    }

    confirm({
      title: `${saveType === 'I' ? '등록' : '저장'}하시겠습니까?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const submitData = {
          PARAM: {
            ...detail,
            ITEM_JSON: groupList,
          }
        };
        submitHandlerBySaga(sagaKey, (saveType === 'I' ? 'POST' : 'PUT'), '/api/eshs/v1/common/health/healthChkHospitalItem', submitData, (id, response) => {
          if (response) {
            if (response.result === -1) {
              message.info(<MessageContent>이미 등록되어 있는 검진유형입니다.</MessageContent>);
            } else if (response.result > 0) {
              message.info(<MessageContent>{saveType === 'I' ? '등록' : '저장'}하였습니다.</MessageContent>);
              onSaveAfter();
            } else {
              message.error(<MessageContent>{saveType === 'I' ? '등록' : '저장'}에 실패하였습니다.</MessageContent>);
            }
          } else {
            message.error(<MessageContent>시스템 오류</MessageContent>);
          }
        });
      }
    })

  };

  columns = [
    {
      title: '코드',
      dataIndex: 'ITEM_CODE',
      key: 'ITEM_CODE',
      align: 'center',
      width: '20%',
      // children: [
      //   {
      //     title: '',
      //     dataIndex: 'ITEM_CODE',
      //     width: '20%',
      //     align: 'center',
      //   }
      // ]
    },
    {
      title: '검진항목',
      dataIndex: 'ITEM_NAME',
      key: 'ITEM_NAME',
      align: 'center',
      // children: [
      //   {
      //     title: <AntdInput className="ant-input-sm mr5" placeholder="검진항목 검색" onChange={e => this.setState({ searchText: e.target.value })} onPressEnter={this.handleFilterItemList} />,
      //     dataIndex: 'ITEM_NAME',
      //   }
      // ]
    },
  ];

  groupCloumns = [
    {
      title: '',
      dataIndex: 'DEL_ITEM',
      key: 'DEL_ITEM',
      width: '10%',
      render: (text, record) => (
        <StyledButton className="btn-light btn-xxs" onClick={() => this.removeItemInGroup(record)}><MinusOutlined /></StyledButton>
      )
    },
    {
      title: '검진항목',
      dataIndex: 'ITEM_NAME',
      key: 'ITEM_NAME',
      width: '25%',
    },
    {
      title: '일 수검인원',
      dataIndex: 'DAY_CHK_CNT',
      key: 'DAY_CHK_CNT',
      width: '20%',
      align: 'center',
      render: (text, record) => (
        <AntdSelect className="select-sm" defaultValue={text} style={{ width: 100 }} onChange={val => this.onChangeGroupItemInfo('DAY_CHK_CNT', val, record)}>
          <AntdSelect.Option value="0">제한없음</AntdSelect.Option>
          <AntdSelect.Option value="1">1명</AntdSelect.Option>
          <AntdSelect.Option value="2">2명</AntdSelect.Option>
          <AntdSelect.Option value="3">3명</AntdSelect.Option>
          <AntdSelect.Option value="4">4명</AntdSelect.Option>
          <AntdSelect.Option value="5">5명</AntdSelect.Option>
        </AntdSelect>
      )
    },
    {
      title: '비고',
      dataIndex: 'ITEM_BIGO',
      key: 'ITEM_BIGO',
      render: (text, record) => (
        <AntdInput className="ant-input-sm" defaultValue={text} onChange={e => this.onChangeGroupItemInfo('ITEM_BIGO', e.target.value, record)} />
      )
    },
  ];

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onChangeItemCheck
    };

    if (this.state.itemList && this.state.hospitalList && this.state.codeList) {
      return (
        <>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td>
                    <AntdSelect className="select-sm" defaultValue={this.state.detail.HOSPITAL_SITE} placeholder="지역선택" style={{ width: '100%' }} onChange={val => this.onChangeSite(val)}>
                      {this.state.siteList.map(item => (
                        <AntdSelect.Option key={`key_${item}`} value={item}>{item}</AntdSelect.Option>
                      ))}
                    </AntdSelect>
                  </td>
                  <th>검진기관</th>
                  <td>
                    <AntdSelect className="select-sm" defaultValue={this.state.detail.HOSPITAL_CODE}  placeholder="검진기관선택" style={{ width: '100%' }} onChange={val => this.onChangeDetail('HOSPITAL_CODE', val)}>
                      {this.state.hospitalList.map(item => (
                        <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                      ))}
                    </AntdSelect>
                  </td>
                  <th>검진유형</th>
                  <td>
                    <AntdSelect className="select-sm" defaultValue={this.state.detail.CHK_TYPE} placeholder="검진유형선택" style={{ width: '100%' }} onChange={val => this.onChangeDetail('CHK_TYPE', val)}>
                      <AntdSelect.Option value="A">A형</AntdSelect.Option>
                      <AntdSelect.Option value="B">B형</AntdSelect.Option>
                      <AntdSelect.Option value="C">C형</AntdSelect.Option>
                    </AntdSelect>
                  </td>
                  <th>검진유형명</th>
                  <td>
                    <AntdInput className="ant-input-sm" defaultValue={this.state.detail.CHK_TYPE_NAME} onChange={e => this.onChangeDetail('CHK_TYPE_NAME', e.target.value)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <StyledChkHospitalItemView>
            <Row gutter={20}>
              <Col span={8} className="left-wrapper">
                <AntdTable
                  columns={this.columns}
                  dataSource={this.state.itemList.map(item => ({ ...item, key: item.ITEM_CODE }))}
                  rowSelection={rowSelection}
                  pagination={false}
                  scroll={{ y: 455 }}
                />
              </Col>
              <Col span={2} className="col-btn-wrapper">
                <StyledButton className="btn-light" onClick={this.addItemInGroup}>
                  <DoubleRightOutlined />
                </StyledButton>
              </Col>
              <Col span={14} className="right-wrapper">
                <div className="btn-add-area">
                  <StyledButton className="btn-light btn-sm" onClick={this.addGroup}><PlusOutlined /> 그룹추가</StyledButton>
                </div>
                <div className="collapse-wrapper">
                  <Collapse activeKey={this.state.activeKeys} onChange={this.onChangeCollapse}>
                    {this.state.groupList.map(group => (
                      <Panel
                        key={group.KEY}
                        className={this.state.activeGroup === group.KEY ? 'active' : ''}
                        header={
                          <div>
                            <div onClick={e => e.stopPropagation()} style={{ display: 'inline-block' }}>
                              <AntdSelect className="select-sm mr5" value={group.GROUP} placeholder="그룹선택" style={{ width: 150 }} onChange={val => this.onChangeGroupInfo('GROUP', val, group)}>
                                {this.state.codeList.map(item => (
                                  <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                                ))}
                              </AntdSelect>
                              <AntdSelect className="select-sm mr5" defaultValue={group.ABLE_CNT} placeholder="선택갯수" style={{ width: 120 }} onChange={val => this.onChangeGroupInfo('ABLE_CNT', val, group)}>
                                <AntdSelect.Option value="1">1개</AntdSelect.Option>
                                <AntdSelect.Option value="2">2개</AntdSelect.Option>
                                <AntdSelect.Option value="3">3개</AntdSelect.Option>
                                <AntdSelect.Option value="4">4개</AntdSelect.Option>
                                <AntdSelect.Option value="5">5개</AntdSelect.Option>
                              </AntdSelect>
                              <StyledButton className="btn-gray btn-xs" onClick={e => this.deleteGroup(e, group)}>그룹삭제</StyledButton>
                            </div>
                          </div>
                        }
                      >
                        <AntdTable
                          columns={this.groupCloumns}
                          dataSource={group.ITEMS}
                          pagination={false}
                          scroll={{ y: 150 }}
                        />
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              </Col>
            </Row>
          </StyledChkHospitalItemView>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
            <StyledButton className="btn-primary" onClick={e => this.onSave(e)}>{this.state.saveType === 'I' ? '등록' : '저장'}</StyledButton>
          </StyledButtonWrapper>
        </>
      )
    }
    return '';
  }
}

export default ChkHospitalItemView;
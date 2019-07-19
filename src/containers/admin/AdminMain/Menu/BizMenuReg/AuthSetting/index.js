import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { Table } from 'semantic-ui-react';
import { Checkbox, Button } from 'antd';
import { lang } from 'utils/commonUtils';
import ScrollBar from 'react-custom-scrollbars';
// import * as treeFunc from 'containers/common/functions/treeFunc';
// import { fromJS } from 'immutable';

import 'react-router-modal/css/react-router-modal.css';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Organization from 'containers/portal/components/Organization';
import * as commonjs from 'containers/common/functions/common';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import StyleAuthSetting from './StyleAuthSetting';
import StyleAuthSettingContent from './StyleAuthSettingContent';

// ACNT_TYPE : U - 구성원, P - 직위, D - 부서, T - 직책, V - 가상그룹
const USER = 'U';
const DEPT = 'D';
const PSTN = 'P';
const DUTY = 'T';
const GRP = 'V';

/* eslint-disable */
class AuthSetting extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { BIZGRP_ID } = params;
    this.state = {
      BIZGRP_ID: Number(BIZGRP_ID),
      mapList: [],
      leftArr: [],
      topArr: [],
      SEC_TYPE: 'V',
      orgShow: false,
      data: {
        V: {
          users: [],
          depts: [],
          pstns: [],
          dutys: [],
          grps: [],
        },
      },
    };

    this.props.initCategoryData(Number(BIZGRP_ID));
  }

  componentWillReceiveProps(nextProps) {
    const { match, leftArr, topArr, bizMenuSecKeyList } = nextProps;
    const { params } = match;
    const { BIZGRP_ID } = params;

    if (BIZGRP_ID && Number(BIZGRP_ID) !== Number(this.state.BIZGRP_ID)) {
      this.setState({
        BIZGRP_ID: Number(BIZGRP_ID),
      });
      this.props.initCategoryData(Number(BIZGRP_ID));
    }

    // make mapList
    /*
      mapList - object array
      [0] - { id, MENU_ID, ACNT_ID, checked, ...}
      [1] - { id, MENU_ID, ACNT_ID, checked, ...}
      ...
    */
    if (this.state.leftArr.length === 0 && this.state.topArr.length === 0) {
      if (leftArr.length > 0 && topArr.length > 0) {
        const mapList = [];

        for (let i = 0; i < leftArr.length; i += 1) {
          const map = {};
          const left = leftArr[i];
          left.checked = false;

          for (let j = 0; j < topArr.length; j += 1) {
            const top = topArr[j];
            const { ACNT_ID, ACNT_TYPE } = top;
            const { MENU_ID } = left;
            const SEC_TYPE = 'V';
            const id = `${top.ACNT_TYPE}_${top.ACNT_ID}`;
            const key = `${MENU_ID}_${ACNT_ID}_${SEC_TYPE}_${ACNT_TYPE}`;
            top.checked = false;

            map[id] = {
              id,
              key,
              i, // menunum
              j, // authnum
              BIZGRP_ID,
              MENU_ID,
              ACNT_ID,
              ACNT_TYPE,
              SEC_TYPE,
              NODE_TYPE: left.NODE_TYPE,
              checked: bizMenuSecKeyList.includes(key),
            };
          }
          mapList.push(map);
        }

        this.setState({
          leftArr,
          topArr,
          mapList,
          data: {
            V: {
              users: topArr.filter(top => top.ACNT_TYPE === USER),
              depts: topArr.filter(top => top.ACNT_TYPE === DEPT),
              pstns: topArr.filter(top => top.ACNT_TYPE === PSTN),
              dutys: topArr.filter(top => top.ACNT_TYPE === DUTY),
              grps: topArr.filter(top => top.ACNT_TYPE === GRP),
            },
          },
        });
      }
    }
  }

  // insert
  // delete

  changeCheck = (dataList, isCheck) => {
    if (isCheck) {
      this.props.insertAuth(dataList);
    } else {
      this.props.deleteAuth(dataList);
    }
  };

  checkLeftAll(leftArr, mapList, i, isCheck) {
    // 가로선택. id = i
    const left = leftArr[i];
    const map = mapList[i];
    const dataList = [];

    left.checked = isCheck;

    Object.entries(map).forEach(([key, obj_]) => {
      const obj = obj_;
      obj.checked = isCheck;
      map[key] = obj;

      dataList.push(obj);
    });

    this.setState({
      leftArr,
      mapList,
    });

    this.changeCheck(dataList, isCheck);
  }

  checkTopAll(topArr, mapList, j, id, isCheck) {
    // 세로선택. id = ACNT_TYPE_ACNT_ID
    const top = topArr[j];
    const dataList = [];

    top.checked = isCheck;

    mapList.forEach(map => {
      const obj = map[id];
      obj.checked = isCheck;
      dataList.push(obj);
    });

    this.setState({
      topArr,
      mapList,
    });

    this.changeCheck(dataList, isCheck);
  }

  check(mapList, leftArr_, topArr_, data, isCheck) {
    const leftArr = leftArr_;
    const topArr = topArr_;
    const map = mapList[data.i];
    const obj = map[data.id];
    obj.checked = isCheck;

    if (!isCheck) {
      leftArr[data.i].checked = false;
      topArr[data.j].checked = false;
    }

    this.setState({
      mapList,
      leftArr,
      topArr,
    });

    this.changeCheck([{ ...obj }], isCheck);
  }

  makeTableBody(mapList, leftArr, topArr) {
    const tableCellArr = [];

    leftArr.forEach((left, i) => {
      const title = lang.get('NAME', left);

      let blank = '';
      for (let x = 1; x < left.LVL; x += 1) {
        blank += '　';
      }

      const map = mapList[i];

      const row = (
        <Table.Row key={left.MENU_ID}>
          <Table.Cell>{`${blank}${title}`}</Table.Cell>
          <Table.Cell>
            {/* Left HeaderCell */
            left.NODE_TYPE !== 'F' ? (
              <Checkbox
                key={`left/${left.MENU_ID}`}
                checked={left.checked}
                onChange={e => {
                  this.checkLeftAll(leftArr, mapList, i, e.target.checked);
                }}
              />
            ) : (
              ''
            )}
          </Table.Cell>
          {Object.keys(map).map(key => {
            const data = map[key];
            return (
              <Table.Cell>
                {data.NODE_TYPE !== 'F' ? (
                  <Checkbox
                    key={`${data.id}`}
                    checked={data.checked}
                    onChange={e => {
                      this.check(mapList, leftArr, topArr, data, e.target.checked);
                    }}
                  />
                ) : (
                  ''
                )}
              </Table.Cell>
            );
          })}
        </Table.Row>
      );

      tableCellArr.push(row);
    });

    return tableCellArr;
  }

  managerOrgOpen = () => {
    this.setState({
      orgShow: true,
    });
  };

  orgClose = () => {
    this.setState({
      orgShow: false,
    });
  };

  getOrgData = (data, ACNT_TYPE) => {
    return data.filter(o => o.ACNT_TYPE === ACNT_TYPE);
  };

  getDataFromOrganization = result => {
    const { checkedDept, checkedDuty, checkedGrp, checkedPstn, selectedUsers } = result;
    const { SEC_TYPE } = this.state;
    let topArr = [];

    topArr = topArr.concat(this.convertOrgData(checkedDept, 'id', SEC_TYPE, DEPT));
    topArr = topArr.concat(this.convertOrgData(checkedDuty, 'id', SEC_TYPE, DUTY));
    topArr = topArr.concat(this.convertOrgData(checkedGrp, 'id', SEC_TYPE, GRP));
    topArr = topArr.concat(this.convertOrgData(checkedPstn, 'id', SEC_TYPE, PSTN));
    topArr = topArr.concat(this.convertOrgData(selectedUsers, 'USER_ID', SEC_TYPE, USER));

    this.initMapList(topArr);
  };

  initMapList = topArr => {
    const { leftArr, bizMenuSecKeyList } = this.props;
    const { BIZGRP_ID, SEC_TYPE } = this.state;
    if (leftArr.length > 0 && topArr.length > 0) {
      const mapList = [];

      leftArr.forEach((left, i) => {
        const map = {};

        topArr.forEach((top, j) => {
          const id = `${top.ACNT_TYPE}_${top.ACNT_ID}`;
          const key = `${left.MENU_ID}_${top.ACNT_ID}_${SEC_TYPE}_${top.ACNT_TYPE}`;
          top.checked = top.checked === undefined ? false : top.checked;

          map[id] = {
            id,
            key,
            i, // menunum
            j, // authnum
            BIZGRP_ID: BIZGRP_ID.toString(),
            MENU_ID: left.MENU_ID,
            ACNT_ID: top.ACNT_ID,
            ACNT_TYPE: top.ACNT_TYPE,
            SEC_TYPE,
            NODE_TYPE: left.NODE_TYPE,
            checked: bizMenuSecKeyList.includes(key),
          };
        });
        mapList.push(map);
      });

      this.setState({
        topArr,
        mapList,
        data: {
          V: {
            users: topArr.filter(top => top.ACNT_TYPE === USER),
            depts: topArr.filter(top => top.ACNT_TYPE === DEPT),
            pstns: topArr.filter(top => top.ACNT_TYPE === PSTN),
            dutys: topArr.filter(top => top.ACNT_TYPE === DUTY),
            grps: topArr.filter(top => top.ACNT_TYPE === GRP),
          },
        },
      });

      //todo
      //새로 추가된 부서 또는 사용자 DB저장
      this.props.insertBizGroupAuth(topArr);
    }
  };

  // 각 ACNT_TYPE 별 id가 다름.
  convertOrgData = (newarr, ACNT_ID, SEC_TYPE, ACNT_TYPE) => {
    const { BIZGRP_ID } = this.state;
    return newarr.map(m => {
      const m2 = m;
      m2.ACNT_ID = m2[ACNT_ID] !== undefined ? m2[ACNT_ID] : m2[ACNT_ID.toUpperCase()];
      m2.SEC_TYPE = SEC_TYPE;
      m2.ACNT_TYPE = ACNT_TYPE;
      m2.USER_ID = m2[ACNT_ID] !== undefined ? m2[ACNT_ID] : m2[ACNT_ID.toUpperCase()];
      m2.ID = m2[ACNT_ID] !== undefined ? m2[ACNT_ID] : m2[ACNT_ID.toUpperCase()];
      m2.TITLE = m.NAME_KOR;
      m2.TITLE_KOR = m.NAME_KOR;
      m2.BIZGRP_ID = BIZGRP_ID.toString();
      m2.checked = false;
      return m2;
    });
  };

  render() {
    const { mapList, leftArr, topArr, data } = this.state;
    const { history, bizGroupInfo } = this.props;

    const oldUsers = data.V.users;
    const oldDepts = data.V.depts;
    const oldPstns = data.V.pstns;
    const oldDutys = data.V.dutys;
    const oldGrps = data.V.grps;

    const preUrl = this.props.match.url.substr(0, this.props.match.url.indexOf('/authSetting'));

    return (
      <div
        className="settingsPage"
        style={{
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
        }}
      >
        <Organization
          show={this.state.orgShow}
          closeModal={this.orgClose}
          userTab={true}
          pstnTab={true}
          dutyTab={true}
          grpTab={true}
          // 조직도 모달창으로 가져갈 데이터
          selectedUsers={oldUsers.slice()}
          checkedDept={oldDepts.slice()}
          checkedPstn={oldPstns.slice()}
          checkedDuty={oldDutys.slice()}
          checkedGrp={oldGrps.slice()}
          // 조직도 모달창으로부터 데이터 가져오는 함수
          getDataFromOrganization={this.getDataFromOrganization}
        />

        <StyleAuthSetting className="userSetting">
          <div className="userSettingWrapper">
            <h2 className="pageHeader">
              권한 설정
              <Button className="authAdd" onClick={this.managerOrgOpen}>
                권한추가
              </Button>
              <Button
                className="modalClose"
                onClick={() => {
                  history.push(`${preUrl}/bizMenuReg/info/${bizGroupInfo.BIZGRP_ID}`);
                }}
                title=""
              />
            </h2>
            {/* <h2 className="adTitle">{lang.get('NAME', bizGroupInfo)}</h2> */}
            <StyleAuthSettingContent>
              <ScrollBar autoHide autoHideTimeout={1000} style={{ height: 'calc(100vh - 90px)', marginTop: 15 }}>
                <Table size="small" className="BizAuthTable" collapsing>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell style={{ textAlign: 'left' }}>{lang.get('NAME', bizGroupInfo)}</Table.HeaderCell>
                      <Table.HeaderCell />
                      {/* Top HeaderCell */
                      topArr &&
                        topArr.map((top, j) => {
                          const id = `${top.ACNT_TYPE}_${top.ACNT_ID}`;
                          return (
                            <Table.HeaderCell>
                              <div>
                                <p title={top.NAME_KOR}>{top.NAME_KOR}</p>
                              </div>
                              <Checkbox
                                key={`top/${id}`}
                                checked={top.checked}
                                onChange={e => {
                                  this.checkTopAll(topArr, mapList, j, id, e.target.checked);
                                }}
                              />
                            </Table.HeaderCell>
                          );
                        })}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{leftArr.length > 0 && mapList.length > 0 ? this.makeTableBody(mapList, leftArr, topArr) : ''}</Table.Body>
                </Table>
              </ScrollBar>
            </StyleAuthSettingContent>
          </div>
        </StyleAuthSetting>
      </div>
    );
  }
}

AuthSetting.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,

  bizGroupInfo: PropTypes.object.isRequired,
  leftArr: PropTypes.array.isRequired,
  topArr: PropTypes.array.isRequired,
  bizMenuSecKeyList: PropTypes.array.isRequired,
  initCategoryData: PropTypes.func.isRequired,

  insertAuth: PropTypes.func.isRequired,
  deleteAuth: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    initCategoryData: BIZGRP_ID => dispatch(actions.initCategoryData(BIZGRP_ID)),
    insertAuth: dataList => dispatch(actions.insertAuth(dataList)),
    deleteAuth: dataList => dispatch(actions.deleteAuth(dataList)),
    insertBizGroupAuth: dataList => dispatch(actions.insertBizGroupAuth(dataList)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  leftArr: selectors.makeCategoryData(),
  bizGroupInfo: selectors.makeBizGroupInfo(),
  topArr: selectors.makeAuthArr(),
  bizMenuSecKeyList: selectors.makeBizMenuSecKeyList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin/AdminMain/Menu/BizMenuReg/AuthSetting', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/Menu/BizMenuReg/AuthSetting', saga });

export default injectIntl(
  compose(
    withReducer,
    withConnect,
    withSaga,
  )(AuthSetting),
);

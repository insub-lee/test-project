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

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import StyleAuthSetting from './StyleAuthSetting';
import StyleAuthSettingContent from './StyleAuthSettingContent';

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
        });
      }
    }
  }

  // insert
  // delete

  changeCheck(dataList, isCheck) {
    if (isCheck) {
      this.props.insertAuth(dataList);
    } else {
      this.props.deleteAuth(dataList);
    }
  }

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
            {left.NODE_TYPE !== 'F' && (
              <Checkbox
                key={`left/${left.MENU_ID}`}
                checked={left.checked}
                onChange={e => {
                  this.checkLeftAll(leftArr, mapList, i, e.target.checked);
                }}
              />
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

  render() {
    const { mapList, leftArr, topArr } = this.state;

    const { history, bizGroupInfo } = this.props;

    return (
      <div className="settingsPage">
        <StyleAuthSetting className="userSetting">
          <div className="userSettingWrapper">
            <h2 className="pageHeader">
              권한 설정
              <Button
                className="modalClose"
                onClick={() => {
                  history.push(`/portal/store/appMain/bizManage/bizMenuReg/info/${bizGroupInfo.BIZGRP_ID}`);
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
                      {topArr &&
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
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  leftArr: selectors.makeCategoryData(),
  bizGroupInfo: selectors.makeBizGroupInfo(),
  topArr: selectors.makeAuthArr(),
  bizMenuSecKeyList: selectors.makeBizMenuSecKeyList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bizmenuAuthsetting', reducer });
const withSaga = injectSaga({ key: 'bizmenuAuthsetting', saga });

export default injectIntl(compose(withReducer, withSaga, withConnect)(AuthSetting));

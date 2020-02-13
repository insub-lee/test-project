import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Table } from 'semantic-ui-react';
import { Checkbox } from 'antd';
import { intlObj, lang } from 'utils/commonUtils';
import { fromJS } from 'immutable';
import messages from './messages';

import UserSearchWrapper from './userSearch.style';

// A - 관리자, U - 사용자
const ADMIN_GRP = 'A';
const USER_GRP = 'U';

const checkBoxValue = ['V', 'I', 'U', 'D'];
const checkBoxLabel = ['조회', '작성', '수정', '삭제'];

const adminCheckBoxValue = ['M', 'G'];
const adminCheckBoxLabel = ['업무카드관리', '사용자권한관리'];

class OrgDetailReturnView extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      managerList: prop.managerList != null ? prop.managerList : [],
      userList: prop.userList != null ? prop.userList : [],
      pstnList: prop.pstnList != null ? prop.pstnList : [],
      deptList: prop.deptList != null ? prop.deptList : [],
      dutyList: prop.dutyList != null ? prop.dutyList : [],
      grpList: prop.grpList != null ? prop.grpList : [],
      // managerList: [],
      // userList: [],
      // pstnList: [],
      // deptList: [],
      // dutyList: [],
      // grpList: [],
      delFlag: prop.delFlag,
      scroll: prop.scroll,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      managerList: nextProps.managerList != null ? nextProps.managerList : [],
      userList: nextProps.userList != null ? nextProps.userList : [],
      pstnList: nextProps.pstnList != null ? nextProps.pstnList : [],
      deptList: nextProps.deptList != null ? nextProps.deptList : [],
      dutyList: nextProps.dutyList != null ? nextProps.dutyList : [],
      grpList: nextProps.grpList != null ? nextProps.grpList : [],
    });
  }
  // componentDidUpdate(prevProps, prevState) { //eslint-disable-line
  //   if (this.props.managerList.toString() !== prevProps.managerList.toString()) {
  //     this.state.managerList = this.props.managerList;
  //   }
  //   if (this.props.userList.toString() !== prevProps.userList.toString()) {
  //     this.state.userList = this.props.userList;
  //   }
  //   if (this.props.pstnList.toString() !== prevProps.pstnList.toString()) {
  //     this.state.pstnList = this.props.pstnList;
  //   }
  //   if (this.props.deptList.toString() !== prevProps.deptList.toString()) {
  //     this.state.deptList = this.props.deptList;
  //   }
  //   if (this.props.dutyList.toString() !== prevProps.dutyList.toString()) {
  //     this.state.dutyList = this.props.dutyList;
  //   }
  //   if (this.props.grpList.toString() !== prevProps.grpList.toString()) {
  //     this.state.grpList = this.props.grpList;
  //   }
  // }

  managerDel = index => {
    const tmpArr = fromJS(this.state.managerList).toJS();
    tmpArr.splice(index, 1);
    this.setState({
      managerList: tmpArr,
    });
    this.props.returnManagerList(tmpArr);
  };

  userDel = index => {
    const tmpArr = fromJS(this.state.userList).toJS();
    tmpArr.splice(index, 1);
    this.setState({
      userList: tmpArr,
    });
    this.props.returnUserList(tmpArr);
  };

  dutyDel = index => {
    const tmpArr = fromJS(this.state.dutyList).toJS();
    tmpArr.splice(index, 1);
    this.setState({
      dutyList: tmpArr,
    });
    this.props.returnDutyList(tmpArr);
  };

  pstnDel = index => {
    const tmpArr = fromJS(this.state.pstnList).toJS();
    tmpArr.splice(index, 1);
    this.setState({
      pstnList: tmpArr,
    });
    this.props.returnPstnList(tmpArr);
  };

  grpDel = index => {
    const tmpArr = fromJS(this.state.grpList).toJS();
    tmpArr.splice(index, 1);
    this.setState({
      grpList: tmpArr,
    });
    this.props.returnGrpList(tmpArr);
  };

  deptDel = index => {
    const tmpArr = fromJS(this.state.deptList).toJS();
    tmpArr.splice(index, 1);
    this.setState({
      deptList: tmpArr,
    });
    this.props.returnDetpList(tmpArr);
  };

  setAuth = (authArray, type, flag) => {
    if (flag) {
      if (type === 'A') return this.props.grpType === USER_GRP ? checkBoxValue.join(',') : adminCheckBoxValue.join(',');
      if (authArray.indexOf(type) === -1) authArray.push(type);
      return authArray.filter(a => a.trim()).join(',');
    }
    if (type === 'A') return '';
    return authArray.filter(a => a !== type).join(',');
  };

  onChange = (e, type, index) => {
    switch (type) {
      case 'V':
        this.setState(
          prevState => {
            const { grpList } = prevState;
            const authArray = grpList[index].AUTH_TYPE ? grpList[index].AUTH_TYPE.split(',') : [];
            grpList[index].AUTH_TYPE = this.setAuth(authArray, e.target.value, e.target.checked);
            return {
              grpList,
            };
          },
          () => this.props.returnGrpList(this.state.grpList),
        );
        break;
      case 'D':
        this.setState(
          prevState => {
            const { deptList } = prevState;
            const authArray = deptList[index].AUTH_TYPE ? deptList[index].AUTH_TYPE.split(',') : [];
            deptList[index].AUTH_TYPE = this.setAuth(authArray, e.target.value, e.target.checked);
            return {
              deptList,
            };
          },
          () => this.props.returnDetpList(this.state.deptList),
        );
        break;
      case 'P':
        this.setState(
          prevState => {
            const { pstnList } = prevState;
            const authArray = pstnList[index].AUTH_TYPE ? pstnList[index].AUTH_TYPE.split(',') : [];
            pstnList[index].AUTH_TYPE = this.setAuth(authArray, e.target.value, e.target.checked);
            return {
              pstnList,
            };
          },
          () => this.props.returnPstnList(this.state.pstnList),
        );
        break;
      case 'T':
        this.setState(
          prevState => {
            const { dutyList } = prevState;
            const authArray = dutyList[index].AUTH_TYPE ? dutyList[index].AUTH_TYPE.split(',') : [];
            dutyList[index].AUTH_TYPE = this.setAuth(authArray, e.target.value, e.target.checked);
            return {
              dutyList,
            };
          },
          () => this.props.returnDutyList(this.state.dutyList),
        );
        break;
      case 'U':
        this.setState(
          prevState => {
            const { userList } = prevState;
            const authArray = userList[index].AUTH_TYPE ? userList[index].AUTH_TYPE.split(',') : [];
            userList[index].AUTH_TYPE = this.setAuth(authArray, e.target.value, e.target.checked);
            return {
              userList,
            };
          },
          () => this.props.returnUserList(this.state.userList),
        );
        break;
      default:
        break;
    }
  };

  generateAuthCheckboxHeader = title => (
    <>
      <Table.Cell className="groupName" style={{ width: 'auto' }}>
        {intlObj.get(title)}
      </Table.Cell>
      <Table.Cell className="groupName" style={{ width: 'auto' }}>
        전체
      </Table.Cell>
      {this.props.grpType === USER_GRP
        ? checkBoxLabel.map(label => (
            <Table.Cell className="groupName" style={{ width: 'auto' }}>
              {label}
            </Table.Cell>
          ))
        : adminCheckBoxLabel.map(label => (
            <Table.Cell className="groupName" style={{ width: 'auto' }}>
              {label}
            </Table.Cell>
          ))}
      <Table.Cell className="groupName" style={{ width: 'auto' }} />
    </>
  );

  generateAuthCheckbox = (sec, index) => {
    const checkAuth = this.props.grpType === USER_GRP ? checkBoxValue : adminCheckBoxValue;
    const authArray = sec.AUTH_TYPE ? sec.AUTH_TYPE.split(',') : [];
    const checkAll = JSON.stringify(authArray.sort()) === JSON.stringify([...checkAuth].sort());
    return (
      /*
      sec.ACNT_TYPE = V, D, P, T, U
      sec.AUTH_GRP = A(관리자), U(사용자)
      sec.AUTH_TYPE = I, V, U, D
      */
      <>
        <Table.Cell align="center">
          <Checkbox
            value="A"
            onChange={e => {
              this.onChange(e, sec.ACNT_TYPE, index);
            }}
            indeterminate={!checkAll && sec.AUTH_TYPE}
            checked={checkAll}
          />
        </Table.Cell>
        {this.props.grpType === USER_GRP
          ? checkBoxValue.map(value => (
              <Table.Cell align="center">
                <Checkbox
                  value={value}
                  onChange={e => {
                    this.onChange(e, sec.ACNT_TYPE, index);
                  }}
                  checked={authArray.indexOf(value) > -1}
                />
              </Table.Cell>
            ))
          : adminCheckBoxValue.map(value => (
              <Table.Cell align="center">
                <Checkbox
                  value={value}
                  onChange={e => {
                    this.onChange(e, sec.ACNT_TYPE, index);
                  }}
                  checked={authArray.indexOf(value) > -1}
                />
              </Table.Cell>
            ))}
      </>
    );
  };

  render() {
    const RenderSearchViewScroll = props => (
      <div className="message">
        <Scrollbars className="custom-scrollbar" autoHeight autoHeightMin={41} autoHeightMax={197}>
          <div className="resultsTableWrapper">
            <Table size="small" style={{ width: '100%' }}>
              <Table.Body>
                {props.deptList.length > 0 ? (
                  <Table.Row style={{ borderBottom: 0 }}>{this.generateAuthCheckboxHeader(messages.dept)}</Table.Row>
                ) : (
                  <Table.Row>
                    <Table.Cell style={{ display: 'none' }} />
                  </Table.Row>
                )}
                {props.deptList.map((dept, index) => (
                  <Table.Row key={dept.id} style={{ cursor: 'pointer' }}>
                    <Table.Cell textAlign="left">
                      <p style={{ marginLeft: 5 }} className="ellipsis">
                        {lang.get('NAME', dept)}
                      </p>
                    </Table.Cell>
                    {this.generateAuthCheckbox(dept, index)}
                    <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                      <button onClick={() => this.deptDel(index)} className="delete">
                        {intlObj.get(messages.del)}
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {props.grpList.length > 0 ? (
                  <Table.Row style={{ borderBottom: 0 }}>{this.generateAuthCheckboxHeader(messages.grp)}</Table.Row>
                ) : (
                  <Table.Row>
                    <Table.Cell style={{ display: 'none' }} />
                  </Table.Row>
                )}
                {props.grpList.map((grp, index) => (
                  <Table.Row key={grp.id || grp.ID} style={{ cursor: 'pointer' }}>
                    <Table.Cell textAlign="left">
                      <p style={{ marginLeft: 5 }} className="ellipsis">
                        {lang.get('NAME', grp)}
                      </p>
                    </Table.Cell>
                    {this.generateAuthCheckbox(grp, index)}
                    <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                      <button type="button" onClick={() => this.grpDel(index)} className="delete">
                        {intlObj.get(messages.del)}
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {props.pstnList.length > 0 ? (
                  <Table.Row style={{ borderBottom: 0 }}>{this.generateAuthCheckboxHeader(messages.pstn)}</Table.Row>
                ) : (
                  <Table.Row>
                    <Table.Cell style={{ display: 'none' }} />
                  </Table.Row>
                )}
                {props.pstnList.map((pstn, index) => (
                  <Table.Row key={pstn.id} style={{ cursor: 'pointer' }}>
                    <Table.Cell textAlign="left">
                      <p style={{ marginLeft: 5 }} className="ellipsis">
                        {lang.get('NAME', pstn)}
                      </p>
                    </Table.Cell>
                    {this.generateAuthCheckbox(pstn, index)}
                    <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                      <button onClick={() => this.pstnDel(index)} className="delete">
                        {intlObj.get(messages.del)}
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {props.dutyList.length > 0 ? (
                  <Table.Row style={{ borderBottom: 0 }}>{this.generateAuthCheckboxHeader(messages.duty)}</Table.Row>
                ) : (
                  <Table.Row>
                    <Table.Cell style={{ display: 'none' }} />
                  </Table.Row>
                )}
                {props.dutyList.map((duty, index) => (
                  <Table.Row key={duty.id} style={{ cursor: 'pointer' }}>
                    <Table.Cell textAlign="left">
                      <p style={{ marginLeft: 5 }} className="ellipsis">
                        {lang.get('NAME', duty)}
                      </p>
                    </Table.Cell>
                    {this.generateAuthCheckbox(duty, index)}
                    <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                      <button onClick={() => this.dutyDel(index)} className="delete">
                        {intlObj.get(messages.del)}
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {props.userList.length > 0 ? (
                  <Table.Row style={{ borderBottom: 0 }}>{this.generateAuthCheckboxHeader(messages.user)}</Table.Row>
                ) : (
                  <Table.Row>
                    <Table.Cell style={{ display: 'none' }} />
                  </Table.Row>
                )}
                {props.userList.map((user, index) => (
                  <Table.Row key={user.EMP_NO} style={{ cursor: 'pointer' }}>
                    <Table.Cell className="userPic">
                      <div
                        role="presentation"
                        onError={e => {
                          e.target.src = '/no_img_pro.jpg';
                        }}
                      >
                        <img className="listImg" src={`/img/thumb/200x200/${user.PHOTO}`} alt={lang.get('NAME', user)} />
                      </div>
                      <p style={{ marginLeft: 5 }} className="ellipsis">
                        {lang.get('NAME', user)}({user.EMP_NO})&nbsp;{user.MGR_TYPE}/{lang.get('DEPT_NAME', user)}/{lang.get('PSTN_NAME', user)}
                      </p>
                    </Table.Cell>
                    {this.generateAuthCheckbox(user, index)}
                    <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                      <button onClick={() => this.userDel(index)} className="delete">
                        {intlObj.get(messages.del)}
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {props.managerList.map((manager, index) => (
                  <Table.Row key={manager.EMP_NO} style={{ cursor: 'pointer' }}>
                    <Table.Cell className="userPic">
                      <div
                        role="presentation"
                        onError={e => {
                          e.target.src = '/no_img_pro.jpg';
                        }}
                      >
                        <img className="listImg" src={`/img/thumb/200x200/${manager.PHOTO}`} alt={lang.get('NAME', manager)} />
                      </div>
                      <p style={{ marginLeft: 5 }} className="ellipsis">
                        {lang.get('NAME', manager)}({manager.EMP_NO})&nbsp;{manager.MGR_TYPE}/{lang.get('DEPT_NAME', manager)}/{lang.get('PSTN_NAME', manager)}
                      </p>
                    </Table.Cell>
                    {this.generateAuthCheckbox(manager, index)}
                    <Table.Cell textAlign="left" style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                      <button onClick={() => this.managerDel(index)} className="delete">
                        {intlObj.get(messages.del)}
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Scrollbars>
      </div>
    );
    const RenderSearchView = props => (
      <div className="message">
        <div className="resultsTableWrapper">
          <Table size="small" style={{ width: '100%' }}>
            <Table.Body>
              {props.deptList.length > 0 ? (
                <Table.Row style={{ borderBottom: 0 }}>
                  <Table.Cell colSpan="7" className="groupName">
                    {intlObj.get(messages.dept)}
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell style={{ display: 'none' }} />
                </Table.Row>
              )}
              {props.deptList.map((dept, index) => (
                <Table.Row key={dept.ACNT_ID} style={{ cursor: 'pointer' }}>
                  <Table.Cell textAlign="left">
                    <p style={{ marginLeft: 5 }} className="ellipsis">
                      {lang.get('NAME', dept)}
                    </p>
                  </Table.Cell>
                  <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                    <button onClick={() => this.deptDel(index)} className="delete">
                      {intlObj.get(messages.del)}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
              {props.grpList.length > 0 ? (
                <Table.Row style={{ borderBottom: 0 }}>
                  <Table.Cell colSpan="7" className="groupName">
                    {intlObj.get(messages.grp)}
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell style={{ display: 'none' }} />
                </Table.Row>
              )}
              {props.grpList.map((grp, index) => (
                <Table.Row key={grp.ACNT_ID} style={{ cursor: 'pointer' }}>
                  <Table.Cell textAlign="left">
                    <p style={{ marginLeft: 5 }} className="ellipsis">
                      {lang.get('NAME', grp)}
                    </p>
                  </Table.Cell>
                  <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                    <button onClick={() => this.grpDel(index)} className="delete">
                      {intlObj.get(messages.del)}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
              {props.pstnList.length > 0 ? (
                <Table.Row style={{ borderBottom: 0 }}>
                  <Table.Cell colSpan="7" className="groupName">
                    {intlObj.get(messages.pstn)}
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell style={{ display: 'none' }} />
                </Table.Row>
              )}
              {props.pstnList.map((pstn, index) => (
                <Table.Row key={pstn.ACNT_ID} style={{ cursor: 'pointer' }}>
                  <Table.Cell textAlign="left">
                    <p style={{ marginLeft: 5 }} className="ellipsis">
                      {lang.get('NAME', pstn)}
                    </p>
                  </Table.Cell>
                  <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                    <button onClick={() => this.pstnDel(index)} className="delete">
                      {intlObj.get(messages.del)}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
              {props.dutyList.length > 0 ? (
                <Table.Row style={{ borderBottom: 0 }}>
                  <Table.Cell colSpan="7" className="groupName">
                    {intlObj.get(messages.duty)}
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell style={{ display: 'none' }} />
                </Table.Row>
              )}
              {props.dutyList.map((duty, index) => (
                <Table.Row key={duty.ACNT_ID} style={{ cursor: 'pointer' }}>
                  <Table.Cell textAlign="left">
                    <p style={{ marginLeft: 5 }} className="ellipsis">
                      {lang.get('NAME', duty)}
                    </p>
                  </Table.Cell>
                  <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                    <button onClick={() => this.dutyDel(index)} className="delete">
                      {intlObj.get(messages.del)}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
              {props.userList.length > 0 ? (
                <Table.Row style={{ borderBottom: 0 }}>
                  <Table.Cell colSpan={this.props.grpType === USER_GRP ? 7 : 5} className="groupName">
                    {intlObj.get(messages.user)}
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell style={{ height: 0 }} />
                </Table.Row>
              )}
              {props.userList.map((user, index) => (
                <Table.Row key={user.EMP_NO} style={{ cursor: 'pointer' }}>
                  <Table.Cell className="userPic">
                    <div
                      role="presentation"
                      onError={e => {
                        e.target.src = '/no_img_pro.jpg';
                      }}
                    >
                      <img className="listImg" src={`/img/thumb/200x200/${user.PHOTO}`} alt={lang.get('NAME', user)} />
                    </div>
                    <p style={{ marginLeft: 5 }} className="ellipsis">
                      {lang.get('NAME', user)}({user.EMP_NO})&nbsp;{user.MGR_TYPE}/{lang.get('DEPT_NAME', user)}/{lang.get('PSTN_NAME', user)}
                    </p>
                  </Table.Cell>
                  <Table.Cell style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                    <button onClick={() => this.userDel(index)} className="delete">
                      {intlObj.get(messages.del)}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
              {props.managerList.map((manager, index) => (
                <Table.Row key={manager.EMP_NO} style={{ cursor: 'pointer' }}>
                  <Table.Cell className="userPic">
                    <div
                      role="presentation"
                      onError={e => {
                        e.target.src = '/no_img_pro.jpg';
                      }}
                    >
                      <img className="listImg" src={`/img/thumb/200x200/${manager.PHOTO}`} alt={lang.get('NAME', manager)} />
                    </div>
                    <p style={{ marginLeft: 5 }} className="ellipsis">
                      {lang.get('NAME', manager)}({manager.EMP_NO})&nbsp;{manager.MGR_TYPE}/{lang.get('DEPT_NAME', manager)}/{lang.get('PSTN_NAME', manager)}
                    </p>
                  </Table.Cell>
                  <Table.Cell textAlign="left" style={{ display: this.state.delFlag ? 'block' : 'none' }}>
                    <button onClick={() => this.managerDel(index)} className="delete">
                      {intlObj.get(messages.del)}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
    return (
      <div align="left">
        <UserSearchWrapper>
          <div className="mSearchWrapper" style={{ position: 'relative', padding: 0, margin: 0 }}>
            {this.state.scroll === 0 && this.state.scroll !== null ? RenderSearchView(this.state) : RenderSearchViewScroll(this.state)}
          </div>
        </UserSearchWrapper>
      </div>
    );
  }
}

OrgDetailReturnView.propTypes = {
  grpType: PropTypes.string, //eslint-disable-line
  userList: PropTypes.array, //eslint-disable-line
  pstnList: PropTypes.array, //eslint-disable-line
  deptList: PropTypes.array, //eslint-disable-line
  dutyList: PropTypes.array, //eslint-disable-line
  grpList: PropTypes.array, //eslint-disable-line
  managerList: PropTypes.array, //eslint-disable-line
  returnManagerList: PropTypes.func, //eslint-disable-line
  returnUserList: PropTypes.func, //eslint-disable-line
  returnDutyList: PropTypes.func, //eslint-disable-line
  returnPstnList: PropTypes.func, //eslint-disable-line
  returnGrpList: PropTypes.func, //eslint-disable-line
  returnDetpList: PropTypes.func, //eslint-disable-line
};

// OrgReturnView.defaultProps = {
//   userList: [],
//   pstnList: [],
//   deptList: [],
//   dutyList: [],
//   grpList: [],
//   managerList: [],
// };

export default OrgDetailReturnView;

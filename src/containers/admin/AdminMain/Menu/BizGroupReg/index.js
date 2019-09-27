/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio, Checkbox, Icon } from 'antd';
import { intlObj, imgUrl, lang } from 'utils/commonUtils';
import AppMaNagerList from 'components/OrgReturnView';
import Organization from 'containers/portal/components/Organization';
import OrganizationRole from 'components/OrganizationRole';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as feed from 'components/Feedback/functions';
import * as actionsLoading from 'containers/common/Loading/actions';

import { fromJS } from 'immutable';
import { injectIntl } from 'react-intl';
import Upload from 'components/Upload';
// import MyAppCategoryModal from 'containers/store/AppMain/MyApp/MyAppCategoryModal';
import MyAppCategoryModal from 'containers/admin/AdminMain/App/AppCategoryModal';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Footer from 'containers/admin/App/Footer';
import * as selectors from './selectors';
import * as menuSelectors from '../selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import StyledButton from '../../../../../components/Button/StyledButton';
import { LinkBtnLgtGray, BtnDkGray } from '../../../components/uielements/buttons.style';
import AntRadiobox from '../../../components/uielements/radiobox.style';
import messages from '../messages';
import { StyleGroupReg } from './StyleGroupReg';

const FormItem = Form.Item;
const RadioGroup = AntRadiobox(Radio.Group);

// SEC_TYPE : I - 관리자, V - 조회권한
const MANAGER = 'I';
const VIEWAUTH = 'V';

// ACNT_TYPE : U - 구성원, P - 직위, D - 부서, T - 직책, V - 가상그룹
const USER = 'U';
const DEPT = 'D';
const PSTN = 'P';
const DUTY = 'T';
const GRP = 'V';

// 각 ACNT_TYPE 별 id가 다름.
function convertOrgData(newarr, ACNT_ID, SEC_TYPE, ACNT_TYPE) {
  return newarr.map(m => {
    const m2 = m;
    m2.ACNT_ID = m2[ACNT_ID] !== undefined ? m2[ACNT_ID] : m2[ACNT_ID.toUpperCase()];
    m2.SEC_TYPE = SEC_TYPE;
    m2.ACNT_TYPE = ACNT_TYPE;
    return m2;
  });
}

function acntIdStringtoInteger(list) {
  return list.map(m => {
    const m2 = m;
    m2.ACNT_ID = Number(m2.ACNT_ID);
    return m2;
  });
}

function getOrgData(data, ACNT_TYPE) {
  return data.filter(o => o.ACNT_TYPE === ACNT_TYPE);
}

function replaceSpecialCharacter(str) {
  // const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; //eslint-disable-line
  const regExp = /[\{\}?.,;:|\)*~`!^\+<>\#$%&\\\=\(\'\"]/gi; //eslint-disable-line
  return str.replace(regExp, '');
}

class BizGroupReg extends Component {
  constructor(props) {
    super(props);

    const { match, getBizGroupInfo, loadingOn } = props;
    const { params } = match;
    const { BIZGRP_ID } = params;
    this.state = {
      data: {
        BIZGRP_ID,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        DSCR_KOR: '',
        DSCR_ENG: '',
        DSCR_CHN: '',
        SYS_YN: 'N',
        INHERIT_YN: 'N',
        MENU_EXIST_YN: 'Y',
        HOME_YN: 'N',
        CATG_ID: -1,
        UploadFilesIcon: [],
        I: {
          users: [],
          depts: [],
          pstns: [],
          dutys: [],
          grps: [],
        },
        V: {
          users: [],
          depts: [],
          pstns: [],
          dutys: [],
          grps: [],
        },
        MANUAL_TYPE: 'L',
        MANUAL_PATH: '',
      },
      orgShow: false,
      CATG_ID_CHK: false,
      MyAppCategoryModalShow: false,
      SEC_TYPE: MANAGER,
      manualUrl: '',
      manualLink: '',
    };

    this.onChangeData = this.onChangeData.bind(this);
    this.onFileUploadedIcon = this.onFileUploadedIcon.bind(this);

    getBizGroupInfo(Number(BIZGRP_ID));
    loadingOn();
  }

  componentWillReceiveProps(nextProps) {
    const { match, dataP } = nextProps;
    const { params } = match;
    const { BIZGRP_ID } = params;

    const { data } = this.state;

    if (BIZGRP_ID && Number(this.state.BIZGRP_ID) !== Number(BIZGRP_ID)) {
      this.setState({
        BIZGRP_ID: Number(BIZGRP_ID),
      });
      this.props.loadingOn();
      this.props.getBizGroupInfo(Number(BIZGRP_ID));
    }

    if (data.BIZGRP_ID !== dataP.BIZGRP_ID) {
      let mData = { ...data, ...dataP };
      if (dataP.I) {
        // 관리자 권한
        mData = {
          ...mData,
          I: {
            users: getOrgData(mData[MANAGER], USER),
            depts: getOrgData(mData[MANAGER], DEPT),
            pstns: getOrgData(mData[MANAGER], PSTN),
            dutys: getOrgData(mData[MANAGER], DUTY),
            grps: getOrgData(mData[MANAGER], GRP),
          },
        };
      }
      if (dataP.V) {
        // 조회 권한
        mData = {
          ...mData,
          V: {
            users: getOrgData(mData[VIEWAUTH], USER),
            depts: getOrgData(mData[VIEWAUTH], DEPT),
            pstns: getOrgData(mData[VIEWAUTH], PSTN),
            dutys: getOrgData(mData[VIEWAUTH], DUTY),
            grps: getOrgData(mData[VIEWAUTH], GRP),
          },
        };
      }
      if (dataP.catgPaths) {
        // 카테고리
        mData = {
          ...mData,
          CATG_NAME: lang.get('NAME', dataP.catgPaths),
        };
      }
      if (dataP.ICON && dataP.ICON.trim() !== '') {
        // 아이콘
        const iconArr = [];
        iconArr.push({ seq: dataP.ICON });
        mData = {
          ...mData,
          UploadFilesIcon: iconArr,
        };
      }

      // 사용자 매뉴얼 초기값 초기값 설정
      const { MANUAL_TYPE, MANUAL_PATH } = mData;
      mData.MANUAL_TYPE = !!MANUAL_TYPE && !!MANUAL_TYPE.trim() ? MANUAL_TYPE : 'L';
      const manualPath = !!MANUAL_PATH ? MANUAL_PATH.trim() : '';

      this.setState({
        data: mData,
        manualUrl: !!MANUAL_TYPE && MANUAL_TYPE  === 'L' ? manualPath : '',
        manualLink: !!MANUAL_TYPE && MANUAL_TYPE  === 'F' ? manualPath : '',
      });
      this.inputKor.focus();
    }
  }

  onChangeData(newData) {
    this.setState({
      data: { ...this.state.data, ...newData },
    });
  }

  onFileUploadedIcon(file) {
    this.onChangeData({ UploadFilesIcon: [] });
    const tmpArr = fromJS(this.state.data.UploadFilesIcon).toJS();
    tmpArr.push(file);
    this.onChangeData({ UploadFilesIcon: tmpArr });
  }

  UploadFilesIconDel = () => {
    this.onChangeData({ UploadFilesIcon: [] });
  };

  managerOrgOpen = type => {
    this.setState({
      orgShow: true,
      SEC_TYPE: type,
    });
  };

  orgClose = () => {
    this.setState({
      orgShow: false,
    });
  };

  deleteAppCategory = () => {
    this.onChangeData({
      CATG_ID: -1,
    });
  };

  myAppCategoryModalOpen = () => {
    this.setState({
      MyAppCategoryModalShow: true,
    });
  };

  MyAppCategoryModalClose = () => {
    this.setState({
      MyAppCategoryModalShow: false,
    });
  };

  onChangeUserManual = val => {
    this.onChangeData({ MANUAL_TYPE: val.target.value });
  };

  onChangeUserManualUrl = val => {
    this.setState({ manualUrl: val.target.value });
  };

  render() {
    const { data, SEC_TYPE, manualUrl, manualLink } = this.state;

    const { dataP, updateBizGroup, history, userRole } = this.props;

    const oldUsers = data[SEC_TYPE].users.length > 0 ? data[SEC_TYPE].users : [];
    const oldDepts = data[SEC_TYPE].depts.length > 0 ? data[SEC_TYPE].depts : [];
    const oldPstns = data[SEC_TYPE].pstns.length > 0 ? data[SEC_TYPE].pstns : [];
    const oldDutys = data[SEC_TYPE].dutys.length > 0 ? data[SEC_TYPE].dutys : [];
    const oldGrps = data[SEC_TYPE].grps.length > 0 ? data[SEC_TYPE].grps : [];

    const pathArr = this.props.match.url.split('/');
    const type = pathArr[3];

    const imgClick = e => {
      e.stopPropagation();
    };

    const returnGateId = (resultObj1, resultObj2) => {
      this.onChangeData({
        CATG_ID: resultObj1,
        CATG_NAME: resultObj2,
      });

      if (resultObj1 > 0) {
        this.setState({ CATG_ID_CHK: true });
      } else {
        this.setState({ CATG_ID_CHK: false });
      }
    };

    let orgObj = '';
    if (this.state.orgShow) {
      if (SEC_TYPE === MANAGER) {
        orgObj = (
          <OrganizationRole
            show={this.state.orgShow}
            closeModal={this.orgClose}
            // 조직도 모달창으로 가져갈 데이터
            selectedUsers={oldUsers.slice()}
            checkedDept={oldDepts.slice()}
            checkedPstn={oldPstns.slice()}
            checkedDuty={oldDutys.slice()}
            checkedGrp={oldGrps.slice()}
            // 조직도 모달창으로부터 데이터 가져오는 함수
            getDataFromOrganization={result => {
              const mData = {
                users: convertOrgData(result.selectedUsers, 'USER_ID', SEC_TYPE, USER),
                pstns: convertOrgData(result.checkedDept, 'id', SEC_TYPE, DEPT),
                depts: convertOrgData(result.checkedPstn, 'id', SEC_TYPE, PSTN),
                dutys: convertOrgData(result.checkedDuty, 'id', SEC_TYPE, DUTY),
                grps: convertOrgData(result.checkedGrp, 'id', SEC_TYPE, GRP),
              };

              this.onChangeData({ I: mData });
            }}
            ROLE_CD="BM"
          />
        );
      } else {
        orgObj = (
          <Organization
            show={this.state.orgShow}
            closeModal={this.orgClose}
            userTab
            pstnTab
            dutyTab
            grpTab
            /*
              <부서/사용자 선택 중 옵션 flag>
              onlyDept - 사용자 선택 제외한 부서만 선택
              onlyUser - 부서 선택 제외한 사용자만 선택
              selectSingleDept - 하나의(단일) 부서만 선택 가능
              selectSingleUser - 하나의(단일) 사용자만 선택 가능
            */
            // onlyDept
            // selectSingleDept
            // onlyUser
            // selectSingleUser
            // 조직도 모달창으로 가져갈 데이터
            selectedUsers={oldUsers.slice()}
            checkedDept={oldDepts.slice()}
            checkedPstn={oldPstns.slice()}
            checkedDuty={oldDutys.slice()}
            checkedGrp={oldGrps.slice()}
            // 조직도 모달창으로부터 데이터 가져오는 함수
            getDataFromOrganization={result => {
              const mData = {
                users: convertOrgData(result.selectedUsers, 'USER_ID', SEC_TYPE, USER),
                pstns: convertOrgData(result.checkedPstn, 'id', SEC_TYPE, PSTN),
                depts: convertOrgData(result.checkedDept, 'id', SEC_TYPE, DEPT),
                dutys: convertOrgData(result.checkedDuty, 'id', SEC_TYPE, DUTY),
                grps: convertOrgData(result.checkedGrp, 'id', SEC_TYPE, GRP),
              };

              this.onChangeData({ V: mData });
            }}
          />
        );
      }
    }

    return (
      <div>
        {orgObj}
        <MyAppCategoryModal show={this.state.MyAppCategoryModalShow} closeModal={this.MyAppCategoryModalClose} returnGateId={returnGateId} type="bizgroup" />
        <StyleGroupReg>
          <Form>
            <h2 className="pageTitle">{data.MENU_EXIST_YN === 'Y' ? intlObj.get(messages.bizGroup) : intlObj.get(messages.bizFolder)} 등록정보 입력</h2>
            <div className="formTable">
              <table>
                <tbody>
                  <tr>
                    <th className="top required">
                      <span className="">{data.MENU_EXIST_YN === 'Y' ? intlObj.get(messages.bizGroupNameKor) : intlObj.get(messages.folderNameKor)}</span>
                    </th>
                    <td>
                      <FormItem>
                        <div style={{}}>
                          <Input
                            style={{}}
                            maxLength="50"
                            onChange={e => {
                              this.onChangeData({ NAME_KOR: replaceSpecialCharacter(e.target.value) });
                            }}
                            value={data.NAME_KOR}
                            ref={ref => {
                              if (ref) {
                                this.inputKor = ref;
                              }
                            }}
                            id="l_ko"
                          />
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="top required">
                      <span className="">{data.MENU_EXIST_YN === 'Y' ? intlObj.get(messages.bizGroupDscrKor) : intlObj.get(messages.folderDscrKor)}</span>
                    </th>
                    <td>
                      <FormItem labelCol={{ width: '100%' }} wrapperCol={{ width: '100%' }}>
                        <textarea
                          row="5"
                          placeholder=""
                          maxLength="1000"
                          onChange={e => {
                            this.onChangeData({ DSCR_KOR: e.target.value });
                          }}
                          value={data.DSCR_KOR}
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="top required">
                      <span className="">{data.MENU_EXIST_YN === 'Y' ? intlObj.get(messages.bizGroupNameEng) : intlObj.get(messages.folderNameEng)}</span>
                    </th>
                    <td>
                      <FormItem>
                        <div style={{}}>
                          <Input
                            style={{}}
                            maxLength="50"
                            onChange={e => {
                              this.onChangeData({ NAME_ENG: replaceSpecialCharacter(e.target.value) });
                            }}
                            value={data.NAME_ENG}
                          />
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="top required">
                      <span className="">{data.MENU_EXIST_YN === 'Y' ? intlObj.get(messages.bizGroupDscrEng) : intlObj.get(messages.folderDscrEng)}</span>
                    </th>
                    <td>
                      <FormItem labelCol={{ width: '100%' }} wrapperCol={{ width: '100%' }}>
                        <textarea
                          row="5"
                          placeholder=""
                          maxLength="1000"
                          onChange={e => {
                            this.onChangeData({ DSCR_ENG: e.target.value });
                          }}
                          value={data.DSCR_ENG}
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="top required">
                      <span className="">{data.MENU_EXIST_YN === 'Y' ? intlObj.get(messages.bizGroupNameChn) : intlObj.get(messages.folderNameChn)}</span>
                    </th>
                    <td>
                      <FormItem>
                        <div style={{}}>
                          <Input
                            style={{}}
                            maxLength="50"
                            onChange={e => {
                              this.onChangeData({ NAME_CHN: replaceSpecialCharacter(e.target.value) });
                            }}
                            value={data.NAME_CHN}
                          />
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="top required">
                      <span className="">{data.MENU_EXIST_YN === 'Y' ? intlObj.get(messages.bizGroupDscrChn) : intlObj.get(messages.folderDscrChn)}</span>
                    </th>
                    <td>
                      <FormItem labelCol={{ width: '100%' }} wrapperCol={{ width: '100%' }}>
                        <textarea
                          row="5"
                          placeholder=""
                          maxLength="1000"
                          onChange={e => {
                            this.onChangeData({ DSCR_CHN: e.target.value });
                          }}
                          value={data.DSCR_CHN}
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="top">
                      <span className="">{intlObj.get(messages.icon)}</span>
                    </th>
                    <td>
                      <section className="appIconUploadArea">
                        <Upload
                          accept="image/jpeg, image/png" // default ALL
                          onFileUploaded={this.onFileUploadedIcon}
                          multiple={false} // default true
                          width={122}
                          height={122}
                          borderStyle="none"
                        >
                          <div>
                            <div style={{ display: data.UploadFilesIcon.length < 1 ? 'block' : 'none' }}>
                              <div className="readyToUpload" />
                            </div>
                            <div style={{ display: data.UploadFilesIcon.length > 0 ? 'block' : 'none' }}>
                              <span onClick={imgClick} onKeyPress={imgClick} role="presentation" className="appShape">
                                {data.UploadFilesIcon.map(f => (
                                  <img src={imgUrl.get('120x120', f.seq)} alt={f.fileName} />
                                ))}
                              </span>
                            </div>
                          </div>
                        </Upload>
                        <div className="deleteIconWrapper" style={{ display: data.UploadFilesIcon.length > 0 ? 'block' : 'none' }}>
                          <button className="deleteAppIcon" onClick={this.UploadFilesIconDel} title={intlObj.get(messages.appIconDel)} />
                        </div>
                      </section>
                    </td>
                  </tr>
                  {data.MENU_EXIST_YN === 'Y' ? (
                    <tr>
                      <th className="top">
                        <span className="">{intlObj.get(messages.userManual)}</span>
                      </th>
                      <td>
                        <FormItem>
                          <div style={{ position: 'relative' }}>
                            <div>
                              <RadioGroup className="typeOptions" onChange={this.onChangeUserManual} value={data.MANUAL_TYPE}>
                                <Radio value="L">{intlObj.get(messages.webside)}</Radio>
                                <Radio value="F" style={{ width: 295 }}>
                                  {intlObj.get(messages.documentation)}
                                </Radio>
                              </RadioGroup>
                            </div>
                            <div style={{ display: data.MANUAL_TYPE === 'L' ? 'block' : 'none', marginTop: 10 }}>
                              <Input
                                placeholder=""
                                title={intlObj.get(messages.webside)}
                                style={{ verticalAlign: 'middle' }}
                                maxLength="1000"
                                onChange={this.onChangeUserManualUrl}
                                value={manualUrl}
                              />
                            </div>
                            <div style={{ display: data.MANUAL_TYPE === 'F' ? 'block' : 'none', marginTop: 10 }}>
                              <Input placeholder="" title={intlObj.get(messages.documentation)} style={{ verticalAlign: 'middle' }} value={manualLink} />
                              <section className="btnText attachFile">
                                <Upload
                                  // accept="image/jpeg, image/png" // default ALL
                                  onFileUploaded={file => this.setState({ manualLink: file.down })}
                                  multiple={false} // default true
                                  // width={123}
                                  // height={123}
                                  borderStyle="none"
                                >
                                  <span>{intlObj.get(messages.attachment)}</span>
                                </Upload>
                              </section>
                            </div>
                          </div>
                        </FormItem>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/* <tr>
                    <th className="top">
                      <span className="">{intlObj.get(messages.category)}</span>
                    </th>
                    <td>
                      <FormItem
                        hasFeedback={true}
                        validateStatus={this.state.CATG_ID_CHK ? 'success' : 'error'}
                        className="required categorySelect"
                      >
                        <Input
                          placeholder=""
                          readOnly="readOnly"
                          value={data.CATG_ID > 0 ? data.CATG_NAME : ''}
                          disabled
                        />
                        <Button
                          className="deleteValue"
                          title="삭제"
                          onClick={this.deleteAppCategory}
                        />
                        <Button
                          className="btnText edit"
                          onClick={this.myAppCategoryModalOpen}
                        >
                          {intlObj.get(messages.edit)}
                        </Button> */}
                  {/* <p className="errMsg">* App 카테고리를 선택해 주세요</p> */}
                  {/* </FormItem>
                    </td>
                  </tr> */}
                  <tr>
                    <th className="top">
                      <span className="">{intlObj.get(messages.bizGroupManagement)}</span>
                    </th>
                    <td>
                      <FormItem>
                        <div style={{}}>
                          <div className="appManagerListBox">
                            {data.I ? (
                              // (<AppMaNagerList
                              //   managerList={data.I}
                              //   delFlag={true}
                              //   returnManagerList={(result) => {
                              //     this.onChangeData({ I: result });
                              //   }}
                              // />
                              // )
                              <AppMaNagerList
                                userList={data.I.users}
                                pstnList={data.I.pstns}
                                deptList={data.I.depts}
                                dutyList={data.I.dutys}
                                grpList={data.I.grps}
                                returnUserList={result => {
                                  const nData = { ...data.I };
                                  delete nData.users;
                                  this.onChangeData({ I: { ...nData, users: result } });
                                }}
                                returnPstnList={result => {
                                  const nData = { ...data.I };
                                  delete nData.pstns;
                                  this.onChangeData({ I: { ...nData, pstns: result } });
                                }}
                                returnDetpList={result => {
                                  const nData = { ...data.I };
                                  delete nData.depts;
                                  this.onChangeData({ I: { ...nData, depts: result } });
                                }}
                                returnDutyList={result => {
                                  const nData = { ...data.I };
                                  delete nData.dutys;
                                  this.onChangeData({ I: { ...nData, dutys: result } });
                                }}
                                returnGrpList={result => {
                                  const nData = { ...data.I };
                                  delete nData.grps;
                                  this.onChangeData({ I: { ...nData, grps: result } });
                                }}
                                delFlag
                              />
                            ) : (
                              ''
                            )}
                          </div>
                          <div className="btnText-wrap">
                            <Button
                              className="btnText"
                              onClick={() => {
                                this.managerOrgOpen(MANAGER);
                              }}
                            >
                              <Icon type="plus-circle" />
                              {intlObj.get(messages.find)}
                            </Button>
                          </div>
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="top">
                      <span className="">{intlObj.get(messages.bizGroupViewAuth)}</span>
                    </th>
                    <td>
                      <FormItem>
                        <div style={{}}>
                          <div className="appManagerListBox">
                            {data.V ? (
                              // (<AppMaNagerList
                              //   managerList={data.V}
                              //   delFlag={true}
                              //   returnManagerList={(result) => {
                              //     this.onChangeData({ V: result });
                              //   }}
                              // />
                              // )
                              <AppMaNagerList
                                userList={data.V.users}
                                pstnList={data.V.pstns}
                                deptList={data.V.depts}
                                dutyList={data.V.dutys}
                                grpList={data.V.grps}
                                returnUserList={result => {
                                  const nData = { ...data.V };
                                  delete nData.users;
                                  this.onChangeData({ V: { ...nData, users: result } });
                                }}
                                returnPstnList={result => {
                                  const nData = { ...data.V };
                                  delete nData.pstns;
                                  this.onChangeData({ V: { ...nData, pstns: result } });
                                }}
                                returnDetpList={result => {
                                  const nData = { ...data.V };
                                  delete nData.depts;
                                  this.onChangeData({ V: { ...nData, depts: result } });
                                }}
                                returnDutyList={result => {
                                  const nData = { ...data.V };
                                  delete nData.dutys;
                                  this.onChangeData({ V: { ...nData, dutys: result } });
                                }}
                                returnGrpList={result => {
                                  const nData = { ...data.V };
                                  delete nData.grps;
                                  this.onChangeData({ V: { ...nData, grps: result } });
                                }}
                                delFlag
                              />
                            ) : (
                              ''
                            )}
                          </div>
                          <div className="btnText-wrap">
                            <Button
                              className="btnText"
                              onClick={() => {
                                this.managerOrgOpen(VIEWAUTH);
                              }}
                            >
                              <Icon type="plus-circle" />
                              {intlObj.get(messages.find)}
                            </Button>
                          </div>
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  {data.LVL !== 1 ? (
                    <tr>
                      <th className="top required">
                        <span className="">{intlObj.get(messages.bizGroupParentAuthYn)}</span>
                      </th>
                      <td>
                        <FormItem>
                          <Checkbox.Group
                            style={{ width: '50%' }}
                            onChange={arr => {
                              this.onChangeData({ INHERIT_YN: arr.includes('Y') ? 'Y' : 'N' });
                            }}
                            value={data.INHERIT_YN}
                          >
                            <Checkbox value="Y" />
                          </Checkbox.Group>
                        </FormItem>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {data.LVL === 1 || data.PARENT_SYS_YN === 'Y' ? (
                    <tr>
                      <th className="top required">
                        <span className="">{intlObj.get(messages.bizGroupSystem)}</span>
                      </th>
                      <td>
                        <RadioGroup
                          className="typeOptions"
                          onChange={e => {
                            this.onChangeData({ SYS_YN: e.target.value });
                          }}
                          value={data.SYS_YN === 'X' ? 'N' : data.SYS_YN}
                        >
                          <Radio value="Y" disabled>
                            {intlObj.get(messages.yes)}
                          </Radio>
                          <Radio value="N" disabled style={{ width: 295 }}>
                            {intlObj.get(messages.no)}
                          </Radio>
                          {/* <Radio value="Y" disabled={data.LVL !== 1 || dataP.SYS_YN !== 'X'}>{intlObj.get(messages.yes)}</Radio>
                          <Radio value="N" disabled={data.LVL !== 1 || dataP.SYS_YN !== 'X'} style={{ width: 295 }}>{intlObj.get(messages.no)}</Radio> */}
                        </RadioGroup>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {(data.LVL === 1 || data.PARENT_SYS_YN === 'Y') && data.SYS_YN === 'Y' ? (
                    <tr>
                      <th className="top required">
                        <span className="">{intlObj.get(messages.bizGroupHomeYn)}</span>
                      </th>
                      <td>
                        <RadioGroup
                          className="typeOptions"
                          onChange={e => {
                            this.onChangeData({ HOME_YN: e.target.value });
                          }}
                          value={data.HOME_YN}
                        >
                          <Radio value="Y">{intlObj.get(messages.yes)}</Radio>
                          <Radio value="N" style={{ width: 295 }}>
                            {intlObj.get(messages.no)}
                          </Radio>
                        </RadioGroup>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                </tbody>
              </table>
            </div>
            {data.SEC_YN === 'Y' || userRole === 'SA' ? (
              <div className="buttonWrapper">
                {data.MENU_EXIST_YN === 'Y' ? (
                  <Link to={`/admin/adminmain/${type}/bizMenuReg/info/${data.BIZGRP_ID}`}>
                    <LinkBtnLgtGray>{intlObj.get(messages.cancel)}</LinkBtnLgtGray>
                  </Link>
                ) : (
                  ''
                )}

                <StyledButton
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    feed.showConfirm(intlObj.get(messages.saveConfirm), '', () => {
                      const { I, V } = dataP;
                      const delList = [];
                      const newI = [...data.I.users, ...data.I.pstns, ...data.I.depts, ...data.I.dutys, ...data.I.grps]; // object to Array
                      const newV = [...data.V.users, ...data.V.pstns, ...data.V.depts, ...data.V.dutys, ...data.V.grps]; // object to Array
                      I.forEach(m => {
                        if (newI.findIndex(i => Number(i.ACNT_ID) === Number(m.ACNT_ID) && i.ACNT_TYPE === m.ACNT_TYPE) === -1) {
                          delList.push(m);
                        }
                      });

                      V.forEach(m => {
                        if (newV.findIndex(i => Number(i.ACNT_ID) === Number(m.ACNT_ID) && i.ACNT_TYPE === m.ACNT_TYPE) === -1) {
                          delList.push(m);
                        }
                      });

                      if (data.SYS_YN === 'X') {
                        data.SYS_YN = 'N';
                      }

                      //사용자 매뉴얼 파일 세팅
                      data.MANUAL_PATH = data.MANUAL_TYPE === 'L' ? manualUrl.trim() : manualLink.trim();

                      const resultData = { ...data };
                      resultData.delList = acntIdStringtoInteger(delList);
                      resultData.I = acntIdStringtoInteger(newI);
                      resultData.V = acntIdStringtoInteger(newV);

                      updateBizGroup(resultData, history);
                    });
                  }}
                >
                  {intlObj.get(messages.save)}
                </StyledButton>
              </div>
            ) : (
              ''
            )}
          </Form>
        </StyleGroupReg>
        <Footer />
      </div>
    );
  }
}

BizGroupReg.propTypes = {
  dataP: PropTypes.object.isRequired,
  updateBizGroup: PropTypes.func.isRequired,
  getBizGroupInfo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  loadingOn: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

BizGroupReg.defaultProps = {};

export function mapDispatchToProps(dispatch) {
  return {
    updateBizGroup: (data, history) => dispatch(actions.updateBizGroup(data, history)),
    getBizGroupInfo: BIZGRP_ID => dispatch(actions.getBizGroupInfo(BIZGRP_ID)),

    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  dataP: selectors.makeData(),
  userRole: menuSelectors.makeUserRole(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin/AdminMain/Menu/BizGroupReg', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/Menu/BizGroupReg', saga });

export default injectIntl(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(BizGroupReg),
);

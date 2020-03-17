import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Form, Input, Select, Modal } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import Upload from 'components/Upload';
import Footer from 'containers/admin/App/Footer';
import * as actions from './actions';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import StyleUserForm from './StyleUserForm';
import StyleUserDtl from './StyleUserDtl';
import { LinkBtnList } from '../../../../store/components/uielements/buttons.style';
import messages from '../messages';
import UserRegTree from '../../../components/UserRegTree';
import StyledButton from '../../../../../components/Button/StyledButton';

const FormItem = Form.Item;
const Option = Select.Option; // eslint-disable-line
const emailValid = str => {
  const re = /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
  return re.test(String(str).toLowerCase());
};
const phonelValid = str => {
  const re = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return re.test(String(str).toLowerCase());
};

const setListState = state => ({
  sortColumn: state.listSortColumn,
  sortDirection: state.listSortDirection,
  statusCode: state.listStatusCode,
  keywordType: state.listKeywordType,
  keyword: state.listKeyword,
  deptId: state.listDeptId,
  pstnId: state.listPstnId,
  deptName: state.listDeptName,
  pstnName: state.listPstnName,
});

class UserReg extends React.Component {
  constructor(prop) {
    super(prop);
    const userId = prop.match.params.USER_ID ? prop.match.params.USER_ID : 0;
    const location = this.props.history.location.state;
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      userId,
      modalTitle: '',
      modalType: '',
      empNo: '',
      nameKor: '',
      nameEng: '',
      nameChn: '',
      photo: '',
      email: '',
      statusCd: 'C',
      deptId: '',
      deptName: '',
      pstnId: '',
      pstnName: '',
      dutyId: '',
      dutyName: '',
      rabkId: '',
      rabkName: '',
      officeTel: '',
      mobileTel: '',
      compCd: '',
      selectedNode: {},
      visible: false,
      mode: prop.match.params.USER_ID ? 'D' : 'I',
      listSortColumn: location === undefined ? '' : location.sortColumnParam,
      listSortDirection: location === undefined ? '' : location.sortDirectionParam,
      listStatusCode: location === undefined ? 'C' : location.statusCode,
      listKeywordType: location === undefined ? 'userNameKor' : location.keywordType,
      listKeyword: location === undefined ? '' : location.keyword,
      listDeptId: location === undefined ? 0 : location.deptId,
      listPstnId: location === undefined ? 0 : location.pstnId,
      listDeptName: location === undefined ? '' : location.deptName,
      listPstnName: location === undefined ? '' : location.pstnName,
    };
    if (userId && this.state.mode === 'D') {
      this.props.getUser(Number(userId));
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps) {
    if (this.state.mode === 'D' && nextProps.userInfo) {
      const { userInfo } = nextProps;
      this.setUserInfo(userInfo);
    }
  }

  onClickToList = () => {
    // console.log('!!!!!!', data);
    this.props.history.push({
      pathname: '/admin/adminmain/account',
      state: setListState(this.state),
    });
  };

  setUserInfo = userInfo => {
    this.setState({
      empNo: userInfo.EMP_NO,
      nameKor: userInfo.NAME_KOR,
      nameEng: userInfo.NAME_ENG,
      nameChn: userInfo.NAME_CHN,
      photo: userInfo.PHOTO,
      email: userInfo.EMAIL,
      statusCd: userInfo.STATUS_CD,
      deptId: userInfo.DEPT_ID,
      deptName: userInfo.DEPT_NAME_KOR,
      pstnId: userInfo.PSTN_ID,
      pstnName: userInfo.PSTN_NAME_KOR,
      dutyId: userInfo.DUTY_ID,
      dutyName: userInfo.DUTY_NAME_KOR,
      rankId: userInfo.RANK_ID,
      rankName: userInfo.RANK_NAME_KOR,
      officeTel: userInfo.OFFICE_TEL_NO,
      mobileTel: userInfo.MOBILE_TEL_NO,
      compCd: userInfo.COMP_CD,
    });
  };

  getSelectNode = node => {
    this.setState({
      selectedNode: node,
    });
  };

  getSelectDept = id => {
    switch (this.state.modalType) {
      case 'dept':
        this.props.getChangeDeptTreeData(id);
        break;
      case 'duty':
        this.props.getChangeDutyTreeData(id);
        break;
      case 'pstn':
        this.props.getChangePSTNTreeData(id);
        break;
      case 'rank':
        this.props.getChangeRANKTreeData(id);
        break;
      default:
        break;
    }
  };

  getEmpCheck = (userId, empNo) => {
    this.props.getEmpCheck(userId, empNo.toUpperCase());
  };

  handleChange = e => {
    let { value } = e.target;
    switch (e.target.name) {
      case 'officeTel':
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        break;
      case 'mobileTel':
        value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        break;
      default:
        break;
    }
    this.setState({
      [e.target.name]: value,
    });
  };

  handleStatusChange = val => {
    this.setState({
      statusCd: val,
    });
  };

  validStatus = (val, type) => {
    if (this.state.mode === 'D') return '';
    switch (type) {
      case 'phone':
        return val !== '' && !phonelValid(val) ? 'error' : '';
      case 'email':
        return val !== '' && emailValid(val) ? 'success' : 'error';
      case 'empNocheck':
        return val !== '' && this.props.empNoCheck.toUpperCase() === this.state.empNo.toUpperCase() && this.props.empNoFlag !== 0 ? 'success' : 'error';
      default:
        return val !== '' ? 'success' : 'error';
    }
  };

  vaildChk = () => {
    if (
      this.state.empNo.trim() !== '' &&
      this.state.empNo !== null &&
      this.state.nameKor.trim() !== '' &&
      this.state.nameKor !== null &&
      emailValid(this.state.email) &&
      this.state.email !== null &&
      this.state.statusCd !== '' &&
      this.state.statusCd !== null &&
      this.state.deptId !== '' &&
      this.state.deptId !== null &&
      this.state.pstnId !== '' &&
      this.state.pstnId !== null &&
      this.state.dutyId !== '' &&
      this.state.dutyId !== null
    ) {
      if (this.state.officeTel !== '' && this.state.officeTel !== null) {
        if (!phonelValid(this.state.officeTel)) {
          message.error(`${intlObj.get(messages.chkInput)}`, 2);
          return false;
        }
      }

      if (this.state.mobileTel !== '' && this.state.mobileTel !== null) {
        if (!phonelValid(this.state.mobileTel)) {
          message.error(`${intlObj.get(messages.chkInput)}`, 2);
          return false;
        }
      }
      if (this.props.empNoCheck.toUpperCase() !== this.state.empNo.toUpperCase()) {
        message.error(`${intlObj.get(messages.chkInput)}`, 2);
        return false;
      }

      return true;
    }
    message.error(`${intlObj.get(messages.chkInput)}`, 2);
    return false;
  };

  regConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm(`${intlObj.get(messages.regConfirm)}`, '', this.regUser);
    }
  };

  // eslint-disable-next-line arrow-body-style
  regUser = () => {
    const userInfo = {
      userId: Number(this.state.userId),
      empNo: this.state.empNo.toUpperCase(),
      nameKor: this.state.nameKor,
      nameEng: this.state.nameEng,
      nameChn: this.state.nameChn,
      photo: this.state.photo,
      email: this.state.email,
      statusCd: this.state.statusCd,
      deptId: this.state.deptId,
      pstnId: this.state.pstnId,
      dutyId: this.state.dutyId,
      rankId: this.state.rankId,
      officeTel: this.state.officeTel,
      mobileTel: this.state.mobileTel,
      compCd: this.state.compCd,
    };
    const { history } = this.props;
    const listParam = setListState(this.state);

    if (this.state.mode === 'I') this.props.registUser(userInfo, listParam, history, this.onSaveSuccess);
    else this.props.updateUser(userInfo, listParam, history, this.onSaveSuccess);
  };

  showModal = (title, type) => {
    console.log('showModal');
    if (this.state.mode !== 'D') {
      switch (type) {
        case 'dept':
          this.props.getDeptComboData();
          break;
        case 'duty':
          this.props.getDutyComboData();
          break;
        case 'pstn':
          this.props.getPSTNComboData();
          break;
        case 'rank':
          this.props.getRANKComboData();
          break;
        default:
          break;
      }
      this.setState({
        visible: true,
        modalTitle: title,
        modalType: type,
      });
    }
  };

  onSaveSuccess = () => {
    this.setState({ mode: 'D' });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      [`${this.state.modalType}Name`]: this.state.selectedNode.NAME_KOR,
      [`${this.state.modalType}Id`]: this.state.selectedNode.key,
    });
    if (this.state.modalType === 'dept') {
      this.setState({
        compCd: this.state.selectedNode.COMP_CD,
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      selectedNode: {},
      modalType: '',
      // eslint-disable-next-line react/no-unused-state
      treeData: [],
    });
  };

  dupCheckEmpNo = () => {
    if (this.props.empNoFlag === 0 && this.state.empNo.toUpperCase() === this.props.empNoCheck.toUpperCase()) {
      return <font color="RED">{intlObj.get(messages.dupEmpNo)}</font>;
    }
    return '';
  };

  userPhoto = () => {
    const { photo, mode } = this.state;
    const comp = (
      <div style={{ width: '100px', height: '100px', cursor: mode !== 'D' ? 'pointer' : '' }}>
        <img
          src={photo ? `/img/thumb/100x100/${photo}` : '/no_img_pro.jpg'}
          style={{ width: '100%', maxHeight: 100 }}
          onError={e => {
            e.target.src = '/no_img_pro.jpg';
          }}
        />
      </div>
    );
    if (mode !== 'D') {
      return (
        <Upload
          accept="image/jpeg, image/png" // default ALL
          onFileUploaded={file => this.setState({ photo: file.seq })}
          multiple={false} // default true
          width={100}
          height={100}
          borderStyle="none"
        >
          {comp}
        </Upload>
      );
    }
    return comp;
  };

  button = () => {
    const { mode } = this.state;
    if (mode === 'D') {
      return (
        <ErrorBoundary>
          <StyledButton className="btn-light" style={{ float: 'left' }} onClick={this.onClickToList}>
            {intlObj.get(messages.lblList)}
          </StyledButton>
          <StyledButton className="btn-primary" onClick={() => this.setState({ mode: 'U' })}>
            {intlObj.get(messages.lblUdt)}
          </StyledButton>
        </ErrorBoundary>
      );
    }
    if (mode === 'U') {
      return (
        <ErrorBoundary>
          <StyledButton className="btn-light" style={{ float: 'left' }} onClick={this.onClickToList}>
            {intlObj.get(messages.lblList)}
          </StyledButton>
          <StyledButton
            className="btn-light"
            onClick={() => {
              this.setUserInfo(this.props.userInfo);
              this.setState({ mode: 'D' });
            }}
          >
            {intlObj.get(messages.lblCancel)}
          </StyledButton>
          <StyledButton className="btn-primary" onClick={this.regConfirm}>
            {intlObj.get(messages.lblSave)}
          </StyledButton>
        </ErrorBoundary>
      );
    }
    return (
      <ErrorBoundary>
        <StyledButton className="btn-light" style={{ float: 'left' }} onClick={this.onClickToList}>
          {intlObj.get(messages.lblList)}
        </StyledButton>
        <StyledButton className="btn-primary" onClick={this.regConfirm}>
          {intlObj.get(messages.lblReg)}
        </StyledButton>
      </ErrorBoundary>
    );
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };
    return (
      <div>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={400}
          bodyStyle={{ maxHeight: 400 }}
        >
          <UserRegTree
            treeType={this.state.modalType}
            treeData={this.props.treeData}
            comboData={this.props.comboData}
            getSelectNode={this.getSelectNode}
            getSelectDept={this.getSelectDept}
            isLoading={this.props.isLoading}
          />
        </Modal>
        <StyleUserDtl>
          <h3 className="pageTitle regist">{intlObj.get(messages.titleUserReg)}</h3>
          <StyleUserForm>
            <table className="adminTbl userTbl">
              <tbody>
                <tr>
                  <th className="required">
                    <label htmlFor="s1">{intlObj.get(messages.titleUserEmpNo)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.empNo, 'empNocheck')}>
                      <ErrorBoundary>
                        <Input
                          className="upper"
                          placeholder={intlObj.get(messages.lblUserEmpNoPlaceholder)}
                          name="empNo"
                          value={this.state.empNo}
                          onChange={this.handleChange}
                          onBlur={() => this.state.empNo !== '' && this.getEmpCheck(this.state.userId, this.state.empNo)}
                          maxLength={200}
                          id="s1"
                          readOnly={this.state.mode === 'D'}
                          autoFocus // Default로 포커스를 주는 법
                        />
                      </ErrorBoundary>
                      <span className="tipText">{this.dupCheckEmpNo()}</span>
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s2">{intlObj.get(messages.titleUserNameKor)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.nameKor, '')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblUserNamePlaceholder)}
                          name="nameKor"
                          value={this.state.nameKor}
                          onChange={this.handleChange}
                          maxLength={200}
                          id="s2"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s3">{intlObj.get(messages.titleUserNameEng)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblUserNamePlaceholder)}
                          name="nameEng"
                          value={this.state.nameEng}
                          onChange={this.handleChange}
                          maxLength={200}
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s3"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s4">{intlObj.get(messages.titleUserNameChn)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblUserNamePlaceholder)}
                          name="nameChn"
                          value={this.state.nameChn}
                          onChange={this.handleChange}
                          maxLength={200}
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s4"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s4-1">{intlObj.get(messages.titleUserPhoto)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>{this.userPhoto()}</ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s5">EMAIL</label>
                  </th>
                  <td className="emailForm">
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.email, 'email')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblEmailLPlaceholder)}
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          maxLength={380}
                          id="s5"
                          style={{ width: 285, marginRight: 10 }}
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s6">{intlObj.get(messages.titleUserStatus)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Select
                          name="statusCd"
                          onChange={this.handleStatusChange}
                          value={this.state.statusCd}
                          id="s6"
                          style={{ width: 300 }}
                          disabled={this.state.mode === 'D'}
                        >
                          <Option value="C">{intlObj.get(messages.statusCdWork)}</Option>
                          <Option value="D">{intlObj.get(messages.statusCdDispatch)}</Option>
                          <Option value="H">{intlObj.get(messages.statusCdLeave)}</Option>
                          <Option value="T">{intlObj.get(messages.statusCdRetired)}</Option>
                        </Select>
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s7">{intlObj.get(messages.titleUserDept)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.deptId, '')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblDeptPlaceholder)}
                          name="deptName"
                          value={this.state.deptName}
                          onClick={() => this.showModal(intlObj.get(messages.titleUserDept), 'dept')}
                          maxLength={380}
                          id="s7"
                          style={{ width: 285, marginRight: 10 }}
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s8">{intlObj.get(messages.titleUserPSTN)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.pstnId, '')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblPSTNPlaceholder)}
                          name="pstnName"
                          value={this.state.pstnName}
                          onClick={() => this.showModal(intlObj.get(messages.titleUserPSTN), 'pstn')}
                          maxLength={380}
                          id="s8"
                          style={{ width: 285, marginRight: 10 }}
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s9">{intlObj.get(messages.titleUserDuty)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.dutyId, '')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblDutyPlaceholder)}
                          name="dutyName"
                          value={this.state.dutyName}
                          onClick={() => this.showModal(intlObj.get(messages.titleUserDuty), 'duty')}
                          maxLength={380}
                          id="s9"
                          style={{ width: 285, marginRight: 10 }}
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s10">{intlObj.get(messages.titleUserRank)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblRankPlaceholder)}
                          name="rankName"
                          value={this.state.rankName}
                          onClick={() => this.showModal(intlObj.get(messages.titleUserRank), 'rank')}
                          maxLength={380}
                          id="s10"
                          style={{ width: 285, marginRight: 10 }}
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s11">{intlObj.get(messages.titleUserOfficeTel)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.officeTel, 'phone')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblOfficeTelPlaceholder)}
                          name="officeTel"
                          value={this.state.officeTel}
                          onChange={this.handleChange}
                          maxLength={200}
                          id="s11"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s12">{intlObj.get(messages.titleUserMobileTel)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.mobileTel, 'phone')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblMobileTelPlaceholder)}
                          name="mobileTel"
                          value={this.state.mobileTel}
                          onChange={this.handleChange}
                          maxLength={200}
                          id="s12"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s13">{intlObj.get(messages.titleUserCOMP)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblCompPlaceholder)}
                          name="compCd"
                          value={this.state.compCd}
                          maxLength={200}
                          id="s13"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleUserForm>
          <div className="buttonWrapper">{this.button()}</div>
        </StyleUserDtl>
        <Footer />
      </div>
    );
  }
}

UserReg.propTypes = {
  empNoCheck: PropTypes.string, //eslint-disable-line
  empNoFlag: PropTypes.number, //eslint-disable-line
  treeData: PropTypes.array, //eslint-disable-line
  isLoading: PropTypes.bool, //eslint-disable-line
  registUser: PropTypes.func, //eslint-disable-line
  updateUser: PropTypes.func, //eslint-disable-line
  comboData: PropTypes.array, //eslint-disable-line
  getChangeDeptTreeData: PropTypes.func, //eslint-disable-line
  getDeptComboData: PropTypes.func, //eslint-disable-line
  getChangeDutyTreeData: PropTypes.func, //eslint-disable-line
  getDutyComboData: PropTypes.func, //eslint-disable-line
  getChangePSTNTreeData: PropTypes.func, //eslint-disable-line
  getPSTNComboData: PropTypes.func, //eslint-disable-line
  getChangeRANKTreeData: PropTypes.func, //eslint-disable-line
  getRANKComboData: PropTypes.func, //eslint-disable-line
  getEmpCheck: PropTypes.func, //eslint-disable-line
  getUser: PropTypes.func, //eslint-disable-line
  empNo: PropTypes.string, //eslint-disable-line
  userInfo: PropTypes.object, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getEmpCheck: (userId, empNo) => dispatch(actions.checkEmpNo(userId, empNo)),
  getChangeDeptTreeData: DEPT_ID => dispatch(actions.getChangeDeptTreeData(DEPT_ID)),
  getDeptComboData: () => dispatch(actions.getDeptComboData()),
  getChangeDutyTreeData: DUTY_ID => dispatch(actions.getChangeDutyTreeData(DUTY_ID)),
  getDutyComboData: () => dispatch(actions.getDutyComboData()),
  getChangePSTNTreeData: PSTN_ID => dispatch(actions.getChangePSTNTreeData(PSTN_ID)),
  getPSTNComboData: () => dispatch(actions.getPSTNComboData()),
  registUser: (userInfo, listParam, history, onSaveSuccess) => dispatch(actions.insertUser(userInfo, listParam, history, onSaveSuccess)),
  getChangeRANKTreeData: RANK_ID => dispatch(actions.getChangeRANKTreeData(RANK_ID)),
  getRANKComboData: () => dispatch(actions.getRANKComboData()),
  updateUser: (userId, listParam, history, onSaveSuccess) => dispatch(actions.updateUser(userId, listParam, history, onSaveSuccess)),
  getUser: userId => dispatch(actions.getUser(userId)),
});

const mapStateToProps = createStructuredSelector({
  empNoCheck: selectors.makeEmpNoCheck(),
  empNoFlag: selectors.makeEmpNoFlag(),
  comboData: selectors.makeSelectComboData(),
  treeData: selectors.makeTreeData(),
  isLoading: selectors.makeIsLoading(),
  userInfo: selectors.makeUserInfo(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'UserReg', saga });
const withReducer = injectReducer({ key: 'UserReg', reducer });

export default compose(withReducer, withSaga, withConnect)(UserReg);

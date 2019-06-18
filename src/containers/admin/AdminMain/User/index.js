import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Modal } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import { Link } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import StyleUserForm from './StyleUserForm';
import StyleUserDtl from './StyleUserDtl';
import { LinkBtnLgtGray, BtnDkGray } from '../../../store/components/uielements/buttons.style';
import messages from './messages';
import UserRegTree from '../../components/UserRegTree';

const FormItem = Form.Item;
const Option = Select.Option; // eslint-disable-line
const emailValid = (str) => {
  const re = /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
  return re.test(String(str).toLowerCase());
};
const phonelValid = (str) => {
  const re = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return re.test(String(str).toLowerCase());
};

class UserReg extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      title: `${intlObj.get(messages.titleUserReg)}`,
      modalTitle: '',
      modalType: '',
      empNo: '',
      nameKor: '',
      nameEng: '',
      nameChn: '',
      email: '',
      statusCd: 'C',
      deptId: '',
      deptName: '',
      pstnId: '',
      pstnName: '',
      dutyId: '',
      dutyName: '',
      officeTel: '',
      mobileTel: '',
      compCd: '',
      visible: false,
      selectedNode: {},
    };
  }

  componentDidMount() {

  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps) {

  }

  getSelectNode = (node) => {
    this.setState({
      selectedNode: node,
    });
  }

  handleChange = (e) => {
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
  }


  handleStatusChange = (val) => {
    this.setState({
      statusCd: val,
    });
  }

  vaildChk = () => {
    if (this.state.empNo !== '' && this.state.empNo !== null
    && this.state.nameKor !== '' && this.state.nameKor !== null
    && emailValid(this.state.email) && this.state.email !== null
    && this.state.statusCd !== '' && this.state.statusCd !== null
    && this.state.deptId !== '' && this.state.deptId !== null
    && this.state.pstnId !== '' && this.state.pstnId !== null
    && this.state.dutyId !== '' && this.state.dutyId !== null) {
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

      if (!this.props.getEmpCheck) return true;
      message.error(`${intlObj.get(messages.chkInput)}`, 2);
      return false;
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
    /*
    this.state.empNo,
    this.state.nameKor,
    this.state.nameEng,
    this.state.nameChn,
    this.state.email,
    this.state.statusCd,
    this.state.deptId,
    this.state.pstnId,
    this.state.dutyId,
    this.state.officeTel,
    this.state.mobileTel,
    this.state.compCd,
    */
    return '';
  }

  showModal = (title, type) => {
    this.setState({
      visible: true,
      modalTitle: title,
      modalType: type,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
      [`${this.state.modalType}Name`]: this.state.selectedNode.NAME_KOR,
      [`${this.state.modalType}Id`]: this.state.selectedNode.CATG_ID,

    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      selectedNode: {},
      modalType: '',
    });
  }

  dupCheckEmpNo = (stat) => {
    if (this.state.empNo !== '') {
      if (stat) return (<font color="RED">{intlObj.get(messages.dupEmpNo)}</font>);
      return (<font color="GREEN">{intlObj.get(messages.dupEmpNoX)}</font>);
    }
    return '';
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
          maskClosable={true}
          width={400}
          bodyStyle={{ maxHeight: 500 }}
        >
          <UserRegTree
            treeType={this.state.modalType}
            getSelectNode={this.getSelectNode}
          />
        </Modal>
        <StyleUserDtl>
          <h3 className="pageTitle regist">{this.state.title}</h3>
          <StyleUserForm>
            <table className="adminTbl userTbl">
              <tbody>
                <tr>
                  <th className="required">
                    <label htmlFor="s1">
                      {intlObj.get(messages.titleUserEmpNo)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        this.state.empNo !== '' && !this.props.getEmpCheck
                          ? 'success'
                          : 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblUserEmpNoPlaceholder)}
                          name="empNo"
                          value={this.state.empNo}
                          onChange={this.handleChange}
                          maxLength="200"
                          id="s1"
                          autoFocus // Default로 포커스를 주는 법
                        />
                      </ErrorBoundary>
                      <span className="tipText">{this.dupCheckEmpNo(this.props.getEmpCheck)}</span>
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s2">
                      {intlObj.get(messages.titleUserNameKor)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        this.state.nameKor !== ''
                          ? 'success'
                          : 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblUserNamePlaceholder)}
                          name="nameKor"
                          value={this.state.nameKor}
                          onChange={this.handleChange}
                          maxLength="200"
                          id="s2"
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s3">
                      {intlObj.get(messages.titleUserNameEng)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblUserNamePlaceholder)}
                          name="nameEng"
                          value={this.state.nameEng}
                          onChange={this.handleChange}
                          maxLength="200"
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s3"
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s4">
                      {intlObj.get(messages.titleUserNameChn)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblUserNamePlaceholder)}
                          name="nameChn"
                          value={this.state.nameChn}
                          onChange={this.handleChange}
                          maxLength="200"
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s4"
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s5">EMAIL</label>
                  </th>
                  <td className="emailForm">
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        emailValid(this.state.email)
                          ? 'success'
                          : 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Input
                          type="email"
                          placeholder={intlObj.get(messages.lblEmailLPlaceholder)}
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          maxLength="380"
                          id="s5"
                          style={{ width: 285, marginRight: 10 }}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s6">
                      {intlObj.get(messages.titleUserStatus)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        this.state.statusCd !== ''
                          ? 'success'
                          : 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Select name="statusCd" onChange={this.handleStatusChange} value={this.state.statusCd} id="s6" style={{ width: 300 }}>
                          <Option value="C">재직</Option>
                          <Option value="D">파견</Option>
                          <Option value="H">휴직</Option>
                          <Option value="T">퇴직</Option>
                        </Select>
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s7">
                      {intlObj.get(messages.titleUserDept)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        this.state.deptName !== ''
                          ? 'success'
                          : 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblDeptPlaceholder)}
                          name="deptName"
                          value={this.state.deptName}
                          onClick={() => this.showModal(intlObj.get(messages.titleUserDept), 'dept')}
                          maxLength="380"
                          id="s7"
                          style={{ width: 285, marginRight: 10 }}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s8">
                      {intlObj.get(messages.titleUserPSTN)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        this.state.pstnName !== ''
                          ? 'success'
                          : 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblPSTNPlaceholder)}
                          name="deptName"
                          value={this.state.pstnName}
                          onClick={() => this.showModal(intlObj.get(messages.titleUserPSTN), 'pstn')}
                          maxLength="380"
                          id="s8"
                          style={{ width: 285, marginRight: 10 }}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s9">
                      {intlObj.get(messages.titleUserDuty)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        this.state.dutyName !== ''
                          ? 'success'
                          : 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblDutyPlaceholder)}
                          name="deptName"
                          value={this.state.dutyName}
                          onClick={() => this.showModal(intlObj.get(messages.titleUserDuty), 'duty')}
                          maxLength="380"
                          id="s9"
                          style={{ width: 285, marginRight: 10 }}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s10">
                      {intlObj.get(messages.titleUserOfficeTel)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        this.state.officeTel !== '' && phonelValid(this.state.officeTel)
                          ? 'success'
                          : this.state.officeTel !== '' && 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblOfficeTelPlaceholder)}
                          name="officeTel"
                          value={this.state.officeTel}
                          onChange={this.handleChange}
                          maxLength="200"
                          id="s10"
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s11">
                      {intlObj.get(messages.titleUserMobileTel)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={
                        this.state.mobileTel !== '' && phonelValid(this.state.mobileTel)
                          ? 'success'
                          : this.state.mobileTel !== '' && 'error'
                      }
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblMobileTelPlaceholder)}
                          name="mobileTel"
                          value={this.state.mobileTel}
                          onChange={this.handleChange}
                          maxLength="200"
                          id="s11"
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s12">
                      {intlObj.get(messages.titleUserCOMP)}
                    </label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                    >
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblCompPlaceholder)}
                          name="compCd"
                          value={this.state.compCd}
                          maxLength="200"
                          id="s12"
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleUserForm>
          <div className="buttonWrapper">
            <ErrorBoundary>
              <LinkBtnLgtGray>
                <Link to="/admin/adminMain">
                  {intlObj.get(messages.lblCancel)}
                </Link>
              </LinkBtnLgtGray>
            </ErrorBoundary>
            <ErrorBoundary>
              <BtnDkGray onClick={this.regConfirm}>
                {intlObj.get(messages.lblReg)}
              </BtnDkGray>
            </ErrorBoundary>
          </div>
        </StyleUserDtl>
      </div>
    );
  }
}

UserReg.propTypes = {
  getEmpCheck: PropTypes.bool, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  empCheck: empNo =>
    dispatch(actions.checkEmpNo(empNo)),
});

const mapStateToProps = createStructuredSelector({
  getEmpCheck: selectors.makeEmpNoCheck(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'UserReg', saga });
const withReducer = injectReducer({ key: 'UserReg', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserReg);

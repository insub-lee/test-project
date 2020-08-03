import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Icon, Spin } from 'antd';
import { jsonToQueryString } from 'utils/helpers';

import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import Scrollbars from 'react-custom-scrollbars';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import moment from 'moment';
import service from '../service';
import StyledContent from './StyledContent';

const tabTitleStyle = {
  padding: '6px',
  textAlign: 'center',
  fontSize: '15px',
  borderBottom: '1px solid #dadada',
};

class EduPlanSingleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      selectedMentors: [],
      passable: false,
      selectedUsers: [],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleChangeMentor = this.handleChangeMentor.bind(this);
    this.handleChangePassable = this.handleChangePassable.bind(this);
    this.handleSelectedValue = this.handleSelectedValue.bind(this);
    this.handleAccept = this.handleAccept.bind(this);

    this.postData = this.postData.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  handleOpenModal(selectedUsers) {
    this.setState({ isOpen: true, selectedUsers });
  }

  handleAccept() {
    const { selectedMentors, passable, selectedUsers } = this.state;
    const { empno, site } = this.props;
    if (selectedUsers.length > 0 && selectedMentors.length > 0) {
      const payload = {
        type: 'insPlanEdu',
        targets: selectedUsers.map(user => {
          if (user && user.eduType === 'job_return') {
            return {
              empNo: user.empno,
              usrnm: user.usrnm,
              step_level: 3,
              mentoid: selectedMentors[0].empno,
              mentonm: selectedMentors[0].usrnm,
              step1_result: 'O',
              step2_result: 'O',
              step3_result: 'X',
              step3_edusdt: moment(new Date()).format('YYYYMMDD'),
              plandt: moment(new Date()).format('YYYYMMDD'),
              site,
              usrId: empno,
              collseq: user.collseq,
            };
          }

          if (user.type !== 'A') {
            return {
              empNo: user.empno,
              usrnm: user.usrnm,
              step_level: 2,
              mentoid: selectedMentors[0].empno,
              mentonm: selectedMentors[0].usrnm,
              step1_result: 'O',
              step2_edusdt: moment(new Date()).format('YYYYMMDD'),
              step2_result: 'X',
              plandt: moment(new Date()).format('YYYYMMDD'),
              site,
              usrId: empno,
              collseq: user.collseq,
            };
          }
          return {
            empNo: user.empno,
            usrnm: user.usrnm,
            step_level: 1,
            mentoid: selectedMentors[0].empno,
            mentonm: selectedMentors[0].usrnm,
            step1_result: 'X',
            step1_edusdt: moment(new Date()).format('YYYYMMDD'),
            plandt: moment(new Date()).format('YYYYMMDD'),
            site,
            usrId: empno,
            collseq: user.collseq,
          };
        }),
      };
      console.debug('Payload : ', payload);
      this.postData(payload).then(result => {
        if (result) {
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('입력 과정중 오류가 발생했습니다.');
        }
      });
    } else {
      alert('교육대상자와 멘토는 한명 이상씩 선택하셔야 합니다.');
    }
  }

  handleCloseModal() {
    this.setState({ isOpen: false, isLoading: true, selectedUsers: [], selectedMentors: [], passable: false });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  handleChangeMentor(e) {
    const { value } = e.target;
    this.setState({ selectedMento: value });
  }

  handleChangePassable() {
    this.setState(prevState => ({ passable: !prevState.passable }));
  }

  handleSelectedValue(target, user) {
    const { empno, usrnm } = user;
    this.setState({ selectedMentors: [{ empno, usrnm }] });
  }

  saveData(e) {
    e.preventDefault();
    const { selectedMento, empno } = this.state;
    const payload = {
      type: 'insPlanEdu',
      empno,
      mentoid: selectedMento,
    };
    if (window.confirm('교육지정하시겠습니까?')) {
      console.debug(payload);
    }
  }

  async postData(payload) {
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  render() {
    const { isOpen, selectedMentors, selectedUsers, isLoading, passable } = this.state;
    const { list } = this.props;
    const mentorUsers = list.filter(empInfo => empInfo.bay !== '미배정' && empInfo.bay !== '휴직' && empInfo.study !== 'job_training');
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 500,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              멘토 지정
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <p style={{ padding: '5px 0', fontWeight: 500 }}>
                <i className="xi-info-o xi-x" /> 멘토는 한명만 선택 가능합니다.
                <br />
                <i className="xi-info-o xi-x" /> 교육대상은 멘토가 될 수 없습니다.
              </p>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={false}>
                <div style={{ overflowY: 'auto', border: '1px solid #eaecee' }}>
                  <div className="transfer_box">
                    <div className="transfer-from">
                      <div style={tabTitleStyle}>교육대상</div>
                      {selectedUsers && selectedUsers.length > 0 && (
                        <div key={selectedUsers[0].empno} style={{ padding: 5 }}>
                          {`${selectedUsers[0].usrnm}(${selectedUsers[0].empno})`}
                        </div>
                      )}
                    </div>
                    <div className="transfer-action" />
                    <div className="transfer-to">
                      <div style={tabTitleStyle}>멘토</div>
                      {mentorUsers.length > 0 && (
                        <Scrollbars style={{ height: 'calc(100% - 35px)', background: 'transparent' }} autoHide>
                          {mentorUsers.map(user => (
                            <div key={user.empno} style={{ padding: 5 }}>
                              <Checkbox
                                className="checkbox"
                                labelText={`${user.usrnm}(${user.empno})`}
                                id={user.empno}
                                noPadding
                                checked={selectedMentors.findIndex(row => row.empno === user.empno) > -1}
                                onChange={() => this.handleSelectedValue('mentor', user)}
                              />
                            </div>
                          ))}
                        </Scrollbars>
                      )}
                    </div>
                  </div>
                </div>
              </Spin>
              <div className="btn_wrap" style={{ marginTop: 20 }}>
                <StyledButton type="button" className="btn-primary btn-sm" onClick={this.handleAccept}>
                  확인
                </StyledButton>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

EduPlanSingleModal.propTypes = {
  callbackHandler: PropTypes.func,
  currentUser: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object),
};

EduPlanSingleModal.defaultProps = {
  callbackHandler: () => false,
  currentUser: '',
  list: [],
};

export default EduPlanSingleModal;

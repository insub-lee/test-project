import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Icon, Spin } from 'antd';
import { jsonToQueryString } from 'utils/helpers';

import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import Scrollbars from 'react-custom-scrollbars';
import Button from 'components/Button';
import moment from 'moment';
import service from '../service';
import StyledContent from './StyledContent';

const tabTitleStyle = {
  margin: '5px',
  textAlign: 'center',
  fontSize: '15px',
  borderBottom: '1px solid #dadada',
};

class EduPlanModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      selectedUsers: [],
      selectedMentors: [],
      targets: [],
      passable: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.getTrainTargets = this.getTrainTargets.bind(this);
    // this.getMentos = this.getMentos.bind(this);
    this.handleChangeMentor = this.handleChangeMentor.bind(this);
    this.handleChangePassable = this.handleChangePassable.bind(this);
    this.handleSelectedValue = this.handleSelectedValue.bind(this);
    this.handleAccept = this.handleAccept.bind(this);

    this.fetchData = this.fetchData.bind(this);
    this.postData = this.postData.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  handleOpenModal() {
    const { empno } = this.props;
    this.setState({ isOpen: true }, () => {
      this.getTrainTargets(empno);
    });
  }

  handleAccept() {
    const { selectedUsers, selectedMentors, passable, targets } = this.state;
    const { empno, site } = this.props;
    console.debug(targets);
    if (selectedUsers.length > 0 && selectedMentors.length > 0) {
      const payload = {
        type: 'insPlanEdu',
        targets: selectedUsers.map(user => {
          const target = targets.find(row => row.empno === user.empno);
          if (target.type !== 'A') {
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
              collseq: target.collseq,
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
            collseq: target.collseq,
          };
        }),
      };
      // if (passable) {
      //   payload = {
      //     type: 'insPlanEdu',
      //     targets: selectedUsers.map(user => ({
      //       empNo: user.empno,
      //       usrnm: user.usrnm,
      //       step_level: 2,
      //       mentoid: selectedMentors[0].empno,
      //       mentonm: selectedMentors[0].usrnm,
      //       step1_result: 'O',
      //       step2_edusdt: moment(new Date()).format('YYYYMMDD'),
      //       step2_result: 'X',
      //       plandt: moment(new Date()).format('YYYYMMDD'),
      //       site,
      //       usrId: empno,
      //     })),
      //   };
      // } else {
      //   payload = {
      //     type: 'insPlanEdu',
      //     targets: selectedUsers.map(user => ({
      //       empNo: user.empno,
      //       usrnm: user.usrnm,
      //       step_level: 1,
      //       mentoid: selectedMentors[0].empno,
      //       mentonm: selectedMentors[0].usrnm,
      //       step1_result: 'X',
      //       step1_edusdt: moment(new Date()).format('YYYYMMDD'),
      //       plandt: moment(new Date()).format('YYYYMMDD'),
      //       site,
      //       usrId: empno,
      //     })),
      //   };
      // }
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

  // getMentos(usrId) {
  //   this.setState({ isLoading: true }, () => {
  //     this.fetchData(usrId).then(({ data }) => {
  //       this.setState({ mentos: data, isLoading: false });
  //     });
  //   });
  // }

  getTrainTargets(usrId) {
    this.setState({ isLoading: true }, () => {
      this.fetchData(usrId).then(({ data }) => {
        this.setState({ targets: data, isLoading: false });
      });
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false, isLoading: true, selectedUsers: [], selectedMentors: [], targets: [], passable: false });
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
    switch (target) {
      case 'mentor': {
        this.setState({ selectedMentors: [{ empno, usrnm }] });
        break;
      }
      case 'user': {
        this.setState(prevState => {
          const { selectedUsers } = prevState;
          const index = selectedUsers.findIndex(row => row.empno === empno);
          if (index > -1) {
            selectedUsers.splice(index, 1);
          } else {
            selectedUsers.push({ empno, usrnm });
          }
          return { selectedUsers };
        });
        break;
      }
      default:
        break;
    }
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
    // this.postData(payload).then(result => {
    //   if (result) {
    //     const { callbackHandler } = this.props;
    //     this.handleCloseModal();
    //     callbackHandler();
    //   } else {
    //     alert('Server Error');
    //   }
    // });
  }

  async fetchData(usrId) {
    const requestQuery = {
      type: 'trainTargetList',
      usrId,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { trainTargetList, insertedTrainTargetList } = response;
      const insertedTargets = insertedTrainTargetList.map(({ collseq, empno }) => `${collseq}-${empno}`);
      const filteredData = trainTargetList.filter(({ collseq, empno }) => !insertedTargets.includes(`${collseq}-${empno}`));
      return {
        data: filteredData,
      };
    }
    return {
      data: [],
    };
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
    const { isOpen, selectedUsers, selectedMentors, isLoading, passable, targets } = this.state;
    const { list } = this.props;
    const noBayUsers = list.filter(empInfo => targets.map(target => target.empno).includes(empInfo.empno));
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
              {/*
              <div style={{ textAlign: 'right' }}>
                <Checkbox id="pass-1" checked={passable} onChange={this.handleChangePassable} labelText="1단계 교육 패스" noPadding />
              </div>
              */}
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={false}>
                <div style={{ overflowY: 'auto', border: '1px solid #eaecee' }}>
                  <div className="transfer_box">
                    <div className="transfer-from">
                      <div style={tabTitleStyle}>교육대상</div>
                      {noBayUsers.length > 0 && (
                        <Scrollbars style={{ height: 'calc(100% - 45px)', marginTop: 15, background: 'transparent' }} autoHide>
                          {noBayUsers.map(user => (
                            <div key={user.empno} style={{ padding: 5 }}>
                              <Checkbox
                                labelText={`${user.usrnm}(${user.empno})`}
                                id={user.empno}
                                noPadding
                                checked={selectedUsers.findIndex(row => row.empno === user.empno) > -1}
                                onChange={() => this.handleSelectedValue('user', user)}
                              />
                            </div>
                          ))}
                        </Scrollbars>
                      )}
                    </div>
                    <div className="transfer-action" />
                    <div className="transfer-to">
                      <div style={tabTitleStyle}>멘토</div>
                      {mentorUsers.length > 0 && (
                        <Scrollbars style={{ height: 'calc(100% - 45px)', marginTop: 15, background: 'transparent' }} autoHide>
                          {mentorUsers.map(user => (
                            <div key={user.empno} style={{ padding: 5 }}>
                              <Checkbox
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
              <div className="btn_wrap">
                <Button type="button" size="small" color="primary" onClick={this.handleAccept}>
                  확인
                </Button>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

EduPlanModal.propTypes = {
  callbackHandler: PropTypes.func,
  currentUser: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object),
};

EduPlanModal.defaultProps = {
  callbackHandler: () => false,
  currentUser: '',
  list: [],
};

export default EduPlanModal;

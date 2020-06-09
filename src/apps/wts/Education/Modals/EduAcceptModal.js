import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import moment from 'moment';

import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import Button from 'components/Button';
import { Icon, Spin } from 'antd';
import StyledContent from './StyledContent';
import service from '../service';

class EduManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      seqs: [],
      checkedUsers: [],
      eduList: [],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
    this.accept = this.accept.bind(this);
  }

  handleOpenModal(eduList, checkedUsers, seqs = []) {
    if (checkedUsers.length > 0) {
      this.setState({ isOpen: true, eduList, checkedUsers, seqs, isLoading: false });
    } else {
      alert('지정된 대상자가 없습니다.');
    }
  }

  handleCloseModal() {
    this.setState({ isOpen: false, eduList: [], checkedUsers: [], seqs: [], isLoading: true });
  }

  handleChangeChecked(e) {
    const { value } = e.target;
    this.setState(prevState => {
      const { seqs } = prevState;
      const numValue = parseInt(value, 10);
      const index = seqs.findIndex(seq => seq === numValue);
      if (index > -1) {
        seqs.splice(index, 1);
      } else {
        seqs.push(numValue);
      }
      return { seqs };
    });
  }

  titleRenderer(target) {
    let targetName = '';
    switch (target) {
      case 'job':
        targetName = '직무능력평가';
        break;
      case 'job_mask':
        targetName = '직무능력평가(MASK)';
        break;
      case 'job_meter':
        targetName = '직무능력평가(계측기)';
        break;
      case 'job_handling':
        targetName = 'HANDLING 평가표';
        break;
      case 'job_proc':
        targetName = '공정 교육';
        break;
      case 'job_clean':
        targetName = '청정도 교육';
        break;
      case 'job_mashine':
        targetName = '장비 교육인증';
        break;
      case 'job_return':
        targetName = '복직자 교육';
        break;
      default:
        targetName = '';
        break;
    }
    return targetName;
  }

  accept() {
    const { seqs, checkedUsers } = this.state;
    const { site } = this.props;
    if (seqs.length === 0) {
      alert('선택하신 교육이 없습니다.');
    } else {
      this.postData(
        site,
        seqs,
        checkedUsers.map(({ empno }) => empno),
      ).then(result => {
        if (result) {
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('등록중에 오류가 발생했습니다.');
          this.setState({ isLoading: false });
        }
      });
    }
  }

  async postData(site, seqs, empNos) {
    const payload = {
      type: 'insJobEdu',
      seqs,
      empNos,
      searchSite: site,
    };
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  render() {
    const { isOpen, eduList, seqs, checkedUsers, isLoading } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 700,
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
              교육 신청하기
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <div>대상자: {checkedUsers.map(({ empno, usrnm }) => `${usrnm}(${empno})`).join(', ')}</div>
                <hr />
                {eduList.map(edu => (
                  <Checkbox
                    key={`edu-${edu.coll_seq}`}
                    id={`edu-${edu.coll_seq}`}
                    name={`edu-${edu.coll_seq}`}
                    labelText={`${this.titleRenderer(edu.study)} - ${edu.times} (${moment(edu.collecsdt, 'YYYYMMDD').format('YYYY.MM.DD')} - ${moment(
                      edu.collecedt,
                      'YYYYMMDD',
                    ).format('YYYY.MM.DD')})`}
                    value={edu.coll_seq}
                    onChange={this.handleChangeChecked}
                    checked={seqs.includes(edu.coll_seq)}
                  />
                ))}
                <div className="btn_wrap">
                  <Button type="button" size="small" color="primary" onClick={this.accept}>
                    확인
                  </Button>
                </div>
              </Spin>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

EduManageModal.propTypes = {
  callbackHandler: PropTypes.func,
};

EduManageModal.defaultProps = {
  callbackHandler: () => false,
};

export default EduManageModal;

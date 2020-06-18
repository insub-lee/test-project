import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Icon, Spin } from 'antd';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import service from '../service';
import StyledContent from './StyledContent';

class MentorOpinion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      writeAble: false,
      opinion: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateData = this.updateData.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  handleOpenModal(planseq, empno, step, opinion, writeAble) {
    console.debug('#opinion', opinion);
    this.setState({ isOpen: true, planseq, empno, step, opinion, writeAble });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  saveData(e) {
    e.preventDefault();
    const { planseq, empno, step } = this.state;
    const formData = new FormData(e.target);
    const payload = {
      type: 'updateMentorOpinion',
      plan_seq: planseq,
      empno,
      step_level: step,
    };
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    if (!payload.memto_opinion || payload.memto_opinion.trim() === '') {
      alert('의견을 작성해주세요.');
    } else {
      this.updateData(payload).then(result => {
        if (result) {
          alert('등록되었습니다.');
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('등록과정에서 오류가 발생했습니다.');
        }
      });
    }
  }

  async updateData(payload) {
    const { response, error } = await service.user.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  render() {
    const { isOpen, isLoading, opinion, writeAble } = this.state;
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
              멘토의견
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledCommonForm onSubmit={this.saveData} autoComplete="off">
                  <ul className="sub_form small2 has_margin">
                    <li style={{ padding: 0 }}>
                      <div style={{ padding: '10px 0' }}>
                        {writeAble && (
                          <textarea
                            name="memto_opinion"
                            defaultValue={opinion}
                            cols="30"
                            rows="10"
                            placeholder="의견을 작성하세요.(200자 내)"
                            maxLength={200}
                          />
                        )}
                        {!writeAble && (!opinion || opinion.trim() === '') && <p style={{ color: '#3e3e3e' }}>작성된 의견이 없습니다.</p>}
                        {!writeAble && !(!opinion || opinion.trim() === '') && <p>{opinion}</p>}
                      </div>
                    </li>
                  </ul>
                  {writeAble && (
                    <div className="btn_wrap">
                      <StyledButton type="submit" className="btn-primary btn-sm">
                        확인
                      </StyledButton>
                    </div>
                  )}
                </StyledCommonForm>
              </Spin>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

MentorOpinion.propTypes = {
  callbackHandler: PropTypes.func,
};

MentorOpinion.defaultProps = {
  callbackHandler: () => false,
};

export default MentorOpinion;

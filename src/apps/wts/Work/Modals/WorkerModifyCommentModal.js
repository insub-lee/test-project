import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContent from './StyledContent';
import service from '../service';

class WorkerModifyCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      empNo: '',
      workDt: '',
      owcoment: '',
      originContents: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleChangeOwcoment = this.handleChangeOwcoment.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }

  handleOpenModal(empNo, workDt, owcoment) {
    this.setState({ isOpen: true, owcoment, originContents: owcoment, empNo, workDt });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      id: '',
      originContents: '',
    });
  }

  handleAfterOpen() {
    const { id } = this.state;
    console.debug('Opened Modal : ', id);
  }

  submitData(e) {
    e.stopPropagation();
    e.preventDefault();
    const { callbackHandler } = this.props;
    const data = new FormData(e.target);
    const payload = {};
    data.forEach((value, key) => {
      payload[key] = value;
    });
    payload.type = 'manHis';
    this.updateComment(payload).then(result => {
      if (result) {
        this.handleCloseModal();
        callbackHandler();
      }
    });
    // Will Send with origin Contents
  }

  handleChangeOwcoment(e) {
    const { value } = e.target;
    this.setState({ owcoment: value });
  }

  async updateComment(payload) {
    let result = false;
    const { response, error } = await service.manHisChief.put(payload);
    if (response && !error) {
      result = true;
    }
    return result;
  }

  render() {
    const { isOpen, empNo, workDt, owcoment, originContents } = this.state;
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
              일일 근무이력 작성(근무자)
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <StyledCommonForm onSubmit={this.submitData} autoComplete="off">
                <input type="hidden" name="empNo" value={empNo} />
                <input type="hidden" name="workDt" value={workDt} />
                <ul className="sub_form small2">
                  <li>
                    <label htmlFor="owcoment" className="title">
                      내용
                    </label>
                    <textarea
                      name="owcoment"
                      id="owcoment"
                      cols="30"
                      rows="10"
                      placeholder="수정 할 내용을 입력해주세요."
                      value={owcoment}
                      onChange={this.handleChangeOwcoment}
                    />
                  </li>
                  {/*
                  <li>
                    <label htmlFor="comment" className="title">
                      수정 사유
                    </label>
                    <textarea name="reason" id="comment" cols="30" rows="10" placeholder="수정 사유를 입력해 주세요." />
                  </li>
                  */}
                </ul>
                <div className="btn_wrap">
                  <StyledButton type="submit" className="btn-primary btn-sm">
                    확인
                  </StyledButton>
                </div>
              </StyledCommonForm>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

WorkerModifyCommentModal.propTypes = {
  callbackHandler: PropTypes.func,
};

WorkerModifyCommentModal.defaultProps = {
  callbackHandler: () => false,
};

export default WorkerModifyCommentModal;

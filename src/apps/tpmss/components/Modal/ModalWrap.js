import React from 'react';
import PropTypes from 'prop-types';
import StyledModal from './StyledModal';
import StyledButton from '../Button';

const ModalWrap = ({ actionController }) => (
  <StyledModal>
    <div className="pop_tit">
      비밀번호 입력
      <button type="button" className="icon icon_pclose" onClick={actionController.handleCloseModal} />
    </div>
    <div className="pop_con">
      <form action="" autoComplete="off">
        <input type="text" placeholder="비밀번호를 입력해 주세요." className="input mb20" />
        <div className="btn_wrap">
          <StyledButton color="primary" size="big" onClick={actionController.handleCloseModal}>
            확인하기
          </StyledButton>
        </div>
      </form>
    </div>
  </StyledModal>
);

ModalWrap.propTypes = {
  actionController: PropTypes.shape({
    handleOpenModal: PropTypes.func,
  }),
};

ModalWrap.defaultProps = {
  actionController: {
    handleOpenModal: () => false,
  },
};

export default ModalWrap;

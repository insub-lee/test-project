import React from 'react';
import PropTypes from 'prop-types';
import StyledSubTable from './StyledSubTable';
import StyledButton from '../../Button';

const SubTableTwo = ({ record, actionController }) => (
  <StyledSubTable>
    <div className="sub_tit_bg">
      <span className="big">제목</span>
      <span className="line" />
      <span className="small">{record.title}</span>
      <div className="btn_wrap">
        <StyledButton color="gray" size="small" onClick={actionController.handleOpenModal}>
          수정
        </StyledButton>
        <StyledButton color="gray" size="small" onClick={actionController.handleOpenModal2}>
          삭제
        </StyledButton>
        <StyledButton color="gray" size="small" onClick={actionController.handleOpenModal3}>
          <i className="fas fa-external-link-alt" />
        </StyledButton>
      </div>
    </div>
    <div className="view_con">
      {record.contents.map(item => (
        <div className="view_txt">{item.option.value}</div>
      ))}
    </div>
  </StyledSubTable>
);

SubTableTwo.propTypes = {
  record: PropTypes.shape({
    title: PropTypes.string,
    num: PropTypes.number,
    contents: PropTypes.arrayOf(PropTypes.object),
  }),
  actionController: PropTypes.shape({
    handleOpenModal: PropTypes.func,
    handleOpenModal2: PropTypes.func,
    handleOpenModal3: PropTypes.func,
  }),
};

SubTableTwo.defaultProps = {
  record: {
    title: '',
    num: 0,
    contents: [],
  },
  actionController: {
    handleOpenModal: () => false,
    handleOpenModal2: () => false,
    handleOpenModal3: () => false,
  },
};

export default SubTableTwo;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LawClauseSeqComp extends Component {
  componentDidMount = () => {
    const { sagaKey: id, COMP_FIELD, compProps, changeFormData } = this.props;
    if (compProps && compProps.MASTER_SEQ) {
      changeFormData(id, COMP_FIELD, (compProps && compProps.QUARTER) || ''); // 분기 QUARTER_CHECK
      changeFormData(id, 'YEAR', (compProps && compProps.YEAR) || ''); // 연도
      changeFormData(id, 'RECH_LAW_NAME', (compProps && compProps.MASTER_RECH_NAME) || ''); // 법규명
      changeFormData(id, 'RECH_NO', (compProps && compProps.MASTER_NO) || ''); // 법규 관리번호
      changeFormData(id, 'RECH_CLAUSE', (compProps && compProps.CLAUSE_RECH_NAME) || ''); // 조항 명
      changeFormData(id, 'RECH_CLAUSE_GUBUN', (compProps && compProps.CLAUSE_GUBUN_NAME) || ''); // 법령 구분명
      changeFormData(id, 'CLAUSE_TASK_SEQ', (compProps && compProps.CLAUSE_TASK_SEQ) || ''); // 조항 SEQ
    }
  };

  render = () => {
    const {
      visible,
      colData,
      compProps,
      compProps: { YEAR, QUARTER },
      formData,
    } = this.props;
    return visible && compProps ? (
      <span>
        {formData.YYYY || YEAR}년 {colData || QUARTER} 분기
      </span>
    ) : (
      ''
    );
  };
}

LawClauseSeqComp.propTypes = {
  colData: PropTypes.any,
  formData: PropTypes.object,
  compProps: PropTypes.any,
  visible: PropTypes.bool,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  changeFormData: PropTypes.func,
};

export default LawClauseSeqComp;

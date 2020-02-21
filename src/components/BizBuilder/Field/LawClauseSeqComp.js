import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class LawClauseSeqComp extends Component {
  componentDidMount = () => {
    const { sagaKey: id, COMP_FIELD, compProps, changeFormData } = this.props;
    if (compProps && compProps.MASTER_SEQ) {
      changeFormData(id, COMP_FIELD, (compProps && compProps.QUARTER) || ''); // 분기 QUARTER_CHECK
      changeFormData(id, 'YEAR', (compProps && compProps.YEAR) || ''); // 년도
      changeFormData(id, 'RECH_LAW_NAME', (compProps && compProps.MASTER_RECH_NAME) || ''); // 법규명
      changeFormData(id, 'RECH_NO', (compProps && compProps.MASTER_NO) || ''); // 법규 관리번호
      changeFormData(id, 'RECH_CLAUSE', (compProps && compProps.CLAUSE_RECH_NAME) || ''); // 조항 명
      changeFormData(id, 'RECH_CLAUSE_GUBUN', (compProps && compProps.CLAUSE_GUBUN_NAME) || ''); // 법령 구분명
      changeFormData(id, 'CLAUSE_TASK_SEQ', (compProps && compProps.CLAUSE_TASK_SEQ) || ''); // 조항 SEQ
    }
  };

  ClauseSeqRender = () => {
    const { colData, compProps } = this.props;
    const { YEAR, MASTER_RECH_NAME, MASTER_NO, CLAUSE_RECH_NAME, CLAUSE_GUBUN_NAME } = compProps;
    return (
      <table>
        <tbody>
          <tr>
            <td style={{ width: 225 }}>
              <span>법규명</span>
            </td>
            <td style={{ width: 225 }}>
              <Input className="input-width200" value={MASTER_RECH_NAME || ''} readOnly />
            </td>
            <td style={{ width: 225 }}>
              <span>관리번호</span>
            </td>
            <td style={{ width: 225 }}>
              <Input className="input-width200" value={MASTER_NO || ''} readOnly />
            </td>
          </tr>
          <tr>
            <td style={{ width: 225 }}>
              <span>년도</span>
            </td>
            <td style={{ width: 225 }}>
              <Input className="input-width200" value={YEAR || ''} readOnly />
            </td>
            <td style={{ width: 225 }}>
              <span>{colData} 분기</span>
            </td>
          </tr>
          <tr>
            <td style={{ width: 225 }}>
              <span>법령</span>
            </td>
            <td style={{ width: 225 }}>
              <Input className="input-width200" value={CLAUSE_GUBUN_NAME || ''} readOnly />
            </td>
            <td style={{ width: 225 }}>
              <span>조항</span>
            </td>
            <td style={{ width: 225 }}>
              <Input className="input-width200" value={CLAUSE_RECH_NAME || ''} readOnly />
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  render = () => {
    const { visible, compProps } = this.props;
    return visible ? <>{compProps ? this.ClauseSeqRender() : ''}</> : '';
  };
}

LawClauseSeqComp.propTypes = {
  colData: PropTypes.any,
  visible: PropTypes.bool,
};

export default LawClauseSeqComp;

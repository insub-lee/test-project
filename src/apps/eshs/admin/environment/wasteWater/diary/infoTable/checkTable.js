import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Input } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
// import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import styled from 'styled-components';

// const AntdInput = StyledInput(Input);

const Styled = styled.div`
  .middle-title-wrap {
    margin: 20px 0px 5px 0px;
  }

  .subFormTable-title {
    padding-left: 5px;
    font-weight: 600;
  }
`;

const initFormData = {
  DATE_FROM: '',
  DATE_TO: '',
  CHECKER: '',
  VIOLATION: '',
  COMMENTS: '',
};

// 용폐수 - 관리 - 일지 - 지도, 점검 사항
class CheckTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData, modalHandler } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">지도/점검 사항</span>
          </div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ display: 'inline-block', width: '80%' }}>
            <StyledButton className="btn-primary btn-xxs ml5" onClick={() => modalHandler('CHECK_INFO', true, initFormData)}>
              추가
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="8%" />
              <col width="12%" />
              <col width="15%" />
              <col width="30%" />
              <col width="35%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>SEQ</span>
                </th>
                <th colSpan={1}>
                  <span>점검자</span>
                </th>
                <th colSpan={1}>
                  <span>점검기관</span>
                </th>
                <th colSpan={1}>
                  <span>위반사항</span>
                </th>
                <th colSpan={1}>
                  <span>조치계획</span>
                </th>
              </tr>
              {formData && formData.length > 0 ? (
                formData.map(row => (
                  <tr key={row.SEQ} className="tr-center">
                    <td colSpan={1}>
                      <span>{row.SEQ}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.CHECKER}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.CHK_CMPNY}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.VIORATION}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.COMMENTS}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty" className="tr-center">
                  <td colSpan={6}>
                    <span>조회된 데이터가 없습니다.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

CheckTable.propTypes = {
  formData: PropTypes.array,
  modalHandler: PropTypes.func,
};

CheckTable.defaultProps = {
  formData: [],
};

export default CheckTable;

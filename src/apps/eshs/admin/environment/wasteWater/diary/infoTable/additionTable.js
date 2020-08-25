import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Input } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
// import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
// import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
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

// 용폐수 - 관리 - 일지 - Sludge 처리 시설
class AdditionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">원료 / 첨가제 사용량</span>
          </div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ display: 'inline-block', width: '80%' }}>
            {/* 
              <StyledButton className="btn-primary btn-xs ml5" onClick={() => submitFormData('SAVE_WATER_FLOW')}>
                검침시간 저장
              </StyledButton>
              */}
          </StyledButtonWrapper>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="60%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>SEQ</span>
                </th>
                <th colSpan={1}>
                  <span>원료 / 첨가제 명</span>
                </th>
                <th colSpan={1}>
                  <span>사용량</span>
                </th>
              </tr>
              {formData && formData.length > 0 ? (
                formData.map(row => (
                  <tr key={row.SEQ} className="tr-center">
                    <th colSpan={1}>
                      <span>{row.SEQ}</span>
                    </th>
                    <td colSpan={1}>
                      <span>{row.ADDITION_NM ? row.ADDITION_NM : ''}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.USED_AMOUNT}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty" className="tr-center">
                  <td colSpan={5}>
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

AdditionTable.propTypes = {
  formData: PropTypes.array,
};

AdditionTable.defaultProps = {
  formData: [],
};

export default AdditionTable;

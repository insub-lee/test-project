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

// 용폐수 - 관리 - 일지 - 폭기조 운전상태
class PokgijoTable extends Component {
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
            <span className="subFormTable-title">폭기조 운전상태</span>
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
              <col width="40%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>측정 Point</span>
                </th>
                <th colSpan={1}>
                  <span>수온</span>
                </th>
                <th colSpan={1}>
                  <span>폭기시간</span>
                </th>
                <th colSpan={1}>
                  <span>주미생물상태</span>
                </th>
              </tr>
              {formData && formData.length > 0 ? (
                formData.map(row => (
                  <tr key={row.MEASUREMENT_POINT} className="tr-center">
                    <th colSpan={1}>
                      <span>{row.MEASUREMENT_POINT}</span>
                    </th>
                    <td colSpan={1}>
                      <span>{row.WATER_TEMPERATURE}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.POKGI_TIME}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.MICROBIC_STATE}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty" className="tr-center">
                  <td colSpan={4}>
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

PokgijoTable.propTypes = {
  formData: PropTypes.array,
};

PokgijoTable.defaultProps = {
  formData: [],
};

export default PokgijoTable;

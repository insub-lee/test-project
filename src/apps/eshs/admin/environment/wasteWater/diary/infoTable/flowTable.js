import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import styled from 'styled-components';

const AntdInput = StyledInput(Input);

const Styled = styled.div`
  .middle-title-wrap {
    margin: 20px 0px 5px 0px;
  }

  .subFormTable-title {
    padding-left: 5px;
    font-weight: 600;
  }
`;

// 용수공급원별 사용량 테이블
class FlowTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData, submitFormData, onChangeFormData } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">용수공급원별 사용량</span>
          </div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ display: 'inline-block', width: '80%' }}>
            <StyledButton className="btn-primary btn-xs ml5" onClick={() => submitFormData('SAVE_WATER_FLOW')}>
              검침시간 저장
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>구분</span>
                </th>
                <th colSpan={1}>
                  <span>전일지침</span>
                </th>
                <th colSpan={1}>
                  <span>금일지침</span>
                </th>
                <th colSpan={1}>
                  <span>사용량(㎥)</span>
                </th>
                <th colSpan={1}>
                  <span>검침시간</span>
                </th>
              </tr>
              {formData &&
                formData.length > 0 &&
                formData.map((row, index) => (
                  <tr key={row.GUBUN} className="tr-center">
                    <th colSpan={1}>
                      <span>{row.GUBUN}</span>
                    </th>
                    <td colSpan={1}>
                      <span>{row.THE_DAY_BEFORE_INDEX}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.THE_DAY_INDEX}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.USED_AMOUNT}</span>
                    </td>
                    <td colSpan={1}>
                      <AntdInput
                        className="ant-input-xxs"
                        style={{ width: '100%' }}
                        value={row.INSPECTION_TIME || ''}
                        onChange={e => onChangeFormData('INSPECTION_TIME', e.target.value, index)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

FlowTable.propTypes = {
  formData: PropTypes.array,
  submitFormData: PropTypes.func,
  onChangeFormData: PropTypes.func,
};

FlowTable.defaultProps = {
  formData: [],
};

export default FlowTable;

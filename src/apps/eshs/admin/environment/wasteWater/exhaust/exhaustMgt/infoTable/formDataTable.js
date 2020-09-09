import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInput = StyledInput(Input);

class formDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData, onChangeFormData, submitFormData } = this.props;
    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>배출시설명</span>
                </th>
                <td colSpan={1}>
                  <AntdInput className="ant-input-sm" value={formData.EXHAUST_NM || ''} onChange={e => onChangeFormData('EXHAUST_NM', e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            {formData.EXHAUST_CD && formData.EXHAUST_CD !== '-1' ? (
              <>
                <StyledButton className="btn-primary btn-sm ml5" onClick={() => submitFormData('MOD')}>
                  수정
                </StyledButton>
                <StyledButton className="btn-light btn-sm ml5" onClick={() => submitFormData('DEL')}>
                  삭제
                </StyledButton>
              </>
            ) : (
              <StyledButton className="btn-primary btn-sm ml5" onClick={() => submitFormData('ADD')}>
                저장
              </StyledButton>
            )}
          </StyledButtonWrapper>
        </StyledHtmlTable>
      </>
    );
  }
}

formDataTable.propTypes = {
  formData: PropTypes.object,
  onChangeFormData: PropTypes.func,
  submitFormData: PropTypes.func,
};

formDataTable.defaultProps = {
  formData: [],
};

export default formDataTable;

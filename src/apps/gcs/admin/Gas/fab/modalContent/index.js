import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdInput = StyledInput(Input);

class SafetyWorkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { viewType, formData, onChangeFormData, submitFormData, handleModal } = this.props;
    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>
                  <span>Key-No</span>
                </th>
                <td>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    value={formData.FAB_KEYNO}
                    readOnly={viewType === 'MODIFY'}
                    style={{ width: '100%' }}
                    onChange={e => onChangeFormData('FAB_KEYNO', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <span>사용공정</span>
                </th>
                <td>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    value={formData.FAB_PROC}
                    style={{ width: '100%' }}
                    onChange={e => onChangeFormData('FAB_PROC', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <span>장비위치</span>
                </th>
                <td>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    value={formData.FAB_AREA}
                    style={{ width: '100%' }}
                    onChange={e => onChangeFormData('FAB_AREA', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          {viewType === 'MODIFY' ? (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => submitFormData('MODIFY', true)}>
                확인
              </StyledButton>
              <StyledButton className="btn-light btn-sm btn-first" onClick={() => submitFormData('DELETE', true)}>
                삭제
              </StyledButton>
              <StyledButton className="btn-light btn-sm btn-first" onClick={() => handleModal('', false)}>
                취소
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => submitFormData('ADD', true)}>
                신규등록
              </StyledButton>
              <StyledButton className="btn-light btn-sm btn-first" onClick={() => handleModal('', false)}>
                취소
              </StyledButton>
            </>
          )}
        </div>
      </>
    );
  }
}

SafetyWorkInfo.propTypes = {
  viewType: PropTypes.object,
  formData: PropTypes.object,
  onChangeFormData: PropTypes.func,
  submitFormData: PropTypes.func,
  handleModal: PropTypes.func,
};

SafetyWorkInfo.defaultProps = {};

export default SafetyWorkInfo;

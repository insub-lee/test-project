import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInput = StyledInput(Input);

// 용폐수 - 일지 - 지도, 점검사항 모달

class CheckInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData, onChangeFormData, submitFormData } = this.props;
    console.debug('폼데이터', formData);
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <span className="text-label">일지 날짜</span>
            <AntdInput className="ant-input-sm ant-input-inline" style={{ width: '100px', marginRight: '10px' }} value="2020-08-19" />
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => submitFormData('SAVE_CHECK_INFO')}>
              저장
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="25%" />
              <col width="75%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>점검기관</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={50}
                    value={formData.CHK_CMPNY || ''}
                    onChange={e => onChangeFormData('CHK_CMPNY', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>점검자</span>
                </th>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={50}
                    value={formData.CHECKER || ''}
                    onChange={e => onChangeFormData('CHECKER', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>위반사항</span>
                </th>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={100}
                    value={formData.VIOLATION || ''}
                    onChange={e => onChangeFormData('VIOLATION', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>조치계획</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={200}
                    value={formData.COMMENTS || ''}
                    onChange={e => onChangeFormData('COMMENTS', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </>
    );
  }
}

CheckInfoModal.propTypes = {
  formData: PropTypes.object,
  submitFormData: PropTypes.func,
  onChangeFormData: PropTypes.func,
};

export default CheckInfoModal;

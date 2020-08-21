import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInput = StyledInput(Input);

class CleanRepairModal extends Component {
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
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => submitFormData('SAVE_CLEAN_REPAIR_INFO')}>
              저장
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>방지시설명</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={40}
                    value={formData.CLEAN_NM}
                    onChange={e => onChangeFormData('CLEAN_NM', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>고강시간 From</span>
                </th>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={2}
                    value={formData.TIME_FROM}
                    onChange={e => onChangeFormData('TIME_FROM', e.target.value)}
                  />
                </td>
                <th colSpan={1}>
                  <span>고강시간 To</span>
                </th>
                <td colSpan={1}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={2}
                    value={formData.TIME_TO}
                    onChange={e => onChangeFormData('TIME_TO', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>고장상태</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={100}
                    value={formData.STATE}
                    onChange={e => onChangeFormData('STATE', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>조치상태</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={100}
                    value={formData.STATE_AFTER}
                    onChange={e => onChangeFormData('STATE_AFTER', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>특기사항</span>
                </th>
                <td colSpan={3}>
                  <AntdInput
                    className="ant-input-xs ant-input-inline"
                    style={{ width: '100%', marginRight: '10px' }}
                    maxLength={100}
                    value={formData.COMMENTS}
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
CleanRepairModal.propTypes = {
  formData: PropTypes.object,
  submitFormData: PropTypes.func,
  onChangeFormData: PropTypes.func,
};

export default CleanRepairModal;

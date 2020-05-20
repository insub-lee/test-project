import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledTextarea from 'commonStyled/Form/StyledTextarea';

const { TextArea } = Input;
const AntdTextArea = StyledTextarea(TextArea);

class ExmInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData, changeFormData } = this.props;
    return (
      <StyledHtmlTable>
        <table>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <tbody>
            <tr>
              <th colSpan={2}>
                <span>검토회사</span>
              </th>
              <td colSpan={3}>
                <span>{formData.EXM_CMPNY_CD !== '' ? formData.EXM_CMPNY_CD : ''}</span>
              </td>
              <th colSpan={2}>
                <span>검토부서(운전부서)</span>
              </th>
              <td colSpan={3}>
                <span>{formData.EXM_DEPT_CD !== '' ? formData.EXM_DEPT_CD : ''}</span>
              </td>
            </tr>
            <tr>
              <th colSpan={2}>
                <span>검토자(운전자)</span>
              </th>
              <td colSpan={3}>
                <span>{formData.EXM_EMP_NM !== '' ? formData.EXM_EMP_NM : ''}</span>
              </td>
              <th colSpan={2}>
                <span>최종 검토자</span>
              </th>
              <td colSpan={3}>
                <span>{formData.FINAL_OK_EMP_NM !== '' ? formData.FINAL_OK_EMP_NM : ''}</span>
              </td>
            </tr>
            <tr>
              <th colSpan={2}>
                <span>허가일자</span>
              </th>
              <td colSpan={8}>
                <span>{formData.REQUEST_DT !== '' ? moment(formData.REQUEST_DT).format('YYYY-MM-DD') : ''}</span>
              </td>
            </tr>
            <tr>
              <th colSpan={2}>
                <span>검토내용</span>
              </th>
              <td colSpan={8}>
                <AntdTextArea
                  rows={2}
                  value={formData.EXM_COMMENT && formData.EXM_COMMENT !== '' ? formData.EXM_COMMENT : ''}
                  onChange={e => changeFormData('EXM_COMMENT', e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

ExmInfo.propTypes = {
  formData: PropTypes.object,
  handleUploadFileChange: PropTypes.func,
  changeFormData: PropTypes.func,
};

ExmInfo.defaultProps = {};

export default ExmInfo;

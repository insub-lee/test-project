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
  CLEAN_NM: '',
  TIME_FROM: '',
  TIME_TO: '',
  STATE: '',
  STATE_AFTER: '',
  COMMENTS: '',
};

// 용폐수 - 관리 - 일지 - 방지시설 유지보수 관리
class WattmeterTable extends Component {
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
            <span className="subFormTable-title">방지시설 유지보수</span>
          </div>
          <StyledButtonWrapper className="btn-wrap-right" style={{ display: 'inline-block', width: '80%' }}>
            <StyledButton className="btn-primary btn-xxs ml5" onClick={() => modalHandler('CLEAN_REPAIR', true, initFormData)}>
              추가
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="10%" />
              <col width="10%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>방지시설명</span>
                </th>
                <th colSpan={1}>
                  <span>From</span>
                </th>
                <th colSpan={1}>
                  <span>To</span>
                </th>
                <th colSpan={1}>
                  <span>고장상태</span>
                </th>
                <th colSpan={1}>
                  <span>조치상태</span>
                </th>
                <th colSpan={1}>
                  <span>특기사항</span>
                </th>
              </tr>
              {formData && formData.length > 0 ? (
                formData.map(row => (
                  <tr key={row.SEQ} className="tr-center">
                    <th colSpan={1}>
                      <span>{row.CLEAN_NM}</span>
                    </th>
                    <td colSpan={1}>
                      <span>{row.TIME_FROM}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.TIME_TO}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.STATE}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.STATE_AFTER}</span>
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

WattmeterTable.propTypes = {
  formData: PropTypes.array,
  modalHandler: PropTypes.func,
};

WattmeterTable.defaultProps = {
  formData: [],
};

export default WattmeterTable;

import React, { Component } from 'react';
import { Input, Select, Row, Col } from 'antd';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class ChkHospitalItemView extends Component {
  state = {
    detail: {}
  }

  componentWillMount() {
    const { sagaKey: id, getCallDataHandler, selectedRow } = this.props;
    if (selectedRow && selectedRow.HOSPITAL_CODE && selectedRow.CHK_TYPE) {
      const apiAry = [
        {
          key: 'itemDetail',
          url: `/api/eshs/v1/common/health/healthChkHospitalItem?HOSPITAL_CODE=${selectedRow.HOSPITAL_CODE}&CHK_TYPE=${selectedRow.CHK_TYPE}`,
          type: 'GET',
        },
      ];
      getCallDataHandler(id, apiAry, this.initState);
    }
  }

  initState = () => {
    const { result } = this.props;
    if (result.itemDetail && result.itemDetail && result.itemDetail.detail) {
      this.setState({
        detail: result.itemDetail.detail
      });
    }
  };

  render() {
    const { detail } = this.state;
    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
            </colgroup>
            <tbody>
              <tr>
                <th>지역</th>
                <td>
                  {/* <AntdSelect defaultValue={detail.HOSPITAL_SITE}>
                    <AntdSelect.Option value={}></AntdSelect.Option>
                  </AntdSelect> */}
                </td>
                <th>검진기관</th>
                <td></td>
              </tr>
              <tr>
                <th>검진유형</th>
                <td></td>
                <th>검진유형명</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <Row gutter={20}>
          <Col span={8}></Col>
          <Col span={2}>
            <StyledButton>{`>>`}</StyledButton>
          </Col>
          <Col span={14}>
            <div>그룹1</div>
            <div>그룹2</div>
          </Col>
        </Row>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary" onClick={this.onSaveCode}>저장</StyledButton>
        </StyledButtonWrapper>
      </>
    )
  }
}

export default ChkHospitalItemView;
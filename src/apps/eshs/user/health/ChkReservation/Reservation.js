import React, { Component } from 'react';
import { Modal, Select, Input } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import Questionnaire from './Questionnaire';

const AntdModal = StyledAntdModalPad(Modal);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class Reservation extends Component {
  state = {
    isQuestionnaireShow: false,
    reservationInfo: {},
    hospitalList: [],
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(sagaKey, apiAry, this.initState);
  }

  initState = () => {
    const { result } = this.props;
    this.setState({
      hospitalList: result.hospitalList && result.hospitalList.list ? result.hospitalList.list : [],
    })
  };

  onClickQuestionnaire = () => {
    this.setState({ isQuestionnaireShow: true });
  };

  onCancelQuestionnaire = () => {
    this.setState({ isQuestionnaireShow: false });
  };

  render() {
    const { profile } = this.props;
    const { hospitalList } = this.state;

    return (
      <>
        <AntdModal
          width={1050}
          visible={this.state.isQuestionnaireShow}
          title="건강검진 공통 문진표"
          onCancel={this.onCancelQuestionnaire}
          destroyOnClose
          footer={null}
        >
          <Questionnaire onCancelPopup={this.onCancelQuestionnaire} profile={profile} />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledHtmlTable className="tableWrapper">
            <table>
              <colgroup>
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>사번</th>
                  <td>{profile.EMP_NO}</td>
                  <th>이름</th>
                  <td>{profile.NAME_KOR}</td>
                  <td colSpan={4}>
                    <StyledButton className="btn-sm btn-gray" onClick={this.onClickQuestionnaire}>
                      문진표 작성
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>검진종류</th>
                  <td>종합</td>
                  <th>검진차수</th>
                  <td>1차</td>
                  <th>검진기관</th>
                  <td>
                    <AntdSelect placeholer="검진기관 선택" className="select-sm" style={{ width: '95%' }}>
                      {hospitalList.map(item => (
                        <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                      ))}
                    </AntdSelect>
                  </td>
                  <th>검진예약일</th>
                  <td>
                    <AntdInput className="ant-input-sm" readOnly onClick={this.onClickCalendar} />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </StyledContentsWrapper>
      </>
    );
  }
}

export default Reservation;

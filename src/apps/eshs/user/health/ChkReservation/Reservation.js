import React, { Component } from 'react';
import { Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';

import Questionnaire from './Questionnaire';

const AntdModal = StyledAntdModalPad(Modal);

class Reservation extends Component {
  state = {
    isQuestionnaireShow: false,
  };

  componentDidMount() {}

  onClickQuestionnaire = () => {
    this.setState({ isQuestionnaireShow: true });
  };

  onCancelQuestionnaire = () => {
    this.setState({ isQuestionnaireShow: false });
  };

  render() {
    const { profile } = this.props;
    console.debug('profile >> ', profile);
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
          <Questionnaire onCancelPopup={this.onCancelQuestionnaire} />
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
                  <td></td>
                  <th>검진예약일</th>
                  <td></td>
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

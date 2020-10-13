import React, { useState } from 'react';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';
import Button from '../../../components/Button';
import BtnWrap from './BtnWrap';
import StyledFormView from '../../../components/CommonStyledElement/StyledFormView';
import { StyledTextField, StyledCheckbox, StyledRadio, StyledSelect, StyledTextArea } from '../../../components/CommonStyledElement/StyledFormItem';

/**
 * TPMS - 개선활동 - 등록/진행 - 신규등록
 *
 * @returns {*}
 * @constructor
 */
const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '등록/진행' }, { title: '신규등록' }];

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선활동 - 등록/진행" nav={nav}>
        <Spin spinning={isLoading}>
          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input type="hidden" name="PRJ_LEADER_DEPT_CODE" />
            <input type="hidden" name="PRJ_LEADER_DEPT_NAME" />
            <input type="hidden" name="PRJ_LEADER" />
            <StyledFormView className="view_wrap" noBoarder>
              <div className="view_con no_padding">
                <ul className="sub_form">
                  <li className="improve_form std width50 flCustom">
                    <div className="title2">Project 명</div>
                    <StyledTextField>
                      <input type="text" />
                    </StyledTextField>
                  </li>
                  <li className="improve_form std width50 flCustom">
                    <div className="title2">Project Leader</div>
                    <StyledTextField>
                      <input type="text" readOnly />
                    </StyledTextField>
                  </li>
                  <li className="improve_form std customColorDiv">
                    <div className="title2">장비모델명</div>
                  </li>
                  <li className="improve_form ex">
                    <div className="title2">Project Type</div>
                  </li>
                  <li className="improve_form std width50 flCustom">
                    <div className="title2">Level</div>
                  </li>
                  <li className="improve_form std width50 frCustom marginNone">
                    <div className="title2">Performance Type</div>
                  </li>
                  <li className="improve_form width20 flCustom">
                    <div className="title2">핵심성과지표</div>
                  </li>
                  <li className="improve_form width20 flCustom">
                    <div className="title2">현재 상태</div>
                  </li>
                  <li className="improve_form width20 flCustom">
                    <div className="title2">목표</div>
                  </li>
                  <li className="improve_form width20 flCustom">
                    <div className="title2">적용 대상</div>
                  </li>
                  <li className="improve_form width20 flCustom marginNone">
                    <div className="title2">비고</div>
                  </li>
                  <li className="improve_form width50 flCustom">
                    <div className="title2">프로젝트를 시작하게 된 배경</div>
                  </li>
                  <li className="improve_form width50 frCustom">
                    <div className="title2">문제점/개선</div>
                  </li>
                  <li className="improve_form width50 flCustom">
                    <div className="title2">해결 방법</div>
                  </li>
                  <li className="improve_form width50 flCustom">
                    <div className="title2">범위</div>
                  </li>
                  <li className="improve_form ex width50 flCustom">
                    <div className="title2">스케줄</div>
                  </li>
                  <li className="improve_form ex width50 frCustom customColorDiv02">
                    <div className="title2">Member</div>
                  </li>
                </ul>
              </div>
            </StyledFormView>
            <BtnWrap>
              <Button type="submit" color="primary" disabled={isLoading}>
                제출하기
              </Button>
              <Button type="button" color="default" onClick={() => {}} disabled={isLoading}>
                저장하기
              </Button>
            </BtnWrap>
          </form>
        </Spin>
      </ExpandableTitleContainer>
      <GlobalStyle />
    </div>
  );
};
export default Registration;

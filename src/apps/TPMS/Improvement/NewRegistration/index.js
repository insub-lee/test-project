import React from 'react';
import Styled from './Styled';

const NewRegistration = () => (
  <Styled>
    <form autoComplete="off">
      <input type="hidden" name="PRJ_LEADER_DEPT_CODE" />
      <input type="hidden" name="PRJ_LEADER_DEPT_NAME" />
      <input type="hidden" name="PRJ_LEADER" />
      <div className="view_wrap">
        <div className="view_con no_padding">
          <ul className="sub_form">
            <li className="improve_form std width50 flCustom">
              <div className="title2">Project 명</div>
              <div>
                <input type="text" label="Project 명" name="PRJ_TITLE" placeholder="" required="" maxLength="100" value="" />
              </div>
            </li>
            <li className="improve_form std width50 frCustom">
              <div className="title2">Project Leader</div>
              <div>
                <input type="text" label="Project Leader" name="PRJ_LEADER_NAME" placeholder="" required="" readOnly="" value="김시찬" />
              </div>
            </li>
            <li className="improve_form ex">
              <div className="title2">Project Type</div>
              <div>
                <label htmlFor="PRJ_TYPE_0">
                  <input type="radio" id="PRJ_TYPE_0" name="PRJ_TYPE" readOnly="" value="G" />
                  <span />
                  개별개선
                </label>
              </div>
              <div>
                <label htmlFor="PRJ_TYPE_1">
                  <input type="radio" id="PRJ_TYPE_1" name="PRJ_TYPE" readOnly="" value="T" />
                  <span />
                  TFT
                </label>
              </div>
              <div>
                <label htmlFor="PRJ_TYPE_2">
                  <input type="radio" id="PRJ_TYPE_2" name="PRJ_TYPE" readOnly="" value="W" />
                  <span />
                  Wafer Loss
                </label>
              </div>
            </li>
            <li className="improve_form std width50 flCustom">
              <div className="title2">Level</div>
              <div>
                <select name="PRJ_LEVEL" id="" className="">
                  <option value="1">본부</option>
                  <option value="2">담당</option>
                  <option value="3">팀</option>
                  <option value="4">Part</option>
                </select>
              </div>
            </li>
            <li className="improve_form std width50 frCustom">
              <div className="title2">Performance Type</div>
              <div>
                <select name="PERFORM_TYPE" id="" className="">
                  <option value="C">Cost</option>
                  <option value="D">Delivery</option>
                  <option value="M">Morale</option>
                  <option value="P">Productivity</option>
                  <option value="Q">Quality</option>
                  <option value="S">Safety</option>
                </select>
              </div>
            </li>
            <li className="improve_form width20 flCustom">
              <div className="title2">핵심성과지표</div>
              <div>
                <textarea label="핵심성과지표" exlabel="FAB" name="CTQ" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form width20 flCustom">
              <div className="title2">현재 상태</div>
              <div>
                <textarea label="현재 상태" exlabel="PU" name="Y_VAL" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form width20 flCustom">
              <div className="title2">목표</div>
              <div>
                <textarea label="목표" exlabel="피해장소" name="BASELINE_VAL" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form width20 flCustom">
              <div className="title2">적용 대상</div>
              <div>
                <textarea className="improve_form" label="적용 대상" exlabel="요인(부서)" name="TARGET_VAL" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form width20 flCustom">
              <div className="title2">비고</div>
              <div>
                <textarea label="비고" name="REMARK" exlabel="발생일" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form width50 flCustom">
              <div className="title2">프로젝트를 시작하게 된 배경</div>
              <div>
                <textarea label="프로젝트를 시작하게 된 배경 " name="PRJ_BACK_DESC" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form width50 frCustom">
              <div className="title2">문제점/개선</div>
              <div>
                <textarea label="문제점/개선" name="PROBLEM_DESC" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form width50 flCustom">
              <div className="title2">해결 방법</div>
              <div>
                <textarea label="해결 방법" name="HOW_TO_DESC" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form width50 frCustom">
              <div className="title2">범위</div>
              <div>
                <textarea label="범위" name="SCOPE_DESC" placeholder="" required="" maxLength="450" />
              </div>
            </li>
            <li className="improve_form">
              <div className="title2">스케줄</div>
              <div></div>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </Styled>
);

export default NewRegistration;

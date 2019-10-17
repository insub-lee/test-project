import React from 'react';
import Button from 'components/Button';
import Select from 'components/Select';
import StyledContent from './StyledContent';
import StyledCommonForm from './StyledCommonForm';
const modalContent = ({ handleClose, submitData, saveTemporary, data }) => (
  <StyledContent>
    <div className="pop_tit">
      {data.NAME_KOR} 기안
      <button type="button" className="icon icon_pclose" onClick={handleClose} />
    </div>
    <div className="pop_con">
      <StyledCommonForm onSubmit={submitData} autoComplete="off">
        <ul className="sub_form">
          <li>
            <label className="title" htmlFor="dcid">
              문서번호
            </label>
            <input type="text" className="input" name="dcid" value="문서번호" readOnly />
          </li>
          <li>
            <label className="title" htmlFor="revision">
              Revision
            </label>
            <input type="text" className="input" name="revision" value="0" readOnly />
          </li>
          <li>
            <label className="title" htmlFor="title">
              Title
            </label>
            <input type="text" className="input" name="title" />
          </li>
          <li>
            <label className="title" htmlFor="적용범위 및 조회정보">
              적용범위 및 조회정보
            </label>
            <Select name="scope" selectOptions={[{ label: '선택해 주세요.', value: '0', disabled: true }]} />
          </li>
          <li>
            <label className="title" htmlFor="담당표준관리실">
              담당표준관리실
            </label>
            <input type="text" className="input" value="ddcName" readOnly />
          </li>
          <li>
            <label className="title" htmlFor="empNoR">
              Reviewer
            </label>
            <div className="findDiv">
              <ul className="users"></ul>
              <div className="btn small gray findbtn">선택</div>
            </div>
          </li>
          <li>
            <label className="title" htmlFor="empNoM">
              Mail Reviewer
            </label>
            <div className="findDiv">
              <ul className="users"></ul>
              <div className="btn small gray findbtn">선택</div>
            </div>
          </li>
          <li>
            <label className="title" htmlFor="empNo">
              Approver
            </label>

            <input type="text" id="userId" className="input" value="uids" readOnly style={{ cursor: 'pointer' }} />
          </li>
          <li>
            <label className="title" htmlFor="remark">
              Description Of Change
            </label>
            <textarea name="remark" id="" cols="30" rows="10" />
          </li>
          <li>
            <label className="title" htmlFor="distributionTeam">
              배포부서
            </label>

            <input type="text" id="hrdpcd" className="input" value="배포부서" readOnly style={{ cursor: 'pointer' }} />
          </li>
          <li>
            <label className="title" htmlFor="history">
              제개정이력&nbsp;
              <Button type="button" size="small" color="default">
                Copy Description
              </Button>
            </label>
            <textarea name="history" id="" cols="30" rows="10" />
          </li>
        </ul>
        <div className="cr" />
        <div className="btn_wrap modal_btn_wrap">
          <Button type="button" size="big" color="default" onClick={saveTemporary}>
            임시저장
          </Button>
          <Button type="submit" size="big" color="primary">
            상신
          </Button>
          <Button type="button" size="big" color="default" onClick={handleClose}>
            닫기
          </Button>
        </div>
      </StyledCommonForm>
    </div>
  </StyledContent>
);

export default modalContent;

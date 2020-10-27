import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Spin from '../../../../components/AntdSpinner';
import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import BtnWrap from '../../BtnWrap';
import Button from '../../../../components/Button';
import ApproveFormWrapper from '../../ApproveFormWrapper';

import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const teamTexterRenderer = (index, item) => (
  <>
    <span style={{ border: 0, marginRight: 20 }}>{`${item.usrid} ${item.usrnm ? item.usrnm : '퇴직자'}`}</span>
    {(index + 1) % 5 === 0 && <br />}
  </>
);

const Detail = ({ info, usrid, dpcd, dpnm }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();
  const {
    isLoading,
    defaultFormData,
    sharingSelector,
    actions: { submitData },
  } = useHooks({ info, usrnm: authInfo?.usrNm || '', dpcd: authInfo?.userRoleInfoList?.[0]?.dpcd || '' });

  const combineTextRenderer = useCallback(
    item => (
      <>
        {`${item.sign} ${item.usrid} ${item.usrnm ? item.usrnm : '퇴직자'}`}
        {item.signlinememo ? <span style={{ display: 'block', width: '100%', border: 0 }}>{`의견: ${item.signlinememo}`}</span> : ''}
      </>
    ),
    [],
  );

  return (
    <div>
      <Spin spinning={isAuthLoading || isLoading}>
        <SignProcessList list={info.signPrclistInfo} />
        <form autoComplete="off" onSubmit={submitData}>
          <input type="hidden" name="docno" value={info.docno} />
          <input type="hidden" name="signlineno" value={info.signlineno} />
          <input type="hidden" name="signno" value={info.signno} />
          <input type="hidden" name="signno" value={info.signno} />
          <input type="hidden" name="sysid" value="TPMS" />
          <input type="hidden" name="mnuid" value="TPMS1040" />
          <input type="hidden" name="PRJ_ID" value={info.PRJ_ID} />
          <input type="hidden" name="insdt" value={info.insdt} />
          <input type="hidden" name="PRJ_LEADER" value={usrid} />
          <input type="hidden" name="PRJ_TYPE" value={info.PRJ_TYPE} />
          <input type="hidden" name="PRJ_LEVEL" value={info.PRJ_LEVEL} />
          <input type="hidden" name="PERFORM_TYPE" value={info.PERFORM_TYPE} />
          <input type="hidden" name="PRJ_LEADER_DEPT_CODE" value={dpcd || ''} />
          <input type="hidden" name="PRJ_LEADER_DEPT_NAME" value={dpnm || ''} />
          <FormView datas={defaultFormData} noBoarder isImprove />
          <ApproveFormWrapper>
            <div className="approveFormRow">
              <span className="approveFormLabel">기안자</span>
              <p className="approveFormValue">
                {info.signPrclistInfo ? info.signPrclistInfo.filter(item => item.rownum === 1).map(item => combineTextRenderer(item)) : ''}
              </p>
            </div>
            <div className="approveFormRow">
              <span className="approveFormLabel">1차결재권자</span>
              <p className="approveFormValue">
                {info.signPrclistInfo ? info.signPrclistInfo.filter(item => item.rownum === 2).map(item => combineTextRenderer(item)) : ''}
                {info.signPrclistInfo ? info.signPrclistInfo.filter(item => item.rownum === 5).map(item => combineTextRenderer(item)) : ''}
              </p>
            </div>
            <div className="approveFormRow">
              <span className="approveFormLabel">최종결재권자</span>
              <p className="approveFormValue">
                {info.signPrclistInfo ? info.signPrclistInfo.filter(item => item.rownum === 3).map(item => combineTextRenderer(item)) : ''}
                {info.signPrclistInfo ? info.signPrclistInfo.filter(item => item.rownum === 6).map(item => combineTextRenderer(item)) : ''}
              </p>
            </div>
            {info.status.substr(0, 2) === '완료' && <FormView datas={sharingSelector} noBoarder noPadding />}
          </ApproveFormWrapper>
          {info.status.substr(0, 2) === '완료' ? (
            <FormView datas={sharingSelector} noBoarder noPadding />
          ) : (
            <ApproveFormWrapper>
              <span className="approveFormLabel">팀원</span>
              <p className="approveFormValue">{info.member ? info.member.map((item, index) => teamTexterRenderer(index, item)) : ''}</p>
              <span className="approveFormLabel" style={{ marginTop: 10 }}>
                공유
              </span>
              <p className="approveFormValue" style={{ marginTop: 10 }}>
                {info.teamsharing ? info.teamsharing.map((item, index) => teamTexterRenderer(index, item)) : ''}
              </p>
            </ApproveFormWrapper>
          )}
          <BtnWrap>
            <Button type="submit" color="primary">
              제출하기
            </Button>
          </BtnWrap>
        </form>
      </Spin>
    </div>
  );
};

Detail.propTypes = {
  info: PropTypes.object,
  usrid: PropTypes.string,
  dpcd: PropTypes.string,
  dpnm: PropTypes.string,
};

Detail.defaultProps = {
  info: {},
  usrid: PropTypes.string,
  dpcd: PropTypes.string,
  dpnm: PropTypes.string,
};

export default Detail;

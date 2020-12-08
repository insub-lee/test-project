/* eslint-disable camelcase */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

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
    isRedirect,
    actions: { submitData },
  } = useHooks({ info, usrnm: authInfo?.usrNm || '', dpcd: authInfo?.deptId || '' });

  // const combineTextRenderer = useCallback(
  //   item => (
  //     <>
  //       {`${item.sign} ${item.usrid} ${item.usrnm ? item.usrnm : '퇴직자'}`}
  //       {item.signlinememo ? <span style={{ display: 'block', width: '100%', border: 0 }}>{`의견: ${item.signlinememo}`}</span> : ''}
  //     </>
  //   ),
  //   [],
  // );
  if (isRedirect) {
    return <Redirect to="/apps/tpms/page/Improvement/RegisteredTable" />;
  }

  return (
    <div>
      <Spin spinning={isAuthLoading || isLoading}>
        <SignProcessList info={info} />
        <form autoComplete="off" onSubmit={submitData}>
          <FormView datas={defaultFormData} noBoarder isImprove />
          <ApproveFormWrapper>
            <div className="approveFormRow">
              <span className="approveFormLabel">기안자</span>
              <p className="approveFormValue">{`${info?.project_leader}`}</p>
            </div>
            <div className="approveFormRow">
              <span className="approveFormLabel">1차결재권자</span>
              <p className="approveFormValue">
                {JSON.parse(info?.first_approver || '[]').map(({ emp_no, name_kor }, idx) => {
                  if (idx === 0) {
                    return `${emp_no} ${name_kor}`;
                  }
                  return `, ${emp_no} ${name_kor}`;
                })}
              </p>
            </div>
            <div className="approveFormRow">
              <span className="approveFormLabel">최종결재권자</span>
              <p className="approveFormValue">
                {JSON.parse(info?.final_approver || '[]').map(({ emp_no, name_kor }, idx) => {
                  if (idx === 0) {
                    return `${emp_no} ${name_kor}`;
                  }
                  return `, ${emp_no} ${name_kor}`;
                })}
              </p>
            </div>
            {/* {info?.step ===  && <FormView datas={sharingSelector} noBoarder noPadding />} */}
            {/* {info?.step === 8 ? ( */}
            {/* <FormView datas={sharingSelector} noBoarder noPadding /> */}
            {/* ) : ( */}
            <div className="approveFormRow">
              <span className="approveFormLabel">팀원</span>
              <p className="approveFormValue">
                {JSON.parse(info?.team_member || '[]').map(({ emp_no, name_kor }, idx) => {
                  if (idx === 0) {
                    return `${emp_no} ${name_kor}`;
                  }
                  return `, ${emp_no} ${name_kor}`;
                })}
              </p>
            </div>
            {info?.step === 10 && (
              <div className="approveFormRow">
                <span className="approveFormLabel" style={{ marginTop: 10 }}>
                  공유
                </span>
                <p className="approveFormValue" style={{ marginTop: 10 }}>
                  {JSON.parse(info?.sharer || '[]').map(({ emp_no, name_kor }, idx) => {
                    if (idx === 0) {
                      return `${emp_no} ${name_kor}`;
                    }
                    return `, ${emp_no} ${name_kor}`;
                  })}
                </p>
              </div>
            )}
          </ApproveFormWrapper>
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

import React from 'react';

import { Redirect } from 'react-router-dom';
import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';
import Button from '../../../components/Button';
import BtnWrap from './BtnWrap';
import FormView from '../../../components/FormPreview/FormView';

import useHooks from './useHooks';
import useAuth from '../../../hooks/useAuth';

/**
 * TPMS - 개선활동 - 등록/진행 - 신규등록
 *
 * @returns {*}
 * @constructor
 */
const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '등록/진행' }, { title: '신규등록' }];

const Registration = () => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();
  const {
    isLoading,
    formJson,
    formRef,
    isRedirect,
    savedTemp,
    actions: { submitForm, saveTemp },
  } = useHooks({ originEmpNo: authInfo?.empNo || '', usrnm: authInfo?.usrNm || '', dpcd: authInfo?.deptId || '' });

  if (isRedirect) {
    return <Redirect to="/apps/tpms/page/Improvement/RegisteredTable" />;
  }
  if (savedTemp) {
    return <Redirect to="/apps/tpms/page/Improvement/TempTable" />;
  }

  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선활동 - 등록/진행" nav={nav}>
        <Spin spinning={isAuthLoading || isLoading}>
          <form ref={formRef} autoComplete="off" onSubmit={submitForm}>
            <input type="hidden" name="reg_dept_id" value={authInfo?.deptId || ''} />
            <input type="hidden" name="reg_dept_name" value={authInfo?.deptName || ''} />
            <input type="hidden" name="project_leader" value={authInfo?.empNo || ''} />
            <FormView datas={formJson} noBoarder noPadding isImprove />
            <BtnWrap>
              <Button type="submit" color="primary" disabled={isAuthLoading || isLoading}>
                제출하기
              </Button>
              <Button type="button" color="default" onClick={saveTemp} disabled={isAuthLoading || isLoading}>
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

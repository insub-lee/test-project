import React from 'react';

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
    actions: { submitForm, saveTemp },
  } = useHooks({ usrid: authInfo?.empNo || '', usrnm: authInfo?.usrNm || '', dpcd: authInfo?.userRoleInfoList?.[0]?.dpcd || '' });

  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선활동 - 등록/진행" nav={nav}>
        <Spin spinning={isAuthLoading || isLoading}>
          <form ref={formRef} autoComplete="off" onSubmit={submitForm}>
            <input type="hidden" name="PRJ_LEADER_DEPT_CODE" />
            <input type="hidden" name="PRJ_LEADER_DEPT_NAME" />
            <input type="hidden" name="PRJ_LEADER" />
            <FormView datas={formJson} noBoarder noPadding isImprove />
            <BtnWrap>
              <Button type="submit" color="primary" disabled={isLoading}>
                제출하기
              </Button>
              <Button type="button" color="default" onClick={saveTemp} disabled={isLoading}>
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

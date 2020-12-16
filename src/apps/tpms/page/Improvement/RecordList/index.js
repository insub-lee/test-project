import React from 'react';

import FormView from '../../../components/FormPreview/FormView';
import Button from '../../../components/Button';
import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import TitleContainerWithSub from '../../../components/TitleContainerWithSub';
import RecordListDetail from './RecordListDetail';
import StyledForm from './StyledForm';
import useHooks from './useHooks';
import useAuth from '../../../hooks/useAuth';

/**
 * TPMS - 개선활동 - REPORT - 실적리스트
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: 'REPORT' }, { title: '실적리스트' }];

const RecordList = () => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();
  const {
    isLoading,
    showDetail,
    requestQuery,
    listFormData,
    actions: { submitData },
  } = useHooks();
  return (
    <div className="tpms-view">
      <Spin spinning={isAuthLoading || isLoading}>
        <TitleContainerWithSub
          title="개선활동 - REPORT"
          nav={nav}
          useCollapsed
          mainbody={
            <StyledForm onSubmit={submitData}>
              <FormView datas={listFormData} noBoarder noPadding />
              <div className="btn_wrap">
                <Button type="submit" color="primary">
                  검색하기
                </Button>
              </div>
            </StyledForm>
          }
          subbody={showDetail && <RecordListDetail enableFixView={() => {}} disableFixView={() => {}} requestQuery={requestQuery} authInfo={authInfo} />}
        />
      </Spin>
      <GlobalStyle />
    </div>
  );
};

export default RecordList;

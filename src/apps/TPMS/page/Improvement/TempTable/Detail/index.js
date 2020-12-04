import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Spin from '../../../../components/AntdSpinner';
import FormView from '../../../../components/FormPreview/FormView';
import Button from '../../../../components/Button';
import BtnWrap from '../../BtnWrap';

import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const Detail = ({ info, closeAll, callback }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();
  const {
    isLoading,
    isError,
    formRef,
    isRedirect,
    formData,
    actions: { submitForm, saveTemp, deleteTemp },
  } = useHooks({ info, usrid: authInfo?.empNo || '', usrnm: authInfo?.usrNm || '', deptId: authInfo?.deptId || '', callback });

  if (isRedirect) {
    return <Redirect to="/apps/tpms/page/Improvement/RegisteredTable" />;
  }

  return (
    <div>
      <Spin spinning={isAuthLoading || isLoading}>
        <form autoComplete="off" ref={formRef} onSubmit={submitForm}>
          {/* <input type="hidden" name="tempid" value={info?.tempid} /> */}
          <input type="hidden" name="task_seq" value={info?.task_seq} />
          <input type="hidden" name="proejct_leader" value={authInfo?.empNo} />
          <input type="hidden" name="reg_dept_id" value={authInfo?.deptId || ''} />
          <input type="hidden" name="reg_dept_name" value={authInfo?.deptName || ''} />
          <FormView useDefaultDatas defaultDatas={formData} noBoarder isImprove />
          <BtnWrap>
            <Button type="submit" color="primary">
              제출하기
            </Button>
            <Button type="button" color="default" onClick={saveTemp}>
              저장하기
            </Button>
            <Button type="button" color="default" onClick={deleteTemp}>
              삭제
            </Button>
          </BtnWrap>
        </form>
      </Spin>
    </div>
  );
};

Detail.propTypes = {
  info: PropTypes.object,
  callback: PropTypes.func,
};

Detail.defaultProps = {
  info: {},
  callback: () => {},
};

export default Detail;

import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import Spin from '../../../../components/AntdSpinner';
import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import BtnWrap from '../../BtnWrap';
import Button from '../../../../components/Button';
import { DropModal } from '../../../../components/BuiltModals/DropModal';

import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const Detail = ({ info, callback }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();
  const {
    isLoading,
    isError,
    formRef,
    isRedirect,
    defaultFormData,
    isDropModalOpen,
    actions: { submitForm, setIsDropModalOpen },
  } = useHooks({ info, usrnm: authInfo?.usrNm || '', dpcd: authInfo?.deptId || '' });

  if (isRedirect) {
    return <Redirect to="/apps/tpms/page/Improvement/RegisteredTable" />;
  }
  return (
    <div>
      <Spin spinning={isAuthLoading || isLoading}>
        <SignProcessList info={info} />
        <form ref={formRef} autoComplete="off" onSubmit={submitForm}>
          {/* <input type="hidden" name="signlineno" value={info.signlineno} /> */}
          {/* <input type="hidden" name="signno" value={info.signno} /> */}
          <input type="hidden" name="task_seq" value={info?.task_seq} />
          <FormView key={authInfo?.deptId || ''} datas={defaultFormData} noBoarder isImprove />
          <BtnWrap>
            <Button type="submit" color="primary" disabled={isAuthLoading || isLoading}>
              제출하기
            </Button>
            {/* {!info.signPrclistInfo.some(item => item.sign === '완료 반려') && ( */}
            <Button
              type="button"
              color="default"
              disabled={isAuthLoading || isLoading}
              onClick={() => {
                setIsDropModalOpen(true);
              }}
            >
              Drop
            </Button>
            {/* )} */}
          </BtnWrap>
        </form>
      </Spin>
      <DropModal info={info} rel_type={203} isDropModalOpen={isDropModalOpen} setIsDropModalOpen={setIsDropModalOpen} callback={callback} />
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

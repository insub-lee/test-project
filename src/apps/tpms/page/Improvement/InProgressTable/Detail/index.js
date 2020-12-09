import React from 'react';
import PropTypes from 'prop-types';

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

  /* need info, dpCd */
  const {
    isLoading,
    isError,
    defaultFormData,
    isDropModalOpen,
    actions: { submitForm, setIsDropModalOpen },
  } = useHooks({ info, usrnm: authInfo?.usrNm || '', dpcd: authInfo?.deptId || '', callback });

  return (
    <div>
      <Spin spinning={isAuthLoading || isLoading}>
        <SignProcessList info={info} />
        <form autoComplete="off" onSubmit={submitForm}>
          <input type="hidden" name="task_seq" value={info?.task_seq} />
          <FormView datas={defaultFormData} noBoarder isImprove />
          <BtnWrap>
            <Button type="submit" color="primary">
              저장하기
            </Button>
            <Button
              type="button"
              color="default"
              onClick={() => {
                setIsDropModalOpen(true);
              }}
            >
              DROP
            </Button>
          </BtnWrap>
        </form>
      </Spin>
      <DropModal info={info} isDropModalOpen={isDropModalOpen} rel_type={202} setIsDropModalOpen={setIsDropModalOpen} callback={callback} />
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

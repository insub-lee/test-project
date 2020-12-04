import React from 'react';
import PropTypes from 'prop-types';

import Spin from '../../../../components/AntdSpinner';
import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import BtnWrap from '../../BtnWrap';
import Button from '../../../../components/Button';
import DropModal from '../../../../components/BuiltModals/DropModal';

import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const Detail = ({ info, callback }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();

  /* need info, dpCd */
  const {
    isLoading,
    isError,
    defaultFormData,
    dropModalRef,
    actions: { submitForm, openDropModal },
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
            <Button type="button" color="default" onClick={openDropModal}>
              DROP
            </Button>
          </BtnWrap>
        </form>
      </Spin>
      <DropModal ref={dropModalRef} task_seq={info?.task_seq} step={info?.step} callback={callback} />
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

import React from 'react';
import PropTypes from 'prop-types';

import Spin from '../../../../components/AntdSpinner';
import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import BtnWrap from '../../BtnWrap';
import Button from '../../../../components/Button';
import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const Detail = ({ info, callback }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();

  const {
    formRef,
    defaultFormData,
    actions: { accept, reject },
  } = useHooks({ info, usrnm: authInfo?.usrNm || '', dpcd: authInfo?.deptId || '', callback });
  return (
    <div>
      <Spin spinning={isAuthLoading}>
        <SignProcessList info={info} />
        <form ref={formRef} autoComplete="off" onSubmit={e => e.preventDefault()}>
          {/* <input type="hidden" name="signlineno" value={info.signlineno} /> */}
          {/* <input type="hidden" name="signno" value={info.signno} /> */}
          <input type="hidden" name="task_seq" value={info?.task_seq} />
          <FormView datas={defaultFormData} noBoarder isImprove />
          <BtnWrap>
            <Button type="button" color="primary" onClick={accept}>
              승인하기
            </Button>
            <Button type="button" color="default" onClick={reject}>
              반려하기
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

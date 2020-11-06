import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';
import Button from '../../components/Button';

export const RegisterBody = ({ formJson = [], successCallback, regPost }) => {
  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        regPost(e.target).then(({ response, error }) => {
          if (response && !error) {
            const { insertyn } = response;
            if (insertyn) {
              successCallback();
            } else {
              window.alert('등록 실패');
            }
          }
        });
      }}
    >
      <FormView datas={formJson} noBoarder smallView />
      <div className="ant-modal-footer">
        <Button type="submit" color="primary" size="big">
          등록하기
        </Button>
      </div>
    </form>
  );
};

RegisterBody.propTypes = { formJson: PropTypes.array, regPost: PropTypes.func, successCallback: PropTypes.func };

RegisterBody.defaultProps = { formJson: [], regPost: () => {}, successCallback: () => {} };

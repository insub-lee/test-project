import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';
import Button from '../../components/Button';

import { usePost } from '../../hooks/usePost';

export const RegisterBody = ({ formJson = [], brdid, selectedRecord, successCallback }) => {
  const {
    action: { RegPost },
  } = usePost({ brdid });
  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        RegPost(e.target, selectedRecord).then(({ response, error }) => {
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

RegisterBody.propTypes = { formJson: PropTypes.array, brdid: PropTypes.string, selectedRecord: PropTypes.object, successCallback: PropTypes.func };

RegisterBody.defaultProps = { formJson: [], brdid: '', selectedRecord: {}, successCallback: () => {} };

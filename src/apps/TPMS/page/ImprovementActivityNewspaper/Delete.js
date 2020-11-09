import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
// import alertMessage from '../../components/Notification/Alert';

export const DeleteBody = ({ selectedRecord, deletePost, successCallback }) => {
  return (
    <div className="pop_con">
      <form
        autoComplete="off"
        onSubmit={e => {
          deletePost(e.target, selectedRecord).then(({ response, error }) => {
            if (response && !error) {
              const { result } = response;
              if (result) {
                successCallback();
              } else {
                window.alert('비밀번호가 틀렸습니다.');
                // alertMessage.alert('비밀번호가 틀렸습니다.');
              }
            }
          });
          e.preventDefault();
        }}
      >
        <input required type="password" placeholder="비밀번호를 입력해 주세요." name="pwd" />
        <div className="ant-modal-footer">
          <Button type="submit" color="primary" size="big">
            닫기
          </Button>
        </div>
      </form>
    </div>
  );
};

DeleteBody.propTypes = { deletePost: PropTypes.func, selectedRecord: PropTypes.object, successCallback: PropTypes.func };
DeleteBody.defaultProps = { deletePost: () => {}, selectedRecord: {}, successCallback: () => {} };

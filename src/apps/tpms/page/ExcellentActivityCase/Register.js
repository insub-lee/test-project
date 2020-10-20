import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';
import Button from '../../components/Button';

import { usePost } from '../../hooks/usePost';

export const RegisterBody = ({ formJson = [], brdid, selectedRecord, successCallback }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchName = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSearchName();
    }
  };

  const handleClickSearchName = () => {};

  const {
    action: { RegPost },
  } = usePost({ brdid });
  return (
    <div className="pop_con" style={{ padding: '0px' }}>
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
        <div style={{ textAlign: 'left', padding: '10px 30px 0px 30px' }}>
          <input
            required
            type="text"
            className="input"
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
            }}
            onKeyDown={e => handleSearchName(e)}
            style={{ display: 'inline-block', width: '30%', margin: '3px 0' }}
            placeholder="Project 명으로 검색(2자 이상)"
          />
          <button
            type="button"
            value="검색"
            onClick={() => handleClickSearchName()}
            style={{ width: 45, height: 45, border: '1px solid #d9e0e7', verticalAlign: 'top' }}
          >
            <i className="fas fa-search" />
          </button>
        </div>
        <FormView datas={formJson} noBoarder smallView />
        <div className="ant-modal-footer">
          <Button type="submit" color="primary" size="big">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
};

RegisterBody.propTypes = { formJson: PropTypes.array, brdid: PropTypes.string, selectedRecord: PropTypes.object, successCallback: PropTypes.func };

RegisterBody.defaultProps = { formJson: [], brdid: '', selectedRecord: {}, successCallback: () => {} };

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';
import ProjectFormModal from '../../components/BuiltModals/ProjectModal';
import Button from '../../components/Button';

/**
 * call Search API
 * Open Modal
 * Render choosed Project
 *
 */
export const RegisterBody = ({ formJson = [], regPost, selectedRecord, successCallback }) => {
  const [searchText, setSearchText] = useState('');
  const [modifiedFormJson, setModifiedFormJson] = useState(formJson);
  const [proejctData, setProejctData] = useState({});
  const ProjectFormRef = useRef();

  const callback = payload => {
    setProejctData(payload);
    const title = `[${payload.prj_id}] ${payload.prj_title}`;
    const temp = [...formJson];
    temp.forEach(e => {
      if (e.option.name === 'title') {
        e.option.value = title;
      }
    });
    setModifiedFormJson(temp);
  };

  const handleSearchName = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSearchName();
    }
  };

  const handleClickSearchName = () => {
    if (searchText.length > 1) {
      ProjectFormRef.current.handleOpenModal(searchText);
    }
  };

  return (
    <>
      <div className="pop_con" style={{ padding: '0px' }}>
        <form
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            regPost(e.target, selectedRecord).then(({ response, error }) => {
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
          {Object.keys(proejctData).length > 0 ? (
            <>
              <div style={{ padding: '10px', margin: '0 30px' }}>
                <table style={{ width: '100%' }}>
                  <colgroup>
                    <col width="25%" />
                    <col width="25%" />
                    <col width="25%" />
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Project ID</th>
                      <th>Project 명</th>
                      <th>본부/팀</th>
                      <th>Leader</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{proejctData.prj_id}</td>
                      <td>{proejctData.prj_title}</td>
                      <td>{proejctData.prj_leader_dept_name}</td>
                      <td>{proejctData.prj_leader_name}</td>
                    </tr>
                  </tbody>
                </table>
                <input type="hidden" name="regid" value={proejctData.prj_leader} />
              </div>
              <FormView datas={modifiedFormJson} noBoarder smallView />
            </>
          ) : (
            <FormView datas={modifiedFormJson} noBoarder smallView />
          )}
          <div className="ant-modal-footer">
            <Button type="submit" color="primary" size="big">
              등록하기
            </Button>
          </div>
        </form>
      </div>
      <ProjectFormModal ref={ProjectFormRef} callbackAfterFetch={payload => callback(payload)} />
    </>
  );
};

RegisterBody.propTypes = { formJson: PropTypes.array, regPost: PropTypes.func, selectedRecord: PropTypes.object, successCallback: PropTypes.func };

RegisterBody.defaultProps = { formJson: [], regPost: () => {}, selectedRecord: {}, successCallback: () => {} };

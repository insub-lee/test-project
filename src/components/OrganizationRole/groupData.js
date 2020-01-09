import React from 'react';
import PropTypes from 'prop-types';
import { intlObj, lang } from 'utils/commonUtils';

import messages from './messages';

const getGroupMembers = (ROLE_CD, ACNT_TYPE, ACNT_ID, { getGroupMemberData, setGridFlag }) => {
  setGridFlag();
  getGroupMemberData(ROLE_CD, ACNT_TYPE, ACNT_ID);
};

const getListGroup = groupData => {
  const allList = {
    userList: [],
    deptList: [],
    grpList: [],
    pstnList: [],
    dutyList: [],
  };
  groupData.forEach(row => {
    switch (row.ACNT_TYPE) {
      case 'U':
        allList.userList.push(row);
        break;
      case 'D':
        allList.deptList.push(row);
        break;
      case 'V':
        allList.grpList.push(row);
        break;
      case 'T':
        allList.pstnList.push(row);
        break;
      case 'P':
        allList.dutyList.push(row);
        break;
      default:
        break;
    }
  });
  return allList;
};

const getLayout = (title, listData, ROLE_CD, action) => {
  if (listData.length > 0) {
    return (
      <div key={title}>
        <h3
          style={{
            textAlign: 'center',
            fontWeight: '500',
            width: '100%',
            marginBottom: '15px',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14px',
          }}
        >
          {intlObj.get(messages[title])}
        </h3>
        <ul
          style={{
            background: 'white',
            width: '90%',
            margin: 'auto',
            borderRadius: '5px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          {listData[0].ACNT_TYPE === 'U' ? (
            <li
              key={`${listData[0].ACNT_TYPE}/${listData[0].ACNT_ID}`}
              style={{
                marginLeft: '10px',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  getGroupMembers(ROLE_CD, 'U', -1, action);
                }}
                style={{
                  background: 'white',
                }}
              >
                {intlObj.get(messages.allUsers)}
              </button>
            </li>
          ) : (
            listData.map(o => (
              <li
                style={{
                  marginLeft: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
                key={`${o.ACNT_TYPE}/${o.ACNT_ID}`}
                value={`${o.ACNT_TYPE}/${o.ACNT_ID}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    getGroupMembers(ROLE_CD, o.ACNT_TYPE, o.ACNT_ID, action);
                  }}
                  style={{
                    background: 'white',
                  }}
                >
                  {lang.get('NAME', o)}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
  return null;
};

const GroupData = ({ groupData, getGroupMemberData, setGridFlag }) => {
  const listGroup = getListGroup(groupData);

  return (
    <div
      style={{
        background: '#f5f5f5',
        width: '100%',
        paddingTop: '10px',
        paddingBottom: '10px',
        height: '451px',
      }}
    >
      {Object.keys(listGroup).map(key => getLayout(key, listGroup[key]), { getGroupMemberData, setGridFlag })}
    </div>
  );
};

GroupData.propTypes = {
  groupData: PropTypes.array.isRequired,
  getGroupMemberData: PropTypes.func.isRequired,
  ROLE_CD: PropTypes.string.isRequired,
  setGridFlag: PropTypes.func.isRequired,
};

export default GroupData;

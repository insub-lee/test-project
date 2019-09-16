import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { intlObj, lang } from 'utils/commonUtils';

import messages from './messages';

const content = [];

class GroupData extends Component {
  componentDidUpdate(prevProps) {
    const { groupData, ROLE_CD } = this.props;

    if (!_.isEqualWith(groupData, prevProps.groupData) && groupData.length > 0) {
      const allList = {
        userList: [],
        deptList: [],
        grpList: [],
        pstnList: [],
        dutyList: [],
      };
      const getLayout = (title, listData) => (
        <div>
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
                style={{
                  marginLeft: '10px',
                }}
              >
                <button
                  onClick={() => {
                    this.getGroupMemberData(ROLE_CD, 'U', -1);
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
                  value={`${o.ACNT_TYPE}/${o.ACNT_ID}`}
                >
                  <button
                    onClick={() => {
                      this.getGroupMemberData(ROLE_CD, o.ACNT_TYPE, o.ACNT_ID);
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

      groupData.forEach(o => {
        if (o.ACNT_TYPE === 'U') {
          allList.userList.push(o);
        }
        if (o.ACNT_TYPE === 'D') {
          allList.deptList.push(o);
        }
        if (o.ACNT_TYPE === 'V') {
          allList.grpList.push(o);
        }
        if (o.ACNT_TYPE === 'P') {
          allList.pstnList.push(o);
        }
        if (o.ACNT_TYPE === 'T') {
          allList.dutyList.push(o);
        }
      });
      Object.keys(allList).forEach(o => {
        if (allList[o].length > 0) {
          content.push(getLayout(o, allList[o]));
        }
      });
    }
  }

  getGroupMemberData = (ROLE_CD, ACNT_TYPE, ACNT_ID) => {
    const { getGroupMemberData, setGridFlag } = this.props;

    setGridFlag();
    getGroupMemberData(ROLE_CD, ACNT_TYPE, ACNT_ID);
  };

  render() {
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
        {content}
      </div>
    );
  }
}

GroupData.propTypes = {
  groupData: PropTypes.array.isRequired,
  getGroupMemberData: PropTypes.func.isRequired,
  ROLE_CD: PropTypes.string.isRequired,
  setGridFlag: PropTypes.func.isRequired,
};

export default GroupData;

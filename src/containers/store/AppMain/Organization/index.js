import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';

import LayoutWrapper from '../../components/utility/layoutWrapper';

import injectReducer from '../../../../utils/injectReducer';
import reducer from './reducer';
import injectSaga from '../../../../utils/injectSaga';
import saga from './saga';

import Tree from './tree';

// import './react-sortable-tree.css';

// 조직도, 사용자 목록
import { makeTreeData, makeUser, makeUsers } from './selectors';
import { getTreeData, getUsers, getUser } from './actions';


class Organization extends Component {
  constructor(props) {
    super(props);

    // 사용자 목록 컬럼
    this.columns = [
      {
        key: 'DUTY_NAME_KOR',
        name: '이름',
      },
      {
        key: 'EMP_NO',
        name: '사번',
      },
    ];
  }

  componentWillMount() {
    this.props.handleGetTreeData();
  }

  render() {
    // 조직도
    const {
      // data
      treeData,

    } = this.props;

    // 사용자 목록
    const {
      // data
      users,
      // user,

      // func
      handleGetUsers,
      handleGetUser,

    } = this.props;

    const rowGetter = i => users[i];

    const getColumns = () => {
      const clonedColumns = this.columns.slice();
      clonedColumns[0].events = {
        onClick: (ev, args) => {
          const EMP_NO = args.rowId;
          handleGetUser(EMP_NO);
        },
      };

      return clonedColumns;
    };

    return (
      <LayoutWrapper>
        <Tree treeData={treeData} getUsers={handleGetUsers} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            float: 'left',
          }}
        >
          <ReactDataGrid
            rowKey="EMP_NO"
            columns={getColumns()}
            rowGetter={rowGetter}
            rowsCount={users.length}
            minHeight={350}
            minWidth={400}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            float: 'left',
          }}
        >
          {/* <BasicContactView
            name={user.DUTY_NAME_KOR}
            dept={user.PSTN_NAME_KOR}
            email={user.EMAIL}
            mobile={user.MOBILE_TEL_NO}
            officetel={user.OFFICE_TEL_NO}
            no={user.EMP_NO}
          /> */}
        </div>
      </LayoutWrapper>
    );
  }
}

Organization.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  users: PropTypes.array, //eslint-disable-line
  user: PropTypes.object, //eslint-disable-line
  handleGetTreeData: PropTypes.func, //eslint-disable-line
  handleGetUsers: PropTypes.func, //eslint-disable-line
  handleGetUser: PropTypes.func, //eslint-disable-line
};


export function mapDispatchToProps(dispatch) {
  return {
    // 조직도
    handleGetTreeData: () => dispatch(getTreeData()),
    handleGetUsers: data => dispatch(getUsers(data)),

    // 사용자 목록
    handleGetUser: empno => dispatch(getUser(empno)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 조직도
  treeData: makeTreeData(),
  // 사용자 목록
  users: makeUsers(),
  user: makeUser(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'org', reducer });
const withSaga = injectSaga({ key: 'org', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Organization);

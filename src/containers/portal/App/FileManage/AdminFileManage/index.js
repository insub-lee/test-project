import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Tree from 'components/Tree';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectProfile } from 'containers/common/Auth/selectors';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import Styled from './Styled';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import FileList from './FileList';
import AdminMain from './Main';

const treeWrapperStyle = {
  display: 'flex',
  flex: '1 0 50%',
  padding: '0 0 0 10px',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
};

const treeStyle = {
  height: 230,
  width: 230,
  // overflowY: 'scroll',
};

class AdminFileManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      sysSelectedIndex: -1,
      selectUserListFlag: false,
      viewMainFlag: true,
    };
  }

  componentDidMount() {
    const { getSiteList } = this.props;
    getSiteList();
    this.viewMain();
  }

  viewMain = () => {
    this.setState({
      sysSelectedIndex: -1,
      selectUserListFlag: false,
      viewMainFlag: true,
    });
  };

  // 리스트
  handleSysfolderOnClick = node => {
    if (node) {
      this.setState({
        sysSelectedIndex: node.key,
        selectUserListFlag: false,
        viewMainFlag: false,
      });
    }
  };

  handleUserListOnClick = () => {
    this.setState({
      sysSelectedIndex: -1,
      selectUserListFlag: true,
      viewMainFlag: false,
    });
    // TODO 사용자별 파일 설정 / 리스트 쿼리
  };

  render() {
    const {
      siteList,
      fileList,
      total,
      getSysFileList,
      getUserList,
      updateUser,
      getUserFileList,
      getModalFileList,
      modalFileList,
      modalTotal,
      linkList,
      getLinkList,
      deleteFileShareLink,
      deleteFile,
      getAdminMain,
      adminMain,
    } = this.props;
    const { sysSelectedIndex, selectUserListFlag, viewMainFlag } = this.state;
    return (
      <Styled>
        <div className="section-wrapper">
          <div className="right-section">
            <div className="title-area">
              <StyledButton className="title-area btn-link" onClick={this.viewMain} style={{ padding: 0 }}>
                파일관리
              </StyledButton>
            </div>
            <div className="menu-area">
              <div className="menu-item">
                <span className="menu-title">시스템 폴더</span>
                <Tree
                  style={treeStyle}
                  treeData={siteList}
                  handleOnClick={this.handleSysfolderOnClick}
                  selectedIndex={sysSelectedIndex}
                  wrapperStyle={treeWrapperStyle}
                />
              </div>
              <div className="menu-item">
                <StyledButton className="menu-title btn-link" onClick={this.handleUserListOnClick} style={{ padding: 0 }}>
                  사용자 파일/저장소 관리
                </StyledButton>
              </div>
            </div>
          </div>
          <div className="left-section">
            {viewMainFlag ? (
              <AdminMain
                getAdminMain={getAdminMain}
                adminMain={adminMain}
                list={fileList}
                total={total}
                getUserFileList={getUserFileList}
                deleteFile={deleteFile}
              />
            ) : (
              <FileList
                list={fileList}
                total={total}
                selectUserListFlag={selectUserListFlag}
                selectedIndex={sysSelectedIndex}
                getSysFileList={getSysFileList}
                getUserList={getUserList}
                updateUser={updateUser}
                getUserFileList={getUserFileList}
                getModalFileList={getModalFileList}
                modalFileList={modalFileList}
                modalTotal={modalTotal}
                linkList={linkList}
                getLinkList={getLinkList}
                deleteFileShareLink={deleteFileShareLink}
                deleteFile={deleteFile}
              />
            )}
          </div>
        </div>
      </Styled>
    );
  }
}

AdminFileManage.propTypes = {
  getSiteList: PropTypes.func.isRequired,
  getSysFileList: PropTypes.func.isRequired,
  getUserFileList: PropTypes.func.isRequired,
  getUserList: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  deleteFileShareLink: PropTypes.func.isRequired,
  getLinkList: PropTypes.func.isRequired,
  siteList: PropTypes.array.isRequired,
  fileList: PropTypes.array.isRequired,
  linkList: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  modalFileList: PropTypes.array.isRequired,
  modalTotal: PropTypes.number.isRequired,
  getModalFileList: PropTypes.func.isRequired,
  adminMain: PropTypes.object.isRequired,
  getAdminMain: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getSiteList: () => dispatch(actions.getSiteList()),
  getAdminMain: CALLBACK => dispatch(actions.getAdminMain(CALLBACK)),
  getSysFileList: (SITE_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => dispatch(actions.getSysFileList(SITE_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK)),
  getUserFileList: (KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => dispatch(actions.getUserFileList(KEYWORD, CURRENT, PAGE_SIZE, CALLBACK)),
  getUserList: (KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => dispatch(actions.getUserList(KEYWORD, CURRENT, PAGE_SIZE, CALLBACK)),
  updateUser: (USER_ID, STORAGE_SIZE, UPLOAD_LIMIT_SIZE, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) =>
    dispatch(actions.updateUser(USER_ID, STORAGE_SIZE, UPLOAD_LIMIT_SIZE, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK)),
  deleteFile: (FILE_SEQ, USER_ID, CALLBACK) => dispatch(actions.deleteFile(FILE_SEQ, USER_ID, CALLBACK)),
  getLinkList: (FILE_SEQ, KEYWORD, CALLBACK) => dispatch(actions.getLinkList(FILE_SEQ, KEYWORD, CALLBACK)),
  deleteFileShareLink: (FILE_SEQ, SHARE_KEY, USER_ID, CALLBACK) => dispatch(actions.deleteFileShareLink(FILE_SEQ, SHARE_KEY, USER_ID, CALLBACK)),
  getModalFileList: (USER_ID, TYPE, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) =>
    dispatch(actions.getModalFileList(USER_ID, TYPE, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK)),
});

const mapStateToProps = createStructuredSelector({
  siteList: selectors.makeSelectSiteList(),
  adminMain: selectors.makeSelectAminMain(),
  fileList: selectors.makeSelectFileList(),
  linkList: selectors.makeSelectLinkList(),
  total: selectors.makeSelectListTotal(),
  modalFileList: selectors.makeSelectModalFileList(),
  modalTotal: selectors.makeSelectModalListTotal(),
  profile: makeSelectProfile(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminFilemanage', reducer });
const withSaga = injectSaga({ key: 'adminFilemanage', saga });

export default compose(withReducer, withSaga, withConnect)(AdminFileManage);

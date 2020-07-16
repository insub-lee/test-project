import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectProfile } from 'containers/common/Auth/selectors';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import Styled from './Styled';
import UserFolderTree from './UserFolderTree';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';

import FileList from './FileList';
import UserMain from './Main';

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

class UserFileManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      userSelectedIndex: -1,
      viewMainFlag: true,
    };
  }

  componentDidMount() {
    const { getUserFolderTree } = this.props;
    getUserFolderTree();
    this.viewMain();
    // TODO 대시보드 정보
  }

  viewMain = () => {
    this.setState({
      userSelectedIndex: -1,
      viewMainFlag: true,
    });
  };

  // 리스트
  handleUserfolderOnClick = node => {
    if (node) {
      this.setState({
        userSelectedIndex: node.key,
        viewMainFlag: false,
      });
    }
  };

  // 폴더
  insertUserFolder = (PRNT_FOLDER_ID, FOLDER_NAME) => {
    this.props.insertUserFolder(PRNT_FOLDER_ID, FOLDER_NAME);
  };

  updateUserFolder = (FOLDER_ID, FOLDER_NAME) => {
    this.props.updateUserFolder(FOLDER_ID, FOLDER_NAME);
  };

  deleteUserFolder = (FOLDER_ID, PARENT_NODE) => {
    this.props.deleteUserFolder(FOLDER_ID, PARENT_NODE, this.handleUserfolderOnClick);
  };

  render() {
    const {
      userFolderTreeData,
      fileList,
      linkList,
      total,
      getUserFileList,
      getFileShareLink,
      uploadFile,
      renameFile,
      deleteFile,
      deleteFileShareLink,
      getLinkList,
      getUserFileManage,
      userFileManage,
      getUserFolderTree,
    } = this.props;
    const { userSelectedIndex, viewMainFlag } = this.state;
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
                <span className="menu-title">내 폴더</span>
                <UserFolderTree
                  style={treeStyle}
                  treeData={userFolderTreeData}
                  onClick={this.handleUserfolderOnClick}
                  selectedIndex={userSelectedIndex}
                  wrapperStyle={treeWrapperStyle}
                  returnGateInfo={this.insertUserFolder}
                  returnGateUpdate={this.updateUserFolder}
                  returnGateDelete={this.deleteUserFolder}
                />
              </div>
            </div>
          </div>
          <div className="left-section">
            {viewMainFlag ? (
              <UserMain
                treeData={userFolderTreeData}
                getUserFileManage={getUserFileManage}
                userFileManage={userFileManage}
                uploadFile={uploadFile}
                getFileShareLink={getFileShareLink}
                getUserFolderTree={getUserFolderTree}
              />
            ) : (
              <FileList
                list={fileList}
                total={total}
                linkList={linkList}
                selectedIndex={userSelectedIndex}
                getFileShareLink={getFileShareLink}
                deleteFileShareLink={deleteFileShareLink}
                getLinkList={getLinkList}
                getFileList={getUserFileList}
                uploadFile={uploadFile}
                renameFile={renameFile}
                deleteFile={deleteFile}
                getUserFileManage={getUserFileManage}
                userFileManage={userFileManage}
              />
            )}
          </div>
        </div>
      </Styled>
    );
  }
}

UserFileManage.propTypes = {
  getUserFolderTree: PropTypes.func.isRequired,
  getUserFileList: PropTypes.func.isRequired,
  getFileShareLink: PropTypes.func.isRequired,
  deleteFileShareLink: PropTypes.func.isRequired,
  insertUserFolder: PropTypes.func.isRequired,
  updateUserFolder: PropTypes.func.isRequired,
  deleteUserFolder: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  renameFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  getLinkList: PropTypes.func.isRequired,
  userFolderTreeData: PropTypes.array.isRequired,
  fileList: PropTypes.array.isRequired,
  linkList: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  userFileManage: PropTypes.object.isRequired,
  getUserFileManage: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getUserFolderTree: () => dispatch(actions.getUserFolderTree()),
  getUserFileList: (FOLDER_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK) => dispatch(actions.getUserFileList(FOLDER_ID, KEYWORD, CURRENT, PAGE_SIZE, CALLBACK)),
  getFileShareLink: (FILE_ARRAY, EXPIRE_DAY, LIMIT_CNT, CALLBACK) => dispatch(actions.getFileShareLink(FILE_ARRAY, EXPIRE_DAY, LIMIT_CNT, CALLBACK)),
  deleteFileShareLink: (FILE_SEQ, SHARE_ID, CALLBACK) => dispatch(actions.deleteFileShareLink(FILE_SEQ, SHARE_ID, CALLBACK)),
  getLinkList: (FILE_SEQ, KEYWORD, CALLBACK) => dispatch(actions.getLinkList(FILE_SEQ, KEYWORD, CALLBACK)),
  insertUserFolder: (PRNT_FOLDER_ID, FOLDER_NAME, CALLBACK) => dispatch(actions.insertUserFolder(PRNT_FOLDER_ID, FOLDER_NAME, CALLBACK)),
  updateUserFolder: (FOLDER_ID, FOLDER_NAME, CALLBACK) => dispatch(actions.updateUserFolder(FOLDER_ID, FOLDER_NAME, CALLBACK)),
  deleteUserFolder: (FOLDER_ID, PARENT_NODE, CALLBACK) => dispatch(actions.deleteUserFolder(FOLDER_ID, PARENT_NODE, CALLBACK)),
  uploadFile: (FOLDER_ID, FILE_ARRAY, TYPE, CALLBACK) => dispatch(actions.uploadFile(FOLDER_ID, FILE_ARRAY, TYPE, CALLBACK)),
  renameFile: (FILE_SEQ, FILE_NAME, CALLBACK) => dispatch(actions.renameFile(FILE_SEQ, FILE_NAME, CALLBACK)),
  deleteFile: (FILE_SEQ, CALLBACK) => dispatch(actions.deleteFile(FILE_SEQ, CALLBACK)),
  getUserFileManage: CALLBACK => dispatch(actions.getUserFileManage(CALLBACK)),
});
const mapStateToProps = createStructuredSelector({
  userFolderTreeData: selectors.makeSelectUserFolderTreeData(),
  fileList: selectors.makeSelectFileList(),
  linkList: selectors.makeSelectLinkList(),
  total: selectors.makeSelectListTotal(),
  userFileManage: selectors.makeSelectUserFileManage(),
  profile: makeSelectProfile(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'uesrFilemanage', reducer });
const withSaga = injectSaga({ key: 'uesrFilemanage', saga });

export default compose(withReducer, withSaga, withConnect)(UserFileManage);

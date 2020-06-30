import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Input } from 'antd';

import Tree from 'components/Tree';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import Styled from './Styled';

import * as selectors from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';

const AntdInput = StyledInput(Input);

class FileManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }

  componentDidMount() {
    this.props.getSiteList();
    this.props.getUserFolderTree();
    this.props.getShareUserList();
  }

  handleOnClick = node => {
    console.debug('handleOnClick', node);
  };

  render() {
    const { siteList, userFolderTreeData, shareUserList } = this.props;
    return (
      <Styled>
        <div className="section-wrapper">
          <div className="right-section">
            <div className="title-area">[파일관리]</div>
            <div className="menu-area">
              <div className="menu-item">
                시스템 폴더
                <Tree
                  style={{
                    height: 300,
                    width: 300,
                    overflowY: 'scroll',
                  }}
                  treeData={siteList}
                  handleOnClick={this.handleOnClick}
                  selectedIndex={-1}
                />
              </div>
              <div className="menu-item">
                내 폴더
                <Tree
                  style={{
                    height: 300,
                    width: 300,
                    overflowY: 'scroll',
                  }}
                  treeData={userFolderTreeData}
                  handleOnClick={this.handleOnClick}
                  selectedIndex={-1}
                />
              </div>
              <div className="menu-item">
                공유 폴더
                <Tree
                  style={{
                    height: 300,
                    width: 300,
                    overflowY: 'scroll',
                  }}
                  treeData={shareUserList}
                  handleOnClick={this.handleOnClick}
                  selectedIndex={-1}
                />
              </div>
            </div>
          </div>
          <div className="left-section">
            <div className="search-area">
              <AntdInput style={{ width: 200 }} className="ant-input-sm ant-input-inline mr5" placeholder="검색어를 입력해 주세요."></AntdInput>
              <StyledButton className="btn-gray btn-sm">검색</StyledButton>
            </div>
          </div>
        </div>
      </Styled>
    );
  }
}

FileManage.propTypes = {
  getSiteList: PropTypes.func.isRequired,
  getSysFileList: PropTypes.func.isRequired,
  getUserFolderTree: PropTypes.func.isRequired,
  getUserFileList: PropTypes.func.isRequired,
  getDonwloadLink: PropTypes.func.isRequired,
  getShareUserList: PropTypes.func.isRequired,
  getShareFileList: PropTypes.func.isRequired,
  insertUserFolder: PropTypes.func.isRequired,
  updateUserFolder: PropTypes.func.isRequired,
  deleteUserFolder: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  getFileAuth: PropTypes.func.isRequired,
  updateFileAuth: PropTypes.func.isRequired,
  siteList: PropTypes.array.isRequired,
  sysFileList: PropTypes.array.isRequired,
  userFolderTreeData: PropTypes.array.isRequired,
  userFileList: PropTypes.array.isRequired,
  shareUserList: PropTypes.array.isRequired,
  shareFileList: PropTypes.array.isRequired,
  authData: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getSiteList: () => dispatch(actions.getSiteList()),
  getSysFileList: (SITE_ID, KEYWORD) => dispatch(actions.getSysFileList(SITE_ID, KEYWORD)),
  getUserFolderTree: () => dispatch(actions.getUserFolderTree()),
  getUserFileList: (KEYWORD, FOLDER_ID) => dispatch(actions.getUserFileList(KEYWORD, FOLDER_ID)),
  getDonwloadLink: FILE_SEQ => dispatch(actions.getDonwloadLink(FILE_SEQ)),
  getShareUserList: () => dispatch(actions.getShareUserList()),
  getShareFileList: (KEYWORD, SHARE_USER_ID) => dispatch(actions.getShareFileList(KEYWORD, SHARE_USER_ID)),
  insertUserFolder: () => dispatch(actions.insertUserFolder()),
  updateUserFolder: () => dispatch(actions.updateUserFolder()),
  deleteUserFolder: () => dispatch(actions.deleteUserFolder()),
  uploadFile: () => dispatch(actions.uploadFile()),
  deleteFile: (FOLDER_ID, FILE_SEQ) => dispatch(actions.deleteFile(FOLDER_ID, FILE_SEQ)),
  getFileAuth: () => dispatch(actions.getFileAuth()),
  updateFileAuth: () => dispatch(actions.updateFileAuth()),
});
const mapStateToProps = createStructuredSelector({
  siteList: selectors.makeSelectSiteList(),
  sysFileList: selectors.makeSelectSysFileList(),
  userFolderTreeData: selectors.makeSelectUserFolderTreeData(),
  userFileList: selectors.makeSelectUserFileList(),
  link: selectors.makeSelectLink(),
  shareUserList: selectors.makeSelectShareUserList(),
  shareFileList: selectors.makeSelectShareFileList(),
  authData: selectors.makeSelectAuthData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'filemanage', reducer });
const withSaga = injectSaga({ key: 'filemanage', saga });

export default compose(withReducer, withSaga, withConnect)(FileManage);

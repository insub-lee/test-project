import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input } from 'antd';
import { fromJS } from 'immutable';

import * as feed from 'components/Feedback/functions';
import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import * as fileUtil from '../../fileManageUtil';
import UploadModal from '../UploadModal';
import ShareModal from '../ShareModal';
import ShareListModal from '../../ShareListModal';
import RenameModal from '../RenameModal';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);

class FileList extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isUploadModalShow: false,
      tempUploadFiles: [],
      isShareModalShow: false,
      selectedFiles: [],
      selectedRowKeys: [],
      page: 1,
      pageSize: 10,
      loading: false,
      shareLinkFlag: false,
      shareLoading: false,
      isShareListModalShow: false,
      shareFile: {},
      shareListLoading: false,
      renameFile: {},
      renameModalShow: false,
    };
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const { selectedIndex } = this.props;
    if (selectedIndex > 0) {
      this.getFileListFirst();
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedIndex } = this.props;
    if (selectedIndex > 0 && selectedIndex !== prevProps.selectedIndex) {
      this.getFileListFirst();
    }
  }

  userColumns = [
    {
      title: '파일명',
      dataIndex: 'NAME',
      key: 'NAME',
      width: '25%',
    },
    {
      title: '크기',
      dataIndex: 'FILE_SIZE',
      key: 'FILE_SIZE',
      align: 'center',
      width: '10%',
      render: text => fileUtil.getFileSize(text),
    },
    {
      title: '파일유형',
      dataIndex: 'EXT',
      key: 'EXT',
      align: 'center',
      width: '10%',
      render: text => fileUtil.getFileIcon(text),
    },
    {
      title: '최정수정',
      dataIndex: 'MOD_DT',
      key: 'MOD_DT',
      width: '20%',
      align: 'center',
    },
    {
      title: '권한',
      dataIndex: 'SHARE_CNT',
      key: 'SHARE_CNT',
      align: 'center',
      width: '10%',
      render: (text, record) =>
        Number(text) > 0 ? (
          <StyledButton className="btn-link" onClick={() => this.getLinkList(record)}>
            공유현황
          </StyledButton>
        ) : (
          '미공유'
        ),
    },
    {
      title: '기능',
      dataIndex: 'SEQ',
      key: 'SEQ',
      width: '25%',
      align: 'center',
      render: (text, record) => (
        <>
          <StyledButton className="btn-link" onClick={e => fileUtil.confirmDownload(e, text, record.NAME)}>
            파일받기
          </StyledButton>
          <StyledButton className="btn-link" onClick={() => this.renameFile(record)}>
            수정
          </StyledButton>
          <StyledButton className="btn-link" onClick={() => this.deleteFile(Number(text), record.NAME)}>
            삭제
          </StyledButton>
        </>
      ),
    },
  ];

  // 리스트
  getFileListFirst = () => {
    const { getFileList, selectedIndex } = this.props;
    const { pageSize } = this.state;
    this.setState({ page: 1, loading: true, selectedFiles: [], selectedRowKeys: [] });
    this.searchInputRef.current.state.value = '';
    getFileList(selectedIndex, '', 1, pageSize, this.resetLoading);
  };

  getFileList = () => {
    const { getFileList, selectedIndex } = this.props;
    const { page, pageSize } = this.state;
    this.setState({ loading: true, selectedFiles: [], selectedRowKeys: [] });
    const keyword = this.searchInputRef.current.state.value || '';
    getFileList(selectedIndex, keyword, page, pageSize, this.resetLoading);
  };

  handleSearch = () => {
    this.setState({ page: 1 }, this.getFileList);
  };

  handleOnChange = pagination => {
    this.setState({ page: pagination.current }, this.getFileList);
  };

  resetLoading = () => {
    this.setState({ loading: false });
  };

  // 파일 공유 모달
  handleShare = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length > 0) {
      this.setState({ isShareModalShow: true, shareLinkFlag: false, shareLoading: false });
    } else {
      feed.error('공유할 파일을 선택해주세요.');
    }
  };

  onCancelSharePopup = () => {
    this.setState({ isShareModalShow: false, shareLinkFlag: false, shareLoading: false });
  };

  // 파일 업로드 모달
  handleUpload = () => {
    const { getUserFileManage } = this.props;
    getUserFileManage();
    this.setState({ isUploadModalShow: true });
  };

  onCancelUploadPopup = () => {
    if (this.state.tempUploadFiles > 0) {
      feed.showConfirm(`파일목록이 제거 됩니다. 계속 하시겠습니까?`, '', () => this.setState({ isUploadModalShow: false, tempUploadFiles: [] }));
    } else {
      this.setState({ isUploadModalShow: false });
    }
  };

  // 파일 업로드
  onTempFileUploaded = file => {
    const { tempUploadFiles } = this.state;
    const tmpArr = fromJS(tempUploadFiles).toJS();
    // tmpArr.push(file);

    // 파일 용량 체크
    const {
      userFileManage: { UPLOAD_FILE_SIZE, UPLOAD_LIMIT_SIZE, STORAGE_SIZE },
    } = this.props;
    const limit = Number(UPLOAD_LIMIT_SIZE) * 1024 * 1024; // MB
    const storage = Number(STORAGE_SIZE) * 1024 * 1024; // MB

    if (limit <= file.size) {
      feed.error(`업로드 용량 초과 (${fileUtil.getFileSize(limit)} )`);
    } else {
      tmpArr.push(file);
      const reducer = (accumulator, currentValue) => accumulator + currentValue.size;
      if (storage <= tmpArr.reduce(reducer, UPLOAD_FILE_SIZE)) {
        feed.error(`저장 용량 초과 (${fileUtil.getFileSize(storage)})`);
      }
    }

    this.setState({ tempUploadFiles: tmpArr });
  };

  removeTempUploadedFile = seq => {
    const { tempUploadFiles } = this.state;
    const tmpArr = fromJS(tempUploadFiles).toJS();
    this.setState({
      tempUploadFiles: tmpArr.filter(el => el.seq !== seq),
    });
  };

  uploadFile = () => {
    const { uploadFile, selectedIndex } = this.props;
    const { tempUploadFiles } = this.state;
    if (selectedIndex > 0) {
      if (tempUploadFiles.length > 0) {
        const callback = () => {
          this.setState({ page: 1, tempUploadFiles: [], isUploadModalShow: false }, this.getFileList);
        };
        uploadFile(selectedIndex, tempUploadFiles, '', callback);
      } else {
        feed.error('업로드할 파일을 선택해주세요.');
      }
    } else {
      feed.error('업로드할 폴더를 선택해주세요.');
    }
  };

  // 파일 이름 변경
  renameFile = record => {
    this.setState({ renameFile: record, renameModalShow: true });
  };

  confirmRename = rename => {
    const { renameFile: file } = this.state;
    const orgExt = file.NAME.split('.').pop();
    const destExt = rename.split('.').pop();

    const message =
      orgExt.toUpperCase() !== destExt.toUpperCase()
        ? '파일의 확장명을 변경하면 사용할 수 도 없게 될 수도 있습니다. 변경 하시겠습니까?'
        : '파일 이름을 변경하시겠습니까?';

    feed.showConfirm(message, rename, () => this.onRenameOkClick(rename));
  };

  onRenameOkClick = rename => {
    const { renameFile } = this.props;
    const { renameFile: file } = this.state;
    if (file.NAME !== rename) {
      const callback = () => {
        this.getFileList();
        this.onCancelRenamePopup();
      };
      renameFile(file.SEQ, rename, callback);
    }
  };

  onCancelRenamePopup = () => {
    this.setState({ renameFile: {}, renameModalShow: false });
  };

  // 파일 삭제
  deleteFile = (fileSeq, fileName) => {
    const { deleteFile } = this.props;
    feed.showConfirm(`${fileName} 파일을 삭제합니다. 계속 하시겠습니까?`, '', () => deleteFile(fileSeq, this.getFileList));
  };

  // 링크 생성
  confirmDownloadLink = (expDay, downloadLimit) => {
    const { selectedFiles } = this.state;
    const title = selectedFiles.length === 1 ? selectedFiles[0].NAME : `${selectedFiles[0].NAME} 외 ${selectedFiles.length - 1}개`;
    feed.showConfirm(`${title} 파일의 공유 링크를 생성 하시겠습니까?`, '', () => this.getFileShareLink(expDay, downloadLimit));
  };

  getFileShareLink = (expDay, downloadLimit) => {
    const { getFileShareLink } = this.props;
    const { selectedFiles } = this.state;
    this.setState({ shareLoading: true });
    getFileShareLink(selectedFiles, expDay, downloadLimit, this.setDownloadLink);
  };

  setDownloadLink = link => {
    this.setState({ shareLinkFlag: true, selectedFiles: link, selectedRowKeys: [], shareLoading: false });
    const { getFileList, selectedIndex } = this.props;
    const { page, pageSize } = this.state;
    this.setState({ loading: true });
    const keyword = this.searchInputRef.current.state.value || '';
    getFileList(selectedIndex, keyword, page, pageSize, this.resetLoading);
  };

  // 링크 리스트
  getLinkList = file => {
    const { getLinkList } = this.props;
    this.setState({ shareFile: file });
    getLinkList(file.SEQ, '', () => this.setState({ isShareListModalShow: true, shareListLoading: false }));
  };

  confirmDeleteFileShareLink = (fileSeq, shareId) => {
    feed.showConfirm(`공유링크를 삭제합니다. 계속 하시겠습니까?`, '', () => this.deleteFileShareLink(fileSeq, shareId));
  };

  deleteFileShareLink = (fileSeq, shareId) => {
    this.setState({ shareListLoading: true });
    const { deleteFileShareLink } = this.props;
    const callback = () => {
      this.setState({ shareListLoading: false });
      this.getFileList(); // 파일 리스트 갱신
    };
    deleteFileShareLink(fileSeq, shareId, callback);
  };

  onCancelShareListPopup = () => {
    this.setState({ isShareListModalShow: false, shareFile: {} });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedFiles: selectedRows });
  };

  render() {
    const { list, total, linkList, userFileManage } = this.props;
    const {
      isUploadModalShow,
      isShareModalShow,
      page,
      loading,
      tempUploadFiles,
      selectedFiles,
      selectedRowKeys,
      shareLinkFlag,
      shareLoading,
      isShareListModalShow,
      shareFile,
      shareListLoading,
      renameModalShow,
      renameFile,
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <>
        <UploadModal
          isShow={isUploadModalShow}
          onCancelPopup={this.onCancelUploadPopup}
          uploadFile={this.uploadFile}
          tempUploadFiles={tempUploadFiles}
          onTempFileUploaded={this.onTempFileUploaded}
          removeTempUploadedFile={this.removeTempUploadedFile}
          userFileManage={userFileManage}
        />
        <ShareModal
          isShow={isShareModalShow}
          onCancelPopup={this.onCancelSharePopup}
          selectedFiles={selectedFiles}
          confirmDownloadLink={this.confirmDownloadLink}
          flag={shareLinkFlag}
          loading={shareLoading}
        />
        <ShareListModal
          isShow={isShareListModalShow}
          onCancelPopup={this.onCancelShareListPopup}
          shareList={linkList}
          confirmDeleteFileShareLink={this.confirmDeleteFileShareLink}
          file={shareFile}
          loading={shareListLoading}
        />
        <RenameModal isShow={renameModalShow} onCancelPopup={this.onCancelRenamePopup} data={renameFile} confirmRename={this.confirmRename} />
        <div className="search-area">
          <AntdInput
            style={{ width: 200 }}
            className="ant-input-sm ant-input-inline mr5"
            placeholder="파일명을 입력해주세요."
            onPressEnter={this.handleSearch}
            ref={this.searchInputRef}
            maxLength="50"
          ></AntdInput>
          <StyledButton className="btn-gray btn-sm" onClick={this.handleSearch}>
            검색
          </StyledButton>
          <StyledButton className="btn-primary btn-sm right" onClick={this.handleUpload}>
            업로드
          </StyledButton>
          <StyledButton className="btn-light btn-sm right" onClick={this.handleShare}>
            선택 파일 공유
          </StyledButton>
        </div>
        <div>
          <AntdTable
            rowSelection={rowSelection}
            dataSource={list}
            loading={loading}
            columns={this.userColumns}
            onChange={this.handleOnChange}
            pagination={{ current: page, total }}
          />
        </div>
      </>
    );
  }
}

FileList.propTypes = {
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  linkList: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  getFileShareLink: PropTypes.func.isRequired,
  getFileList: PropTypes.func.isRequired,
  deleteFileShareLink: PropTypes.func.isRequired,
  getLinkList: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  renameFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  getUserFileManage: PropTypes.func.isRequired,
  userFileManage: PropTypes.object.isRequired,
};

export default FileList;

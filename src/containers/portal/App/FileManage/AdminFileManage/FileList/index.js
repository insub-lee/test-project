import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import * as feed from 'components/Feedback/functions';

import * as fileUtil from '../../fileManageUtil';
import FileManageModal from '../FileManageModal';
import FileListModal from '../FileListModal';
import ShareListModal from '../../ShareListModal';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);

class FileList extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      page: 1,
      pageSize: 10,
      loading: false,
      isManageModalShow: false,
      manageData: {},
      fileListType: '',
      fileListPageSize: 10,
      fileListLoading: false,
      isFileModalShow: false,
      fileData: {},
      isShareModalShow: false,
      shareFile: {},
      shareListLoading: false,
      shareModalUserId: -1,
      shareModalPage: 1,
    };
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const { selectedIndex, selectUserListFlag } = this.props;
    if (selectedIndex > 0) {
      this.getSysFileListFirst();
    } else if (selectUserListFlag) {
      this.getUserListFirtst();
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedIndex, selectUserListFlag } = this.props;
    if (selectedIndex > 0 && selectedIndex !== prevProps.selectedIndex) {
      this.getSysFileListFirst();
    } else if (selectUserListFlag && !prevProps.selectUserListFlag) {
      this.getUserListFirtst();
    }
  }

  sysColumns = [
    {
      title: '파일명',
      dataIndex: 'NAME',
      key: 'NAME',
      width: '25%',
      ellipsis: true,
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
      title: '파일경로',
      dataIndex: 'SITE_NAME',
      key: 'SITE_NAME',
      ellipsis: true,
      width: '25%',
      render: (text, record) => (
        <>
          {text} {record.WORK_NAME ? ` > ${record.WORK_NAME}` : ''} <br /> {`${record.DEPT_NAME}  / ${record.EMP_NO} / ${record.USER_NAME}`}
        </>
      ),
    },
    {
      title: '최종수정',
      dataIndex: 'MOD_DT',
      key: 'MOD_DT',
      width: '20%',
      align: 'center',
    },
    {
      title: '기능',
      dataIndex: 'SEQ',
      key: 'SEQ',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <StyledButton className="btn-link" onClick={e => fileUtil.confirmDownload(e, text, record.NAME)}>
          파일받기
        </StyledButton>
      ),
    },
  ];

  userColumns = [
    {
      title: '부서',
      dataIndex: 'DEPT_NAME',
      key: 'DEPT_NAME',
      ellipsis: true,
      align: 'center',
      width: '20%',
      render: (text, record) => (
        <StyledButton className="btn-link" onClick={() => this.handleManage(record)}>
          {text}
        </StyledButton>
      ),
    },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      key: 'EMP_NO',
      align: 'center',
      width: '15%',
      render: (text, record) => (
        <StyledButton className="btn-link" onClick={() => this.handleManage(record)}>
          {text}
        </StyledButton>
      ),
    },
    {
      title: '이름',
      dataIndex: 'USER_NAME',
      key: 'USER_NAME',
      align: 'center',
      width: '15%',
      render: (text, record) => (
        <StyledButton className="btn-link" onClick={() => this.handleManage(record)}>
          {text}
        </StyledButton>
      ),
    },
    {
      title: '업로드파일',
      dataIndex: 'UPLOAD_FILE_CNT',
      key: 'UPLOAD_FILE_CNT',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <StyledButton className="btn-link" style={{ width: '120px' }} onClick={() => this.handleFileModal(record, '')}>
          <span style={{ paddingRight: '5px' }}>{parseFloat(Number(text).toFixed(2))}</span>
          <FolderOutlined style={{ fontSize: '20px' }} />
        </StyledButton>
      ),
    },
    {
      title: '공유파일',
      dataIndex: 'SHARE_FILE_CNT',
      key: 'SHARE_FILE_CNT',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <StyledButton className="btn-link" style={{ width: '120px' }} onClick={() => this.handleFileModal(record, 'S')}>
          <span style={{ paddingRight: '5px' }}>{parseFloat(Number(text).toFixed(2))}</span>
          <FolderOutlined style={{ fontSize: '20px' }} />
        </StyledButton>
      ),
    },
    {
      title: '저장소 용량',
      dataIndex: 'UPLOAD_FILE_SIZE',
      key: 'UPLOAD_FILE_SIZE',
      align: 'center',
      width: '20%',
      render: (text, record) => `${fileUtil.getFileSize(text)} / ${Number(record.STORAGE_SIZE).toLocaleString(undefined, { maximumFractionDigits: 2 })} MB`,
    },
    {
      title: '업로드 용량 제한',
      dataIndex: 'UPLOAD_LIMIT_SIZE',
      key: 'UPLOAD_LIMIT_SIZE',
      width: '10%',
      align: 'center',
      render: text => `${parseFloat(Number(text).toFixed(2))} MB`,
    },
  ];

  getColumns = () => {
    const { selectUserListFlag } = this.props;
    if (selectUserListFlag) {
      return this.userColumns;
    }
    return this.sysColumns;
  };

  // 시스템파일 리스트 첫페이지
  getSysFileListFirst = () => {
    const { getSysFileList, selectedIndex } = this.props;
    const { pageSize } = this.state;
    this.setState({ page: 1, loading: true });
    this.searchInputRef.current.state.value = '';
    getSysFileList(selectedIndex, '', 1, pageSize, this.resetLoading);
  };

  // 시스템파일 리스트
  getSysFileList = () => {
    const { getSysFileList, selectedIndex } = this.props;
    const { page, pageSize } = this.state;
    this.setState({ loading: true });
    const keyword = this.searchInputRef.current.state.value || '';
    getSysFileList(selectedIndex, keyword, page, pageSize, this.resetLoading);
  };

  // 사용자 리스트 첫페이지
  getUserListFirtst = () => {
    const { getUserList } = this.props;
    const { pageSize } = this.state;
    this.setState({ page: 1, loading: true });
    this.searchInputRef.current.state.value = '';
    getUserList('', 1, pageSize, this.resetLoading);
  };

  // 사용자 리스트 첫페이지
  getUserList = () => {
    const { getUserList } = this.props;
    const { page, pageSize } = this.state;
    this.setState({ loading: true });
    const keyword = this.searchInputRef.current.state.value || '';
    getUserList(keyword, page, pageSize, this.resetLoading);
  };

  // 리스트 검색 및 페이징
  getList = () => {
    const { selectedIndex, selectUserListFlag } = this.props;
    if (selectUserListFlag) {
      this.getUserList();
    } else {
      this.getSysFileList();
    }
  };

  handleSearch = () => {
    this.setState({ page: 1 }, this.getList);
  };

  handleOnChange = pagination => {
    this.setState({ page: pagination.current }, this.getList);
  };

  resetLoading = () => {
    this.setState({ loading: false });
  };

  // 파일 관리 모달
  handleManage = data => {
    this.setState({ isManageModalShow: true, manageData: data });
  };

  onCancelManagePopup = () => {
    this.setState({ isManageModalShow: false, manageData: {} });
  };

  // 파일관리 수정
  updateUser = (userId, storageSize, limitSize) => {
    const { updateUser } = this.props;
    const { page, pageSize } = this.state;
    this.setState({ page: 1, isManageModalShow: false, loading: true });
    const keyword = this.searchInputRef.current.state.value || '';
    updateUser(userId, storageSize, limitSize, keyword, page, pageSize, () => this.setState({ isManageModalShow: false, manageData: {}, loading: false }));
  };

  // 파일 리스트 모달 (사용자파일, 공유 링크 생선된 파일)
  handleFileModal = (data, type) => {
    // 리스트 가져오고 실행
    const { getModalFileList } = this.props;
    const { fileListPageSize } = this.state;
    this.setState({ isFileModalShow: true, fileListLoading: true, fileData: data, fileListType: type });
    getModalFileList(data.USER_ID, type, '', 1, fileListPageSize, () => this.setState({ fileListLoading: false }));
  };

  onCancelFilePopup = () => {
    this.setState({ isFileModalShow: false, fileData: {} });
  };

  getModalFileList = (userId, page) => {
    const { getModalFileList } = this.props;
    const { fileListPageSize, fileListType } = this.state;
    this.setState({ fileListLoading: true });
    getModalFileList(userId, fileListType, '', page, fileListPageSize, () => this.setState({ fileListLoading: false }));
  };

  // 파일리스트 모달 -  파일 삭제
  confirmDeleteFile = (fileSeq, fileName, userId, page) => {
    feed.showConfirm(`${fileName} 파일을 삭제합니다. 계속 하시겠습니까?`, '', () => this.deleteFile(fileSeq, userId, page));
  };

  deleteFile = (fileSeq, userId, page) => {
    const { deleteFile } = this.props;
    const callback = () => {
      this.getModalFileList(userId, page);
      this.getList(); // 사용자 관리 리스트갱신
    };
    deleteFile(fileSeq, userId, callback);
  };

  // 공유링크 리스트 모달
  getLinkList = (file, userId, page) => {
    const { getLinkList } = this.props;
    this.setState({ shareFile: file, shareModalUserId: userId, shareModalPage: page });
    getLinkList(file.SEQ, '', () => this.setState({ isShareModalShow: true, shareListLoading: false }));
  };

  onCancelSharePopup = () => {
    this.setState({ isShareModalShow: false, shareFile: {} });
  };

  confirmDeleteFileShareLink = (fileSeq, shareKey) => {
    feed.showConfirm(`공유링크를 삭제합니다. 계속 하시겠습니까?`, '', () => this.deleteFileShareLink(fileSeq, shareKey));
  };

  deleteFileShareLink = (fileSeq, shareKey) => {
    const {
      shareFile: { USER_ID },
      shareModalUserId,
      shareModalPage,
    } = this.state;
    this.setState({ shareListLoading: true });
    const { deleteFileShareLink } = this.props;
    const callback = () => {
      this.setState({ shareListLoading: false });
      this.getModalFileList(shareModalUserId, shareModalPage); // 공유 링크 리스트 갱신
      this.getList(); // 사용자 관리 리스트갱신
    }
    deleteFileShareLink(fileSeq, shareKey, USER_ID, callback);
  };

  render() {
    const { list, total, modalFileList, modalTotal, linkList } = this.props;
    const {
      page,
      loading,
      isManageModalShow,
      manageData,
      isFileModalShow,
      fileData,
      fileListLoading,
      isShareModalShow,
      shareFile,
      shareListLoading,
      fileListType,
    } = this.state;

    return (
      <>
        <FileManageModal
          isShow={isManageModalShow}
          onCancelPopup={this.onCancelManagePopup}
          data={manageData}
          updateUser={this.updateUser}
          openFileModal={this.handleFileModal}
        />
        <FileListModal
          isShow={isFileModalShow}
          onCancelPopup={this.onCancelFilePopup}
          getList={this.getModalFileList}
          confirmDeleteFile={this.confirmDeleteFile}
          list={modalFileList}
          total={modalTotal}
          loading={fileListLoading}
          data={fileData}
          type={fileListType}
          openShareModal={this.getLinkList}
        />
        <ShareListModal
          isShow={isShareModalShow}
          onCancelPopup={this.onCancelSharePopup}
          shareList={linkList}
          confirmDeleteFileShareLink={this.confirmDeleteFileShareLink}
          file={shareFile}
          loading={shareListLoading}
        />
        <div className="search-area">
          <AntdInput
            style={{ width: 200 }}
            className="ant-input-sm ant-input-inline mr5"
            placeholder="검색어를 입력해 주세요."
            onPressEnter={this.handleSearch}
            ref={this.searchInputRef}
            maxLength="50"
          ></AntdInput>
          <StyledButton className="btn-gray btn-sm" onClick={this.handleSearch}>
            검색
          </StyledButton>
        </div>
        <div>
          <AntdTable dataSource={list} loading={loading} columns={this.getColumns()} onChange={this.handleOnChange} pagination={{ current: page, total }} />
        </div>
      </>
    );
  }
}

FileList.propTypes = {
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  selectUserListFlag: PropTypes.bool.isRequired,
  getSysFileList: PropTypes.func.isRequired,
  getUserList: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  getModalFileList: PropTypes.func.isRequired,
  modalFileList: PropTypes.array.isRequired,
  modalTotal: PropTypes.number.isRequired,
  linkList: PropTypes.array.isRequired,
  getLinkList: PropTypes.func.isRequired,
  deleteFileShareLink: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
};

export default FileList;

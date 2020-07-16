import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';
import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';

import * as fileUtil from '../../fileManageUtil';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModal(Modal);

const FileListModal = ({ isShow, onCancelPopup, data, list, loading, getList, total, confirmDeleteFile, type, openShareModal }) => {
  const [page, setPage] = useState(1);
  const title = `${type === 'S' ? '공유' : '업로드'} 파일 목록 - ${data.EMP_NO} ${data.USER_NAME}`;
  const fileColumns = [
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
      width: '15%',
      render: text => fileUtil.getFileIcon(text),
    },
    {
      title: '최종수정',
      dataIndex: 'MOD_DT',
      key: 'MOD_DT',
      width: '25%',
      align: 'center',
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
          <StyledButton className="btn-link" onClick={() => confirmDeleteFile(record.SEQ, record.NAME, record.USER_ID, page)}>
            삭제
          </StyledButton>
        </>
      ),
    },
  ];

  const shareColumns = [
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
      width: '15%',
      render: text => fileUtil.getFileIcon(text),
    },
    {
      title: '최종수정',
      dataIndex: 'MOD_DT',
      key: 'MOD_DT',
      width: '25%',
      align: 'center',
    },
    {
      title: '기능',
      dataIndex: 'SHARE_CNT',
      key: 'SHARE_CNT',
      width: '25%',
      align: 'center',
      render: (text, record) => (
        <>
          <span>{text}회 공유</span>
          <StyledButton className="btn-link" onClick={() => openShareModal(record, data.USER_ID, page)}>
            상세보기
          </StyledButton>
        </>
      ),
    },
  ];

  const handleOnChange = pagination => {
    setPage(pagination.current);
    getList(data.USER_ID, pagination.current);
  };

  const resetUseState = () => {
    setPage(1);
  };

  return (
    <AntdModal
      width={1200}
      zIndex={999}
      visible={isShow}
      afterClose={resetUseState}
      title={title}
      onCancel={onCancelPopup}
      destroyOnClose
      footer={
        <StyledButton className="btn-light btn-sm" onClick={onCancelPopup}>
          닫기
        </StyledButton>
      }
    >
      <>
        <AntdTable
          dataSource={list}
          loading={loading}
          columns={type === 'S' ? shareColumns : fileColumns}
          onChange={handleOnChange}
          pagination={{ current: page, total }}
        />
      </>
    </AntdModal>
  );
};

FileListModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  onCancelPopup: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  confirmDeleteFile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  openShareModal: PropTypes.func.isRequired,
};

export default FileListModal;

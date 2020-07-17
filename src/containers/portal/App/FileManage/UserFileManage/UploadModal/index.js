import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { MinusCircleTwoTone } from '@ant-design/icons';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';
import Upload from 'components/Upload';
import * as fileUtil from '../../fileManageUtil';

const AntdModal = StyledModal(Modal);

const UploadModal = ({ isShow, onCancelPopup, uploadFile, tempUploadFiles, onTempFileUploaded, removeTempUploadedFile, userFileManage }) => (
  <AntdModal
    width={500}
    visible={isShow}
    title={`업로드 (업로드 제한: ${fileUtil.getFileSize(userFileManage.UPLOAD_LIMIT_SIZE)})`}
    onCancel={onCancelPopup}
    destroyOnClose
    footer={[
      <StyledButton className="btn-light btn-sm" onClick={onCancelPopup}>
        닫기
      </StyledButton>,
      <StyledButton className="btn-primary btn-sm" onClick={uploadFile}>
        저장
      </StyledButton>,
    ]}
  >
    <>
      <Upload
        style={{ paddingBottom: '20px' }}
        multiple={false} // default true
        onFileUploaded={onTempFileUploaded}
        // width={350}
        height={50}
        borderStyle="dashed"
        maxSize={Number(userFileManage.UPLOAD_LIMIT_SIZE) * 1024 * 1024} // byte  UPLOAD_LIMIT_SIZE (MB)
      >
        <p style={{ height: '50px', textAlign: 'center', lineHeight: '50px' }}>Drag 'n' drop some files here, or click to select files</p>
      </Upload>
      <h3 style={{ paddingTop: '20px' }}>Files</h3>
      <ul style={{ height: '200px', overflowY: 'auto' }}>
        {tempUploadFiles.map(f => (
          <li key={f.seq} style={{ padding: '0 0 5px 0' }}>
            {f.fileName} | {fileUtil.getFileSize(f.fileSize)}
            <span style={{ float: 'right' }}>
              <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={() => removeTempUploadedFile(f.seq)} />
            </span>
          </li>
        ))}
      </ul>
    </>
  </AntdModal>
);

UploadModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onCancelPopup: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  tempUploadFiles: PropTypes.array.isRequired,
  onTempFileUploaded: PropTypes.func.isRequired,
  removeTempUploadedFile: PropTypes.func.isRequired,
  userFileManage: PropTypes.object.isRequired,
};

export default UploadModal;

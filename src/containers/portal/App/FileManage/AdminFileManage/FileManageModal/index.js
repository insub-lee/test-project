import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Select, Input } from 'antd';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import * as fileUtil from '../../fileManageUtil';

const AntdInput = StyledInput(Input);
const AntdModal = StyledModal(Modal);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

const FileManageModal = ({ isShow, onCancelPopup, data, updateUser, openFileModal }) => {
  const [storageSize, setStorageSize] = useState('');
  const [limitSize, setLimitSize] = useState('');

  const onCancelClick = () => {
    setStorageSize('');
    setLimitSize('');
    onCancelPopup();
  };

  if (!storageSize && data.STORAGE_SIZE) setStorageSize(data.STORAGE_SIZE);
  if (!limitSize && data.UPLOAD_LIMIT_SIZE) setLimitSize(data.UPLOAD_LIMIT_SIZE);

  return (
    <AntdModal
      width={500}
      visible={isShow}
      zIndex={998}
      title={`파일/저장소 상세 - ${data.EMP_NO} ${data.USER_NAME}`}
      onCancel={onCancelClick}
      destroyOnClose
      footer={[
        <StyledButton className="btn-light btn-sm" onClick={onCancelClick}>
          닫기
        </StyledButton>,
        <StyledButton className="btn-primary btn-sm" onClick={() => updateUser(data.USER_ID, Number(storageSize), Number(limitSize))}>
          저장
        </StyledButton>,
      ]}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        <Form.Item label="부서" name="DEPT_NAME">
          <AntdInput readOnly value={data.DEPT_NAME} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="사번" name="EMP_NO">
          <AntdInput readOnly value={data.EMP_NO} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="이름" name="USER_NAME">
          <AntdInput readOnly value={data.USER_NAME} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="업로드파일" name="UPLOAD_FILE_CNT">
          <AntdInput
            readOnly
            value={Number(data.UPLOAD_FILE_CNT).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            style={{ width: '100px', marginRight: '10px' }}
          />
          <StyledButton className="btn-light btn-sm" onClick={() => openFileModal(data, '')}>
            파일 목록
          </StyledButton>
        </Form.Item>
        <Form.Item label="저장소용량" name="storageSize">
          <AntdInput readOnly value={fileUtil.getFileSize(data.UPLOAD_FILE_SIZE)} style={{ width: '100px', marginRight: '10px' }} />
          <AntdSelect value={`${storageSize}`} onChange={value => setStorageSize(value)} style={{ width: '100px' }}>
            <Option value="500">500MB</Option>
            <Option value="1024">1GB</Option>
            <Option value="2048">2GB</Option>
          </AntdSelect>
        </Form.Item>
        <Form.Item label="업로드제한용량" name="limitSize">
          <span style={{ marginRight: '10px' }}>파일 1개당 최대</span>
          <AntdSelect value={`${limitSize}`} onChange={value => setLimitSize(value)} style={{ width: '100px' }}>
            <Option value="10">10MB</Option>
            <Option value="50">50MB</Option>
            <Option value="100">100MB</Option>
          </AntdSelect>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};

FileManageModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onCancelPopup: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  openFileModal: PropTypes.func.isRequired,
};

export default FileManageModal;

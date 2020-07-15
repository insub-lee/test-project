import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdModal = StyledModal(Modal);

const RenameModalShow = ({ isShow, onCancelPopup, data, confirmRename }) => {
  const [renameFile, setRenameFile] = useState('');

  const onCancelClick = () => {
    setRenameFile('');
    onCancelPopup();
  };

  if (!renameFile && data.NAME) setRenameFile(data.NAME);

  return (
    <AntdModal
      width={350}
      visible={isShow}
      title={`파일 이름 변경 - ${data.NAME}`}
      onCancel={onCancelClick}
      destroyOnClose
      footer={[
        <StyledButton className="btn-light btn-sm" onClick={onCancelClick}>
          닫기
        </StyledButton>,
        <StyledButton className="btn-primary btn-sm" onClick={() => confirmRename(renameFile.trim())}>
          저장
        </StyledButton>,
      ]}
    >
      <AntdInput
        style={{ width: '300px' }}
        className="ant-input-sm ant-input-inline mr5"
        placeholder="검색어를 입력해 주세요."
        onPressEnter={() => confirmRename(renameFile)}
        onChange={e => setRenameFile(e.target.value)}
        value={renameFile}
        maxLength="50"
      ></AntdInput>
    </AntdModal>
  );
};

RenameModalShow.propTypes = {
  isShow: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onCancelPopup: PropTypes.func.isRequired,
  confirmRename: PropTypes.func.isRequired,
};

export default RenameModalShow;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select, Input, List } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as feed from 'components/Feedback/functions';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import { BtnRedShare } from 'components/uielements/styles/buttons.style';

import * as fileUtil from '../../fileManageUtil';

const AntdInput = StyledInput(Input);
const AntdModal = StyledModal(Modal);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

const ShareModal = ({ isShow, onCancelPopup, selectedFiles, confirmDownloadLink, loading, flag }) => {
  const [expDay, setExpDay] = useState('10');
  const [dlLimt, setDlLimit] = useState('10');

  const onCancelClick = () => {
    setExpDay(10);
    setDlLimit(10);
    onCancelPopup();
  };

  return (
    <AntdModal
      width={500}
      visible={isShow}
      title="공유하기"
      onCancel={onCancelClick}
      destroyOnClose
      footer={[
        <StyledButton className="btn-light btn-sm" onClick={onCancelClick}>
          닫기
        </StyledButton>,
        <StyledButton
          style={{ display: flag && 'none' }}
          disabled={flag}
          className="btn-primary btn-sm"
          onClick={() => confirmDownloadLink(Number(expDay), Number(dlLimt))}
        >
          저장
        </StyledButton>,
      ]}
    >
      <>
        <List
          header={<div>파일 {selectedFiles.length}개</div>}
          itemLayout="horizontal"
          dataSource={selectedFiles}
          size="small"
          loading={loading}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={fileUtil.getFileIcon(item.EXT)}
                title={item.NAME}
                // description={(item.EXP_DTTM && `유효기간: ${item.EXP_DTTM}$`) + (item.DL_LIMIT_CNT && `접근횟수: ${item.DL_LIMIT_CNT}`)}
                description={
                  flag ? (
                    <>
                      <AntdInput style={{ width: '300px' }} readonly value={item.LINK} />
                      <CopyToClipboard text={item.LINK} onCopy={() => feed.success('클립보드에 복사 되었습니다.')}>
                        <BtnRedShare>복사</BtnRedShare>
                      </CopyToClipboard>
                    </>
                  ) : (
                    `마지막 수정일: ${item.MOD_DT} / 사이즈: ${fileUtil.getFileSize(item.FILE_SIZE)}`
                  )
                }
              />
            </List.Item>
          )}
          footer={
            flag ? (
              <div>
                유효기간: {selectedFiles[0].EXP_DTTM} 접근횟수: {selectedFiles[0].DL_LIMIT_CNT}
              </div>
            ) : (
              <div>
                유효기간 설정
                <AntdSelect defaultValue={expDay} value={expDay} onChange={value => setExpDay(value)} style={{ padding: '10px' }}>
                  <Option value="10">10일</Option>
                  <Option value="20">20일</Option>
                  <Option value="30">30일</Option>
                </AntdSelect>
                접근횟수 설정
                <AntdSelect defaultValue={dlLimt} value={dlLimt} onChange={value => setDlLimit(value)} style={{ padding: '10px' }}>
                  <Option value="10">10회</Option>
                  <Option value="20">20회</Option>
                  <Option value="30">30회</Option>
                </AntdSelect>
              </div>
            )
          }
        />
      </>
    </AntdModal>
  );
};

ShareModal.propTypes = {
  flag: PropTypes.bool.isRequired,
  isShow: PropTypes.bool.isRequired,
  selectedFiles: PropTypes.array.isRequired,
  onCancelPopup: PropTypes.func.isRequired,
  confirmDownloadLink: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ShareModal;

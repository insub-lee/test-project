import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, List } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as feed from 'components/Feedback/functions';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import { BtnRedShare } from 'components/uielements/styles/buttons.style';

import * as fileUtil from '../fileManageUtil';

const AntdInput = StyledInput(Input);
const AntdModal = StyledModal(Modal);

const calcExpired = val => {
  if (Number(val) < 0) {
    return '만료됨';
  }
  if (Number(val) === 0) {
    return '오늘 만료';
  }
  return `${val}일 남음`;
};

const ShareListModal = ({ isShow, onCancelPopup, file, shareList, confirmDeleteFileShareLink, loading }) => (
  <AntdModal
    width={500}
    visible={isShow}
    title="공유현황"
    onCancel={onCancelPopup}
    destroyOnClose
    footer={[
      <StyledButton className="btn-light btn-sm" onClick={onCancelPopup}>
        닫기
      </StyledButton>,
    ]}
  >
    <>
      <List
        header={
          <div>
            {fileUtil.getFileIcon(file.EXT)} {file.NAME}
          </div>
        }
        itemLayout="horizontal"
        dataSource={shareList}
        size="small"
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.NAME}
              loading={loading}
              description={
                <>
                  <AntdInput style={{ width: '300px' }} readonly value={item.LINK} />
                  <CopyToClipboard text={item.LINK} onCopy={() => feed.success('클립보드에 복사 되었습니다.')}>
                    <BtnRedShare>복사</BtnRedShare>
                  </CopyToClipboard>
                  <StyledButton className="btn-primary btn-sm" onClick={() => confirmDeleteFileShareLink(Number(item.FILE_SEQ), item.SHARE_KEY)}>
                    삭제
                  </StyledButton>
                  <br />
                  공유시간: {item.REG_DTTM}
                  <br />
                  유효기간: {item.EXP_DTTM} ({calcExpired(item.EXPIRE)})
                  <br />
                  접근횟수: {item.DL_CNT} / {item.DL_LIMIT_CNT}
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  </AntdModal>
);
ShareListModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  file: PropTypes.object.isRequired,
  shareList: PropTypes.array.isRequired,
  onCancelPopup: PropTypes.func.isRequired,
  confirmDeleteFileShareLink: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ShareListModal;

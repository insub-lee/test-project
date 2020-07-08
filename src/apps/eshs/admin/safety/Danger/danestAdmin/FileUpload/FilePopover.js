import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Popover } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import moment from 'moment';

moment.locale('ko');

const FilePopover = ({ UploadFilesDel, UploadTempFilesDel, dangerDanestAdminSubFile, tempFile }) => (
  <Popover
    content={
      <ul>
        {dangerDanestAdminSubFile &&
          Array.isArray(dangerDanestAdminSubFile) &&
          dangerDanestAdminSubFile.map(
            realFile =>
              realFile && (
                <li key={realFile.SEQ}>
                  <a href={`/down/file/${Number(realFile.SEQ)}`}>{realFile.NAME}</a> - {realFile.SIZE} bytes
                  <DeleteOutlined onClick={() => UploadFilesDel(realFile.SEQ)} />
                </li>
              ),
          )}
        {tempFile.map(
          file =>
            file && (
              <li key={file.seq}>
                <a href={file.down && file.down.replace('/file/', '/tempfile/')}>{file.fileName}</a> - {file.fileSize} bytes<font color="red">(임시저장)</font>
                <DeleteOutlined onClick={() => UploadTempFilesDel(file.seq)} />
              </li>
            ),
        )}
      </ul>
    }
    trigger="hover"
    placement="right"
  >
    {dangerDanestAdminSubFile.length <= 0 && tempFile.length <= 0 ? (
      <></>
    ) : (
      <button type="button" className="attachDownCompIconBtn" style={{ width: '100%', height: '100%', textAlign: 'center' }}>
        <Icon className="attachDownCompIcon" type="file-markdown" />
      </button>
    )}
  </Popover>
);

FilePopover.propTypes = {
  UNIQUE_SEQ: PropTypes.number,
  tempFile: PropTypes.array,
  dangerDanestAdminSubFile: PropTypes.array,
  UploadFilesDel: PropTypes.func,
  UploadTempFilesDel: PropTypes.func,
};

export default React.memo(FilePopover);

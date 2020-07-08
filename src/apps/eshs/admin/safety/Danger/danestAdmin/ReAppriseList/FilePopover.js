import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Popover } from 'antd';

import moment from 'moment';

moment.locale('ko');

const FilePopover = ({ dangerDanestAdminSubFile }) => (
  <Popover
    content={
      <ul>
        {dangerDanestAdminSubFile.map(
          realFile =>
            realFile && (
              <li key={realFile.SEQ}>
                <a href={`/down/file/${Number(realFile.SEQ)}`}>{realFile.NAME}</a> - {realFile.SIZE} bytes
              </li>
            ),
        )}
      </ul>
    }
    trigger="hover"
    placement="right"
  >
    <button type="button" className="attachDownCompIconBtn" style={{ width: '100%', height: '100%', textAlign: 'center' }}>
      <Icon className="attachDownCompIcon" type="file-markdown" />
    </button>
  </Popover>
);
FilePopover.propTypes = {
  dangerDanestAdminSubFile: PropTypes.array,
};

export default React.memo(FilePopover);

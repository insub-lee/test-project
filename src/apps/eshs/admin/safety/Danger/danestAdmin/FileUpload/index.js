import React from 'react';
import PropTypes from 'prop-types';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import Upload from 'components/Upload';
import moment from 'moment';
import FilePopover from './FilePopover';

moment.locale('ko');

const SubList = ({ subItem, onFileUploadTemp, UploadFilesDel, UploadTempFilesDel, dangerDanestAdminSubFile }) => (
  <>
    <Upload
      onFileUploaded={obj => onFileUploadTemp('file', obj, subItem)}
      // multiple={false} // default true
      width="100%"
      height="100%"
      borderStyle="none"
      serviceEnv="dev"
      serviceKey="KEY"
    >
      <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
        <StyledButton className="btn-light btn-first btn-xs">파일첨부</StyledButton>
      </div>
    </Upload>
    <FilePopover
      UploadFilesDel={UploadFilesDel}
      UploadTempFilesDel={UploadTempFilesDel}
      dangerDanestAdminSubFile={dangerDanestAdminSubFile || []}
      tempFile={subItem.file || []}
    />
  </>
);

SubList.propTypes = {
  subItem: PropTypes.object,
  dangerDanestAdminSubFile: PropTypes.array,
  onFileUploadTemp: PropTypes.func,
  UploadFilesDel: PropTypes.func,
  UploadTempFilesDel: PropTypes.func,
};

export default SubList;

import PropTypes from 'prop-types';
import React from 'react';
import { Upload as AntdUpload, Icon } from 'antd';

import Button from 'components/Button';

const UploadButton = () => (
  <Button htmlType="button">
    <Icon type="upload" /> Upload
  </Button>
);

const Upload = ({ handleChange, fileList, customRequest, action, limit, disabled, onRemove }) => (
  <div className="clearfix">
    <AntdUpload
      action={action}
      fileList={fileList}
      onChange={handleChange}
      onRemove={onRemove}
      customRequest={customRequest}
      showUploadList={{ showPreviewIcon: true, showDownloadIcon: true, showRemoveIcon: !disabled }}
    >
      {disabled || fileList.length >= limit ? null : <UploadButton />}
    </AntdUpload>
  </div>
);

Upload.propTypes = {
  action: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  customRequest: PropTypes.func,
  disabled: PropTypes.bool,
  fileList: PropTypes.arrayOf(PropTypes.object),
  limit: PropTypes.number,
  onRemove: PropTypes.func,
};

Upload.defaultProps = {
  fileList: [],
  handleChange: () => {},
  customRequest: () => {},
  onRemove: () => {},
  limit: 5,
};

export default Upload;

import PropTypes from 'prop-types';
import React from 'react';
import { Upload as AntdUpload, Icon } from 'antd';

import Button from 'components/Button';

const UploadButton = () => (
  <Button htmlType="button" className="uploadButton">
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
      showUploadList={disabled ? { showRemoveIcon: !disabled } : !disabled}
    >
      {disabled || fileList.length >= limit ? null : <UploadButton />}
    </AntdUpload>
  </div>
);

Upload.propTypes = {
  action: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  customRequest: PropTypes.func,
  fileList: PropTypes.arrayOf(PropTypes.object),
  limit: PropTypes.number,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
};

Upload.defaultProps = {
  fileList: [],
  handleChange: () => {},
  customRequest: () => {},
  onRemove: () => {},
  limit: 3,
};

export default Upload;

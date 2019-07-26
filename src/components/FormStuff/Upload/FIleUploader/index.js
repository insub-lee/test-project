import PropTypes from 'prop-types';
import React from 'react';
import { Upload as AntdUpload, Icon, Button } from 'antd';

const UploadButton = () => (
  <Button htmlType="button">
    <Icon type="upload" /> Upload
  </Button>
);

const Upload = ({
  handleChange, fileList, customRequest, action, limit,
}) => (
  <div className="clearfix">
    <AntdUpload
      action={action}
      fileList={fileList}
      onChange={handleChange}
      customRequest={customRequest}
    >
      {fileList.length >= limit ? null : <UploadButton />}
    </AntdUpload>
  </div>
);

Upload.propTypes = {
  action: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  customRequest: PropTypes.func,
  fileList: PropTypes.arrayOf(PropTypes.object),
  limit: PropTypes.number,
};

Upload.defaultProps = {
  fileList: [],
  handleChange: () => {},
  customRequest: () => {},
  limit: 3,
};

export default Upload;

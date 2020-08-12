import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon } from 'antd';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

class UploadComp extends Component {
  state = {
    fileInfo: {},
  };

  customRequest = value => {
    const { onChangeFileInfo } = this.props;
    this.setState({ fileInfo: value.file }, () => onChangeFileInfo(value.file));
  };

  onClickRemoveFile = file => {
    const { onChangeFileInfo } = this.props;
    this.setState({ fileInfo: {} }, () => onChangeFileInfo({}));
  };

  render() {
    const { fileInfo } = this.state;

    return (
      <Upload.Dragger multiple={false} beforeUpload={this.onBeforeUpload} customRequest={this.customRequest} showUploadList={false}>
        <div style={{ display: 'grid', textAlign: 'left', margin: 10, fontSize: '12px' }}>
          {fileInfo && Object.keys(fileInfo).length > 0 ? (
            <div style={{ height: 25 }}>
              <div style={{ verticalAlign: 'middle', height: '28px', display: 'inline-block', cursor: 'pointer' }}>{fileInfo.name}</div>
              <Icon
                onClick={e => {
                  e.stopPropagation();
                  this.onClickRemoveFile(fileInfo);
                }}
                type="delete"
                style={{ fontSize: '15px', verticalAlign: 'baseline', marginLeft: '10px' }}
              />
            </div>
          ) : (
            <p className="ant-upload-text" style={{ fontSize: '12px', textAlign: 'center' }}>
              <Icon type="file-excel" /> 첨부파일
            </p>
          )}
        </div>
      </Upload.Dragger>
    );
  }
}

UploadComp.propTypes = {
  onChangeFileInfo: PropTypes.func,
};

UploadComp.defaultProps = {
  onChangeFileInfo: () => false,
};

export default UploadComp;

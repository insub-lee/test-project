import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon } from 'antd';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

/**
 * <ExcelUpload
 *   onChangeFileInfo(file)
 * />
 */
class ExcelUpload extends Component {
  state = {
    fileInfo: {},
  }

  onBeforeUpload = (file, fileList) => {
    if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return true;
    } else {
      message.info(<MessageContent>Excel문서(.xls|.xlsx)만 업로드 가능합니다.</MessageContent>);
      return false;
    }
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
      <Upload.Dragger
        multiple={false}
        beforeUpload={this.onBeforeUpload}
        customRequest={this.customRequest}
        showUploadList={false}
      >
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
            <Icon type="file-excel" /> 엑셀 업로드</p>
        )}   
        </div>
      </Upload.Dragger>
    );
  }
}

ExcelUpload.propTypes = {
  onChangeFileInfo: PropTypes.func,
}

ExcelUpload.defaultProps = {
  onChangeFileInfo: () => false,
}

export default ExcelUpload;

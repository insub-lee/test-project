import React, { Component } from 'react';
import axios from 'axios';

import Upload from './Upload';

class DefaultUploader extends Component {
  state = {
    fileList: [],
  };

  getCurrentValueJson = fileList => fileList.filter(fileObj => fileObj.status === 'done').map(fileObj => ({
    ...fileObj, uid: undefined, thumbUrl: undefined, status: undefined,
  }));

  getCurrentValue = fileList =>
    JSON.stringify(fileList.filter(fileObj => fileObj.status === 'done').map(fileObj => ({
      ...fileObj, uid: undefined, thumbUrl: undefined, status: undefined,
    })));

  handleChange = ({ file, fileList }) => {
    const { uid, response, thumbUrl } = file;
    const { contSeq } = this.props;
    if (response && response.code === 300) {
      const uploadedFile = {
        ...response,
        code: undefined,
      };
      const fileIndex = fileList.findIndex(fileObj => fileObj.uid === uid);
      const nextFileList = fileList.map((fileObj, index) => {
        if (index === fileIndex) {
          return {
            ...uploadedFile,
            uid,
            thumbUrl,
            status: 'done',
          };
        }
        return {
          ...fileObj,
        };
      });
      this.setState({ fileList: nextFileList }, () => {
        console.debug('@@@@ files', this.state);
        console.debug('@@@ current values', this.getCurrentValue(this.state.fileList));
        const fileList = this.getCurrentValueJson(this.state.fileList);
        const { saveTempContents, name, contSeq } = this.props;
        console.debug('@@ save temp', fileList, name, 'file-upload', contSeq);
        saveTempContents(fileList, name, 'file-upload', contSeq);
      });
    } else {
      this.setState({ fileList });
    }
  };

  customRequest = ({
    action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials,
  }) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, file);
        },
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
      })
      .catch(onError);

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  };

  render() {
    const { fileList } = this.state;
    return (
      <Upload fileList={fileList} handleChange={this.handleChange} customRequest={this.customRequest} action="/upload" />
    );
  }
}
export default DefaultUploader;

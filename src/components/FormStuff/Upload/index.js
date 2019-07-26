import React, { Component } from 'react';
import axios from 'axios';

// import Upload from './Upload';
import Upload from './FIleUploader';

class DefaultUploader extends Component {
  state = {
    fileList: [],
  };

  getCurrentValueJson = fileList => fileList.filter(fileObj => fileObj.status === 'done').map(fileObj => ({
    ...fileObj, uid: undefined, thumbUrl: undefined, status: undefined,
  }));

  getCurrentValue = () => {
    const { fileList } = this.state;
    const { name, workSeq, taskSeq, contSeq } = this.props;
    return JSON.stringify({
      WORK_SEQ: workSeq,
      TASK_SEQ: taskSeq,
      CONT_SEQ: contSeq,
      FIELD_NM: name,
      ORD: 0,
      TYPE: 'rich-text-editor',
      DETAIL: fileList.filter(fileObj => fileObj.status === 'done').map(fileObj => ({
        ...fileObj, uid: undefined, thumbUrl: undefined, status: undefined,
      })),
    });
  };

  handleChange = ({ file, fileList }) => {
    const { uid, response, thumbUrl } = file;
    const { saveTempContents, name, contSeq } = this.props;
    if (response && response.code === 300) {
      const uploadedFile = {
        ...response,
        name: response.fileName,
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
        // Get Files what is done
        saveTempContents(this.getCurrentValueJson(this.state.fileList), name, 'file-upload', contSeq);
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
    const { name } = this.props;
    return (
      <div>
        <Upload fileList={fileList} handleChange={this.handleChange} customRequest={this.customRequest} action="/upload" />
        <input type="hidden" name={name} value={this.getCurrentValue(fileList.filter(file => file.status === 'done'))} data-type="json" />
      </div>
    );
  }
}

export default DefaultUploader;

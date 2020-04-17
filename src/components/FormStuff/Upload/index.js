import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// import Upload from './Upload';
import Upload from './FileUploader';
// import Upload from './DropZone';
const imgExts = ['jpg', 'png', 'gif', 'jpeg'];

class DefaultUploader extends Component {
  state = {
    fileList: [],
  };

  componentDidMount() {
    const {
      defaultValue: { DETAIL: fileList },
      onlyDown,
    } = this.props;
    if (fileList) {
      console.debug('# File List', fileList);
      this.setState({
        fileList: fileList.map(file => ({
          ...file,
          uid: file.seq,
          url: !onlyDown && file.fileExt && imgExts.includes(file.fileExt.toLowerCase()) ? file.link : file.down || file.down,
          status: 'done',
        })),
      });
    }
  }

  onRemove = file => {
    const { customRemove } = this.props;
    console.debug('Removed, file', file);
    customRemove(file);
  };

  getCurrentValueJson = fileList =>
    fileList
      .filter(fileObj => fileObj.status === 'done')
      .map(fileObj => ({
        ...fileObj,
        uid: undefined,
        thumbUrl: undefined,
        status: undefined,
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
      DETAIL: fileList
        .filter(fileObj => fileObj.status === 'done')
        .map(fileObj => ({
          ...fileObj,
          uid: undefined,
          thumbUrl: undefined,
          status: undefined,
        })),
    });
  };

  handleChange = ({ file, fileList }) => {
    console.debug('# change~~~~~', file, fileList);
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
      this.setState({ fileList }, () => {
        if (file.status === 'removed') {
          saveTempContents(this.getCurrentValueJson(this.state.fileList), name, 'file-upload', contSeq);
        }
      });
    }
  };

  customRequest = ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
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
    const { name, readOnly, multiple } = this.props;
    let limit = 1;
    if (multiple === true) {
      limit = 5;
    }
    return (
      <div>
        <Upload
          fileList={fileList}
          handleChange={this.handleChange}
          customRequest={this.customRequest}
          action="/upload"
          onRemove={this.onRemove}
          disabled={readOnly}
          limit={limit}
        />
        <input type="hidden" name={name} value={this.getCurrentValue(fileList.filter(file => file.status === 'done'))} data-type="json" />
      </div>
    );
  }
}

DefaultUploader.propTypes = {
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  multiple: PropTypes.bool,
  customRemove: PropTypes.func,
  onlyDown: PropTypes.bool,
};

DefaultUploader.defaultProps = {
  name: '',
  readOnly: false,
  multiple: true,
  customRemove: () => {},
  onlyDown: false,
};

export default DefaultUploader;

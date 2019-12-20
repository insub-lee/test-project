import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon, Progress, Upload, Button } from 'antd';

import { isJSON } from 'utils/helpers';
import StyledDragger from 'components/CommonStyled/StyledDragger';
import StyledButton from 'components/CommonStyled/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const { Dragger } = Upload;
const imgExts = ['jpg', 'png', 'gif', 'jpeg'];

class DragUploadComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      fileList: [],
    };
  }

  componentDidMount() {
    const { colData, formData } = this.props;
    let fileList = [];
    if (colData && colData.DETAIL) {
      fileList = colData.DETAIL;
    }

    if (fileList) {
      this.setState({
        fileList: fileList.map(file => ({
          ...file,
          uid: file.seq,
          url: imgExts.includes(file.fileExt.toLowerCase()) ? file.link : file.down,
          status: 'done',
        })),
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { colData: prevColData, COMP_FIELD: compField } = prevProps;
    const { colData, COMP_FIELD } = this.props;

    if (colData && colData.DETAIL && COMP_FIELD) {
      if (!prevColData || !prevColData.DETAIL) {
        const fileList = colData.DETAIL;

        if (fileList) {
          this.setState({
            fileList: fileList.map(file => ({
              ...file,
              uid: file.seq,
              url: imgExts.includes(file.fileExt.toLowerCase()) ? file.link : file.down,
              status: 'done',
            })),
          });
        }
      } else {
        let isValid = true;
        colData.DETAIL.forEach(node => {
          if (prevColData.DETAIL.findIndex(iNode => iNode.seq === node.seq) === -1) isValid = false;
        });
        if (!isValid) {
          const fileList = colData.DETAIL;

          if (fileList) {
            this.setState({
              fileList: fileList.map(file => ({
                ...file,
                uid: file.seq,
                url: imgExts.includes(file.fileExt.toLowerCase()) ? file.link : file.down,
                status: 'done',
              })),
            });
          }
        }
      }
    }
  }

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

  onRemove = itemindex => {
    const { id, changeFormData, colData, COMP_FIELD } = this.props;
    const { fileList } = this.state;
    this.setState({
      fileList: fileList.filter((item, index) => index !== itemindex),
    });

    const nextColDataDetail = colData.DETAIL.filter((item, index) => index !== itemindex);
    changeFormData(id, COMP_FIELD, nextColDataDetail);
  };

  handleChange = ({ file, fileList }) => {
    const { uid, response, thumbUrl } = file;
    if (fileList.length <= 5) {
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
          this.handlerAttachChange(this.state.fileList);
        });
      } else {
        this.setState({ fileList }, () => {
          if (file.status === 'removed') {
            this.handlerAttachChange(this.state.fileList);
          }
        });
      }

      this.setState({
        percent: 0,
      });
    } else {
      message.error(<MessageContent>최대 업로드 갯수를 초과하였습니다.</MessageContent>, 2);
    }
  };

  handlerAttachChange = detail => {
    const { CONFIG, id, changeFormData, changeValidationData, COMP_FIELD, NAME_KOR, WORK_SEQ, colData, COMP_TAG } = this.props;
    let retVal = {};
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, detail.length > 0, detail.length > 0 ? '' : `${NAME_KOR}는 필수항목 입니다.`);
    }

    if (colData && typeof colData === 'object' && colData.DETAIL && colData.DETAIL.length > 0) {
      colData.DETAIL = detail;
      retVal = colData;
    } else if (colData && colData.indexOf('{') === 0 && isJSON(colData)) {
      JSON.parse(colData).DETAIL = detail;
      retVal = colData;
    } else {
      retVal = {
        WORK_SEQ,
        TASK_SEQ: -1,
        CONT_SEQ: -1,
        FIELD_NM: COMP_FIELD,
        TYPE: COMP_TAG,
        DETAIL: detail,
      };
    }
    changeFormData(id, COMP_FIELD, retVal);
  };

  customRequest = ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
    const { fileList } = this.state;
    const size = fileList.length;
    if (size + 1 <= 5) {
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
      }
      formData.append(filename, file);

      const interval = setInterval(() => this.setState({ percent: this.state.percent + 1 }), 1000);

      axios
        .post(action, formData, {
          withCredentials,
          headers,
          onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, file);
            this.setState({
              percent: Number(Math.round((loaded / total) * 100).toFixed(2)),
            });
          },
        })
        .then(({ data: response }) => {
          onSuccess(response, file);
          clearInterval(interval);
        })
        .catch(onError);
    }

    return {
      abort() {
        // console.debug('upload progress is aborted.');
      },
    };
  };

  bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
  };

  render() {
    const { readOnly, visible } = this.props;
    const { fileList } = this.state;

    let view = false;
    if (readOnly !== undefined && readOnly) {
      view = readOnly;
    }

    const successFileList = fileList.filter(item => item.status === 'done');

    return visible ? (
      <StyledDragger>
        {!view && (
          <React.Fragment>
            <div className="btnTypeUploader" style={{ marginBottom: '10px' }}>
              <Upload
                action="/upload"
                fileList={fileList}
                disabled={!(successFileList.length <= 5)}
                onChange={this.handleChange}
                customRequest={this.customRequest}
                showUploadList={false}
                multiple
              >
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </div>
            <div className="dragTypeUploader" style={{ height: '138px' }}>
              <Dragger
                action="/upload"
                fileList={fileList}
                disabled={!(successFileList.length <= 5)}
                onChange={this.handleChange}
                customRequest={this.customRequest}
                showUploadList={false}
                openFileDialogOnClick={false}
                multiple
              >
                <React.Fragment>
                  {fileList.length === 0 && (
                    <React.Fragment>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">drag file to this area to upload</p>
                    </React.Fragment>
                  )}
                  {fileList.length > 0 && (
                    <div className="uploadList" style={{ margin: '-10px 0px -10px' }}>
                      {fileList.map((file, index) => (
                        <div className="uploadFileRow" style={{ position: 'relative', height: '25px' }}>
                          <div className="uploadFileInfo" style={{ position: 'absolute', top: 1, left: 10, fontSize: '0.8rem' }}>
                            <Icon type="paper-clip" /> {file.name} ({this.bytesToSize(file.size)})
                          </div>
                          {file.status === 'done' ? (
                            <div className="uploadFileBtn" style={{ position: 'absolute', top: 0, right: 10 }}>
                              <StyledButton className="btn-primary btn-xs btn-first" onClick={() => (window.location.href = `${file.down}`)}>
                                <Icon type="download" />
                              </StyledButton>
                              <StyledButton className="btn-light btn-xs" onClick={() => this.onRemove(index)}>
                                <Icon type="close" />
                              </StyledButton>
                            </div>
                          ) : (
                            <React.Fragment>
                              {file.status === 'error' ? (
                                <div className="uploadFileStatus" style={{ position: 'absolute', top: 4, right: 10 }}>
                                  <sapn style={{ color: 'red' }}>업로드 실패</sapn>
                                  {'  '}
                                  <StyledButton className="btn-light btn-xs" onClick={() => this.onRemove(index)}>
                                    <Icon type="close" />
                                  </StyledButton>
                                </div>
                              ) : (
                                <div className="uploadFileStatus" style={{ position: 'absolute', top: '0px', right: '15px', width: '35%' }}>
                                  <Progress percent={this.state.percent} status="active" />
                                </div>
                              )}
                            </React.Fragment>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              </Dragger>
            </div>
          </React.Fragment>
        )}
        {view && (
          <div className="uploadFileList">
            {fileList.length > 0 ? (
              fileList.map((file, index) => (
                <div className="uploadFileRow" style={{ padding: '10px 10px 10px', position: 'relative', height: '25px' }}>
                  <div className="uploadFileInfo" style={{ position: 'absolute', top: 1, left: 10, fontSize: '0.8rem' }}>
                    <Icon type="paper-clip" /> {file.name} ({this.bytesToSize(file.size)})
                  </div>
                  <div className="uploadFileBtn" style={{ position: 'absolute', top: 0, right: 10 }}>
                    <StyledButton className="btn-primary btn-xs btn-first" onClick={() => (window.location.href = `${file.down}`)}>
                      <Icon type="download" />
                    </StyledButton>
                  </div>
                </div>
              ))
            ) : (
              <span>첨부된 파일이 없습니다.</span>
            )}
          </div>
        )}
      </StyledDragger>
    ) : (
      ''
    );
  }
}

DragUploadComp.propTypes = {};

DragUploadComp.defaultProps = {};

export default DragUploadComp;

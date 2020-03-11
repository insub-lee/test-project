import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon, Progress, Upload, Button, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { isJSON } from 'utils/helpers';
import StyledDragger from 'components/CommonStyled/StyledDragger';
import StyledButton from 'components/CommonStyled/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const { Dragger } = Upload;
const imgExts = ['jpg', 'png', 'gif', 'jpeg'];

class ViewUploadedFileComp extends Component {
  state = {
    fileInfo: [],
  };

  componentWillMount() {
    console.debug('componentDidMount');
    const { WORK_SEQ, COMP_FIELD, COMP_TAG, colData } = this.props;
    const initfiles = {
      WORK_SEQ,
      TASK_SEQ: -1,
      CONT_SEQ: -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL: colData && colData.DETAIL ? colData.DETAIL : [],
    };
    this.setState({ fileInfo: initfiles });
  }

  // onProgress = (step, file) => {
  //   const { fileInfo } = this.state;
  //   const { DETAIL: fileList } = fileInfo;
  //   const tmpDetail = fileList.map(fObj => (fObj.uid === file.uid ? { ...fObj, type: 'LoadingOutlined' } : { ...fObj }));
  //   const tmpFileInfo = { ...fileInfo, DETAIL: tmpDetail };
  //   this.setState({ fileInfo: tmpFileInfo });
  // };

  onClickDownLoadFile = (e, file) => {
    e.stopPropagation();
    window.location.href = `${file.down}`;
  };

  render() {
    const { CONFIG } = this.props;
    const { fileInfo } = this.state;
    const { DETAIL: fileList } = fileInfo;

    return (
      <div className="uploadFileList">
        {fileList.length > 0 ? (
          fileList.map((file, index) => (
            <div className="uploadFileRow" style={{ padding: '10px 10px 10px', position: 'relative', height: '25px' }}>
              <div className="uploadFileInfo" style={{ position: 'absolute', top: 1, left: 10, fontSize: '0.8rem' }}>
                <Tooltip placement="topLeft" title={`${file.name}(${this.bytesToSize(file.size)})`} trigger="hover">
                  <Icon type="paper-clip" />
                  {file.name} ({this.bytesToSize(file.size)})
                </Tooltip>
              </div>
              <div className="uploadFileBtn" style={{ position: 'absolute', top: 0, right: 10 }}>
                <StyledButton
                  className="btn-primary btn-xs btn-first"
                  onClick={e => {
                    e.stopPropagation();
                    window.location.href = `${file.down}`;
                  }}
                >
                  <Icon type="download" />
                </StyledButton>
              </div>
            </div>
          ))
        ) : (
          <span>첨부된 파일이 없습니다.</span>
        )}
      </div>
    );
  }
}

ViewUploadedFileComp.propTypes = {};

ViewUploadedFileComp.defaultProps = { readOnly: false };

export default ViewUploadedFileComp;

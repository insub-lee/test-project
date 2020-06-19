import React, { Component } from 'react';
import { Icon } from 'antd';
import base64 from 'base-64';
import uuid from 'uuid/v1';
class DragUploadViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  componentDidMount() {
    const { colData, CONFIG } = this.props;
    const attachList = colData && colData.DETAIL ? colData.DETAIL : [];
    const tmpList = attachList.map(file => {
      let doctype = 'file-unknown';
      switch (file.fileExt) {
        case 'pdf':
          doctype = 'file-pdf';
          break;
        case 'xls':
          doctype = 'file-excel';
          break;
        case 'xlsx':
          doctype = 'file-excel';
          break;
        case 'txt':
          doctype = 'file-text';
          break;
        case 'doc':
          doctype = 'file-word';
          break;
        case 'docx':
          doctype = 'file-word';
          break;
        case 'ppt':
          doctype = 'file-ppt';
          break;
        case 'pptx':
          doctype = 'file-ppt';
          break;
        case 'zip':
          doctype = 'file-zip';
          break;
        default:
          break;
      }
      return { ...file, icon: <Icon type={doctype} style={{ fontSize: '18px', marginRight: '5px' }} /> };
    });
    this.setState({ fileList: tmpList });
  }

  render() {
    const { COMP_FIELD } = this.props;
    const { fileList } = this.state;
    return (
      <div id={COMP_FIELD}>
        <ul>
          {fileList.map(file => (
            <li className={file.fileExt}>
              <a href={file.down} download>
                {file.icon}
                {file.fileName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default DragUploadViewComp;

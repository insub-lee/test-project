import React, { Component } from 'react';
import { Icon } from 'antd';
import base64 from 'base-64';

class DragUploadMDCSViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  download = (sagaKey, response) => {
    console.debug(response);
  };

  onClickDownLoad = url => {
    const {
      CONFIG: {
        property: { selectedValue },
      },
    } = this.props;
    const acl = base64.encode(JSON.stringify(selectedValue));
    window.location.href = `${url}/${acl}`;
  };

  componentDidMount() {
    const { colData } = this.props;
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
    const { fileList } = this.state;

    return (
      <ul>
        {fileList.map(file => (
          <li className={file.fileExt} onClick={() => this.onClickDownLoad(file.down)}>
            {file.icon}
            {file.fileName}
          </li>
        ))}
      </ul>
    );
  }
}
export default DragUploadMDCSViewComp;

import React, { Component } from 'react';
import { Icon } from 'antd';

class DragUploadMDCSViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  download = response => {
    console.debug(response);
  };

  onClickDownLoad = url => {
    const {
      submitExtraHandler,
      sagaKey,
      CONFIG: {
        property: { selectedValue },
      },
    } = this.props;
    submitExtraHandler(sagaKey, 'GET', url, selectedValue, this.download);
  };

  componentDidMount() {
    const { colData } = this.props;
    console.debug('this.props', this.props);
    const { DETAIL: attachList } = colData;
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

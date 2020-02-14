import * as PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon, Popover } from 'antd';

class AttachDownComp extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      renderDownComp: '',
      isSingle: true,
      fileDownLink: '',
      fileExt: 'file',
      popVisible: true,
      renderDownList: undefined,
    };
  }

  componentDidMount = () => {
    const { colData } = this.props;
    let fileCnt = 0;
    let fileExt = '';
    if (colData && colData.indexOf('|') > -1) {
      fileCnt = Number(colData.split('|')[0]);
      fileExt = colData.split('|')[1];
    }
    if (fileCnt === 1) {
      this.setState({ renderDownComp: this.renderSingleComp(fileExt), fileExt });
    } else if (fileCnt > 1) {
      this.setState({ renderDownComp: this.renderMultiComp() });
    }
  };

  fileDownApi = isSingle => {
    const { sagaKey, CONFIG, getExtraApiData, rowData } = this.props;
    this.setState({ isSingle }, () => {
      const apiArray = [{ key: `taskFileList_${rowData.TASK_SEQ}`, url: `/api/builder/v1/work/contents/${rowData.WORK_SEQ}/${rowData.TASK_SEQ}`, type: 'GET' }];
      getExtraApiData(sagaKey, apiArray, this.fileDownApiAfterProcess);
    });
  };

  fileDownApiAfterProcess = data => {
    const { extraApiData, rowData, COMP_FIELD } = this.props;
    const { isSingle } = this.state;
    if (
      extraApiData &&
      extraApiData[`taskFileList_${rowData.TASK_SEQ}`] &&
      extraApiData[`taskFileList_${rowData.TASK_SEQ}`].data &&
      extraApiData[`taskFileList_${rowData.TASK_SEQ}`].data[COMP_FIELD]
    ) {
      if (isSingle) {
        this.setState({ fileDownLink: extraApiData[`taskFileList_${rowData.TASK_SEQ}`].data[COMP_FIELD].DETAIL[0].down });
      } else {
        this.setState({ renderDownList: this.renderMultiDownList(extraApiData[`taskFileList_${rowData.TASK_SEQ}`].data[COMP_FIELD].DETAIL) });
      }
    }
  };

  getFileExtType = fileExt => {
    let type = 'file';
    switch (fileExt) {
      case 'xls':
      case 'xlsx':
        type = 'file-excel';
        break;
      case 'ppt':
      case 'pptx':
        type = 'file-ppt';
        break;
      case 'doc':
      case 'docx':
        type = 'file-word';
        break;
      case 'pdf':
        type = 'file-pdf';
        break;
      case 'txt':
      case 'text':
        type = 'file-text';
        break;
      case 'png':
      case 'jpg':
      case 'bmp':
      case 'gif':
        type = 'file-image';
        break;
      case 'zip':
      case 'rar':
      case '7z':
      case 'alz':
      case 'egg':
      case 'cab':
      case 'bh':
      case '001':
      case 'arj':
      case 'lha':
      case 'lzh':
      case 'pma':
      case 'ace':
      case 'arc':
      case 'aes':
      case 'zpaq':
        type = 'file-zip';
        break;
      default:
    }
    return type;
  };

  handleHideChange = () => {
    this.setState({
      popVisible: false,
    });
  };

  handleVisibleChange = popVisible => {
    this.setState({ popVisible });
  };

  renderSingleComp = fileExt => {
    const type = this.getFileExtType(fileExt);
    return (
      <button type="button" onClick={() => this.fileDownApi(true)} className="attachDownCompIconBtn">
        <Icon className="attachDownCompIcon" type={type} />
      </button>
    );
  };

  renderMultiComp = () => (
    <button type="button" onClick={() => this.fileDownApi(false)} className="attachDownCompIconBtn">
      <Icon className="attachDownCompIcon" type="file-markdown" />
    </button>
  );

  renderMultiDownList = list => {
    const { rowData } = this.props;
    return (
      <div>
        {list.map(node => (
          <div key={`${rowData.TASK_SEQ}_${node.seq}`}>
            <a href={node.down} download>
              <Icon type={this.getFileExtType(node.fileExt)} />
              {node.fileName}
            </a>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { CONFIG, colData, readOnly, visible, isSearch, searchCompRenderer } = this.props;
    const { renderDownComp, fileDownLink, fileExt, renderDownList } = this.state;
    if (isSearch) {
      return '';
    }
    if (visible && fileDownLink)
      return (
        <>
          <a className="attachDownCompIconBtn" href={fileDownLink} download>
            <Icon className="attachDownCompIcon" type={this.getFileExtType(fileExt)} />
          </a>
          {fileDownLink && <iframe src={fileDownLink || ''} style={{ display: 'none' }} />}
        </>
      );
    if (visible && renderDownList) {
      return (
        <Popover content={renderDownList} trigger="click" visible={this.state.popVisible} onVisibleChange={this.handleVisibleChange} placement="right">
          <button type="button" className="attachDownCompIconBtn">
            <Icon className="attachDownCompIcon" type="file-markdown" />
          </button>
        </Popover>
      );
    }
    return visible ? renderDownComp : '';
  }
}

AttachDownComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  sagaKey: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
};

export default AttachDownComp;

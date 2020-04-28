import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';

class CustomTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSeqList: [],
    };
  }

  getReactContainerClasses() {
    return ['custom-tooltip'];
  }

  componentDidMount() {
    const { data } = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex);
    const hitemCd = data.hitem_cd;
    const getData = request({
      method: 'GET',
      url: `/api/eshs/v1/common/geteshsprotectionitemsattach?hitem_cd=${hitemCd}`,
    });
    this.makeFileList(getData);
  }

  makeFileList = data => {
    data.then(res => this.setState({ fileSeqList: res.response.fileList }));
  };

  render() {
    const { fileSeqList } = this.state;
    if (fileSeqList.length) {
      return (
        <div>
          {fileSeqList.map(item => (
            <img src={`http://192.168.251.14:10197/down/file/${item.FILE_SEQ}`} alt="사진이 없습니다." width="150px" />
          ))}
        </div>
      );
    }
    return <div>등록된 사진이 없습니다.</div>;
  }
}

CustomTooltip.propTypes = {
  api: PropTypes.object,
  rowIndex: PropTypes.number,
};

export default CustomTooltip;

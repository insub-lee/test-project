import React, { Component } from 'react';
import SyteldHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

class DragUploadMDCSViewComp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { colData } = this.props;
    console.debug('this.props', this.props);
    const { DETAIL: attachList } = colData;
    return (
      <ul>
        {attachList.map(file => (
          <li className={file.fileExt}>{file.fileName}</li>
        ))}
      </ul>
    );
  }
}
export default DragUploadMDCSViewComp;

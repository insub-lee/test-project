import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import Upload from 'components/Upload';
import basicStyle from 'config/basicStyle';
import { Row, Col } from 'antd';
// import { StyleAppRegisForm } from 'containers/store/AppMain/MyApp/AppRegisForm/StyleAppRegisForm';
import { StyleAppRegisForm } from 'containers/admin/AdminMain/App/AppRegisForm/StyleAppRegisForm';

const { rowStyle, colStyle, gutter } = basicStyle;

class multiUploadExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploadFiles: [],
    };
  }

  onFileUploaded = (file) => {
    const { uploadFiles } = this.state;
    const tmpArr = fromJS(uploadFiles).toJS();
    tmpArr.push(file);
    this.setState({
      uploadFiles: tmpArr,
    });
  }

  UploadFilesDel = (e, index) => {
    const tmpArr = fromJS(this.state.uploadFiles).toJS();
    tmpArr.splice(index, 1);
    this.setState({
      uploadFiles: tmpArr,
    });
    e.stopPropagation();
  };

  render() {
    const { uploadFiles } = this.state;
    const appIconUploadArea = {
      position: 'relative',
      display: 'inlineBlock',
      width: '400px',
      height: '200px',
      padding: '18px',
      background: '#f3f3f3',
      marginBottom: '30px',
      borderStyle: 'dashed',
    };

    return (
      <div style={appIconUploadArea}>
        <StyleAppRegisForm>
          <Upload
            accept="image/jpeg, image/png" // default ALL
            onFileUploaded={this.onFileUploaded}
            multiple={true} // default true
            width={250}
            height={120}
            borderStyle="none"
            serviceEnv="dev"
            serviceKey="KEY"
          >
            <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
              {uploadFiles.length !== 0 ?
                <Row
                  style={rowStyle}
                  gutter={gutter}
                  justify="start"
                >
                  {
                    uploadFiles.map((f, index) => (
                      <Col key={f.seq} md={6} sm={12} xs={24} style={colStyle}>
                        <img
                          src={`${f.link}`}
                          alt={f.fileName}
                          style={{ width: '100%', maxHeight: 100 }}
                        />
                        <li key={f.fileName}>{f.fileName} - {f.fileSize} bytes</li>
                        <button
                          className="deleteScreenshots"
                          onClick={e => this.UploadFilesDel(e, index)}
                          title={f.fileName}
                        />
                      </Col>
                    ))
                  }
                  <Col>
                    <div className="readyToUpload" />
                  </Col>
                </Row>
                :
                <div>
                  Drop files here, or click to select files
                </div>
              }
            </div>
          </Upload>
        </StyleAppRegisForm>
      </div>
    );
  }
}

export default multiUploadExample;

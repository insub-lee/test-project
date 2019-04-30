import React, { PureComponent } from 'react';
import { fromJS } from 'immutable';
import Upload from 'components/Upload';
import basicStyle from 'config/basicStyle';
import { Row, Col } from 'antd';
import { StyleAppRegisForm } from 'containers/store/AppMain/MyApp/AppRegisForm/StyleAppRegisForm';

const { rowStyle, colStyle, gutter } = basicStyle;

class App extends PureComponent {
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
            multiple={false} // default true
            width={250}
            height={120}
            borderStyle="none"
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
                          src={`/img/thumb/200x200/${f.seq}`}
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

const code = `import React, { PureComponent } from 'react';
import { fromJS } from 'immutable';
import Upload from 'components/Upload';
import basicStyle from 'config/basicStyle';
import { Row, Col } from 'antd';
import { StyleAppRegisForm } from 'containers/store/AppMain/MyApp/AppRegisForm/StyleAppRegisForm';

const { rowStyle, colStyle, gutter } = basicStyle;

class App extends PureComponent {
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
            multiple={false} // default true
            width={250}
            height={120}
            borderStyle="none"
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
                          src={&#96;/img/thumb/200x200/&#36;{f.seq}&#96;}
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
`;
const title = '-multiUpload 사용법';

const details = 'multiUpload 사용법의 예시입니다.';

export { App, code, title, details };

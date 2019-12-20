import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Input } from 'antd';
import { bannerImgUrl } from 'utils/commonUtils';
import Upload from 'components/Upload';
import { BtnIconWidgetDel } from '../../../../../components/uielements/styles/buttons.style';

class NotifyImgChild extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgList: this.props.imgList,
      uploadFiles: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.imgList !== nextProps.imgList) {
      this.setState({ imgList: nextProps.imgList });
    }
  }

  onFileUploaded = file => {
    const tmpArr = fromJS(this.state.uploadFiles).toJS();
    // one file upload 최신 파일만 업로드 되게
    tmpArr.splice(0, 0, file);
    this.setState({
      uploadFiles: tmpArr,
    });
    // 변경 작업(seq만 저장되도록)
    this.handleChangeImage(tmpArr[0].seq);
  };

  handleChangeTitle = e => {
    const copyImgList = this.state.imgList;
    copyImgList.TITLE = e.target.value;
    this.setState({ imgList: copyImgList, value: copyImgList.TITLE }); // eslint-disable-line
  };

  handleChangeUrl = e => {
    const copyImgList = this.state.imgList;
    copyImgList.URL = e.target.value;
    this.setState({ imgList: copyImgList, value: copyImgList.URL }); // eslint-disable-line
  };

  handleChangeImage = e => {
    const copyImgList = this.state.imgList;
    copyImgList.IMAGE = e;
    this.setState({ imgList: copyImgList, value: copyImgList.IMAGE }); // eslint-disable-line
  };

  render() {
    const { index, setDeletedImgIndex } = this.props;

    const { imgList, uploadFiles } = this.state;

    return (
      <div className="mediaRegForm imgReg" key={index}>
        <div className="containerDiv">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td rowSpan="2" style={{ width: 250 }}>
                  <Upload
                    accept="image/jpeg, image/png" // default ALL
                    onFileUploaded={this.onFileUploaded}
                    multiple={false} // default true
                    width={250}
                    height={100}
                    borderStyle="none"
                  >
                    {imgList.IMAGE === '' ? (
                      <div style={{ width: '100%', height: '100%' }}>
                        <p />
                        <ul>
                          {uploadFiles.map(f => (
                            <img src={`/img/thumb/200x200/${f.seq}`} alt={f.fileName} style={{ width: '100%', maxHeight: 100 }} />
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div style={{ width: '100%', height: '100%' }}>
                        <img src={bannerImgUrl.get('320x240', imgList.IMAGE)} style={{ width: '100%', maxHeight: 100 }} alt="defualtImg" />
                      </div>
                    )}
                  </Upload>
                </td>
                <td className="up">
                  <label htmlFor="subject" className="label">
                    {/* {intlObj.get(messages.bannerName)} */}
                    TITLE
                  </label>
                  <Input id="subject" name="TITLE" type="text" value={imgList.TITLE} onChange={this.handleChangeTitle} />
                </td>
              </tr>
              <tr>
                <td className="down">
                  <label htmlFor="url" className="label">
                    {/* {intlObj.get(messages.bannerName)} */}
                    URL
                  </label>
                  <Input placeholder="URL은 http:// 로 시작해주십시오." id="url" name="url" type="text" value={imgList.URL} onChange={this.handleChangeUrl} />
                </td>
              </tr>
            </tbody>
          </table>
          <BtnIconWidgetDel
            className="delete"
            title="delete"
            onClick={() => {
              setDeletedImgIndex(imgList.SEQNO);
            }}
            style={{ display: 'inline-block' }}
          />
        </div>
      </div>  // eslint-disable-line
    );
  }
}

NotifyImgChild.propTypes = {
  index: PropTypes.number.isRequired, // eslint-disable-line
  imgList: PropTypes.object.isRequired,  // eslint-disable-line
  setDeletedImgIndex: PropTypes.func.isRequired, // eslint-disable-line
};

export default NotifyImgChild;

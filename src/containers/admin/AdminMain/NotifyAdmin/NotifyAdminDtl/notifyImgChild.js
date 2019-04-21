import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { imgUrl } from 'utils/commonUtils';

class NotifyImgChild extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgList: this.props.imgList,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.imgList !== nextProps.imgList) {
      this.setState({ imgList: nextProps.imgList });
    }
  }

  render() {
    const {
      index,
    } = this.props;

    const { imgList } = this.state;

    // images":[{"id":"등대","seq":29060,"url":"www.daum.net"},{"id":"국화","seq":29061,"url":"www.naver.com"}]

    return (
      <div className="mediaRegForm imgReg" key={index}>
        <div className="containerDiv">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td rowSpan="2" style={{ width: 250 }}>
                  {imgList.IMAGE === '' ?
                    <div style={{ width: '100%', height: '100%' }}>
                      이미지가 없습니다
                    </div>
                      :
                    <div style={{ width: '100%', height: '100%' }}>
                      <img
                        src={imgUrl.get('320x240', imgList.seq)}
                        style={{ width: '100%', maxHeight: 100 }}
                        alt="defualtImg"
                      />
                    </div>
                  }
                </td>
                <td className="up">
                  <label htmlFor="subject" className="label">
                    TITLE
                  </label>
                  <Input
                    id="subject"
                    name="TITLE"
                    type="text"
                    value={imgList.id}
                    readOnly={true}
                  />
                </td>
              </tr>
              <tr>
                <td className="down">
                  <label htmlFor="url" className="label">
                    URL
                  </label>
                  <Input
                    id="url"
                    name="url"
                    type="text"
                    value={imgList.url}
                    readOnly={true}
                  />
                </td>
              </tr>
            </tbody>
          </table>
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


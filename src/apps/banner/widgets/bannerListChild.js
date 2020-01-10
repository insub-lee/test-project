import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { DragSource, DropTarget } from 'react-dnd';
import { Input } from 'antd';

import { intlObj, bannerImgUrl } from 'utils/commonUtils';

import { BtnIconFind, BtnIconDragSymbol2, BtnIconWidgetDel } from '../../../components/uielements/styles/buttons.style';
import Upload from '../../../components/Upload';
import messages from '../../../components/Page/messages';

const bannerDragSpec = {
  beginDrag(props) {
    const { changeIsWidgetDragged } = props;
    changeIsWidgetDragged();
    return {
      SEQNO: props.bannerList.SEQNO,
      value: '',
    };
  },
};

const bannerDropSpec = {
  hover(props, monitor) {
    const draggedSeqNo = monitor.getItem().SEQNO;
    if (draggedSeqNo !== props.bannerList.SEQNO) {
      props.dndChangePosition(draggedSeqNo, props.bannerList.SEQNO);
    }
  },
};

const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class BannerListChild extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: this.props.bannerList,
      uploadFiles: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bannerList !== nextProps.bannerList) {
      this.setState({ bannerList: nextProps.bannerList });
    }
  }

  handleChangeTitle = e => {
    const { bannerList } = this.state;
    bannerList.TITLE = e.target.value;
    this.setState({ bannerList, value: bannerList.TITLE });
  };

  handleChangeUrl = e => {
    const { bannerList } = this.state;
    bannerList.URL = e.target.value;
    this.setState({ bannerList, value: bannerList.URL });
  };

  handleChangeImage = e => {
    const { bannerList } = this.state;
    bannerList.IMAGE = e;
    this.setState({ bannerList, value: bannerList.IMAGE });
  };

  onFileUploaded = file => {
    const { uploadFiles } = this.state;
    const { deleteBanner } = this.props;
    const tmpArr = fromJS(this.state.uploadFiles).toJS();
    // one file upload 최신 파일만 업로드 되게
    tmpArr.splice(0, 0, file);
    this.setState({
      uploadFiles: tmpArr,
    });
    // 변경 작업(seq만 저장되도록)
    this.handleChangeImage(tmpArr[0].seq);
  };

  render() {
    const { index, setDeletedBannerIndex, connectDragSource, connectDropTarget } = this.props;

    const { bannerList, uploadFiles } = this.state;

    return connectDropTarget(
      connectDragSource(
        <div className="bannerRegForm" key={index}>
          {/* 드래그 되는 영역 // 시작 */}
          <div className="draggableDiv">
            <table style={{ width: '100%', marginTop: '7px' }}>
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
                      {bannerList.IMAGE === '' ? (
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
                          <img src={bannerImgUrl.get('320x240', bannerList.IMAGE)} style={{ width: '100%', maxHeight: 100 }} />
                        </div>
                      )}
                    </Upload>
                  </td>
                  <td className="up">
                    <label htmlFor="subject" className="label">
                      {intlObj.get(messages.bannerName)}
                    </label>
                    <Input
                      id="subject"
                      name="TITLE"
                      type="text"
                      value={bannerList.TITLE}
                      onMouseDown={e => (e.target.selectionStart = e.target.value.length)}
                      onChange={e => this.handleChangeTitle(e)}
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
                      value={bannerList.URL}
                      onMouseDown={e => {
                        e.target.selectionStart = e.target.value.length;
                      }}
                      onChange={e => this.handleChangeUrl(e)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <BtnIconDragSymbol2 className="dnd" title="dragSortChange" />
            <BtnIconWidgetDel
              className="delete"
              title="delete"
              onClick={() => {
                setDeletedBannerIndex(bannerList.SEQNO);
              }}
              i={bannerList.SEQNO}
              style={{ display: 'inline-block' }}
            />
          </div>
          {/* 드래그 되는 영역 // 끝 */}
        </div>,
      ),
    );
  }
}

BannerListChild.propTypes = {
  BannerListChild: PropTypes.array,
  index: PropTypes.number.isRequired,
  bannerList: PropTypes.object.isRequired,
  setDeletedBannerIndex: PropTypes.func.isRequired,
  changeIsWidgetDragged: PropTypes.func.isRequired,
  dndChangePosition: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

const dragHighOrderApp = DragSource('BannerListChild', bannerDragSpec, collectDrag)(BannerListChild);
export default DropTarget('BannerListChild', bannerDropSpec, collectDrop)(dragHighOrderApp);

import React from 'react';
// import Modal from 'react-Modal';
import Modal from 'rc-dialog';

// import modalStyles from '../modalStyles';
import StyledContent from './StyledContent';
// import Button from '../../Button';
import FormView from '../../FormPreview/FormView';

// Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';

class TableContentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      record: null,
      height: 0,
      editFunction: () => false,
      deleteFunction: () => false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.contentRef = React.createRef();
  }

  onSubmit(e) {
    e.preventDefault();
    const { callback } = this.state;
    // Todo - Need Common Api handler
    // Success - callback();
    // Fail - alert message
    callback();
  }

  handleOpen(url, record, editFunction, deleteFunction) {
    console.debug(this.contentRef, url, record);
    this.setState({ isOpen: true, url, record, editFunction, deleteFunction });
    // Todo - Need Common Api handler
  }

  handleClose() {
    this.setState({ isOpen: false, url: '', callback: () => false });
    // Todo - Need Common Api handler
  }

  handleAfterOpen() {
    console.debug('offestHeight', this.contentRef.current.offsetHeight);
    this.setState({ height: this.contentRef.current.offsetHeight + 10 });
  }

  render() {
    const { isOpen, height, editFunction, deleteFunction, record } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleClose}
        style={{
          width: 750,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div id="modal-content" ref={this.contentRef}>
          <StyledContent>
            {record && (
              <React.Fragment>
                <div className="sub_tit_bg">
                  <span className="big">제목</span>
                  <span className="line" />
                  <span className="small">{record.title}</span>
                  <div className="btn_wrap">
                    {/*
                    <Button
                      type="button"
                      size="small"
                      color="gray"
                      onClick={editFunction}
                    >
                      수정
                    </Button>
                    <Button
                      type="button"
                      size="small"
                      color="gray"
                      onClick={deleteFunction}
                    >
                      삭제
                    </Button>
                    */}
                    <button type="button" className="btn_close" onClick={this.handleClose} />
                  </div>
                </div>
                <div className="">
                  <FormView datas={record.contents.filter(content => content.option.name !== 'title')} noBoarder smallView />
                </div>
              </React.Fragment>
            )}
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

export default TableContentModal;

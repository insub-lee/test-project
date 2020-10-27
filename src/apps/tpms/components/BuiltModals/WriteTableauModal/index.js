import React from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-Modal';
import Modal from 'rc-dialog';

// import modalStyles from '../modalStyles';
import StyledContent from './StyledContent';
import Button from '../../Button';
import FormView from '../../FormPreview/FormView';
import service from './service';
import alertMessage from '../../Notification/Alert';

class WriteTableauModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      height: 0,
      isSubmitting: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.postForm = this.postForm.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.contentRef = React.createRef();
  }

  componentWillUnmount() {
    this.mounted = true;
    console.log('poihaspodighaspoidhgpoaishdgpoiahsdgpiohasdpgiohasdpiogh');
  }

  submitData(e) {
    e.preventDefault();
    const { url } = this.props;
    const data = new FormData(e.target);
    const content = {};
    data.forEach((value, key) => {
      content[key] = value;
    });

    const payload = content;
    console.debug('payload', payload);
    this.setState({ isSubmitting: true }, () => this.postForm(url, payload));
  }

  async postForm(url, payload) {
    const { response, error } = await service.tableau.post(url, payload);
    const { callback } = this.state;
    if (response && !error) {
      const { duplicationyn } = response;
      if (duplicationyn) {
        alert('메뉴ID가 중복되었습니다.다시 입력해주세요');
      } else {
        if (this.mounted) {
          this.setState(
            {
              isOpen: false,
              url: '',
              callback: () => false,
              isSubmitting: false,
            },
            () => {
              callback();
            },
          );
        }
        console.debug(response);
      }
    } else {
      alertMessage.alert('Server Error');
    }
    this.setState({ isSubmitting: false });
  }

  handleOpen(callback) {
    this.setState({ isOpen: true, callback: () => callback() });
  }

  handleClose() {
    this.setState({ isOpen: false, url: '', callback: () => false });
    // Todo - Need Common Api handler
  }

  handleAfterOpen() {
    this.setState({ height: this.contentRef.current.offsetHeight });
  }

  render() {
    const { isOpen, height, isSubmitting } = this.state;
    const { formJson } = this.props;
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
          minWidth: 500,
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div id="modal-content" ref={this.contentRef}>
          <StyledContent>
            <div>
              <div className="pop_tit">
                등록하기
                <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
              </div>
              <div className="pop_con">
                {isOpen && (
                  <form autoComplete="off" onSubmit={this.submitData}>
                    <FormView datas={formJson} noBoarder smallView />
                    <div className="btn_wrap" style={{ paddingBottom: 20 }}>
                      <Button type="submit" size="small" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <i className="fas fa-spinner fa-spin" />} 확인하기
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

WriteTableauModal.propTypes = {
  url: PropTypes.string,
};

WriteTableauModal.defaultProps = {
  url: '#',
};

export default WriteTableauModal;

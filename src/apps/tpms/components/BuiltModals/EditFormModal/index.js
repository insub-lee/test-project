import React from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-Modal';
import Modal from 'rc-dialog';

// import modalStyles from '../modalStyles';
import StyledContent from './StyledContent';
import Button from '../../Button';
import FormView from '../../FormPreview/FormView';
import service from './service';
import parseFiles from '../../../utils/parseFiles';

// Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';

class EditFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      height: 0,
      isSubmitting: false,
      contents: [],
      postno: -1,
      hpostno: -1,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.putForm = this.putForm.bind(this);
    this.submitData = this.submitData.bind(this);
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = true;
  }

  submitData(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const { postno, hpostno } = this.state;
    const { url, boardId } = this.props;
    const content = {};
    const payload = {
      brdid: boardId,
      postno,
      hpostno,
    };
    data.forEach((value, key) => {
      if (key === 'pwd') {
        payload.pwd = value;
      } else {
        content[key] = value;
      }
    });
    console.debug('payload', payload);
    if (payload.pwd === '' || payload.pwd === undefined) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    const { nextContent, files } = parseFiles(content);
    payload.title = nextContent.title;
    payload.year = nextContent.year;
    payload.adminid = nextContent.deptname;
    payload.content = nextContent;
    payload.files = files;
    if (this.mounted) {
      this.setState({ isSubmitting: true }, () => this.putForm(url, payload));
    }
  }

  async putForm(url, payload) {
    const { response, error } = await service.board.put(url, payload);
    const { callback } = this.state;
    if (response && !error) {
      if (this.mounted) {
        this.setState({ isOpen: false, url: '', callback: () => false }, () => {
          callback();
        });
      }
      console.debug(response);
    } else {
      console.debug('error', error);
      if (error.includes('401')) {
        // alertMessage.alert('비밀번호가 틀렸습니다.');
        alert('비밀번호가 틀렸습니다.');
      }
    }
    this.setState({ isSubmitting: false });
  }

  handleOpen(callback, contents, postno, hpostno) {
    const { usePwd, boardId } = this.props;
    const currentContents = contents.map(item =>
      // if (item.type === 'uploader') {
      //   const { name } = item.option;
      //   const filePaths = content[`${name}_FILE_PATH`].split(':::');
      //   const filenames = content[`${name}_FILE`].split(':::');
      //   if (filePaths[0] === '') {
      //     return {
      //       ...item,
      //       option: {
      //         ...item.option,
      //         files: [],
      //         readOnly: true,
      //       },
      //     };
      //   }
      //   const files = filePaths.map((path, index) => ({
      //     id: index,
      //     link: path,
      //     name: filenames[index] || 'unknown',
      //   }));
      //   return {
      //     ...item,
      //     option: {
      //       ...item.option,
      //       files,
      //       readOnly: true,
      //     },
      //   };
      // }
      ({
        ...item,
        option: {
          ...item.option,
          readOnly: false,
        },
      }),
    );
    if (usePwd) {
      currentContents.push({
        type: 'password',
        option: {
          label: '비밀번호',
          name: 'pwd',
          placeholder: '비밀번호를 입력해주세요.',
          value: boardId === 'brd00000000000000011' || boardId === 'brd00000000000000015' ? ' ' : '',
          required: false,
        },
        seq: currentContents.length,
      });
    }
    this.setState({
      isOpen: true,
      callback: () => callback(),
      contents: currentContents,
      postno,
      hpostno,
    });
  }

  handleClose() {
    this.setState({
      isOpen: false,
      url: '',
      callback: () => false,
      postno: -1,
      hpostno: -1,
    });
  }

  handleAfterOpen() {
    this.setState({ height: this.contentRef.current.offsetHeight });
  }

  render() {
    const { isOpen, height, isSubmitting, contents, postno, hpostno } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleClose}
        style={{
          width: 850,
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
                수정하기
                <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
              </div>
              <div className="pop_con">
                <form autoComplete="off" onSubmit={this.submitData}>
                  <FormView datas={contents} noBoarder smallView />
                  <div className="btn_wrap" style={{ paddingBottom: 20 }}>
                    {/*
                    <Button
                      type="button"
                      size="small"
                      color="gray"
                      onClick={this.handleClose}
                    >
                      취소
                    </Button>
                    */}
                    <Button type="submit" size="small" color="primary" disabled={isSubmitting}>
                      {isSubmitting && <i className="fas fa-spinner fa-spin" />}
                      확인하기
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

EditFormModal.propTypes = {
  formJson: PropTypes.arrayOf(PropTypes.object),
  boardId: PropTypes.string,
  url: PropTypes.string,
  usePwd: PropTypes.bool,
};

EditFormModal.defaultProps = {
  formJson: [],
  boardId: '',
  url: '#',
  usePwd: false,
};

export default EditFormModal;

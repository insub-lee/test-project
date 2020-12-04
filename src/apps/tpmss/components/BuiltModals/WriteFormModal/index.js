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
import parseFiles from '../../../utils/parseFiles';
import ProjectFormModal from '../ProjectModal';

// Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';

class WriteFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      height: 0,
      isSubmitting: false,
      tempTitle: '',
      tempObj: {},
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.postForm = this.postForm.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleClickSearchName = this.handleClickSearchName.bind(this);

    this.searchNameRef = React.createRef();
    this.ProjectFormRef = React.createRef();
  }

  componentDidMount() {
    this.mounted = true;
    this.contentRef = React.createRef();
  }

  componentWillUnmount() {
    this.mounted = true;
  }

  submitData(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const { url, boardId } = this.props;
    const { tempObj } = this.state;
    const content = {};
    const payload = {
      brdid: boardId,
    };
    data.forEach((value, key) => {
      if (key === 'pwd') {
        payload.pwd = value;
      } else {
        content[key] = value;
      }
    });
    if (boardId === 'brd00000000000000007' && Object.keys(tempObj).length < 1) {
      alert('선택된 프로젝트가 없습니다.');
      return;
    }
    if (payload.pwd === '' || payload.pwd === undefined) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    const { nextContent, files } = parseFiles(content);
    payload.title = nextContent.title;
    payload.content = nextContent;
    payload.year = nextContent.year;
    payload.files = files;
    this.setState({ isSubmitting: true }, () => this.postForm(url, payload));
  }

  async postForm(url, payload) {
    const { response, error } = await service.board.post(url, payload);
    const { callback } = this.state;
    if (response && !error) {
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
    } else {
      alertMessage.alert('Server Error');
    }
    this.setState({ isSubmitting: false });
  }

  handleOpen(callback) {
    this.setState({ isOpen: true, tempTitle: '', tempObj: {}, callback: () => callback() });
  }

  handleClose() {
    this.setState({ isOpen: false, url: '', tempTitle: '', callback: () => false });
    // Todo - Need Common Api handler
  }

  handleAfterOpen() {
    this.setState({ height: this.contentRef.current.offsetHeight });
  }

  handleSearchName(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleClickSearchName();
    }
  }

  handleClickSearchName() {
    const { value } = this.searchNameRef.current;
    if (value.length > 1) {
      this.ProjectFormRef.current.handleOpenModal(value);
    }
  }

  callBackFromList(payload) {
    this.setState({ tempTitle: payload.prj_title, tempObj: payload }, () => {
      // Set Title
      const title = `[${payload.prj_id}] ${payload.prj_title}`;
      console.debug('@@@ title', title);
      document.querySelector('input[name=title]').value = title;
    });
  }

  render() {
    const { isOpen, height, isSubmitting, tempTitle, tempObj } = this.state;
    const { boardId, formJson } = this.props;
    formJson[0].option.value = '';
    if (tempTitle !== '') {
      formJson[0].option.value = tempTitle;
    }
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
                등록하기
                <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
              </div>
              <div className="pop_con">
                {isOpen && (
                  <form autoComplete="off" onSubmit={this.submitData}>
                    {boardId === 'brd00000000000000007' ? (
                      <div>
                        <div className="btn_wrap" style={{ textAlign: 'left', padding: '10px 30px 0px 30px' }}>
                          <input
                            ref={this.searchNameRef}
                            type="text"
                            className="input"
                            onKeyDown={e => this.handleSearchName(e)}
                            style={{ display: 'inline-block', width: '30%', margin: '3px 0' }}
                            placeholder="Project 명으로 검색(2자 이상)"
                          />
                          <button
                            type="button"
                            value="검색"
                            onClick={this.handleClickSearchName}
                            style={{ width: 45, height: 45, border: '1px solid #d9e0e7', verticalAlign: 'top' }}
                          >
                            <i className="fas fa-search" />
                          </button>
                        </div>
                        {Object.keys(tempObj).length > 0 && (
                          <div style={{ padding: '10px', margin: '0 30px' }}>
                            <table style={{ width: '100%' }}>
                              <colgroup>
                                <col width="25%" />
                                <col width="25%" />
                                <col width="25%" />
                                <col width="25%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th>Project ID</th>
                                  <th>Project 명</th>
                                  <th>본부/팀</th>
                                  <th>Leader</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{tempObj.prj_id}</td>
                                  <td>{tempObj.prj_title}</td>
                                  <td>{tempObj.prj_leader_dept_name}</td>
                                  <td>{tempObj.prj_leader_name}</td>
                                </tr>
                              </tbody>
                            </table>
                            <input type="hidden" name="regid" value={tempObj.prj_leader} />
                          </div>
                        )}
                        <FormView datas={formJson} noBoarder smallView />
                      </div>
                    ) : (
                      <FormView datas={formJson} noBoarder smallView />
                    )}
                    <div className="btn_wrap" style={{ paddingBottom: 20 }}>
                      <Button type="submit" size="small" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <i className="fas fa-spinner fa-spin" />} 확인하기
                      </Button>
                    </div>
                    <ProjectFormModal ref={this.ProjectFormRef} callbackAfterFetch={payload => this.callBackFromList(payload)} />
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

WriteFormModal.propTypes = {
  formJson: PropTypes.arrayOf(PropTypes.object),
  boardId: PropTypes.string,
  url: PropTypes.string,
};

WriteFormModal.defaultProps = {
  formJson: [],
  boardId: '',
  url: '#',
};

export default WriteFormModal;

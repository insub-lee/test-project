import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { fromJS } from 'immutable';
import StyledContent from './StyledContent';
import Button from '../../Button';
import FormView from '../../FormPreview/FormView';
import service from './service';
import parseFiles from '../../../utils/parseFiles';

const defaultFormJson = [
  {
    seq: 0,
    type: 'text',
    option: {
      label: '제목',
      name: 'title',
      placeholder: '제목을 입력해주세요.',
      value: '',
      required: true,
    },
  },
  {
    seq: 1,
    type: 'richTextEditor',
    option: {
      label: '내용',
      name: 'reply',
      required: true,
      value: '',
    },
  },
  {
    seq: 2,
    type: 'password',
    option: {
      label: '비밀번호',
      name: 'pwd',
      placeholder: '비밀번호를 입력해주세요.',
      required: false,
      value: '',
    },
  },
];

const statusFormJson = {
  seq: 3,
  type: 'select',
  option: {
    label: '상태',
    name: 'status',
    values: [
      { label: '완료', value: '완료' },
      { label: '불가', value: '불가' },
      { label: '조치중', value: '조치중' },
    ],
  },
};

class ReplyFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      height: 0,
      isSubmitting: false,
      hpostno: 0,
      title: '',
      formJson: fromJS([]),
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.postForm = this.postForm.bind(this);
    this.submitData = this.submitData.bind(this);
    this.contentRef = React.createRef();
  }

  submitData(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const { hpostno, postgrp } = this.state;
    const { url, boardId } = this.props;
    const content = {};
    const payload = {
      brdid: boardId,
      hpostno,
      postgrp,
    };
    data.forEach((value, key) => {
      if (key === 'pwd') {
        payload.pwd = value;
      } else {
        content[key] = value;
      }
    });
    if (payload.pwd === '' || payload.pwd === undefined) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    const { nextContent, files } = parseFiles(content);
    payload.title = nextContent.title;
    payload.content = nextContent;
    payload.files = files;
    this.setState({ isSubmitting: true }, () => this.postForm(url, payload));
  }

  async postForm(url, payload) {
    const { response, error } = await service.board.post(url, payload);
    const { callback } = this.state;
    if (response && !error) {
      this.setState({ isOpen: false, url: '', callback: () => false }, () => {
        callback();
      });
      console.debug(response);
    } else {
      console.debug(error);
    }
    this.setState({ isSubmitting: false });
  }

  handleOpen(callback, hpostno, postgrp, title = '') {
    const { boardId } = this.props;
    this.setState({
      isOpen: true,
      callback: () => callback(),
      hpostno,
      postgrp,
      title,
      formJson: boardId === 'brd00000000000000024' ? fromJS(defaultFormJson).push(statusFormJson) : fromJS(defaultFormJson),
    });
  }

  handleClose() {
    this.setState({ isOpen: false, url: '', callback: () => false });
    // Todo - Need Common Api handler
  }

  handleAfterOpen() {
    this.setState({ height: this.contentRef.current.offsetHeight });
  }

  render() {
    const { isOpen, height, isSubmitting, hpostno, title, formJson } = this.state;
    // const { formJson, title } = this.props;
    const convertedFormJson = formJson.toJS().map(item => {
      if (item.option && item.option.name === 'title') {
        return {
          ...item,
          option: {
            ...item.option,
            value: `답변: ${title}`,
          },
        };
      }
      return {
        ...item,
      };
    });
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
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div id="modal-content-reply" ref={this.contentRef}>
          <StyledContent>
            <div>
              <div className="pop_tit">
                등록하기
                <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
              </div>
              <div className="pop_con">
                <form autoComplete="off" onSubmit={this.submitData}>
                  {/* Todo - add Title */}
                  <FormView datas={convertedFormJson} noBoarder smallView />
                  {/* Todo - add content */}
                  <div className="btn_wrap" style={{ paddingBottom: '20px' }}>
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

ReplyFormModal.propTypes = {
  boardId: PropTypes.string,
  url: PropTypes.string,
};

ReplyFormModal.defaultProps = {
  boardId: '',
  url: '#',
};

export default ReplyFormModal;

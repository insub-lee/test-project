import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import Button from 'components/Button';
import service from '../service';
import StyledContent from './StyledContent';
import { getSlideImageUrls } from './cleanEduSlides';

class CleanEduViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      imgUrls: getSlideImageUrls(58),
      canFinish: false,
      collseq: -1,
      empno: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleFinishButton = this.handleFinishButton.bind(this);
    this.handleFinishEdu = this.handleFinishEdu.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  handleOpenModal(collseq, empno) {
    this.setState({ isOpen: true, collseq, empno });
    // this.getFormData();
  }

  handleCloseModal() {
    this.setState({ isOpen: false, canFinish: false });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  handleFinishButton(currentIndex) {
    const { imgUrls } = this.state;
    if (currentIndex === imgUrls.length - 1) {
      console.debug('You Can Finish');
      this.setState({ canFinish: true });
    }
  }

  handleFinishEdu() {
    // const { site, searchDt, empno } = this.props;
    const { empno, collseq } = this.state;
    console.debug(empno, collseq);
    const payload = {
      type: 'updateEduBasicHisResult',
      empNo: empno,
      collseq,
      job_chk_result: 'O',
    };
    this.setState({ isLoading: true }, () => {
      this.updateData(payload).then(result => {
        if (result) {
          const { callbackHandler } = this.props;
          this.handleCloseModal();
          callbackHandler();
        } else {
          console.debug('에러 발생');
        }
      });
    });
  }

  async updateData(payload) {
    const { response, error } = await service.user.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  render() {
    const { isOpen, imgUrls, canFinish } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 1000,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              청정도 교육
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <div className="img_slider">
                <ImageGallery infinite={false} items={imgUrls} onSlide={this.handleFinishButton} showFullscreenButton={false} />
              </div>
              <div className="btn_wrap">
                <Button type="button" style={{ opacity: canFinish ? 1 : 0.2 }} onClick={this.handleFinishEdu} disabled={!canFinish}>
                  교육이수 완료
                </Button>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

CleanEduViewer.propTypes = {
  callbackHandler: PropTypes.func,
  site: PropTypes.string,
  searchDt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  empno: PropTypes.string,
};

CleanEduViewer.defaultProps = {
  callbackHandler: () => false,
  site: '',
  searchDt: '',
  empno: '',
};

export default CleanEduViewer;

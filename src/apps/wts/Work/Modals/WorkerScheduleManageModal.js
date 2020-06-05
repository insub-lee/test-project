import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import StyledContent from './StyledContent';
import SchedulerView from './SchedulerView';

class WorkerScheduleManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleAfterOpen() {}

  render() {
    const { isOpen } = this.state;
    const { empNo, usrNm, banjangId, site } = this.props;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 860,
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
              휴가 근무이력 조회
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <SchedulerView empNo={empNo} usrNm={usrNm} banjangId={banjangId} site={site} />
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

WorkerScheduleManageModal.propTyes = {
  empNo: PropTypes.string,
  usrNm: PropTypes.string,
  site: PropTypes.string,
};

WorkerScheduleManageModal.defaultProps = {
  empNo: '',
  usrNm: '',
  site: '',
};

export default WorkerScheduleManageModal;

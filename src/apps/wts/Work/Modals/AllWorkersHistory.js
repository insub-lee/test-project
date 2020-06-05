import React from 'react';
import Modal from 'rc-dialog';

import MonthlyPicker from 'apps/wts/components/MonthlyPicker';
import StyledContent from './StyledContent';
import WorkerDataSheet from '../WorkerDataSheet';

const generateLargeData = () => {
  const rows = [];
  for (let i = 0; i < 10000; i += 1) {
    rows.push({ id: i, title: `Task ${i}`, complete: i * 10 });
  }
  return rows;
};

class AcceptModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  handleChangeDate(momentDate) {
    console.debug(momentDate);
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: '100%',
          height: 'calc(100% - 60px)',
        }}
        bodyStyle={{
          height: '100%',
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              전체 근무 이력조회
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <div style={{ width: 200 }}>
                <MonthlyPicker name="date" value={new Date()} onChange={this.handleChangeDate} />
              </div>
              <br />
              <WorkerDataSheet initialRows={generateLargeData()} />
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

export default AcceptModal;

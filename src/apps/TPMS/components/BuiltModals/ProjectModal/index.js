import React from 'react';
import Modal from 'rc-dialog';
import moment from 'moment';

import StyledModalContent from '../../CommonStyledElement/StyledModalContent';
import DataTable from './DataTable';

class ProjectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      searchName: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    console.debug('ProjectIdModal_componentDidMount');
  }

  handleOpenModal(searchName) {
    console.debug('ProjectIdModal_handleOpenModal');
    this.setState({ isOpen: true, searchName });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  callBackFromList(payload) {
    const { callbackAfterFetch } = this.props;
    console.debug('payload', payload);
    callbackAfterFetch(payload);
    this.handleCloseModal();
  }

  render() {
    const { isOpen, searchName } = this.state;
    const columns = [
      {
        title: '본부/팀',
        dataIndex: 'prj_leader_dept_name',
        percentWidth: 20,
      },
      {
        title: 'Leader',
        dataIndex: 'prj_leader_name',
        percentWidth: 10,
      },
      {
        title: 'Level',
        dataIndex: 'prj_level',
        percentWidth: 10,
      },
      {
        title: 'Project Id',
        dataIndex: 'prj_id',
        percentWidth: 15,
      },
      {
        title: 'Project 명',
        dataIndex: 'prj_title',
        render: (title, recrod) => (
          <button
            type="button"
            onClick={() => {
              this.callBackFromList(recrod);
            }}
            style={{ textAlign: 'left' }}
          >
            {title}
          </button>
        ),
        percentWidth: 30,
      },
      {
        title: '시작일',
        dataIndex: 'prj_reg_date',
        render: item => moment(item).format('YYYY-MM-DD'),
        percentWidth: 15,
      },
    ];
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{ width: 1400 }}
        bodyStyle={{ padding: 0 }}
        closeable={false}
        destroyOnClose
      >
        <div>
          <StyledModalContent>
            <div className="pop_tit">
              Project
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <DataTable
                callbackAfterFetch={payload => this.callBackFromList(payload)}
                columns={columns}
                // view={view}
                searchName={searchName}
                // ref={this.DataTableRef}
              />
            </div>
          </StyledModalContent>
        </div>
      </Modal>
    );
  }
}

export default ProjectModal;

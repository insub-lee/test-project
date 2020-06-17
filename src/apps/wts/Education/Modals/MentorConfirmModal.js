import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { jsonToQueryString } from 'utils/helpers';
import service from '../service';
import StyledContent from './StyledContent';

class MentorConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      form: [],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleChangeFormInfo = this.handleChangeFormInfo.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.postData = this.postData.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  handleOpenModal(empno, type) {
    this.setState({ isOpen: true, empno, type });
    // this.getFormData();
  }

  getFormData() {
    this.setState({ isLoading: true }, () => {
      this.fetchData().then(({ failFetch, create, form }) => {
        if (failFetch) {
          this.handleCloseModal();
        } else if (create) {
          this.setState({
            create,
            form,
            isLoading: false,
          });
        } else {
          this.setState({ create, form, isLoading: false });
        }
      });
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  handleChangeFormInfo(key, value) {
    this.setState(prevState => {
      const { formInfo } = prevState;
      return { formInfo: formInfo.set(key, value) };
    });
  }

  saveData(e) {
    e.preventDefault();
    const { formInfo, create, site, fab } = this.state;
    const formData = new FormData(e.target);
    const payload = {
      type: 'troubleSheet',
      site,
      fab,
      fabInfo: fab,
    };
    formData.forEach((value, key) => {
      payload[key] = value;
      if (key === 'occurdt') {
        payload.searchDt = formInfo.get('occurdt');
      }
    });
    if (create) {
      this.postData(payload).then(result => {
        if (result) {
          const { callbackHandler } = this.props;
          this.handleCloseModal();
          callbackHandler();
        } else {
          alert('Server Error');
        }
      });
    } else {
      this.updateData(payload).then(result => {
        if (result) {
          const { callbackHandler } = this.props;
          this.handleCloseModal();
          callbackHandler();
        } else {
          alert('Server Error');
        }
      });
    }
  }

  async fetchData(site) {
    const requestQuery = {
      type: 'troubleSheet',
      searchSite: site,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.gcsChemDaily.get(queryString);
    if (response && !error) {
      const { troubleSheet } = response;
      return {
        create: troubleSheet === null,
        formInfo: troubleSheet || {},
      };
    }
    return {
      failFetch: true,
    };
  }

  async updateData(payload) {
    const { response, error } = await service.gcsChemDaily.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  async postData(payload) {
    const { response, error } = await service.gcsChemDaily.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  render() {
    const { isOpen, empno, type, isLoading, create } = this.state;
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
              멘토 확인
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">멘토 확인</div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

MentorConfirmModal.propTypes = {
  callbackHandler: PropTypes.func,
};

MentorConfirmModal.defaultProps = {
  callbackHandler: () => false,
};

export default MentorConfirmModal;

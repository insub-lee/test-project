import React, { PureComponent } from 'react';
import { Radio, Modal, Alert } from 'antd';
import PropTypes from 'prop-types';
import RadioPopupModalComp from './RadioPopupModalComp';

class RadioPopupComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      message: '',
    };
  }

  handleOnChange = e => {
    const { sagaKey: id, COMP_FIELD, changeFormData } = this.props;
    e.target.value === 'Y' ? this.setState({ openModal: true }) : this.setState({ openModal: false });
    return changeFormData(id, COMP_FIELD, e.target.value);
  };

  handleOnClick = () => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'DIVISION', ' ');
    changeFormData(id, 'PLACE', ' ');
    return '';
  };

  handleModalOnChange = e => {
    const { sagaKey: id, changeFormData } = this.props;
    return changeFormData(id, 'DIVISION', String(e));
  };

  handleModalOnChecked = e => {
    const { sagaKey: id, changeFormData } = this.props;
    return changeFormData(id, 'PLACE', e.target.value);
  };

  handelInitForm = () => {
    const { sagaKey: id, COMP_FIELD, changeFormData } = this.props;
    changeFormData(id, COMP_FIELD, ' ');
    changeFormData(id, 'DIVISION', ' ');
    changeFormData(id, 'PLACE', ' ');
  };

  handleAlertClose = () => {};

  render() {
    const { visible, colData, formData, readOnly } = this.props;

    let view = false;
    if (readOnly !== undefined && readOnly) {
      view = readOnly;
    }
    return visible ? (
      <div>
        <div style={{ float: 'left', marginRight: '10px' }}>WDS / I-Foundry Registration</div>
        <div style={{ float: 'left' }}>
          <Radio.Group onChange={this.handleOnChange} value={colData !== ' ' ? colData : undefined} disabled={view}>
            <Radio value="Y">Yes</Radio>
            <Radio value="N" onClick={this.handleOnClick}>
              No
            </Radio>
          </Radio.Group>

          <Modal
            className="modalWrapper"
            width={500}
            visible={this.state.openModal}
            mask={false}
            destroyOnClose
            onOk={() => {
              let message = '';
              if (!formData.DIVISION.trim()) message = 'Application Division를 선택해주십시오.';
              else if (!formData.PLACE.trim()) message = 'Registration Place를 선택해주십시오.';
              if (message) return this.setState({ message });
              return this.setState({ openModal: false, message: '' });
            }}
            onCancel={() => {
              this.setState({
                openModal: false,
                message: '',
              });
              this.handelInitForm();
            }}
          >
            <RadioPopupModalComp onChange={this.handleModalOnChange} onChecked={this.handleModalOnChecked} formData={formData} />
            <br />
            {this.state.message && <Alert message={this.state.message} type="warning" showIcon />}
          </Modal>
          {!this.state.openModal && formData.DIVISION.trim() !== '' && formData.PLACE.trim() !== '' && (
            <p>
              <span>Application Division : {formData.DIVISION.replace(/,/gi, ', ')}</span>
              <br />
              <span>Registration Place : {formData.PLACE}</span>
            </p>
          )}
        </div>
      </div>
    ) : (
      ''
    );
  }
}

RadioPopupComp.propTypes = {
  COMP_FIELD: PropTypes.string,
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  readOnly: PropTypes.bool,
  colData: PropTypes.any,
  formData: PropTypes.object,
};

export default RadioPopupComp;

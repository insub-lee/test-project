import React, { PureComponent } from 'react';
import { Radio, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import RadioPopupModalComp from './RadioPopupModalComp';

class RadioPopupComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
  }

  componentDidMount = () => {
    const { isManage, formData, rowClass } = this.props;
    const isDisplay = formData.DOCNUMBER && formData.DOCNUMBER.indexOf('ME') === 0;
    if (!isManage && rowClass && !isDisplay) {
      const rowNode = document.querySelector(`.${rowClass}`);
      rowNode.style.display = 'none';
    }
  };

  componentDidUpdate = prevProps => {
    const { isManage, formData, rowClass } = this.props;
    const { formData: prevFormData } = prevProps;
    if (formData.DOCNUMBER && prevFormData.DOCNUMBER && formData.DOCNUMBER !== prevFormData.DOCNUMBER) {
      const isDisplay = formData.DOCNUMBER.indexOf('ME') === 0;
      if (!isManage && rowClass && !isDisplay) {
        const rowNode = document.querySelector(`.${rowClass}`);
        rowNode.style.display = 'none';
      } else if (rowClass) {
        const rowNode = document.querySelector(`.${rowClass}`);
        rowNode.style.display = '';
      }
    }
  };

  handleOnChange = e => {
    const { sagaKey: id, COMP_FIELD, changeFormData } = this.props;
    this.setState({ openModal: e.target.value === 'Y' });
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

  validationCheck = (divsion, place) => {
    let msg = '';
    if (!divsion.trim()) msg = 'Application Division을 선택해주십시오.';
    else if (!place.trim()) msg = 'Registration Place를 선택해주십시오.';
    if (msg) return message.warning(msg);
    return this.setState({ openModal: false });
  };

  render() {
    const { visible, colData, formData, readOnly, isManage, CONFIG } = this.props;

    let view = false;
    if (readOnly !== undefined && readOnly) {
      view = readOnly;
    }
    return isManage || (visible && formData.DOCNUMBER && formData.DOCNUMBER.indexOf('ME') === 0) ? (
      <div className={CONFIG.property.className || ''}>
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
            onOk={() => this.validationCheck(formData.DIVISION, formData.PLACE)}
            onCancel={() => {
              this.setState({
                openModal: false,
              });
              this.handelInitForm();
            }}
          >
            <RadioPopupModalComp onChange={this.handleModalOnChange} onChecked={this.handleModalOnChecked} formData={formData} />
            <br />
          </Modal>
          {!this.state.openModal && formData.DIVISION && formData.DIVISION.trim() !== '' && formData.PLACE && formData.PLACE.trim() !== '' && (
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

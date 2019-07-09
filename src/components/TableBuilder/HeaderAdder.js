import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormGroup from 'components/FormGroup/Styled';

class HeaderAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      headerText: '',
    };
  }

  setFocus = value => {
    this.setState({ isFocus: value });
  };

  setHeaderText = value => {
    this.setState({ headerText: value });
  };

  render() {
    const { setFocus, setHeaderText } = this;
    const { isFocus, headerText } = this.state;
    const {
      action: { addHeader },
    } = this.props;
    return (
      <FormGroup>
        <div className="input-group" style={{ width: 300 }}>
          <div className={`input-group-prepend ${isFocus ? 'has-length' : ''}`}>
            <span className="input-group-text py-1 px-3">Header 추가</span>
          </div>
          <input
            id="input-group-lg-size"
            type="text"
            className="form-control"
            placeholder="Large size"
            aria-describedby="input-group-lg-size"
            defaultValue={headerText}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={e => setHeaderText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                addHeader(headerText);
              }
            }}
          />
          <div className={`input-group-append ${isFocus ? 'has-length' : ''}`}>
            <button type="button" className="btn btn-outline-default" onClick={() => addHeader(headerText)}>
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      </FormGroup>
    );
  }
}

HeaderAdder.propTypes = {
  action: PropTypes.shape({
    addHeader: PropTypes.func,
  }),
};

HeaderAdder.defaultProps = {
  action: {
    addHeader: () => false,
  },
};

export default HeaderAdder;

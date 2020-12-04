import React from 'react';
import PropTypes from 'prop-types';
import StyledTextField from './StyledTextField';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.option.value ? this.props.option.value : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    // console.debug('@@@ change', prevProps, this.props);
    if (prevProps.option.value !== this.props.option.value) {
      this.setState({ value: this.props.option.value });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.debug('@@@ change', p)
  //   if (nextProps.noTwoBind !== true && nextProps.value !== this.props.option.value) {
  //     this.setState({ value: this.props.option.value });
  //   }
  // }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (
      <StyledTextField>
        <input type={this.props.type || 'text'} {...this.props.option} value={value} defaultValue={this.props.option.value} onChange={this.handleChange} />
      </StyledTextField>
    );
  }
}

TextField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

TextField.defaultProps = {
  id: '',
  name: '',
  type: '',
  placeholder: '',
};

export default TextField;

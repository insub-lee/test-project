import React from 'react';
import PropTypes from 'prop-types';
import StyledTextArea from './StyledTextArea';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.option.value !== '' ? this.props.option.value : undefined,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const text = this.props.option.value || '';
    return (
      <StyledTextArea>
        {!this.props.option.readOnly ? (
          <textarea
            className={this.props.option.classname}
            {...this.props.option}
            cols={this.props.option.cols}
            rows={this.props.option.rows}
            value={value}
            onChange={this.handleChange}
          />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: text.replace(/\n/g, '<br>'),
            }}
          />
        )}
      </StyledTextArea>
    );
  }
}

TextArea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
};

TextArea.defaultProps = {
  id: '',
  name: '',
  cols: '',
  rows: '',
  placeholder: '',
};

export default TextArea;

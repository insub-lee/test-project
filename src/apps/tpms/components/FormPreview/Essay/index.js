import React from 'react';
import PropTypes from 'prop-types';
import StyledTextArea from './StyledTextArea';

class Essay extends React.Component {
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
    const { surveyIndex } = this.props;
    return (
      <StyledTextArea>
        {!this.props.option.readOnly ? (
          <textarea
            {...this.props.option}
            cols={this.props.option.cols}
            rows={this.props.option.rows}
            name={`${surveyIndex}-essay_0`}
            value={value}
            onChange={this.handleChange}
            maxLength={200}
          />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: this.props.option.value.replace(/\n/g, '<br>'),
            }}
          />
        )}
      </StyledTextArea>
    );
  }
}

Essay.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  surveyIndex: PropTypes.number,
};

Essay.defaultProps = {
  id: '',
  name: '',
  cols: '',
  rows: '',
  placeholder: '',
  surveyIndex: -1,
};

export default Essay;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class searchWidget extends Component {
  state = {
    text: '',
  };

  handlerChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    const { onClick } = this.props;
    return (
      <div className="searchDiv">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={this.handlerChange}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              onClick(this.state.text);
            }
          }}
          value={this.state.text}
        ></input>
        <button
          type="button"
          onClick={() => {
            onClick(this.state.text);
          }}
        >
          검색
        </button>
      </div>
    );
  }
}
searchWidget.propTypes = {
  onClick: PropTypes.func,
};
export default searchWidget;

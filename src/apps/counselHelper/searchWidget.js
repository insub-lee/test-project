import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { InputSearch } from 'components/FormStuff/Input';

const { Search } = Input;
class searchWidget extends Component {
  state = {
    text: '',
  };

  handlerChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    const { onClick } = this.props;
    return (
      <div className="searchInput">
        <InputSearch
          placeholder="검색어를 입력해주세요"
          style={{ width: '100%' }}
          onChange={this.handlerChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onClick(this.state.text);
            }
          }}
          onSearch={() => {
            onClick(this.state.text);
          }}
        />
      </div>
    );
  }
}
searchWidget.propTypes = {
  onClick: PropTypes.func,
};
export default searchWidget;

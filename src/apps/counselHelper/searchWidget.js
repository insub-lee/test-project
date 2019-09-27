import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { InputSearch } from 'components/FormStuff/Input';

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
    const { onSearch, keyword } = this.props;
    console.debug('keyword in Search >>', keyword);
    return (
      <div className="searchInput">
        <InputSearch
          placeholder="검색어를 입력해주세요"
          defaultValue={keyword}
          style={{ width: '100%' }}
          onChange={this.handlerChange}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              onSearch(this.state.text);
            }
          }}
          onSearch={() => {
            onSearch(this.state.text);
          }}
        />
      </div>
    );
  }
}
searchWidget.propTypes = {
  onSearch: PropTypes.func,
  keyword: PropTypes.string,
};
export default searchWidget;

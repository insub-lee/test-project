import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Input } from 'antd';
import { InputSearch } from 'components/FormStuff/Input';

class searchWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {}

  handlerChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    const { onSearch, keyword } = this.props;
    const { text } = this.state;
    console.debug('keyword in search >> ', keyword);
    return (
      <div className="searchInput">
        <InputSearch
          placeholder="검색어를 입력해주세요"
          defaultValue={keyword}
          style={{ width: '100%' }}
          onChange={this.handlerChange}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              onSearch(text);
            }
          }}
          // onSearch={() => {
          //   onSearch(this.state.text);
          // }}
        />
      </div>
    );
  }
}
searchWidget.propTypes = {
  WIDGET_ID: PropTypes.string,
  onSearch: PropTypes.func,
  keyword: PropTypes.string,
  chageKeyword: PropTypes.func,
};
export default searchWidget;

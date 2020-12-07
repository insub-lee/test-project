import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      totalCount: 0,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { callbackAfterFetch } = this.props;
    this.fetchData().then(payload => {
      this.setState({ totalCount: payload.totalCount, list: payload.list }, () => callbackAfterFetch({ total: payload.totalCount }));
    });
  }

  async fetchData() {
    // Todo - Api....
    const payload = {
      totalCount: 5,
      list: [{ key: 1, name: 'apple' }, { key: 2, name: 'banana' }, { key: 3, name: 'pear' }, { key: 4, name: 'toast' }, { key: 5, name: 'toad' }],
    };
    return payload;
  }

  render() {
    const { list } = this.state;
    const { onClickTitle } = this.props;
    return (
      <ul className="sub_list">
        {list.map(item => (
          <li key={item.key}>
            <button type="button" onClick={() => onClickTitle(item.key)}>
              <span className="icon icon_douu_ck" /> {item.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

List.propTypes = {
  onClickTitle: PropTypes.func,
  callbackAfterFetch: PropTypes.func,
};

List.defaultProps = {
  onClickTitle: () => false,
  callbackAfterFetch: () => false,
};

export default List;

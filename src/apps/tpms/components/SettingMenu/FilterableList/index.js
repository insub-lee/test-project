import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Scrollbars from 'react-custom-scrollbars';

import StyledFilterableList from './StyledFilterableList';
import StyledButton from './StyledButton';

class FilterableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
    };
    this.handleFilterValue = debounce(this.handleFilterValue.bind(this), 300);
  }

  handleFilterValue(value) {
    this.setState({ filterValue: value });
  }

  render() {
    const { filterValue } = this.state;
    const { title, items } = this.props;
    const filteredItems = items.filter(item => item.text.toLowerCase().indexOf(filterValue.toLowerCase()) > -1);
    return (
      <StyledFilterableList className="menu_option">
        <div className="menu_option-title">
          {title}
          <div className="menu_option-title_search">
            <input type="text" placeholder="insert title" onChange={e => this.handleFilterValue(e.target.value)} />
            <button type="button">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
        <div style={{ margin: '0 26px' }}>
          <Scrollbars
            style={{ height: 100, border: '1px solid #4f5a66' }}
            autoHide
            renderThumbVertical={({ style, ...props }) => (
              <div
                style={{
                  ...style,
                  backgroundColor: 'rgba( 255, 255, 255, 0.5',
                  borderRadius: '3px',
                }}
                {...props}
              />
            )}
          >
            <ul className="menu_option-container">
              {filteredItems.map(item => (
                <li className="menu_option-item" key={item.key}>
                  <StyledButton type="button" className={`${item.isActive ? 'active' : ''}`} onClick={() => item.onClick()}>
                    <p className="text">{item.text}</p>
                  </StyledButton>
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
      </StyledFilterableList>
    );
  }
}

FilterableList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

FilterableList.defaultProps = {
  title: '',
  items: [],
};

export default FilterableList;

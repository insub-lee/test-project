import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const List = ({ list, onClickItem }) => (
  <ul>
    {list.map(item => (
      <li key={item.id}>
        <button type="button" onClick={() => onClickItem(item.id)}>
          <span className="txt">
            {item.isComments ? (
              <React.Fragment>
                <i className="fas fa-arrow-circle-right" />{' '}
              </React.Fragment>
            ) : null}
            {item.txt}
          </span>
          <span className="date">{moment(item.date).format('YYYY.MM.DD')}</span>
        </button>
      </li>
    ))}
  </ul>
);

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      txt: PropTypes.string,
      date: PropTypes.number,
      isComments: PropTypes.bool,
    }),
  ),
  onClickItem: PropTypes.func,
};

List.defaultProps = {
  list: [],
  onClickItem: () => false,
};

export default List;

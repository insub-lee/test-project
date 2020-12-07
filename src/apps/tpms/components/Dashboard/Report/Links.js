import React from 'react';
import PropTypes from 'prop-types';

const Links = ({ title, links }) => (
  <div className="main_banner_con">
    <dl>
      <dt>
        {title} <button type="button">+</button>
      </dt>
      <dd>
        <ul>
          {links.map(item => (
            <li key={item.id}>
              <button type="button">
                {item.board} ... <span className="date">{item.date}</span>
              </button>
            </li>
          ))}
        </ul>
      </dd>
    </dl>
  </div>
);

Links.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      board: PropTypes.string,
      date: PropTypes.string,
    }),
  ),
};

Links.defaultProps = {
  title: '',
  links: [],
};

export default Links;

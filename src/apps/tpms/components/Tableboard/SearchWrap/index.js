import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import StyledSearch from './StyledSearch';

class SearchWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formRef = React.createRef();

    this.handleChangeYear = this.handleChangeYear.bind(this);
  }

  handleChangeYear() {
    this.props.submit();
  }

  render() {
    const { categories, submit, complaneCategories, locationCategories, boardId } = this.props;
    const curYear = Number(moment().format('YYYY'));
    const endYear = 2018;
    const yearCategory = [];
    for (let i = curYear; i >= endYear; i -= 1) {
      yearCategory.push({ value: i, text: `${i}년` });
    }
    return (
      <StyledSearch>
        <form
          autoComplete="off"
          ref={this.formRef}
          className="page"
          name="form-name"
          onSubmit={e => {
            e.stopPropagation();
            e.preventDefault();
            submit();
          }}
        >
          {boardId === 'brd00000000000000007' ? (
            <select name="yearCategory" style={{ float: 'left' }} onChange={this.handleChangeYear}>
              {yearCategory.map(category => (
                <option key={category.text} value={category.value}>
                  {category.text}
                </option>
              ))}
            </select>
          ) : (
            ''
          )}

          {locationCategories && (
            <select name="locationCategories">
              {locationCategories.map(category => (
                <option key={category.text} value={category.value}>
                  {category.text}
                </option>
              ))}
            </select>
          )}
          {complaneCategories && (
            <select name="complaneCategories">
              {complaneCategories.map(category => (
                <option key={category.text} value={category.value}>
                  {category.text}
                </option>
              ))}
            </select>
          )}

          <select name="category">
            {categories.map(category => (
              <option key={category.text} value={category.value}>
                {category.text}
              </option>
            ))}
          </select>
          <input type="text" className="input" name="text" />
          <button type="submit" className="icon icon_search_white">
            검색
          </button>
        </form>
      </StyledSearch>
    );
  }
}

SearchWrap.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  complaneCategories: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  locationCategories: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  submit: PropTypes.func,
  boardId: PropTypes.string,
};

SearchWrap.defaultProps = {
  categories: [],
  submit: () => false,
  boardId: '',
};

export default SearchWrap;

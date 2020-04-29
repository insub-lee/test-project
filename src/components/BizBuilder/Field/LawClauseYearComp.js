import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
import StyledSelect from 'commonStyled/Form/StyledSelect';

import Moment from 'moment';

const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class LawClauseYearComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearArray: [],
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, changeFormData } = this.props;
    const startYear = 2005;
    const endYear = Number(Moment().format('YYYY')) + 1;
    const yearArray = [];
    for (let i = startYear; i <= endYear; i += 1) {
      yearArray.push(i);
    }
    this.setState({ yearArray });
    changeFormData(id, 'YEAR', Number(Moment().format('YYYY')));
  };

  onChangeHandler = value => {
    const { sagaKey: id, COMP_FIELD, changeFormData, yearSetFunc } = this.props;
    // const searchText = value ? `AND W.${COMP_FIELD} LIKE '%${value}%'` : '';
    // changeSearchData(id, COMP_FIELD, searchText);
    changeFormData(id, 'YEAR', value);
    yearSetFunc(value);
  };

  render = () => {
    const { visible, CONFIG } = this.props;
    const { yearArray } = this.state;
    return visible ? (
      <AntdSelect
        defaultValue={Number(Moment().format('YYYY'))}
        onChange={value => this.onChangeHandler(value)}
        style={{ width: '100%', marginRight: 10 }}
        className={CONFIG.property.className || ''}
      >
        {yearArray.map(year => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </AntdSelect>
    ) : (
      ''
    );
  };
}

LawClauseYearComp.propTypes = {
  CONFIG: PropTypes.any,
  visible: PropTypes.bool,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
};

export default LawClauseYearComp;

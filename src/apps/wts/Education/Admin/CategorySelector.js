import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';

class CategorySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        area: [],
        type: [],
        eduType: [],
      },
      selected: {
        type: '',
        area: '',
        eduType: '',
      },
    };
    this.submitData = this.submitData.bind(this);
    this.fetchCodes = this.fetchCodes.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  componentDidMount() {
    // this.fetchCodes();
    /* Todo - fetchCodeData */
    this.fetchCodes().then(({ area, type, eduType }) => {
      this.setState({ category: { area, type, eduType } });
    });
  }

  async fetchCodes() {
    const area = [
      { key: '청주', label: '청주' },
      { key: '구미', label: '구미' },
    ];
    const type = [
      { key: '00', label: '교육이력 관리' },
      { key: '01', label: '신입/전배 사원 교육 과린' },
      { key: '02', label: '집체교육관리' },
    ];
    const eduType = [
      { key: '00', label: '직무능력평가' },
      { key: '01', label: '직무능력평가(MASK)' },
      { key: '02', label: '직무능력평가(계측기)' },
      { key: '03', label: 'Handling평가표' },
      { key: '04', label: '공정교육' },
      { key: '05', label: '청정도교육' },
    ];
    return { area, type, eduType };
  }

  submitData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    const { actions } = this.props;
    actions.submit(payload);
  }

  handleChangeSelect(e, target) {
    const { value } = e.target;
    this.setState(prevState => {
      const { selected } = prevState;
      selected[target] = value;
      return {
        selected,
      };
    });
  }

  render() {
    const { category, selected } = this.state;
    const { type } = selected;
    return (
      <>
        <StyledCommonForm onSubmit={this.submitData} autoComplete="off">
          <ul className="sub_form small2">
            <li className="half fl sel">
              <label className="title" htmlFor="category1">
                지역
              </label>
              <select name="area" defaultValue="" onChange={e => this.handleChangeSelect(e, 'area')}>
                <option value="" disabled>
                  지역을 선택해주세요.
                </option>
                {category.area.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </li>
            <li className="half fr sel">
              <label className="title" htmlFor="fab-selector">
                관리종류
              </label>
              <select name="type" defaultValue="" onChange={e => this.handleChangeSelect(e, 'type')}>
                <option value="" disabled>
                  관리요소를 선택해주세요.
                </option>
                {category.type.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </li>
            {type === '00' && (
              <li className="half fl sel">
                <label className="title" htmlFor="fab-selector">
                  교육종류
                </label>
                <select name="eduType" defaultValue="" onChange={e => this.handleChangeSelect(e, 'eduType')}>
                  <option value="" disabled>
                    교육종류를 선택해주세요.
                  </option>
                  {category.eduType.map(({ key, label }) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </li>
            )}
          </ul>
          <div className="cr" />
          <div className="btn_wrap">
            <Button type="submit" size="big" color="primary">
              검색
            </Button>
          </div>
        </StyledCommonForm>
      </>
    );
  }
}

CategorySelector.propTypes = {
  actions: PropTypes.shape({
    submit: PropTypes.func,
  }),
};

CategorySelector.defaultProps = {
  actions: {
    submit: () => false,
  },
};

export default CategorySelector;

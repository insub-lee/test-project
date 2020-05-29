import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import moment from 'moment';
import styledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdSelect = styledSelect(Select);
class SelectMonthComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthArr: [],
    };
  }

  componentDidMount() {
    this.setMonthArr();
  }

  setMonthArr = () => {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return months.map(item => this.setState(prevState => ({ monthArr: prevState.monthArr.concat({ value: item, name: moment(item, 'M').format('MMMM') }) })));
  };

  handleOnChange = value => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    changeFormData(id, COMP_FIELD, value);
  };

  handleOnSearch = value => {
    const { sagaKey: id, changeSearchData, COMP_FIELD } = this.props;
    const searchMonth = `AND W.${COMP_FIELD} ILIKE ${value}::VARCHAR`;
    changeSearchData(id, COMP_FIELD, searchMonth);
  };

  render() {
    const { handleOnChange, handleOnSearch } = this;
    const { monthArr } = this.state;
    const { visible, viewPageData, colData, CONFIG, isSearch } = this.props;
    if (!visible) {
      return null;
    }

    if (isSearch) {
      return (
        <>
          <AntdSelect style={{ width: '100%' }} onChange={handleOnSearch}>
            {monthArr.map(item => (
              <Select.Option value={item.value || ''}>{item.name || ''}</Select.Option>
            ))}
            <Select.Option value="">전체</Select.Option>
          </AntdSelect>
        </>
      );
    }

    switch (viewPageData.viewType.toUpperCase()) {
      case 'INPUT':
        return (
          <>
            <AntdSelect style={{ width: '100%' }} onChange={handleOnChange}>
              {monthArr.map(item => (
                <Select.Option value={item.value || ''}>{item.name || ''}</Select.Option>
              ))}
            </AntdSelect>
          </>
        );

      case 'MODIFY':
        return (
          <>
            <AntdSelect value={moment(colData, 'M').format('MMMM')} onChange={handleOnChange} style={{ width: '100%' }}>
              {monthArr.map(item => (
                <Select.Option value={item.value || ''}>{item.name || ''}</Select.Option>
              ))}
            </AntdSelect>
          </>
        );

      case 'LIST':
        return <span className={CONFIG.property.className || ''}>{moment(colData, 'M').format('MMMM') || ''}</span>;

      case 'VIEW':
        return <span className={CONFIG.property.className || ''}>{moment(colData, 'M').format('MMMM') || ''}</span>;

      default:
        return null;
    }
  }
}

SelectMonthComp.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  COMP_FIELD: PropTypes.string,
  viewPageData: PropTypes.object,
  visible: PropTypes.bool,
  colData: PropTypes.string,
  CONFIG: PropTypes.object,
  isSearch: PropTypes.bool,
  changeSearchData: PropTypes.func,
};

export default SelectMonthComp;

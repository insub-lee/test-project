import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Select, message } from 'antd';
import { debounce } from 'lodash';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const { Option } = Select;

class CustomSelectSearchComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: '',
      searchText: '',
      selectList: [],
    };
    this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  componentDidMount() {
    const compData = (this.props && this.props.CONFIG && this.props.CONFIG.property && this.props.CONFIG.property.compData) || [];

    if (0 in compData) {
      this.setInit(compData);
    }
  }

  setInit = compData => {
    this.setState({
      selectList: compData
        .filter(c => eval(c.selected))
        .map(s => (s.FIELD_TYPE === 'USER' || s.FIELD_TYPE === 'SYS' ? { ...s, COMP_FIELD: `W.${s.COMP_FIELD}` } : s)),
    });
  };

  // custom search 예제
  handleOnChangeSearch = () => {
    const {
      sagaKey,
      COMP_FIELD,
      changeSearchData,
      CONFIG: {
        property: { searchCondition },
      },
    } = this.props;
    const { searchType, searchText } = this.state;

    let result = '';

    if (searchCondition === 'LIKE') {
      result = searchText.length > 0 ? `AND ${searchType}::VARCHAR ${searchCondition} '%${searchText}%'` : '';
    } else {
      result = searchText.length > 0 ? `AND ${searchType}::VARCHAR ${searchCondition} '${searchText}'` : '';
    }

    changeSearchData(sagaKey, COMP_FIELD, result);
  };

  handleOnChange = (target, value) => {
    this.setState({ [target]: value }, this.handleOnChangeSearch);
  };

  render() {
    const {
      CONFIG,
      readOnly,
      CONFIG: {
        property: { placeholder },
      },
    } = this.props;
    const { searchType, searchText, selectList } = this.state;
    return (
      <>
        <AntdSelect
          placeholder={placeholder || '검색구분'}
          style={{ width: '100px' }}
          onChange={value => {
            this.handleOnChange('searchType', value);
          }}
          disabled={readOnly || CONFIG.property.readOnly}
          className="select-sm"
        >
          {selectList.map(item => (
            <Option key={`select_${item.COMP_FIELD}`} value={`${item.COMP_FIELD}`}>
              {item.NAME_KOR}
            </Option>
          ))}
        </AntdSelect>
        <AntdInput
          style={{ width: '100px', marginLeft: '5px' }}
          readOnly={!searchType}
          placeholder="검색어"
          onChange={e => this.handleOnChange('searchText', e.target.value)}
          className="ant-input-sm mr5 ant-input-block"
        />
      </>
    );
  }
}

CustomSelectSearchComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.string,
  CONFIG: PropTypes.any,
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default CustomSelectSearchComp;

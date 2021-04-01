import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Select } from 'antd';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdSelect = StyledSelect(Select);

const { Option } = Select;

// 선택된 레벨, 부모값이 일치하는 배열리턴
const getMenu = (prntCd, lvl, flatData) => {
  const list = flatData || [];
  const result = list
    .filter(item => {
      if (lvl === 1) {
        if (item.CODE === 'M000') {
          return false;
        }
      }
      if (item.PRNT_CD === prntCd) {
        return true;
      }
      return false;
    })
    .map(item => ({
      title: item.CD_NAME,
      value: item.CODE,
      key: item.CODE,
      parentValue: item.PRNT_CD,
      selectable: true,
    }));
  return result;
};

class WorkStepInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Menu
      lvl1: [],
      lvl2: [],
      lvl3: [],
    };
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    const { record: prevRecord } = prevProps;
    const { lvl, record } = this.props;
    if (lvl > 1) {
      const prevPrntCD = prevRecord[`SELECTED${lvl - 1}`];
      const nextPrntCD = record[`SELECTED${lvl - 1}`];
      if (prevPrntCD !== nextPrntCD) {
        this.init();
      }
    }
  }

  init = () => {
    const { lvl, modalMenu, record } = this.props;
    const { SELECTED1, SELECTED2 } = record;
    let prntCd = '';
    switch (lvl) {
      case 1:
        prntCd = 'M000';
        break;
      case 2:
        prntCd = SELECTED1;
        break;
      case 3:
        prntCd = SELECTED2;
        break;
      default:
        break;
    }
    // 개별메뉴 초기화
    this.setState({
      [`lvl${lvl}`]: getMenu(prntCd, lvl, modalMenu),
    });
  };

  // 메뉴트리 변경시 재조회
  onChangeSelect = value => {
    const { lvl, record, onChange } = this.props;
    if (typeof onChange === 'function') {
      const nextRecord = {
        ...record,
        [`SELECTED${lvl}`]: value,
        [`SELECTED${lvl + 1}`]: '',
      };
      onChange(nextRecord);
    }
  };

  render() {
    const { lvl, record } = this.props;
    const { SELECTED1, SELECTED2, SELECTED3 } = record;
    const { lvl1, lvl2, lvl3 } = this.state;
    switch (lvl) {
      case 1:
        return (
          <AntdSelect
            className="select-sm mr5"
            style={{ width: '180px' }}
            onChange={value => this.onChangeSelect(value)}
            value={SELECTED1}
          >
            <Option value="M000">-------</Option>
            {lvl1.map(item => (
              <Option key={uuid()} value={item.value}>
                {item.title}
              </Option>
            ))}
          </AntdSelect>
        );
      case 2:
        return (
          <AntdSelect
            className="select-sm mr5"
            style={{ width: '180px' }}
            onChange={value => this.onChangeSelect(value)}
            value={SELECTED1 === 'M000' ? '' : SELECTED2}
            disabled={SELECTED1 === 'M000'}
          >
            <Option value="">-------</Option>
            {lvl2.map(item => (
              <Option key={uuid()} value={item.value}>
                {item.title}
              </Option>
            ))}
          </AntdSelect>
        );
      case 3:
        return (
          <AntdSelect
            className="select-sm mr5"
            style={{ width: '180px' }}
            onChange={value => this.onChangeSelect(value)}
            value={SELECTED1 === 'M000' || SELECTED2 === '' ? '' : SELECTED3}
            disabled={SELECTED1 === 'M000' || SELECTED2 === ''}
          >
            <Option value="">-------</Option>
            {lvl3.map(item => (
              <Option key={uuid()} value={item.value}>
                {item.title}
              </Option>
            ))}
          </AntdSelect>
        );
      default:
        return '';
    }
  }
}

WorkStepInput.propTypes = {
  lvl: PropTypes.number,
  record: PropTypes.object,
  modalMenu: PropTypes.array,
  onChange: PropTypes.func,
};

WorkStepInput.defaultProps = {};

export default WorkStepInput;

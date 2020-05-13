import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Iframe from 'apps/eshs/Jasper/common/Iframe';

import moment from 'moment';

const AntdSelect = StyledSelect(Select);
const { Option } = Select;

moment.locale('ko');

// 용폐수 일지 개발완료후에 다시 만들기
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'groupUnitCd', '매그너칩 반도체');
    changeFormData(id, 'condVal', moment().format('YYYY-MM-DD'));
  }

  chagneSelect = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  dateChange = condVal => {
    this.setState({ condVal });
  };

  isSearch = () => {
    const { groupUnitCd, condVal } = this.state;
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'groupUnitCd', groupUnitCd);
    changeFormData(id, 'condVal', condVal);
  };

  render() {
    const { formData } = this.props;

    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <AntdSelect className="select-mid mr5" onChange={(value, option) => this.chagneSelect(value, option)} value={this.state.seq}>
            <Option value="017" key="groupUnitCd">
              [017] 매그너칩 반도체
            </Option>
          </AntdSelect>
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            <DatePicker defaultValue={moment(moment(), 'YYYY-MM-DD')} format="YYYY-MM-DD" onChange={(date, dateStrings) => this.dateChange(dateStrings)} />
          </div>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <StyledHtmlTable className="tableWrapper">
          <Iframe title="용폐수 일지" src={`groupUnitCd=${formData.groupUnitCd}&condVal=${formData.condVal}`} />
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
};

List.defaultProps = {};

export default List;

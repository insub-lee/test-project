import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import Iframe from 'apps/eshs/Jasper/common/Iframe';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import moment from 'moment';

const AntdSelect = StyledSelect(Select);
const { Option } = Select;
const { RangePicker } = DatePicker;

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStrings: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'site',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    const siteList = result && result.site && result.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y');
    this.setState({ siteList, site: '716' });
  };

  dateChange = dateStrings => {
    this.setState({ dateStrings });
  };

  isSearch = () => {
    const { dateStrings, site } = this.state;
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'condVal', `site = ${site} AND takeout_dt BETWEEN ${dateStrings[0]} AND ${dateStrings[0]}`);
  };

  render() {
    const { siteList, site } = this.state;
    const { formData } = this.props;
    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <AntdSelect className="select-mid mr5" style={{ width: 150 }} name="site" onChange={value => this.chagneSelect('site', value)} value={site}>
            {siteList && siteList.map(item => <Option value={String(item.NODE_ID)}>{item.NAME_KOR}</Option>)}
          </AntdSelect>
          <span className="testLabel">기간</span>
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            <RangePicker
              defaultValue={[moment(moment(), 'YYYY-MM-DD'), moment(moment(), 'YYYY-MM-DD')]}
              format={['YYYY-MM-DD', 'YYYY-MM-DD']}
              onChange={(date, dateStrings) => this.dateChange(dateStrings)}
            />
          </div>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <Iframe title="월별 실적 현황" src={`condVal=${formData.condVal}`} />
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  formData: PropTypes.object,
  result: PropTypes.object,
};

List.defaultProps = {};

export default List;

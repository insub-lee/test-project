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
const { RangePicker } = DatePicker;

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeDate: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
      logDt: moment().format('YYYY-MM-DD'),
      gubun: '1',
    };
  }

  componentDidMount() {
    const { sagaKey: id, changeFormData, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'site',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=65',
        type: 'GET',
      },
      { key: 'vendorList', url: `/api/eshs/v1/common/eshsBuilderCustomSearch/${401}`, type: 'POST' },
    ];
    getCallDataHandler(id, apiAry, this.initData);
    changeFormData(id, 'condVal', moment().format('YYYY-MM-DD'));
    changeFormData(id, 'site', '716');
  }

  initData = () => {
    const { result } = this.props;
    const siteList = result && result.site && result.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y');
    const vendorList = result && result.vendorList && result.vendorList && result.vendorList.list;
    this.setState({ siteList, vendorList, vender: vendorList[0].WRK_CMPNY_CD, site: '716' });
  };

  chagneSelect = (name, value) => {
    this.setState({ [name]: value });
  };

  isSearch = () => {
    const { logDt, gubun, vender, rangeDate, site } = this.state;
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'logDt', logDt);
    changeFormData(id, 'gubun', gubun);
    changeFormData(id, 'vender', vender);
    changeFormData(id, 'condVal', `and site= '${site}' and takeout_dt >= '${rangeDate[0]}' and takeout_dt <= '${rangeDate[1]}'`);
  };

  render() {
    const { formData } = this.props;
    const { siteList, vendorList, site, gubun, vender } = this.state;
    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">지역</span>
          <AntdSelect className="select-mid mr5" style={{ width: 150 }} name="site" onChange={value => this.chagneSelect('site', value)} value={site}>
            {siteList && siteList.map(item => <Option value={String(item.NODE_ID)}>{item.NAME_KOR}</Option>)}
          </AntdSelect>
          <span className="textLabel">기간</span>
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            <RangePicker
              defaultValue={[moment(moment(), 'YYYY-MM-DD'), moment(moment(), 'YYYY-MM-DD')]}
              format={['YYYY-MM-DD', 'YYYY-MM-DD']}
              onChange={(date, dateStrings) => this.chagneSelect('rangeDate', dateStrings)}
            />
          </div>
          <span className="textLabel">출력일</span>
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            <DatePicker
              defaultValue={moment(moment(), 'YYYY-MM-DD')}
              format="YYYY-MM-DD"
              onChange={(date, dateStrings) => this.chagneSelect('logDt', dateStrings)}
            />
          </div>
          <AntdSelect className="select-mid mr5" style={{ width: 150 }} name="gubun" onChange={value => this.chagneSelect('gubun', value)} value={gubun}>
            <Option value="1">공급자용</Option>
            <Option value="0">공급받는자용</Option>
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
          <AntdSelect className="select-mid mr5" style={{ width: 300 }} name="vender" onChange={value => this.chagneSelect('vender', value)} value={vender}>
            {vendorList && vendorList.map(item => <Option value={String(item.WRK_CMPNY_CD)}>{item.WRK_CMPNY_NM}</Option>)}
          </AntdSelect>
        </div>
        <Iframe title="거래 명세표" src={`logDt=${formData.logDt}&gubun=${formData.gubun}&vender=${formData.vender}&condVal=${formData.condVal}`} />
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  result: PropTypes.object,
};

List.defaultProps = {};

export default List;

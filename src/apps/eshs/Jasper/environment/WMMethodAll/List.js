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
      site: '716',
      wasteKind: '4577',
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
      {
        key: 'wasteKind',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=47',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result, sagaKey: id, changeFormData } = this.props;
    const siteList = result && result.site && result.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y');
    const wasteKindList =
      result && result.wasteKind && result.wasteKind.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 490 && f.USE_YN === 'Y');
    this.setState({ siteList, wasteKindList });
    changeFormData(id, 'fromDt', moment().format('YYYY-MM-DD'));
    changeFormData(id, 'toDt', moment().format('YYYY-MM-DD'));
    changeFormData(id, 'site', '716');
    changeFormData(id, 'wasteKind', '4577');
  };

  chagneSelect = (name, value) => {
    this.setState({ [name]: value });
    console.debug('name, value', name, value);
    console.debug('type', typeof value);
  };

  isSearch = () => {
    const { wasteKind, rangeDate, site } = this.state;
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'fromDt', rangeDate[0]);
    changeFormData(id, 'toDt', rangeDate[1]);
    changeFormData(id, 'site', site);
    changeFormData(id, 'wasteKind', wasteKind);
    changeFormData(id, 'condVal', '');
  };

  render() {
    const { formData } = this.props;
    const { siteList, wasteKindList, site, wasteKind } = this.state;
    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <AntdSelect className="select-mid mr5" style={{ width: 150 }} name="site" onChange={value => this.chagneSelect('site', value)} value={site}>
            {siteList && siteList.map(item => <Option value={String(item.NODE_ID)}>{item.NAME_KOR}</Option>)}
          </AntdSelect>
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            <RangePicker
              defaultValue={[moment(moment(), 'YYYY-MM-DD'), moment(moment(), 'YYYY-MM-DD')]}
              format={['YYYY-MM-DD', 'YYYY-MM-DD']}
              onChange={(date, dateStrings) => this.chagneSelect('rangeDate', dateStrings)}
            />
          </div>
          <AntdSelect
            className="select-mid mr5"
            style={{ width: 300 }}
            name="wasteKind"
            onChange={value => this.chagneSelect('wasteKind', value)}
            value={wasteKind}
          >
            {wasteKindList && wasteKindList.map(item => <Option value={String(item.NODE_ID)}>{item.NAME_KOR}</Option>)}
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <Iframe
          title="폐기물 관리 대장"
          src={`fromDt=${formData.fromDt}&toDt=${formData.toDt}&site=${formData.site}&wasteKind=${formData.wasteKind}&condVal=${formData.condVal}&company=${1}`}
        />
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

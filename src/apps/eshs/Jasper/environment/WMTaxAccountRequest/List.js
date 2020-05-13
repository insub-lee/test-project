import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'containers/common/Auth/selectors';

import { Select, message } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Iframe from 'apps/eshs/Jasper/common/Iframe';
import EshsCmpnyComp from 'apps/eshs/Jasper/environment/WMTaxAccountRequest/Modal';

import moment from 'moment';

const AntdSelect = StyledSelect(Select);
const { Option } = Select;

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: '716',
      selectedDate: moment().format('YYYY-MM'),
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
    ];
    getCallDataHandler(id, apiAry, this.initData);
    changeFormData(id, 'selectedDate', moment().format('YYYY-MM'));
    changeFormData(id, 'site', '716');
  }

  initData = () => {
    const { result } = this.props;
    const siteList = result && result.site && result.site.categoryMapList.filter(f => f.LVL === 3 && f.PARENT_NODE_ID === 635 && f.USE_YN === 'Y');
    const year = Number(moment().format('YYYY'));
    const fixMonth = Number(moment().format('MM'));
    const datePriod = [];
    for (let i = fixMonth + 1; i <= 12; i += 1) {
      datePriod.push({ value: `${year - 1}-${String(i).padStart(2, '0')}`, view: `${year - 1}년 ${String(i).padStart(2, '0')}월` });
    }
    for (let i = 1; i <= fixMonth; i += 1) {
      datePriod.push({ value: `${year}-${String(i).padStart(2, '0')}`, view: `${year}년 ${String(i).padStart(2, '0')}월` });
    }
    this.setState({ siteList, datePriod });
  };

  chagneSelect = (name, value) => {
    this.setState({ [name]: value });
  };

  isSearch = () => {
    const { selectedDate, site } = this.state;
    const { sagaKey: id, changeFormData, profile, formData } = this.props;
    const endOfDate = moment(selectedDate)
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');
    const endOfDateSplit = endOfDate.split('-');
    if (formData) {
      changeFormData(id, 'site', site); // 지역
      changeFormData(id, 'condVal', `and site= '${site}' and takeout_dt between '${selectedDate}-01' and  '${endOfDate}'`); // 지역 및 기간
      changeFormData(id, 'startDt', `${endOfDateSplit[0]}년 ${endOfDateSplit[1]}월 ${endOfDateSplit[3]}일`); // 요청일자
      changeFormData(id, 'requestDept', profile.DEPT_NAME_KOR); // 요청부서
      changeFormData(id, 'officer', profile.NAME_KOR); // 요청자
    } else {
      message.warning('거래처를 선택해주세요');
    }
  };

  render() {
    const { sagaKey: id, formData, changeFormData, result, getCallDataHandler } = this.props;
    const { siteList, datePriod, site, selectedDate } = this.state;
    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">지역</span>
          <AntdSelect className="select-mid mr5" style={{ width: 150 }} name="site" onChange={value => this.chagneSelect('site', value)} value={site}>
            {siteList && siteList.map(item => <Option value={String(item.NODE_ID)}>{item.NAME_KOR}</Option>)}
          </AntdSelect>
          <span className="textLabel">거래처 검색</span>
          <EshsCmpnyComp changeFormData={changeFormData} sagaKey={id} result={result} getCallDataHandler={getCallDataHandler} formData={formData} />
          <span className="textLabel">기간 선택</span>
          <AntdSelect
            className="select-mid mr5"
            style={{ width: 200 }}
            name="selectedDate"
            onChange={value => this.chagneSelect('selectedDate', value)}
            value={selectedDate}
          >
            {datePriod && datePriod.map(item => <Option value={item.value}>{item.view}</Option>)}
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <Iframe
          title="세금계산서 발행 요청"
          src={`site=${formData.site}&vender=${formData.vender}&condVal=${formData.condVal}&startDt=${formData.startDt}&requestDept=${formData.requestDept}&officer=${formData.officer}`}
        />
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  result: PropTypes.object,
  profile: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

List.defaultProps = {};

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(List);

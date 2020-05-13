// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// // import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
// import StyledContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
// class List extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <StyledContentsWrapper>
//         <div className="selSaveWrapper">
//           test
//           <iframe
//             style={{ width: '100%' }}
//             title="test"
//             src="http://192.168.251.11:4488/jasperserver-pro/dashboard/viewer.html?j_username=jasperuser&j_password=jasperuser&sdd=20190511&edd=20200511&stdd=20200511&sdd1=20190511&edd1=20200511&stdd1=20200511&userid1=140376&sdd2=20190511&edd2=20200511&stdd2=20200511&userid2=140376&sdd3=20190511&edd3=20200511&stdd3=20200511&userid3=140376&viewAsDashboardFrame=true#/public/Samples/Dashboards/RecordReports_1"
//           ></iframe>
//         </div>
//       </StyledContentsWrapper>
//     );
//   }
// }

// List.propTypes = {};

// List.defaultProps = {
//   getCallDataHandler: () => {},
// };

// export default List;
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
    this.state = { pageGubun: '주요실적' };
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

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  isSearch = () => {
    const { dateStrings, site } = this.state;
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'condVal', `where site=${site} AND takeout_dt BETWEEN ${dateStrings[0]} AND ${dateStrings[1]}`);
  };

  pageChange = () => {
    const { formData } = this.props;
    const { pageGubun } = this.state;
    let page;
    switch (pageGubun) {
      case '처리방법별실적현황':
        page = <Iframe title="처리방법별실적현황" src={`condVal=${formData.condVal}`} />;
        break;
      case '종류별실적현황':
        page = <Iframe title="종류별실적현황" src={`condVal=${formData.condVal}`} />;
        break;
      case '처리금액':
        page = <Iframe title="종류별실적현황" src={`condVal=${formData.condVal}`} />;
        break;
      default:
        page = <Iframe title="주요실적" src={`condVal=${formData.condVal}`} />;
        break;
    }
    return page;
  };

  render() {
    const { siteList, site, pageGubun } = this.state;
    return (
      <StyledContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <AntdSelect className="select-mid mr5" style={{ width: 150 }} name="site" onChange={value => this.onChange('site', value)} value={site}>
            {siteList && siteList.map(item => <Option value={String(item.NODE_ID)}>{item.NAME_KOR}</Option>)}
          </AntdSelect>
          <span className="textLabel">기간</span>
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            <RangePicker
              defaultValue={[moment(moment(), 'YYYY-MM-DD'), moment(moment(), 'YYYY-MM-DD')]}
              format={['YYYY-MM-DD', 'YYYY-MM-DD']}
              onChange={(date, dateStrings) => this.onChange('dateStrings', dateStrings)}
            />
          </div>
          <span className="textLabel">구분</span>
          <AntdSelect className="select-mid mr5" name="pageGubun" onChange={value => this.onChange('pageGubun', value)} defaultValue={pageGubun}>
            <Option value="주요실적">주요실적</Option>
            <Option value="처리방법별실적현황">처리방법별 실적</Option>
            <Option value="종류별실적현황">폐기물종류별 발생량 및 재활용율</Option>
            <Option value="처리금액">폐기물종류별 처리금액</Option>
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={() => this.isSearch()}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        {this.pageChange()}
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  result: PropTypes.object,
};

List.defaultProps = {};

export default List;

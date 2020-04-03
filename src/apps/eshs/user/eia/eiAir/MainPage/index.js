/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Input } from 'antd';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import { createStructuredSelector } from 'reselect';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
// import ItemTable from 'apps/eshs/user/eia/eiItemTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import * as selectors from '../../../../../../containers/common/Auth/selectors';
import DeptSearchBar from '../../eiDeptSearchBar';

import ItemTable from '../ItemTable';

const AntdInput = StyledInput(Input);
const columnTitles = ['EI_AREA', 'PREVENTION_EQUIP', 'INFLOW_AREA', 'DISCHARGE_MATTER', 'PPM_WARNING', 'PPM_SHOTDOWN', 'PPM_YEAR_AVERAGE', 'W1', 'LEGISLATION'];
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // columns: itemData => [
      //   {
      //     title: (
      //       <div className="selSaveWrapper">
      //         {columnTitles.map((data, index) => (
      //           <AntdInput
      //             key={index}
      //             className="ant-input-inline mr5"
      //             style={{ width: '10%' }}
      //             name={data}
      //             value={(itemData && itemData[data]) || ''}
      //             onChange={this.handleInputOnChange}
      //           />
      //         ))}
      //       </div>
      //     ),
      //     children: [
      //       {
      //         title: 'Area',
      //         dataIndex: 'EI_AREA',
      //         align: 'center',
      //       },
      //       {
      //         title: '방지시설',
      //         dataIndex: 'PREVENTION_EQUIP',
      //         align: 'center',
      //       },
      //       {
      //         title: (
      //           <span>
      //             오염물질
      //             <br />
      //             유입Area
      //           </span>
      //         ),
      //         dataIndex: 'INFLOW_AREA',
      //         align: 'center',
      //       },
      //       {
      //         title: '배출물질명',
      //         dataIndex: 'DISCHARGE_MATTER',
      //         align: 'center',
      //       },
      //       {
      //         title: '관리기준',
      //         children: [
      //           {
      //             title: (
      //               <span>
      //                 자체기준$
      //                 <br />
      //                 (Warning)
      //               </span>
      //             ),
      //             dataIndex: 'PPM_WARNING',
      //             align: 'center',
      //           },
      //           {
      //             title: (
      //               <span>
      //                 법적기준$
      //                 <br />
      //                 (Shot Down)
      //               </span>
      //             ),
      //             dataIndex: 'PPM_SHOTDOWN',
      //             align: 'center',
      //           },
      //         ],
      //       },
      //       {
      //         title: (
      //           <span>
      //             배출농도$
      //             <br />
      //             (ppm/년평균)
      //           </span>
      //         ),
      //         dataIndex: 'PPM_YEAR_AVERAGE',
      //         align: 'center',
      //       },
      //       {
      //         title: '환경영향수준',
      //         children: [
      //           {
      //             title: 'W1',
      //             dataIndex: 'W1',
      //             align: 'center',
      //           },
      //           {
      //             title: '법규',
      //             dataIndex: 'LEGISLATION',
      //             align: 'center',
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    };
  }

  // validationCheck = itemData => {
  //   if (!itemData.EI_AREA) return '지역명을 입력해주세요.';
  //   if (!itemData.PREVENTION_EQUIP) return '방지시설을 입력해주세요.';
  //   if (!itemData.INFLOW_AREA) return '오영물질 유입 Area를 입력해주세요.';
  //   if (!itemData.DISCHARGE_MATTER) return '배출물질명을 입력해주세요.';
  //   if (!itemData.PPM_WARNING) return '관리기준(자체기준)을 입력해 주세요.';
  //   if (!itemData.PPM_SHOTDOWN) return '관리기준(법적기준)을 입력해 주세요.';
  //   if (!itemData.PPM_YEAR_AVERAGE) return '배출 농도를 입력해주세요.';
  //   if (!itemData.W1) return 'W1을 입력해주세요.';
  //   if (!itemData.LEGISLATION) return '법규를 입력해주세요.';
  //   return '';
  // };

  // overLapCheck = (itemList, itemData) => {
  //   let is_ok = true;
  //   itemList.forEach(i => {
  //     if (i.CHK_YEAR === itemData.CHK_YEAR)
  //       if (i.DEPT_CD === itemData.DEPT_CD)
  //         if (i.EI_AREA === itemData.EI_AREA)
  //           if (i.PREVENTION_EQUIP === itemData.PREVENTION_EQUIP)
  //             if (i.INFLOW_AREA === itemData.INFLOW_AREA)
  //               if (i.DISCHARGE_MATTER === itemData.DISCHARGE_MATTER)
  //                 if (i.PPM_WARNING === itemData.PPM_WARNING)
  //                   if (i.PPM_SHOTDOWN === itemData.PPM_SHOTDOWN)
  //                     if (i.PPM_YEAR_AVERAGE === itemData.PPM_YEAR_AVERAGE) if (i.W1 === itemData.W1) if (i.LEGISLATION === itemData.LEGISLATION) is_ok = false;
  //   });
  //   return is_ok;
  // };

  // handleInputOnChange = e => {
  //   const { id, changeFormData, formData } = this.props;
  //   const itemData = (formData && formData.itemData) || {};
  //   changeFormData(id, 'itemData', { ...itemData, [e.target.name]: e.target.value });
  // };

  // handleInitColumns = () => {
  //   const { formData } = this.props;
  //   const itemData = (formData && formData.itemData) || {};
  //   this.setState({
  //     columns: [
  //       {
  //         title: (
  //           <>
  //             <AntdInput name="EI_AREA" value={itemData.EI_AREA || ''} onChange={this.handleInputOnChange} />
  //             <AntdInput name="PREVENTION_EQUIP" value={itemData.PREVENTION_EQUIP || ''} onChange={this.handleInputOnChange} />
  //             <AntdInput name="INFLOW_AREA" value={itemData.INFLOW_AREA || ''} onChange={this.handleInputOnChange} />
  //             <AntdInput name="DISCHARGE_MATTER" value={itemData.DISCHARGE_MATTER || ''} onChange={this.handleInputOnChange} />
  //             <AntdInput name="PPM_WARNING" value={itemData.PPM_WARNING || ''} onChange={this.handleInputOnChange} />
  //             <AntdInput name="PPM_SHOTDOWN" value={itemData.PPM_SHOTDOWN || ''} onChange={this.handleInputOnChange} />
  //             <AntdInput name="PPM_YEAR_AVERAGE" value={itemData.PPM_YEAR_AVERAGE || ''} onChange={this.handleInputOnChange} />
  //             <AntdInput name="W1" value={itemData.W1 || ''} onChange={this.handleInputOnChange} />
  //             <AntdInput name="LEGISLATION" value={itemData.LEGISLATION || ''} onChange={this.handleInputOnChange} />
  //           </>
  //         ),
  //         children: [
  //           {
  //             title: 'Area',
  //             dataIndex: 'EI_AREA',
  //             align: 'center',
  //           },
  //           {
  //             title: '방지시설',
  //             dataIndex: 'PREVENTION_EQUIP',
  //             align: 'center',
  //           },
  //           {
  //             title: <span>오염물질${(<br />)}유입Area`,
  //             dataIndex: 'INFLOW_AREA',
  //             align: 'center',
  //           },
  //           {
  //             title: '배출물질명',
  //             dataIndex: 'DISCHARGE_MATTER',
  //             align: 'center',
  //           },
  //           {
  //             title: '관리기준',
  //             children: [
  //               {
  //                 title: `자체기준${(<br />)}(Warning)`,
  //                 dataIndex: 'PPM_WARNING',
  //                 align: 'center',
  //               },
  //               {
  //                 title: `법적기준${(<br />)}(Shot Down)`,
  //                 dataIndex: 'PPM_SHOTDOWN',
  //                 align: 'center',
  //               },
  //             ],
  //           },
  //           {
  //             title: `배출농도${(<br />)}(ppm/년평균)`,
  //             dataIndex: 'PPM_YEAR_AVERAGE',
  //             align: 'center',
  //           },
  //           {
  //             title: '환경영향수준',
  //             children: [
  //               {
  //                 title: 'W1',
  //                 dataIndex: 'W1',
  //                 align: 'center',
  //               },
  //               {
  //                 title: '법규',
  //                 dataIndex: 'LEGISLATION',
  //                 align: 'center',
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // };

  handleSearchOnClick = () => {
    const { sagaKey: id, getCallDataHandler, formData } = this.props;
    const chk_year = (formData && formData.CHK_YEAR) || '0';
    const dept_cd = (formData && formData.searchRow && formData.searchRow.DEPT_CD) || (formData && formData.myDept && formData.myDept.DEPT_CD) || '0';
    const apiAry = [
      {
        key: 'itemList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsEiAirList/${chk_year}/${dept_cd}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.handleSetItemList);
  };

  handleSetItemList = () => {
    const { sagaKey: id, result, changeFormData } = this.props;
    const itemList = (result && result.itemList && result.itemList.list) || [];
    changeFormData(id, 'itemList', itemList);
  };

  render() {
    const { columns } = this.state;
    return (
      <ContentsWrapper>
        <div>
          <DeptSearchBar {...this.props} handleSearchOnClick={this.handleSearchOnClick} />
        </div>
        <div>
          <ItemTable
            // dataKey="REQ_NO"
            // validationCheck={data => this.validationCheck(data)}
            // overLapCheck={(list, data) => {
            //   this.overLapCheck(list, data);
            // }}
            // columns={columns}
            {...this.props}
            handleSearchOnClick={this.handleSearchOnClick}
          />
        </div>
      </ContentsWrapper>
    );
  }
}

MainPage.propTypes = {};

MainPage.defaultProps = {
  id: 'eiAir',
  getCallDataHandler: () => {},
  result: {},
};
export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(MainPage);

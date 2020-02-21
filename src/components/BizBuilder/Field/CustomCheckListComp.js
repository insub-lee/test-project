import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Icon } from 'antd';
import { isJSON } from 'utils/helpers';

import MultiSelector from 'components/MdcsComponents/MultiSelector';
import StyledModalWrapper from 'commonStyled/Modal/StyledModalWrapper';
import StyledMultiSelector from 'apps/mdcs/styled/StyledMultiSelector';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdModal = StyledModalWrapper(Modal);

let dataSource;
class CustomCheckListComp extends Component {
  state = {
    isShowModal: false,
    apiFlag: true,
    dataSource: [],
  };

  componentDidMount() {
    const { getExtraApiData, sagaKey: id, apiArys } = this.props;
    getExtraApiData(id, apiArys, this.initDataBind);
  }

  initDataBind = sagaKey => {
    const {
      extraApiData: {
        REGION: { categoryMapList: regionList },
        FAB: { categoryMapList: fabList },
        DENSITY: { categoryMapList: densityList },
        PKG: { categoryMapList: pkgList },
        MODULE: { categoryMapList: moduleList },
        PRODUCT: { categoryMapList: prdList },
        GEN: { categoryMapList: genList },
        TECH: { categoryMapList: techList },
        CUSTOMER: { categoryMapList: customList },
      },
    } = this.props;

    dataSource = [
      {
        groupName: 'Site',
        groupKey: 'REGION',
        selectedValue: [],
        selectedItem: [],
        dataSet: regionList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0).map(item => ({ ...item, checked: true })),
      },
      {
        groupName: 'Line/Site',
        groupKey: 'FAB',
        selectedValue: [],
        selectedItem: [],
        dataSet: fabList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
      },
      {
        groupName: 'Product',
        groupKey: 'PRODUCT',
        selectedValue: [],
        selectedItem: [],
        dataSet: prdList.filter(x => x.USE_YN === 'Y'),
      },
      {
        groupName: 'Tech.',
        groupKey: 'TECH',
        selectedValue: [],
        selectedItem: [],
        dataSet: techList.filter(x => x.USE_YN === 'Y'),
      },
      {
        groupName: 'Generation',
        groupKey: 'GEN',
        selectedValue: [],
        selectedItem: [],
        dataSet: genList.filter(x => x.USE_YN === 'Y'),
      },
      {
        groupName: 'Memory Density',
        groupKey: 'DENSITY',
        selectedValue: [],
        selectedItem: [],
        dataSet: densityList.filter(x => x.USE_YN === 'Y'),
      },
      {
        groupName: 'PKG',
        groupKey: 'PKG',
        selectedValue: [],
        selectedItem: [],
        dataSet: pkgList.filter(x => x.USE_YN === 'Y'),
      },
      {
        groupName: 'Module',
        groupKey: 'MODULE',
        selectedValue: [],
        selectedItem: [],
        dataSet: moduleList.filter(x => x.USE_YN === 'Y'),
      },
      {
        groupName: 'Customer',
        groupKey: 'CUSTOMER',
        selectedValue: [],
        selectedItem: [],
        dataSet: customList.filter(x => x.USE_YN === 'Y'),
      },
    ];
    this.setState({ dataSource });
  };

  onClickSelectedWin = () => {
    this.setState({ isShowModal: true });
  };

  onCancelModal = () => {
    this.setState({ isShowModal: false });
  };

  onChangeMultiSelector = (dataList, selectedValue) => {
    this.setState({ selectedCheckList: dataList });
  };

  onClickScope = () => {
    this.setState(
      prevState => ({
        dataSource: prevState.selectedCheckList,
        isShowModal: false,
      }),
      () => {
        const { changeFormData, COMP_FIELD, sagaKey, colData, COMP_TAG, WORK_SEQ } = this.props;
        const { dataSource } = this.state;
        const submitData = dataSource
          .filter(f => f.selectedValue.length > 0)
          .map(grp => ({
            groupName: grp.groupName,
            groupKey: grp.groupKey,
            selectedValue: grp.selectedValue,
            selectedItem: grp.selectedItem,
          }));
        changeFormData(sagaKey, COMP_FIELD, this.setFormDataValue(submitData, colData, COMP_FIELD, COMP_TAG, WORK_SEQ));
      },
    );
  };

  setFormDataValue = (value, colData, COMP_FIELD, COMP_TAG, WORK_SEQ) => {
    if (typeof colData === 'object') {
      colData[0].DETAIL = value;
      return colData;
    }
    if (colData && colData.length > 0 && isJSON(colData)) {
      JSON.parse(colData)[0].DETAIL = value;
      return colData;
    }
    return [
      {
        WORK_SEQ,
        TASK_SEQ: -1,
        CONT_SEQ: -1,
        FIELD_NM: COMP_FIELD,
        TYPE: COMP_TAG,
        DETAIL: value,
      },
    ];
  };

  render() {
    console.debug(this.state);
    return (
      <>
        <StyledMultiSelector>
          <div className="wrapper">
            <div className="draftWrapper">
              {this.state.dataSource.map(grp =>
                grp.selectedItem.map(item => (
                  <div className="draftInfoBox">
                    <Icon type="code" />
                    <span className="infoTxt">
                      {grp.groupName}: {item.title}
                    </span>
                  </div>
                )),
              )}
            </div>
            <Button onClick={this.onClickSelectedWin}>
              <Icon type="select" /> 선택
            </Button>
          </div>
        </StyledMultiSelector>
        <AntdModal
          title="적용범위 및 조회정보 선택"
          width={1100}
          visible={this.state.isShowModal}
          onCancel={this.onCancelModal}
          destroyOnClose
          footer={[<Button onClick={this.onClickScope}>선택</Button>]}
        >
          <MultiSelector onChange={this.onChangeMultiSelector} dataSource={this.state.dataSource}></MultiSelector>
        </AntdModal>
      </>
    );
  }
}

CustomCheckListComp.property = {
  apiArys: PropTypes.array,
  extraApiData: PropTypes.object,
};

CustomCheckListComp.defaultProps = {
  apiArys: [
    { key: 'REGION', url: `/api/admin/v1/common/categoryMapList?MAP_ID=10`, type: 'GET' },
    { key: 'FAB', url: `/api/admin/v1/common/categoryMapList?MAP_ID=11`, type: 'GET' },
    { key: 'PRODUCT', url: `/api/admin/v1/common/categoryMapList?MAP_ID=16`, type: 'GET' },
    { key: 'TECH', url: `/api/admin/v1/common/categoryMapList?MAP_ID=12`, type: 'GET' },
    { key: 'GEN', url: `/api/admin/v1/common/categoryMapList?MAP_ID=13`, type: 'GET' },
    { key: 'DENSITY', url: `/api/admin/v1/common/categoryMapList?MAP_ID=14`, type: 'GET' },
    { key: 'PKG', url: `/api/admin/v1/common/categoryMapList?MAP_ID=15`, type: 'GET' },
    { key: 'MODULE', url: `/api/admin/v1/common/categoryMapList?MAP_ID=17`, type: 'GET' },
    { key: 'CUSTOMER', url: `/api/admin/v1/common/categoryMapList?MAP_ID=18`, type: 'GET' },
  ],
  extraApiData: {
    FAB: {},
    DENSITY: {},
    PKG: {},
    MODULE: {},
    PRODUCT: {},
    GEN: {},
    REGION: {},
    TECH: {},
    CUSTOMER: {},
  },
};

export default CustomCheckListComp;

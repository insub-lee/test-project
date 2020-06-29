import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Icon } from 'antd';
import { isJSON } from 'utils/helpers';

import MultiSelector from 'components/MdcsComponents/MultiSelector';
import StyledSelectModal from 'commonStyled/MdcsStyled/Modal/StyledSelectModal';
import StyledMultiSelector from 'apps/mdcs/styled/StyledMultiSelector';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdModal = StyledSelectModal(Modal);

let dataSource;
class CustomCheckListComp extends Component {
  state = {
    isShowModal: false,
    isItem: false,
    apiFlag: true,
    dataSource: [],
    mapList: undefined,
  };

  componentDidMount() {
    const { fieldSelectData, CONFIG } = this.props;

    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey]) {
        const mapList = fieldSelectData[CONFIG.property.compSelectDataKey];
        this.initDataBind(mapList);
      }
    }
  }

  initDataBind = mapList => {
    const { colData } = this.props;
    const {
      FAB: fabList,
      REGION: regionList,
      DENSITY: densityList,
      PKG: pkgList,
      MODULE: moduleList,
      PRODUCT: prdList,
      GEN: genList,
      TECH: techList,
      CUSTOMER: customList,
    } = mapList;

    dataSource = [
      {
        groupName: 'Site',
        groupKey: 'REGION',
        selectedValue: [],
        selectedItem: [],
        dataSet: regionList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
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
        dataSet: prdList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
      },
      {
        groupName: 'Tech.',
        groupKey: 'TECH',
        selectedValue: [],
        selectedItem: [],
        dataSet: techList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
      },
      {
        groupName: 'Generation',
        groupKey: 'GEN',
        selectedValue: [],
        selectedItem: [],
        dataSet: genList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
      },
      {
        groupName: 'Memory Density',
        groupKey: 'DENSITY',
        selectedValue: [],
        selectedItem: [],
        dataSet: densityList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
      },
      {
        groupName: 'PKG',
        groupKey: 'PKG',
        selectedValue: [],
        selectedItem: [],
        dataSet: pkgList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
      },
      {
        groupName: 'Module',
        groupKey: 'MODULE',
        selectedValue: [],
        selectedItem: [],
        dataSet: moduleList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
      },
      {
        groupName: 'Customer',
        groupKey: 'CUSTOMER',
        selectedValue: [],
        selectedItem: [],
        dataSet: customList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
      },
    ];

    // colData Read 후 selectedValue bind 하기
    let isItem = false;
    if (colData && colData.length > 0) {
      const { DETAIL } = colData[0];
      const selectedGrp = JSON.parse(DETAIL);
      const tempDataSource = dataSource.map(grp => {
        const idx = selectedGrp.findIndex(f => f.groupKey === grp.groupKey);
        if (idx !== -1) {
          isItem = true;
          const sGrp = selectedGrp[idx];
          return { ...grp, ...sGrp };
        }
        return grp;
      });
      this.setState({ dataSource: tempDataSource, selectedCheckList: tempDataSource, isItem });
    } else {
      this.setState({ dataSource, isItem });
    }
  };

  onClickSelectedWin = () => {
    this.setState({ isShowModal: true });
  };

  onCancelModal = () => {
    this.setState({ isShowModal: false });
  };

  onChangeMultiSelector = (dataList, selectedValue) => {
    this.setState({ selectedCheckList: dataList, isItem: true });
  };

  onClickScope = () => {
    const { selectedCheckList } = this.state;
    let isSuccess = true;
    if (selectedCheckList) {
      selectedCheckList.forEach(node => {
        if (node.groupKey === 'REGION' || node.groupKey === 'FAB' || node.groupKey === 'PRODUCT') {
          if (!node.selectedValue || node.selectedValue.length < 1) {
            isSuccess = false;
          }
        }
      });
    } else {
      isSuccess = false;
    }
    if (isSuccess) {
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
    } else {
      message.error(<MessageContent>Site, Line/Site, Product는 반드시 선택되어야 합니다.</MessageContent>);
    }
  };

  setFormDataValue = (value, colData, COMP_FIELD, COMP_TAG, WORK_SEQ) => {
    if (colData && typeof colData === 'object') {
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
    const { readOnly } = this.props;
    const { isItem, dataSource } = this.state;
    return (
      <>
        <StyledMultiSelector>
          <div className={isItem && !readOnly ? 'wrapper active' : 'wrapper'}>
            <div className="draftWrapper">
              {this.state.dataSource &&
                this.state.dataSource.map(grp =>
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
            {!readOnly && (
              <StyledButton className="btn-xxs btn-gray btn-radius" onClick={this.onClickSelectedWin}>
                <Icon type="select" /> 선택
              </StyledButton>
            )}
          </div>
        </StyledMultiSelector>
        <AntdModal
          title="적용범위 및 조회정보 선택"
          width={1100}
          visible={this.state.isShowModal}
          onCancel={this.onCancelModal}
          destroyOnClose
          footer={[
            <StyledButton className="btn-sm btn-primary" onClick={this.onClickScope}>
              선택
            </StyledButton>,
          ]}
          className="multiSelector-w100"
        >
          <MultiSelector onChange={this.onChangeMultiSelector} dataSource={dataSource}></MultiSelector>
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

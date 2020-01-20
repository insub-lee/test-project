import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import CheckList from 'components/CheckSelectList/selectable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
let dataSource;
class CustomCheckListComp extends Component {
  state = {
    openModal: false,
    apiFlag: true,
  };

  componentDidMount() {
    const { getExtraApiData, sagaKey: id, apiArray, compGroupKeys } = this.props;
    getExtraApiData(id, apiArray);
    compGroupKeys.forEach(key => {
      this.state = { ...this.state, [key]: { name: '', value: ' ' } };
    });
  }

  onOpenHandler = () => {
    const { formData, extraApiData, compGroupKeys } = this.props;
    compGroupKeys.forEach(key => {
      if (formData[key] !== ' ') {
        const compName = extraApiData[key].categoryMapList.filter(x => x.NODE_ID.toString() === formData[key]);
        this.setState({ [key]: { name: compName.length > 0 && compName[0].NAME_KOR, value: formData[key] } });
      } else {
        this.setState({ [key]: { name: '', value: ' ' } });
      }
    });
    this.setState({ openModal: true });
  };

  onOkHandler = () => {
    const { compGroupKeys, changeFormData, sagaKey: id, COMP_FIELD, NAME_KOR, colData, changeValidationData } = this.props;

    if (this.state.FAB.value === ' ') {
      message.warning(<MessageContent>적용Line/Site는 반드시 선택이 되어야 합니다.</MessageContent>, 3);
      return;
    }
    if (this.state.PRODUCT.value === ' ') {
      message.warning(<MessageContent>적용Product는 반드시 선택이 되어야 합니다.</MessageContent>, 3);
      return;
    }
    compGroupKeys.forEach(key => {
      changeFormData(id, key, this.state[key].value);
    });
    const nameScope = `SITE:${this.state.REGION.name} | FAB:${this.state.FAB.name} | Tech:${this.state.TECH.name} | Generation:${this.state.GEN.name} | Density:${this.state.DENSITY.name} | PKG Type:${this.state.PKG.name} | Product:${this.state.PRODUCT.name} |  Module:${this.state.MODULE.name} | Customer:${this.state.CUSTOMER.name} `;
    changeFormData(id, COMP_FIELD, nameScope);
    changeValidationData(id, COMP_FIELD, nameScope !== ' ', `${NAME_KOR}는 필수항목 입니다.`);
    this.setState({ openModal: false });
  };

  onChangeHandler = (key, e) => {
    // Multiple = false일 경우 코드
    // const { value: selectedValue } = e.target;
    // const idx = e.nativeEvent.target.selectedIndex;
    // const { text: selectedText } = e.target[idx];
    // this.setState({ [key]: { name: selectedText, value: selectedValue } });

    let selectedText = '';
    let selectedValue = '';
    const { selectedOptions } = e.target;

    Array.from(selectedOptions).map((s, index) => {
      if (index === 0) {
        selectedText = s.text;
        selectedValue = s.value;
      } else {
        selectedText += `, ${s.text}`;
        selectedValue += `, ${s.value}`;
      }
      return '';
    });
    this.setState({ [key]: { name: selectedText, value: selectedValue } });
  };

  onClearHandler = key => {
    this.setState({ [key]: { name: '', value: ' ' } });
  };

  render() {
    const { stateProps } = this.props;
    const {
      colData,
      readOnly,
      extraApiData: { REGION, FAB, PRODUCT, TECH, GEN, DENSITY, PKG, MODULE, CUSTOMER },
      visible,
    } = this.props;

    if (this.state.apiFlag && REGION && FAB && PRODUCT && TECH && GEN && DENSITY && PKG && MODULE && CUSTOMER) {
      dataSource = [
        {
          groupName: 'Site',
          groupKey: 'REGION',
          dataSet: REGION.categoryMapList,
        },
        {
          groupName: 'Line/Site',
          groupKey: 'FAB',
          dataSet: FAB.categoryMapList,
        },
        {
          groupName: 'Product',
          groupKey: 'PRODUCT',
          dataSet: PRODUCT.categoryMapList,
        },
        {
          groupName: 'Tech.',
          groupKey: 'TECH',
          dataSet: TECH.categoryMapList,
        },
        {
          groupName: 'Generation',
          groupKey: 'GEN',
          dataSet: GEN.categoryMapList,
        },
        {
          groupName: 'Memory Density',
          groupKey: 'DENSITY',
          dataSet: DENSITY.categoryMapList,
        },
        {
          groupName: 'PKG',
          groupKey: 'PKG',
          dataSet: PKG.categoryMapList,
        },
        {
          groupName: 'Module',
          groupKey: 'MODULE',
          dataSet: MODULE.categoryMapList,
        },
        {
          groupName: 'Customer',
          groupKey: 'CUSTOMER',
          dataSet: CUSTOMER.categoryMapList,
        },
      ];
      this.setState({ apiFlag: false });
    }
    return visible ? (
      <>
        {colData === 'preView' ? (
          <CheckList isMultiple dataSource={this.props.dataSource} props={this.props.stateProps}></CheckList>
        ) : (
          <div>
            {colData}
            <Modal
              className="modalWrapper"
              width={1280}
              visible={this.state.openModal}
              onOk={this.onOkHandler}
              onCancel={() => this.setState({ openModal: false })}
              destroyOnClose
            >
              <CheckList isMultiple dataSource={dataSource} onClear={this.onClearHandler} onChange={this.onChangeHandler} props={this.state}></CheckList>
            </Modal>
            {!readOnly && <Button onClick={() => this.onOpenHandler()}>적용범위 선택</Button>}
          </div>
        )}
      </>
    ) : (
      ''
    );
  }
}

CustomCheckListComp.defaultProps = {
  CONFIG: { property: {} },
  colData: '',
  changeFormData: () => false,
  changeValidationData: () => false,
  readOnly: false,
  formData: {},
  dataSource: [
    {
      groupName: 'customList1',
      groupKey: 'checkList1',
    },
    {
      groupName: 'customList2',
      groupKey: 'checkList2',
    },
  ],
  stateProps: {
    checkList1: { value: ' ' },
    checkList2: { value: ' ' },
  },
  apiArray: [
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
  extraApiData: {},
  compGroupKeys: ['REGION', 'FAB', 'PRODUCT', 'TECH', 'GEN', 'DENSITY', 'PKG', 'MODULE', 'CUSTOMER'],
};

export default CustomCheckListComp;

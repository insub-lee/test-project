import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Icon } from 'antd';
import { isJSON } from 'utils/helpers';

import MultiSelector from 'components/MdcsComponents/MultiSelector';
import StyledModalWrapper from 'commonStyled/Modal/StyledModalWrapper';
import StyledMultiSelector from 'apps/mdcs/styled/StyledMultiSelector';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const AntdModal = StyledModalWrapper(Modal);

let dataSource;
class RadioMultiSelector extends Component {
  state = {
    isShowModal: false,
    apiFlag: true,
    dataSource: [],
    selectedCheckList: [],
    selectedCheckListValue: [],
  };

  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      COMP_FIELD,
      CONFIG: {
        property: { mapId },
      },
    } = this.props;

    const apiArys = [{ key: `${COMP_FIELD}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    getExtraApiData(id, apiArys, this.initDataBind);
  }

  initDataBind = sagaKey => {
    const { COMP_FIELD, extraApiData, colData } = this.props;
    const { categoryMapList: dataList } = extraApiData[COMP_FIELD];
    const selectedValue = colData.split(',').map(val => Number(val));
    const selectedItem = dataList.filter(data => selectedValue.includes(data.NODE_ID)).map(item => ({ title: item.NAME_KOR, value: item.NODE_ID }));
    dataSource = [
      {
        groupName: COMP_FIELD,
        groupKey: COMP_FIELD,
        selectedValue,
        selectedItem,
        dataSet: dataList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0),
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
    console.debug('dataList', dataList, 'selectedValue', selectedValue);
    this.setState({ selectedCheckList: dataList, selectedCheckListValue: selectedValue });
  };

  onClickScope = () => {
    const { changeFormData, COMP_FIELD, sagaKey, colData, COMP_TAG, WORK_SEQ } = this.props;
    const { selectedCheckListValue } = this.state;
    this.setState(
      prevState => ({
        dataSource: prevState.selectedCheckList,
        isShowModal: false,
      }),
      () => {
        changeFormData(sagaKey, COMP_FIELD, selectedCheckListValue.join());
      },
    );
  };

  render() {
    return (
      <>
        <StyledMultiSelector>
          <div className="wrapper">
            <div className="draftWrapper">
              {this.state.dataSource.map(grp =>
                grp.selectedItem.map(item => (
                  <div className="draftInfoBox">
                    <Icon type="code" />
                    <span className="infoTxt">{item.title}</span>
                  </div>
                )),
              )}
            </div>
            <StyledButton className="btn-sm2 btn-primary" onClick={this.onClickSelectedWin}>
              <Icon type="select" /> 선택
            </StyledButton>
          </div>
        </StyledMultiSelector>
        <AntdModal
          title="기술표준적용"
          width={200}
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

RadioMultiSelector.property = {
  dataList: PropTypes.object,
};

RadioMultiSelector.defaultProps = {
  extraApiData: {
    dataList: {},
  },
};

export default RadioMultiSelector;

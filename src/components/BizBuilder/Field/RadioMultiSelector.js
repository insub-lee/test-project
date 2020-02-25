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
class RadioMultiSelector extends Component {
  state = {
    isShowModal: false,
    apiFlag: true,
    dataSource: [],
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
    const { COMP_FIELD, extraApiData } = this.props;
    const { categoryMapList: dataList } = extraApiData[COMP_FIELD];
    dataSource = [
      {
        groupName: COMP_FIELD,
        groupKey: COMP_FIELD,
        selectedValue: [],
        selectedItem: [],
        dataSet: dataList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0).map(item => ({ ...item, checked: true })),
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
    const {
      CONFIG: {
        property: { COMP_NAME },
      },
    } = this.props;
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
          title={COMP_NAME}
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

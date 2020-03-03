import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Icon } from 'antd';
import { isJSON } from 'utils/helpers';

import SingleGroupChoice from 'components/MdcsComponents/SingleGroupChoice';
import StyledModalWrapper from 'commonStyled/Modal/StyledModalWrapper';
import StyledMultiSelector from 'apps/mdcs/styled/StyledMultiSelector';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdModal = StyledModalWrapper(Modal);

let dataSource;
class LeadBallComp extends Component {
  state = {
    isShowModal: false,
    apiFlag: true,
    dataSource: [],
    selectedCheckList: [],
    selectedCheckListValue: {},
    selectedGroupKey: undefined,
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
    const apiArys = [
      { key: 'LeadFrame', url: `/api/admin/v1/common/categoryMapList?MAP_ID=21`, type: 'GET' },
      { key: 'Ball', url: `/api/admin/v1/common/categoryMapList?MAP_ID=22`, type: 'GET' },
    ];
    getExtraApiData(id, apiArys, this.initDataBind);
  }

  initDataBind = sagaKey => {
    const {
      extraApiData: {
        LeadFrame: { categoryMapList: leadframeList },
        Ball: { categoryMapList: ballList },
      },
    } = this.props;

    dataSource = [
      {
        groupName: 'LeadFrame',
        groupKey: 'L',
        selectedValue: [],
        selectedItem: [],
        dataSet: leadframeList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0).map(item => ({ ...item, checked: true })),
      },
      {
        groupName: 'Ball',
        groupKey: 'B',
        selectedValue: [],
        selectedItem: [],
        dataSet: ballList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0).map(item => ({ ...item, checked: true })),
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

  onChangeSelector = (dataList, selectedValue, selectedGroupKey) => {
    this.setState({ selectedCheckList: dataList, selectedCheckListValue: selectedValue, selectedGroupKey });
  };

  onClickScope = () => {
    const { changeFormData, COMP_FIELD, sagaKey } = this.props;
    const { selectedCheckListValue, selectedGroupKey } = this.state;
    console.debug('selectedGroupKey', selectedGroupKey);
    this.setState(
      prevState => ({
        dataSource: prevState.selectedCheckList,
        isShowModal: false,
      }),
      () => {
        changeFormData(sagaKey, COMP_FIELD, selectedCheckListValue.join());
        changeFormData(sagaKey, 'LB_TYPE', selectedGroupKey);
      },
    );
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
                    <span className="infoTxt">{item.title}</span>
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
          title="기술표준적용"
          width={300}
          visible={this.state.isShowModal}
          onCancel={this.onCancelModal}
          destroyOnClose
          footer={[<Button onClick={this.onClickScope}>선택</Button>]}
        >
          <SingleGroupChoice
            onChange={this.onChangeSelector}
            dataSource={this.state.dataSource}
            selectedGroupKey={this.state.selectedGroupKey}
          ></SingleGroupChoice>
        </AntdModal>
      </>
    );
  }
}

LeadBallComp.property = {
  dataList: PropTypes.object,
};

LeadBallComp.defaultProps = {
  extraApiData: {
    dataList: {},
  },
};

export default LeadBallComp;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Icon } from 'antd';
import { isJSON } from 'utils/helpers';

import SingleGroupChoice from 'components/MdcsComponents/SingleGroupChoice';
import StyledSelectModal from 'commonStyled/MdcsStyled/Modal/StyledSelectModal';
import StyledMultiSelector from 'apps/mdcs/styled/StyledMultiSelector';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdModal = StyledSelectModal(Modal);

let dataSource;
class LeadBallComp extends Component {
  state = {
    isShowModal: false,
    apiFlag: true,
    dataSource: [],
    selectedCheckList: [],
    selectedCheckListValue: {},
    selectedGroupKey: undefined,
    isItem: false,
  };

  componentDidMount() {
    const { fieldSelectData, CONFIG } = this.props;

    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey]) {
        const mapList = fieldSelectData[CONFIG.property.compSelectDataKey];
        this.initDataBind(mapList);
      }
    }
    // const {
    //   getExtraApiData,
    //   sagaKey: id,
    //   COMP_FIELD,
    //   CONFIG: {
    //     property: { mapId },
    //   },
    // } = this.props;
    // const apiArys = [
    //   { key: 'LeadFrame', url: `/api/admin/v1/common/categoryMapList?MAP_ID=21`, type: 'GET' },
    //   { key: 'Ball', url: `/api/admin/v1/common/categoryMapList?MAP_ID=22`, type: 'GET' },
    // ];
    // getExtraApiData(id, apiArys, this.initDataBind);
  }

  initDataBind = mapList => {
    const { colData, formData } = this.props;

    const { LeadFrame: leadframeList, Ball: ballList } = mapList;

    const { LB_TYPE } = formData;
    const selectedValue = colData.split(',').map(val => Number(val));
    let selectedItem;
    if (LB_TYPE === 'L') {
      selectedItem = leadframeList.filter(data => selectedValue.includes(data.NODE_ID)).map(item => ({ title: item.NAME_KOR, value: item.NODE_ID }));
    } else {
      selectedItem = ballList.filter(data => selectedValue.includes(data.NODE_ID)).map(item => ({ title: item.NAME_KOR, value: item.NODE_ID }));
    }

    dataSource = [
      {
        groupName: 'LeadFrame',
        groupKey: 'L',
        selectedValue: LB_TYPE === 'L' ? selectedValue : [],
        selectedItem: LB_TYPE === 'L' ? selectedItem : [],
        dataSet: leadframeList.filter(x => x.USE_YN === 'Y' && x.LVL !== 0).map(item => ({ ...item, checked: true })),
      },
      {
        groupName: 'Ball',
        groupKey: 'B',
        selectedValue: LB_TYPE === 'B' ? selectedValue : [],
        selectedItem: LB_TYPE === 'B' ? selectedItem : [],
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
    const isItem = selectedCheckListValue.length > 0;
    this.setState(
      prevState => ({
        dataSource: prevState.selectedCheckList,
        isShowModal: false,
        isItem,
      }),
      () => {
        changeFormData(sagaKey, COMP_FIELD, selectedCheckListValue.join());
        changeFormData(sagaKey, 'LB_TYPE', selectedGroupKey);
      },
    );
  };

  render() {
    const { readOnly } = this.props;
    const { isItem } = this.state;
    return (
      <>
        <StyledMultiSelector>
          <div className={isItem && !readOnly ? 'wrapper active' : 'wrapper'}>
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
            <StyledButton className="btn-xxs btn-gray btn-radius" onClick={this.onClickSelectedWin}>
              <Icon type="select" /> 선택
            </StyledButton>
          </div>
        </StyledMultiSelector>
        <AntdModal
          title="기술표준적용"
          width={300}
          visible={this.state.isShowModal}
          onCancel={this.onCancelModal}
          destroyOnClose
          footer={[
            <StyledButton className="btn-sm btn-primary" onClick={this.onClickScope}>
              선택
            </StyledButton>,
          ]}
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

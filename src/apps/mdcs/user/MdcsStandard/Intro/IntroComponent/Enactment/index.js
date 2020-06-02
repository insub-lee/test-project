import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import * as ModifyType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/modifyconst';
import * as DraftType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/draftconst';

const { Option } = Select;
class Enactment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      templateList: [],
      stepList01: [],
      stepList02: [],
      stepList03: [],
      stepList04: [],
      docNumber: ['M', '', '', '', '-', ''],
      selectedNodeIds: [undefined, undefined, undefined, undefined],
      selectedWorkSeq: 0,
      isShow: false,
      isLoading: true,
    };
  }

  initStateData = () => {
    this.setState({
      docNumber: ['M', '', '', '', '-', ''],
      selectedNodeIds: [undefined, undefined, undefined, undefined],
      selectedWorkSeq: 0,
    });
  };

  initDataBind = id => {
    const { result } = this.props;
    const categoryList = result && result.categoryInfo && result.categoryInfo.categoryMapList !== null ? result.categoryInfo.categoryMapList : [];
    const templateList =
      result && result.docTemplateInfoByCategory && result.docTemplateInfoByCategory.list !== null ? result.docTemplateInfoByCategory.list : [];

    this.setState({
      categoryList,
      templateList,
      stepList01: categoryList
        .filter(f => f.LVL === 1 && f.NODE_ID !== 2207 && f.NODE_ID !== 2208)
        .map(item => (
          <Option key={item.NODE_ID}>
            {item.NAME_KOR} [{item.CODE}]
          </Option>
        )),
    });
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.initDataBind);
  }

  onChangeStep01 = value => {
    const { categoryList, docNumber, selectedNodeIds } = this.state;
    const idx = categoryList.findIndex(f => f.NODE_ID.toString() === value);
    const { CODE } = categoryList[idx];
    docNumber.splice(1, 1, CODE);
    selectedNodeIds.splice(0, 1, Number(value));
    for (let i = 1; i < selectedNodeIds.length; i++) {
      selectedNodeIds[i] = undefined;
    }
    const stepList02 = categoryList
      .filter(f => f.PARENT_NODE_ID.toString() === value && f.NODE_ID !== 17)
      .map(item => (
        <Option key={item.NODE_ID}>
          {item.NAME_KOR} [{item.CODE}]
        </Option>
      ));
    this.setState({ stepList02, stepList03: undefined, stepList04: undefined, docNumber, selectedNodeIds });
  };

  onChangeStep02 = value => {
    const { categoryList, docNumber, selectedNodeIds } = this.state;
    const idx = categoryList.findIndex(f => f.NODE_ID.toString() === value);
    const { CODE } = categoryList[idx];
    docNumber.splice(2, 1, CODE);
    selectedNodeIds.splice(1, 1, Number(value));
    for (let i = 2; i < selectedNodeIds.length; i++) {
      selectedNodeIds[i] = undefined;
    }
    const stepList03 = categoryList
      .filter(f => f.PARENT_NODE_ID.toString() === value)
      .map(item => (
        <Option key={item.NODE_ID}>
          {item.NAME_KOR} [{item.CODE}]
        </Option>
      ));
    this.setState({ stepList03, stepList04: undefined, docNumber, selectedNodeIds });
  };

  onChangeStep03 = value => {
    const { categoryList, docNumber, selectedNodeIds } = this.state;
    const idx = categoryList.findIndex(f => f.NODE_ID.toString() === value);
    const { CODE } = categoryList[idx];
    docNumber.splice(3, 1, CODE);
    selectedNodeIds.splice(2, 1, Number(value));
    for (let i = 3; i < selectedNodeIds.length; i++) {
      selectedNodeIds[i] = undefined;
    }
    const stepList04 = categoryList
      .filter(f => f.PARENT_NODE_ID.toString() === value)
      .map(item => (
        <Option key={item.NODE_ID}>
          {item.NAME_KOR} [{item.CODE}]
        </Option>
      ));
    this.setState({ stepList04, docNumber, selectedNodeIds });
  };

  templateFilter = item => {
    const { selectedNodeIds } = this.state;
    return selectedNodeIds.includes(item.CATEGORYNODEID);
  };

  onSelectedWorkSeq = (docType, selectedNodeIds) => {
    let viewChangeSeq;
    if (selectedNodeIds.includes(2160)) {
      viewChangeSeq = 28;
    } else if (
      selectedNodeIds.includes(2434) ||
      selectedNodeIds.includes(2445) ||
      selectedNodeIds.includes(2456) ||
      selectedNodeIds.includes(2467) ||
      selectedNodeIds.includes(2478) ||
      selectedNodeIds.includes(2489) ||
      selectedNodeIds.includes(2500) ||
      selectedNodeIds.includes(2511) ||
      selectedNodeIds.includes(2522) ||
      selectedNodeIds.includes(2533) ||
      selectedNodeIds.includes(2544) ||
      selectedNodeIds.includes(2555) ||
      selectedNodeIds.includes(2566) ||
      selectedNodeIds.includes(2577) ||
      selectedNodeIds.includes(2587) ||
      selectedNodeIds.includes(2590)
    ) {
      viewChangeSeq = 31;
    } else {
      viewChangeSeq = undefined;
    }
    switch (docType) {
      case 'BS':
        return { selectedworkSeq: 901, viewChangeSeq };
      case 'TS':
        return { selectedworkSeq: 1921, viewChangeSeq };
      case 'DW':
        return { selectedworkSeq: 1881, viewChangeSeq };
      case 'PM':
        return { selectedworkSeq: 3401, viewChangeSeq };
      case 'WD':
        return { selectedworkSeq: 2941, viewChangeSeq };
      case 'NP':
        return { selectedworkSeq: 2975, viewChangeSeq };
      case 'WP':
        return { selectedworkSeq: 3013, viewChangeSeq };
      default:
        return { selectedworkSeq: 901, viewChangeSeq };
    }
  };

  onChangeStep04 = value => {
    const { categoryList, docNumber, selectedNodeIds } = this.state;
    const idx = categoryList.findIndex(f => f.NODE_ID.toString() === value);
    const { CODE } = categoryList[idx];
    docNumber.splice(5, 1, CODE);
    selectedNodeIds.splice(3, 1, Number(value));

    this.setState({ docNumber, selectedNodeIds }, () => {
      const { templateList, selectedNodeIds } = this.state;
      const selectedTemplateList = templateList.filter(this.templateFilter);
      if (selectedTemplateList.length > 0) {
        const templateCode = selectedTemplateList.sort((a, b) => {
          if (a.LVL > b.LVL) return -1;
          if (a.LVL < b.LVL) return 1;
          return 0;
        })[0];
        const docType = templateCode.DOCTEMPLATECODE;
        const { selectedworkSeq, viewChangeSeq } = this.onSelectedWorkSeq(docType, selectedNodeIds);
        this.setState({ selectedworkSeq, viewChangeSeq });
      }
    });
  };

  onModalShow = () => {
    const { selectedworkSeq, docNumber, selectedNodeIds, viewChangeSeq } = this.state;
    const workPrcProps = {
      draftType: DraftType.ENACTMENT,
      nodeIds: selectedNodeIds,
      degreeFlag: ModifyType.MAJOR,
      draftMethod: 'insert',
    };
    this.props.onShowModal(selectedworkSeq, viewChangeSeq, docNumber.join(''), selectedNodeIds[3], 'INPUT', workPrcProps);
    this.initStateData();
  };

  render() {
    const { stepList01, stepList02, stepList03, stepList04, selectedNodeIds, isShow, isLoading } = this.state;
    return (
      <>
        <li>
          <div className="label-txt">대분류</div>
          <Select placeholder="대분류(문서구분)" onChange={this.onChangeStep01} value={selectedNodeIds[0] && selectedNodeIds[0].toString()}>
            {stepList01}
          </Select>
        </li>
        <li>
          <div className="label-txt">중분류</div>
          <Select placeholder="중분류" onChange={this.onChangeStep02} value={selectedNodeIds[1] && selectedNodeIds[1].toString()}>
            {stepList02}
          </Select>
        </li>
        <li>
          <div className="label-txt">소분류</div>
          <Select placeholder="소분류(업무기능)" onChange={this.onChangeStep03} value={selectedNodeIds[2] && selectedNodeIds[2].toString()}>
            {stepList03}
          </Select>
        </li>
        <li>
          <div className="label-txt">문서LEVEL</div>
          <Select placeholder="문서LEVEL/종류" onChange={this.onChangeStep04} value={selectedNodeIds[3] && selectedNodeIds[3].toString()}>
            {stepList04}
          </Select>
        </li>
        <div className="btn-wrap">
          <StyledButton className="btn-primary mr5 btn-radius" onClick={this.onModalShow}>
            선택완료
          </StyledButton>
          <StyledButton className="btn-light btn-radius">다시선택</StyledButton>
        </div>
      </>
    );
  }
}

Enactment.propTypes = {
  apiArys: PropTypes.array,
};

Enactment.defaultProps = {
  apiArys: [
    {
      key: 'categoryInfo',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=1&ORDBY=ORDER BY CODE',
      type: 'GET',
      params: {},
    },
    {
      key: 'docTemplateInfoByCategory',
      url: '/api/mdcs/v1/common/DocCategoryTemplHandler',
      type: 'GET',
      params: {},
    },
    {
      key: 'docTemplateInfo',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=2',
      type: 'GET',
      params: {},
    },
  ],
};

export default Enactment;

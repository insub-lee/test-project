import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, DatePicker, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';

import UserSearchModal from 'apps/eshs/common/userSearchModal';
import InputTable from 'apps/eshs/admin/safety/safetyImprove/comp/InputTable';
import { fields } from 'apps/eshs/admin/safety/safetyImprove/comp/fields';
import { getTreeFromFlatData } from 'react-sortable-tree';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);

const today = moment(new Date()).format('YYYY-MM-DD');

const getCategoryMapListAsTree = (flatData, flag, viewLang, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item[`NAME_${viewLang && viewLang.length > 0 ? viewLang : 'KOR'}`],
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: flag === 'Y' || item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

class InputComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      initFormData: {},
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
      inputTable: [],
      categoryData: {},
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'CATEGORY_LOC',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 1533, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_MM',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1551, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_EACH_TYPE',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1552, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_GRADE',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1561, USE_YN: 'Y' } },
      },
      {
        key: 'codeData',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: 30431, USE_YN: 'Y' } },
      },
    ];

    getCallDataHandler(id, apiAry, this.appStart);
  };

  appStart = () => {
    const { result, profile, spinningOff } = this.props;

    const initFormData = {};
    const flds = fields(profile);

    for (const name in flds) {
      initFormData[name] = flds[name].DEFAULT_VALUE;
    }

    const loc = (result && result.CATEGORY_LOC && result.CATEGORY_LOC.categoryMapList) || [];

    const grade =
      (result &&
        result.CATEGORY_GRADE &&
        result.CATEGORY_GRADE.categoryMapList &&
        result.CATEGORY_GRADE.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_GRADE.PARAM.NODLE_ID && item.USE_YN === 'Y')) ||
      [];
    const eachType =
      (result &&
        result.CATEGORY_EACH_TYPE &&
        result.CATEGORY_EACH_TYPE.categoryMapList &&
        result.CATEGORY_EACH_TYPE.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_EACH_TYPE.PARAM.NODLE_ID && item.USE_YN === 'Y')) ||
      [];
    const mm =
      (result &&
        result.CATEGORY_MM &&
        result.CATEGORY_MM.categoryMapList &&
        result.CATEGORY_MM.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_MM.PARAM.NODLE_ID && item.USE_YN === 'Y')) ||
      [];

    const DANGERTYPE = [];
    const DANGERCAUSE = [];

    result &&
      result.codeData &&
      result.codeData.categoryMapList &&
      result.codeData.categoryMapList.forEach(item => {
        if (item.PARENT_NODE_ID === 30432) DANGERTYPE.push(item);
        if (item.PARENT_NODE_ID === 30433) DANGERCAUSE.push(item);
      });

    const categoryData = {
      LOC: getCategoryMapListAsTree(loc, 'Y', '', 1533),
      GRADE: grade,
      EACH_TYPE: eachType,
      MM: mm,
      DANGERTYPE,
      DANGERCAUSE,
    };

    this.setState(
      {
        initFormData,
        formData: { initFormData, locLabel: initFormData.LOC ? this.findTreeDataByNodeId(initFormData.LOC) : '' },
        inputTable: [
          <InputTable
            key="InputTable"
            formData={initFormData}
            changeFormData={this.changeFormData}
            setFormData={this.setFormData}
            findTreeDataByNodeId={this.findTreeDataByNodeId}
            categoryData={categoryData}
          />,
        ],
        categoryData,
      },
      spinningOff,
    );
  };

  changeFormData = (target, value) => this.setState(prevState => ({ formData: { ...prevState.formData, [target]: value } }));

  setFormData = nextFormData => this.setState(prevState => ({ formData: { ...prevState.formData, ...nextFormData } }));

  changeStateData = (target, value) => this.setState({ [target]: value });

  findTreeDataByNodeId = nodeId => {
    const { result } = this.props;

    const loc = (result && result.CATEGORY_LOC && result.CATEGORY_LOC.categoryMapList) || [];

    const fidx = loc.findIndex(item => item.NODE_ID === nodeId);

    return fidx > -1 ? loc[fidx] : undefined;
  };

  render() {
    const { inputTable } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdSearchInput
              style={{ width: '150PX' }}
              className="input-search-sm ant-search-inline mr5"
              readOnly
              onClick={this.modalVisible}
              onChange={this.modalVisible}
            />
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm mr5">검색</StyledButton>
            <StyledButton className="btn-primary btn-sm mr5">저장</StyledButton>
            <StyledButton className="btn-light btn-sm mr5">삭제</StyledButton>
            <StyledButton className="btn-gray btn-sm mr5">인쇄</StyledButton>
          </div>
          <div className="div-comment" style={{ display: 'inline-block' }}>
            [ 문서상태 : 작성요망 ]
          </div>
        </StyledCustomSearchWrapper>
        {inputTable}
      </StyledContentsWrapper>
    );
  }
}
InputComp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  removeReduxState: PropTypes.func,
  profile: PropTypes.object,
};
InputComp.defaultProps = {
  result: {},
  sagaKey: '',
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  removeReduxState: () => {},
  profile: {},
};

export default InputComp;

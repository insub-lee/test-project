import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal } from 'antd';
import { isJSON } from 'utils/helpers';
import CustomUserSelect from 'components/CustomUserSelect';

const setFormDataValue = (value, colData, COMP_FIELD, COMP_TAG, WORK_SEQ) => {
  if (typeof colData === 'object') {
    const tempData = colData;
    tempData[0].DETAIL = value;
    return tempData;
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

class MultiUserSelectComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }

  componnentDidMount() {
    const { sagaKey: id, changeFormData, parentTaskSeq, parentWorkSeq } = this.props;
    changeFormData(id, 'PARENT_SEQ', parentWorkSeq);
    changeFormData(id, 'PARENT_TASK_SEQ', parentTaskSeq);
  }

  onTreeSelect = selectedKey => {
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'userList',
        type: 'GET',
        url: `/api/eshs/v1/common/eduexamuser?DEPT_ID=${selectedKey}`,
      },
    ];

    getExtraApiData(id, apiArr);
  };

  onUserSelect = userList => {
    const { sagaKey: id, COMP_FIELD, COMP_TAG, changeFormData, colData, workSeq, parentWorkSeq, parentTaskSeq } = this.props;
    const userIdList = [];
    userList.map(user => userIdList.push(user.USER_ID));
    changeFormData(id, 'PARENT_SEQ', parentWorkSeq);
    changeFormData(id, 'PARENT_TASK_SEQ', parentTaskSeq);
    changeFormData(id, COMP_FIELD, setFormDataValue(userList, colData, COMP_FIELD, COMP_TAG, workSeq));
    changeFormData(id, 'USER_ID_LIST', userList);
    // changeFormData(id, COMP_FIELD, setFormDataValue(JSON.stringify(userList), colData, COMP_FIELD, COMP_TAG, workSeq));
  };

  onCancel = () => {
    this.setState({ isOpenModal: false });
  };

  // custom search 예제
  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
    const searchText =
      value.length > 0
        ? `AND W.${COMP_FIELD} LIKE '%${value}%' AND W.${COMP_FIELD}1 LIKE '%${value}%' AND W.${COMP_FIELD}2 LIKE '%${value}%' AND W.${COMP_FIELD}3 LIKE '%${value}%'`
        : '';
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  // custom search 예제
  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
    const searchText = value.length > 0 ? `AND W.${COMP_FIELD} LIKE '%${value}%'` : '';
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  render() {
    const { onTreeSelect } = this;
    const { CONFIG, visible, colData, isSearch, searchCompRenderer, formData, COMP_FIELD, readOnly, viewPageData, extraApiData } = this.props;
    if (!visible) {
      return null;
    }

    if (isSearch && visible) {
      if (CONFIG.property.searchType !== 'CUSTOM') {
        return searchCompRenderer(this.props);
      }
      return <Input onChange={e => this.handleOnChangeSearch(e.target.value)} className={CONFIG.property.className || ''} />;
    }

    if (CONFIG.property.isSubComp) {
      return (
        <>
          <CustomUserSelect
            userDataList={extraApiData.userList && extraApiData.userList.result}
            apiUrl="/api/eshs/v1/common/eduexamuser"
            onTreeSelect={onTreeSelect}
            onUserSelectHandler={this.onUserSelect}
            onCancel={this.onCancel}
            isWorkBuilder
          />
        </>
      );
    }

    if (readOnly || viewPageData.viewType.toUpperCase() === 'LIST' || viewPageData.viewType.toUpperCase() === 'VIEW') {
      return <span>TEST</span>;
    }

    return (
      <>
        <Input
          readOnly
          placeholder={CONFIG.property.placeholder}
          defaultValue={colData}
          value={formData[COMP_FIELD.replace('NO', 'NAME')] ? `${formData[COMP_FIELD.replace('NO', 'NAME')]}(${colData})` : colData}
          onClick={() => this.setState({ isOpenModal: true })}
          className={CONFIG.property.className || ''}
        />
        <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={null}>
          <CustomUserSelect
            userDataList={extraApiData.userList && extraApiData.userList.result}
            apiUrl="/api/eshs/v1/common/eduexamuser"
            onTreeSelect={onTreeSelect}
            onUserSelectHandler={this.onUserSelect}
            onCancel={this.onCancel}
            isWorkBuilder
          />
        </Modal>
      </>
    );
  }
}

MultiUserSelectComp.propTypes = {
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  CONFIG: PropTypes.object,
  changeFormData: PropTypes.func,
  changeSearchData: PropTypes.func,
  colData: PropTypes.string,
  visible: PropTypes.bool,
  isSearch: PropTypes.bool,
  readOnly: PropTypes.bool,
  searchCompRenderer: PropTypes.func,
  viewType: PropTypes.string,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
  workSeq: PropTypes.number,
  COMP_TAG: PropTypes.string,
  parentWorkSeq: PropTypes.number,
  parentTaskSeq: PropTypes.number,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
};

export default MultiUserSelectComp;

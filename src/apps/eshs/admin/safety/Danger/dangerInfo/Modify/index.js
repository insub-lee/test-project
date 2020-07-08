import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { TreeSelect, Select, message, Modal } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import moment from 'moment';
import View from './View';
import MeterialModal from './MeterialModal';
const AntdModal = StyledAntdModal(Modal);

moment.locale('ko');
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdSelect = StyledSelect(Select);

const getCategoryMapListAsTree = (flatData, rootkey, selectable) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: selectable ? item.LVL > selectable : true,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

const { Option } = Select;

class ModifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conTent: [],
    };
    this.onChangeData = debounce(this.onChangeData, 500);
  }

  componentDidMount() {
    const { sagaKey: id, getExtraApiData, changeFormData, getListData, changeSearchData } = this.props;
    const apiAry = [
      // {
      //   key: 'treeSelectData',
      //   type: 'POST',
      //   url: '/api/admin/v1/common/categoryMapList',
      //   params: { PARAM: { NODE_ID: 1831 } },
      // },
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 1831, USE_YN: 'Y' } },
      },
      {
        key: 'modalData',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsDanger',
      },
      {
        key: 'modalSelectData',
        type: 'GET',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=45',
      },
    ];
    changeSearchData(id, 'INFO_YEAR', `AND W.INFO_YEAR = '${moment().format('YYYY')}'`);
    changeFormData(id, 'INFO_YEAR', moment().format('YYYY'));
    getExtraApiData(id, apiAry, this.initData);
    getListData(id, 10341);
    const endYear = Number(moment().format('YYYY')) + 1;
    const YearOptions = [];
    for (let year = 2006; year <= endYear; year += 1) {
      YearOptions.push(year);
    }
    this.setState({ YearOptions });
  }

  initData = () => {
    const {
      extraApiData: { treeSelectData },
    } = this.props;
    const treeData = treeSelectData && treeSelectData.categoryMapList && treeSelectData.categoryMapList.filter(f => f.USE_YN === 'Y' && f.LVL < 7);
    this.setState({ treeData });
  };

  onChangeData = (name, value) => {
    const { sagaKey: id, changeFormData, changeSearchData, getListData } = this.props;
    changeFormData(id, name, value);
    if (name === 'PROCESS_ID') {
      this.selectTreeData(value);
    } else if (name === 'INFO_YEAR') {
      changeSearchData(id, 'INFO_YEAR', `AND W.INFO_YEAR = '${value}'`);
      getListData(id, 10341);
    }
  };

  onChangeDetailData = (name, value) => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    changeFormData(id, 'INFO_DATA', { ...formData.INFO_DATA, [name]: value });
  };

  selectTreeData = value => {
    const {
      sagaKey: id,
      changeFormData,
      listData,
      setFormData,
      formData,
      profile,
      extraApiData: { treeSelectData },
    } = this.props;
    const { treeData } = this.state;

    const overlab = listData.find(f => f.PROCESS_ID === value);
    if (overlab && overlab.length !== 0) {
      setFormData(id, overlab);
      changeFormData(id, 'TASK_ORIGIN_SEQ', overlab.TASK_ORIGIN_SEQ);
      changeFormData(id, 'TASK_SEQ', overlab.TASK_SEQ);
      changeFormData(id, 'INFO_DATA', JSON.parse(overlab.INFO_DATA));
      changeFormData(id, 'UPD_USER_ID', profile.USER_ID);
      changeFormData(id, 'UPD_USER_NAME', profile.NAME_KOR);
    } else {
      changeFormData(id, 'INFO_DATA', {});
      changeFormData(id, 'TASK_ORIGIN_SEQ', -1);
      changeFormData(id, 'TASK_SEQ', -1);
    }
    const selectData =
      treeSelectData &&
      treeSelectData.categoryMapList &&
      treeSelectData.categoryMapList.filter(f => f.USE_YN === 'Y' && f.PARENT_NODE_ID === formData.PROCESS_ID);

    const processId = treeData.find(f => f.NODE_ID === value);
    const placeId = treeData.find(f => f.NODE_ID === processId.PARENT_NODE_ID);
    const divId = treeData.find(f => f.NODE_ID === placeId.PARENT_NODE_ID);
    const sdivId = treeData.find(f => f.NODE_ID === divId.PARENT_NODE_ID);
    changeFormData(id, 'PROCESS_CD', processId.CODE);
    changeFormData(id, 'PLACE_CD', placeId.CODE);
    changeFormData(id, 'DIV_CD', divId.CODE);
    changeFormData(id, 'SDIV_CD', sdivId.CODE);
    changeFormData(id, 'PLACE_ID', placeId.NODE_ID);
    changeFormData(id, 'DIV_ID', divId.NODE_ID);
    changeFormData(id, 'SDIV_ID', sdivId.NODE_ID);
    this.setState({
      processNm: processId.NAME_KOR,
      placeNm: placeId.NAME_KOR,
      divNm: divId.NAME_KOR,
      sdivNm: sdivId.NAME_KOR,
      selectData,
    });
  };

  onChangeModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal }, this.mySearch);
  };

  saveBeforeProcess = () => {
    const { formData, sagaKey: id, changeFormData, saveTask } = this.props;
    if (formData.PROCESS_ID) {
      changeFormData(id, 'INFO_DATA', formData.INFO_DATA && JSON.stringify(formData.INFO_DATA));
      saveTask(id, id, this.callbackHandle);
    } else {
      message.warning('분류를 먼저 선택해주세요');
    }
  };

  modifyBeforeProcess = () => {
    const { sagaKey: id, getExtraApiData, formData } = this.props;
    const temp = typeof formData.INFO_DATA !== 'string' ? JSON.stringify(formData.INFO_DATA) : formData.INFO_DATA;
    const apiAry = [
      {
        key: 'modify',
        type: 'POST',
        url: '/api/eshs/v1/common/dangerInfo',
        params: { PARAM: { ...formData, INFO_DATA: temp } },
      },
    ];
    getExtraApiData(id, apiAry, this.callbackHandle);
  };

  callbackHandle = (id, modifyWorkSeq, taskSeq, formData) => {
    const { getListData } = this.props;
    getListData(id, 10341);
    message.success('완료되었습니다.');
  };

  mySearch = () => {
    const { processNm, placeNm, divNm, sdivNm, selectData } = this.state;
    const {
      formData,
      listData,
      extraApiData: { modalData },
    } = this.props;

    console.debug('modalData : ', modalData);
    this.setState(
      {
        conTent: [],
      },
      () =>
        this.setState({
          conTent: [
            <View
              processNm={processNm}
              placeNm={placeNm}
              divNm={divNm}
              sdivNm={sdivNm}
              selectData={selectData}
              formData={formData}
              listData={listData}
              modalData={modalData.list}
              onChangeData={this.onChangeDetailData}
              onChangeModal={this.onChangeModal}
            />,
          ],
        }),
    );
  };

  render() {
    const { YearOptions, treeData, conTent } = this.state;
    const { formData, sagaKey: id, extraApiData, changeFormData, getExtraApiData } = this.props;
    const nTreeData = (treeData && getCategoryMapListAsTree(treeData, 1831, 5)) || {};
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">참여 연도</span>
            <AntdSelect
              className="select-sm mr5"
              value={formData.INFO_YEAR}
              style={{ width: '100px' }}
              onChange={value => this.onChangeData('INFO_YEAR', value)}
            >
              {YearOptions && YearOptions.map(YYYY => <Option value={`${YYYY}`}>{YYYY}</Option>)}
            </AntdSelect>
            <span className="text-label">분류</span>
            <AntdTreeSelect
              style={{ width: '300px' }}
              className="mr5 select-sm"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={nTreeData || []}
              placeholder="분류를 선택해주세요"
              onChange={value => this.onChangeData('PROCESS_ID', value)}
            />
          </div>
          <div className="btn-area">
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.mySearch()}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('개발 중입니다.')}>
                엑셀받기
              </StyledButton>
              {formData.TASK_SEQ !== -1 ? (
                <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modifyBeforeProcess}>
                  수정
                </StyledButton>
              ) : (
                <StyledButton className="btn-primary btn-first btn-sm" onClick={this.saveBeforeProcess}>
                  저장
                </StyledButton>
              )}
            </StyledButtonWrapper>
          </div>
        </StyledCustomSearchWrapper>
        {conTent}
        <AntdModal width={900} visible={this.state.isModal} title="" onCancel={this.onChangeModal} destroyOnClose footer={null} className="modal-table-pad">
          {this.state.isModal && (
            <MeterialModal
              sagaKey={id}
              getExtraApiData={getExtraApiData}
              extraApiData={extraApiData}
              changeFormData={changeFormData}
              onChangeModal={this.onChangeModal}
              isModal={this.state.isModal}
              formData={formData}
            />
          )}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

ModifyPage.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  formData: PropTypes.object,
  listData: PropTypes.object,
  profile: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.func,
  getListData: PropTypes.func,
  changeSearchData: PropTypes.func,
  setFormData: PropTypes.func,
};

ModifyPage.defaultProps = {};

export default ModifyPage;

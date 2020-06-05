import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { Input, InputNumber, TreeSelect, Select, Modal, message, Checkbox } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import moment from 'moment';

moment.locale('ko');
const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);

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

const tagArray = (onChangeData, formData) => [
  <>
    <th>재해발생 사례</th>
    <td colSpan={2}>
      <AntdInputNumber
        className="ant-input-number-sm ant-input-number-inline"
        onChange={value => onChangeData(`JAEHAE`, value)}
        style={{ width: 100 }}
        value={formData.JAEHAE}
      />
      건
    </td>
  </>,
  <>
    <th>앗차사고 사례</th>
    <td colSpan={2}>
      <AntdInputNumber
        className="ant-input-number-sm ant-input-number-inline"
        onChange={value => onChangeData(`ACHA`, value)}
        style={{ width: 100 }}
        value={formData.ACHA}
      />
      건
    </td>
  </>,
  <th colSpan={3}>근로자 구성 및 경력특성</th>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox value={formData.EMP_WOMAN} onChange={e => onChangeData(`EMP_WOMAN`, e.target.checked)}>
        여성근로자
      </Checkbox>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox value={formData.EMP_NEW} onChange={e => onChangeData(`EMP_NEW`, e.target.checked)}>
        1년 미만 미숙련자
      </Checkbox>
    </td>
  </>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox value={formData.EMP_OLD} onChange={e => onChangeData(`EMP_OLD`, e.target.checked)}>
        고령근로자
      </Checkbox>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox value={formData.EMP_TEMP} onChange={e => onChangeData(`EMP_TEMP`, e.target.checked)}>
        비정규직 근로자
      </Checkbox>
    </td>
  </>,
  <>
    <td colSpan={3} rowSpan={1}>
      <Checkbox value={formData.EMP_FOREIGN} onChange={e => onChangeData(`EMP_FOREIGN`, e.target.checked)}>
        외국인 근로자
      </Checkbox>
      <Checkbox value={formData.EMP_DISABLE} onChange={e => onChangeData(`EMP_DISABLE`, e.target.checked)}>
        장애 근로자
      </Checkbox>
    </td>
  </>,
  <>
    <th>교대작업 유무</th>
    <td colSpan={2}>
      <Checkbox value={formData.WORK_Y} onChange={e => onChangeData(`WORK_Y`, e.target.checked)}>
        유
      </Checkbox>
      <Checkbox value={formData.WORK_N} onChange={e => onChangeData(`WORK_N`, e.target.checked)}>
        무
      </Checkbox>
    </td>
  </>,
  <>
    <th>운반수단 유무</th>
    <td colSpan={2}>
      <Checkbox value={formData.MOVE_Y} onChange={e => onChangeData(`MOVE_Y`, e.target.checked)}>
        기계
      </Checkbox>
      <Checkbox value={formData.MOVE_N} onChange={e => onChangeData(`MOVE_N`, e.target.checked)}>
        인력
      </Checkbox>
    </td>
  </>,
  <>
    <th>안전작업허가 필요작업 유무</th>
    <td colSpan={2}>
      <Checkbox value={formData.AGREE_Y} onChange={e => onChangeData(`AGREE_Y`, e.target.checked)}>
        유
      </Checkbox>
      <Checkbox value={formData.AGREE_N} onChange={e => onChangeData(`AGREE_N`, e.target.checked)}>
        무
      </Checkbox>
    </td>
  </>,
  <>
    <th rowSpan={2}>중량물 인력취급시 단위중량( kg예상) 및 형태</th>
    <td colSpan={2} rowSpan={2}>
      <AntdInputNumber className="ant-input-number-sm" style={{ width: 100 }} onChange={value => onChangeData(`WEIGHT_KG`, value)} value={formData.JAEHAE} />
      <Checkbox value={formData.WEIGHT_UP} onChange={e => onChangeData(`WEIGHT_UP`, e.target.checked)}>
        들기
      </Checkbox>
      <Checkbox value={formData.WEIGHT_PUSH} onChange={e => onChangeData(`WEIGHT_PUSH`, e.target.checked)}>
        밀기
      </Checkbox>
      <Checkbox value={formData.WEIGHT_PULL} onChange={e => onChangeData(`WEIGHT_PULL`, e.target.checked)}>
        끌기
      </Checkbox>
      <Checkbox value={formData.WEIGHT_ETC} onChange={e => onChangeData(`WEIGHT_ETC`, e.target.checked)}>
        기타
      </Checkbox>
    </td>
  </>,
  <></>,
  <>
    <th>작업환경측정 측정유무</th>
    <td colSpan={2}>
      <Checkbox value={formData.ENV_Y} onChange={e => onChangeData(`ENV_Y`, e.target.checked)}>
        측정
      </Checkbox>
      <Checkbox value={formData.ENV_N} onChange={e => onChangeData(`ENV_N`, e.target.checked)}>
        미측정
      </Checkbox>
      <Checkbox value={formData.ENV_Z} onChange={e => onChangeData(`ENV_Z`, e.target.checked)}>
        해당무
      </Checkbox>
    </td>
  </>,
  <>
    <th>소음측정 기준 (기준:85dB)</th>
    <td colSpan={2}>
      <AntdInputNumber
        className="ant-input-number-sm ant-input-number-inline"
        style={{ width: 100 }}
        onChange={value => onChangeData(`ENV_NOISE`, value)}
        value={formData.ENV_NOISE}
      />
      dB
    </td>
  </>,
  <>
    <th>작업에 대한 특별안전보건교육 필요유무</th>
    <td colSpan={2}>
      <Checkbox value={formData.EDU_Y} onChange={e => onChangeData(`EDU_Y`, e.target.checked)}>
        유
      </Checkbox>
      <Checkbox value={formData.EDU_N} onChange={e => onChangeData(`EDU_N`, e.target.checked)}>
        무
      </Checkbox>
    </td>
  </>,
];

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
    };
    this.onChangeData = debounce(this.onChangeData, 500);
  }

  componentDidMount() {
    const { sagaKey: id, getExtraApiData, changeFormData } = this.props;
    const apiAry = [
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1831 } },
      },
    ];
    changeFormData(id, 'INFO_YEAR', moment().format('YYYY'));
    getExtraApiData(id, apiAry, this.initData);
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

  onRowModal = record => {};

  modalSearch = () => {};

  modalDataSet = () => {};

  onChangeData = (name, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    console.debug('value', name, value);
    changeFormData(id, name, value);
    if (name === 'PROCESS_ID') {
      this.selectTreeData(value);
    }
  };

  onChangeModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  };

  onSave = () => {
    const { sagaKey: id, getExtraApiData, formData } = this.props;
    const apiAry = [
      {
        key: '',
        type: 'POST',
        url: '',
        params: { PARAM: { ...formData } },
      },
    ];
    getExtraApiData(id, apiAry, this.saveAfter);
  };

  saveAfter = () => {};

  selectTreeData = value => {
    const { treeData } = this.state;

    const processId = treeData.find(f => f.NODE_ID === value);
    const placeId = treeData.find(f => f.NODE_ID === processId.PARENT_NODE_ID);
    const divId = treeData.find(f => f.NODE_ID === placeId.PARENT_NODE_ID);
    const sdivId = treeData.find(f => f.NODE_ID === divId.PARENT_NODE_ID);

    this.setState({
      processId: processId.NODE_ID,
      processNm: processId.NAME_KOR,
      placeId: placeId.NODE_ID,
      placeNm: placeId.NAME_KOR,
      divId: divId.NODE_ID,
      divNm: divId.NAME_KOR,
      sdivId: sdivId.NODE_ID,
      sdivNm: sdivId.NAME_KOR,
    });
  };

  render() {
    const { processId, processNm, placeId, placeNm, divId, divNm, sdivId, sdivNm, YearOptions, treeData } = this.state;
    const { formData } = this.props;
    const {
      extraApiData: { treeSelectData },
    } = this.props;
    const selectData =
      treeSelectData &&
      treeSelectData.categoryMapList &&
      treeSelectData.categoryMapList.filter(f => f.USE_YN === 'Y' && f.PARENT_NODE_ID === formData.PROCESS_ID);
    const nTreeData = (treeData && getCategoryMapListAsTree(treeData, 1831, 5)) || {};
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">참여년도</span>
            <AntdSelect className="select-sm mr5" value={formData.INFO_YEAR} style={{ width: '100px' }} onChange={value => this.onChangeData('DE_YEAR', value)}>
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
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('검색')}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('개발 중입니다.')}>
                엑셀받기
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('저장/수정')}>
                저장/수정
              </StyledButton>
            </StyledButtonWrapper>
          </div>
        </StyledCustomSearchWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="12.5%" />
              <col width="12.5%" />
              <col width="12.5%" />
              <col width="12.5%" />
              <col width="12.5%" />
              <col width="12.5%" />
              <col width="12.5%" />
              <col width="12.5%" />
            </colgroup>
            <tbody>
              <tr>
                <th align="center">분류/부서명</th>
                <td colSpan="2" align="center">
                  <span>{`${sdivNm || ''} > ${divNm || ''}`}</span>
                </td>
                <td rowSpan="2" colSpan="3" align="center">
                  <font size="5">안전보건상 위험정보</font>
                </td>
                <th align="center">생산품</th>
                <td align="center">
                  <AntdInput className="ant-input-sm ant-input-inline" style={{ width: 80 }} />
                </td>
              </tr>
              <tr>
                <th>공정/세부공정명</th>
                <td colSpan="2" align="center">
                  <span>{`${placeNm || ''} > ${processNm || ''}`}</span>
                </td>
                <th align="center">근로자수</th>
                <td align="center">
                  <AntdInputNumber className="ant-input-number-sm ant-input-number-inline" style={{ width: 80 }} />
                </td>
              </tr>
              <tr>
                <th colSpan="3" align="center">
                  설비.장비
                </th>
                <th colSpan="2" align="center">
                  유해화학물질
                </th>
                <td rowSpan="2" colSpan="3" align="center">
                  <font size="3">기타안전보건상 건강정보</font>
                </td>
              </tr>
              <tr>
                <th colSpan="2" align="center">
                  설비장비명
                </th>
                <th align="center">수량</th>
                <th align="center">유해화학물질명</th>
                <th align="center">등급</th>
              </tr>
              {tagArray(this.onChangeData, formData).map((tag, index) => (
                <tr>
                  <td align="center" colSpan="2">
                    <AntdSelect
                      className="select-sm"
                      style={{ width: '100%' }}
                      value={formData[`M_CD${index + 1}`]}
                      onChange={value => this.onChangeData(`M_CD${index + 1}`, value)}
                    >
                      {selectData && selectData.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
                    </AntdSelect>
                  </td>
                  <td align="center">
                    <AntdInputNumber
                      className="ant-input-number-sm"
                      style={{ width: 100 }}
                      value={formData[`M_QTY${index + 1}`]}
                      onChange={value => this.onChangeData(`M_QTY${index + 1}`, value)}
                    />
                  </td>
                  <td align="center">
                    <AntdSearchInput className="input-search-sm" value={formData[`C_NM${index + 1}`]} readOnly onClick={() => this.onChangeModal(index + 1)} />
                  </td>
                  <td align="center">
                    <span>{formData[`C_GR${index + 1}`] || ''}</span>
                  </td>
                  {tag}
                </tr>
              ))}
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdModal
          width={900}
          visible={this.state.isModal || this.state.isInsertModal}
          title=""
          onCancel={this.onCancel}
          destroyOnClose
          footer={null}
          className="modal-table-pad"
        ></AntdModal>
      </StyledContentsWrapper>
    );
  }
}

Modify.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  formData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
};

Modify.defaultProps = {};

export default Modify;

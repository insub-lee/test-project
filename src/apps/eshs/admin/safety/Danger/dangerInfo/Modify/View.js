import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { Input, InputNumber, TreeSelect, Select, Modal, message, Checkbox, Table } from 'antd';
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
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

moment.locale('ko');
const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);

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
      <AntdInputNumber className="ant-input-number-sm" style={{ width: 100 }} onChange={value => onChangeData(`WEIGHT_KG`, value)} value={formData.WEIGHT_KG} />
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

function* changeFormDataCallBackSaveTask(params, id, changeFormData, saveTask) {
  yield changeFormData(id, 'INFO_DATA', params);
  saveTask(id, id, () => null);
}

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
    };
    this.onChangeData = debounce(this.onChangeData, 500);
  }

  componentDidMount() {
    const { sagaKey: id, getExtraApiData, changeFormData, getListData, changeSearchData } = this.props;
    const apiAry = [
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1831 } },
      },
      {
        key: 'modalSelectData',
        type: 'GET',
        url: '/api/admin/v1/common/categoryMapList?MAP_ID=45',
      },
      {
        key: 'modalData',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsDanger/false?SELECTED_CODE=C003',
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
      extraApiData: { treeSelectData, modalData, modalSelectData },
    } = this.props;
    const treeData = treeSelectData && treeSelectData.categoryMapList && treeSelectData.categoryMapList.filter(f => f.USE_YN === 'Y' && f.LVL < 7);
    const nModalSelectData = modalSelectData && modalSelectData.categoryMapList && modalSelectData.categoryMapList.filter(f => f.LVL !== 0);
    const nModalData = modalData && modalData.list;

    this.setState({ treeData, modalData: nModalData, modalSelectData: nModalSelectData });
  };

  onChangeData = (name, value) => {
    const { sagaKey: id, changeFormData } = this.props;
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

  selectTreeData = value => {
    const { sagaKey: id, changeFormData, listData, setFormData } = this.props;
    const { treeData } = this.state;

    const overlab = listData.find(f => f.PROCESS_ID === value);
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
    });
    if (overlab && overlab.length !== 0) {
      setFormData(id, overlab);
    }
  };

  filterSelect = () => {
    const {
      extraApiData: { modalData },
    } = this.props;
    const { ref01, ref02 } = this.state;
    if (modalData && modalData.list && modalData.list.length > 0) {
      const filterData = modalData && modalData.list && modalData.list.filter(f => (ref01 ? f.REF01 === ref01 : true) && (ref02 ? f.REF02 === ref02 : true));
      this.setState({ modalData: filterData });
    }
  };

  onSelectChangeModal = selectedRowKeys => {
    const { modalData } = this.state;
    const nData = modalData.filter(item => selectedRowKeys.findIndex(i => i === item.MINOR_CD) !== -1);
    this.setState({ selectedRowKeys, selectedMeterial: nData });
  };

  modalInsert = () => {
    const { selectedMeterial } = this.state;
    const { sagaKey: id, changeFormData } = this.props;
    if (selectedMeterial.length < 14) {
      selectedMeterial.forEach((item, index) => {
        changeFormData(id, `C_NM${index + 1}`, item.MINOR_CD);
        changeFormData(id, `C_NAME${index + 1}`, item.CD_NM);
        changeFormData(id, `C_GR${index + 1}`, item.REF03);
      });
      this.onChangeModal();
    } else {
      message.warning('화학물질 종류는 최대 14개까지 선택할 수 있습니다.');
    }
  };

  saveBeforeProcess = () => {
    const { formData, sagaKey: id, changeFormData, saveTask } = this.props;
    const infoData = JSON.stringify(formData);
    const callBackSave = changeFormDataCallBackSaveTask(infoData, id, changeFormData, saveTask);
    callBackSave.next();
    callBackSave.next();
  };

  render() {
    const { processNm, placeNm, divNm, sdivNm, YearOptions, treeData, modalData, modalSelectData, selectedRowKeys } = this.state;
    const { formData, modalColumns, getListData, sagaKey: id, listData } = this.props;
    const {
      extraApiData: { treeSelectData },
    } = this.props;
    const selectData =
      treeSelectData &&
      treeSelectData.categoryMapList &&
      treeSelectData.categoryMapList.filter(f => f.USE_YN === 'Y' && f.PARENT_NODE_ID === formData.PROCESS_ID);
    const nTreeData = (treeData && getCategoryMapListAsTree(treeData, 1831, 5)) || {};
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChangeModal,
    };
    console.debug('list : ', listData);
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
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => getListData(id, 10341)}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => message.info('개발 중입니다.')}>
                엑셀받기
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.saveBeforeProcess}>
                저장/수정
              </StyledButton>
            </StyledButtonWrapper>
          </div>
        </StyledCustomSearchWrapper>
        {listData ? (
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
                        defaultValue={formData[`M_CD${index + 1}`]}
                        onChange={value => this.onChangeData(`M_CD${index + 1}`, value)}
                      >
                        {selectData && selectData.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
                      </AntdSelect>
                    </td>
                    <td align="center">
                      <AntdInputNumber
                        className="ant-input-number-sm"
                        style={{ width: 100 }}
                        defaultValue={formData[`M_QTY${index + 1}`]}
                        onChange={value => this.onChangeData(`M_QTY${index + 1}`, value)}
                      />
                    </td>
                    <td align="center">
                      <AntdSearchInput className="input-search-sm" value={formData[`C_NAME${index + 1}`]} readOnly onClick={this.onChangeModal} />
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
        ) : (
          ''
        )}
        <AntdModal width={900} visible={this.state.isModal} title="" onCancel={this.onChangeModal} destroyOnClose footer={null} className="modal-table-pad">
          <StyledContentsWrapper>
            <StyledCustomSearchWrapper className="search-wrapper-inline">
              <div className="search-input-area">
                <span className="text-label">지역</span>
                <AntdSelect
                  className="mr5 select-sm"
                  style={{ width: 80 }}
                  value={this.state.ref01}
                  onChange={value => this.setState({ ref01: String(value) }, this.filterSelect)}
                >
                  <Option value="">지역전체</Option>
                  {modalSelectData && modalSelectData.map(item => <Option value={String(item.NODE_ID)}>{item.NAME_KOR}</Option>)}
                </AntdSelect>
                <span className="text-label">물질구분</span>
                <AntdSelect
                  className="mr5 select-sm"
                  style={{ width: 150 }}
                  defaultValue={this.state.searchType}
                  value={this.state.ref02}
                  onChange={value => this.setState({ ref02: value }, this.filterSelect)}
                >
                  <Option value="">물질전체</Option>
                  <Option value="CHEMICAL">CHEMICAL</Option>
                  <Option value="GAS">GAS</Option>
                </AntdSelect>
              </div>
            </StyledCustomSearchWrapper>
            <AntdTable
              columns={modalColumns}
              bordered
              rowKey="MINOR_CD"
              dataSource={modalData || []}
              rowSelection={rowSelection}
              pagination={20}
              footer={() => <span>{`${(modalData && modalData.length) || 0} 건`}</span>}
            />
            <StyledButtonWrapper className="btn-wrap-center">
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modalInsert}>
                저장
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onChangeModal}>
                취소
              </StyledButton>
            </StyledButtonWrapper>
          </StyledContentsWrapper>
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

View.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  formData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.func,
  modalColumns: PropTypes.array,
};

View.defaultProps = {
  modalColumns: [
    {
      title: '지역',
      align: 'center',
      dataIndex: 'REF01_NAME',
    },
    {
      title: '물질구분',
      align: 'center',
      dataIndex: 'REF02',
    },
    {
      title: '물질명',
      align: 'center',
      dataIndex: 'CD_NM',
    },
    {
      title: '등급',
      align: 'center',
      dataIndex: 'REF03',
    },
  ],
};

export default View;

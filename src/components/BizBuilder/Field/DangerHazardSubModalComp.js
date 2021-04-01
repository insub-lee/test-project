import * as PropTypes from 'prop-types';
import React from 'react';
import { Table, InputNumber, Select } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

const { Option } = Select;
const AntdTable = StyledAntdTable(Table);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSelect = StyledSelect(Select);

// 장비 리스트 생성
const setEquipList = list => {
  const nextList = [];
  // 장비코드만 분리
  const equipList = list.filter(item => item.LVL === 5);
  // 장비코드의 단계별 상위코드 조회
  equipList.forEach(item => {
    // 1 ~ 4 Lv의 코드조회
    const process = list.find(node => node.CODE === item.PRNT_CD);
    const place = list.find(node => node.CODE === process.PRNT_CD);
    const div = list.find(node => node.CODE === place.PRNT_CD);
    const sdiv = list.find(node => node.CODE === div.PRNT_CD);

    const newItem = {
      ...item,
      SDIV_CD: sdiv.CODE,
      SDIV_NM: sdiv.CD_NAME,
      DIV_CD: div.CODE,
      DIV_NM: div.CD_NAME,
      PLACE_CD: place.CODE,
      PLACE_NM: place.CD_NAME,
      PROCESS_CD: process.CODE,
      PROCESS_NM: process.CD_NAME,
      EQUIP_CD: item.CODE,
      NUM: 1,
    };
    nextList.push(newItem);
  });
  return nextList;
};

const getMenu = (prntCd, lvl, flatData) => {
  const list = flatData || [];
  const result = list
    .filter(item => {
      if (lvl === 1) {
        if (item.CODE === 'M000') {
          return false;
        }
      }
      if (item.PRNT_CD === prntCd) {
        return true;
      }
      return false;
    })
    .map(item => ({
      title: item.CD_NAME,
      value: item.CODE,
      key: item.CODE,
      parentValue: item.PRNT_CD,
      selectable: true,
    }));
  return result;
};
class DangerHazardSubComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 선택된 장비
      lvl1: [], // 분류
      lvl2: [], // 부서
      lvl3: [], // 공정
      lvl4: [], // 세부공정
      lvl5: [], // 세부공정에 따른 장비
      equipList: [], // 장비 전체
      selected1: 'M000',
      selected2: '',
      selected3: '',
      selected4: '',
    };
  }

  componentDidMount() {
    this.init();
  }

  // 1 ~ 4 Lv 필터
  setFilterList = (lvl, list) => list.filter(item => item.LVL === lvl);

  init = () => {
    const { workStepCode } = this.props;
    // 메뉴리스트 생성
    const lvl1 = getMenu('M000', 1, workStepCode);
    const equipList = setEquipList(workStepCode);
    this.setState({ lvl1, equipList });
  };

  // 메뉴트리 변경시 재조회
  onChangeSelect = (prntCode, depth) => {
    const { equipList } = this.state;
    const { workStepCode } = this.props;
    let lastCode = prntCode;
    let lastDepth = depth;
    if (prntCode === '') {
      switch (depth) {
        case 2:
          lastCode = this.state.selected1;
          lastDepth -= 1;
          break;
        case 3:
          lastCode = this.state.selected2;
          lastDepth -= 1;
          break;
        case 4:
          lastCode = this.state.selected3;
          lastDepth -= 1;
          break;
        default:
          break;
      }
    }
    const menu = getMenu(lastCode, lastDepth, workStepCode);
    const lastLv = lastCode === 'M000' ? depth : lastDepth + 1;
    if (lastCode !== '' && depth === 4) {
      const nextLvl5 = equipList.filter(item => item.PRNT_CD === lastCode);
      this.setState({
        selectedRowKeys: [], // 입력도중 메뉴트리가 바뀌면 선택값또한 초기화
        lvl5: nextLvl5,
        [`selected${lastDepth}`]: lastCode,
      });
    } else {
      this.setState({
        selectedRowKeys: [], // 입력도중 메뉴트리가 바뀌면 선택값또한 초기화
        [`lvl${lastLv}`]: menu,
        [`selected${lastDepth}`]: lastCode,
        [`selected${lastDepth + 1}`]: '',
      });
    }
  };

  // 장비수량 변경시
  onChangeData = (record, value) => {
    const { lvl5 } = this.state;
    const nextLvl5 = lvl5.map(item => {
      if (item.CODE === record.CODE) {
        return { ...item, NUM: value };
      }
      return { ...item };
    });
    this.setState({ lvl5: nextLvl5 });
  };

  onSelectChangeModal = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  modalInsert = () => {
    const { selectedRowKeys, lvl5 } = this.state;
    const { sagaKey: id, changeFormData, formData, onChangeModal, onSelectedRowKeys } = this.props;
    const { HAZARD_LIST, REG_NO, TASK_SEQ } = formData;
    if (selectedRowKeys && selectedRowKeys.length) {
      const tempList = lvl5.filter(item => selectedRowKeys.includes(item.CODE)) || [];
      let hazardLastSeq = Number((HAZARD_LIST[HAZARD_LIST.length - 1] && HAZARD_LIST[HAZARD_LIST.length - 1].SEQ) || 0);
      const realList = [];
      tempList.forEach(item => {
        for (let index = 0; index < item.NUM; index += 1) {
          realList.push({
            ...item,
            WORK_NM: undefined,
            AOC_ID: JSON.stringify([]),
            AOT_ID: 30438,
            RA_YN: 'Y',
            SEQ: (hazardLastSeq += 1),
            REG_NO,
            TASK_SEQ,
            CHK: 'Y',
          });
        }
      });

      const rowKeys = [];
      HAZARD_LIST.concat(realList).forEach((item, index) => item.CHK === 'Y' && rowKeys.push(index));

      changeFormData(id, 'HAZARD_LIST', HAZARD_LIST.concat(realList));
      onChangeModal();
      onSelectedRowKeys(rowKeys);
    } else {
      message.info(<MessageContent>선택된 장비가 없습니다.</MessageContent>);
    }
  };

  render() {
    const { onChangeModal } = this.props;
    const { selectedRowKeys, lvl1, lvl2, lvl3, lvl4, lvl5, selected1, selected2, selected3, selected4 } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChangeModal,
    };
    const columns = [
      {
        title: '부서',
        dataIndex: 'DIV_NM',
      },
      {
        title: '공정(장소)',
        dataIndex: 'PLACE_NM',
      },
      {
        title: '세부공정',
        dataIndex: 'PROCESS_NM',
      },
      {
        title: '장비(설비)',
        dataIndex: 'CD_NAME',
      },
      {
        title: '생성 수량',
        dataIndex: 'NUM',
        render: (text, record) => (
          <AntdInputNumber
            className="ant-input-number-xs"
            defaultValue={1}
            min={1}
            onChange={value => this.onChangeData(record, value)}
          />
        ),
      },
    ];
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            {/* 1 Depth (분류) */}
            <span className="text-label">분류</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.onChangeSelect(value, 1)}
              value={selected1}
            >
              <Option value="M000">전체</Option>
              {lvl1.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 2 Depth (부서) */}
            <span className="text-label">부서</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.onChangeSelect(value, 2)}
              value={selected1 === 'M000' ? '' : selected2}
              disabled={selected1 === 'M000'}
            >
              <Option value="">부서전체</Option>
              {lvl2.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 3 Depth (공정(장소)) */}
            <span className="text-label">공정(장소)</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.onChangeSelect(value, 3)}
              value={selected1 === 'M000' || selected2 === '' ? '' : selected3}
              disabled={selected1 === 'M000' || selected2 === ''}
            >
              <Option value="">장소전체</Option>
              {lvl3.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
            {/* 4 Depth (세부공정) */}
            <span className="text-label">세부공정</span>
            <AntdSelect
              className="select-sm mr5"
              style={{ width: '200px' }}
              onChange={value => this.onChangeSelect(value, 4)}
              value={selected1 === 'M000' || selected2 === '' || selected3 === '' ? '' : selected4}
              disabled={selected1 === 'M000' || selected2 === '' || selected3 === ''}
            >
              <Option value="">공정전체</Option>
              {lvl4.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </AntdSelect>
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          rowKey="CODE"
          key="CODE"
          columns={columns}
          dataSource={lvl5 || []}
          rowSelection={rowSelection}
          scroll={{ y: 400 }}
          pagination={false}
        />
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-primary btn-first btn-sm" onClick={this.modalInsert}>
            생성
          </StyledButton>
          <StyledButton className="btn-light btn-first btn-sm" onClick={onChangeModal}>
            취소
          </StyledButton>
        </StyledButtonWrapper>
      </>
    );
  }
}

DangerHazardSubComp.propTypes = {
  sagaKey: PropTypes.string,
  formData: PropTypes.object,
  workStepCode: PropTypes.array,
  changeFormData: PropTypes.func,
  onChangeModal: PropTypes.func,
  onSelectedRowKeys: PropTypes.func,
};

DangerHazardSubComp.defaultProps = {};
export default DangerHazardSubComp;

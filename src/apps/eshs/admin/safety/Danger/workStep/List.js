import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTreeFromFlatData } from 'react-sortable-tree';
import { Table, Input, message, TreeSelect, Select } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledTreeSelect from 'commonStyled/Form/StyledTreeSelect';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import ExcelDownloader from './Excel';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;

const getCategoryMapListAsTree = (flatData, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({ title: item.NAME_KOR, value: item.NODE_ID, key: item.NODE_ID, parentValue: item.PARENT_NODE_ID, selectable: true })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSelectValue: '',
      name: '',
      code: '',
      listData: [],
      pullpath: '',
      nodeOrdinal: '',
      nodeId: '',
      useType: '',
    };
  }

  componentDidMount() {
    this.initDataApi();
  }

  changeSelectValue = value => {
    this.setState({ changeSelectValue: value, code: '', name: '', useYN: '', desciption: '' }, () => this.selectCode());
  };

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
    if (name === 'useType') {
      this.selectCode();
    }
  };

  initDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1831 } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  initData = () => {
    const {
      result: { treeSelectData },
    } = this.props;
    const nData =
      (treeSelectData &&
        treeSelectData.categoryMapList &&
        getCategoryMapListAsTree(
          treeSelectData.categoryMapList.filter(f => f.USE_YN === 'Y' && f.LVL !== 7),
          1831,
        )) ||
      [];
    this.setState({ nData });
  };

  onChangeSelect = value => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'selectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: value } },
      },
    ];
    this.setState({ changeSelectValue: value }, () => getCallDataHandler(id, apiAry, this.selectCode));
  };

  selectCode = () => {
    const {
      result: { selectData, treeSelectData },
    } = this.props;
    const { changeSelectValue, useType } = this.state;
    if (changeSelectValue) {
      const listData = selectData && selectData.categoryMapList.filter(f => f.PARENT_NODE_ID === changeSelectValue && (useType ? f.USE_YN === useType : true));
      const pullpath = treeSelectData && treeSelectData.categoryMapList.find(x => x.NODE_ID === (changeSelectValue || 1831));
      this.setState({ listData, pullpath: pullpath && pullpath.FULLPATH, nodeOrdinal: pullpath && pullpath.NODE_ORDINAL, lvl: pullpath.LVL });
    } else {
      message.warning('코드 구분을 선택해주세요.');
    }
  };

  callBackApi = () => {
    this.onChangeSelect(this.state.changeSelectValue);
    this.initDataApi();
  };

  overlabCode = () => {
    const { listData, code } = this.state;
    if (code) {
      const overlab = listData && listData.find(item => item.CODE === this.state.code);
      if (overlab) {
        message.warning('기존에 동일한 코드가 존재합니다.');
      } else {
        this.onChangeData('I');
      }
    } else {
      message.warning('코드를 입력해주세요.');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { changeSelectValue, nodeOrdinal, pullpath, code, name, desciption, lvl } = this.state;
    const submitData = {
      MAP_ID: 67,
      PARENT_NODE_ID: changeSelectValue,
      LVL: Number(lvl) + 1,
      NODE_ORDINAL: nodeOrdinal,
      FULLPATH: pullpath,
      CODE: code,
      NAME_KOR: name,
      NAME_ENG: '',
      NAME_CHN: '',
      DESCIPTION: desciption,
      USE_YN: value === 'D' ? 'N' : 'Y',
      NODE_ID: value !== 'I' ? this.state.nodeId : '',
    };
    if (this.state.name && this.state.changeSelectValue) {
      if (value === 'U' && this.state.code) {
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (this.state.code && (value === 'D' || value === 'R')) {
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (!this.state.code) {
        message.warning('코드가 올바르지 않습니다.');
      }
    } else if (!this.state.changeSelectValue) {
      message.warning('분류를 선택해주세요.');
    } else if (!this.state.name) {
      message.warning('코드명을 올바르게 입력하시오.');
    }

    this.onReset();
  };

  onReset = () => {
    this.setState({
      name: '',
      code: '',
      useYN: '',
      desciption: '',
    });
  };

  selectedRecord = record => {
    this.setState({
      changeSelectValue: record.PARENT_NODE_ID,
      name: record.NAME_KOR,
      code: record.CODE,
      nodeId: record.NODE_ID,
      useYN: record.USE_YN,
      desciption: record.DESCIPTION,
    });
  };

  render() {
    const { nData, useType, listData, code, name, useYN, desciption, lvl } = this.state;
    let changeTitle;
    switch (lvl) {
      case 3:
        changeTitle = '부서';
        break;
      case 4:
        changeTitle = '공정(장소)';
        break;
      case 5:
        changeTitle = '세부공정';
        break;
      case 6:
        changeTitle = '장비(설비)';
        break;
      default:
        changeTitle = '분류';
        break;
    }
    const columns = [
      {
        title: '상태',
        children: [
          {
            title: (
              <>
                {useYN === 'Y' ? (
                  <span className="span-item">사용</span>
                ) : (
                  <StyledButton className="btn-primary btn-sm" onClick={() => this.onChangeData('R')}>
                    삭제 취소
                  </StyledButton>
                )}
              </>
            ),
            dataIndex: 'USE_YN',
            align: 'center',
            className: 'th-form',
            width: 150,
            render: item => <span>{item === 'Y' ? '사용중' : '삭제'}</span>,
          },
        ],
      },
      {
        title: `${changeTitle}코드`,
        children: [
          {
            title: <AntdInput style={{ width: 100 }} className="ant-input-sm" value={code} onChange={e => this.onChangeValue('code', e.target.value)} />,
            className: 'th-form',
            dataIndex: 'CODE',
            align: 'center',
            width: 100,
          },
        ],
      },
      {
        title: `${changeTitle}명`,
        align: 'left',
        children: [
          {
            title: (
              <AntdInput
                className="ant-input-inline ant-input-sm input-left"
                style={{ width: '300px' }}
                value={name}
                onChange={e => this.onChangeValue('name', e.target.value)}
              />
            ),
            className: 'th-form',
            dataIndex: 'NAME_KOR',
            align: 'left',
            width: 150,
          },
        ],
      },
      {
        title: '비고',
        align: 'left',
        children: [
          {
            title: (
              <>
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left mr5"
                  style={{ width: '300px' }}
                  value={desciption}
                  onChange={e => this.onChangeValue('desciption', e.target.value)}
                />
                <StyledButtonWrapper className="btn-wrap-inline">
                  <StyledButton className="btn-primary btn-sm btn-first" onClick={this.overlabCode}>
                    추가
                  </StyledButton>
                  <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.onChangeData('U')}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.onChangeData('D')}>
                    삭제
                  </StyledButton>
                  <StyledButton className="btn-primary btn-sm" onClick={this.onReset}>
                    Reset
                  </StyledButton>
                </StyledButtonWrapper>
              </>
            ),
            className: 'th-form',
            dataIndex: 'DESCIPTION',
            align: 'left',
          },
        ],
      },
    ];
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <AntdTreeSelect
            style={{ width: '300px' }}
            className="mr5 select-mid"
            defultValue={this.state.changeSelectValue}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={nData || []}
            placeholder="Please select"
            onChange={value => this.onChangeSelect(value)}
          />
          <AntdSelect className="select-mid mr5" onChange={value => this.onChangeValue('useType', value)} value={useType}>
            <Option value="">전체</Option>
            <Option value="Y">사용</Option>
            <Option value="N">미사용</Option>
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={this.selectCode}>
              검색
            </StyledButton>
            {listData.length > 0 && <ExcelDownloader dataList={listData} excelNm="작업단계관리" />}
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          className="tableWrapper"
          rowKey={listData.NODE_ID}
          key={listData.NODE_ID}
          columns={columns}
          dataSource={listData || []}
          bordered
          onRow={record => ({
            onClick: () => {
              this.selectedRecord(record);
            },
          })}
          footer={() => <span>{`${listData && listData.length} 건`}</span>}
        />
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;

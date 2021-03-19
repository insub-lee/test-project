import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, message, Select, Spin } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import ExcelDownloader from './Excel';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);

const { Option } = Select;

// 선택된 레벨, 부모값이 일치하는 배열리턴
const getCategoryMapFilter = (type, flatData, minlvl, maxlvl, prtValue) => {
  const result = flatData
    .filter(item => {
      if (minlvl && minlvl > 0) {
        return item.LVL >= minlvl;
      }
      return true;
    })
    .filter(item => {
      if (maxlvl && maxlvl > 0) {
        return item.LVL <= maxlvl;
      }
      return true;
    })
    .filter(item => {
      if (prtValue && prtValue > 0) {
        return item.PARENT_NODE_ID === prtValue;
      }
      return true;
    });
  if (type === 'menu') {
    return result.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: true,
    }));
  }
  return result || [];
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // render
      isLoaded: false,
      // List
      listData: [],
      // FormData
      code: '',
      name: '',
      desciption: '',
      pullpath: '',
      lvl: 3, // default Lv
      nodeOrdinal: '000067000005000001', // Lv3 default NodeOrdinal
      nodeId: '',
      prtNodeId: 1596,
      useType: 'A', // default Used
      // SearchTree
      totalList: [],
      lvl1: [],
      lvl2: [],
      lvl3: [],
      lvl4: [],
      selected1: 0,
      selected2: 0,
      selected3: 0,
      selected4: 0,
    };
  }

  componentDidMount() {
    this.initDataApi();
  }

  // 초기 데이터 설정
  initDataApi = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'treeSelectData',
      type: 'POST',
      url: '/api/admin/v1/common/categoryMapList',
      params: { PARAM: { NODE_ID: 1596 } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initDataApiCallback);
  };

  initDataApiCallback = (id, response) => {
    const { categoryMapList } = response;
    const initLvl1 = getCategoryMapFilter('menu', categoryMapList, 3, 3);
    const initList = getCategoryMapFilter('list', categoryMapList, 3, 0, 1596);
    this.setState({
      isLoaded: true,
      totalList: categoryMapList,
      lvl1: initLvl1,
      listData: initList,
    });
  };

  // Depth 선택
  onChangeSelect = (depth, value) => {
    const { totalList, selected1, selected2, selected3 } = this.state;
    if (value === 0) {
      let initPrtValue = 0;
      switch (depth) {
        case 2:
          initPrtValue = selected1;
          break;
        case 3:
          initPrtValue = selected2;
          break;
        case 4:
          initPrtValue = selected3;
          break;
        default:
          initPrtValue = 1596;
          break;
      }
      const list = getCategoryMapFilter('list', totalList, depth + 2, 0, initPrtValue);
      const target = totalList.find(item => item.NODE_ID === initPrtValue);
      return this.setState({
        [`selected${depth}`]: value,
        listData: list,
        lvl: depth + 2,
        prtNodeId: initPrtValue,
        nodeOrdinal: target.NODE_ORDINAL,
        pullpath: target.FULLPATH,
      });
    }
    const list = getCategoryMapFilter('list', totalList, depth + 2, 0, value);
    const nextDepthMenu = getCategoryMapFilter('menu', totalList, depth + 3, 0, value);
    const target = totalList.find(item => item.NODE_ID === value);
    return this.setState({
      [`selected${depth}`]: value,
      [`selected${depth + 1}`]: 0,
      [`lvl${depth + 1}`]: nextDepthMenu || [],
      listData: list,
      lvl: depth + 3,
      prtNodeId: value,
      nodeOrdinal: target.NODE_ORDINAL,
      pullpath: target.FULLPATH,
    });
  };

  // formData 수정
  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  // 신규 코드 추가
  overlabCode = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { listData, code, lvl } = this.state;
    if (code || lvl > 3) {
      const overlab = listData && listData.find(item => item.CODE === this.state.code);
      if (overlab) {
        return message.warning('기존에 동일한 코드가 존재합니다.');
      }
      if (lvl > 3) {
        const apiAry = [
          {
            key: 'getCode',
            type: 'GET',
            url: '/api/eshs/v1/common/eshsDangerGetWorkStepCode',
          },
        ];
        return getCallDataHandler(id, apiAry, () => {
          const { result } = this.props;
          const nextCode = (result && result.getCode && result.getCode.result) || '';
          this.setState({ code: nextCode }, () => this.onChangeData('I'));
        });
      }
      return this.onChangeData('I');
    }
    return message.warning('코드를 입력해주세요.');
  };

  // 저장, 수정, 삭제
  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { nodeOrdinal, pullpath, code, name, desciption, lvl, nodeId, prtNodeId } = this.state;
    const submitData = {
      CUSTOM_TYPE: value,
      MAP_ID: 67,
      PARENT_NODE_ID: prtNodeId,
      LVL: Number(lvl),
      NODE_ORDINAL: nodeOrdinal,
      FULLPATH: pullpath,
      CODE: code,
      NAME_KOR: name,
      NAME_ENG: '',
      NAME_CHN: '',
      DESCIPTION: desciption || '',
      USE_YN: value === 'D' ? 'N' : 'Y',
      NODE_ID: value !== 'I' ? nodeId : '',
    };

    if (name && prtNodeId) {
      if (this.state.code && value === 'U') {
        // 수정
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (this.state.code && (value === 'D' || value === 'R')) {
        // 삭제, 삭제복구
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (value === 'I') {
        // 등록
        submitHandlerBySaga(id, 'POST', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
      } else if (!code) {
        message.warning('코드가 올바르지 않습니다.');
      }
    } else if (!prtNodeId) {
      message.warning('분류를 선택해주세요.');
    } else if (!name) {
      message.warning('코드명을 올바르게 입력하시오.');
    }
  };

  // 저장, 수정, 삭제 콜백
  callBackApi = (id, response) => {
    const { listData } = this.state;
    const { CUSTOM_TYPE } = response;
    // 신규 or 수정된 Code
    let newCode = {};
    // 신규등록일 경우
    if (CUSTOM_TYPE === 'I') {
      newCode = {
        ROOT_ID: 631,
        MAP_ID: response.MAP_ID,
        NODE_ID: response.NODE_ID,
        PARENT_NODE_ID: response.PARENT_NODE_ID,
        CODE: response.CODE,
        DESCIPTION: response.DESCIPTION,
        FULLPATH: `${response.FULLPATH}|${response.NODE_ID}`,
        NODE_ORDINAL: `${response.NODE_ORDINAL}${response.NODE_ORDINAL_NEW}`,
        LVL: response.LVL,
        NAME_KOR: response.NAME_KOR,
        NAME_ENG: response.NAME_ENG,
        NAME_CHN: response.NAME_CHN,
        NAME_JPN: response.NAME_JPN,
        NAME_ETC: response.NAME_ETC,
        USE_YN: response.USE_YN,
        CHILDREN_CNT: 0,
      };
      listData.push(newCode);
      this.setState({
        nodeId: '',
        name: '',
        code: '',
        useYN: '',
        desciption: '',
      });
    } else {
      const newList = listData.map(item =>
        item.NODE_ID === response.NODE_ID
          ? {
              ...item,
              CODE: response.CODE,
              DESCIPTION: response.DESCIPTION,
              NAME_KOR: response.NAME_KOR,
              USE_YN: response.USE_YN,
            }
          : item,
      );
      this.setState({
        listData: newList,
        nodeId: '',
        name: '',
        code: '',
        useYN: '',
        desciption: '',
      });
    }
  };

  // Reset = Row 선택 취소
  onReset = () => {
    this.setState({
      nodeId: '',
      name: '',
      code: '',
      useYN: '',
      desciption: '',
    });
  };

  // Row 선택
  selectedRecord = record => {
    this.setState({
      name: record.NAME_KOR,
      code: record.CODE,
      nodeId: record.NODE_ID,
      useYN: record.USE_YN,
      desciption: record.DESCIPTION,
    });
  };

  render() {
    const {
      useType,
      listData,
      nodeId,
      code,
      name,
      useYN,
      desciption,
      lvl,
      isLoaded,
      lvl1,
      lvl2,
      lvl3,
      lvl4,
      selected1,
      selected2,
      selected3,
      selected4,
    } = this.state;
    // 사용여부에 따른 filter
    let filterListData = listData;
    switch (useType) {
      case 'Y':
        filterListData = listData.filter(item => item.USE_YN === 'Y');
        break;
      case 'N':
        filterListData = listData.filter(item => item.USE_YN === 'N');
        break;
      default:
        break;
    }

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
                  <>
                    {code === '' ? (
                      ''
                    ) : (
                      <StyledButton className="btn-gray btn-xs" onClick={() => this.onChangeData('R')}>
                        삭제 취소
                      </StyledButton>
                    )}
                  </>
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
            title: (
              <>
                {lvl > 3 ? (
                  <span>{code || ''}</span>
                ) : (
                  <AntdInput
                    style={{ width: 100 }}
                    className="ant-input-sm"
                    readOnly={lvl > 3}
                    value={code}
                    onChange={e => this.onChangeValue('code', e.target.value)}
                  />
                )}
              </>
            ),
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
                style={{ width: 150 }}
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
                  style={{ width: 150 }}
                  value={desciption}
                  onChange={e => this.onChangeValue('desciption', e.target.value)}
                />
                <StyledButtonWrapper className="btn-wrap-inline">
                  {nodeId === '' ? (
                    <StyledButton className="btn-gray btn-xs btn-first" onClick={this.overlabCode}>
                      추가
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.onChangeData('U')}>
                        수정
                      </StyledButton>
                      <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.onChangeData('D')}>
                        삭제
                      </StyledButton>
                    </>
                  )}
                  <StyledButton className="btn-gray btn-xs" onClick={this.onReset}>
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
        <Spin spinning={!isLoaded} tip="Data Loading...">
          <StyledCustomSearch className="search-wrapper-inline">
            <div className="search-input-area">
              {/* 1 Depth */}
              <span className="text-label">분류</span>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '200px' }}
                onChange={value => this.onChangeSelect(1, value)}
                value={selected1}
              >
                <Option value={0}>전체</Option>
                {lvl1.map(item => (
                  <Option value={item.value}>{item.title}</Option>
                ))}
              </AntdSelect>
              {/* 2 Depth */}
              <span className="text-label">부서</span>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '200px' }}
                onChange={value => this.onChangeSelect(2, value)}
                value={selected1 === 0 ? 0 : selected2}
                disabled={selected1 === 0}
              >
                <Option value={0}>부서전체</Option>
                {lvl2.map(item => (
                  <Option value={item.value}>{item.title}</Option>
                ))}
              </AntdSelect>
              {/* 3 Depth */}
              <span className="text-label">공정(장소)</span>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '200px' }}
                onChange={value => this.onChangeSelect(3, value)}
                value={selected1 === 0 || selected2 === 0 ? 0 : selected3}
                disabled={selected1 === 0 || selected2 === 0}
              >
                <Option value={0}>장소전체</Option>
                {lvl3.map(item => (
                  <Option value={item.value}>{item.title}</Option>
                ))}
              </AntdSelect>
              {/* 4 Depth */}
              <span className="text-label">세부공정</span>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: '200px' }}
                onChange={value => this.onChangeSelect(4, value)}
                value={selected1 === 0 || selected2 === 0 || selected3 === 0 ? 0 : selected4}
                disabled={selected1 === 0 || selected2 === 0 || selected3 === 0}
              >
                <Option value={0}>공정전체</Option>
                {lvl4.map(item => (
                  <Option value={item.value}>{item.title}</Option>
                ))}
              </AntdSelect>
              {/* Use Yn */}
              <span className="text-label">사용여부</span>
              <AntdSelect
                className="select-sm mr5"
                onChange={value => this.setState({ useType: value })}
                value={useType}
              >
                <Option value="A">전체</Option>
                <Option value="Y">사용</Option>
                <Option value="N">미사용</Option>
              </AntdSelect>
            </div>
            <div className="btn-area">
              {listData && listData.length > 0 && <ExcelDownloader dataList={listData} excelNm="작업단계관리" />}
            </div>
          </StyledCustomSearch>
          <AntdLineTable
            rowKey="NODE_ID"
            key="NODE_ID"
            columns={columns}
            dataSource={filterListData || []}
            bordered
            pagination={{ pageSize: 20 }}
            onRow={record => ({
              onClick: () => {
                this.selectedRecord(record);
              },
            })}
            footer={() => <span>{`${listData && listData.length} 건`}</span>}
          />
        </Spin>
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => false,
  getCallDataHandlerReturnRes: () => false,
};

export default List;

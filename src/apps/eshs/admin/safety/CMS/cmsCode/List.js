import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTreeFromFlatData } from 'react-sortable-tree';
import { Table, Input, message, TreeSelect } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import ExcelDownloader from './Excel';

const AntdInput = StyledInput(Input);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
const AntdLineTable = StyledLineTable(Table);

const getCategoryMapListAsTree = (flatData, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: item.CHILDREN_CNT !== 0,
    })),
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
  };

  initDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 1878 } },
      },
      // {
      //   key: 'treeSelectData',
      //   type: 'POST',
      //   url: '/api/admin/v1/common/categoryMapList',
      //   params: { PARAM: { NODE_ID: 1878 } },
      // },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  initData = () => {
    const {
      result: { treeSelectData },
    } = this.props;
    const nData = (treeSelectData && treeSelectData.categoryMapList && getCategoryMapListAsTree(treeSelectData.categoryMapList, 1878)) || [];
    this.setState({ nData });
  };

  onChangeSelect = value => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'selectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: value } },
      },
    ];
    this.setState({ changeSelectValue: value }, () => getCallDataHandler(id, apiAry, this.selectCode));
    this.onReset();
  };

  selectCode = () => {
    const {
      result: { selectData, treeSelectData },
    } = this.props;
    const { changeSelectValue } = this.state;
    if (changeSelectValue) {
      const listData = selectData && selectData.categoryMapList.filter(f => f.PARENT_NODE_ID === changeSelectValue);
      const pullpath = treeSelectData && treeSelectData.categoryMapList.find(x => x.NODE_ID === (changeSelectValue || 1878));
      this.setState({ listData, pullpath: pullpath && pullpath.FULLPATH, nodeOrdinal: pullpath && pullpath.NODE_ORDINAL, lvl: pullpath.LVL });
    } else {
      message.warning('코드 구분을 선택해주세요.');
    }
  };

  callBackApi = () => {
    this.onChangeSelect(this.state.changeSelectValue);
    this.initDataApi();
  };

  createCode = () => {
    const {
      result: { treeSelectData },
    } = this.props;
    const listData = treeSelectData && treeSelectData.categoryMapList;
    if (listData && listData[0]) {
      this.setState({ code: `AA${String(listData.length).padStart(3, '0')}` }, () => this.onChangeData('I'));
    } else {
      message.warning('페이지에 오류가 있습니다.');
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
        submitHandlerBySaga(id, 'PUT', '/api/admin/v1/common/categoryChildren', submitData, this.callBackApi);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', '/api/admin/v1/common/categoryMap', submitData, this.callBackApi);
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
    const { code, name, useYN, desciption, lvl, nData, listData } = this.state;
    const {
      result: { treeSelectData },
    } = this.props;
    const totalData = treeSelectData && treeSelectData.categoryMapList;

    let changeTitle;
    switch (lvl) {
      case 2:
        changeTitle = '분류1';
        break;
      case 3:
        changeTitle = '분류2';
        break;
      case 4:
        changeTitle = '분류3';
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
                  <StyledButton className="btn-light btn-xs" onClick={() => this.onChangeData('R')}>
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
        title: `분류코드`,
        children: [
          {
            title: <span>{code}</span>,
            className: 'th-form',
            dataIndex: 'CODE',
            align: 'center',
            width: 100,
          },
        ],
      },
      {
        title: `${changeTitle}`,
        align: 'left',
        children: [
          {
            title: (
              <AntdInput
                className="ant-input-inline ant-input-xs input-left"
                style={{ width: 100 }}
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
        title: '점검수량',
        align: 'left',
        children: [
          {
            title: (
              <>
                <AntdInput
                  className="ant-input-inline ant-input-xs input-left mr5"
                  style={{ width: 100 }}
                  value={desciption}
                  onChange={e => this.onChangeValue('desciption', e.target.value)}
                />
                <StyledButtonWrapper className="btn-wrap-inline">
                  <StyledButton className="btn-gray btn-xs btn-first" onClick={this.createCode}>
                    추가
                  </StyledButton>
                  <StyledButton className="btn-gray btn-xs btn-first" onClick={() => this.onChangeData('U')}>
                    수정
                  </StyledButton>
                  <StyledButton className="btn-light btn-xs btn-first" onClick={() => this.onChangeData('D')}>
                    삭제
                  </StyledButton>
                  <StyledButton className="btn-light btn-xs" onClick={this.onReset}>
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
            className="mr5 select-sm"
            defultValue={this.state.changeSelectValue}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={nData || []}
            placeholder="Please select"
            onChange={value => this.onChangeSelect(value)}
          />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.selectCode}>
              검색
            </StyledButton>
            <ExcelDownloader dataList={totalData} excelNm="CMS 코드관리" />
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          rowKey={listData.NODE_ID}
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

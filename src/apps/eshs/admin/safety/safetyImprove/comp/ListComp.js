import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Table, DatePicker, TreeSelect, Select } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import SearchList from 'apps/eshs/admin/safety/safetyImprove/comp/SearchList';
import UserSearchModal from 'apps/eshs/common/userSearchModal/ModalContent';
import AcpEmpComp from 'apps/eshs/admin/safety/safetyImprove/comp/AcpEmpComp';
import SendMailForm from 'apps/eshs/admin/safety/safetyImprove/comp/SendMailForm';
import ImproveView from 'apps/eshs/admin/safety/safetyImprove/Input';
import DanestAdmin from 'apps/eshs/admin/safety/Danger/danestAdmin';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

import { getTreeFromFlatData } from 'react-sortable-tree';

const toDay = moment(new Date()).format('YYYY-MM-DD');

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

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

class ListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {
        REQ_FROM: `${toDay.substring(0, 4)}-01-01`,
        REQ_TO: toDay,
        SITE: '청주',
      },
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
      selectedRowKeys: [],
      selectedRows: [],
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
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1551, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_EACH_TYPE',
        type: 'POST',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1552, USE_YN: 'Y' } },
      },
      {
        key: 'CATEGORY_GRADE',
        type: 'POST',
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        params: { PARAM: { NODE_ID: 1561, USE_YN: 'Y' } },
      },
    ];

    getCallDataHandler(id, apiAry, this.appStart);
  };

  appStart = () => {
    const { result, spinningOff } = this.props;

    const loc = (result && result.CATEGORY_LOC && result.CATEGORY_LOC.categoryMapList) || [];

    const grade =
      (result &&
        result.CATEGORY_GRADE &&
        result.CATEGORY_GRADE.categoryMapList &&
        result.CATEGORY_GRADE.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_GRADE.PARAM.NODE_ID && item.USE_YN === 'Y')) ||
      [];
    const eachType =
      (result &&
        result.CATEGORY_EACH_TYPE &&
        result.CATEGORY_EACH_TYPE.categoryMapList &&
        result.CATEGORY_EACH_TYPE.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_EACH_TYPE.PARAM.NODE_ID && item.USE_YN === 'Y')) ||
      [];
    const mm =
      (result &&
        result.CATEGORY_MM &&
        result.CATEGORY_MM.categoryMapList &&
        result.CATEGORY_MM.categoryMapList.filter(item => item.NODE_ID !== result.CATEGORY_MM.PARAM.NODE_ID && item.USE_YN === 'Y')) ||
      [];

    const categoryData = {
      LOC: getCategoryMapListAsTree(loc, 'Y', '', 1533),
      GRADE: grade,
      EACH_TYPE: eachType,
      MM: mm,
    };

    this.setState(
      {
        categoryData,
      },
      spinningOff,
    );
  };

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

  search = () => {
    const { searchParam } = this.state;
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'list',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsSafetyImproveMgt',
        params: { PARAM: searchParam },
      },
    ];

    getCallDataHandler(id, apiAry, spinningOff);
  };

  changeModalObj = (title = '', visible = false, content = []) => this.setState({ modalObj: { title, visible, content } });

  changeSearchParam = (target, value) => this.setState(prevState => ({ searchParam: { ...prevState.searchParam, [target]: value } }));

  onChangeRangeDatePicker = (target, arrDate) =>
    this.setState(prevState => ({ searchParam: { ...prevState.searchParam, [`${target}_FROM`]: arrDate[0], [`${target}_TO`]: arrDate[1] } }));

  showMessage = text => {
    this.props.spinningOff();
    return message.info(<MessageContent>{text}</MessageContent>);
  };

  columns = [
    {
      title: '작업번호',
      align: 'center',
      dataIndex: 'REQ_NO',
      render: (text, record) =>
        text ? (
          <StyledButton
            className="btn-link btn-sm"
            onClick={() => this.changeModalObj('안전개선 요청서 등록/조치', true, [<ImproveView key="InproveView" reqNo={text} />])}
          >
            {text}
          </StyledButton>
        ) : (
          ''
        ),
      width: '130px',
    },
    {
      title: '위험성평가번호',
      align: 'center',
      dataIndex: 'DA_REG_NO',
      render: (text, record) =>
        text ? (
          <StyledButton
            className="btn-link btn-sm"
            onClick={() =>
              this.changeModalObj('위험성 평가표 등록', true, [
                <DanestAdmin key="DANESTADMIN" improveDanger={{ IMPROVE: true, REG_DTTM: record.REQ_DT, REG_NO: text }} />,
              ])
            }
          >
            {text}
          </StyledButton>
        ) : (
          ''
        ),
      width: '150px',
    },
    {
      title: '문서상태',
      align: 'center',
      dataIndex: 'STTLMNT_STATUS_NAME',
      width: '130px',
    },
    {
      title: '발행일',
      align: 'center',
      dataIndex: 'REQ_DT',
      width: '130px',
    },
    {
      title: '조치일',
      align: 'center',
      dataIndex: 'C_DATE',
      width: '130px',
    },

    {
      title: '담당부서',
      align: 'center',
      dataIndex: 'ACP_DEPT_NM',
      width: '200px',
    },
    {
      title: '담당자',
      align: 'center',
      dataIndex: 'ACP_EMP_NM',
      width: '130px',
    },

    {
      title: '유형별',
      align: 'center',
      dataIndex: 'EACH_TYPE',
      width: '80px',
    },
    {
      title: '등급',
      align: 'center',
      dataIndex: 'GRADE',
      width: '80px',
    },

    {
      title: '제목',
      align: 'center',
      dataIndex: 'TITLE',
      width: '400px',
    },

    {
      title: '위치',
      align: 'center',
      dataIndex: 'LOC_NM',
      width: '130px',
    },

    {
      title: '요청부서',
      align: 'center',
      dataIndex: 'REQ_DEPT_NM',
      width: '200px',
    },

    {
      title: '요청자',
      align: 'center',
      dataIndex: 'REQ_EMP_NM',
      width: '80px',
    },
  ];

  render() {
    const { result } = this.props;
    const { searchParam, modalObj, categoryData, selectedRowKeys, selectedRows } = this.state;
    const list = (result && result.list && result.list.result) || [];
    return (
      <>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            <table className="table-border">
              <colgroup>
                <col width="13%" />
                <col width="20%" />
                <col width="13%" />
                <col width="20%" />
                <col width="14%" />
                <col width="20%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>발행번호</th>
                  <td>
                    <AntdSearchInput
                      style={{ width: '60%' }}
                      value={searchParam.REQ_NO || undefined}
                      placeholder="발행번호"
                      className="input-search-sm ant-search-inline mr5"
                      readOnly
                      onClick={() =>
                        this.changeModalObj('안전개선 검색', true, [
                          <SearchList
                            key="searchList"
                            modalVisible={() => this.changeModalObj()}
                            onClickRow={data => this.changeSearchParam('REQ_NO', data.REQ_NO)}
                          />,
                        ])
                      }
                      onChange={() =>
                        this.changeModalObj('안전개선 검색', true, [
                          <SearchList
                            key="searchList"
                            modalVisible={() => this.changeModalObj()}
                            onClickRow={data => this.changeSearchParam('REQ_NO', data.REQ_NO)}
                          />,
                        ])
                      }
                    />
                    <StyledButton className="btn-light btn-sm" onClick={() => this.changeSearchParam('REQ_NO', '')}>
                      reset
                    </StyledButton>
                  </td>
                  <th>발행일자</th>
                  <td>
                    <AntdRangeDatePicker
                      className="ant-picker-sm mr5"
                      defaultValue={[moment(`${toDay.substring(0, 4)}-01-01`), moment(toDay)]}
                      format="YYYY-MM-DD"
                      allowClear={false}
                      style={{ width: '100%' }}
                      onChange={(val1, val2) => this.onChangeRangeDatePicker('REQ', val2)}
                    />
                  </td>
                  <th>조치일자</th>
                  <td>
                    <AntdRangeDatePicker
                      className="ant-picker-sm mr5"
                      defaultValue={[undefined, undefined]}
                      format="YYYY-MM-DD"
                      style={{ width: '100%' }}
                      onChange={(val1, val2) => this.onChangeRangeDatePicker('ACP', val2)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>위치</th>
                  <td colSpan={2}>
                    <TreeSelect
                      style={{ width: '50%' }}
                      placeholder="전체"
                      value={searchParam.LOC || undefined}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={categoryData.LOC}
                      onChange={value => this.changeSearchParam('LOC', value)}
                      allowClear
                    />
                  </td>
                  <th>요청/조치</th>
                  <td colSpan={2}>
                    <AntdSelect
                      placeholder="전체"
                      allowClear
                      className="select-sm"
                      style={{ width: '50%' }}
                      onChange={val => this.changeSearchParam('STATUS', val)}
                    >
                      <AntdSelect.Option value="0">작성중</AntdSelect.Option>
                      <AntdSelect.Option value="1">요청/조치중</AntdSelect.Option>
                      <AntdSelect.Option value="2">조치완료</AntdSelect.Option>
                      <AntdSelect.Option value="5">요청반송</AntdSelect.Option>
                      <AntdSelect.Option value="3">완료승인</AntdSelect.Option>
                      <AntdSelect.Option value="4">부결</AntdSelect.Option>
                      <AntdSelect.Option value="-1">작성요망</AntdSelect.Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>조치부서</th>
                  <td colSpan={2}>
                    <AntdSearchInput
                      style={{ width: '70%' }}
                      value={searchParam.ACP_EMP_NO ? `${searchParam.ACP_DEPT_NM}  /  ${searchParam.ACP_EMP_NO}  /  ${searchParam.ACP_EMP_NM}` : undefined}
                      placeholder="조치부서"
                      className="input-search-sm ant-search-inline mr5"
                      readOnly
                      onClick={() =>
                        this.changeModalObj('안전 관계자', true, [
                          <AcpEmpComp
                            key="dangerHazard"
                            onClickRow={data =>
                              this.setState(
                                prevState => ({
                                  searchParam: {
                                    ...prevState.searchParam,
                                    ACP_EMP_NO: data.S3_EMP_NO,
                                    ACP_EMP_NM: `${data.S3_NAME} ${data.S3_POSITION}`,
                                    ACP_PHONE: data.S3_TEL,
                                    ACP_DEPT: data.DEPT_CD,
                                    ACP_DEPT_NM: data.DEPT_NAME,
                                    S1_EMP_NO: data.S1_EMP_NO,
                                    S2_EMP_NO: data.S2_EMP_NO,
                                    S3_EMP_NO: data.S3_EMP_NO,
                                  },
                                }),
                                this.changeModalObj,
                              )
                            }
                          />,
                        ])
                      }
                      onChange={() =>
                        this.changeModalObj('안전 관계자', true, [
                          <AcpEmpComp
                            key="dangerHazard"
                            onClickRow={data =>
                              this.setState(
                                prevState => ({
                                  searchParam: {
                                    ...prevState.searchParam,
                                    ACP_EMP_NO: data.S3_EMP_NO,
                                    ACP_EMP_NM: `${data.S3_NAME} ${data.S3_POSITION}`,
                                    ACP_PHONE: data.S3_TEL,
                                    ACP_DEPT: data.DEPT_CD,
                                    ACP_DEPT_NM: data.DEPT_NAME,
                                  },
                                }),
                                this.changeModalObj,
                              )
                            }
                          />,
                        ])
                      }
                    />
                    <StyledButton
                      className="btn-light btn-sm"
                      onClick={() =>
                        this.setState(prevState => ({
                          searchParam: { ...prevState.searchParam, ACP_EMP_NO: '', ACP_EMP_NM: '', ACP_PHONE: '', ACP_DEPT: '', ACP_DEPT_NM: '' },
                        }))
                      }
                    >
                      reset
                    </StyledButton>
                  </td>
                  <th>요청자</th>
                  <td colSpan={2}>
                    <AntdInput
                      className="ant-input-sm mr5"
                      placeholder="사번"
                      style={{ width: '35%' }}
                      value={searchParam.REQ_EMP_NO || undefined}
                      onChange={e => this.changeSearchParam('REQ_EMP_NO', e.target.value)}
                      allowClear
                    />
                    <AntdInput
                      className="ant-input-sm mr5"
                      placeholder="이름"
                      style={{ width: '35%' }}
                      value={searchParam.REQ_EMP_NM || undefined}
                      onChange={e => this.changeSearchParam('REQ_EMP_NM', e.target.value)}
                      allowClear
                    />
                    <StyledButton
                      className="btn-gray btn-sm"
                      onClick={() =>
                        this.changeModalObj('사원 검색', true, [
                          <UserSearchModal
                            key="userSearchModal"
                            visible
                            onClickRow={data =>
                              this.setState(
                                prevState => ({
                                  searchParam: { ...prevState.searchParma, REQ_EMP_NO: data.EMP_NO, REQ_EMP_NM: data.NAME_KOR },
                                }),
                                this.changeModalObj,
                              )
                            }
                          />,
                        ])
                      }
                    >
                      사원검색
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>유형별</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      style={{ width: '100%' }}
                      allowClear
                      placeholder="전체"
                      onChange={val => this.changeSearchParam('EACH_TYPE', val)}
                    >
                      {categoryData &&
                        categoryData.EACH_TYPE &&
                        categoryData.EACH_TYPE.map(item => (
                          <AntdSelect.Option key={item.NODE_ID} value={item.NAME_KOR}>
                            {item.NAME_KOR}
                          </AntdSelect.Option>
                        ))}
                    </AntdSelect>
                  </td>
                  <th>등급</th>
                  <td>
                    <AntdSelect
                      placeholder="전체"
                      className="select-sm"
                      allowClear
                      style={{ width: '100%' }}
                      onChange={val => this.changeSearchParam('GRADE', val)}
                    >
                      {categoryData &&
                        categoryData.GRADE &&
                        categoryData.GRADE.map(item => (
                          <AntdSelect.Option key={item.NODE_ID} value={item.NAME_KOR}>
                            {item.NAME_KOR}
                          </AntdSelect.Option>
                        ))}
                    </AntdSelect>
                  </td>
                  <th>4M</th>
                  <td>
                    <AntdSelect
                      placeholder="전체"
                      className="select-sm"
                      allowClear
                      style={{ width: '100%' }}
                      onChange={val => this.changeSearchParam('MM', val)}
                    >
                      {categoryData &&
                        categoryData.MM &&
                        categoryData.MM.map(item => (
                          <AntdSelect.Option key={item.NODE_ID} value={item.NAME_KOR}>
                            {item.NAME_KOR}
                          </AntdSelect.Option>
                        ))}
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} align="center">
                    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
                      <StyledButton className="btn-gray btn-sm mr5" onClick={this.search}>
                        검색
                      </StyledButton>
                      <StyledButton className="btn-light btn-sm mr5" onClick={() => this.showMessage('개발중입니다.')}>
                        목록인쇄
                      </StyledButton>
                      <StyledButton
                        className="btn-light btn-sm mr5"
                        onClick={() =>
                          selectedRows.length
                            ? this.changeModalObj('메일 작성', true, [
                                <SendMailForm key="sendMailForm" modalVisible={() => this.changeModalObj()} users={selectedRows} />,
                              ])
                            : this.showMessage('선택된 사원이 없습니다.')
                        }
                      >
                        선택메일발송
                      </StyledButton>
                    </StyledButtonWrapper>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <br />
          <br />
          <AntdTable
            columns={this.columns}
            rowSelection={{
              selectedRowKeys,
              hideSelectAll: true,
              onChange: (rowKeys, rows) => this.setState({ selectedRowKeys: rowKeys, selectedRows: rows }),
            }}
            bordered
            rowKey="REQ_NO"
            footer={() => <span>{`${list.length || 0} 건`}</span>}
            scroll={{ x: '100%' }}
            dataSource={list || []}
            onRow={record => ({
              onClick: () => {
                console.debug(record);
              },
            })}
          />
        </StyledContentsWrapper>
        <AntdModal
          title={modalObj.title || ''}
          visible={modalObj.visible}
          width={1100}
          onCancel={() => this.changeModalObj()}
          footer={
            <StyledButton className="btn-gray btn-sm mr5 ml5" onClick={() => this.changeModalObj()}>
              닫기
            </StyledButton>
          }
          destroyOnClose
        >
          {modalObj.content}
        </AntdModal>
      </>
    );
  }
}

ListComp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  removeReduxState: PropTypes.func,
  profile: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
};
ListComp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  removeReduxState: () => {},
  profile: {},
  submitHandlerBySaga: () => {},
};

export default ListComp;

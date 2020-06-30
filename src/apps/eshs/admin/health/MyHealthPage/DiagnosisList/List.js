import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Checkbox, Popover } from 'antd';
import styled from 'styled-components';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import UserSearchModal from 'apps/eshs/common/userSearchModal';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import SelfEmpResultDetail from 'apps/eshs/admin/health/MyHealthPage/SelfEmpResultDetail';
import ConsultingForm from 'apps/eshs/admin/health/MyHealthPage/ConsultingForm';
import ConsultDeleteForm from 'apps/eshs/admin/health/MyHealthPage/ConsultingForm/deleteForm';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');

const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
const ConsultStyle = styled.div`
  width: 100%;
  height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
`;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearList: [],
      searchParam: {
        CHK_YEAR: currentYear,
      },
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, spinningOn, spinningOff } = this.props;

    spinningOn();

    const yearList = [];
    for (let i = currentYear; i >= 1998; i--) {
      yearList.push(i);
    }
    this.setState({ yearList }, spinningOff);
  }

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;
    this.setState({ selectedRowKeys: [] });
    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthDiagnosisList`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];
    return getCallDataHandler(id, apiAry, spinningOff);
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam };
    });
  };

  onChangeRangeDatePicker = (val1, val2) => {
    if (val2.length === 2) {
      const { searchParam } = this.state;
      this.setState({
        searchParam: { ...searchParam, FROM_DT: val2[0], TO_DT: val2[1] },
      });
    }
  };

  modalVisible = () => {
    const {
      modalObj,
      modalObj: { modalVisible },
    } = this.state;
    if (modalVisible) {
      return this.setState({
        modalObj: { modalContent: [], modalTitle: '', modalVisible: !modalVisible },
      });
    }
    return this.setState({
      modalObj: { ...modalObj, modalVisible: !modalVisible },
    });
  };

  empNoColumn = {
    title: '사번',
    dataIndex: 'EMP_NO',
    width: '7%',
    align: 'center',
    render: (text, record) => ({
      children: (
        <StyledButton
          className="btn-link btn-sm"
          onClick={() =>
            this.setState(
              {
                modalObj: {
                  modalTitle: '개인진단현황',
                  modalContent: [<SelfEmpResultDetail key="SelfEmpResultDetail" userSearch={false} defaultUser={record.USER_ID} chkYear={record.CHK_YEAR} />],
                },
              },
              this.modalVisible,
            )
          }
        >
          {text}
        </StyledButton>
      ),
      props: { rowSpan: record.ROWSPAN },
    }),
  };

  rowSelectionOnChange = rowKey => {
    const { selectedRowKeys } = this.state;
    this.setState({
      selectedRowKeys: selectedRowKeys.indexOf(rowKey) > -1 ? selectedRowKeys.filter(key => key !== rowKey) : selectedRowKeys.concat(rowKey),
    });
  };

  onSelectAll = () => {
    const { selectedRowKeys } = this.state;
    const { result } = this.props;
    const list = (result && result.List && result.List.list) || [];

    this.setState({
      selectedRowKeys: list.length === selectedRowKeys.length ? [] : list.map(item => item.rowKey),
    });
  };

  columns = [
    {
      title: '체크박스',
      dataIndex: 'rowKey',
      render: (text, record) => (
        <Checkbox
          className="ant-checkbox-wrapper"
          checked={this.state.selectedRowKeys && this.state.selectedRowKeys.indexOf(text) > -1}
          defaultChecked={false}
          onChange={() => this.rowSelectionOnChange(text)}
        />
      ),
      align: 'center',
    },
    { title: '소속', dataIndex: 'DEPT_NAME_KOR', render: (text, record) => text, align: 'center' },
    { title: '이름', dataIndex: 'NAME_KOR', render: (text, record) => text, align: 'center' },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      render: (text, record) => (
        <StyledButton
          className="btn-link btn-sm"
          onClick={() =>
            this.setState(
              {
                modalObj: {
                  modalTitle: '개인진단현황',
                  modalContent: [<SelfEmpResultDetail key="SelfEmpResultDetail" userSearch={false} defaultUser={record.USER_ID} chkYear={record.CHK_YEAR} />],
                },
              },
              this.modalVisible,
            )
          }
        >
          {text}
        </StyledButton>
      ),
      align: 'center',
    },
    {
      title: '검진기관',
      dataIndex: 'DISEASE_NM',
      render: (text, record) => (
        <>
          {this.oriDiseaseList.indexOf(record.ORI_DISEASE_NM) > -1 ? (
            <span>
              {text} <br />
              {`(${record.ORI_DISEASE_NM})`}
            </span>
          ) : (
            <span>{text}</span>
          )}
        </>
      ),
      align: 'center',
    },
    { title: '질환등급', dataIndex: 'DISEASE_GRADE', render: (text, record) => text, align: 'center' },
    { title: '기관등급', dataIndex: 'RESULT', render: (text, record) => text, align: 'center' },
    { title: '일시', dataIndex: 'REG_DTTM', rowSpan: 1, render: (text, record) => text, align: 'center' },
    {
      title: '내용',
      dataIndex: 'CONSULT',
      rowSpan: 1,
      render: (text, record) =>
        text && (
          <Popover title="상담내용" trigger="hover" content={<div dangerouslySetInnerHTML={{ __html: text }} />}>
            <ConsultStyle
              dangerouslySetInnerHTML={{ __html: text }}
              onClick={() =>
                this.setState(
                  {
                    modalObj: {
                      modalTitle: '상담 내용',
                      modalContent: [<ConsultDeleteForm key="ConsultDeleteForm" data={record} modalVisible={this.modalVisible} saveAfter={this.getList} />],
                    },
                  },
                  this.modalVisible,
                )
              }
            />
          </Popover>
        ),
      className: 'td-pointer',
      align: 'left',
    },
  ];

  oriDiseaseList = ['간담도계주의', '간담도계질환', '간기능저하', '당뇨질환', '이상지질혈증', '이상지질혈증의심', '당뇨질환의심'];

  render() {
    const { result } = this.props;
    const { yearList, modalObj, selectedRowKeys } = this.state;
    const list = (result && result.List && result.List.list) || [];

    return (
      <>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <AntdSelect
                defaultValue={currentYear}
                className="select-sm mr5"
                style={{ width: 100 }}
                onChange={val => this.onChangeSearchParam('CHK_YEAR', val)}
              >
                {yearList.map(year => (
                  <AntdSelect.Option key={year} value={year}>{`${year}년`}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="지역전체"
                onChange={val => this.onChangeSearchParam('WORK_AREA', val)}
              >
                <AntdSelect.Option value="CP">청주</AntdSelect.Option>
                <AntdSelect.Option value="GP">구미</AntdSelect.Option>
                <AntdSelect.Option value="AA">영동</AntdSelect.Option>
                <AntdSelect.Option value="GLOBAL">해외</AntdSelect.Option>
              </AntdSelect>
              <UserSearchModal visible onClickRow={record => this.onChangeSearchParam('userId', record.USER_ID)} />
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 200 }}
                allowClear
                placeholder="자가진단질환별전체"
                onChange={val => this.onChangeSearchParam('TITLE', val)}
              >
                <AntdSelect.Option value="'고혈압','고혈압(2차)','고혈압의심','고혈압주의'">고혈압</AntdSelect.Option>
                <AntdSelect.Option value="'간장질환','간장질환(2차)','간기능저하','간장질환주의','간담도계주의','간장질환의심'">간장질환</AntdSelect.Option>
                <AntdSelect.Option value="'고지혈증','고지혈','이상지질혈증','이상지질혈증주의','고지혈주의','이상지질혈증의심'">고지혈</AntdSelect.Option>
                <AntdSelect.Option value="'당뇨','당뇨(2차)','당뇨질환','당뇨질환의심','당뇨주의'">당뇨</AntdSelect.Option>
                <AntdSelect.Option value="'빈혈','빈혈(2차)','빈혈주의','빈혈증','빈혈증의심'">빈혈</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 200 }}
                allowClear
                placeholder="검진결과전체"
                onChange={val => this.onChangeSearchParam('GRADE', val)}
              >
                <AntdSelect.Option value="R1">R1</AntdSelect.Option>
                <AntdSelect.Option value="R2">R2</AntdSelect.Option>
                <AntdSelect.Option value="C">C</AntdSelect.Option>
                <AntdSelect.Option value="C2">C2</AntdSelect.Option>
                <AntdSelect.Option value="CN">CN</AntdSelect.Option>
                <AntdSelect.Option value="D2">D2</AntdSelect.Option>
                <AntdSelect.Option value="DN">DN</AntdSelect.Option>
                <AntdSelect.Option value="U">U</AntdSelect.Option>
                <AntdSelect.Option value="정상">정상</AntdSelect.Option>
                <AntdSelect.Option value="정상1">C2-&gt;정상</AntdSelect.Option>
                <AntdSelect.Option value="정상2">D2-&gt;정상</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="등급전체"
                onChange={val => this.onChangeSearchParam('RESULT', val)}
              >
                <AntdSelect.Option value="정상">정상</AntdSelect.Option>
                <AntdSelect.Option value="1등급">1등급</AntdSelect.Option>
                <AntdSelect.Option value="2등급">2등급</AntdSelect.Option>
                <AntdSelect.Option value="3등급">3등급</AntdSelect.Option>
              </AntdSelect>
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
              <StyledButton className="btn-gray btn-sm mr5" onClick={() => message.info(<MessageContent>미구현</MessageContent>)}>
                엑셀받기
              </StyledButton>
              <StyledButton
                className="btn-primary btn-sm"
                onClick={() =>
                  0 in selectedRowKeys
                    ? this.setState(
                        {
                          modalObj: {
                            modalTitle: '메일작성',
                            modalContent: [
                              <ConsultingForm
                                key="ConsultingForm"
                                list={list.filter(item => selectedRowKeys.indexOf(item.rowKey) > -1)}
                                modalVisible={this.modalVisible}
                                saveAfter={this.getList}
                              />,
                            ],
                          },
                        },
                        this.modalVisible,
                      )
                    : message.info(<MessageContent>선택된 사람이 없습니다.</MessageContent>)
                }
              >
                메일 및 상담내용작성
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="5%" />
                <col width="15%" />
                <col width="7%" />
                <col width="7%" />
                <col width="10%" />
                <col width="7%" />
                <col width="7%" />
                <col width="9%" />
                <col width="33%" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2}>
                    <Checkbox
                      className="ant-checkbox-wrapper"
                      checked={0 in list && selectedRowKeys.length === list.length}
                      defaultChecked={false}
                      onChange={this.onSelectAll}
                    />
                  </th>
                  <th rowSpan={2}>소속</th>
                  <th rowSpan={2}>이름</th>
                  <th rowSpan={2}>사번</th>
                  <th rowSpan={2}>검진기관 질환</th>
                  <th rowSpan={2}>질환등급</th>
                  <th rowSpan={2}>관리등급</th>
                  <th colSpan={2}>상담</th>
                </tr>
                <tr>
                  <th>일시</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <td colSpan={9}>{`${list.length} 건`}</td>
                </tr>
              </tfoot>
              <tbody>
                {list.map(item => {
                  if (item.SEQ === 1) {
                    return (
                      <tr key={`row_${item.rowKey}`}>
                        {this.columns.map((col, idx) => (
                          <td
                            key={`col_${item.rowKey}_${idx}`}
                            align={col.align || 'center'}
                            rowSpan={col.rowSpan || item.ROWSPAN}
                            className={col.className || ''}
                          >
                            {typeof col.render === 'function' ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}
                          </td>
                        ))}
                      </tr>
                    );
                  }
                  return (
                    <tr key={`row_${item.rowKey}`}>
                      {this.columns.map((col, idx) => {
                        if (col.dataIndex === 'REG_DTTM' || col.dataIndex === 'CONSULT') {
                          return (
                            <td key={`col_${item.rowKey}_${idx}`} align={col.align || 'center'} className={col.className || ''}>
                              {typeof col.render === 'function' ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}
                            </td>
                          );
                        }
                        return null;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </StyledHtmlTable>
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};
List.defaultProps = {
  result: {},
  sagaKey: '',
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default List;

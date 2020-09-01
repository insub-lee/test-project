import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Table, DatePicker, Select } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

import UserSearchModal from 'apps/eshs/common/userSearchModal/ModalContent';
import ImproveView from 'apps/eshs/admin/safety/safetyImprove/Input';
import DanestAdmin from 'apps/eshs/admin/safety/Danger/danestAdmin';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const toDay = moment(new Date()).format('YYYY-MM-DD');

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);
const AntdSelect = StyledSelect(Select);

class PaymentListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {
        REQ_FROM: `${toDay.substring(0, 4)}-01-01`,
        REQ_TO: toDay,
        REQ_EMP_NO: undefined,
        MASURE_EMP_NO: undefined,
        STATUS: '1',
      },
      modalObj: {
        title: '',
        visible: false,
        content: [],
      },
    };
  }

  componentDidMount = () => {
    const { spinningOn, profile, isAdmin } = this.props;
    spinningOn();
    const deptFlg = profile.DEPT_ID === 73161; // 환경안전팀 true/false
    const addSearchParam = {};
    if (isAdmin) {
      // 시스템 관리자
      addSearchParam.REQ_EMP_NO = profile.EMP_NO || undefined;
      addSearchParam.MASURE_EMP_NO = profile.EMP_NO || undefined;
    } else {
      // 일반 사용자
      addSearchParam.STATUS = deptFlg ? '1' : "2', '5";
      addSearchParam[deptFlg ? 'REQ_EMP_NO' : 'MASURE_EMP_NO'] = profile.EMP_NO || undefined;
    }

    this.setState(
      prevState => ({
        searchParam: { ...prevState.searchParam, ...addSearchParam },
      }),
      this.search,
    );
  };

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

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

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
    const { result, isAdmin } = this.props;
    const { searchParam, modalObj } = this.state;
    const list = (result && result.list && result.list.result) || [];
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <AntdSelect
                placeholder="문서 상태 전체"
                allowClear
                value={searchParam.STATUS || undefined}
                className="select-sm mr5"
                style={{ width: '150px' }}
                onChange={val => this.changeSearchParam('STATUS', val)}
              >
                <AntdSelect.Option value="1">요청완료/조치중</AntdSelect.Option>
                <AntdSelect.Option value="2', '5">조치완료/반송</AntdSelect.Option>
                <AntdSelect.Option value="3">승인</AntdSelect.Option>
                <AntdSelect.Option value="4">부결</AntdSelect.Option>
              </AntdSelect>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                defaultValue={[moment(searchParam.REQ_FROM), moment(searchParam.REQ_TO)]}
                format="YYYY-MM-DD"
                style={{ width: '200' }}
                allowClear={false}
                onChange={(val1, val2) => this.onChangeRangeDatePicker('REQ', val2)}
              />
              {isAdmin && (
                <>
                  <AntdSearchInput
                    style={{ width: '150px' }}
                    className="input-search-sm mr5"
                    value={searchParam.REQ_EMP_NO || undefined}
                    placeholder="요청자 사번"
                    onSearch={() =>
                      this.changeModalObj('사원 검색', true, [
                        <UserSearchModal
                          key="userSearchModal"
                          visible
                          onClickRow={data => {
                            this.changeSearchParam('REQ_EMP_NO', data.EMP_NO);
                            this.changeModalObj();
                          }}
                        />,
                      ])
                    }
                    onChange={e => this.changeSearchParam('REQ_EMP_NO', e.target.value)}
                  />
                  <AntdSearchInput
                    style={{ width: '150px' }}
                    className="input-search-sm mr5"
                    value={searchParam.MASURE_EMP_NO || undefined}
                    placeholder="조치자 사번"
                    onSearch={() =>
                      this.changeModalObj('사원 검색', true, [
                        <UserSearchModal
                          key="userSearchModal"
                          visible
                          onClickRow={data => {
                            this.changeSearchParam('MASURE_EMP_NO', data.EMP_NO);
                            this.changeModalObj();
                          }}
                        />,
                      ])
                    }
                    onChange={e => this.changeSearchParam('MASURE_EMP_NO', e.target.value)}
                  />
                </>
              )}
            </div>

            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.search}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>

          <AntdTable
            columns={this.columns}
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

PaymentListComp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  removeReduxState: PropTypes.func,
  profile: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  isAdmin: PropTypes.bool,
};
PaymentListComp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  removeReduxState: () => {},
  profile: {},
  submitHandlerBySaga: () => {},
};

export default PaymentListComp;

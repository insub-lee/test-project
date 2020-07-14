import React, { Component } from 'react';
import { Table, DatePicker, Modal, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

import EiMaterial from 'apps/eshs/user/environment/eia/eiMaterial'; // 원부재료
import EiStatement from 'apps/eshs/user/environment/eia/eiStatement'; // 환경영향평가서
import EiImportantAssesment from 'apps/eshs/user/environment/eia/eiImportantAssesment'; // 중대환경영향등록부

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

const now = new Date();
const currentYear = now.getFullYear().toString();

const fromDate = moment(new Date()).format('YYYY-MM-DD');
const toDate = moment(`${currentYear}-01-01`).format('YYYY-MM-DD');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {
        TO_DATE: toDate,
        FROM_DATE: fromDate,
      },
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
    };
  }

  componentDidMount() {
    const { spinningOn } = this.props;

    spinningOn();

    this.getInitData();
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler, spinningOff } = this.props;
    const { searchParam } = this.state;
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/eshsEiMaterialApprovalList`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, spinningOff);
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;

    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/eshsEiMaterialApprovalList`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];
    return getCallDataHandler(id, apiAry, spinningOff);
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  onChangeRangeDatePicker = (val1, val2) => {
    if (val2.length === 2) {
      const { searchParam } = this.state;
      this.setState({
        searchParam: { ...searchParam, TO_DATE: val2[0], FROM_DATE: val2[1] },
      });
    }
  };

  modalVisible = (title = '', content = []) => {
    const {
      modalObj: { modalVisible },
    } = this.state;
    return this.setState({
      modalObj: {
        modalVisible: !modalVisible,
        modalContent: content,
        modalTitle: title,
      },
    });
  };

  columns = [
    {
      title: '신청번호',
      dataIndex: 'REQ_NO',
      width: 100,
      align: 'center',
    },
    {
      title: '결재상태',
      dataIndex: 'SEQ',
      width: 150,
      align: 'center',
      render: text => {
        switch (text) {
          case '2':
            return '기안완료';
          case '3':
            return '검토자 승인 완료';
          case '4':
            return '1차 결재 완료';
          default:
            return '승인 완료';
        }
      },
    },
    {
      title: '지역',
      dataIndex: 'WORK_AREA_NM',
      width: 50,
      align: 'center',
    },
    {
      title: '작성자',
      dataIndex: 'FROM_EMP_NM',
      width: 80,
      align: 'center',
    },
    {
      title: '소속',
      dataIndex: 'DEPT_NAME_KOR',
      width: 200,
      align: 'center',
      render: (text, record) => {
        if (!record.DEPT_ID) {
          return (
            <StyledButton className="btn-link btn-sm" onClick={() => this.showMessage('TO_BE로 이관된 부서정보가 없습니다.')}>
              {text}
            </StyledButton>
          );
        }
        return text;
      },
    },
    {
      title: '공장/FAB/건물명',
      dataIndex: 'FROM_BUILDING_NM',
      width: 200,
      align: 'center',
    },
    {
      title: '조사대상영역',
      dataIndex: 'TO_BUILDING_NM',
      width: 150,
      align: 'center',
    },
    {
      title: '환경영향평가내용',
      children: [
        {
          title: '원부재료',
          align: 'center',
          width: 80,
          render: (text, record) => {
            if (record.DEPT_ID) {
              return (
                <StyledButton className="btn-link btn-sm" onClick={() => this.modalVisible('원부재료', [<EiMaterial searchData={record} />])}>
                  상세
                </StyledButton>
              );
            }
            return '';
          },
        },
        {
          title: '환경영향평가서',
          align: 'center',
          width: 110,
          render: (text, record) => {
            if (record.DEPT_ID) {
              return (
                <StyledButton className="btn-link btn-sm" onClick={() => this.modalVisible('환경영향평가서', [<EiStatement searchData={record} />])}>
                  상세
                </StyledButton>
              );
            }
            return '';
          },
        },
        {
          title: '중대환경영향등록부',
          align: 'center',
          width: 130,
          render: (text, record) => {
            if (record.DEPT_ID) {
              return (
                <StyledButton
                  className="btn-link btn-sm"
                  onClick={() => this.modalVisible('중대환경영향등록부', [<EiImportantAssesment searchData={record} />])}
                >
                  상세
                </StyledButton>
              );
            }
            return '';
          },
        },
      ],
      width: 320,
      align: 'center',
    },
    {
      title: '결제유무',
      width: 150,
      align: 'center',
      render: (text, record) => {
        const { profile } = this.props;
        if (profile.USER_ID === record.APPROVAL_USER_ID && record.SEQ !== '1') {
          return (
            <StyledButtonWrapper className="btn-wrap-inline">
              <Popconfirm
                title={`선택하신 [${record.REQ_NO}]를 승인 처리 하시겠습니까?`}
                // onConfirm={() => this.handleAction('SANGSIN')}
                okText="Yes"
                cancelText="No"
              >
                <StyledButton className="btn-link btn-sm mr5">승인</StyledButton>
              </Popconfirm>
              /
              <Popconfirm title={`선택하신 [${record.REQ_NO}]를 부결처리 하시겠습니까?`} okText="Yes" cancelText="No">
                <StyledButton className="btn-link btn-sm ml5">부결</StyledButton>
              </Popconfirm>
            </StyledButtonWrapper>
          );
        }
        return '';
      },
    },
  ];

  getWorkName = (list, nodeId) => {
    const fIdx = (list && list.findIndex(item => item.NODE_ID === nodeId)) || -1;

    return fIdx > -1 ? list[fIdx].NAME_KOR : '';
  };

  render() {
    const { result } = this.props;
    const { modalObj } = this.state;
    const list = (result && result.List && result.List.list) || [];

    return (
      <>
        <AntdModal
          width={1200}
          visible={modalObj.modalVisible}
          title={modalObj.modalTitle || ''}
          onCancel={() => this.modalVisible()}
          destroyOnClose
          footer={
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
              <StyledButton className="btn-light btn-sm" onClick={() => this.modalVisible()}>
                닫기
              </StyledButton>
            </StyledButtonWrapper>
          }
        >
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                format="YYYY-MM-DD"
                style={{ width: 325 }}
                allowClear={false}
                defaultValue={[moment(toDate), moment(fromDate)]}
                onChange={(val1, val2) => this.onChangeRangeDatePicker(val1, val2)}
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            footer={() => <span>{`${(list && list.length) || 0} 건`}</span>}
            dataSource={list || []}
            bordered
            rowKey="REQ_NO"
            scroll={{ x: '100%' }}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  profile: PropTypes.object,
};

List.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  result: {},
  getCallDataHandler: () => {},
  profile: {},
};

export default List;

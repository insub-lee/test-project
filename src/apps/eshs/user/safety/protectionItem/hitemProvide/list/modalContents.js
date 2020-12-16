import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Input, DatePicker, InputNumber, Modal, Table, message, Radio } from 'antd';
import StyledInput from 'commonStyled/Form/StyledInput';
// import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
// import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import MessageContent from 'components/Feedback/message.style2';

// import moment from 'moment';
const today = moment(new Date()).format('YYYYMMDD');
const AntdModal = StyledContentsModal(Modal);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTable = StyledLineTable(Table);
const AntdTextArea = AntdInput;
class ModalContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempList: [],
    };
  }

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes, profile } = this.props;
    const data = this.props.result?.proviceDetails?.result[0];

    const apiAry = {
      key: 'stockList',
      url: `/api/eshs/v1/common/protection-provide-detail-stockList?REQ_CD=${data?.REQ_CD}&HITEM_CD=${data?.HITEM_CD}`,
      type: 'GET',
    };

    return getCallDataHandlerReturnRes(id, apiAry, (_, res) => {
      const { list } = res;

      return this.setState(
        {
          // tempList: list || [],
          tempList: list.map(row => ({ ...row, dept_cd: data?.DEPT_CD, createEmpNo: profile.EMP_NO })),
        },
        // () => this.handleInputChange('dept_cd', data?.DEPT_CD),
      );
    });
  };

  handleInputChange = (key, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, key, value);
    this.setState(prevState => ({
      tempList: prevState.tempList.map((item, idx) => (idx === 0 ? { ...item, [key]: value } : item)),
    }));
  };

  handleDateChange = date => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'TARGET_DT', date);
  };

  handleRequestChange = (key, value, index) =>
    this.setState(prevState => ({
      tempList: prevState.tempList.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)),
    }));

  handleUpdate = () => {
    const { sagaKey: id, submitHandlerBySaga, handleModalClose } = this.props;
    const { tempList } = this.state;

    for (let i = 0; i < tempList.length; i += 1) {
      if (tempList[0].conf_status !== '2' && tempList[0].conf_status !== '3') {
        return message.info(<MessageContent>상태를 선택해야 합니다.</MessageContent>);
      }

      if (tempList[i].gi_qty !== 0 && tempList[i].posting_dt === '') {
        return message.info(<MessageContent>출고일을 입력해야 합니다.</MessageContent>);
      }

      /*
      if (tempList[i].gi_qty !== 0 && chk_stock.value =="chk" && tempList[i].gi_qty - tempList[i].stock_qty > 0) {
        return message.info(<MessageContent>재고가 출고량보다 작습니다.</MessageContent>);
      }
      */
    }
    
    return submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/protection-provide-detail-stockList', tempList, (afterId, res) => {
      if (res && res.code === 200) {
        message.info(<MessageContent>수정되었습니다.</MessageContent>);
        handleModalClose();
        return this.getDataSource();
      }
      return message.info(<MessageContent>수정에 실패하였습니다.</MessageContent>);
    });
  };

  columns = [
    {
      title: '삭제',
      align: 'center',
      width: '10%',
      dataIndex: '',
    },
    {
      title: '단가',
      align: 'center',
      width: '20%',
      dataIndex: 'unitprice',
    },
    {
      title: '재고',
      align: 'center',
      width: '20%',
      dataIndex: 'stock_qty',
    },
    {
      title: '출고수량',
      align: 'center',
      width: '25%',
      dataIndex: 'gi_qty',
      render: (text, record, index) =>
        this.props.isModified ? (
          <AntdInputNumber className="input-number-sm" min={0} value={text} onChange={value => this.handleRequestChange('gi_qty', value, index)} />
        ) : null,
    },
    {
      title: '출고일',
      align: 'center',
      width: '25%',
      dataIndex: 'posting_dt',
      render: (text, record, index) =>
        this.props.isModified ? (
          <AntdDatePicker
            className="ant-picker-xs"
            value={text ? moment(today) : undefined}
            onChange={(_, valueStr) => this.handleRequestChange('posting_dt', valueStr, index)}
          />
        ) : null,
    },
  ];

  render() {
    const { columns, handleDateChange } = this;
    const { handleModalClose, isModified, result } = this.props;
    const data = result?.proviceDetails?.result[0];

    return (
      <>
        <ContentsWrapper>
          <div className="tableWrapper">
            <StyledHtmlTable>
              <div style={{ padding: '10px' }}>
                <table>
                  <colgroup>
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="25%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>신청일</th>
                      <th>신청팀</th>
                      <th>신청자</th>
                      <th>결재자</th>
                      <th>지급요청일</th>
                      <th>품목</th>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>{data?.REQ_DT || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.DEPT_NM || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.REQ_EMPNM || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.STTLMNT_EMP_NM || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.TARGET_DT || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.KIND || ''}</td>
                    </tr>
                    <tr>
                      <th>모델</th>
                      <th>사이즈</th>
                      <th>Vendor</th>
                      <th>신청수량</th>
                      <th>신청사유</th>
                      <th>사용장소</th>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>{data?.MODEL || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.SIZE1 || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.VENDOR_NM || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.REQQTY || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.REQ_COMMENTS || ''}</td>
                      <td style={{ textAlign: 'center' }}>{data?.PLACE || ''}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </StyledHtmlTable>
          </div>
          <div style={{ padding: '10px' }}>
            <AntdTable columns={columns} dataSource={this.state?.tempList || []} />
          </div>
          <div className="tableWrapper">
            <StyledHtmlTable>
              <div style={{ padding: '10px' }}>
                <table>
                  <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>상태</th>
                      <th>Commentes</th>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <Radio.Group style={{ paddingLeft: 10 }} onChange={e => this.handleInputChange('conf_status', e.target.value)}>
                          <Radio value="2">진행</Radio>
                          <Radio value="3">완료</Radio>
                        </Radio.Group>
                      </td>
                      <td style={{ textAlign: 'left' }}>
                        <AntdTextArea onChange={e => this.handleInputChange('conf_comments', e.target.value)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </StyledHtmlTable>
          </div>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            {isModified && (
              <StyledButton className="btn-primary mr5" onClick={this.handleUpdate}>
                저장
              </StyledButton>
            )}
            <StyledButton className="btn-light" onClick={handleModalClose}>
              취소
            </StyledButton>
          </div>
        </ContentsWrapper>
      </>
    );
  }
}

ModalContents.propTypes = {
  profile: PropTypes.object,
  handleModalClose: PropTypes.func,
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  getDataSource: PropTypes.func,
  isModified: PropTypes.bool,
  submitHandlerBySaga: PropTypes.func,
  result: PropTypes.object,
  getCallDataHandlerReturnRes: PropTypes.func,
};

ModalContents.defatulProps = {
  profile: {},
  handleModalClose: null,
  getDataSource: null,
  isModified: false,
  rowData: {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default ModalContents;

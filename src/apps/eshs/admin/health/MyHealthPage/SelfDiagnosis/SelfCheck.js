import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, DatePicker, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import UserSearchModal from 'apps/eshs/common/userSearchModal';
import ListModalContent from 'apps/eshs/admin/health/MyHealthPage/SelfDiagnosis/List';
import moment from 'moment';

const AntdInput = StyledInput(Input);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdModal = StyledAntdModal(Modal);
const AntdSearchInput = StyledSearchInput(Input.Search);

const now = moment(new Date()).format('YYYY-MM-DD');

class SelfCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectUser: {},
      modalContent: [],
      modalVisible: false,
      userSearch: [
        <UserSearchModal colData={(this.props.profile && this.props.profile.EMP_NO) || ''} onClickRow={record => this.setState({ selectUser: record })} />,
      ],
    };
  }

  componentDidMount() {
    const { sagaKey: id, setFormData, profile, formData } = this.props;
    setFormData(id, { ...formData, ...profile, SE_DT: now, viewType: 'INPUT' });
  }

  changeFormData = (target, value) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, target, value);
  };

  modalVisible = () => {
    const { modalVisible } = this.state;

    if (modalVisible) {
      return this.setState({
        modalVisible: !modalVisible,
        modalContent: [],
      });
    }

    return this.setState({
      modalVisible: !modalVisible,
      modalContent: [<ListModalContent onClickRow={this.modalRowClick} />],
    });
  };

  modalRowClick = record => {
    this.changeFormData('selectRow', record);
    this.modalVisible();
  };

  handleAction = type => {
    const { sagaKey, setFormData, submitHandlerBySaga, spinningOn, spinningOff, formData, profile } = this.props;
    spinningOn();
    const selectRow = (formData && formData.selectRow) || {};
    let msg = '';
    switch (type) {
      case 'SEARCH':
        if (JSON.stringify(selectRow) === '{}') {
          msg = '선택된 등록번호가 없습니다.';
          break;
        }
        this.setState(
          {
            userSearch: [],
          },
          () =>
            this.setState({
              userSearch: [<UserSearchModal colData={(selectRow && selectRow.EMP_NO) || ''} onClickRow={record => this.setState({ selectUser: record })} />],
            }),
        );
        setFormData(sagaKey, { ...selectRow, viewType: 'MODIFY' });
        break;
      case 'SAVE':
        return submitHandlerBySaga(
          sagaKey,
          'POST',
          '/api/eshs/v1/common/health/eshsMyHealthPage',
          { PARAM: { ...formData, REG_USER_ID: profile.USER_ID } },
          (id, res) => {
            if (res && res.result > 0) {
              this.showMessage('저장하였습니다.');
              setFormData(id, { ...res.formData, viewType: 'MODIFY' });
              return spinningOff();
            }

            spinningOff();
            return this.showMessage('저장 실패!');
          },
        );
      case 'UPDATE':
        return submitHandlerBySaga(
          sagaKey,
          'PUT',
          '/api/eshs/v1/common/health/eshsMyHealthPage',
          { PARAM: { ...formData, UPD_USER_ID: profile.USER_ID } },
          (id, res) => {
            if (res && res.result > 0) {
              this.showMessage('수정하였습니다.');
              setFormData(id, { ...res.formData, viewType: 'MODIFY' });
              return spinningOff();
            }

            spinningOff();
            return this.showMessage('수정 실패!');
          },
        );
      default:
        return spinningOff();
    }

    if (msg) {
      this.showMessage(msg);
    }
    return spinningOff();
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  switchStatus = text => {
    if (!text) return '작성요망';
    switch (text) {
      case '0':
        return '작성중';
      case '1':
        return '요청완료/조치중';
      case '2':
        return '조치완료';
      case '3':
        return '완료승인';
      case '4':
        return '부결';
      case '5':
        return '요청반송/재작성';
      default:
        return '해당사항 없음';
    }
  };

  render() {
    const { formData, sagaKey: id, setFormData } = this.props;
    const { selectUser, modalVisible, modalContent, userSearch } = this.state;
    const viewType = (formData && formData.viewType) || '';
    return (
      <StyledContentsWrapper>
        <AntdModal
          width={900}
          visible={modalVisible}
          title="자가진단 검색"
          onCancel={this.modalVisible}
          destroyOnClose
          footer={[
            <StyledButton className="btn-light" onClick={this.modalVisible}>
              닫기
            </StyledButton>,
          ]}
        >
          {modalContent}
        </AntdModal>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <AntdSearchInput
              style={{ width: '150PX' }}
              value={(formData && formData.selectRow && formData.selectRow.SE_NO) || formData.SE_NO || ''}
              className="input-search-sm ant-search-inline mr5"
              readOnly
              onClick={this.modalVisible}
              onChange={this.modalVisible}
            />
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm mr5" onClick={() => this.handleAction('SEARCH')}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.handleAction(viewType === 'INPUT' ? 'SAVE' : 'UPDATE')}>
              {viewType === 'INPUT' ? '저장' : '수정'}
            </StyledButton>
          </div>
          <div className="div-comment" style={{ display: 'inline-block' }}>
            {`[ 문서상태 : ${this.switchStatus(formData.STATUS)} ]`}
          </div>
        </StyledCustomSearchWrapper>
        <StyledHtmlTable>
          <table className="table-border">
            <colgroup>
              <col width="12%" />
              <col width="13%" />
              <col width="12%" />
              <col width="13%" />
              <col width="12%" />
              <col width="13%" />
              <col width="12%" />
              <col width="13%" />
            </colgroup>
            <thead></thead>
            {formData.BIGO && (
              <tfoot>
                <tr>
                  <td colSpan={8}>
                    <div dangerouslySetInnerHTML={{ __html: formData.BIGO }} />
                  </td>
                </tr>
              </tfoot>
            )}
            <tbody>
              <tr>
                <th>검진일자</th>
                <td>
                  <AntdDatePicker
                    value={formData.SE_DT ? moment(formData.SE_DT) : ''}
                    className="ant-picker"
                    onChange={(date, strDate) => this.changeFormData('SE_DT', strDate)}
                  />
                </td>
                <th>소속부서</th>
                <td colSpan={2}>{formData.DEPT_NAME_KOR}</td>
                <th>검진자</th>
                <td colSpan={2}>
                  {userSearch}
                  <label className="textLabel">{selectUser.NAME_KOR || formData.NAME_KOR}</label>
                  <StyledButton
                    className="btn-gray btn-sm ml5"
                    onClick={() =>
                      JSON.stringify(selectUser) === '{}'
                        ? setFormData(id, {
                            EMP_NO: formData.EMP_NO,
                            NAME_KOR: formData.NAME_KOR,
                            USER_ID: formData.USER_ID,
                            DEPT_NAME_KOR: formData.DEPT_NAME_KOR,
                            DEPT_ID: formData.DEPT_ID,
                            SE_DT: now,
                            viewType: 'INPUT',
                          })
                        : setFormData(id, { ...selectUser, SE_DT: now, viewType: 'INPUT' })
                    }
                  >
                    검색
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>체성분 분석치</th>
                <th colSpan={2}>혈압 / 혈당</th>
                <th colSpan={2}>간장</th>
                <th colSpan={2}>고지혈 / 빈혈</th>
              </tr>
              <tr>
                <th>신장(cm)</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.GOL || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('GOL', e.target.value)}
                    allowClear
                  />
                </td>
                <th>수축기(mmHg)</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.SUCHUK || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('SUCHUK', e.target.value)}
                    allowClear
                  />
                </td>
                <th>GOT</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.GOT || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('GOT', e.target.value)}
                    allowClear
                  />
                </td>
                <th>T-콜레스테롤</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.COL || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('COL', e.target.value)}
                    allowClear
                  />
                </td>
              </tr>
              <tr>
                <th>체중(kg)</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.WEIGHT || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('WEIGHT', e.target.value)}
                    allowClear
                  />
                </td>
                <th>이완기(mmHg)</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.IWAN || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('IWAN', e.target.value)}
                    allowClear
                  />
                </td>
                <th>GPT</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.GPT || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('GPT', e.target.value)}
                    allowClear
                  />
                </td>
                <th>중성지방</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.JOONGSUNG || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('JOONGSUNG', e.target.value)}
                    allowClear
                  />
                </td>
              </tr>
              <tr>
                <th>체지방률(%)</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.CHEJI || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('CHEJI', e.target.value)}
                    allowClear
                  />
                </td>
                <th>혈당</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.HYULDANG || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('HYULDANG', e.target.value)}
                    allowClear
                  />
                </td>
                <th>감마GTP</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    className="ant-input-sm"
                    value={formData.GAMMA || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('GAMMA', e.target.value)}
                    allowClear
                  />
                </td>
                <th>HDL</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.HDL || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('HDL', e.target.value)}
                    allowClear
                  />
                </td>
              </tr>
              <tr>
                <th>복부지방률(WHR)</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.BOK || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('BOK', e.target.value)}
                    allowClear
                  />
                </td>
                <td colSpan={4} rowSpan={2}></td>
                <th>LDL</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.LDL || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('LDL', e.target.value)}
                    allowClear
                  />
                </td>
              </tr>
              <tr>
                <th>기초대사량(Kcal)</th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.GICHO || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('GICHO', e.target.value)}
                    allowClear
                  />
                </td>
                <th>혈색소 </th>
                <td>
                  <AntdInput
                    className="ant-input-sm"
                    value={formData.HYULSAK || ''}
                    maxLength={10}
                    onChange={e => this.changeFormData('HYULSAK', e.target.value)}
                    allowClear
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={8}>
                  <font color="red">
                    <b>※ 유소견 입력을 하시는 임직원분들께서는 검색을 하지 마시고 바로 입력 후 저장하시기 바랍니다.</b>
                  </font>
                  <br />
                  기타 문의 사항은 박연희 간호사(청주)4234로 문의바랍니다.
                </th>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </StyledContentsWrapper>
    );
  }
}

SelfCheck.propTypes = {
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  profile: PropTypes.object,
};
SelfCheck.defaultProps = {
  changeFormData: () => {},
  setFormData: () => {},
  formData: {},
  submitHandlerBySaga: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  profile: {},
};

export default SelfCheck;

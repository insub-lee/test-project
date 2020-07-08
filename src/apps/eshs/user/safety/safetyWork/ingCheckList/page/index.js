import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal, DatePicker, Table, Spin } from 'antd';
import styled from 'styled-components';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSearchWrapper from 'commonStyled/Wrapper/StyledSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import message from 'components/Feedback/message';
import Group from 'components/BizBuilder/Sketch/Group';
import MessageContent from 'components/Feedback/message.style2';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import IngCheckViewer from '../../ingCheck';
import ExcelDown from '../Excel';
import Styled from './Styled';

const AntdModal = StyledContentsModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledDatePicker(DatePicker);

const CustomTableStyled = styled.div`
  .ant-table-column-title {
    font-size: 12px;
  }
`;

class SafetyWorkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      selectedWork: '',
      isSearching: false,
      searchValues: {
        WORK_NO: '', // 작업번호
        REQ_CMPNY_CD: '', // 발주회사코드
        REQ_CMPNY_NM: '', // 발주회사명
        REQ_DEPT_CD: '', // 발주부서코드
        REQ_DEPT_NM: '', // 발주부서명
        WRK_CMPNY_CD: '', // 작업업체코드
        WRK_CMPNY_NM: '', // 작업업체명
        START_CHECK_DT: '', // 점검기간(START)
        END_CHECK_DT: '', // 점검기간(END)
      },
      safetyWorks: [],
      ingCheckList: [],
    };
  }

  // 검색버튼 Action
  onSearch = () => {
    const { searchValues } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    this.setState({
      isSearching: true,
    });
    const apiInfo = {
      key: 'getIngCheckList',
      type: 'POST',
      url: `/api/eshs/v1/common/ingCheckList`,
      params: { serachValues: { ...searchValues } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onSearchCallback);
  };

  // 검색Action Callback
  onSearchCallback = (id, response) => {
    const result = response.list;
    if (result.length > 0) {
      this.setState({
        isSearching: false,
        ingCheckList: result,
      });
      return;
    }
    this.setState(
      {
        isSearching: false,
        ingCheckList: [],
      },
      () => message.error(<MessageContent>검색결과가 없습니다.</MessageContent>),
    );
  };

  // 모달 핸들러
  handleModal = (type, visible, workNo) => {
    let title = '';
    const selectedWork = workNo || '';
    switch (type) {
      case 'supervisor':
        title = '감독자 선택';
        break;
      case 'cmpny':
        title = '작업업체 선택';
        break;
      case 'ingCheckView':
        title = '안전작업 점검 상세정보';
        break;
      default:
        break;
    }

    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
      selectedWork,
    });
  };

  // 거래처 선택
  handleCmpnySelect = (cmpnyInfo, field) => {
    const { searchValues } = this.state;
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      searchValues: {
        ...searchValues,
        [field]: cmpnyInfo.WRK_CMPNY_CD,
        [field.replace('CD', 'NM')]: cmpnyInfo.WRK_CMPNY_NM,
      },
    });
  };

  // 검색된 작업번호 선택시
  handleSafetyWorkSelect = record => {
    const { searchValues } = this.state;
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      searchValues: {
        ...searchValues,
        WORK_NO: record.WORK_NO,
      },
    });
  };

  // state searchValue 변경
  handleChangeSearchValue = (field, value) => {
    const { searchValues } = this.state;
    this.setState({
      searchValues: {
        ...searchValues,
        [field]: value,
      },
    });
  };

  render() {
    const { modalType, modalTitle, modalVisible, searchValues, safetyWorks, selectedWork, ingCheckList, isSearching } = this.state;
    const columns = [
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        align: 'center',
        render: value => (
          <span
            onClick={() => this.handleModal('ingCheckView', true, value)}
            role="button"
            tabIndex="0"
            onKeyPress={() => this.handleModal('ingCheckView', true, value)}
            style={{ cursor: 'pointer', color: '#1fb5ad' }}
          >
            {value}
          </span>
        ),
      },
      {
        title: '작업업체',
        children: [
          {
            title: '업체명',
            dataIndex: 'WRK_CMPNY_NM',
            key: 'WRK_CMPNY_NM',
            align: 'center',
          },
          {
            title: '벌점',
            dataIndex: 'WRK_CMPNY_PT',
            key: 'WRK_CMPNY_PT',
            align: 'center',
          },
        ],
      },
      {
        title: '발주팀',
        children: [
          {
            title: '발주사',
            dataIndex: 'REQ_CMPNY_NM',
            key: 'REQ_CMPNY_NM',
            align: 'center',
          },
          {
            title: '팀명',
            dataIndex: 'REQ_DEPT_NM',
            key: 'REQ_DEPT_NM',
            align: 'center',
          },
          {
            title: '벌점',
            dataIndex: 'REQ_CMPNY_PT',
            key: 'REQ_CMPNY_PT',
            align: 'center',
          },
        ],
      },
      {
        title: '주작업',
        dataIndex: 'WCATEGORY',
        align: 'center',
      },
      {
        title: '점검일',
        dataIndex: 'CHECK_DT',
        align: 'center',
        render: value => <span>{moment(value).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '점검결과',
        dataIndex: 'CHECK_STATUS',
        align: 'center',
      },
    ];
    return (
      <Styled>
        <StyledSearchWrapper style={{ marginBottom: '15px' }}>
          <Spin tip="검색중..." spinning={isSearching}>
            <Group className="view-designer-group group-0">
              <div className="view-designer-group-search-wrap">
                <table className="view-designer-table table-0">
                  <tbody>
                    <tr className="view-designer-row">
                      <td className="view-designer-col view-designer-label">
                        <span>작업번호</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '50%' }}
                            value={searchValues.WORK_NO}
                            onChange={e => this.handleChangeSearchValue('WORK_NO', e.target.value)}
                            onSearch={() => this.handleModal('safetyWork', true)}
                          />
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>발주회사</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '50%' }}
                            value={searchValues.REQ_CMPNY_CD}
                            onClick={() => this.handleModal('', false)}
                            onSearch={() => this.handleModal('', false)}
                          />
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>주관팀</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '50%' }}
                            value={searchValues.REQ_DEPT_CD}
                            onClick={() => this.handleModal('', false)}
                            onSearch={() => this.handleModal('', false)}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="view-designer-row">
                      <td className="view-designer-col view-designer-label">
                        <span>작업업체</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '50%' }}
                            value={searchValues.WRK_CMPNY_CD}
                            onClick={() => this.handleModal('cmpny', true)}
                            onSearch={() => this.handleModal('cmpny', true)}
                          />
                          {searchValues.WRK_CMPNY_NM !== '' && <span>{searchValues.WRK_CMPNY_NM}</span>}
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label">
                        <span>점검기간</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdDatePicker
                            className="ant-picker-xs"
                            style={{ width: '45%' }}
                            value={searchValues.START_CHECK_DT !== '' ? moment(searchValues.START_CHECK_DT) : undefined}
                            onChange={e => {
                              if (e === null) {
                                this.handleChangeSearchValue('START_CHECK_DT', '');
                                return;
                              }
                              this.handleChangeSearchValue('START_CHECK_DT', e.format('YYYY-MM-DD'));
                            }}
                          />
                          <span styled={{ margin: '0px 10px 0px 10px', width: '10%' }}> ~ </span>
                          <AntdDatePicker
                            className="ant-picker-xs"
                            style={{ width: '45%' }}
                            value={searchValues.END_CHECK_DT !== '' ? moment(searchValues.END_CHECK_DT) : undefined}
                            onChange={e => {
                              if (e === null) {
                                this.handleChangeSearchValue('END_CHECK_DT', '');
                                return;
                              }
                              this.handleChangeSearchValue('END_CHECK_DT', e.format('YYYY-MM-DD'));
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="view-designer-group-search-btn-wrap">
                <StyledButton className="btn-gray btn-first btn-sm" onClick={() => this.onSearch()}>
                  검색
                </StyledButton>
              </div>
            </Group>
          </Spin>
        </StyledSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <ExcelDown dataList={ingCheckList} />
        </StyledButtonWrapper>
        <ContentsWrapper>
          <CustomTableStyled>
            <AntdTable
              columns={columns}
              dataSource={ingCheckList}
              footer={() => <div style={{ textAlign: 'center' }}>{`총 ${ingCheckList.length === 0 ? 0 : ingCheckList.length} 건`}</div>}
            />
          </CustomTableStyled>
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'cmpny' && (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData={searchValues.WRK_CMPNY_CD}
              directSearchTable
              visible
              CONFIG={{ property: { isRequired: false, GUBUN: 'SW' } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(cmpnyInfo, field) => this.handleCmpnySelect(cmpnyInfo, field)}
            />
          )}
          {modalType === 'safetyWork' && <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />}
          {modalType === 'ingCheckView' && <IngCheckViewer workNo={selectedWork} pageType="modal" />}
        </AntdModal>
      </Styled>
    );
  }
}

SafetyWorkList.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

SafetyWorkList.defaultProps = {};

export default SafetyWorkList;

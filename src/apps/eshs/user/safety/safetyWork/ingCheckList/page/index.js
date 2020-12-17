import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal, DatePicker, Table, Spin, Select } from 'antd';
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
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import Group from 'components/BizBuilder/Sketch/Group';
import DeptSelect from 'components/DeptSelect';
import MessageContent from 'components/Feedback/message.style2';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import IngCheckViewer from '../../ingCheck';
import ExcelDown from '../Excel';
import Styled from './Styled';

const { Option } = Select;

const AntdModal = StyledContentsModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdSelect = StyledSelect(Select);
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
        CMPNY_TYPE: '', // 주관부서 or 작업업체
      },
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
      // const setResult = this.setListDataForMagnachip(result);
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

  // 검색데이터 가공 (구미요청사항)
  // setListDataForMagnachip = list => {
  //   const result = [];
  //   list.forEach(item => {
  //     const cmpny = {
  //       WORK_NO: item.WORK_NO,
  //       TARGET_NM: item.WRK_CMPNY_NM,
  //       REQ_EMP_NM: item.REQ_EMP_NM,
  //       WORK_DESC: item.WORK_DESC,
  //       PT: item.WRK_CMPNY_PT,
  //       TOTAL_PT: (item.WRK_CMPNY_PT || 0) + (item.REQ_CMPNY_PT || 0),
  //       CHECK_STATUS: item.CHECK_STATUS,
  //       CHECK_DT: item.CHECK_DT,
  //     };
  //     const team = {
  //       WORK_NO: item.WORK_NO,
  //       TARGET_NM: item.REQ_DEPT_NM,
  //       REQ_EMP_NM: item.REQ_EMP_NM,
  //       WORK_DESC: item.WORK_DESC,
  //       PT: item.REQ_CMPNY_PT,
  //       TOTAL_PT: (item.WRK_CMPNY_PT || 0) + (item.REQ_CMPNY_PT || 0),
  //       CHECK_STATUS: item.CHECK_STATUS,
  //       CHECK_DT: item.CHECK_DT,
  //     };
  //     // 작업업체, 주관부서(팀) 순서로 넣어줌
  //     result.push(cmpny);
  //     result.push(team);
  //   });

  //   // 요청된 리스트 형태로 return
  //   return result;
  // };

  // 모달 핸들러
  handleModal = (type, visible, workNo) => {
    let title = '';
    const selectedWork = workNo || '';
    switch (type) {
      case 'safetyWork':
        title = '안전작업 검색';
        break;
      case 'cmpny':
        title = '작업업체 선택';
        break;
      case 'ingCheckView':
        title = '안전작업 점검 상세정보';
        break;
      case 'dept':
        title = '작업부서 선택';
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

  // 작업부서 선택시
  handleSafetyWorkDeptSelect = dept => {
    const { searchValues } = this.state;
    this.setState({
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      searchValues: {
        ...searchValues,
        REQ_DEPT_CD: dept.DEPT_CD,
        REQ_DEPT_NM: dept.NAME_KOR,
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
    const { modalType, modalTitle, modalVisible, searchValues, selectedWork, ingCheckList, isSearching } = this.state;
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
        title: '업체',
        dataIndex: 'CMPNY_NM',
        align: 'center',
        render: (value, record) => {
          if (record.CMPNY_TYPE === 'WRK') return value;
          return '';
        },
      },
      {
        title: '팀',
        dataIndex: 'CMPNY_NM',
        align: 'center',
        render: (value, record) => {
          if (record.CMPNY_TYPE === 'REQ') return value;
          return '';
        },
      },
      {
        title: '담당자',
        dataIndex: 'REQ_EMP_NM',
        align: 'center',
      },
      {
        title: '작업내용',
        dataIndex: 'WORK_DESC',
        align: 'center',
        render: data => <div style={{ textAlign: 'left' }}>{`${data}`}</div>,
      },
      {
        title: '작업내 벌점',
        dataIndex: 'PANALTY',
        align: 'center',
        render: data => `${data}점`,
      },
      {
        title: '검색기간내 누적벌점',
        dataIndex: 'SEARCH_PANALTY',
        align: 'center',
        render: data => `${data}점`,
      },
      {
        title: '연기준 누적벌점',
        dataIndex: 'SEARCH_PANALTY',
        align: 'center',
        render: (data, record) => <div style={{ textAlign: 'left' }}>{`${record.YEAR_INFO}년 - 총 ${data}점`}</div>,
      },
      {
        title: '점검일',
        dataIndex: 'CHECK_DT',
        align: 'center',
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
                      <td className="view-designer-col view-designer-label" style={{ width: '100px', textAlign: 'center' }}>
                        <span>작업번호</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '100%' }}
                            value={searchValues.WORK_NO}
                            onChange={e => this.handleChangeSearchValue('WORK_NO', e.target.value)}
                            onSearch={() => this.handleModal('safetyWork', true)}
                          />
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label" style={{ width: '100px', textAlign: 'center' }}>
                        <span>주관팀</span>
                      </td>
                      <td className="view-designer-col">
                        <div>
                          <AntdSearch
                            className="ant-search-inline input-search-xs mr5"
                            style={{ width: '100%' }}
                            value={searchValues.REQ_DEPT_NM || ''}
                            onClick={() => this.handleModal('dept', true)}
                            onSearch={() => this.handleModal('dept', true)}
                          />
                        </div>
                      </td>
                      <td className="view-designer-col view-designer-label" style={{ width: '100px', textAlign: 'center' }}>
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
                    <tr className="view-designer-row">
                      <td className="view-designer-col view-designer-label" style={{ width: '100px', textAlign: 'center' }}>
                        <span>작업업체</span>
                      </td>
                      <td className="view-designer-col">
                        <AntdSearch
                          className="ant-search-inline input-search-xs mr5"
                          style={{ width: '100%' }}
                          value={searchValues.WRK_CMPNY_NM || ''}
                          onClick={() => this.handleModal('cmpny', true)}
                          onSearch={() => this.handleModal('cmpny', true)}
                        />
                      </td>
                      <td className="view-designer-col view-designer-label" style={{ width: '100px', textAlign: 'center' }}>
                        <span>구분</span>
                      </td>
                      <td className="view-designer-col">
                        <AntdSelect
                          className="select-xs mr5"
                          onChange={value => this.handleChangeSearchValue('CMPNY_TYPE', value)}
                          defaultValue=""
                          style={{ width: '100%' }}
                        >
                          <Option value="" key="ALL">
                            전체
                          </Option>
                          <Option value="REQ" key="REQ">
                            작업부서(팀)
                          </Option>
                          <Option value="WRK" key="WRK">
                            작업업체
                          </Option>
                        </AntdSelect>
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
              pagination={{ pageSize: 20 }}
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
          {modalType === 'safetyWork' && (
            <div style={{ padding: '20px' }}>
              <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} uesdSearchType />
            </div>
          )}
          {modalType === 'ingCheckView' && <IngCheckViewer workNo={selectedWork} pageType="modal" />}
          {modalType === 'dept' && (
            <DeptSelect
              onCancel={() => this.handleModal('', false)}
              onComplete={dept => this.handleSafetyWorkDeptSelect(dept)}
              rootDeptChange
              defaultRootDeptId={72761}
            />
          )}
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

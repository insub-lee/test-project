import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, Modal, DatePicker, Table, Spin, Select } from 'antd';
import styled from 'styled-components';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import Styled from './Styled';
import ExcelDownload from '../Excel';

const AntdModal = StyledContentsModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

const currentDate = moment().format('YYYY-MM-DD');

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
      isSearching: false,
      searchValues: {
        SITE: '구미',
        SDATE: currentDate,
        EDATE: currentDate,
        WRK_CMPNY_NM: '',
        WRK_CMPNY_CD: '',
      },
      listData: [],
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
      key: 'getCheckDiaryCmpny',
      type: 'POST',
      url: `/api/eshs/v1/common/checkStatus`,
      params: { PARAM: { type: 'GET_CHECK_DIARY_CMPNY', ...searchValues } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onSearchCallback);
  };

  // 검색Action Callback
  onSearchCallback = (id, response) => {
    const { list } = response;
    if (list.length > 0) {
      this.setState({
        isSearching: false,
        listData: list,
      });
      return;
    }
    this.setState(
      {
        isSearching: false,
        listData: [],
      },
      () => message.error(<MessageContent>검색결과가 없습니다.</MessageContent>),
    );
  };

  // 검색 조건
  onChangeSearchValue = (type, value) => {
    const { searchValues } = this.state;
    this.setState({
      searchValues: {
        ...searchValues,
        [type]: value,
      },
    });
  };

  // 작업업체 선택
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

  // 모달 핸들러
  handleModal = (type, visible) => {
    let title = '';
    switch (type) {
      case 'cmpny':
        title = '작업업체 선택';
        break;
      default:
        break;
    }

    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
    });
  };

  render() {
    const { modalType, modalTitle, modalVisible, listData, isSearching, searchValues } = this.state;
    const { sagaKey, result, getCallDataHandler } = this.props;
    const columns = [
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '업체명',
        dataIndex: 'WRK_CMPNY_NM',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '담당ENG',
        dataIndex: 'REQ_EMP_NM',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '작업동',
        dataIndex: 'DGUBUN',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '장소',
        dataIndex: 'WLOC',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '주작업',
        dataIndex: 'WCATEGORY',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '작업일',
        dataIndex: 'FROM_DT',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '작업시간',
        dataIndex: 'TIME',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '작업내용',
        dataIndex: 'WORK_DESC',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '작업인원',
        dataIndex: 'WORKER_CNT',
        align: 'center',
        ellipsis: true,
        render: data => `${data} 명`,
      },
      {
        title: '지적내용 / 조치사항',
        align: 'center',
        ellipsis: true,
        render: (data, row) => {
          if (data === '') return `${row.CHECK_STATUS}`;
          return `${row.CHECK_CONTENT} / ${row.CHECK_STATUS}`;
        },
      },
    ];
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue="구미" className="select-sm" style={{ width: '100px' }} onChange={val => this.onChangeSearchValue('SITE', val)}>
                <Option value="">전체</Option>
                <Option value="구미">구미</Option>
                <Option value="청주">청주</Option>
                <Option value="서울">서울</Option>
              </AntdSelect>
              <span className="text-label">발생기간</span>
              <AntdDatePicker
                className="ant-picker-sm"
                style={{ width: 125 }}
                defaultValue={moment(currentDate, 'YYYY-MM-DD')}
                onChange={date => this.onChangeSearchValue('SDATE', moment(date).format('YYYY-MM-DD'))}
              />
              <span> ~ </span>
              <AntdDatePicker
                className="ant-picker-sm"
                style={{ width: 125 }}
                defaultValue={moment(currentDate, 'YYYY-MM-DD')}
                onChange={date => this.onChangeSearchValue('EDATE', moment(date).format('YYYY-MM-DD'))}
              />
              <span className="text-label">작업업체</span>
              <AntdSearch
                className="ant-search-inline input-search-sm mr5"
                style={{ width: '300px' }}
                value={searchValues.WRK_CMPNY_NM || ''}
                onClick={() => this.handleModal('cmpny', true)}
                onSearch={() => this.handleModal('cmpny', true)}
              />
              <StyledButton className="btn-gray btn-sm btn-first ml5" onClick={() => this.onSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <ExcelDownload listData={listData} />
        </StyledButtonWrapper>
        <ContentsWrapper>
          <CustomTableStyled>
            <AntdTable
              columns={columns}
              dataSource={listData || []}
              pagination={{ pageSize: 50 }}
              footer={() => <div style={{ textAlign: 'center' }}>{`총 ${listData.length === 0 ? 0 : listData.length} 건`}</div>}
            />
          </CustomTableStyled>
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width="790px"
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'cmpny' && (
            <EshsCmpnyComp
              sagaKey={sagaKey}
              getExtraApiData={getCallDataHandler}
              extraApiData={result}
              colData={searchValues.WRK_CMPNY_CD}
              directSearchTable
              visible
              CONFIG={{ property: { isRequired: false, GUBUN: 'SW' } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(cmpnyInfo, field) => this.handleCmpnySelect(cmpnyInfo, field)}
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

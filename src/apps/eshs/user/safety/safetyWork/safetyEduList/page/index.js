import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import UserSelect from 'components/UserSelect';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import SearchSafetyEduInfo from '../searchEduInfo';
import EduListTable from '../../safetyEdu/SafetyEduList';
import EduMgtView from '../../safetyEdu/EduMgt/viewPage';
import Styled from './Styled';

const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledLineTable(Table);

class workerTrByPersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      seletedEduNo: '',
      safetyEduList: [],
      SafetyEduConditionList: [],
      searchValues: {
        EDU_NO: '',
        SITE: '',
        START_EDU_DT: '',
        END_EDU_DT: '',
        LECT_HOST_GB: '',
        LECT_CMPNY_CD: '',
        LECT_EMP_NO: '',
        OUT_LECT_SSN: '',
        OUT_LECT_NM: '',
        EDU_TARGET_GB: '',
        EDU_YEAR: '',
        WORK_NO: '',
      },
    };
  }

  // 페이지 랜더링 후 불러올 데이터
  componentDidMount() {}

  // 검색조건 초기화
  resetSearchValue = () => {
    this.setState({
      searchValues: {
        EDU_NO: '',
        SITE: '',
        START_EDU_DT: '',
        END_EDU_DT: '',
        LECT_HOST_GB: '',
        LECT_CMPNY_CD: '',
        LECT_EMP_NO: '',
        OUT_LECT_SSN: '',
        OUT_LECT_NM: '',
        EDU_TARGET_GB: '',
        EDU_YEAR: '',
        WORK_NO: '',
      },
    });
  };

  // 검색버튼 Action
  onSearch = () => {
    const { searchValues } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getSafetyEduCondition',
      type: 'POST',
      url: `/api/eshs/v1/common/safetyEduCondition`,
      params: { serachValues: { ...searchValues } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onSearchCallback);
  };

  onSearchCallback = (id, response) => {
    const listData = response.list || [];
    if (listData.length === 0) {
      message.error(<MessageContent>검색결과가 없습니다.</MessageContent>);
    }
    this.setState({
      SafetyEduConditionList: response.list,
    });
  };

  // 모달 핸들러
  handleModal = (type, visible, eduNo) => {
    let title = '';
    const seletedEduNo = eduNo || '';
    switch (type) {
      case 'eduSearch':
        title = '안전교육 검색';
        break;
      case 'searchEmp':
        title = '내부강사 선택';
        break;
      case 'searchWorkNo':
        title = '안전작업 선택';
        break;
      case 'safetyEduView':
        title = '안전교육 이수 등록 조회';
        break;
      default:
        break;
    }
    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
      seletedEduNo,
    });
  };

  handleChangeSearchValue = (field, val) => {
    const { searchValues } = this.state;
    this.setState({
      searchValues: {
        ...searchValues,
        [field]: val,
      },
    });
  };

  // 안전교육 검색
  searchSafetyEdu = (searchType, keyword) => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiArr = {
      key: 'getSafetyEduList',
      type: 'GET',
      url: `/api/eshs/v1/common/safetyEdu?type=${searchType}&keyword=${keyword}`,
    };
    getCallDataHandlerReturnRes(id, apiArr, this.searchSafetyEduCallback);
  };

  // 안전교육 검색 콜백
  searchSafetyEduCallback = (id, response) => {
    this.setState({
      safetyEduList: response.safetyEduList || [],
    });
  };

  // 안전교육 선택
  selectSafetyEdu = record => {
    const { searchValues } = this.state;
    this.setState({
      modalTitle: '',
      modalType: '',
      modalVisible: false,
      searchValues: {
        ...searchValues,
        EDU_NO: record.EDU_NO,
      },
      safetyEduList: [],
    });
  };

  // 작업번호 선택
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

  // 내부강사 선택
  onSelectedComplete = result => {
    const { searchValues } = this.state;
    if (result.length > 0) {
      const userInfo = result[0];
      this.setState({
        modalTitle: '',
        modalType: '',
        modalVisible: false,
        searchValues: {
          ...searchValues,
          LECT_CMPNY_CD: 72761,
          LECT_CMPNY_NM: 'MAGNACHIP반도체',
          LECT_EMP_NO: userInfo.USER_ID,
          LECT_EMP_NM: userInfo.NAME_KOR,
        },
      });
      return;
    }
    this.setState({
      modalTitle: '',
      modalType: '',
      modalVisible: false,
    });
  };

  render() {
    const { modalType, modalTitle, modalVisible, searchValues, safetyEduList, SafetyEduConditionList, seletedEduNo } = this.state;
    const columns = [
      {
        title: '성명',
        dataIndex: 'WORKER_NM',
        align: 'center',
      },
      {
        title: '생년월일',
        dataIndex: 'WORKER_SSN',
        align: 'center',
      },
      {
        title: '연락처',
        dataIndex: 'TEL',
        align: 'center',
      },
      {
        title: '교육번호',
        dataIndex: 'EDU_NO',
        align: 'center',
        render: value => (
          <span
            onClick={() => this.handleModal('safetyEduView', true, value)}
            role="button"
            tabIndex="0"
            onKeyPress={() => this.handleModal('safetyEduView', true, value)}
            style={{ cursor: 'pointer', color: '#1fb5ad' }}
          >
            {value}
          </span>
        ),
      },
      {
        title: '교육일자',
        dataIndex: 'EDU_DT',
        align: 'center',
      },
      {
        title: '교육장소',
        dataIndex: 'EDU_LOC',
        align: 'center',
      },
      {
        title: '내부강사',
        children: [
          {
            title: '회사명',
            dataIndex: 'LECT_CMPNY_NM',
            align: 'center',
          },
          {
            title: '성명',
            dataIndex: 'LECT_EMP_NM',
            align: 'center',
          },
        ],
      },
      {
        title: '외부강사',
        children: [
          {
            title: '생년월일',
            dataIndex: 'OUT_LECT_SSN',
            align: 'center',
          },
          {
            title: '성명',
            dataIndex: 'OUT_LECT_NM',
            align: 'center',
          },
        ],
      },
      {
        title: '교육대상',
        children: [
          {
            title: '년도',
            dataIndex: 'EDU_YEAR',
            align: 'center',
          },
          {
            title: '작업번호',
            dataIndex: 'WORK_NO',
            align: 'center',
          },
        ],
      },
      {
        title: '업체명',
        dataIndex: 'WRK_CMPNY_NM',
        align: 'center',
      },
    ];
    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.onSearch()} style={{ marginBottom: '5px' }}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.resetSearchValue()} style={{ marginBottom: '5px' }}>
              검색조건 초기화
            </StyledButton>
          </div>
        </StyledSearchWrap>
        <ContentsWrapper>
          <SearchSafetyEduInfo searchValues={searchValues} onChangeSearchValue={this.handleChangeSearchValue} handleModal={this.handleModal} />
          <div style={{ marginTop: '10px' }}>
            <AntdTable columns={columns} dataSource={SafetyEduConditionList} />
          </div>
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'safetyEduView' && <BizMicroDevBase eduNo={seletedEduNo} pageType="modal" component={EduMgtView} sagaKey="safetyEdu_search" />}
          {modalType === 'searchEmp' && <UserSelect onUserSelectHandler={undefined} onUserSelectedComplete={this.onSelectedComplete} onCancel={undefined} />}
          {modalType === 'searchWorkNo' && <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />}
          {modalType === 'eduSearch' && (
            <EduListTable safetyEduList={safetyEduList} searchSafetyEdu={this.searchSafetyEdu} selectSafetyEdu={this.selectSafetyEdu} />
          )}
        </AntdModal>
      </Styled>
    );
  }
}

workerTrByPersonalPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

export default workerTrByPersonalPage;

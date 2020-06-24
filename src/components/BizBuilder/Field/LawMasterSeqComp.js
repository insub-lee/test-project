import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Table, Select } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
// import LawModal from 'apps/eshs/user/operation/law/lawModal';
import request from 'utils/request';

const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);

const { Option } = Select;
class LawMasterSeqComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      selectedRechNo: '',
      selectedLawName: '',
      data: [],
      type: '',
      text: '',
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, changeFormData, COMP_FIELD, compProps } = this.props;
    changeFormData(id, COMP_FIELD, (compProps && compProps.MASTER_SEQ) || ''); // 법규 SEQ
    changeFormData(id, 'RECH_LAW_NAME', (compProps && compProps.MASTER_RECH_NAME) || ''); // 법규명
    changeFormData(id, 'RECH_NO', (compProps && compProps.MASTER_NO) || ''); // 법규 관리번호
    this.callList().then(res => this.initData(res));
  };

  onSelected = rowData => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    changeFormData(id, COMP_FIELD, rowData.TASK_SEQ); // 법규 SEQ
    changeFormData(id, 'RECH_LAW_NAME', rowData.TITLE); // 법규명
    changeFormData(id, 'RECH_NO', rowData.RECH_NO); // 법규 관리번호
    changeFormData(id, 'MASTER_REG_NAME', rowData.REG_USER_NAME); // 법규 등록자명
    this.setState({ selectedRechNo: rowData.RECH_NO, selectedLawName: rowData.TITLE });
    this.handleOnChangeSearch(rowData.TASK_SEQ);
    this.onCancel();
  };

  isOpenLawModal = () => {
    this.setState({ isOpenModal: true });
  };

  onCancel = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  // custom search 예제
  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
    const searchText = value ? `AND W.${COMP_FIELD} = ${value} ` : '';
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  // getcallDataHandler로 변경할것
  callList = () => {
    const fetchData = async () => {
      const result = await request({
        url: 'http://eshs-dev.magnachip.com/api/eshs/v1/common/eshslawlist',
        method: 'GET',
      });
      return result.response && result.response.list;
    };
    return fetchData();
  };

  onLawSeach = (type, text) => {
    const fetchData = async () => {
      const result = await request({
        url: `http://eshs-dev.magnachip.com/api/eshs/v1/common/eshslawlist?TYPE=${type}&TEXT=${text}`,
        method: 'GET',
      });
      return result.response && result.response.list;
    };
    return fetchData();
  };

  initData = list => {
    this.setState({
      data: list.filter(f => f.STATUS === '사용중'),
    });
  };

  onTypeChange = value => {
    this.setState({
      type: value,
    });
  };

  onTextChange = value => {
    this.setState({
      text: value,
    });
  };

  render = () => {
    const { visible, sagaKey: id } = this.props;
    const lawColumns = [
      {
        title: '법규명',
        dataIndex: 'TITLE',
        key: 'TITLE',
      },
      {
        title: '관리번호',
        dataIndex: 'RECH_NO',
        key: 'RECH_NO',
      },
      {
        title: '종류',
        dataIndex: 'RECH_TYPE1',
        key: 'RECH_TYPE1',
      },
      {
        title: '작성부서',
        dataIndex: 'REG_USER_DEPT',
        key: 'REG_USER_DEPT',
      },
      {
        title: '작성자',
        dataIndex: 'REG_USER_NAME',
        key: 'REG_USER_NAME',
      },
    ];

    return visible ? (
      <>
        <AntdInput style={{ width: '30%' }} className="mr5 ant-input-xs" value={this.state.selectedRechNo} placeholder="관리 번호" readOnly />
        <AntdInput style={{ width: '30%' }} className="mr5 ant-input-xs" value={this.state.selectedLawName} placeholder="법규명" readOnly />
        <StyledButton className="btn-light btn-xs" onClick={() => this.isOpenLawModal()} readOnly>
          법규 검색
        </StyledButton>
        <AntdModal visible={this.state.isOpenModal} title="법규 검색" width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          <StyledContentsWrapper>
            <StyledCustomSearchWrapper className="search-wrapper-inline">
              <div className="search-input-area">
                <span className="text-label">검색구분 </span>
                <AntdSelect style={{ width: 120 }} className="mr5 select-sm" onChange={this.onTypeChange} defaultValue="TITLE">
                  <Option value="TITLE">법규명</Option>
                  <Option value="RECH_NO">관리번호</Option>
                  <Option value="REG_USER_NAME">작성자</Option>
                  <Option value="REG_USER_DEPT">작성부서</Option>
                </AntdSelect>
                <span className="text-label"> 검색어 </span>
                <AntdInput style={{ width: 200 }} className="ant-input-sm" onChange={e => this.onTextChange(e.target.value)} value={this.state.text} />
              </div>
              <div className="btn-area">
                <StyledButton className="btn-gray btn-sm" onClick={() => this.onLawSeach(this.state.type, this.state.text).then(res => this.initData(res))}>
                  검색
                </StyledButton>
              </div>
            </StyledCustomSearchWrapper>
            <AntdTable
              onRow={record => ({
                onClick: () => {
                  this.onSelected(record);
                },
              })}
              rowKey="TASK_SEQ"
              key={id}
              className="view-designer-list"
              columns={lawColumns}
              dataSource={this.state.data}
            />
          </StyledContentsWrapper>
        </AntdModal>
      </>
    ) : (
      ''
    );
  };
}

LawMasterSeqComp.propTypes = {
  visible: PropTypes.bool,
  changeSearchData: PropTypes.func,
  COMP_FIELD: PropTypes.object,
  compProps: PropTypes.object,
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
};

export default LawMasterSeqComp;

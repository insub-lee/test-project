import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal, Popconfirm } from 'antd';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import MsdsSearchList from 'apps/eshs/user/health/workEnv/msdsSearchList'; // 컬럼 사이즈 조절하기 위해
import { jsonToQueryString } from 'utils/helpers';
const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledAntdModal(Modal);

class MsdsHeaderComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      code: '',
    };
  }

  componentDidMount() {}

  handleSearch = () => {
    const { sagaKey: id, changeViewPage, getExtraApiData, viewPageData, formData } = this.props;

    const { code } = this.state;
    if (code) {
      const apiAry = [
        {
          key: 'listDataByCustom',
          url: `/api/eshs/v1/common/eshsBuilderCustomSearch/${viewPageData?.workSeq}`,
          type: 'POST',
          params: { PARAM: { whereString: [`AND W.ITEM_CD = '${code}'`] } },
        },
      ];

      getExtraApiData(id, apiAry, () => {
        const { extraApiData } = this.props;
        const searchData = extraApiData?.listDataByCustom?.list[0];
        if (!searchData) return message.info(<MessageContent>검색된 데이터가 없습니다.</MessageContent>);
        return changeViewPage(id, 3161, searchData?.TASK_SEQ, 'MODIFY');
      });
    } else {
      const task_seq = formData?.selectedRowTaskSeq;
      if (task_seq) {
        changeViewPage(id, 3161, task_seq, 'MODIFY');
      }
    }
  };

  onChangeSave = type => {
    const { customSaveTask, customModifyTask, deleteTask, sagaKey: id, changeViewPage, viewPageData } = this.props;
    if (type === 'S') {
      customSaveTask(id, id);
    } else if (type === 'M') {
      customModifyTask(id);
    } else if (type === 'D') {
      deleteTask(id, id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage, this.deleteCallBack);
    }
  };

  deleteCallBack = () => {
    const { sagaKey: id, changeViewPage, viewPageData } = this.props;
    message.info(<MessageContent>삭제되었습니다.</MessageContent>);

    changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
  };

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    if (modalVisible) {
      return this.setState({
        modalVisible: !modalVisible,
        modalContent: [],
      });
    }
    return this.setState({
      modalVisible: !modalVisible,
      modalContent: [
        <BizBuilderBase
          sagaKey="MsdsSearchList"
          workSeq={3161}
          ListCustomButtons={() => null}
          viewType="LIST"
          listMetaSeq={4141}
          customOnRowClick={record => this.setState({ code: '' }, () => this.rowClick(record))}
          CustomListPage={MsdsSearchList}
        />,
      ],
    });
  };

  rowClick = record => {
    const { sagaKey: id, setFormData, formData } = this.props;
    setFormData(id, { ...formData, selectedRowItemCode: record.ITEM_CD, selectedRowTaskSeq: record.TASK_SEQ });
    this.handleModalVisible();
  };

  render() {
    const { viewPageData, sagaKey: id, changeViewPage, formData } = this.props;
    const { modalVisible, modalContent, code } = this.state;
    const selectedRowItemCode = (formData && formData.selectedRowItemCode) || (formData && formData.ITEM_CD) || '';

    return (
      <div>
        <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
          <span>MSDS 코드</span>&nbsp;
          <AntdSearch
            className="ant-search-inline input-search-mid mr5"
            value={code || selectedRowItemCode}
            style={{ width: 150 }}
            onSearch={this.handleModalVisible}
            onChange={e => this.setState({ code: e?.target?.value })}
            onPressEnter={() => this.handleSearch()}
          />
          <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.handleSearch()}>
            검색
          </StyledButton>
          {viewPageData.viewType === 'INPUT' && (
            <>
              <StyledButton className="btn-primary btn-sm" onClick={() => this.onChangeSave('S')}>
                등록
              </StyledButton>
            </>
          )}
          {viewPageData.viewType === 'MODIFY' && (
            <>
              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.onChangeSave('M')}>
                저장
              </StyledButton>
              <Popconfirm title="정말로 삭제하시겠습니까?" onConfirm={() => this.onChangeSave('D')} okText="Yes" cancelText="No">
                <StyledButton className="btn-light btn-sm btn-first">삭제</StyledButton>
              </Popconfirm>

              <StyledButton className="btn-primary btn-sm btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
                신규등록
              </StyledButton>
              <StyledButton className="btn-light btn-sm" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
                Reset
              </StyledButton>
            </>
          )}
        </StyledButtonWrapper>
        <AntdModal width={850} visible={modalVisible} title="MSDS 검색" onCancel={this.handleModalVisible} destroyOnClose footer={null}>
          {modalContent}
        </AntdModal>
      </div>
    );
  }
}

MsdsHeaderComp.propTypes = {
  sagaKey: PropTypes.string,
  viewPageData: PropTypes.func,
  changeViewPage: PropTypes.func,
  deleteTask: PropTypes.func,
  setFormData: PropTypes.func,
  formData: PropTypes.object,
  customSaveTask: PropTypes.any,
  customModifyTask: PropTypes.any,
};

MsdsHeaderComp.defaultProps = {
  customSaveTask: () => {},
  customModifyTask: () => {},
};

export default MsdsHeaderComp;

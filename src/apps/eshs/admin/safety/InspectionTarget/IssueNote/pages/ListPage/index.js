import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Radio } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import AntRadiobox from 'containers/store/components/uielements/radiobox.style';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdTable = StyledAntdTable(Table);
const RadioGroup = AntRadiobox(Radio.Group);

class FireIssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandlerReturnRes, fireCode, positionNo } = this.props;
    const apiInfo = {
      key: 'getIssueList',
      type: 'POST',
      url: `/api/eshs/v1/common/safety/${fireCode}/getIssueNoteHistory`,
      params: { POSITION_NO: positionNo },
    };
    getCallDataHandlerReturnRes(sagaKey, apiInfo, this.setlistData);
  }

  setlistData = (id, response) => {
    const issueList = response.data || [];
    this.setState({
      listData: issueList,
    });
  };

  onChangeIssueYn = (record, value) => {
    const { sagaKey, profile, fireCode, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getIssueList',
      type: 'POST',
      url: `/api/eshs/v1/common/safety/${fireCode}/updateIssueNote`,
      params: {
        POSITION_NO: record.POSITION_NO,
        ISSUE_YN: value,
        ENTRY_DATE: record.ENTRY_DATE,
        ISSUE_NOTE: record.ISSUE_NOTE,
        FINISH_EMPNO: profile.USER_ID,
      },
    };
    getCallDataHandlerReturnRes(sagaKey, apiInfo, this.setIssueRes);
  };

  setIssueRes = (id, response) => {
    const { listData } = this.state;
    const { param, result } = response;
    if (result === 1) {
      const nextlistData = listData.map(item =>
        item.ENTRY_DATE === param.ENTRY_DATE && item.ISSUE_NOTE === param.ISSUE_NOTE ? { ...item, ISSUE_YN: param.ISSUE_YN } : item,
      );
      this.setState(
        {
          listData: nextlistData,
        },
        () => message.success(<MessageContent>조치상황 정보를 수정하였습니다.</MessageContent>),
      );
    } else {
      message.error(<MessageContent>조치상황 정보 수정에 실패하였습니다.</MessageContent>);
    }
  };

  render() {
    const { listData } = this.state;
    const columns = [
      {
        title: '등록일',
        dataIndex: 'REG_DATE',
        width: '20%',
        align: 'center',
      },
      {
        title: '내용',
        dataIndex: 'ISSUE_NOTE',
        width: '60%',
        align: 'center',
      },
      {
        title: '조치상황',
        dataIndex: 'ISSUE_YN',
        width: '20%',
        align: 'center',
        render: (text, record) => (
          <RadioGroup value={text} onChange={e => this.onChangeIssueYn(record, e.target.value)}>
            <Radio value="N">미조치</Radio>
            <Radio value="Y">조치완료</Radio>
          </RadioGroup>
        ),
      },
    ];
    return (
      <ContentsWrapper>
        <AntdTable rowKey="ENTRY_DATE" className="view-designer-list" pagination={false} columns={columns} dataSource={listData || []} />
      </ContentsWrapper>
    );
  }
}
FireIssueList.propTypes = {
  fireCode: PropTypes.string,
  positionNo: PropTypes.string,
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
  profile: PropTypes.object,
};

FireIssueList.defaultProps = {};

export default FireIssueList;

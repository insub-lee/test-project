import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cleanNm: '',
      cleanCd: '',
      treatmentMethod: '',
    };
  }

  componentDidMount() {
    this.listDataApi();
  }

  changeInputValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  callBackApi = () => {
    this.listDataApi();
  };

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsclean',
        url: '/api/eshs/v1/common/eshsclean',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
    this.renderTable();
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      PARAM: { CLEAN_CD: this.state.cleanCd, CLEAN_NM: this.state.cleanNm, TREATMENT_METHOD: this.state.treatmentMethod },
    };
    if (this.state.cleanNm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsclean', submitData, this.callBackApi);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsclean', submitData, this.callBackApi);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsclean', submitData, this.callBackApi);
      }
    } else {
      message.warning('배출시설명을 올바르게 입력하시오.');
    }

    this.onCancel();
  };

  onCancel() {
    this.setState({
      cleanNm: '',
      cleanCd: '',
      treatmentMethod: '',
    });
  }

  selectedRecord = record => {
    if (typeof record.CLEAN_NM === 'string') {
      this.setState({
        cleanNm: record.CLEAN_NM,
        cleanCd: record.CLEAN_CD,
        treatmentMethod: record.TREATMENT_METHOD,
      });
    }
  };

  renderTable() {
    const { result, columns } = this.props;
    let renderList = [
      {
        CLEAN_CD: this.state.cleanCd,
        CLEAN_NM: <Input style={{ width: '300px' }} value={this.state.cleanNm} onChange={e => this.changeInputValue(e)} name="cleanNm" />,
        TREATMENT_METHOD: (
          <Input style={{ width: '300px' }} value={this.state.treatmentMethod} onChange={e => this.changeInputValue(e)} name="treatmentMethod" />
        ),
      },
    ];
    renderList = [...renderList, ...((result && result.eshsclean && result.eshsclean.list) || [])];
    return (
      <AntdTable
        rowKey={renderList.CLEAN_CD}
        key={renderList.CLEAN_CD}
        columns={columns}
        dataSource={renderList}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 800 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${renderList.length - 1} 건`}</div>}
      />
    );
  }

  render() {
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('I')}>
                추가
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('U')}>
                수정
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('D')}>
                삭제
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={() => this.onCancel()}>
                Reset
              </StyledButton>
              {this.renderTable()}
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  getCallDataHandler: () => {},
  formData: {},
  columns: [
    {
      title: '코드',
      dataIndex: 'CLEAN_CD',
      align: 'center',
      width: 150,
    },
    {
      title: '방지시설명',
      dataIndex: 'CLEAN_NM',
      align: 'left',
    },
    {
      title: '처리방법',
      dataIndex: 'TREATMENT_METHOD',
      align: 'left',
    },
  ],
};

export default List;

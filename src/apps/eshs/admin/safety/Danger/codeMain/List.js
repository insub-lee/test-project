import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Table, Select, Input, message } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import Moment from 'moment';

import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Sketch from 'components/BizBuilder/Sketch';
import Group from 'components/BizBuilder/Sketch/Group';
import { CustomStyledAntdTable as StyledAntdTable } from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

const { Option } = Select;

Moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      majorCd: '',
      minorCd: '',
      cdNm: '',
      useYN: '',
      sysYN: '',
      remark: '',
      ref01: '',
      ref02: '',
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, dangerMainYN } = this.props;
    const apiAry = [
      {
        key: 'dangerList',
        url: `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    this.setState({
      dangerList: result && result.dangerList && result.dangerList.list,
    });
  };

  searchData = () => {
    const { sagaKey: id, getCallDataHandler, dangerMainYN } = this.props;
    const apiAry = [
      {
        key: 'dangerList',
        url: `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  };

  changeSelectValue = (value, option) => {
    this.setState({
      [option.key]: value,
    });
  };

  changeInputValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  warning = value => {
    message.warning(value);
  };

  insertOverlab = () => {
    const { dangerList, majorCd, minorCd } = this.state;
    const overlab = dangerList.find(item => item.MAJOR_CD === majorCd && item.MINOR_CD === minorCd);
    if (overlab) {
      this.warning('중복된 값이 존재합니다.');
    } else {
      this.onChangeData('I');
    }
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga, dangerMainYN } = this.props;
    const { majorCd, minorCd, cdNm, useYN, sysYN, remark, ref01, ref02 } = this.state;

    const submitData = {
      PARAM: {
        MAJOR_CD: value === 'I' && !dangerMainYN ? '' : majorCd,
        MINOR_CD: value === 'I' ? '*' : minorCd,
        CD_NM: cdNm,
        USE_YN: useYN,
        SYS_YN: sysYN,
        REMARK: remark,
        REF01: ref01,
        REF02: ref02,
      },
    };
    // sys 기능 구현중 퇴근
    if (cdNm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`, submitData, this.searchData);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`, submitData, this.searchData);
      } else if (value === 'I') {
        submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshsDanger/${dangerMainYN}`, submitData, this.searchData);
      } else if (value === 'S') {
        submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshsSysChange`, submitData, this.searchData);
      }
    } else {
      this.warning('코드명을 올바르게 입력하시오.');
    }
    this.onReset();
  };

  onReset() {
    this.setState({
      majorCd: '',
      minorCd: '',
      cdNm: '',
      useYN: '',
      sysYN: '',
      remark: '',
      ref01: '',
      ref02: '',
    });
  }

  renderTable = () => {
    const { dangerMainYN } = this.props;
    const { majorCd, minorCd, cdNm, useYN, sysYN, remark, ref01, ref02, dangerList } = this.state;
    const columns = [
      {
        title: (
          <>
            <span style={{ align: 'center' }}>SYS</span>
            <br />
            {sysYN}
          </>
        ),
        dataIndex: 'SYS_YN',
        align: 'center',
        width: 100,
      },
      {
        title: (
          <>
            <span style={{ align: 'center' }}>상태</span>
            <br />
            {useYN ? <>{useYN === 'Y' ? '사용' : '삭제'}</> : ''}
          </>
        ),
        dataIndex: 'USE_YN',
        align: 'center',
        width: 100,
        render: item => <span>{item === 'Y' ? '사용' : '삭제'}</span>,
      },
      {
        title: (
          <>
            <span style={{ align: 'center' }}>코드</span>
            <br />
            {dangerMainYN ? <Input value={majorCd} onChange={e => this.changeInputValue('majorCd', e.target.value)} /> : minorCd}
          </>
        ),
        dataIndex: dangerMainYN ? 'MAJOR_CD' : 'MINOR_CD',
        align: 'center',
        width: 100,
      },
      {
        title: (
          <>
            <span style={{ align: 'center' }}>코드명</span>
            <br />
            <Input value={cdNm} onChange={e => this.changeInputValue('cdNm', e.target.value)} />
          </>
        ),
        dataIndex: 'CD_NM',
        align: 'left',
        width: 250,
      },
      {
        title: (
          <>
            <span style={{ align: 'center' }}>참고1</span>
            <br />
            <Input value={ref01} onChange={e => this.changeInputValue('ref01', e.target.value)} />
          </>
        ),
        dataIndex: 'REF01',
        align: 'center',
        width: 250,
      },
      {
        title: (
          <>
            <span style={{ align: 'center' }}>참고2</span>
            <br />
            <Input value={ref02} onChange={e => this.changeInputValue('ref02', e.target.value)} />
          </>
        ),
        dataIndex: 'REF02',
        align: 'center',
        width: 250,
      },
      {
        title: (
          <>
            <span style={{ align: 'center' }}>비고</span>
            <br />
            <Input value={remark} style={{ width: '300px' }} onChange={e => this.changeInputValue('remark', e.target.value)} />
            <StyledButton className="btn-primary btn-first" onClick={() => this.insertOverlab()}>
              추가
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('U')}>
              수정
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('D')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('S')}>
              SYS CHANGE
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onReset()}>
              Reset
            </StyledButton>
          </>
        ),
        dataIndex: 'REMARK',
        align: 'left',
      },
    ];

    return (
      <AntdTable
        style={{ cursor: 'pointer' }}
        rowKey={`${dangerList && dangerList.MAJOR_CD}_${dangerList && dangerList.MINOR_CD}`}
        columns={columns}
        dataSource={dangerList || []}
        bordered
        onRow={record => ({
          onClick: () => {
            this.selectedRecord(record);
          },
        })}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 600 }}
        footer={() => <div style={{ textAlign: 'center' }}>{`${(dangerList && dangerList.length) || 0} 건`}</div>}
      />
    );
  };

  selectedRecord = record => {
    this.setState({
      majorCd: record.MAJOR_CD,
      minorCd: record.MINOR_CD,
      cdNm: record.CD_NM,
      useYN: record.USE_YN,
      sysYN: record.SYS_YN,
      remark: record.REMARK,
      ref01: record.REF01,
      ref02: record.REF02,
    });
  };

  render() {
    const { dangerMainYN } = this.props;
    const { dangerList } = this.state;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
        <StyledViewDesigner>
          <Sketch>
            <Group>
              <Row>
                {dangerMainYN ? (
                  ''
                ) : (
                  <Select
                    style={{ width: '100px' }}
                    onChange={(value, option) => this.changeSelectValue(value, option)}
                    value={dangerList && dangerList.MAJOR_CD}
                  >
                    {dangerList && dangerList.map(itme => <Option value={itme.MAJOR_CD}>{itme.CD_NM}</Option>)}
                  </Select>
                )}
                <StyledButton className="btn-primary btn-first" onClick={this.searchData}>
                  검색
                </StyledButton>
                <StyledButton className="btn-primary btn-first" onClick={() => message.info('개발중입니다.')}>
                  엑셀받기
                </StyledButton>
              </Row>
              {this.renderTable()}
            </Group>
          </Sketch>
        </StyledViewDesigner>
      </div>
    );
  }
}

List.propTypes = {
  dangerMainYN: PropTypes.bool,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;

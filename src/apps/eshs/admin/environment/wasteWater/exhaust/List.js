import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, message } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdLineTable = StyledLineTable(Table);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exhuastNm: '',
      exhuastCd: '',
    };
  }

  componentDidMount() {
    this.listDataApi();
  }

  changeInputValue = value => {
    this.setState({ exhuastNm: value });
  };

  listDataApi = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsExhaust',
        url: '/api/eshs/v1/common/eshsexhaust',
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiAry);
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      PARAM: { EXHAUST_CD: this.state.exhuastCd, EXHAUST_NM: this.state.exhuastNm },
    };
    if (this.state.exhuastNm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsexhaust', submitData, this.listDataApi);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsexhaust', submitData, this.listDataApi);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsexhaust', submitData, this.listDataApi);
      }
    } else {
      message.warning('배출시설명을 올바르게 입력하시오.');
    }
    this.onCancel();
  };

  onCancel() {
    this.setState({
      exhuastNm: '',
      exhuastCd: '',
    });
  }

  selectedRecord = record => {
    this.setState({
      exhuastNm: record.EXHAUST_NM,
      exhuastCd: record.EXHAUST_CD,
    });
  };

  render() {
    const {
      result: { eshsExhaust },
    } = this.props;
    const dataSource = eshsExhaust && eshsExhaust.list;
    const { exhuastNm, exhuastCd } = this.state;
    const columns = [
      {
        title: '상태',
        align: 'center',
        width: 150,
        children: [
          {
            title: (
              <>
                <div className="td-input-wrapper">
                  <span className="span-item">{exhuastCd}</span>
                </div>
              </>
            ),
            align: 'center',
            dataIndex: 'EXHAUST_CD',
            className: 'th-form',
          },
        ],
      },
      {
        title: '코드',
        align: 'center',
        children: [
          {
            title: (
              <>
                <div className="td-input-wrapper">
                  <AntdInput
                    className="input-sm input-center"
                    style={{ width: '300px' }}
                    value={exhuastNm}
                    onChange={e => this.changeInputValue(e.target.value)}
                  />
                </div>
              </>
            ),
            align: 'center',
            dataIndex: 'EXHAUST_NM',
            className: 'th-form',
          },
        ],
      },
    ];
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <StyledButtonWrapper>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('I')}>
              추가
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('U')}>
              수정
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => this.onChangeData('D')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary" onClick={this.onCancel}>
              Reset
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          className="tableWrapper tableCodeWrapper"
          rowKey={dataSource && dataSource.EXHAUST_CD}
          columns={columns}
          dataSource={dataSource || []}
          onRow={record => ({
            onClick: () => {
              this.selectedRecord(record);
            },
          })}
          footer={() => <span>{`${(dataSource && dataSource.length) || 0} 건`}</span>}
        />
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;

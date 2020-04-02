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
      cleanNm: '',
      cleanCd: '',
      treatmentMethod: '',
    };
  }

  componentDidMount() {
    this.listDataApi();
    this.setColumns();
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value }, this.setColumns);
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
  };

  onChangeData = value => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitData = {
      PARAM: { CLEAN_CD: this.state.cleanCd, CLEAN_NM: this.state.cleanNm, TREATMENT_METHOD: this.state.treatmentMethod },
    };
    if (this.state.cleanNm) {
      if (value === 'U') {
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsclean', submitData, this.listDataApi);
      } else if (value === 'D') {
        submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsclean', submitData, this.listDataApi);
      } else {
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsclean', submitData, this.listDataApi);
      }
    } else {
      message.warning('배출시설명을 올바르게 입력하시오.');
    }
    this.onCancel();
  };

  onCancel() {
    this.setState(
      {
        cleanNm: '',
        cleanCd: '',
        treatmentMethod: '',
      },
      this.setColumns,
    );
  }

  selectedRecord = record => {
    this.setState(
      {
        cleanNm: record.CLEAN_NM,
        cleanCd: record.CLEAN_CD,
        treatmentMethod: record.TREATMENT_METHOD,
      },
      this.setColumns,
    );
  };

  setColumns = () => {
    const { cleanCd, cleanNm, treatmentMethod } = this.state;
    const columns = [
      {
        title: (
          <>
            <span className="th-label">코드</span>
            <div className="td-input-wrapper">
              <span className="span-item">{cleanCd}</span>
            </div>
          </>
        ),
        dataIndex: 'CLEAN_CD',
        align: 'center',
        width: 150,
      },
      {
        title: (
          <>
            <span className="th-label">방지시설명</span>
            <div className="td-input-wrapper">
              <AntdInput
                className="input-sm input-center"
                style={{ width: '300px' }}
                value={cleanNm}
                onChange={e => this.onChangeValue('cleanNm', e.target.value)}
              />
            </div>
          </>
        ),
        dataIndex: 'CLEAN_NM',
        align: 'left',
      },
      {
        title: (
          <>
            <span className="th-label">처리방법</span>
            <div className="td-input-wrapper">
              <AntdInput
                className="input-sm input-center"
                style={{ width: '300px' }}
                value={treatmentMethod}
                onChange={e => this.onChangeValue('treatmentMethod', e.target.value)}
              />
            </div>
          </>
        ),
        dataIndex: 'TREATMENT_METHOD',
        align: 'left',
      },
    ];
    this.setState({ columns });
  };

  render() {
    const { columns } = this.state;
    const {
      result: { eshsclean },
    } = this.props;
    const dataSource = eshsclean && eshsclean.list;
    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white' }}>
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
              <StyledButton className="btn-primary" onClick={() => this.onCancel()}>
                Reset
              </StyledButton>
            </StyledButtonWrapper>
          </div>
          <AntdLineTable
            className="tableWrapper tableCodeWrapper"
            rowKey={dataSource && dataSource.CLEAN_CD}
            columns={columns}
            dataSource={dataSource || []}
            onRow={record => ({
              onClick: () => {
                this.selectedRecord(record);
              },
            })}
            footer={() => <div style={{ textAlign: 'center' }}>{`${dataSource && dataSource.length - 1} 건`}</div>}
          />
        </ContentsWrapper>
      </div>
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

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
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
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
    this.setState({
      cleanNm: '',
      cleanCd: '',
      treatmentMethod: '',
    });
  }

  selectedRecord = record => {
    this.setState({
      cleanNm: record.CLEAN_NM,
      cleanCd: record.CLEAN_CD,
      treatmentMethod: record.TREATMENT_METHOD,
    });
  };

  render() {
    const { cleanCd, cleanNm, treatmentMethod } = this.state;
    const {
      result: { eshsclean },
    } = this.props;
    const dataSource = eshsclean && eshsclean.list;
    const columns = [
      {
        title: '코드',
        align: 'center',
        width: 150,
        children: [
          {
            title: (
              <>
                <div className="td-input-wrapper">
                  <span className="span-item">{cleanCd}</span>
                </div>
              </>
            ),
            align: 'center',
            dataIndex: 'CLEAN_CD',
            className: 'th-form',
          },
        ],
      },
      {
        title: '방지시설명',
        align: 'left',
        children: [
          {
            title: (
              <>
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
            align: 'left',
            dataIndex: 'CLEAN_NM',
            className: 'th-form',
          },
        ],
      },
      {
        title: '처리방법',
        align: 'left',
        children: [
          {
            title: (
              <>
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
            align: 'left',
            dataIndex: 'TREATMENT_METHOD',
            className: 'th-form',
          },
        ],
      },
    ];
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

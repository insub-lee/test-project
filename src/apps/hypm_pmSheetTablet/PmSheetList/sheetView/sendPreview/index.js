import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
// import moment from 'moment';

export default class SendPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  handleClose = () => {
    this.setState({ visible: false });
  }

  handleSend = () => {
    console.log('Send');
  }

  render() {
    const { sheetList, doOperation, detailData, hyPmState } = this.props;
    return (
      <div>
        <Modal
          // title="송부 전 미리보기"
          visible={this.state.visible}
          footer={null}
          closable={false}
          width={'60%'}
        >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 30,
            }}
          >
            <button
              style={{
                width: '60px',
                height: '60px',
                border: '1px solid black',
              }}
              onClick={() => this.handleClose()}
            >
              X
            </button>
            <span
              style={{
                marginLeft: 10,
              }}
            >
              송부 전 미리보기
            </span>
            <button
              style={{
                color: 'blue',
                width: '250px',
                height: '60px',
                border: '1px solid black',
              }}              
              onClick={() => this.handleSend()}
            >
              SK Hynix로 송부
            </button>
          </div>          
          <span style={{ fontSize: '50px' }}>
            {hyPmState}
          </span>
          <table>
            <tbody>
              <tr>
                <th>FAB</th>
                <td>{detailData.list.ES_INFO[0].BEBER_T}</td>
                <th>AREA</th>
                <td>{detailData.list.ES_INFO[0].STORT_T}</td>
              </tr>
              <tr>
                <th>TEAM</th>
                <td>{detailData.list.ES_INFO[0].TPLNR_T}</td>
                <th>도급사명</th>
                <td>SMC</td>
              </tr>
              <tr>
                <th>SDPT</th>
                <td>{detailData.list.ES_INFO[0].ARBPL_T}</td>
                <th>EQ Model</th>
                <td>{detailData.list.ES_INFO[0].EQART_T}</td>
              </tr>
              <tr>
                <th>EQ ID</th>
                <td>{detailData.list.ES_INFO[0].TIDNR}</td>
                <th>정기/재PM사유</th>
                <td>정기PM</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          {
            doOperation.map((list, i) => (
            <div key={`${i}/${list.toString()}`}>
              <div style={{ marginTop: '50px' }}>
                <span>
                  {`${i+1}0. ${list.OPER_T}`}
                </span>
              </div>
              <div>
                <table>
                  <tbody>
                    <tr style={{ height: 35, fontWeight: 'bold', fontSize: 15 }}>
                      <td style={{ width: '500px' }}>목표시간</td>
                      <td style={{ width: '500px' }}>총 소요시간</td>
                      <td style={{ width: '500px' }}>지연 사유</td>
                      <td style={{ width: '2000px' }}>작업자</td>
                    </tr>
                    <tr>
                      <td>{list.NTENZ}</td>
                      <td style={{ color: 'red' }}>
                        {/* {moment(list.NTANZ, 'kk:mm:ss').diff(list.NTANZ, 'kk:mm:ss')} */}
                        {list.NTANZ}
                      </td>
                      <td></td>
                      <td>{list.ZTXT}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <thead>
                    <tr style={{ height: 35, fontWeight: 'bold', fontSize: 15 }}>
                      <th style={{ width: '500px', paddingLeft: '25px' }}></th>
                      <th style={{ width: '200px', textAlign: 'center' }}>소요시간</th>
                      <th style={{ width: '200px', textAlign: 'center' }}>최종값</th>
                      <th style={{ width: '200px', textAlign: 'center' }}>이전값</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sheetList[i].map((data, idx) => (
                      <tr key={`${idx}/${data.toString()}`}>
                        <td>
                          {`${i+1}0.${idx+1} ${data.MIC_T}`}
                        </td>
                        <td>{data.NTANZ}</td>
                        <td></td>
                        <td></td>
                      </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
            ))
          }
        </div>
        </Modal>
      </div>
    );
  };
}
SendPreview.propTypes = {
  sheetList: PropTypes.array.isRequired,
  doOperation: PropTypes.array.isRequired,
  detailData: PropTypes.object.isRequired,
};

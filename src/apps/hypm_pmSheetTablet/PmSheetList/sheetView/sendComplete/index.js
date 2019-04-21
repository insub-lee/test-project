import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SendComplete = (props) => {
  const {
    sheetList,
    doOperation,
    detailData,
    hyPmState,
    roleDetail,
    onBack,
    handleToggleOpen,
    visible,
  } = props;

  return (
    <div>
      <Modal
        visible={visible}
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
            onClick={handleToggleOpen}
          >
            X
          </button>
          <span
            style={{
              marginLeft: 10,
            }}
          >
          {
            roleDetail === '910' ? (
              '송부 완료'
            ) : (
              '저장 완료'
            )
          }
          </span>
          <button
            className=""
            title="취소"
            onClick={onBack}
            style={{
              width: '250px',
              height: '60px',
              border: '1px solid black',
            }}
          >
            작업 목록으로 이동
          </button>
        </div>
        {
          roleDetail === '910' ? (
            <div
              style={{
                height: 200,
              }}
            >
              <span>
                송부가 완료되었습니다.
              </span>
              <span>
                작업하시느라 고생 많으셨습니다.
              </span>
            </div>
          ) : (
            <div
              style={{
                height: 200,
              }}
            >
              <span>
                저장이 완료되었습니다.
              </span>
              <span>
                작업하시느라 고생 많으셨습니다!
              </span>
              <span>
                GIPMS에서 작성한 PM Sheet를 확인/상신할 수 있습니다.
              </span>                
            </div>
          )
        }
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
            {
              roleDetail === '910' ? (
                <div>
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
              ) : (
                <div>
                  <div>
                    <table>
                      <tbody>
                        <tr style={{ height: 35, fontWeight: 'bold', fontSize: 15 }}>
                          <td style={{ width: '2000px' }}>작업자</td>
                        </tr>
                        <tr>
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
                            <td></td>
                            <td></td>
                          </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            }
          </div>
          ))
        }
      </div>
      </Modal>
    </div>
  );
};

SendComplete.propTypes = {
  onBack: PropTypes.func.isRequired,
  handleToggleOpen: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  sheetList: PropTypes.array.isRequired,
  doOperation: PropTypes.array.isRequired,
  detailData: PropTypes.object.isRequired,
  roleDetail: PropTypes.string.isRequired,
};

export default connect(null, null)(SendComplete);
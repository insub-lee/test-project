import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const rejectCommont  = (props) => {

  const {
    eqId,
    pmSheetNo,
    reqName,
    appName,
    appComment,
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
          <h1>PM Sheet 부결내역</h1>
          <button
            style={{
              width: '60px',
              height: '60px',
              border: '1px solid black',
              float: 'right',
            }}
            onClick={handleToggleOpen}
          >
            X
          </button>
        </div>
        <div>
          <div 
            className='gipms'
            style={{
              height: 200,
            }}
          >
            <table className='data-table'>
              <tbody>
                <tr>
                  <th>EQ ID</th>
                  <td><span>{eqId}</span></td>
                  <th>PM Sheet No</th>
                  <td><span>{pmSheetNo}</span></td>
                </tr>
                <tr>
                  <th>기안자</th>
                  <td><span>{reqName}</span></td>
                  <th>승인자</th>
                  <td><span>{appName}</span></td>
                </tr>
                <tr>
                  <th>부결사유</th>
                  <td colSpan={3}><span>{appComment}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </Modal>
      </div>
    );
};

rejectCommont.propTypes = {
  eqId: PropTypes.string.isRequired,
  pmSheetNo: PropTypes.string.isRequired,
  reqName: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  appComment: PropTypes.string.isRequired,
  handleToggleOpen: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default rejectCommont;

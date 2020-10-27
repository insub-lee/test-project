import React, { useState, useRef } from 'react';
import moment from 'moment';

import request from 'utils/request';
import alertMessage from '../../../components/Notification/Alert';

export default ({ data = [] }) => {
  const registAreaModalRef = useRef(null);

  const [checkedList, setCheckedList] = useState([]);

  // Todo - Toggle All
  const handleChangeAll = () => setCheckedList(prevState => (prevState.length === data.length ? [] : data.map(({ postno }) => postno)));

  // Todo - Toggle one
  const handleChangeCheck = postno =>
    setCheckedList(prevState => (prevState.includes(postno) ? prevState.filter(value => value !== postno) : [...prevState, postno]));

  // Todo - Get Type Column
  const getTypeColumn = (hpostno, record) => {
    let typeStr = '';
    const keyValue = 'type';
    if (record.hpostno === 0) {
      typeStr = JSON.parse(record.content)[keyValue];
    }
    return typeStr;
  };

  // Todo - Get ToolTip Text
  const getToolTipText = (content, hpostno) => {
    let tooltiptext = '';
    let keyValue = 'textarea-1539755684624';

    if (hpostno > 0) {
      keyValue = 'reply';
    }

    tooltiptext = JSON.parse(content)[keyValue];
    return tooltiptext;
  };

  // Todo - Get Status Column
  const getStatusColumn = (hpostno, clsyn, rejectyn) => {
    let status = '';
    if (hpostno > 0 && clsyn !== null) {
      status = '완료';
    } else if (hpostno > 0 && rejectyn !== null) {
      status = '불가';
    }
    return status;
  };

  const deleteData = async payload => {
    const url = '/apigate/v1/portal/post';
    const { response, error } = await request({
      url,
      method: 'DELETE',
      data: payload,
    });
    return { response, error };
  };

  const deleteCheckedList = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const payload = {
        brdid: 'brd00000000000000024',
        postno: '',
        checkedList,
      };
      deleteData(payload)
        .then(({ response, error }) => {
          if (response && !error) {
            const { deleteyn } = response;
            if (deleteyn) {
              // Reload table
              alertMessage.alert('네트워크 에러');
            }
          } else {
            alertMessage.alert('네트워크 에러');
          }
        })
        .catch(() => {
          alertMessage.alert('네트워크 에러');
        });
    }
  };

  const handleOpenRegistModal = () => {
    registAreaModalRef.current.handleOpen(() => {});
  };

  const columns = [
    {
      title: (
        <div className="checkbox">
          <input
            type="checkbox"
            id="change-all-checkbox"
            // checked={data.filter(row => !(row.hpostno > 0)).length === checkedList.length}
            onChange={handleChangeAll}
          />
          <label htmlFor="change-all-checkbox">
            <span />
          </label>
        </div>
      ),
      dataIndex: 'postno',
      key: 'postno',
      width: '5%',
      // render: (postno, record) => this.getCheckBox(postno, record, checkedList),
      render: (postno, record) => {
        if (record.hpostno > 0) return '';
        return (
          <div className="checkbox">
            <input type="checkbox" id={`checkbox-${postno}`} checked={checkedList.includes(postno)} onChange={() => handleChangeCheck(postno)} />
            <label htmlFor={`checkbox-${postno}`}>
              <span />
            </label>
          </div>
        );
      },
    },
    {
      title: '요청일',
      dataIndex: 'regdt',
      key: 'regdt',
      width: '10%',
      render: regdt => moment(regdt).format('YYYY.MM.DD'),
    },
    {
      title: '소속',
      dataIndex: 'deptnm',
      key: 'deptnm',
      width: '10%',
    },
    {
      title: '요청자',
      dataIndex: 'regnm',
      key: 'regnm',
      width: '10%',
    },
    {
      title: '분류',
      dataIndex: 'postno',
      key: 'postno',
      width: '5%',
      render: (hpostno, record) => getTypeColumn(hpostno, record),
    },
    {
      title: '개선요청사항',
      dataIndex: 'title',
      key: 'title',
      width: '45%',
      render: (title, record) => (
        <div className="tooltip">
          <button
            type="button"
            onClick={() => {
              console.debug('Open Modal Please~');
            }}
          >
            {record.hpostno > 0 && (
              <>
                <span className="icon icon_reply" />
                &nbsp;&nbsp;
              </>
            )}
            {title}
            <span className="tooltiptext">{getToolTipText(record.content, record.hpostno)}</span>
          </button>
        </div>
      ),
    },
    {
      title: '상태',
      dataIndex: 'hpostno',
      key: 'hpostno',
      width: '5%',
      render: (hpostno, record) => getStatusColumn(hpostno, record.clsyn, record.rejectyn),
    },
  ];

  return {
    registAreaModalRef,
    checkedList,
    columns,
    actions: {
      handleChangeAll,
      handleChangeCheck,
      handleOpenRegistModal,
      getTypeColumn,
      getToolTipText,
      getStatusColumn,
      deleteCheckedList,
    },
  };
};

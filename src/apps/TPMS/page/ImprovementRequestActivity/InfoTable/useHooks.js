/* eslint-disable camelcase */
import moment from 'moment';
import React, { useRef, useState } from 'react';
import request from 'utils/request';
import getJsonObject from '../../../utils/getJsonObject';
import alertMessage from '../../../components/Notification/Alert';

export default ({ data = [], openModal = () => {}, callback = () => {}, processRecord }) => {
  const registAreaModalRef = useRef(null);

  const [checkedList, setCheckedList] = useState([]);

  // Todo - Toggle All
  const handleChangeAll = () => setCheckedList(prevState => (prevState.length === data.length ? [] : data.map(({ task_seq }) => task_seq)));

  // Todo - Toggle one
  const handleChangeCheck = task_seq =>
    setCheckedList(prevState => (prevState.includes(task_seq) ? prevState.filter(value => value !== task_seq) : [...prevState, task_seq]));

  // Todo - Get Type Column
  const getTypeColumn = (parentno, record) => {
    let typeStr = '';
    const keyValue = 'type';
    if (record.parentno === 0) {
      typeStr = JSON.parse(record.content)[keyValue];
    }
    return typeStr;
  };

  // Todo - Get ToolTip Text
  const getToolTipText = (content, parentno) => {
    let tooltiptext = '';
    let keyValue = 'textarea';

    if (parentno > 0) {
      keyValue = 'reply';
    }

    tooltiptext = JSON.parse(content)[keyValue];
    return tooltiptext;
  };

  // Todo - Get Status Column
  const getStatusColumn = (parentno, record) => {
    const { clsyn, rejectyn, content } = record;
    const temp = getJsonObject(content);
    console.debug('parentno, clsyn, rejectyn:', parentno, clsyn, rejectyn, temp?.status);
    let status = '';
    if (parentno > 0) {
      if (clsyn === 'Y' || temp?.status === '완료') {
        status = '완료';
      } else if (rejectyn === 'Y' || temp?.status === '불가') {
        status = '불가';
      } else {
        status = '진행중';
      }
    }

    return status;
  };

  const deleteData = async payload => {
    const url = '/api/tpms/v1/common/board';
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
        checkedList,
      };
      deleteData(payload)
        .then(({ response, error }) => {
          console.debug('response, error  :', response, error);

          if (response && !error) {
            const { deleteyn } = response;
            if (deleteyn) {
              // Reload table
              setCheckedList([]);
              callback();
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
    registAreaModalRef.current.handleOpen(() => {
      callback(1);
    });
  };

  const columns = [
    {
      title: (
        <div className="checkbox">
          <input
            type="checkbox"
            id="change-all-checkbox"
            // checked={data.filter(row => !(row.parentno > 0)).length === checkedList.length}
            onChange={handleChangeAll}
            checked={checkedList.length > 0}
          />
          <label htmlFor="change-all-checkbox">
            <span />
          </label>
        </div>
      ),
      dataIndex: 'task_seq',
      key: 'task_seq',
      width: '5%',
      // render: (task_seq, record) => this.getCheckBox(task_seq, record, checkedList),
      render: (task_seq, record) => {
        if (record.parentno > 0) return '';
        return (
          <div className="checkbox">
            <input type="checkbox" id={`checkbox-${task_seq}`} checked={checkedList.includes(task_seq)} onChange={() => handleChangeCheck(task_seq)} />
            <label htmlFor={`checkbox-${task_seq}`}>
              <span />
            </label>
          </div>
        );
      },
    },
    {
      title: '요청일',
      dataIndex: 'reg_dttm',
      key: 'reg_dttm',
      width: '10%',
      render: regdt => moment(regdt).format('YYYY.MM.DD'),
    },
    {
      // todo
      title: '소속',
      dataIndex: 'reg_dept_name',
      key: 'reg_dept_name',
      width: '10%',
    },
    {
      title: '요청자',
      dataIndex: 'reg_user_name',
      key: 'reg_user_name',
      width: '10%',
    },
    {
      title: '분류',
      dataIndex: 'parentno',
      key: 'parentno',
      width: '5%',
      render: (parentno, record) => getTypeColumn(parentno, record),
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
              processRecord(record);
              openModal('INQ');
            }}
          >
            {record.parentno > 0 && (
              <>
                <span className="icon icon_reply" />
                &nbsp;&nbsp;
              </>
            )}
            {title}
            <span className="tooltiptext">{getToolTipText(record?.content, record?.parentno)}</span>
          </button>
        </div>
      ),
    },
    {
      title: '상태',
      dataIndex: 'parentno',
      key: 'parentno',
      width: '5%',
      render: (parentno, record) => getStatusColumn(parentno, record),
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

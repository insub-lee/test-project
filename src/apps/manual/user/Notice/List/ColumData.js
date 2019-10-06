import React from 'react';
import moment from 'moment';
import { Icon } from 'antd';
export const columns = [
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => {
      const { viewChange, key, selectedRecord } = record;
      return (
        <a
          role="button"
          className="title"
          onClick={() => {
            viewChange('View', key);
            selectedRecord(record);
          }}
        >
          {text}
        </a>
      );
    },
  },
  {
    title: '분류',
    dataIndex: 'categorie',
    key: 'categorie',
  },
  {
    title: '최종수정일',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    render: text => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: '첨부파일',
    dataIndex: 'file',
    render: type => (type ? <Icon type="save" style={{ color: '#886ab5', fontSize: '25px' }} /> : ''),
    key: 'file',
  },
];

import React from 'react';
import PropTypes from 'prop-types';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import TableTransfer from './TableTransfer';

const columns = [
  {
    dataIndex: 'DOCNUMBER',
    title: '문서번호',
    align: 'center',
    width: '25%',
  },
  {
    dataIndex: 'VERSION',
    title: 'REV.',
    align: 'center',
    width: '20%',
  },
  {
    dataIndex: 'TITLE',
    title: '제목',
    align: 'center',
    width: '50%',
    ellipsis: true,
  },
];

const TransferView = ({ dataSource, targetKeys, setTargetKeys, submitKeys }) => (
  <div>
    <TableTransfer
      titles={['폐기 대상 사내표준', '선택된 사내표준']}
      dataSource={dataSource}
      targetKeys={targetKeys}
      showSearch
      onChange={nextTargetKeys => setTargetKeys(nextTargetKeys)}
      filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1 || item.id.indexOf(inputValue) !== -1}
      leftColumns={columns}
      rightColumns={columns}
      listStyle={{
        width: 500,
      }}
    />
    <div className="btn-wrap">
      <StyledButton className={targetKeys.length > 0 ? 'btn-primary' : 'btn-gray'} disabled={!targetKeys.length > 0} onClick={submitKeys}>
        선택완료
      </StyledButton>
    </div>
  </div>
);

TransferView.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
  targetKeys: PropTypes.arrayOf(PropTypes.string),
  setTargetKeys: PropTypes.func,
  submitKeys: PropTypes.func,
};

TransferView.defaultProps = {
  dataSource: [],
  targetKeys: [],
  setTargetKeys: () => {},
  submitKeys: () => {},
};

export default TransferView;

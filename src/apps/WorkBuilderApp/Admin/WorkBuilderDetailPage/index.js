import React from 'react';
import PropTypes from 'prop-types';

import Tabs from 'components/Tabs';

import Info from './Info';
import ViewDesigner from './ViewDesigner';
import Wrapper from './Wrapper';
import ProcessDesigner from './ProcessDesigner';

const bodyStyle = {
  padding: '1rem',
  width: '100%',
  height: 'calc(100vh - 130px)',
  overflowY: 'auto',
};

const getTabs = workSeq => [
  {
    id: 0,
    TabComponent: '기본정보',
    TabPanelComponent: (
      <div style={bodyStyle}>
        <Info id={workSeq} />
      </div>
    ),
  },
  {
    id: 1,
    TabComponent: '업무 디자이너',
    TabPanelComponent: (
      <div style={bodyStyle}>
        {/* <Designer id={ID} /> */}
        <ViewDesigner workSeq={workSeq} />
      </div>
    ),
  },
  {
    id: 2,
    TabComponent: '스타일 디자이너',
    TabPanelComponent: (
      <div style={bodyStyle}>
        <ViewDesigner workSeq={workSeq} styleMode />
      </div>
    ),
  },
  // {
  //   id: 2,
  //   TabComponent: 'List 뷰관리',
  //   TabPanelComponent: (
  //     <div style={bodyStyle}>
  //       <TableDesigner id={ID} />
  //     </div>
  //   ),
  // },
  // {
  //   id: 3,
  //   TabComponent: '옵션관리',
  //   TabPanelComponent: (
  //     <div style={bodyStyle}>
  //       <Option id={ID} />
  //     </div>
  //   ),
  // },
  {
    id: 4,
    TabComponent: '프로세스 관리',
    TabPanelComponent: (
      <div style={{ ...bodyStyle, height: 'auto' }}>
        <ProcessDesigner id={workSeq} />
      </div>
    ),
  },
];

const WorkBuilderDetailPage = ({
  // match: {
  //   params: { ID },
  // },
  workSeq,
}) => (
  <Wrapper>
    <Tabs tabs={getTabs(workSeq)} keyName="id" title="업무빌더관리" bodyStyle={bodyStyle} />
  </Wrapper>
);

WorkBuilderDetailPage.propTypes = {
  // match: PropTypes.object.isRequired,
  workSeq: PropTypes.number.isRequired,
};

export default WorkBuilderDetailPage;

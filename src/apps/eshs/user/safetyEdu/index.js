import React from 'react';
// import BizBuilderBase from 'components/BizBuilderBase';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import EduMgt from './EduMgt'; // 안전교육 이수 등록
// import EduWokerMgt from './EduWokerMgt'; // 안전교육 이수자 관리 현황 (OZ report)
// import EduCmpnyMgt from './EduCmpnyMgt'; // 업체별 안전교육 이수관리 현황 (OZ report)
// import EduCmpnyList from './EduCmpnyList'; // 안전교육 이수업체 리스트 (OZ report)

const safetyEdu = () => (
  <Styeld>
    <BizMicroDevBase component={EduMgt} sagaKey="safetyEdu" />
  </Styeld>
);

export default safetyEdu;

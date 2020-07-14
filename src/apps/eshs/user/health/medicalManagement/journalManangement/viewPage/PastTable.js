import React from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const PastTable = ({ dataObject = {}, useBedPatient = [] }) => (
  <>
    <StyledHtmlTable>
      <div style={{ marginBottom: '20px' }}>
        <table>
          <colgroup>
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="40%" />
          </colgroup>
          <tbody>
            <tr>
              <th colSpan={2}>상병자</th>
              <th colSpan={2}>치료</th>
              <th>비고</th>
            </tr>
            <tr>
              <th>의사진료</th>
              <td>{dataObject.T1 || 0}</td>
              <th>사상</th>
              <td>{dataObject.P1 || 0}</td>
              <td rowSpan={3}></td>
            </tr>
            <tr>
              <th>비진료</th>
              <td>{dataObject.T2 || 0}</td>
              <th>공상</th>
              <td>{dataObject.P2 || 0}</td>
            </tr>
            <tr>
              <th>총진료</th>
              <td>{dataObject.TA || 0}</td>
              <th>총치료</th>
              <td>{dataObject.PA || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span className="selSaveWrapper textLabel alignLeft">상병자</span>
        <table>
          <colgroup>
            <col width="3%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
            <col width="6%" />
          </colgroup>
          <tbody>
            <tr>
              <th>구분</th>
              <th>호흡/감기</th>
              <th>소화기</th>
              <th>근육통</th>
              <th>두통</th>
              <th>복통</th>
              <th>피부</th>
              <th>안과</th>
              <th>염증</th>
              <th>상담</th>
              <th>기타</th>
              <th>혈압</th>
              <th>당뇨</th>
              <th>외상</th>
              <th>기타 (비직업성)</th>
              <th>근육통 (비직업성)</th>
              <th>계</th>
            </tr>
            <tr>
              <th>남</th>
              <td>{dataObject.DM001 || 0}</td>
              <td>{dataObject.DM002 || 0}</td>
              <td>{dataObject.DM003 || 0}</td>
              <td>{dataObject.DM004 || 0}</td>
              <td>{dataObject.DM005 || 0}</td>
              <td>{dataObject.DM006 || 0}</td>
              <td>{dataObject.DM007 || 0}</td>
              <td>{dataObject.DM010 || 0}</td>
              <td>{dataObject.DM009 || 0}</td>
              <td>{dataObject.DM008 || 0}</td>
              <td>{dataObject.DM011 || 0}</td>
              <td>{dataObject.DM012 || 0}</td>
              <td>{dataObject.DM013 || 0}</td>
              <td>{dataObject.DM064 || 0}</td>
              <td>{dataObject.DM065 || 0}</td>
              <td>{dataObject.DM || 0}</td>
            </tr>
            <tr>
              <th>여</th>
              <td>{dataObject.DF001 || 0}</td>
              <td>{dataObject.DF002 || 0}</td>
              <td>{dataObject.DF003 || 0}</td>
              <td>{dataObject.DF004 || 0}</td>
              <td>{dataObject.DF005 || 0}</td>
              <td>{dataObject.DF006 || 0}</td>
              <td>{dataObject.DF007 || 0}</td>
              <td>{dataObject.DF010 || 0}</td>
              <td>{dataObject.DF009 || 0}</td>
              <td>{dataObject.DF008 || 0}</td>
              <td>{dataObject.DF011 || 0}</td>
              <td>{dataObject.DF012 || 0}</td>
              <td>{dataObject.DF013 || 0}</td>
              <td>{dataObject.DF064 || 0}</td>
              <td>{dataObject.DF065 || 0}</td>
              <td>{dataObject.DF || 0}</td>
            </tr>
            <tr>
              <th>계</th>
              <td>{dataObject.DA001 || 0}</td>
              <td>{dataObject.DA002 || 0}</td>
              <td>{dataObject.DA003 || 0}</td>
              <td>{dataObject.DA004 || 0}</td>
              <td>{dataObject.DA005 || 0}</td>
              <td>{dataObject.DA006 || 0}</td>
              <td>{dataObject.DA007 || 0}</td>
              <td>{dataObject.DA010 || 0}</td>
              <td>{dataObject.DA009 || 0}</td>
              <td>{dataObject.DA008 || 0}</td>
              <td>{dataObject.DA011 || 0}</td>
              <td>{dataObject.DA012 || 0}</td>
              <td>{dataObject.DA013 || 0}</td>
              <td>{dataObject.DA064 || 0}</td>
              <td>{dataObject.DA065 || 0}</td>
              <td>{dataObject.DA || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span className="selSaveWrapper textLabel alignLeft">치료</span>
        <table>
          <colgroup>
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
            <col width="7.6%" />
          </colgroup>
          <tbody>
            <tr>
              <th colSpan={4}>사상/공상</th>
              <th rowSpan={2}>사상/공상 계</th>
              <th rowSpan={2}>BED</th>
              <th rowSpan={2}>후송</th>
              <th rowSpan={2}>방사선</th>
              <th rowSpan={2}>물리치료</th>
              <th rowSpan={2}>임상</th>
              <th rowSpan={2}>처방전미발행</th>
              <th rowSpan={2}>진료</th>
              <th rowSpan={2}>계</th>
            </tr>
            <tr>
              <th>화상</th>
              <th>좌상</th>
              <th>창상</th>
              <th>소계</th>
            </tr>
            <tr>
              <td>{dataObject.R1011 || 0}</td>
              <td>{dataObject.R1012 || 0}</td>
              <td>{dataObject.R1013 || 0}</td>
              <td>{dataObject.R1A || 0}</td>
              <td rowSpan={2}>{dataObject.R || 0}</td>
              <td rowSpan={2}>{dataObject.R002 || 0}</td>
              <td rowSpan={2}>{dataObject.R003 || 0}</td>
              <td rowSpan={2}>{dataObject.R006 || 0}</td>
              <td rowSpan={2}>{dataObject.R007 || 0}</td>
              <td rowSpan={2}>{dataObject.R008 || 0}</td>
              <td rowSpan={2}>{dataObject.R009 || 0}</td>
              <td rowSpan={2}>{dataObject.R015 || 0}</td>
              <td rowSpan={2}>{dataObject.RA || 0}</td>
            </tr>
            <tr>
              <td>{dataObject.R2011 || 0}</td>
              <td>{dataObject.R2012 || 0}</td>
              <td>{dataObject.R2013 || 0}</td>
              <td>{dataObject.R2A || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span className="selSaveWrapper textLabel alignLeft">BED/후송환자 현황</span>
        <table>
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <tbody>
            <tr>
              <th>일시</th>
              <th>소속</th>
              <th>사번</th>
              <th>이름</th>
              <th>증상</th>
              <th>조치내용</th>
            </tr>
            {useBedPatient.map(patient => (
              <tr>
                <td>{patient.JRNL_DTTM}</td>
                <td>{patient.DEPT_NAME_KOR}</td>
                <td>{patient.PATIENT_EMP_NO}</td>
                <td>{patient.PATIENT_NAME}</td>
                <td>{patient.SYMPTOMS}</td>
                <td>{patient.MEASURE}</td>
              </tr>
            ))}
            <tr>
              <th colSpan={6}>{`${useBedPatient.length} 건`}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </StyledHtmlTable>
  </>
);

PastTable.propTypes = {
  dataObject: PropTypes.object,
  useBedPatient: PropTypes.arrayOf('object'),
};

export default PastTable;

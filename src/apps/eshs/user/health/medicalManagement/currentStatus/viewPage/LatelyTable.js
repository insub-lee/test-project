import React from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const LatelyTable = ({ dataObject, useBedPatient }) => (
  <>
    <StyledHtmlTable>
      <div style={{ marginBottom: '20px' }}>
        <table>
          <colgroup>
            <col width="12%" />
            <col width="12%" />
            <col width="12%" />
            <col width="12%" />
            <col width="12%" />
            <col width="40%" />
          </colgroup>
          <tbody>
            <tr>
              <th>상병자 총</th>
              <td colSpan={4}>{dataObject.TOTAL || 0}</td>
              <th>비고</th>
            </tr>
            <tr>
              <th>매그나칩</th>
              <th>건강관리실</th>
              <td>{dataObject.TM3 || 0}</td>
              <th>직업성</th>
              <td>{dataObject.PM4 || 0}</td>
              <td rowSpan={4}></td>
            </tr>
            <tr>
              <td>{dataObject.AM || 0}</td>
              <th>CMS</th>
              <td>{dataObject.TM4 || 0}</td>
              <th>비직업성</th>
              <td>{dataObject.PM5 || 0}</td>
            </tr>
            <tr>
              <th>협력업체</th>
              <th>건강관리실</th>
              <td>{dataObject.TH3 || 0}</td>
              <th>직업성</th>
              <td>{dataObject.PH4 || 0}</td>
            </tr>
            <tr>
              <td>{dataObject.AH || 0}</td>
              <th>CMS</th>
              <td>{dataObject.TH4 || 0}</td>
              <th>비직업성</th>
              <td>{dataObject.PH5 || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span className="selSaveWrapper textLabel alignLeft">상병자</span>
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
              <th>구분</th>
              <th>호흡 /감기</th>
              <th>소화기계</th>
              <th>근육통</th>
              <th>두통</th>
              <th>복통</th>
              <th>피부</th>
              <th>안과</th>
              <th>염증</th>
              <th>외상</th>
              <th>상담/검사</th>
              <th>기타</th>
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
              <td>{dataObject.DM008 || 0}</td>
              <td>{dataObject.DM009 || 0}</td>
              <td>{dataObject.DM010 || 0}</td>
              <td>{dataObject.DM011 || 0}</td>
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
              <td>{dataObject.DF008 || 0}</td>
              <td>{dataObject.DF009 || 0}</td>
              <td>{dataObject.DF010 || 0}</td>
              <td>{dataObject.DF011 || 0}</td>
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
              <td>{dataObject.DA008 || 0}</td>
              <td>{dataObject.DA009 || 0}</td>
              <td>{dataObject.DA010 || 0}</td>
              <td>{dataObject.DA011 || 0}</td>
              <td>{dataObject.DA || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span className="selSaveWrapper textLabel alignLeft">치료</span>
        <table>
          <colgroup>
            <col width="12.5%" />
            <col width="12.5%" />
            <col width="12.5%" />
            <col width="12.5%" />
            <col width="12.5%" />
            <col width="12.5%" />
            <col width="12.5%" />
            <col width="10%" />
          </colgroup>
          <tbody>
            <tr>
              <th>일반의약품</th>
              <th>Dressing</th>
              <th>BED</th>
              <th>기타</th>
              <th>안마의자</th>
              <th>상담/검사</th>
              <th>후송</th>
              <th>계</th>
            </tr>
            <tr>
              <td>{dataObject.R001 || 0}</td>
              <td>{dataObject.R002 || 0}</td>
              <td>{dataObject.R003 || 0}</td>
              <td>{dataObject.R007 || 0}</td>
              <td>{dataObject.R005 || 0}</td>
              <td>{dataObject.R006 || 0}</td>
              <td>{dataObject.R004 || 0}</td>
              <td>
                {Number(dataObject.R001) +
                  Number(dataObject.R002) +
                  Number(dataObject.R003) +
                  Number(dataObject.R007) +
                  Number(dataObject.R005) +
                  Number(dataObject.R006) +
                  Number(dataObject.R004)}
              </td>
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

LatelyTable.propTypes = {
  dataObject: PropTypes.object,
  useBedPatient: PropTypes.arrayOf('object'),
};

export default LatelyTable;

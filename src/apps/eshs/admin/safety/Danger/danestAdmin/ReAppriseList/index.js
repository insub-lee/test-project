import React from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import FilePopover from './FilePopover';

const ReAppriseList = ({ reAppriseList, dangerDanestAdminSubFile }) => (
  <StyledHtmlTable style={{ overflow: 'auto', height: 400 }}>
    <table>
      <colgroup>
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
        <col width={100} />
      </colgroup>
      <tbody>
        <tr>
          <th style={{ position: 'sticky', top: 0 }}>세부평가번호</th>
          <th style={{ position: 'sticky', top: 0 }}>순번</th>
          <th style={{ position: 'sticky', top: 0 }}>장비(설비)</th>
          <th style={{ position: 'sticky', top: 0 }}>작업조건</th>
          <th style={{ position: 'sticky', top: 0 }}>위험요인</th>
          <th style={{ position: 'sticky', top: 0 }}>발생형태</th>
          <th style={{ position: 'sticky', top: 0 }}>현재안전조치</th>
          <th style={{ position: 'sticky', top: 0 }}>위험빈도</th>
          <th style={{ position: 'sticky', top: 0 }}>위험강도</th>
          <th style={{ position: 'sticky', top: 0 }}>위험등급</th>
          <th style={{ position: 'sticky', top: 0 }}>개선대책</th>
          <th style={{ position: 'sticky', top: 0 }}>완료예정일</th>
          <th style={{ position: 'sticky', top: 0 }}>개선 첨부파일</th>
          <th style={{ position: 'sticky', top: 0 }}>작성일</th>
          <th style={{ position: 'sticky', top: 0 }}>평가횟수</th>
        </tr>
        {reAppriseList &&
          reAppriseList.map(item => (
            <tr>
              <td>{item.DA_REG_NO}</td>
              <td>{item.SEQ}</td>
              <td>{item.EQUIP_NM}</td>
              <td>{Number(item.WOKRCND) === 1 ? '정상' : '비정상'}</td>
              <td>{item.DANGFACT}</td>
              <td>{item.AOT_NM}</td>
              <td>{item.SAFEACTION}</td>
              <td>{item.DAN_FREQC}</td>
              <td>{item.DAN_STRGT}</td>
              <td>{item.DANGRAD}</td>
              <td>{item.AP_IMPROVE}</td>
              <td>{item.AP_ENDDATE}</td>
              <td>
                {dangerDanestAdminSubFile.filter(filtering => filtering.DANEST_SUB_SEQ === item.UNIQUE_SEQ).length > 0 && (
                  <FilePopover dangerDanestAdminSubFile={dangerDanestAdminSubFile.filter(filtering => filtering.DANEST_SUB_SEQ === item.UNIQUE_SEQ)} />
                )}
              </td>
              <td>{item.REG_DTTM}</td>
              <td>{item.VERSION}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </StyledHtmlTable>
);

ReAppriseList.propTypes = {
  reAppriseList: PropTypes.array,
  dangerDanestAdminSubFile: PropTypes.array,
};

ReAppriseList.defaultProps = {};

export default React.memo(ReAppriseList);

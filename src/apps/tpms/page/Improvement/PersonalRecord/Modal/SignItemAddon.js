import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const SignItemAddon = ({ signProcess }) => (
  <ul className="sub_form small2">
    {signProcess.define_approval_date && (
      <li className="mergeSubWrap">
        <label htmlFor="define" className="title titleCustom">
          현상파악
        </label>
        <ul className="mergeSubForm">
          <li>
            <span className="mergeSpan">리더 코멘트</span>
            <textarea className="mergeTextarea" name="step_one_comment" value={signProcess.step_one_comment} readOnly />
          </li>
          <li>
            <span className="mergeSpan">파일첨부</span>
            {signProcess.step_one_file_path ? (
              <a href={signProcess.step_one_file_path} style={{ padding: 10, background: '#e7e7e7', color: '#111b27' }} download>
                <i className="fas fa-paperclip" /> {signProcess.step_one_file_name}
              </a>
            ) : (
              <input type="text" className="input mergeInput" name="define_attach_file" value={signProcess.step_one_file_name} readOnly />
            )}
          </li>
          <li>
            <span className="mergeSpan">완료일자</span>
            <input
              type="text"
              className="input mergeInput"
              name="define_approval_date"
              value={
                signProcess.define_approval_date && signProcess.define_approval_date !== ''
                  ? moment(signProcess.define_approval_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                  : null
              }
              readOnly
            />
          </li>
        </ul>
      </li>
    )}
    {signProcess.measure_approval_date && (
      <li className="mergeSubWrap">
        <label htmlFor="measure" className="title titleCustom">
          원인분석
        </label>
        <ul className="mergeSubForm">
          <li>
            <span className="mergeSpan">리더 코멘트</span>
            <textarea className="mergeTextarea" name="measure_leader_comment" value={signProcess.measure_leader_comment} readOnly />
          </li>
          <li>
            <span className="mergeSpan">파일첨부</span>
            {signProcess.measure_attach_file ? (
              <a href={signProcess.measure_attach_file_path} style={{ padding: 10, background: '#e7e7e7', color: '#111b27' }} download>
                <i className="fas fa-paperclip" /> {signProcess.measure_attach_file}
              </a>
            ) : (
              <input type="text" className="input mergeInput" name="measure_attach_file" value={signProcess.measure_attach_file} readOnly />
            )}
          </li>
          <li>
            <span className="mergeSpan">완료일자</span>
            <input
              type="text"
              className="input mergeInput"
              name="measure_approval_date"
              value={
                signProcess.measure_approval_date && signProcess.measure_approval_date !== ''
                  ? moment(signProcess.measure_approval_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                  : null
              }
              readOnly
            />
          </li>
        </ul>
      </li>
    )}
    {signProcess.analyze_approval_date && (
      <li className="mergeSubWrap">
        <label htmlFor="analyze" className="title titleCustom">
          대책수립
        </label>
        <ul className="mergeSubForm">
          <li>
            <span className="mergeSpan">리더 코멘트</span>
            <textarea className="mergeTextarea" name="analyze_leader_comment" value={signProcess.analyze_leader_comment} readOnly />
          </li>
          <li>
            <span className="mergeSpan">파일첨부</span>
            {signProcess.analyze_attach_file ? (
              <a href={signProcess.analyze_attach_file_path} style={{ padding: 10, background: '#e7e7e7', color: '#111b27' }} download>
                <i className="fas fa-paperclip" /> {signProcess.analyze_attach_file}
              </a>
            ) : (
              <input type="text" className="input mergeInput" name="analyze_attach_file" value={signProcess.analyze_attach_file} readOnly />
            )}
          </li>
          <li>
            <span className="mergeSpan">완료일자</span>
            <input
              type="text"
              className="input mergeInput"
              name="analyze_approval_date"
              value={
                signProcess.analyze_approval_date && signProcess.analyze_approval_date !== ''
                  ? moment(signProcess.analyze_approval_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                  : null
              }
              readOnly
            />
          </li>
        </ul>
      </li>
    )}
    {signProcess.improve_approval_date && (
      <li className="mergeSubWrap">
        <label htmlFor="improve" className="title titleCustom">
          개선
        </label>
        <ul className="mergeSubForm">
          <li>
            <span className="mergeSpan">리더 코멘트</span>
            <textarea className="mergeTextarea" name="improve_leader_comment" value={signProcess.improve_leader_comment} readOnly />
          </li>
          <li>
            <span className="mergeSpan">파일첨부</span>
            {signProcess.improve_attach_file ? (
              <a href={signProcess.improve_attach_file_path} style={{ padding: 10, background: '#e7e7e7', color: '#111b27' }} download>
                <i className="fas fa-paperclip" /> {signProcess.improve_attach_file}
              </a>
            ) : (
              <input type="text" className="input mergeInput" name="improve_attach_file" value={signProcess.improve_attach_file} readOnly />
            )}
          </li>
          <li>
            <span className="mergeSpan">완료일자</span>
            <input
              type="text"
              className="input mergeInput"
              name="improve_approval_date"
              value={
                signProcess.improve_approval_date && signProcess.improve_approval_date !== ''
                  ? moment(signProcess.improve_approval_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                  : null
              }
              readOnly
            />
          </li>
        </ul>
      </li>
    )}
    {signProcess.control_approval_date && (
      <li className="mergeSubWrap">
        <label htmlFor="control" className="title titleCustom">
          완료/공유
        </label>
        <ul className="mergeSubForm">
          <li>
            <span className="mergeSpan">리더 코멘트</span>
            <textarea className="mergeTextarea" name="control_leader_comment" value={signProcess.control_leader_comment} readOnly />
          </li>
          <li>
            <span className="mergeSpan">파일첨부</span>
            {signProcess.control_attach_file ? (
              <a href={signProcess.control_attach_file_path} style={{ padding: 10, background: '#e7e7e7', color: '#111b27' }} download>
                <i className="fas fa-paperclip" /> {signProcess.control_attach_file}
              </a>
            ) : (
              <input type="text" className="input mergeInput" name="control_attach_file" value={signProcess.control_attach_file} readOnly />
            )}
          </li>
          <li>
            <span className="mergeSpan">완료일자</span>
            <input
              type="text"
              className="input mergeInput"
              name="control_approval_date"
              value={
                signProcess.control_approval_date && signProcess.control_approval_date !== ''
                  ? moment(signProcess.control_approval_date.replace(/\./gi, '-'), 'YYYY-MM-DD').format('YYYY.MM.DD')
                  : null
              }
              readOnly
            />
          </li>
        </ul>
      </li>
    )}
  </ul>
);

SignItemAddon.propTypes = {
  signProcess: PropTypes.object,
};

SignItemAddon.defaultProps = {
  signProcess: {},
};

export default SignItemAddon;

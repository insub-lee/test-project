import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import Styled from './Styled';

const StyledButton = StyledAntdButton(Button);

export default function RowExpand({ record }) {
  return (
    <Styled>
      <div className="detail-head">
        <span className="big">제목</span>
        <span className="line"></span>
        <span className="small">{record.TITLE}</span>
      </div>
      <div className="detail-body">
        <div className="charge-dept">
          <p className="sub-title">담당부서</p>
          <span>{record.CHARGE_DEPT_NM}</span>
        </div>
        <div className="content">
          <p className="sub-title">내용</p>
          <RichTextEditor name="CONTENT" defaultValue={record.CONTENT} config={froalaEditorConfig()} readOnly />
        </div>
      </div>
    </Styled>
  );
}

RowExpand.defaultProps = {};

RowExpand.propTypes = {
  record: PropTypes.object,
};

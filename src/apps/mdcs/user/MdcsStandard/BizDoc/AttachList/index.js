import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, TreeSelect, Row, Col } from 'antd';
import FileUpload from 'components/FormStuff/Upload';
const AttachList = ({ formData, workSeq, taskSeq, handlerAttachChange }) => (
  <>
    <Row>
      <div className="w100Table">
        <Col span={6} className="attachTitle">
          별첨#(본문내용)
        </Col>
        <Col span={18}>
          {formData && formData.ATTACH && (
            <FileUpload
              workSeq={workSeq}
              taskSeq={taskSeq}
              defaultValue={formData.ATTACH}
              saveTempContents={detail => {
                handlerAttachChange(detail, 'ATTACH');
              }}
              multiple={false}
              readOnly={formData.ATTACH.DETAIL.length !== 0}
            ></FileUpload>
          )}
        </Col>
      </div>
    </Row>
    <Row>
      <div className="w100Table">
        <Col span={6} className="attachTitle">
          별첨#1(서식지 or 기술자료)
        </Col>
        <Col span={18}>
          {formData && formData.ATTACH2 && (
            <FileUpload
              workSeq={workSeq}
              taskSeq={taskSeq}
              defaultValue={formData.ATTACH2}
              saveTempContents={detail => {
                handlerAttachChange(detail, 'ATTACH2');
              }}
              multiple={false}
              readOnly={formData.ATTACH2.DETAIL.length !== 0}
            ></FileUpload>
          )}
        </Col>
      </div>
    </Row>
    <Row>
      <div className="w100Table">
        <Col span={6} className="attachTitle">
          별첨#2(기술자료)
        </Col>
        <Col span={18}>
          {formData && formData.ATTACH3 && (
            <FileUpload
              workSeq={workSeq}
              taskSeq={taskSeq}
              defaultValue={formData.ATTACH3}
              saveTempContents={detail => {
                handlerAttachChange(detail, 'ATTACH3');
              }}
              multiple={false}
            ></FileUpload>
          )}
        </Col>
      </div>
    </Row>
  </>
);

export default AttachList;

AttachList.propTypes = {};

import React, { useState, useEffect } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import axios from 'axios';
import { Icon, Progress, Upload, Modal, Button, Tooltip } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { isJSON } from 'utils/helpers';
import StyledDragger from 'components/CommonStyled/StyledDragger';
import StyledButton from 'components/CommonStyled/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import _ from 'lodash';

function ViewUploadedFileComp(props) {
  const [fileInfo, setFileInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    const { WORK_SEQ, formData, COMP_FIELD, COMP_TAG, colData, CONFIG, viewPageData } = props;
    const detail = formData[CONFIG.property.file_col_name] || colData;
    const { DETAIL } = detail;
    const temp = {
      WORK_SEQ,
      TASK_SEQ: -1,
      CONT_SEQ: -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL,
    };

    let down = '';
    if (DETAIL !== undefined) {
      down = DETAIL[0].down;
    }
    const { viewType } = viewPageData || '';
    setIsModify(viewType === 'MODIFY');
    setPreviewImage(down);
    setFileInfo({ ...temp });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(fileInfo)) {
      const { DETAIL } = fileInfo;
      if (DETAIL !== undefined) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      changeFormDataHanlder();
    }
  }, [fileInfo]);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const onClickRemoveFile = () => {
    const temp = { ...fileInfo };
    setFileInfo({ ...temp, DETAIL: undefined });
  };

  const imageRenderer = () => {
    const { DETAIL } = fileInfo;

    if (DETAIL !== undefined) {
      return DETAIL.map((info, idx) => (
        <div>
          <div>
            <span>{info.fileName}</span>
            {isModify && (
              <span>
                <Icon
                  onClick={e => {
                    onClickRemoveFile(info);
                  }}
                  type="delete"
                  style={{ fontSize: '15px', verticalAlign: 'baseline', marginLeft: '10px' }}
                />
              </span>
            )}
          </div>
          <img key={idx + previewImage} src={previewImage} alt="previewImage" style={{ width: '100%' }} />
        </div>
      ));
    }
    return <div>등록된 이미지가 없습니다.</div>;
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setPreviewImage(file.url || file.preview);
  };

  const changeFormDataHanlder = () => {
    const { sagaKey, changeFormData, COMP_FIELD, WORK_SEQ } = props;
    changeFormData(sagaKey, COMP_FIELD, fileInfo);
  };

  const customRequest = ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
    const fileItem = { uid: file.uid, seq: 0, fileName: file.name, fileType: 1, size: file.size, fileExt: '', down: '', percent: 0, type: 'LoadingOutlined' };

    // temp.push(fileItem);

    // const tmpFileInfo = { ...fileList, temp };
    const temp = { ...fileInfo };
    const { DETAIL } = temp;
    // DETAIL = [fileItem];
    // DETAIL.push(fileItem);

    // setFileInfo({ ...temp });
    const formData = new FormData();

    formData.append(file.uid, file);
    axios
      .post(action, formData, {
        withCredentials,
        headers,
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
        const { fileExt, down } = response;
        let doctype = 'file-unknown';
        switch (fileExt) {
          case 'pdf':
            doctype = 'file-pdf';
            break;
          case 'xls':
            doctype = 'file-excel';
            break;
          case 'xlsx':
            doctype = 'file-excel';
            break;
          case 'txt':
            doctype = 'file-text';
            break;
          case 'doc':
            doctype = 'file-word';
            break;
          case 'docx':
            doctype = 'file-word';
            break;
          case 'ppt':
            doctype = 'file-ppt';
            break;
          case 'pptx':
            doctype = 'file-ppt';
            break;
          case 'zip':
            doctype = 'file-zip';
            break;
          default:
            break;
        }
        console.debug('### response : ', response);
        const DETAIL = [{ ...response, uid: file.uid, type: doctype, down }];
        setFileInfo({ ...temp, DETAIL });
        handlePreview(file);
      })
      .catch(onError);
  };

  const uploadFile = () => (
    <Upload
      accept="image/jpeg, image/png"
      action="/upload"
      // listType="picture-card"
      // onChange={handleChange}
      customRequest={customRequest}
      showUploadList={false}
    >
      <Button>
        <UploadOutlined /> 첨부하기
      </Button>
    </Upload>
  );

  if (isModify) {
    return <div>{visible ? imageRenderer() : uploadFile()}</div>;
  }
  return <div>{imageRenderer()}</div>;
}

ViewUploadedFileComp.defaultProps = {
  CONFIG: { info: {}, property: {}, option: {} },
  formData: {},
  colData: '',
};

ViewUploadedFileComp.propTypes = {
  CONFIG: PropTypes.shape({ info: PropTypes.object, property: PropTypes.object, option: PropTypes.object }),
  formData: PropTypes.object,
  colData: PropTypes.string,
};

export default ViewUploadedFileComp;

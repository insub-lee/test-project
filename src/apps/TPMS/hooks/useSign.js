import { useState, useEffect, useCallback } from 'react';

import request from 'utils/request';
import message from 'components/Feedback/message';

import parseFiles from '../utils/parseFiles';

export default ({ sysid, mnuid, record }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const postData = async () => {};

  const updateData = async () => {};

  /** Submit Temp * */

  /** Submit Modify Request * */

  // const submitForm = e => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const formJson = {};
  //   formData.forEach((value, key) => {
  //     formJson[key] = value;
  //   });
  //   const { files } = parseFiles(formJson);
  //   const { signlineno, signno, docno } = formJson;
  //   const payload = {
  //     signlineno,
  //     signno,
  //     docno,
  //     sysid,
  //     mnuid,
  //     files,
  //   };
  //
  //   const {
  //     phase,
  //     step_one_comment,
  //     step_one_file_path,
  //     DEFINE_ATTACH_FILE,
  //     MEASURE_LEADER_COMMENT,
  //     MEASURE_ATTACH_FILE_PATH,
  //     MEASURE_ATTACH_FILE,
  //     ANALYZE_LEADER_COMMENT,
  //     ANALYZE_ATTACH_FILE_PATH,
  //     ANALYZE_ATTACH_FILE,
  //     IMPROVE_LEADER_COMMENT,
  //     IMPROVE_ATTACH_FILE_PATH,
  //     IMPROVE_ATTACH_FILE,
  //     CONTROL_LEADER_COMMENT,
  //     CONTROL_ATTACH_FILE_PATH,
  //     CONTROL_ATTACH_FILE,
  //   } = record;
  //
  //   switch (phase) {
  //     case 1:
  //       payload.step_one_comment = step_one_comment;
  //       payload.step_one_file_path = step_one_file_path;
  //       payload.step_one_file_name = DEFINE_ATTACH_FILE;
  //       break;
  //     case 2:
  //       payload.MEASURE_LEADER_COMMENT = MEASURE_LEADER_COMMENT;
  //       payload.MEASURE_ATTACH_FILE_PATH = MEASURE_ATTACH_FILE_PATH;
  //       payload.MEASURE_ATTACH_FILE = MEASURE_ATTACH_FILE;
  //       break;
  //     case 3:
  //       payload.ANALYZE_LEADER_COMMENT = ANALYZE_LEADER_COMMENT;
  //       payload.ANALYZE_ATTACH_FILE_PATH = ANALYZE_ATTACH_FILE_PATH;
  //       payload.ANALYZE_ATTACH_FILE = ANALYZE_ATTACH_FILE;
  //       break;
  //     case 4:
  //       payload.IMPROVE_LEADER_COMMENT = IMPROVE_LEADER_COMMENT;
  //       payload.IMPROVE_ATTACH_FILE_PATH = IMPROVE_ATTACH_FILE_PATH;
  //       payload.IMPROVE_ATTACH_FILE = IMPROVE_ATTACH_FILE;
  //       break;
  //     case 5:
  //       payload.CONTROL_LEADER_COMMENT = CONTROL_LEADER_COMMENT;
  //       payload.CONTROL_ATTACH_FILE_PATH = CONTROL_ATTACH_FILE_PATH;
  //       payload.CONTROL_ATTACH_FILE = CONTROL_ATTACH_FILE;
  //       break;
  //     default:
  //       payload.noUse = true;
  //       break;
  //   }
  //
  //   // Validation
  //   if (phase === 1 && (!payload.step_one_file_path || !payload.step_one_file_name)) {
  //     message.error('현상파악 파일 첨부는 필수 입니다.');
  //     return;
  //   }
  //
  //   if (phase === 2 && (!payload.MEASURE_ATTACH_FILE_PATH || !payload.MEASURE_ATTACH_FILE)) {
  //     message.error('원인분석 파일 첨부는 필수 입니다.');
  //     return;
  //   }
  //
  //   if (phase === 3 && (!payload.ANALYZE_ATTACH_FILE_PATH || !payload.ANALYZE_ATTACH_FILE)) {
  //     message.error('대책수립 파일 첨부는 필수 입니다.');
  //     return;
  //   }
  //
  //   if (phase === 4 && (!payload.IMPROVE_ATTACH_FILE_PATH || !payload.IMPROVE_ATTACH_FILE)) {
  //     message.error('개선 파일 첨부는 필수 입니다.');
  //     return;
  //   }
  //
  //   if (phase === 5 && (!payload.CONTROL_ATTACH_FILE_PATH || !payload.CONTROL_ATTACH_FILE)) {
  //     message.error('완료/공유 파일 첨부는 필수 입니다.');
  //     return;
  //   }
  //
  //   if (!payload.noUse) {
  //     setIsSaving(true);
  //
  //     // Todo submit data
  //
  //     setIsSaving(false);
  //   }
  // };
};

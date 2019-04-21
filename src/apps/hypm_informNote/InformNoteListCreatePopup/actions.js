import { fromJS } from 'immutable';
import * as constants from './constants';

export const loadingParam = param => (
  {
    type: constants.LOADING_PARAM_SAGA,
    param,
  }
);

export const loadingSdptParam = value => (
  {
    type: constants.LOADING_SDPT_PARAM_SAGA,
    value,
  }
);

export const loadingDownParam = () => (
  {
    type: constants.LOADING_DOWNPARAM_SAGA,
  }
);

export const loadingDownTypeParam = value => (
  {
    type: constants.LOADING_DOWNTYPEPARAM_SAGA,
    value,
  }
);

export const handle_Loading_TotalTime = (
      down_date,           // 작업시작
      down_time,           // 작업시작   
      up_date,             // 작업완료      
      up_time,             // 작업완료
      totaltime,           // Total Time        
      ) => (
    {
    type: constants.GET_TOTALTIME_CREATE_INFORM_NOTE_POPUP,
                    down_date,           // 작업시작
                    down_time,           // 작업시작   
                    up_date,             // 작업완료      
                    up_time,             // 작업완료
                    totaltime,           // Total Time     
    });

    export const loadingUnitParam = value => (
      {
        type: constants.LOADING_UNIT_PARAM_SAGA,
        value,
      }
    );
    
    export const loadingTypeParam = value => (
      {
        type: constants.LOADING_TYPE_PARAM_SAGA,
        value,
      }
    );
    
    export const loadingCauseParam = value => (
      {
        type: constants.LOADING_CAUSE_PARAM_SAGA,
        value,
      }
    );
    
    export const loadingPartParam = value => (
      {
        type: constants.LOADING_PART_PARAM_SAGA,
        value,
      }
    );
    
    export const loadingSetUnitCode = value => (
      {
        type: constants.LOADING_UNIT_CODE,
        value,
      }
    );
    
    export const loadingSetTypeCode = value => (
      {
        type: constants.LOADING_TYPE_CODE,
        value,
      }
    );
    
    export const loadingSetCauseCode = value => (
      {
        type: constants.LOADING_CAUSE_CODE,
        value,
      }
    );
    
    export const loadingSetPartCode = value => (
      {
        type: constants.LOADING_PART_CODE,
        value,
      }
    );
    
    export const updateRepairList = value => (
      {
        type: constants.UPDATE_REPAIR_LIST,
        value,
      }
    );
    
    export const InsertInformNoteListCreatePopup = (
                  combo_work_center,   // SDPT
                  tidnr,               // EQ ID
                  equnr,               // EQ MST ID
                  combo_noti_type,     // Down
                  combo_down_type,     // Down Type    
                  down_date,           // 작업시작
                  down_time,           // 작업시작   
                  up_date,             // 작업완료      
                  up_time,             // 작업완료
                  totaltime,           // Total Time  
                  work_time,           // work Time  
                  auto_manual,         // Auto_Manual
                  noteComment,         // DownComment
                  zzproblem,           // Problem
                  tdline,              // 조치상세내용
                  remark,              // Remark
                  edmsId,              // 첨부문서
                 // rowData,
                  history) => (
            {
            type: constants.INSERT_CREATE_INFORM_NOTE_POPUP,
                                        combo_work_center,   // SDPT
                                        tidnr,               // EQ ID
                                        equnr,               // EQ MST ID
                                        combo_noti_type,     // Down
                                        combo_down_type,     // Down Type    
                                        down_date,           // 작업시작
                                        down_time,           // 작업시작   
                                        up_date,             // 작업완료      
                                        up_time,             // 작업완료
                                        totaltime,           // Total Time  
                                        work_time,           // work Time  
                                        auto_manual,         // Auto_Manual
                                        noteComment,         // DownComment
                                        zzproblem,           // Problem
                                        tdline,              // 조치상세내용
                                        remark,              // Remark
                                        edmsId,              // 첨부문서
                                      //  rowData,
                                        history,
            }
);

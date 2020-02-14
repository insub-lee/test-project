###### BizBuilderBase 설명 #####

# PROPS
  - id: '고유값'('sample_[widgetId]')
  - component: render할 컴포넌트 객체
  - viewType: 'INPUT, EDIT, LIST, VIEW'
  - workSeq: builder key(WB_WORK TABLE의 WORK_SEQ)
  - taskSeq: builder로 등록한 contents key
  - metaList: builder meta 데이터
  - responseData: meta 데이터, list, work 등의 데이터를 포함
  - apiArr: meta 데이터 이외에 필요한 데이터 조회시 해당 props사용(dataFormat은 index.js의 defaultProp에서 확인)
  - extraApiData: apiArr로 조회한 데이터
  - formData: meta의 FIELD속성으로만 만든 실제 저장시 사용할 데이터
  - revisionHistory: Revision 이력 리스트
  - inputMetaSeq: 기본 뷰 레이어 사용 안하고 다른 뷰 사용시 metaSeq 
  - modifyMetaSeq: 기본 뷰 레이어 사용 안하고 다른 뷰 사용시 metaSeq
  - viewMetaSeq: 기본 뷰 레이어 사용 안하고 다른 뷰 사용시 metaSeq
  - listMetaSeq: 기본 뷰 레이어 사용 안하고 다른 뷰 사용시 metaSeq

# EVENT
  - getBuilderData: meta, list, work 등을 조회하는 기본 함수(reducer - responseData 에 저장됨)
  - getExtraApiData: apiArr에 담겨진 정보로 데이터를 조회하는 함수(reducer - extraApiData 에 저장됨)
  - getTaskSeq: contents 저장시 필요한 key생성 함수
  <!-- - saveTempContents: editor, upload, work-selector 등 실시간 저장시 사용하는 함수 -->
  - tempSaveTask: contents 임시 저장 함수
  - saveTask: contents 저장 함수
  - modifyTask: contents 수정 함수
  - modifyTaskBySeq: contents 수정 함수 (workSeq, taskSeq 를 파라미터로 사용)
  - deleteTask: contents 삭제 함수
  - changeFormData: 입력(또는 수정)화면에서 필드의 값이 변경될 경우 호출하는 함수
  - revisionTask: 새버전 (현재 버전의 문서를 새버전으로 임시테이블에 저장후 읽어옴)
  - getRevisionHistory: Revision 이력 리스트 가져오기
  - removeReduxState: 파라미터로 받은 ID 의 Redux State 항목 제거
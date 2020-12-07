## TPMS 현황
- Component 단위로 이동
- CSS는 ??? 고민중
- Data는 기존 그대로 사용
- 소켓 부분은 일단 예외 처리
- Form 부분은 수정 가능하면 수정 진행...(문제 있는거 알고 있으니...)
- PORTAL에 올라갈 수 있도록 TPMS Component들 변환 작업

## 기존 TPMS 일부 컴포넌트 AuthSelector 사용 (사용자 정보 가져다 쓰고 있다는건데......)

## TPMS 메뉴 정리
메인화면 - [WIDGET]
개선활동[MENU]
  - 등록/진행[MENU]
    - 신규등록[APP]
    - 임시저장함[APP]
    - 등록함[APP]
    - 수정요청함[APP]
    - 미결함[APP]
    - 진행함[APP]
    - 완료보고서함[APP]
  - 실적조회[MENU]
    - 부분별실적[APP]
    - 개인별실적[APP]
  - REPORT[MENU]
    - 실적리포트[APP]
    - 실적리스트[APP]
개선요청활동(생산)[MENU]
  - 개선요청활동 게시판[APP]
  - AREA별[APP]
  - 유형별[APP]
공지사항[APP]
개선활동신문고[APP]
우수활동사례[APP]

## APP으로 등록해야할 것들
TPMS - 개선활동 - 등록/진행 - 신규등록
- tpms/page/Improvement/Registration
TPMS - 개선활동 - 등록/진행 - 임시저장함
- tpms/page/Improvement/TempTable
TPMS - 개선활동 - 등록/진행 - 등록함
- tpms/page/Improvement/RegisteredTable
TPMS - 개선활동 - 등록/진행 - 수정요청함
- tpms/page/Improvement/ModifyRequestTable
TPMS - 개선활동 - 등록/진행 - 미결함
- tpms/page/Improvement/InSuspenseTable
TPMS - 개선활동 - 등록/진행 - 진행함
- tpms/page/Improvement/InProgressTable
TPMS - 개선활동 - 등록/진행 - 완료보고서함
- tpms/page/Improvement/CompletionReportTable

TPMS - 개선활동 - 실적조회 - 부분별실적
- tpms/page/Improvement/PartialRecord
TPMS - 개선활동 - 실적조회 - 개인별실적
- tpms/page/Improvement/PersonalRecord

TPMS - 개선활동 - REPORT - 실적리포트
- tpms/page/Improvement/RecordReport
TPMS - 개선활동 - REPORT - 실적리스트
- tpms/page/Improvement/RecordList

TPMS - 개선요청활동(생산) - 개선요청활동 게시판
- tpms/page/ImprovementRequestActivity/InfoTable
TPMS - 개선요청활동(생산) - AREA별
- tpms/page/ImprovementRequestActivity/InfoByArea
TPMS - 개선요청활동(생산) - 유형별
- tpms/page/ImprovementRequestActivity/InfoByType

TPMS - 공지사항
- tpms/page/Notice

TPMS - 개선활동신문고
- tpms/page/ImprovementActivityNewspaper

TPMS - 우수활동사례
- tpms/page/ExcellentActivityCase

## TPMS 기준 USER_INFO 필요
-> 로그인 한 유저 기준 TPMS userinfo 가져오는 API 추가 (useAuth 사용하면 가져올 수 있음)

## Thumbor 사용 유무 체크 필요 (Devops 팀 통해서 Thumbor 올려야함)


## Image Upload Download 사용 여부 체크 필요
()

## Froala Editor 
// -> 기존 Image Upload는 Froala editor 사용

## TPMS 로그인
102036 / 621116

## 파일첨부
// -> 그럼 .... 파일첨부는????...........................

## 기본 Component들 정리중....
FormView 관련 아이템들 정리 필요
하드코딩중......


## Common Hooks 필요??

## useBuilderData


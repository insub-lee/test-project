biz


* [컴파일 속도 관련 이슈](#2)

* [DOCK 제거](#3)

* [ejected -> create-react-app without eject]
- 전체 프로젝트 일부 구성 수정
- 아직 수정해야하는 부분은 많은것으로... 

* DragUploadComp.js 수정 필요 (* 기존 업로드 리스트가 있는거에 한해 테스트 필요함)

* 필요시 react-router-modal을 걷어내야함 (같은 범위에서 같은 url Root 조건이 아니면 오작동이 크며, 현재도 간혹 제대로 동작 안하는 경우 발견됨)

* render 함수 내에 핸들러 함수 선언 사용 코드 많음 수정 필요
  
* antd [tooltip, popover] 해당 component들은 IE 에서 FOUC 발생으로 인해 
  다른 tooltip component로 대체 필요 (ex: react-tooltip) https://github.com/wwayne/react-tooltip

* 위젯 중복 실행 관련 src/utils/sagaInjectors.js 파일 수정 

    ``` react
    props.sagaKey 또는 props.id 값을 기반으로 saga watcher가 등록됨, 
    saga.js, selectors.js 에서 sagaKey || id 비교 체크 하는 로직 추가해야함 
    자세한 내용은 BizMicroDevBase 컴포넌트 참조
    ```



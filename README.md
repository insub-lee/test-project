biz


* [컴파일 속도 관련 이슈](#2)

* [DOCK 제거](#3)

* [ejected -> create-react-app without eject]
- 전체 프로젝트 일부 구성 수정
- 아직 수정해야하는 부분은 많은것으로... 
* render 함수 내에 핸들러 함수 선언 사용 코드 많음 수정 필요
  
* antd [tooltip, popover] 해당 component들은 IE 에서 FOUC 발생으로 인해 
  다른 tooltip component로 대체 필요 (ex: react-tooltip) https://github.com/wwayne/react-tooltip

* 위젯 중복 실행 관련 src/utils/sagaInjectors.js 파일 수정 

    ``` react
    // injectSaga - mode: WIDGET 추가
    
    import { WIDGET } from 'utils/constants'
    const withSaga = injectSaga({ key: 'apps-manual-user-BizBuilderWidget-saga', saga, mode: WIDGET });
    ```



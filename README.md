biz

* 컴파일 속도 관련 이슈 : http://git.kb-sys.co.kr/RND/bizmicro-portal-front/issues/2

* 위젯 중복 실행 관련 src/utils/sagaInjectors.js 파일 수정 

    ``` react
    // injectSaga - mode: WIDGET 추가
    
    import { WIDGET } from 'utils/constants'
    const withSaga = injectSaga({ key: 'apps-manual-user-BizBuilderWidget-saga', saga, mode: WIDGET });
    ```

* DOCK 제거 : http://git.kb-sys.co.kr/RND/bizmicro-portal-front/issues/3

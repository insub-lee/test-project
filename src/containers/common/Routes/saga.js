import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';
import update from 'react-addons-update';
import { EB } from 'utils/SockjsFunc';
import { Axios } from 'utils/AxiosFunc';
import { loginPage } from 'utils/commonUtils';
import { fromJS } from 'immutable';
import { checkPath, lang, searchTree } from 'utils/commonUtils';
import * as treeFunc from 'containers/common/functions/treeFunc';
import notify from 'components/Notification';
import * as authConstants from 'containers/common/Auth/constants';
import * as commonActionType from 'containers/common/constants';
import * as actionTypes from './constants';
import * as actions from './actions';

export function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');
    return new Map({ idToken });
  } catch (err) {
    return new Map();
  }
}

export function* loginRequest(payload) {
  const response = yield call(Axios.post, '/api/common/v1/auth/login', payload.payload);
  const data = response;
  if (data.uuid != null) {
    yield put({ type: actionTypes.AUTH_REQUEST_UUID, uuid: data.uuid });
  } else {
    yield put({ type: actionTypes.AUTH_REQUEST_ERROR });
  }
}

function* afterLoginProcess(data, action) {
  const response = yield call(EB.connect, data);
  // 웹소켓 비동기 응답을 받아서 이벤트를 발행하기 위한 코드
  while (true) {
    const payloadEB = yield take(response);
    if (payloadEB.token === undefined) {
      yield put(payloadEB);
    } else {
      const { USER_ID } = payloadEB.profile;
      yield put(payloadEB);

      // 1. lang 가져오기
      const result = yield call(Axios.get, `/api/common/v1/account/userSetting/${USER_ID}`);
      const user = result.userSetting;
      lang.setLang(user.LANG);
      yield put({
        type: actionTypes.CHANGE_LOCALE,
        locale: lang.getLocale(),
      });
      yield put({
        type: actionTypes.CHANGE_LANG,
        language: user.LANG,
      });
      // 2. skin 가져오기
      const skinResponse = yield call(Axios.post, '/api/common/v1/account/appSettingTheme/');
      const resultValue = skinResponse;
      // 이 조건은 왜 들어감?
      if (resultValue.theme.length > 0) {
        yield put({ type: actionTypes.LOAD_SKIN_REDUCER, resultValue }); // to Reducer
      }

      // 로그인 성공 후
      if (!checkPath(action.payload.url.split('/')[1], commonActionType.exceptPath)) {
        let pathname = [];
        pathname = action.payload.url.split('/');
        let PAGE_ID = '';
        if (pathname[1] !== 'sm') {
          if (pathname[1] === 'portal') {
            if (pathname[2] === 'apps' && pathname[3] !== '' && !Number.isNaN(pathname[3])) {
              const parameter = pathname[3]; // 2556, bookroom
              PAGE_ID = Number(parameter);
            } else if (pathname[2] === 'intlSVC' && pathname[3]) {
              const parameter = pathname[3]; // 2556, bookroom
              PAGE_ID = parameter;
            }
          }

          // getInitialPortalPage 호출
          yield put({
            type: actionTypes.GET_INITIAL_PORTALPAGE,
            PAGE_ID,
          });

          // yield call(delay, 1000);

          // getNotify 호출
          yield put({
            type: actionTypes.GET_ISNOTIFY,
          });
          // getMyAppTree 호출
          yield put({
            type: actionTypes.GET_MYAPP_TREE_SAGA,
          });
          // getMyAppStoreTree 호출
          yield put({
            type: actionTypes.GET_MYAPP_STORE_TREE_SAGA,
          });
          // getCommonMenuTree 호출 추가 - 2019.07.10 -> GET_INITIAL_PORTALPAGE 에서 가져오도록 수정
          /*
          yield put({
            type: actionTypes.GET_COMMON_MENU_TREE_SAGA,
          });
          */
        }
      }
      yield put(push(action.payload.url));
    }
  }
}

export function* loginRequestUUID(action) {
  const data = {
    type: actionTypes.AUTH_SUCCESS,
    uuid: action.payload.uuid,
    client: 0,
    headers: {},
  };
  yield call(afterLoginProcess, data, action);
}

export function* loginReconnectUUID() {
  const authInfo = yield select(state => state.get('auth'));
  const profile = authInfo.get('profile');

  const data = {
    type: actionTypes.AUTH_SUCCESS,
    uuid: '',
    client: profile.client !== undefined ? profile.client : 0,
    headers: { uuid: authInfo.get('uuid') },
  };

  if (data.headers.uuid === undefined) {
    data.headers.uuid = document.querySelector('#uuid-portal').innerHTML;
  }
  const response = yield call(EB.connect, data);
  // 웹소켓 비동기 응답을 받아서 이벤트를 발행하기 위한 코드
  while (true) {
    const payloadEB = yield take(response);
    if (payloadEB.token === undefined) {
      yield put(payloadEB);
    } else {
      yield put(payloadEB);
    }
  }
}

export function loginSuccess(action) {
  console.log('LOGIN SUCCESS SAGA:', action);
}
/* eslint-disable */
export function* loadAuthorization(action) {
  let data = {};
  if (action.payload.url.split('?').length > 1) {
    const params = action.payload.url.split('?')[1].split(';');
    params.forEach(p => {
      const item = p.split('=');
      if (item[0] === 'uuid') {
        data = {
          uuid: item[1],
        };
      } else if (item[0] === 'token') {
        data = {
          type: actionTypes.AUTH_SUCCESS,
          uuid: '',
          client: 0,
          headers: { uuid: item[1] },
        };
      }
    });
  }
  if (data.uuid === null || data.uuid === undefined) {
    console.log('loadAuthorization !!!!', action.payload);
    // const response = yield call(Axios.get, `/api/common/v1/auth/sso?URL=${action.payload.url}`, { });
    // const { username } = action.payload;
    // const response = yield call(Axios.get, `/api/common/v1/auth/login?empno=${username}`, {});
    const response = yield call(Axios.get, '/api/common/v1/auth/login', {});
    data = response;
  }
  console.log('LOAD AUTH:', data);
  if (data.uuid) {
    yield put({
      type: actionTypes.AUTH_REQUEST_UUID,
      payload: {
        uuid: data.uuid,
        url: action.payload.url,
        pathname: action.pathname,
      },
    });
  } else if (data.headers) {
    yield afterLoginProcess(data, action);
  } else {
    // errorAxiosProcess 와 중복 처리됨
    // 로그인 페이지로 이동
    if (data.code && data.code == '200') {
      // OAuth 인증후 이동할 페이지 값 저장
      loginPage(action.payload.url);
    } 
    // yield put({ type: actionTypes.AUTH_REQUEST_ERROR });
  }
  
}

export function* checkAuthorization(action) {
  const authInfo = yield select(state => state.get('auth'));
  const payload = {
    ...action.payload,
  };
  authInfo.lastUrl = action.payload.url;
  console.log('profile:', authInfo.get('uuid'));
  if (authInfo.get('uuid') !== null) {
    console.log('token:', authInfo.uuid);
    yield put(push(action.payload.url));
  } else {
    yield put({
      type: actionTypes.AUTH_LOADING,
      payload,
      pathname: action.payload.pathname,
    });
  }
}

export function* checkSession(action) {
  const authInfo = yield select(state => state.get('auth'));
  const { ctype } = action;
  const payload = { url: action.payload.url };

  if (authInfo.get('uuid') !== null) {
    if (ctype === 1) {
      // session null일때
      yield put({
        type: actionTypes.AUTH_LOADING,
        payload,
        pathname: action.payload.pathname,
      });
    } else if (ctype === 2) {
      // 이전 session과 다를때
      const response = yield call(Axios.get, '/api/common/v1/auth/ssoCheck', {});
      const data = response;
      console.log(authInfo);
      console.log(authInfo.get('uuid'));
      if (authInfo.get('uuid').get('EMP_NO') !== data.empNo) {
        yield put({
          type: actionTypes.AUTH_LOADING,
          payload,
          pathname: action.payload.pathname,
        });
      }
    }
  }
}

export function commonNotification(action) {
  notify.normal(action);
}

export function* unReadCntUpdate(payload) {
  yield put({ type: actionTypes.UNREAD_CNT_UPDATE, UNREAD_CNT: payload.UNREAD_CNT });
}

// 1. 포탈로 접속시 로딩에 필요한 액션 ******************
// 1-1 getInitialPortalPage
export function* getInitialPortalPage(payload) {
  const language = lang.getLocale();
  const { PAGE_ID } = payload;

  const response = yield call(Axios.post, '/api/portal/v1/page/getInitialPortalPage/', { language, PAGE_ID });
  // 로딩 DockAppList
  // REMOVE DOCK - 주석 처리
  yield put({
    type: actionTypes.COMMON_DOCK_LOADING_UNREADCNT, // to Saga (getDockItemListUnreadCnt)
    /*
    dockAppList: response.result, // Dock List
    dockFixedYn: response.dockFixedYn, // Dock Setting
    dockIconType: response.dockIconType, // Dock Setting
    */
    headerTitle: response.headerTitle,
  });
  yield put({
    type: actionTypes.SET_MENU_FIXED_YN,
    menuFixedYn: response.menuFixedYn,
  });  
  // REMOVE DOCK - DOCK에서 읽어오던 공통홈, 개인홈 페이지 ID 를 직접 받아옴
  const { rootPageInfo, myHomePageId, commonMenuTree } = response;

  yield put({
    type: actionTypes.SET_HOME_ROOT_PAGE,
    rootPageInfo: rootPageInfo,
    myHomePageId: myHomePageId,
  });  
  yield put({
    type: actionTypes.SET_PORTAL_MENU_TYPE_CODE,
    menuLayoutCode: response.menuLayoutCode,
    menuCompCode: response.menuCompCode,
  }); 

  // 공통메뉴
  if (Object.keys(commonMenuTree).length > 0) {
    yield put(actions.setCommonMenuTree(commonMenuTree.children || []));
  }  
}

export function* dockSetMyMenuData(payload) {
  const {
    isHome,
    // isSys,
  } = payload;

  const data = {
    PARAM: {
      PAGEID: payload.pageId,
    },
  };

  let dataList = {};
  let response = '';

  if (isHome === 'Y') {
    response = yield call(Axios.post, '/api/portal/v1/dock/dockSetMyMenuDataHome/', data);
    dataList = response.list;
    // dock Api의 getMyMenuDataHome 쿼리에서 Home 앱의 INTL_TYPE, SRC_PATH값을 가져올 수 없어서
    // Home 앱 정보를 가져온 후 saga에서 넣어준다.
    dataList.INTL_TYPE = 'N';
    dataList.SRC_PATH = 'Home';
  } else {
    response = yield call(Axios.post, '/api/portal/v1/dock/dockSetMyMenuData/', data);
    // Todo - when response.list is fail or isUnknown is true,,,,

    dataList = response.list;
  }

  const { managerInfo } = response;
  const selectedIndex = dataList.MENU_ID;
  const menuName = lang.get('NAME', dataList);

  if (response.list !== 'fail') {
    yield put({
      type: actionTypes.RECEIVE_MYMENU_DATA_SUCCESS, // to Reducer
      payload: dataList,
      selectedIndex,
      menuName,
      managerInfo,
    });
  } else {
    yield put({ type: actionTypes.RECEIVE_MYMENU_DATA_FAIL }); // to Reducer
  }
}

export function* getDockItemListUnreadCnt(payload) {
  const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
  const myObjectVal = Object.values(myObject);
  const notiVal = JSON.parse(`[${myObjectVal}]`);
  const dockList = payload.dockAppList;

  if (notiVal !== null) {
    if (dockList.length > 0) {
      for (let a = 0; a < dockList.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (dockList[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(dockList[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }

          if (dockList[a].APP_ID === -1 && dockList[a].NODE_TYPE === 'E') {
            //  업무 그룹용 예외처리 추후 확인 바람(/11);
            if (dockList[a].WIDGET_LIST) {
              const appIdArr = dockList[a].WIDGET_LIST.split(',');
              let sum = 0;
              notiVal.forEach(notiValue => {
                appIdArr.forEach(i => {
                  if (notiValue.APP_ID === Number(i)) {
                    sum += notiValue.UNREAD_CNT;
                  }
                });
              });
              Object.assign(dockList[a], { UNREAD_CNT: sum }); // eslint-disable-line
            } else {
              const sum = 0;
              Object.assign(dockList[a], { UNREAD_CNT: sum });
            }
          }
        }
      }
      yield put({
        type: actionTypes.SET_DOCKAPPLIST, // to Reducer
        dockAppList: dockList, //eslint-disable-line
        dockFixedYn: payload.dockFixedYn,
        dockIconType: payload.dockIconType,
      });
    }
  }
}

// 1-2 loadSkin
export function* getSkinList() {
  const response = yield call(Axios.post, '/api/common/v1/account/appSettingTheme/');
  const resultValue = response;

  // 이 조건은 왜 들어감?
  if (resultValue.theme.length > 0) {
    yield put({ type: actionTypes.LOAD_SKIN_REDUCER, resultValue }); // to Reducer
  }
}

// 1-3 getNotiMCnt
// 미등록메뉴 카운트 총합
export function* getNotiMCnt() {
  const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));

  const myObjectVal = Object.values(myObject);
  const notiVal = JSON.parse(`[${myObjectVal}]`);

  const response = yield call(Axios.post, '/api/common/v1/account/getMyRegistNotNotiMList/');
  const resultValue = response;
  const notiList = response.list;
  const UNREAD = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  if (notiVal !== null) {
    if (notiList.length > 0) {
      for (let a = 0; a < notiList.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (notiList[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(notiList[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }

          if (notiList[a].APP_ID === -1 && notiList[a].NODE_TYPE === 'E') {
            //  업무 그룹용 예외처리 추후 확인 바람(10/11);
            if (notiList[a].WIDGET_LIST) {
              const appIdArr = notiList[a].WIDGET_LIST.split(',');
              let sum = 0;
              notiVal.forEach(notiValue => {
                appIdArr.forEach(i => {
                  if (notiValue.APP_ID === Number(i)) {
                    sum += notiValue.UNREAD_CNT;
                  }
                });
              });
              Object.assign(notiList[a], { UNREAD_CNT: sum }); // eslint-disable-line
            } else {
              const sum = 0;
              Object.assign(notiList[a], { UNREAD_CNT: sum });
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < resultValue.list.length; i += 1) {
    if (resultValue.list[i].UNREAD_CNT) {
      UNREAD.push(resultValue.list[i].UNREAD_CNT);
    }
  }

  let a = 0;
  if (UNREAD.length > 0) {
    a = UNREAD.reduce(reducer);
  }

  if (resultValue.list.length > 0) {
    yield put({ type: actionTypes.SET_MYMENUNOTICNT_SUCCESS, a });
  }
}

function NotiCheck(element, notiVal) {
  if ((element.NODE_TYPE === 'F' || element.NODE_TYPE === 'R') && element.children) {
    for (let j = 0; j < element.children.length; j += 1) {
      NotiCheck(element.children[j], notiVal);
    }
  } else if (element.children !== undefined) {
    for (let j = 0; j < element.children.length; j += 1) {
      const t = notiVal.findIndex(c => c.APP_ID === element.children[j].APP_ID);

      if (t !== -1) {
        notiVal.splice(t, 1);
      }
    }
  } else if (element.APP_YN === 'F') {
    // console.log('F');
  } else {
    const t = notiVal.findIndex(c => c.APP_ID === element.APP_ID);

    if (t !== -1) {
      notiVal.splice(t, 1);
    }
  }
}

// 1-4 getNotiMList
// 미등록메뉴 목록 + 카운트
export function* getNotiMList() {
  const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));

  const myAppTreeData = yield select(stateParam => stateParam.get('common').get('myAppTreeData'));

  const myAppTree = myAppTreeData.toJS();
  const UNREADSUM = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const myObjectVal = Object.values(myObject);
  const notiVal = JSON.parse(`[${myObjectVal}]`);

  for (let i = 0; i < myAppTree.length; i += 1) {
    NotiCheck(myAppTree[i], notiVal);
  }

  const test = [];

  for (let i = 0; i < test.length; i += 1) {
    const t = notiVal.findIndex(c => c.APP_ID === test[i]);
    if (t !== -1) {
      notiVal.splice(t, 1);
    }
  }

  const notiMList = notiVal;
  const notiList = [];

  for (let i = 0; i < notiMList.length; i += 1) {
    if (notiMList[i].APP_YN === 'Y' && notiMList[i].APP_ID !== -1) {
      notiList.push(notiMList[i]);
    }
  }

  for (let i = 0; i < notiList.length; i += 1) {
    if (notiList[i].UNREAD_CNT) {
      UNREADSUM.push(notiList[i].UNREAD_CNT);
    }
  }

  let unreadS = 0;
  if (UNREADSUM.length > 0) {
    unreadS = UNREADSUM.reduce(reducer);
  }

  if (notiList.length > 0) {
    yield put({ type: actionTypes.SET_MYMENUNOTNOTILIST_SUCCESS, notiList, unreadS });
  }
}

// 1-5 getNotify
export function* getNotify() {
  const response = yield call(Axios.post, '/api/common/v1/notifyhandler');
  const isNoti = response.result;
  yield put({ type: actionTypes.SET_ISNOTIFY, isNoti });
}
// 포탈로 접속시 로딩에 필요한 액션 끝 ******************

// 2. 독 실행/고정/이동 관련 액션 ******************
// 2-1 execDockItem
export function* execDockItem(payload) {
  const dockAppList = yield select(stateParam => stateParam.get('common').get('dockAppList'));
  const response = yield call(Axios.put, `/api/portal/v1/dock/executeDockItem/${payload.dockId}`);
  const data = response.result;

  if (data === 'success') {
    const index = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === payload.dockId);
    const dockAppListUpdate = update(dockAppList, {
      [index]: {
        EXEC_YN: { $set: 'Y' },
        LAST_EXEC_YN: { $set: 'Y' },
      },
    });
    for (let i = 0; i < dockAppListUpdate.length; i += 1) {
      if (dockAppListUpdate[i].DOCK_ID !== payload.dockId) {
        dockAppListUpdate[i].LAST_EXEC_YN = 'N';
      }
    }
    yield put({
      type: actionTypes.EXEC_DOCKITEM,
      payload: dockAppListUpdate,
    });
  }
  // data === 'fail' 일 떄는, DB에서 방금 실행시킨 앱에 해당하는 레코드를 못찾음
  // 처리는 어떻게?
}

// 2-2 dockSetMyMenuData
// 1-1의 dockSetMyMenuData

// 2-3 exitDockItem
export function* exitDockItem(payload) {
  const dockAppList = yield select(stateParam => stateParam.get('common').get('dockAppList'));
  const index = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === payload.dockId);
  const isDockYn = dockAppList[index].DOCK_YN === 'Y';
  const { PAGE_ID } = dockAppList[index];
  let data = '';
  let setTopFlag = false;
  let response = {};
  const state = {
    type: 'exitDock',
    deletedDockPageId: PAGE_ID,
  };

  if (isDockYn) {
    response = yield call(Axios.post, `/api/portal/v1/dock/executeDockItem/${payload.dockId}`);
    data = response.result;
  } else {
    response = yield call(Axios.post, `/api/portal/v1/dock/executeDockItem/${payload.dockId}`, { isDockYn: 'N' });
    data = response.result;
  }

  if (data === 'success') {
    if (!isDockYn) {
      setTopFlag = true;
    }

    // 여러개의 DockItem을 실행시킨 상태에서, 한 DockItem을 종료시켰을 경우,
    // 남은 DockItem 중 가장 최근에 실행된 DockItem을 실행시킴
    const { lastExecDockItemId } = response;
    let lastDockItem = '';
    if (lastExecDockItemId !== -1) {
      const index2 = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === lastExecDockItemId);

      // page 실행을 위한 node 데이터 생성
      const node = {};
      dockAppList.forEach((app, i) => {
        if (i === index2) {
          const appCopy = Object.assign({}, app);
          appCopy.LAST_EXEC_YN = 'Y';

          // node 데이터 만들기
          node.NODE_TYPE = appCopy.NODE_TYPE;
          node.APP_ID = appCopy.APP_ID;
          node.APP_YN = appCopy.SNGL_APP_YN;
          node.PAGE_ID = appCopy.PAGE_ID;
          node.NAME_KOR = appCopy.NAME_KOR;
          node.NAME_ENG = appCopy.NAME_ENG;
          node.NAME_CHN = appCopy.NAME_CHN;
          node.NAME_JPN = appCopy.NAME_JPN;
          node.NAME_ETC = appCopy.NAME_ETC;
          node.MENU_ID = appCopy.MENU_ID;
          node.INTL_TYPE = appCopy.INTL_TYPE;
          node.SRC_PATH = appCopy.SRC_PATH;

          lastDockItem = node;

          return appCopy;
        }
        return app;
      });

      yield put({
        type: actionTypes.EXIT_DOCKITEM,
        payload: {
          setTopFlag,
        },
      });

      if (lastDockItem.INTL_TYPE === 'Y') {
        yield put(
          push({
            pathname: `/apps/${lastDockItem.SRC_PATH}`,
            execInfo: state,
          }),
        );
      } else if (lastDockItem.SRC_PATH === 'legacySVC') {
        yield put(
          push({
            pathname: `/apps/${lastDockItem.PAGE_ID}`,
            execInfo: state,
          }),
        );
      } else {
        yield put(
          push({
            pathname: `/page/${lastDockItem.PAGE_ID}`,
            execInfo: state,
          }),
        );
      }
    } else {
      yield put(
        push({
          pathname: '/',
          execInfo: state,
        }),
      );
    }
  }
}

export function* execApps(payload) {
  const { node, HOME_YN, SYS_YN } = payload;
  const PAGE_ID = node.PAGE_ID; //eslint-disable-line
  const response = yield call(Axios.post, '/api/portal/v1/page/executeApps/', { PAGE_ID, HOME_YN, SYS_YN });
  if (response.list === 'fail') {
    yield put({ type: actionTypes.EXEC_APPS_FAIL });
  } else {
    const resultValue = JSON.parse(response.list);

    const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
    const myObjectVal = Object.values(myObject);
    const notiVal = JSON.parse(`[${myObjectVal}]`);
    if (notiVal !== null) {
      for (let a = 0; a < resultValue.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (resultValue[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(resultValue[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }
        }
      }
      console.log('$$$ 12. selectedApp', resultValue);
      yield put({ type: actionTypes.EXEC_APPS_SUCCESS, resultValue });
    }
  }
}

export function* exitAfterExecApps(payload) {
  const { node } = payload;
  const PAGE_ID = node.PAGE_ID; //eslint-disable-line
  const response = yield call(Axios.post, '/api/portal/v1/page/executeRelaodApps/', { PAGE_ID });
  if (response.list === 'fail') {
    yield put({ type: actionTypes.EXEC_APPS_FAIL });
  } else {
    const resultValue = JSON.parse(response.list);

    const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
    const myObjectVal = Object.values(myObject);
    const notiVal = JSON.parse(`[${myObjectVal}]`);
    if (notiVal !== null) {
      for (let a = 0; a < resultValue.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (resultValue[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(resultValue[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }
        }
      }
      yield put({ type: actionTypes.EXEC_APPS_SUCCESS, resultValue });
    }
  }
}

export function* reloadExecApps(payload) {
  const { PAGE_ID } = payload.ITEM;
  const appId = payload.ITEM.APP_ID;
  const response = yield call(Axios.post, '/api/portal/v1/page/executeRelaodApps/', { PAGE_ID });
  if (response.list === 'fail') {
    yield put({ type: actionTypes.EXEC_APPS_FAIL });
  } else {
    const resultValue = JSON.parse(response.list);

    const apps = yield select(stateParam => stateParam.get('common').get('apps'));
    const index = apps.findIndex(o => o.children.props.children.props.setMyMenuData.PAGE_ID === PAGE_ID);

    const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
    const myObjectVal = Object.values(myObject);
    const notiVal = JSON.parse(`[${myObjectVal}]`);
    if (notiVal !== null) {
      for (let a = 0; a < resultValue.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (resultValue[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(resultValue[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }
        }
      }
      for (let c = 0; c < resultValue.length; c += 1) {
        if (resultValue[c].APP_ID === appId) {
          Object.assign(resultValue[c], { loadingNum: Math.random() }); // eslint-disable-line
        }
      }

      const appsCopy = update(apps, {
        [index]: {
          children: {
            props: {
              children: {
                props: {
                  columns: {
                    $set: resultValue,
                  },
                },
              },
            },
          },
        },
      });

      // 현재 실행중인 페이지에 변화가 생겼기 때문에 selectedApp도 함께 변경 시켜줘야 한다.
      yield put({
        type: actionTypes.SET_SELECTEDAPP_APPS,
        resultValue,
        apps: appsCopy,
      });
    }
  }
}

// 2-4 fixDockItem
export function* fixDockItem(payload) {
  const dockAppList = yield select(stateParam => stateParam.get('common').get('dockAppList'));
  const response = yield call(Axios.put, `/api/portal/v1/dock/fixDockItem/${payload.dockId}`);
  const data = response.result;

  if (data === 'success') {
    const index = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === payload.dockId);
    const dockAppListUpdate = update(dockAppList, {
      [index]: {
        DOCK_YN: { $set: 'Y' },
      },
    });
    yield put({ type: actionTypes.FIX_DOCKITEM, payload: dockAppListUpdate });
  }
}

// 2-5 unfixDockItem
export function* unfixDockItem(payload) {
  const dockAppList = yield select(stateParam => stateParam.get('common').get('dockAppList'));
  const index = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === payload.dockId);
  const isExecYn = dockAppList[index].EXEC_YN === 'Y';
  let data = '';
  let setTopFlag = false;

  // unfix한 DockItem의 실행 여부에 따른 조건 분기
  if (dockAppList[index].EXEC_YN === 'N') {
    const response = yield call(Axios.post, `/api/portal/v1/dock/fixDockItem/${payload.dockId}`, { isExecYn: 'N' });
    data = response.result;
  } else {
    const response = yield call(Axios.post, `/api/portal/v1/dock/fixDockItem/${payload.dockId}`);
    data = response.result;
  }

  if (data === 'success') {
    const dockAppListUpdate = update(dockAppList, {
      [index]: {
        DOCK_YN: { $set: 'N' },
      },
    });

    if (!isExecYn) {
      dockAppListUpdate.splice(index, 1);
      setTopFlag = true;
    }
    yield put({
      type: actionTypes.UNFIX_DOCKITEM,
      payload: {
        dockAppListUpdate,
        setTopFlag,
      },
    });
  }
}

// 2-7 dndChangePosition
export function* dndChangePosition() {
  const dockAppList = yield select(stateParam => stateParam.get('common').get('dockAppList'));

  const updateArr = [];
  dockAppList.forEach((dockApp, index) => {
    const result = Object.assign({}, dockApp);
    result.SORT_SQ = index + 1;
    updateArr.push(result);
  });
  const response = yield call(Axios.post, '/api/portal/v1/dock/dndDropDockItem', { arr: updateArr });
  const data = response.result;

  if (data === 'success') {
    yield put({
      type: actionTypes.DND_CHANGE_POSITION_DROP,
      payload: updateArr,
    });
  }
  // data === 'fail' 일 때는, drag 시작 시 이전의 dockAppList를 state에 미리 저장해놓고, 이를 다시 불러오는 작업을 해줘야함
  // 해줘야하나?
}
// 2. 독 실행/고정/이동 관련 액션 끝 ******************

// 3. 메뉴 실행 관련 액션 ******************
// 3-1
export function* execMenu(payload) {
  const { PAGE_ID, TARGET, node } = payload;
  const response = yield call(Axios.post, '/api/portal/v1/page/executeMenu/', { PAGE_ID, TARGET });
  const data = response.result;

  if (data === 'success') {
    const loadingDockItemResponse = yield call(Axios.get, '/api/portal/v1/dock/executeDockItem/0');
    const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
    const myObjectVal = Object.values(myObject);
    const notiVal = JSON.parse(`[${myObjectVal}]`);
    const dockList = loadingDockItemResponse.dockItemList;

    if (notiVal !== null) {
      if (dockList.length > 0) {
        for (let a = 0; a < dockList.length; a += 1) {
          for (let b = 0; b < notiVal.length; b += 1) {
            if (dockList[a].APP_ID === notiVal[b].APP_ID) {
              Object.assign(dockList[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
            }

            if (dockList[a].APP_ID === -1 && dockList[a].NODE_TYPE === 'E') {
              //  업무 그룹용 예외처리 추후 확인 바람(10/11);
              if (dockList[a].WIDGET_LIST ) {
                const appIdArr = dockList[a].WIDGET_LIST.split(',');
                let sum = 0;
                notiVal.forEach(notiValue => {
                  appIdArr.forEach(i => {
                    if (notiValue.APP_ID === Number(i)) {
                      sum += notiValue.UNREAD_CNT;
                    }
                  });
                });
                Object.assign(dockList[a], { UNREAD_CNT: sum }); // eslint-disable-line
              } else {
                const sum = 0;
                Object.assign(dockList[a], { UNREAD_CNT: sum });
              }
            }
          }
        }
        // setMyMenuData
        yield put({ type: actionTypes.LOADING_DOCKITEM_SUCCESS, payload: dockList, node });

        const lastDockItem = dockList[dockList.findIndex(dock => dock.LAST_EXEC_YN === 'Y')];
        if (lastDockItem.INTL_TYPE === 'Y') {
          yield put(push(`/apps/${lastDockItem.SRC_PATH}`));
        } else if (lastDockItem.SRC_PATH === 'legacySVC') {
          yield put(push(`/apps/${lastDockItem.PAGE_ID}`));
        } else {
          yield put(push(`/page/${lastDockItem.PAGE_ID}`));
        }
      }
    }
  }

  // Header의 앱 담당자 목록 가져오기
  const { managerInfo } = response;
  yield put({
    type: actionTypes.SET_MANAGERINFO,
    managerInfo,
  });
}
// 3. 메뉴 실행 관련 액션 끝 ******************

// 5. 독 설정 관련 액션 ******************
// 5-1 setDockFixedYn
export function* setDockFixedYn(payload) {
  const { dockFixedYn } = payload;
  const response = yield call(Axios.post, '/api/portal/v1/dock/setIsDockFix/', { dockFixedYn });

  if (response.result === 'success') {
    yield put({
      type: actionTypes.SET_DOCK_FIXED_YN,
      dockFixedYn,
    });
  }
}

// 5-2
export function* setDockIconType(payload) {
  const { dockIconType } = payload;
  const response = yield call(Axios.post, '/api/portal/v1/dock/setDockIconType/', { dockIconType });

  if (response.result === 'success') {
    yield put({
      type: actionTypes.SET_DOCK_ICON_TYPE,
      dockIconType,
    });
  }
}
// 5. 독 설정 관련 액션 끝 ******************

// 7. 마이 메뉴 관련 액션 ******************
// 7-1 getMyAppTree
export function* getMyAppTree(payload) {
  const response = yield call(Axios.get, '/api/portal/v1/page/portalMyMenuTree', { data: 'temp' });
  const resultSet = Object.keys(response).length > 0 ? fromJS(JSON.parse(`[${response.result}]`)) : '';
  const myAppTreeData = resultSet ? resultSet.getIn([0, 'children']) : '';
  if (myAppTreeData && resultSet.size > 0) {
    if (payload.type === commonActionType.RESET_NOTIFY) {
      const myObject = payload.UNREAD_CNT;
      const myObjectVal = Object.values(myObject);
      const notiVal = JSON.parse(`[${myObjectVal}]`);
      for (let i = 0; i < notiVal.length; i += 1) {
        if (!notiVal[i].APP_ID) {
          notiVal.splice(i, 1);
        }
      }
      let headerCount = 0;
      const myAppTreeDataToJs = myAppTreeData.toJS();
      const arr = [];
      if (myAppTreeDataToJs.length > 0) {
        for (let i = 0; i < myAppTreeDataToJs.length; i += 1) {
          const result = searchTree(myAppTreeDataToJs[i], notiVal);

          headerCount += result.UNREAD_CNT ? result.UNREAD_CNT : 0;

          const resultTree = result;
          arr.push(resultTree);
        }
      }
      const newCategoryData = arr;
      const myAppTreeDataForMerge = yield select(state => state.get('common'));
      const oldCategoryData = myAppTreeDataForMerge.get('myAppTreeData').toJS();

      treeFunc.mergeArray(newCategoryData, oldCategoryData);

      // 미확인
      const myAppTree = myAppTreeData.toJS();
      const UNREADSUM = [];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      for (let i = 0; i < myAppTree.length; i += 1) {
        NotiCheck(myAppTree[i], notiVal);
      }

      const test = [];

      for (let i = 0; i < test.length; i += 1) {
        const t = notiVal.findIndex(c => c.APP_ID === test[i]);
        if (t !== -1) {
          notiVal.splice(t, 1);
        }
      }

      const notiMList = notiVal;
      const notiList = [];

      for (let i = 0; i < notiMList.length; i += 1) {
        if (notiMList[i].APP_YN === 'Y' && notiMList[i].APP_ID !== -1) {
          notiList.push(notiMList[i]);
        }
      }

      for (let i = 0; i < notiList.length; i += 1) {
        if (notiList[i].UNREAD_CNT) {
          UNREADSUM.push(notiList[i].UNREAD_CNT);
        }
      }

      let unreadS = 0;
      if (UNREADSUM.length > 0) {
        unreadS = UNREADSUM.reduce(reducer);
      }

      if (notiList.length > 0) {
        yield put({ type: actionTypes.SET_MYMENUNOTNOTILIST_SUCCESS, notiList, unreadS });
      }
      // 미확인 종료

      yield put({ type: actionTypes.SET_MYAPP_TREE_NOTI, myAppTreeData: fromJS(newCategoryData) });
      yield put({
        type: authConstants.SET_HEADERNOTICNT_SUCCESS,
        resultValue: {
          resultCnt: headerCount + unreadS,
        },
      });
    } else {
      const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
      const myObjectVal = Object.values(myObject);
      const notiVal = JSON.parse(`[${myObjectVal}]`);
      for (let i = 0; i < notiVal.length; i += 1) {
        if (!notiVal[i].APP_ID) {
          notiVal.splice(i, 1);
        }
      }
      let headerCount = 0;
      const myAppTreeDataToJs = myAppTreeData.toJS();
      const arr = [];
      if (myAppTreeDataToJs.length > 0) {
        for (let i = 0; i < myAppTreeDataToJs.length; i += 1) {
          const result = searchTree(myAppTreeDataToJs[i], notiVal);

          headerCount += result.UNREAD_CNT ? result.UNREAD_CNT : 0;

          const resultTree = result;
          arr.push(resultTree);
        }
      }
      const newCategoryData = arr;
      const myAppTreeDataForMerge = yield select(state => state.get('common'));
      const oldCategoryData = myAppTreeDataForMerge.get('myAppTreeData').toJS();

      treeFunc.mergeArray(newCategoryData, oldCategoryData);

      // 최초 1단 펼치기
      /* 2019.08.29 주석 처리
      for (let z = 0; z < newCategoryData.length; z += 1) {
        if (newCategoryData[z].NODE_TYPE === 'F' || (newCategoryData[z].REF_TYPE === 'B' && newCategoryData[z].NODE_TYPE === 'R')) {
          Object.assign(newCategoryData[z], { expanded: true });
        }
      }
      */

      // 미확인
      const myAppTree = myAppTreeData.toJS();
      const UNREADSUM = [];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      for (let i = 0; i < myAppTree.length; i += 1) {
        NotiCheck(myAppTree[i], notiVal);
      }

      const test = [];

      for (let i = 0; i < test.length; i += 1) {
        const t = notiVal.findIndex(c => c.APP_ID === test[i]);
        if (t !== -1) {
          notiVal.splice(t, 1);
        }
      }

      const notiMList = notiVal;
      const notiList = [];

      for (let i = 0; i < notiMList.length; i += 1) {
        if (notiMList[i].APP_YN === 'Y' && notiMList[i].APP_ID !== -1) {
          notiList.push(notiMList[i]);
        }
      }

      for (let i = 0; i < notiList.length; i += 1) {
        if (notiList[i].UNREAD_CNT) {
          UNREADSUM.push(notiList[i].UNREAD_CNT);
        }
      }

      let unreadS = 0;
      if (UNREADSUM.length > 0) {
        unreadS = UNREADSUM.reduce(reducer);
      }

      yield put({ type: actionTypes.SET_MYMENUNOTNOTILIST_SUCCESS, notiList, unreadS });

      yield put({ type: actionTypes.SET_MYAPP_TREE, myAppTreeData: fromJS(newCategoryData) });
      yield put({
        type: authConstants.SET_HEADERNOTICNT_SUCCESS,
        resultValue: {
          resultCnt: headerCount + unreadS,
        },
      });
    }
  } else {
    yield put({ type: actionTypes.SET_MYAPP_TREE_FAIL });
  }
}

// 7-4 getMyAppStoreTree
export function* getMyAppStoreTree() {
  const response = yield call(Axios.get, '/api/bizstore/v1/mypage/myTree', { data: 'temp' });
  const result = Object.keys(response).length > 0 ? fromJS(JSON.parse(`[${response.result}]`)) : '';
  if (result.size > 0) {
    const categoryData = result.get(0).get('children');

    yield put({ type: actionTypes.SET_MYAPP_STORE_TREE, myAppStoreTreeData: categoryData });
  }
}

// 7-5 moveNode
export function* moveNode(payload) {
  const { treeData } = payload;

  yield call(Axios.post, '/api/bizstore/v1/mypage/moveMymenu', { treeData });
}

// 7-6 updateMymenuDisp
export function* updateMymenuDisp(payload) {
  const { node } = payload;
  const DISP_YN = node.DISP_YN === 'N' ? 'Y' : 'N';

  yield call(Axios.post, '/api/bizstore/v1/mypage/updateMenudisp', { MENU_ID: Number(node.key), DISP_YN });
}

// 시스템 업무그룹 트리 리로드
export function* resetSysTreeReload() {
  const response = yield call(Axios.get, '/api/portal/v1/page/portalSysMenuTreeReload', { data: 'temp' });
  const resultSet = fromJS(JSON.parse(`[${response.result}]`));
  const myAppTreeData = resultSet.get(0).get('children');

  if (myAppTreeData && resultSet.size > 0) {
    const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
    const myObjectVal = Object.values(myObject);
    const notiVal = JSON.parse(`[${myObjectVal}]`);
    for (let i = 0; i < notiVal.length; i += 1) {
      if (!notiVal[i].APP_ID) {
        notiVal.splice(i, 1);
      }
    }
    let headerCount = 0;
    const myAppTreeDataToJs = myAppTreeData.toJS();
    const arr = [];
    if (myAppTreeDataToJs.length > 0) {
      for (let i = 0; i < myAppTreeDataToJs.length; i += 1) {
        const result = searchTree(myAppTreeDataToJs[i], notiVal);

        headerCount += result.UNREAD_CNT ? result.UNREAD_CNT : 0;

        const resultTree = result;
        arr.push(resultTree);
      }
    }
    const newCategoryData = arr;
    const myAppTreeDataForMerge = yield select(state => state.get('common'));
    const oldCategoryData = myAppTreeDataForMerge.get('myAppTreeData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    // 최초 1단 펼치기
    for (let z = 0; z < newCategoryData.length; z += 1) {
      if (newCategoryData[z].NODE_TYPE === 'F' || (newCategoryData[z].REF_TYPE === 'B' && newCategoryData[z].NODE_TYPE === 'R')) {
        Object.assign(newCategoryData[z], { expanded: true });
      }
    }

    // 미확인
    const myAppTree = myAppTreeData.toJS();
    const UNREADSUM = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    for (let i = 0; i < myAppTree.length; i += 1) {
      NotiCheck(myAppTree[i], notiVal);
    }

    const test = [];

    for (let i = 0; i < test.length; i += 1) {
      const t = notiVal.findIndex(c => c.APP_ID === test[i]);
      if (t !== -1) {
        notiVal.splice(t, 1);
      }
    }

    const notiMList = notiVal;
    const notiList = [];

    for (let i = 0; i < notiMList.length; i += 1) {
      if (notiMList[i].APP_YN === 'Y' && notiMList[i].APP_ID !== -1) {
        notiList.push(notiMList[i]);
      }
    }

    for (let i = 0; i < notiList.length; i += 1) {
      if (notiList[i].UNREAD_CNT) {
        UNREADSUM.push(notiList[i].UNREAD_CNT);
      }
    }

    let unreadS = 0;
    if (UNREADSUM.length > 0) {
      unreadS = UNREADSUM.reduce(reducer);
    }

    if (notiList.length > 0) {
      yield put({ type: actionTypes.SET_MYMENUNOTNOTILIST_SUCCESS, notiList, unreadS });
    }

    yield put({ type: actionTypes.SET_MYAPP_TREE, myAppTreeData: fromJS(newCategoryData) });
    yield put({
      type: authConstants.SET_HEADERNOTICNT_SUCCESS,
      resultValue: {
        resultCnt: headerCount + unreadS,
      },
    });
  } else {
    yield put({ type: actionTypes.SET_MYAPP_TREE_FAIL });
  }
}
// 7. 마이 메뉴 관련 액션 끝 ******************

// 공통 ******************
export function* resetTreeData(payload) {
  // storeTree
  const storeTreeData = fromJS(JSON.parse(`[${payload.storeTreeData}]`));
  const myAppStoreTreeData = storeTreeData.get(0).get('children');
  const myAppStoreTreeDataForMerge = yield select(state => state.get('common'));
  const oldMyAppStoreTreeData = myAppStoreTreeDataForMerge.get('myAppStoreTreeData').toJS();
  treeFunc.mergeArray(myAppStoreTreeData, oldMyAppStoreTreeData);

  // portalTree
  const resultSet = fromJS(JSON.parse(`[${payload.portalTreeData}]`));
  const myAppTreeData = resultSet.get(0).get('children');
  if (myAppTreeData && myAppTreeData.size > 0) {
    const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
    const myObjectVal = Object.values(myObject);
    const notiVal = JSON.parse(`[${myObjectVal}]`);
    for (let i = 0; i < notiVal.length; i += 1) {
      if (!notiVal[i].APP_ID) {
        notiVal.splice(i, 1);
      }
    }
    let headerCount = 0;
    const myAppTreeDataToJs = myAppTreeData.toJS();
    const arr = [];
    if (myAppTreeDataToJs.length > 0) {
      for (let i = 0; i < myAppTreeDataToJs.length; i += 1) {
        const result = searchTree(myAppTreeDataToJs[i], notiVal);

        headerCount += result.UNREAD_CNT ? result.UNREAD_CNT : 0;

        const resultTree = result;
        arr.push(resultTree);
      }
    }
    const newCategoryData = arr;
    const myAppTreeDataForMerge = yield select(state => state.get('common'));
    const oldCategoryData = myAppTreeDataForMerge.get('myAppTreeData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    // 미확인
    const myAppTree = myAppTreeData.toJS();
    const UNREADSUM = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    for (let i = 0; i < myAppTree.length; i += 1) {
      NotiCheck(myAppTree[i], notiVal);
    }

    const test = [];

    for (let i = 0; i < test.length; i += 1) {
      const t = notiVal.findIndex(c => c.APP_ID === test[i]);
      if (t !== -1) {
        notiVal.splice(t, 1);
      }
    }

    const notiMList = notiVal;
    const notiList = [];

    for (let i = 0; i < notiMList.length; i += 1) {
      if (notiMList[i].APP_YN === 'Y' && notiMList[i].APP_ID !== -1) {
        notiList.push(notiMList[i]);
      }
    }

    for (let i = 0; i < notiList.length; i += 1) {
      if (notiList[i].UNREAD_CNT) {
        UNREADSUM.push(notiList[i].UNREAD_CNT);
      }
    }

    let unreadS = 0;
    if (UNREADSUM.length > 0) {
      unreadS = UNREADSUM.reduce(reducer);
    }

    if (notiList.length > 0) {
      yield put({ type: actionTypes.SET_MYMENUNOTNOTILIST_SUCCESS, notiList, unreadS });
    }
    // 미확인 종료

    yield put({
      type: actionTypes.RESET_MYAPP_TREE,
      myAppTreeData: fromJS(newCategoryData),
      myAppStoreTreeData: fromJS(myAppStoreTreeData),
    });
    yield put({
      type: authConstants.SET_HEADERNOTICNT_SUCCESS,
      resultValue: {
        resultCnt: headerCount + unreadS,
      },
    });
  } else {
    yield put({
      type: actionTypes.RESET_MYAPP_TREE,
      myAppTreeData: fromJS([]),
      myAppStoreTreeData: fromJS(myAppStoreTreeData),
    });
    yield put({
      type: authConstants.SET_HEADERNOTICNT_SUCCESS,
      resultValue: {
        resultCnt: 0,
      },
    });
  }
}

// 공통 ******************

// 8. history.action === 'POP'일 때, 데이터 로딩 ******************
// 8-1
export function* getLoaddata(payload) {
  const { path, param, data } = payload;
  // REMOVE DOCK - 주석 처리 (실행 항목 Dock 등록 및 LAST_EXEC_YN 설정)
  /*
  if (data && data.node && Object.keys(data.node).length !== 0) {
    const { PAGE_ID, TARGET } = data.node;
    yield call(Axios.post, '/api/portal/v1/page/executeMenu/', { PAGE_ID, TARGET });
  }
  */
  const nodeData = {};
  // REMOVE DOCK - PAGE_ID가 있을 경우 전달
  const params = {
    path,
    param,
  };

  if (data && data.node && Object.keys(data.node).length !== 0) {
    const { PAGE_ID } = data.node;
    params.PAGE_ID = PAGE_ID;
  }  
  let response = yield call(Axios.post, '/api/portal/v1/page/getLoaddata/', params);
  let NEW_PAGE_ID = 0;

  // dockSetMyMenu를 통해 setMyMenuData, selectedIndex, menuName, managerInfo 가져옴
  if (response.result === 'success') {
    const { HOME_YN, SYS_YN } = response;
    // intlSVC인 경우 PAGE_ID값이 String이므로, 해당 앱의 PAGE_ID를 다시 받아옴
    NEW_PAGE_ID = response.PAGE_ID;
    nodeData.PAGE_ID = NEW_PAGE_ID;

    /*
      setMyMenuData
      selectedIndex
      menuName
      managerInfo
      데이터 가져오기
    */
    const dataParam = {
      PARAM: {
        PAGEID: NEW_PAGE_ID,
      },
    };
    let setMyMenuData = {};

    if (HOME_YN === 'Y') {
      response = yield call(Axios.post, '/api/portal/v1/dock/dockSetMyMenuDataHome/', dataParam);
      setMyMenuData = response.list;

      // dock Api의 getMyMenuDataHome 쿼리에서 Home 앱의 INTL_TYPE, SRC_PATH값을 가져올 수 없어서
      // Home 앱 정보를 가져온 후 saga에서 넣어준다.
      setMyMenuData.INTL_TYPE = 'N';
      setMyMenuData.SRC_PATH = 'Home';
    } else {
      response = yield call(Axios.post, '/api/portal/v1/dock/dockSetMyMenuData/', dataParam);
      // Todo - when response.list is fail or isUnknown is true,,,,

      setMyMenuData = response.list;
    }

    const { managerInfo } = response;
    const selectedIndex = setMyMenuData.MENU_ID;
    const menuName = lang.get('NAME', setMyMenuData);

    console.log('### 1. 메뉴 데이터 목록', setMyMenuData, selectedIndex, managerInfo, menuName);

    
    
    // dockAppList
    // PAGE_ID로 독아이템 호출
    let dockAppListUpdate = [];
    const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
    const myObjectVal = Object.values(myObject);
    const notiVal = JSON.parse(`[${myObjectVal}]`);
    console.log('$$$ data의 유무', data);
    // REMOVE DOCK - DOCK 관련된 내용.. 주석 처리
    /*
    if (data && data.node) {
      const loadingDockItemResponse = yield call(Axios.get, '/api/portal/v1/dock/executeDockItem/0');
      dockAppListUpdate = loadingDockItemResponse.dockItemList;

      if (notiVal !== null) {
        if (dockAppListUpdate.length > 0) {
          for (let a = 0; a < dockAppListUpdate.length; a += 1) {
            for (let b = 0; b < notiVal.length; b += 1) {
              if (dockAppListUpdate[a].APP_ID === notiVal[b].APP_ID) {
                Object.assign(dockAppListUpdate[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
              }

              if (dockAppListUpdate[a].APP_ID === -1 && dockAppListUpdate[a].NODE_TYPE === 'E') {
                //  업무 그룹용 예외처리 추후 확인 바람(10/11);
                if (dockAppListUpdate[a].WIDGET_LIST) {
                  const appIdArr = dockAppListUpdate[a].WIDGET_LIST.split(',');
                  let sum = 0;
                  notiVal.forEach(notiValue => {
                    appIdArr.forEach(i => {
                      if (notiValue.APP_ID === Number(i)) {
                        sum += notiValue.UNREAD_CNT;
                      }
                    });
                  });
                  Object.assign(dockAppListUpdate[a], { UNREAD_CNT: sum }); // eslint-disable-line
                } else {
                  const sum = 0;
                  Object.assign(dockAppListUpdate[a], { UNREAD_CNT: sum });
                }
              }
            }
          }
        }
      }
    } else {
      const dockAppList = yield select(stateParam => stateParam.get('common').get('dockAppList'));

      if (dockAppList.length > 0) {
        const index = dockAppList.findIndex(dockApp => dockApp.PAGE_ID === NEW_PAGE_ID);

        if (index === -1) {
          dockAppListUpdate = dockAppList.slice();
        } else {
          dockAppListUpdate = update(dockAppList, {
            [index]: {
              EXEC_YN: { $set: 'Y' },
              LAST_EXEC_YN: { $set: 'Y' },
            },
          });
          for (let i = 0; i < dockAppListUpdate.length; i += 1) {
            if (dockAppListUpdate[i].PAGE_ID !== NEW_PAGE_ID) {
              dockAppListUpdate[i].LAST_EXEC_YN = 'N';
            }
          }
        }
      }
    }
    */
   
    /*
      selectedApp 가져오기
    */
    response = yield call(Axios.post, '/api/portal/v1/page/executeApps/', { PAGE_ID: nodeData.PAGE_ID, HOME_YN, SYS_YN });
    const resultValue = JSON.parse(response.list);

    if (notiVal !== null) {
      for (let a = 0; a < resultValue.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (resultValue[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(resultValue[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }
        }
      }
    }

    if (data && data.isCssTarget) {
      setMyMenuData.isCssTarget = true;
    }

    const actionObject = {
      type: actionTypes.SET_MENU_AND_DOCK_DATA,
      setMyMenuData,
      menuName,
      selectedIndex,
      managerInfo,
      dockAppList: dockAppListUpdate,
      selectedApp: resultValue,
    };

    // REMOVE DOCK - 주석 처리
    /*
    if (data && data.type) {
      switch (data.type) {
        case 'execDock':
        case 'execMenu':
          actionObject.executedDockPageId = data.executedDockPageId;
          break;
        default:
          // 'exitDock'
          actionObject.deletedDockPageId = data.deletedDockPageId;
      }
    }
    */
    yield put(actionObject);

    // REMOVE DOCK - 주석 처리
    // yield call(Axios.post, '/api/portal/v1/page/executeDockItem/', { PAGE_ID: NEW_PAGE_ID });
  } else if (response.result === 'error') {
    yield put(push('/error'));
  } else {
    const { url, srcPath } = response;

    if (srcPath) {
      yield put(push(`/${url}/${srcPath}`));
    } else {
      yield put(push(`/${url}/${String(response.PAGE_ID)}`));
    }
  }
}
// 8. history.action === 'POP'일 때, 데이터 로딩 끝 ******************

// 최초 apps 만들기!!!!!!!!!!!!!
export function* getDataForApps(payload) {
  const { EXEC_PAGE_IDS } = payload;

  const response = yield call(Axios.post, '/api/portal/v1/page/getDataForApps', { EXEC_PAGE_IDS });
  console.log('$$$ 3.getDataForApps의 response', response);

  const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
  const myObjectVal = Object.values(myObject);
  const notiVal = JSON.parse(`[${myObjectVal}]`);

  Object.keys(response).forEach(o => {
    if (notiVal !== null) {
      for (let a = 0; a < response[o].selectedApp.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (response[o].selectedApp[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(response[o].selectedApp[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }
        }
      }
    }
  });

  yield put({
    type: actionTypes.GET_DATA_FOR_APPS,
    dataForApps: response,
  });
}

export function* getSingleModeLoaddata(payload) {
  const { path, param } = payload;

  const nodeData = {};
  let response = yield call(Axios.post, '/api/portal/v1/page/getLoadSingledata/', { path, param });
  let NEW_PAGE_ID = 0;

  // dockSetMyMenu를 통해 setMyMenuData, selectedIndex, menuName, managerInfo 가져옴
  if (response.result === 'success') {
    const { HOME_YN, SYS_YN } = response;
    // intlSVC인 경우 PAGE_ID값이 String이므로, 해당 앱의 PAGE_ID를 다시 받아옴
    NEW_PAGE_ID = response.PAGE_ID;
    nodeData.PAGE_ID = NEW_PAGE_ID;
    /*
      selectedApp 가져오기
    */
    response = yield call(Axios.post, '/api/portal/v1/page/executeApps/', { PAGE_ID: NEW_PAGE_ID, HOME_YN, SYS_YN });
    const resultValue = JSON.parse(response.list);

    const actionObject = {
      type: actionTypes.EXEC_APPS_SUCCESS,
      resultValue,
    };
    yield put(actionObject);
  } else if (response.result === 'error') {
    yield put(push('/error'));
  } else {
    const { url, srcPath } = response;
    if (srcPath) {
      yield put(push(`/${url}/${srcPath}`));
    } else {
      yield put(push(`/${url}/${String(response.LAST_DOCKITEM_PAGE_ID)}`));
    }
  }
}

/*
export function* getCommonMenuTree() {
  const response = yield call(Axios.get, '/api/portal/v1/page/getCommonMenuTree');
  const { result } = response;
  if (Object.keys(result).length > 0) {
    yield put(actions.setCommonMenuTree(result.children || []));
  }
}
*/

// REMOVE DOCK - 미사용?? -> containers\portal\App\index.js 에서 사용
export function* resetLastExecYn() {
  const dockAppList = yield select(stateParam => stateParam.get('common').get('dockAppList'));
  const index = dockAppList.findIndex(dockApp => dockApp.LAST_EXEC_YN === 'Y');
  if (index > -1) {
    const dockAppListUpdate = update(dockAppList, {
      [index]: {
        EXEC_YN: { $set: 'Y' },
        LAST_EXEC_YN: { $set: 'N' },
      },
    });
    yield put({
      type: actionTypes.EXEC_DOCKITEM,
      payload: dockAppListUpdate,
    });
  }
}

export function* updateMenuFixedYn (payload) {
  const { menuFixedYn } = payload;
  const response = yield call(Axios.post, '/api/common/v1/account/updateMenuFixed', { menuFixedYn });

  if (response.result === 'success') {
    yield put({
      type: actionTypes.SET_MENU_FIXED_YN,
      menuFixedYn,
    });
  }
}

export default function* appSaga() {
  yield takeLatest(actionTypes.AUTH_REQUEST_UUID, loginRequestUUID);
  yield takeLatest(actionTypes.AUTH_RECONNECT_UUID, loginReconnectUUID);
  yield takeLatest(actionTypes.AUTH_REQUEST, loginRequest);
  yield takeLatest(actionTypes.AUTH_CHECK, checkAuthorization);
  yield takeLatest(actionTypes.SESSION_CHECK, checkSession);
  yield takeLatest(actionTypes.AUTH_LOADING, loadAuthorization);
  yield takeLatest(actionTypes.COMMON_NOTIFY, commonNotification);
  yield takeLatest(actionTypes.COMMON_NOTIFY_RESET, unReadCntUpdate);

  // 1-1 getInitialPortalPage
  yield takeLatest(actionTypes.GET_INITIAL_PORTALPAGE, getInitialPortalPage);
  // REMOVE DOCK - 주석 처리
  // yield takeLatest(actionTypes.COMMON_DOCK_LOADING_UNREADCNT, getDockItemListUnreadCnt);
  yield takeLatest(actionTypes.RECEIVE_MYMENU_DATA_SAGA, dockSetMyMenuData);

  // 1-2 loadSkin
  yield takeLatest(actionTypes.LOAD_SKIN_SAGA, getSkinList);

  // 1-3 getNotiMCnt(no using check)
  yield takeLatest(actionTypes.GET_MYMENUNOTICNT_SAGA, getNotiMCnt);

  // 1-4
  yield takeLatest(actionTypes.GET_MYMENUNOTILIST_SAGA, getNotiMList);

  // 1-5
  yield takeLatest(actionTypes.GET_ISNOTIFY, getNotify);

  // 2
  // 2-1
  yield takeLatest(actionTypes.EXEC_DOCKITEM_SAGA, execDockItem);

  // 2-2
  // 1-1의 dockSetMyMenuData

  // 2-3
  yield takeLatest(actionTypes.EXIT_DOCKITEM_SAGA, exitDockItem);
  yield takeLatest(actionTypes.EXEC_APPS_SAGA, execApps);
  yield takeLatest(actionTypes.RELOAD_EXEC_MENU_SAGA, reloadExecApps);
  yield takeLatest(actionTypes.EXIT_AFTER_EXEC_MENU_SAGA, exitAfterExecApps);

  // 2-4
  yield takeLatest(actionTypes.FIX_DOCKITEM_SAGA, fixDockItem);

  // 2-5
  yield takeLatest(actionTypes.UNFIX_DOCKITEM_SAGA, unfixDockItem);

  // 2-7
  yield takeLatest(actionTypes.DND_CHANGE_POSITION_DROP_SGAG, dndChangePosition);

  // 3-1
  yield takeLatest(actionTypes.EXEC_MENU, execMenu);

  // 5-1
  yield takeLatest(actionTypes.SET_DOCK_FIXED_YN_SAGA, setDockFixedYn);

  // 5-2
  yield takeLatest(actionTypes.SET_DOCK_ICON_TYPE_SAGA, setDockIconType);

  // 7-1
  yield takeLatest(actionTypes.GET_MYAPP_TREE_SAGA, getMyAppTree);

  // 7-4
  yield takeLatest(actionTypes.GET_MYAPP_STORE_TREE_SAGA, getMyAppStoreTree);

  // 7-5
  yield takeLatest(actionTypes.MOVE_MYMENU, moveNode);
  yield takeLatest(actionTypes.UPDATE_MYMENU_DISP, updateMymenuDisp);

  // 공통
  yield takeLatest(commonActionType.RESET_NOTIFY, getMyAppTree);
  yield takeLatest(commonActionType.RESET_MYMENU_CATEGORY_DATA, resetTreeData);

  // 8-1
  yield takeLatest(actionTypes.GET_LOADDATA_SAGA, getLoaddata);
  // 시스템업무그룹 트리 변경시
  yield takeLatest(commonActionType.RESET_SYSTEM_BIZGROUP, resetSysTreeReload);

  yield takeLatest(actionTypes.GET_DATA_FOR_APPS_SAGA, getDataForApps);

  yield takeLatest(actionTypes.GET_SINGLEMODE_LOADDATA_SAGA, getSingleModeLoaddata);

  // 9-1
  // yield takeLatest(actionTypes.GET_COMMON_MENU_TREE_SAGA, getCommonMenuTree);

  yield takeLatest(actionTypes.RESET_LAST_EXEC_YN, resetLastExecYn);

  yield takeLatest(actionTypes.UPDATE_MENU_FIXED_YN, updateMenuFixedYn );
  
}

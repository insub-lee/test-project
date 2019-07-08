import { lang } from 'utils/commonUtils';
import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import * as commonActionType from 'containers/common/constants';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import update from 'react-addons-update';
import * as actionType from './constants';

export function* execMenu(payload) {
  const { PAGE_ID, TARGET } = payload;
  const response = yield call(Axios.post, '/api/portal/v1/page/executeMenu/', { PAGE_ID, TARGET });
  const data = response.result;

  // Header의 앱 담당자 목록 가져오기
  const { managerInfo } = response;
  yield put({
    type: actionType.SET_MANAGERINFO,
    managerInfo,
  });

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
              if (dockList[a].WIDGET_LIST !== undefined && dockList[a].WIDGET_LIST !== null) {
                const appIdArr = dockList[a].WIDGET_LIST.split(',');
                let sum = 0;
                notiVal.forEach((notiValue) => {
                  appIdArr.forEach((i) => {
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
        yield put({ type: actionType.LOADING_DOCKITEM_SUCCESS, payload: dockList });
      }
    }
  }
}

export function* getSkinList() {
  const response = yield call(Axios.post, '/api/common/v1/account/appSettingTheme/');
  const resultValue = response;

  // 이 조건은 왜 들어감?
  if (resultValue.theme.length > 0) {
    yield put({ type: actionType.LOAD_SKIN_REDUCER, resultValue });
  }
}

// 햄버거메뉴 카운트 총합
// export function* getNotiHCnt() {
//   const response = yield call(Axios.post, '/api/common/v1/account/getMyRegistNotNotiHCnt/');
//   const resultValue = response;
//   if (resultValue.resultCnt >= 0) {
//     yield put({ type: actionType.SET_HEADERNOTICNT_SUCCESS, resultValue });
//   }
// }

// 미등록메뉴 카운트 총합
export function* getNotiMCnt() {
  const response = yield call(Axios.post, '/api/common/v1/account/getMyRegistNotNotiMCnt/');
  const resultValue = response;
  if (resultValue.resultCnt >= 0) {
    yield put({ type: actionType.SET_MYMENUNOTICNT_SUCCESS, resultValue });
  }
}

// 미등록메뉴 목록 + 카운트
export function* getNotiMList() {
  const response = yield call(Axios.post, '/api/common/v1/account/getMyRegistNotNotiMList/');
  const resultValue = response;
  if (resultValue.list.length > 0) {
    yield put({ type: actionType.SET_MYMENUNOTNOTILIST_SUCCESS, resultValue });
  }
}

export function* execApps(payload) {
  const { pageID } = payload;
  const PAGE_ID = Number(pageID);
  const node = payload.node; // eslint-disable-line

  // const PAGE_ID = Number(pageID);
  // const PAGE_ID = node.PAGE_ID; //eslint-disable-line
  const response = yield call(Axios.post, '/api/portal/v1/page/executeAppsPreview/', { PAGE_ID });
  if (response.list === 'fail') {
    yield put({ type: actionType.EXEC_APPS_FAIL });
  } else {
    const resultValue = JSON.parse(response.list);

    yield put({ type: actionType.EXEC_APPS_SUCCESS, resultValue, node });
  }
}

export function* resetPageApps(payload) {
  const resultValue = JSON.parse(payload.widgetList);
  const setMyMenuThisData = yield select(stateParam => stateParam.get('app').get('setMyMenuData'));

  if (resultValue.length > 0 && payload.PAGE_ID === setMyMenuThisData.PAGE_ID) {
    // 캐쉬 업데이트
    yield put({ type: actionType.RESET_EXEC_APPS_SUCCESS, resultValue: fromJS(resultValue) });
  }
}

export function* resetPageNotiApps(payload) {
  const app = yield select(stateParam => stateParam.get('app'));
  if (app) {
    const selectedAppThisData = app.get('selectedApp');
    const unreadCnt = payload.UNREAD_CNT;

    if (selectedAppThisData.length > 0) {
      // 캐쉬 업데이트
      const myObject = payload.UNREAD_CNT; // eslint-disable-line
      const myObjectVal = Object.values(myObject);
      const notiVal = JSON.parse(`[${myObjectVal}]`);
      if (notiVal !== null) {
        for (let a = 0; a < selectedAppThisData.length; a += 1) {
          for (let b = 0; b < notiVal.length; b += 1) {
            if (selectedAppThisData[a].APP_ID === notiVal[b].APP_ID) {
              Object.assign(selectedAppThisData[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
            }
          }
        }
        yield put({
          type: actionType.RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS,
          resultValue: fromJS(selectedAppThisData),
          isUnreadCnt: unreadCnt,
        });
      }
    } else if (selectedAppThisData.size > 0) {
      // 캐쉬 업데이트
      const selectedAppThisData2 = selectedAppThisData.toJS();
      const myObject = payload.UNREAD_CNT; // eslint-disable-line
      const myObjectVal = Object.values(myObject);
      const notiVal = JSON.parse(`[${myObjectVal}]`);
      if (notiVal !== null) {
        for (let a = 0; a < selectedAppThisData2.length; a += 1) {
          for (let b = 0; b < notiVal.length; b += 1) {
            if (selectedAppThisData2[a].APP_ID === notiVal[b].APP_ID) {
              Object.assign(selectedAppThisData2[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
            }
          }
        }
        yield put({
          type: actionType.RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS,
          resultValue: fromJS(selectedAppThisData2),
          isUnreadCnt: unreadCnt,
        });
      }
    }
  }
}

export function* getInitialPortalPage() {
  const language = lang.getLocale();
  const response = yield call(Axios.post, '/api/portal/v1/page/getInitialPortalPage/', { language });
  // 포털 업무별 홈정보
  if (response.list === 'fail') {
    yield put({ type: actionType.SET_BIZHOME_FAIL });
  } else {
    const resultValue = JSON.parse(response.list);
    yield put({ type: actionType.SET_BIZHOME_SUCCESS, resultValue }); // setBizHome
  }
  if (response.result.length > 0) {
    const dockAppList = response.result;
    for (let i = 0; i < dockAppList.length; i += 1) {
      if (dockAppList[i].LAST_EXEC_YN === 'Y') {
        yield put({
          type: actionType.RECEIVE_MYMENU_DATA_SAGA,
          pageId: dockAppList[i].PAGE_ID,
          isHome: dockAppList[i].HOME_YN,
        }); // setMyMenuNodeData
      }
    }
  }
  // 로딩 DockAppList
  yield put({
    type: actionType.COMMON_DOCK_LOADING_UNREADCNT, // dockAppList
    dockAppList: response.result,
    dockFixedYn: response.dockFixedYn,
    dockIconType: response.dockIconType,
  });
}

export function* dndChangePosition() {
  const dockAppList = yield select(stateParam => stateParam.get('app').get('dockAppList'));

  const updateArr = [];
  dockAppList.forEach((dockApp, index) => {
    const result = Object.assign({}, dockApp);
    result.SORT_SQ = index + 1;
    updateArr.push(result);
  });
  const response = yield call(Axios.post, '/api/portal/v1/dock/dndDropDockItem', { arr: updateArr });
  const data = response.result;

  if (data === 'success') {
    yield put({ type: actionType.DND_CHANGE_POSITION_DROP, payload: updateArr });
  }
  // data === 'fail' 일 때는, drag 시작 시 이전의 dockAppList를 state에 미리 저장해놓고, 이를 다시 불러오는 작업을 해줘야함
  // 해줘야하나?
}

export function* execDockItem(payload) {
  const dockAppList = yield select(stateParam => stateParam.get('app').get('dockAppList'));
  const response = yield call(Axios.put, `/api/portal/v1/dock/executeDockItem/${payload.payload.dockId}`);
  const data = response.result;

  // DB에 있는 값을 update 했는데, 여기서 state 값을 별도로 변경해 주어야 하나
  if (data === 'success') {
    const index = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === payload.payload.dockId);
    const dockAppListUpdate = update(dockAppList, {
      [index]: {
        EXEC_YN: { $set: 'Y' },
        LAST_EXEC_YN: { $set: 'Y' },
      },
    });
    for (let i = 0; i < dockAppListUpdate.length; i += 1) {
      if (dockAppListUpdate[i].DOCK_ID !== payload.payload.dockId) {
        dockAppListUpdate[i].LAST_EXEC_YN = 'N';
      }
    }
    yield put({ type: actionType.EXEC_DOCKITEM, payload: dockAppListUpdate });
  }
  // data === 'fail' 일 떄는, DB에서 방금 실행시킨 앱에 해당하는 레코드를 못찾음
  // 처리는 어떻게?
}

export function* exitDockItem(payload) {
  const dockAppList = yield select(stateParam => stateParam.get('app').get('dockAppList'));
  const index = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === payload.payload.dockId);
  const isDockYn = dockAppList[index].DOCK_YN === 'Y';
  let data = '';
  let setTopFlag = false;
  let response = {};

  if (isDockYn) {
    response = yield call(Axios.post, `/api/portal/v1/dock/executeDockItem/${payload.payload.dockId}`);
    data = response.result;
  } else {
    response = yield call(Axios.post, `/api/portal/v1/dock/executeDockItem/${payload.payload.dockId}`, { isDockYn: 'N' });
    data = response.result;
  }

  if (data === 'success') {
    let dockAppListUpdate = dockAppList.map((app, i) => {
      if (i === index) {
        const appCopy = Object.assign({}, app);
        appCopy.EXEC_YN = 'N';
        appCopy.LAST_EXEC_YN = 'N';
        return appCopy;
      }
      return app;
    });

    // Dock 고정이 아닌 DockItem을 종료시켰을 경우, dockAppList에서 삭제
    if (!isDockYn) {
      dockAppListUpdate.splice(index, 1);

      const updateArr = [];
      dockAppListUpdate.forEach((dockApp, i) => {
        const result = Object.assign({}, dockApp);
        result.SORT_SQ = i + 1;
        updateArr.push(result);
      });
      dockAppListUpdate = updateArr;
      setTopFlag = true;
    }

    // 여러개의 DockItem을 실행시킨 상태에서, 한 DockItem을 종료시켰을 경우,
    // 남은 DockItem 중 가장 최근에 실행된 DockItem을 실행시킴
    const { lastExecDockItemId } = response;
    if (lastExecDockItemId !== -1) {
      const index2 = dockAppListUpdate.findIndex(dockApp => dockApp.DOCK_ID === lastExecDockItemId);

      // page 실행을 위한 node 데이터 생성
      const node = {};
      const dockAppListUpdate2 = dockAppListUpdate.map((app, i) => {
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

          return appCopy;
        }
        return app;
      });
      yield put({
        type: actionType.EXIT_DOCKITEM,
        payload: {
          dockAppListUpdate: dockAppListUpdate2,
          setTopFlag,
        },
      });

      // execApps
      yield put({
        type: actionType.EXEC_APPS_SAGA,
        node,
      });

      // 메뉴트리의 menuName, selectedIndex 동기화
      yield put({
        type: actionType.SET_MENUNAME_SELECTEDINDEX,
        menuName: lang.get('NAME', node),
        selectedIndex: node.MENU_ID,
      });
    } else {
      yield put({
        type: actionType.EXIT_DOCKITEM,
        payload: {
          dockAppListUpdate,
          setTopFlag,
        },
      });
    }
  }
}

export function* fixDockItem(payload) {
  const dockAppList = yield select(stateParam => stateParam.get('app').get('dockAppList'));
  const response = yield call(Axios.put, `/api/portal/v1/dock/fixDockItem/${payload.payload.dockId}`);
  const data = response.result;

  if (data === 'success') {
    const index = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === payload.payload.dockId);
    const dockAppListUpdate = update(dockAppList, {
      [index]: {
        DOCK_YN: { $set: 'Y' },
      },
    });
    yield put({ type: actionType.FIX_DOCKITEM, payload: dockAppListUpdate });
  }
}

export function* unfixDockItem(payload) {
  const dockAppList = yield select(stateParam => stateParam.get('app').get('dockAppList'));
  const index = dockAppList.findIndex(dockApp => dockApp.DOCK_ID === payload.payload.dockId);
  const isExecYn = dockAppList[index].EXEC_YN === 'Y';
  let data = '';
  let setTopFlag = false;

  // unfix한 DockItem의 실행 여부에 따른 조건 분기
  if (dockAppList[index].EXEC_YN === 'N') {
    const response = yield call(Axios.post, `/api/portal/v1/dock/fixDockItem/${payload.payload.dockId}`, { isExecYn: 'N' });
    data = response.result;
  } else {
    const response = yield call(Axios.post, `/api/portal/v1/dock/fixDockItem/${payload.payload.dockId}`);
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
      type: actionType.UNFIX_DOCKITEM,
      payload: {
        dockAppListUpdate,
        setTopFlag,
      },
    });
  }
}

export function* dockSetMyMenuData(payload) {
  const {
    isHome,
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
    dataList = response.list;
  }

  const { managerInfo } = response;
  const selectedIndex = dataList.MENU_ID;
  const menuName = lang.get('NAME', dataList);

  if (response.list !== 'fail') {
    yield put({
      type: actionType.RECEIVE_MYMENU_DATA_SUCCESS,
      payload: dataList,
      selectedIndex,
      menuName,
      managerInfo,
    });
  } else {
    yield put({ type: actionType.RECEIVE_MYMENU_DATA_FAIL });
  }
}

export function* getDockItemList(payload) {
  const response = yield call(Axios.post, '/api/portal/v1/page/getDockItemList/');

  const myObject = payload.UNREAD_CNT; // eslint-disable-line
  const myObjectVal = Object.values(myObject);
  const notiVal = JSON.parse(`[${myObjectVal}]`);
  const dockList = response.result;

  if (notiVal !== null) {
    if (dockList.length > 0) {
      for (let a = 0; a < dockList.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (dockList[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(dockList[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }

          if (dockList[a].APP_ID === -1 && dockList[a].NODE_TYPE === 'E') {
            //  업무 그룹용 예외처리 추후 확인 바람(10/11);
            if (dockList[a].WIDGET_LIST !== undefined && dockList[a].WIDGET_LIST !== null) {
              const appIdArr = dockList[a].WIDGET_LIST.split(',');
              let sum = 0;
              notiVal.forEach((notiValue) => {
                appIdArr.forEach((i) => {
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
        type: actionType.SET_DOCKAPPLIST,
        dockAppList: dockList, //eslint-disable-line
        dockFixedYn: response.dockFixedYn,
        dockIconType: response.dockIconType,
      });
    }

    // if (dockList.length > 0) {
    //   const dockAppList = dockList;
    //   for (let i = 0; i < dockAppList.length; i += 1) {
    //     if (dockAppList[i].LAST_EXEC_YN === 'Y') {
    //       yield put({
    //         type: actionType.RECEIVE_MYMENU_DATA_SAGA,
    //         pageId: dockAppList[i].PAGE_ID,
    //         isHome: dockAppList[i].HOME_YN,
    //       });
    //     }
    //   }
    // }
  }
}

export function* setDockFixedYn(payload) {
  const { dockFixedYn } = payload;
  const response = yield call(Axios.post, '/api/portal/v1/dock/setIsDockFix/', { dockFixedYn });

  if (response.result === 'success') {
    yield put({
      type: actionType.SET_DOCK_FIXED_YN,
      dockFixedYn,
    });
  }
}

export function* setDockIconType(payload) {
  const { dockIconType } = payload;
  const response = yield call(Axios.post, '/api/portal/v1/dock/setDockIconType/', { dockIconType });

  if (response.result === 'success') {
    yield put({
      type: actionType.SET_DOCK_ICON_TYPE,
      dockIconType,
    });
  }
}

// UserDock의 독아이템 로딩
// 1. MyPage에서 페이지 이름 변경 시 독아이템의 이름도 함께 변경되야 하므로 필요
// 2. MyPage에서 앱 삭제시 독아이템의 목록도 변경되야 하므로 필요
export function* loadingDockItem() {
  const loadingDockItemResponse = yield call(Axios.get, '/api/portal/v1/dock/executeDockItem/0');
  const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
  const myObjectVal = Object.values(myObject);
  const notiVal = JSON.parse(`[${myObjectVal}]`);
  const dockList = loadingDockItemResponse.dockItemList;

  // LAST_EXEC_YN이 적용된 새로운 DOCKITEM 목록
  let dockList2 = {};
  const node = {};

  const response = yield call(Axios.post, '/api/portal/v1/dock/setLastExecDockItem/');
  const { lastExecDockItemId } = response;
  if (lastExecDockItemId !== -1) {
    const index = dockList.findIndex(dockApp => dockApp.DOCK_ID === lastExecDockItemId);

    // page 실행을 위한 node 데이터 생성
    dockList2 = dockList.map((app, i) => {
      if (i === index) {
        const appCopy = Object.assign({}, app);
        appCopy.LAST_EXEC_YN = 'Y';

        // node 데이터 만들기
        node.NODE_TYPE = appCopy.NODE_TYPE;
        node.MENU_ID = appCopy.MENU_ID;
        node.INTL_TYPE = appCopy.INTL_TYPE;
        node.SRC_PATH = appCopy.SRC_PATH;
        node.APP_ID = appCopy.APP_ID;
        node.APP_YN = appCopy.SNGL_APP_YN;

        node.PAGE_ID = appCopy.PAGE_ID;
        node.NAME_KOR = appCopy.NAME_KOR;
        node.NAME_ENG = appCopy.NAME_ENG;
        node.NAME_CHN = appCopy.NAME_CHN;
        node.NAME_JPN = appCopy.NAME_JPN;
        node.NAME_ETC = appCopy.NAME_ETC;

        return appCopy;
      }
      return app;
    });
  }

  if (notiVal !== null) {
    if (dockList2.length > 0) {
      for (let a = 0; a < dockList2.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (dockList2[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(dockList2[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }

          if (dockList[a].APP_ID === -1 && dockList[a].NODE_TYPE === 'E') {
            //  업무 그룹용 예외처리 추후 확인 바람(10/11);
            if (dockList[a].WIDGET_LIST !== undefined && dockList[a].WIDGET_LIST !== null) {
              const appIdArr = dockList[a].WIDGET_LIST.split(',');
              let sum = 0;
              notiVal.forEach((notiValue) => {
                appIdArr.forEach((i) => {
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
        type: actionType.LOADING_DOCKITEM_SUCCESS,
        payload: dockList2,
      });

      // execApps
      yield put({
        type: actionType.EXEC_APPS_SAGA,
        node,
      });

      // 메뉴트리의 menuName, selectedIndex 동기화
      yield put({
        type: actionType.SET_MENUNAME_SELECTEDINDEX,
        menuName: lang.get('NAME', node),
        selectedIndex: node.MENU_ID,
      });
    }
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
            //  업무 그룹용 예외처리 추후 확인 바람(10/11);
            if (dockList[a].WIDGET_LIST !== undefined && dockList[a].WIDGET_LIST !== null) {
              const appIdArr = dockList[a].WIDGET_LIST.split(',');
              let sum = 0;
              notiVal.forEach((notiValue) => {
                appIdArr.forEach((i) => {
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
        type: actionType.SET_DOCKAPPLIST,
        dockAppList: dockList, //eslint-disable-line
        dockFixedYn: payload.dockFixedYn,
        dockIconType: payload.dockIconType,
      });
    }
  }
}

export function* getNotify() {
  const response = yield call(Axios.post, '/api/common/v1/notifyhandler');
  const isNoti = response.result;
  yield put({ type: actionType.SET_ISNOTIFY, isNoti });
}

export function* deleteMainDock() {
  const response = yield call(Axios.post, '/api/portal/v1/page/resetdock');
  console.log(response);
}

export function* resetHomepage(payload) {
  const resultSiteId = JSON.parse(payload.PAGE_ID);
  const resultPageId = JSON.parse(payload.SITE_ID);
  const resultWidgetList = JSON.parse(payload.widgetList);
  const setMyMenuThisData = yield select(stateParam => stateParam.get('app').get('setMyMenuData'));
  const setMySiteIdData = yield select(stateParam => stateParam.get('auth').get('profile').get('SITE_ID'));

  if (resultPageId === setMyMenuThisData.PAGE_ID && resultSiteId === setMySiteIdData) {
    // 캐쉬 업데이트
    yield put({ type: actionType.RESET_EXEC_APPS_SUCCESS, resultValue: fromJS(resultWidgetList) });
  }
}

export function* resetSite() {
  // 로직 추가 필요
}

export default function* appSaga() {
  yield takeLatest(actionType.EXEC_MENU, execMenu);
  yield takeLatest(actionType.LOAD_SKIN_SAGA, getSkinList);
  // yield takeLatest(actionType.GET_HEADERNOTICNT_SAGA, getNotiHCnt);
  yield takeLatest(actionType.GET_MYMENUNOTICNT_SAGA, getNotiMCnt);
  yield takeLatest(actionType.GET_MYMENUNOTILIST_SAGA, getNotiMList);
  yield takeLatest(actionType.EXEC_APPS_SAGA, execApps);
  yield takeLatest(commonActionType.RESET_MYMENU_WIDGET_LIST, resetPageApps);

  // Dock Data
  yield takeLatest(actionType.GET_INITIAL_PORTALPAGE, getInitialPortalPage);
  yield takeLatest(commonActionType.RESET_NOTIFY, getDockItemList);
  yield takeEvery(actionType.DND_CHANGE_POSITION_DROP_SGAG, dndChangePosition);
  yield takeLatest(actionType.EXEC_DOCKITEM_SAGA, execDockItem);
  yield takeLatest(actionType.EXIT_DOCKITEM_SAGA, exitDockItem);
  yield takeLatest(actionType.FIX_DOCKITEM_SAGA, fixDockItem);
  yield takeLatest(actionType.UNFIX_DOCKITEM_SAGA, unfixDockItem);
  yield takeLatest(actionType.RECEIVE_MYMENU_DATA_SAGA, dockSetMyMenuData);

  yield takeLatest(actionType.SET_DOCK_FIXED_YN_SAGA, setDockFixedYn);
  yield takeLatest(actionType.SET_DOCK_ICON_TYPE_SAGA, setDockIconType);

  yield takeLatest(commonActionType.LOADING_DOCKITEM, loadingDockItem);
  yield takeLatest(actionType.COMMON_DOCK_LOADING_UNREADCNT, getDockItemListUnreadCnt);

  yield takeLatest(commonActionType.RESET_NOTIFY, resetPageNotiApps);
  // Notify Dot
  yield takeLatest(actionType.GET_ISNOTIFY, getNotify);
  // Main Dock Delete
  yield takeLatest(actionType.DELETE_MAIN_DOCK, deleteMainDock);
  // site noti
  yield takeLatest(commonActionType.RESET_HOMEPAGE, resetHomepage);
  // home noti
  yield takeLatest(commonActionType.RESET_SITE, resetSite);
}

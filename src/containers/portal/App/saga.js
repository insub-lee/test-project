import { takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import update from 'react-addons-update';
import * as commonActionType from 'containers/common/constants';
import * as routeConstants from 'containers/common/Routes/constants';
import * as actionType from './constants';

/*
  업무그룹의 페이지 혹은 사용자들의 페이지 설정이 변경되었을 때,
  사용자 현재 포탈 화면이 변경한 페이지라면 실시간으로 변경 사항을 적용시켜 주기 위한 함수
*/
export function* resetPageApps(payload) {
  const resultValue = JSON.parse(payload.widgetList);
  const setMyMenuThisData = yield select(stateParam => stateParam.get('hynix.common').get('setMyMenuData'));

  const apps = yield select(stateParam => stateParam.get('hynix.common').get('apps'));
  const index = apps.findIndex(o => o.children.props.children.props.setMyMenuData.PAGE_ID === payload.PAGE_ID);
  // 현재 실행중인 페이지가 변경된 경우
  if (resultValue.length > 0 && payload.PAGE_ID === setMyMenuThisData.PAGE_ID) {
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
        type: routeConstants.RESET_EXEC_APPS_SUCCESS,
        resultValue: fromJS(resultValue),
        apps: appsCopy,
      });
    }
  } else if (index !== -1) {
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

    // 현재 실행중인 페이지가 변화된 것이 아니기 때문에, apps만 변경시켜 주면 된다.
    // setMyMenuData는 기존 SAVE_APPS를 활용하기 위해 의미없이 사용
    yield put({
      type: routeConstants.SAVE_APPS,
      apps: appsCopy,
      setMyMenuData: setMyMenuThisData,
    });
  }
}

/*
  업무그룹 관리에서 시스템 업무그룹(홈, 페이지)에 관련된 변경 사항이 존재할 경우
*/
export function* resetPageForSysApps(payload) {
  const { PAGE_ID } = payload;
  const response = yield call(Axios.post, '/api/portal/v1/page/executeRelaodApps/', { PAGE_ID });
  const resultValue = JSON.parse(response.list);
  const setMyMenuThisData = yield select(stateParam => stateParam.get('hynix.common').get('setMyMenuData'));

  const apps = yield select(stateParam => stateParam.get('hynix.common').get('apps'));
  const index = apps.findIndex(o => o.children.props.children.props.setMyMenuData.PAGE_ID === PAGE_ID);

  if (PAGE_ID === setMyMenuThisData.PAGE_ID) {
    if (response.list === 'fail') {
      yield put({ type: routeConstants.EXEC_APPS_FAIL });
    } else {
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
          type: routeConstants.SET_SELECTEDAPP_APPS,
          resultValue,
          apps: appsCopy,
        });
      }
    }
  }
}

export function* resetPageNotiApps(payload) {
  let selectedAppThisData = yield select(portalState => portalState.get('hynix.common').get('selectedApp'));
  if (!selectedAppThisData.length) {
    selectedAppThisData = selectedAppThisData.toJS();
  }

  const setMyMenuData = yield select(portalState => portalState.get('hynix.common').get('setMyMenuData'));
  const unreadCnt = payload.UNREAD_CNT;

  const apps = yield select(stateParam => stateParam.get('hynix.common').get('apps'));
  const index = apps.findIndex(o => o.children.props.children.props.setMyMenuData.PAGE_ID === setMyMenuData.PAGE_ID);

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

      const appsCopy = update(apps, {
        [index]: {
          children: {
            props: {
              children: {
                props: {
                  columns: {
                    $set: selectedAppThisData,
                  },
                },
              },
            },
          },
        },
      });

      yield put({
        type: routeConstants.RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS,
        resultValue: selectedAppThisData,
        isUnreadCnt: unreadCnt,
        apps: appsCopy,
      });
    }
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
            if (dockList[a].WIDGET_LIST !== undefined) {
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
        type: routeConstants.SET_DOCKAPPLIST,
        dockAppList: dockList, //eslint-disable-line
        dockFixedYn: response.dockFixedYn,
        dockIconType: response.dockIconType,
      });
    }
  }
}

// UserDock의 독아이템 로딩
// 1. MyPage에서 페이지 이름 변경 시 독아이템의 이름도 함께 변경되야 하므로 필요
// 2. MyPage에서 앱 삭제시 독아이템의 목록도 변경되야 하므로 필요
export function* loadingDockItem(payload) {
  const loadingDockItemResponse = yield call(Axios.get, '/api/portal/v1/dock/executeDockItem/0');
  const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
  const myObjectVal = Object.values(myObject);
  const notiVal = JSON.parse(`[${myObjectVal}]`);
  const dockList = loadingDockItemResponse.dockItemList;
  const state = {
    isCssTarget: true,
    deletedDockPageId: payload.ACCESS_LOG.body.PAGE_ID,
    type: 'exitDock',
  };

  // LAST_EXEC_YN이 적용된 새로운 DOCKITEM 목록
  let dockList2 = {};
  const node = {};

  let lastDockItem = '';

  // page 실행을 위한 node 데이터 생성
  dockList2 = dockList.map((app) => {
    if (app.LAST_EXEC_YN === 'Y') {
      const appCopy = Object.assign({}, app);

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

      node.HOME_YN = appCopy.HOME_YN;
      node.SYS_YN = appCopy.SYS_YN;

      lastDockItem = node;

      return appCopy;
    }
    return app;
  });

  if (notiVal !== null) {
    if (dockList2.length > 0) {
      for (let a = 0; a < dockList2.length; a += 1) {
        for (let b = 0; b < notiVal.length; b += 1) {
          if (dockList2[a].APP_ID === notiVal[b].APP_ID) {
            Object.assign(dockList2[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
          }

          if (dockList[a].APP_ID === -1 && dockList[a].NODE_TYPE === 'E') {
            //  업무 그룹용 예외처리 추후 확인 바람(10/11);
            if (dockList[a].WIDGET_LIST !== undefined) {
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

      if (lastDockItem.INTL_TYPE === 'Y') {
        yield put(push({
          pathname: `/apps/${lastDockItem.SRC_PATH}`,
          execInfo: state,
        }));
      } else if (lastDockItem.SRC_PATH === 'legacySVC') {
        yield put(push({
          pathname: `/apps/${lastDockItem.SRC_PATH}`,
          execInfo: state,
        }));
      } else {
        yield put(push({
          pathname: `/page/${lastDockItem.PAGE_ID}`,
          execInfo: state,
        }));
      }
    }
  }
}

export function* reloadDockItem() {
  yield call(Axios.post, '/api/portal/v1/dock/addRootDockItem');
  const loadingDockItemResponse = yield call(Axios.get, '/api/portal/v1/dock/executeDockItem/0');
  const dockAppList = loadingDockItemResponse.dockItemList;
  const lastDockItem = dockAppList[dockAppList.findIndex(o => o.LAST_EXEC_YN === 'Y')];

  if (lastDockItem.HOME_YN === 'Y') {
    yield put(push({
      pathname: `/page/${lastDockItem.PAGE_ID}`,
      state: {
        type: 'reloadDock',
      },
    }));
  }
}

export function* deleteMainDock() {
  const response = yield call(Axios.post, '/api/portal/v1/page/resetdock'); //eslint-disable-line
}

export function* resetSite(payload) {
  const { SITE_ID } = payload;
  const setMySiteId = yield select(stateParam => stateParam.get('auth').get('profile').SITE_ID);
  if (SITE_ID === setMySiteId) {
    const response = yield call(Axios.post, '/api/portal/v1/page/siteCheck/', { SITE_ID });
    if (response.result === 'siteAllow') {
      yield put({ type: actionType.RESET_SITE_ALLOW });
    } else {
      yield put({ type: actionType.RESET_SITE_DENY });
      // 403 page 호출
    }
  }
  // 로직 추가 필요
}

export function* resetHomepageSec(payload) {
  const { PAGE_ID } = payload;
  const dockAppList = yield select(portalState => portalState.get('hynix.common').get('dockAppList'));

  const CUR_HOME_APP_PAGE_ID = dockAppList[dockAppList.findIndex(o => o.HOME_YN === 'Y')].PAGE_ID;

  if (CUR_HOME_APP_PAGE_ID !== PAGE_ID) {
    const response = yield call(Axios.post, '/api/portal/v1/page/resetHomePageSec/', { PAGE_ID });

    if (response === 'success') {
      yield put({
        type: commonActionType.LOADING_DOCKITEM,
      });
    }
  }
}

export function* resetDockItemForCommonBiz(payload) {
  const {
    PAGE_IDS,
    SITE_ID,
  } = payload;

  const response = yield call(Axios.post, '/api/portal/v1/dock/deleteDockItemCommonBiz', { PAGE_IDS, SITE_ID });
  const { result } = response;

  if (result === 'success') {
    yield put({
      type: commonActionType.LOADING_DOCKITEM,
    });
  }
}

export default function* appSaga() {
  // Main Dock Delete
  yield takeLatest(actionType.DELETE_MAIN_DOCK, deleteMainDock);

  yield takeLatest(commonActionType.RESET_MYMENU_WIDGET_LIST, resetPageApps);
  yield takeLatest(commonActionType.LOADING_DOCKITEM, loadingDockItem);
  yield takeLatest(commonActionType.RESET_NOTIFY, getDockItemList);
  yield takeLatest(commonActionType.RESET_NOTIFY, resetPageNotiApps);
  // site noti( home & sysBiz)
  yield takeEvery(commonActionType.RESET_SYSTEM_PAGE, resetPageForSysApps);
  // home noti
  yield takeLatest(commonActionType.RESET_SITE, resetSite);
  // home reset
  yield takeLatest(commonActionType.RESET_HOMEPAGE, resetHomepageSec);
  // 공통 업무 삭제시
  yield takeLatest(commonActionType.RESET_MENUSEC, resetDockItemForCommonBiz);
  yield takeLatest(commonActionType.RELOAD_DOCKITEM, reloadDockItem);
}

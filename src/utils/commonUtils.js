import { DEFAULT_LOCALE } from '../containers/common/LanguageProvider/constants';

const lang = {
  locale: DEFAULT_LOCALE,
  translator: {
    en: 'ENG',
    ko: 'KOR',
    zh: 'CHN',
    jp: 'JPN',
    etc: 'ETC',
  },
  translatorForLang: {
    ENG: 'en',
    KOR: 'ko',
    CHN: 'zh',
    JPN: 'jp',
    ETC: 'etc',
  },
  setLang: (language) => {
    if (language) {
      lang.locale = lang.translatorForLang[language];
    } else {
      const type = navigator.appName;

      // 크롬, 익스 10은 Netscape
      if (type === 'Netscape') {
        lang.locale = navigator.language.substr(0, 2);
      } else {
        lang.locale = navigator.userLanguage.substr(0, 2);
      }
    }
  },
  // ko, en, zh 등을 필요로 할 때
  getLocale: () => lang.locale,
  // KOR, ENG, CHN 등을 필요로 할 때
  getLang: () => lang.translator[lang.locale],
  get: (prefix, obj) => obj[`${prefix}_${lang.translator[lang.locale]}`],
};

const intlObj = {
  intl: {},
  setIntl: (intl) => {
    intlObj.intl = intl;
  },
  // get 메소드 내에서 언어별 추가 작업을 처리해주면됨
  get: param => intlObj.intl.formatMessage(param),
};

const sortBy = (field, reverse, primer) => {
  const key = primer ?
    function (x) { return primer(x[field]); } :
    function (x) { return x[field]; };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
};

const imgUrl = {
  get: (size, seq) => `/img/thumb/${size}/${seq}`,
};

const bannerImgUrl = {
  get: (size, seq) => `/img/thumb/crop/${size}/${seq}`,
};

function searchTreeEn(element, matchingAppId, payload) {
  if (element.APP_ID === matchingAppId) {
    Object.assign(element, { UNREAD_CNT: Number(payload) }); //eslint-disable-line

    return element.UNREAD_CNT ? Number(element.UNREAD_CNT) : 0;
  } else if ((element.NODE_TYPE === 'F' || element.NODE_TYPE === 'R') && element.children) {
    for (let j = 0; j < element.children.length; j++) {
      searchTreeEn(element.children[j], matchingAppId, payload, true, element);
    }

    let sumCount = 0;
    for (let j = 0; j < element.children.length; j++) {
      sumCount += element.children[j].UNREAD_CNT ? Number(element.children[j].UNREAD_CNT) : 0;
    }

    Object.assign(element, { UNREAD_CNT: sumCount });

    return element.UNREAD_CNT ? Number(element.UNREAD_CNT) : 0;
  } else if (element.APP_ID === -1 && element.NODE_TYPE === 'E') {
    // 페이지 경우
    const appIdArr = element.WIDGET_LIST;
    appIdArr.map((appId) => {
      if (appId === matchingAppId) {
        Object.assign(element, { UNREAD_CNT: element.UNREAD_CNT ? Number(element.UNREAD_CNT) + Number(payload) : Number(payload) });
      }
    });
  } else {
    return 0;
  }
}

function searchTree(element, notiVal) {
  for (let i = 0; i < notiVal.length; i++) {
    searchTreeEn(element, notiVal[i].APP_ID, notiVal[i].UNREAD_CNT);
  }
  return element;
}

// 익스플로러 여부를 반환
const isExplorer = () => (navigator.appName === 'Netscape' && navigator.userAgent.toLowerCase().indexOf('trident') !== -1) || (navigator.userAgent.toLowerCase().indexOf('msie') !== -1);

// 현재 view가 Desktop인지 여부를 반환
const isDesktop = view => view && view.indexOf('Desktop') !== -1;

let storeNameIndex = 0;
let storeNameCount = 0;
const getStoreName = () => {
  const names = [
    'a',
    'b',
    'c',
    'd',
    'e',
  ];

  if (storeNameCount !== 2) {
    storeNameCount += 1;
    console.log(names[storeNameIndex], '스토어명반환값');
    return names[storeNameIndex];
  } else if (storeNameCount === 2) {
    console.log(names[storeNameIndex], '스토어명반환값');
    storeNameCount = 0;
    return names[storeNameIndex++];
  }
}

const checkPath = (pathname, pathArray) => {
  for (let i = 0; i < pathArray.length; i += 1) {
    if (pathArray[i] === pathname) {
      return true;
    }
  }
  return false;
}

const checkMode = (history, pathArray, singlePathname, appsPathname, data) => {
  if (pathArray[1] === 'sm') {
    history.push({
      pathname: singlePathname, state: data
    });
  } else {
    history.push({
      pathname: appsPathname, state: data
  });
}
}

export {
  lang,
  intlObj,
  sortBy,
  imgUrl,
  searchTree,
  bannerImgUrl,
  isExplorer,
  isDesktop,
  getStoreName,
  ifUrl,
  checkPath,
  checkMode,
};

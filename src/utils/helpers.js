import { Map } from 'immutable';
import XLSX from 'xlsx';

export function clearToken() {
  localStorage.removeItem('id_token');
}

export function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function timeDifference(givenTime) {
  const newDate = new Date(givenTime);
  const milliseconds = new Date().getTime() - newDate.getTime();
  const numberEnding = number => (number > 1 ? 's' : '');
  const number = num => (num > 9 ? `${num}` : `0${num}`);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(newDate.getUTCMonth() + 1);
      const day = number(newDate.getUTCDate());
      const year = newDate.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return `${days} day${numberEnding(days)}`;
      }
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[newDate.getUTCMonth()];
      const day = number(newDate.getUTCDate());
      return `${day} ${month}`;
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}

export function isEquivalent(a, b) {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i += 1) {
    const propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

export const isEqual = (value, other) => {
  // Get the value type
  const type = Object.prototype.toString.call(value);

  if (type !== Object.prototype.toString.call(other)) return false;

  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

  const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  const compare = (item1, item2) => {
    const itemType = Object.prototype.toString.call(item1);

    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    } else {
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else if (item1 !== item2) return false;
    }

    return true;
  };

  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  return true;
};

export function getQueryObj(queryString) {
  const query = queryString.substring(1);
  const pairs = query.split('&');
  const pairObj = {};
  pairs.forEach(pair => {
    const temp = pair.split('=');
    pairObj[temp[0]] = decodeURIComponent(temp[1]);
  });
  return pairObj;
}

export function jsonToQueryString(json) {
  const queryString = Object.keys(JSON.parse(JSON.stringify(json)))
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&');
  return `${queryString}`;
}

export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function reorderMap(from, to, source, destination) {
  const current = from;
  const next = to;
  const target = current[source.Styled];

  current.splice(source.Styled, 1);
  next.splice(destination.index, 0, target);
  return {
    from,
    to,
  };
}

export function makeUniqueTypes(types, prefix = '') {
  const actionTypes = {};
  types.forEach(type => {
    actionTypes[type] = prefix + type;
  });
  return actionTypes;
}

export function isJSON(str) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}

export function cloneJSON(item) {
  return JSON.parse(JSON.stringify(item));
}

export const shuffleArray = array => {
  const nextArray = JSON.parse(JSON.stringify(array));
  let currentIndex = nextArray.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = nextArray[currentIndex];
    nextArray[currentIndex] = nextArray[randomIndex];
    nextArray[randomIndex] = temporaryValue;
  }

  return nextArray;
};

export const SheetJSFT = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  'txt',
  'ods',
  'fods',
  'uos',
  'sylk',
  'dif',
  'dbf',
  'prn',
  'qpw',
  '123',
  'wb*',
  'wq*',
  'html',
  'htm',
]
  .map(x => `.${x}`)
  .join(',');

export function exportExcel(rows, filename = 'exported_excel.xlsx', sheetname = 'Sheet 1') {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetname);
  XLSX.writeFile(wb, filename);
}

export function getVirtualizedMinHeight(headerHeight, bodyHeight, length = 0, limit = 0) {
  let minHeight = headerHeight;
  if (length < 2) {
    minHeight += bodyHeight;
  } else if (length > 20) {
    minHeight = limit;
  } else {
    minHeight += length * bodyHeight;
  }
  return minHeight;
}

export function exportExcelWithAOA(rows, filename = 'exported_excel.xlsx', sheetname = 'Sheet 1') {
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetname);
  XLSX.writeFile(wb, filename);
}

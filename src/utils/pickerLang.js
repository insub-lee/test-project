import en from 'antd/lib/date-picker/locale/en_US';
import ko from 'antd/lib/date-picker/locale/ko_KR';
import zh from 'antd/lib/date-picker/locale/zh_CN';

const locale = new Map([['en', en], ['zh', zh], ['ko', ko], ['ko-KR', ko]]);

export default locale.get(window.navigator.language);
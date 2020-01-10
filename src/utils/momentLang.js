import moment from 'moment';
import enCa from 'moment/locale/en-ca';
import fr from 'moment/locale/fr';
import ptBr from 'moment/locale/pt-br';
import es from 'moment/locale/es';
import ko from 'moment/locale/ko';

const languages = new Map([
  ['en', enCa],
  ['fr', fr],
  ['pt-br', ptBr],
  ['es', es],
  ['ko', ko],
]);

export default moment.locale(window.navigator.language, languages.get(window.navigator.language));


import moment from 'moment';
import en_ca_moment from 'moment/locale/en-ca';
import fr_moment from 'moment/locale/fr';
import pt_br_moment from 'moment/locale/pt-br';
import es_moment from 'moment/locale/es';
import ko_moment from 'moment/locale/ko'

const languages = new Map([['en', en_ca_moment], ['fr', fr_moment], ['pt-br', pt_br_moment], ['es', es_moment], ['ko', ko_moment]]);

export default moment.locale(window.navigator.language, languages.get(window.navigator.language));
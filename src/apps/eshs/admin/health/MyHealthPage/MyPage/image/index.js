// item
import Green from './item/녹.gif';
import Green1 from './item/녹_1.gif';
import Red from './item/빨.gif';
import Red1 from './item/빨1.gif';
import Orange from './item/주.gif';
import Orange1 from './item/주1.gif';
import Dang1 from './item/dang_1.gif';
import Dang2 from './item/dang_2.gif';
import Dang3 from './item/dang_3.gif';
import De from './item/de.gif';
import Gan1 from './item/gan_1.gif';
import Gan2 from './item/gan_2.gif';
import Gan3 from './item/gan_3.gif';
import Goji1 from './item/goji_1.gif';
import Goji2 from './item/goji_2.gif';
import Goji3 from './item/goji_3.gif';
import Gre from './item/green.gif';
import Re from './item/red.gif';
import Yellow from './item/yellow.gif';
import Htop from './item/h_top.gif';
// man
import Mbin1 from './man/bin_1.gif';
import Mbin2 from './man/bin_2.gif';
import Mbin3 from './man/bin_3.gif';
import Mgo1 from './man/go_1.gif';
import Mgo2 from './man/go_2.gif';
import Mgo3 from './man/go_3.gif';
import Mhead from './man/head.gif';
import Mleg from './man/leg.gif';
import MlegBiman from './man/leg_biman.gif';
import Msang from './man/sang.gif';
import MsangBiman from './man/sang_biman.gif';
import MsangGwa from './man/sang_gwa.gif';
// woman
import Wbin1 from './woman/bin_1.gif';
import Wbin2 from './woman/bin_2.gif';
import Wbin3 from './woman/bin_3.gif';
import Wgo1 from './woman/go_1.gif';
import Wgo2 from './woman/go_2.gif';
import Wgo3 from './woman/go_3.gif';
import Whead from './woman/head.gif';
import Wleg from './woman/leg.gif';
import WlegBiman from './woman/leg_biman.gif';
import Wsang from './woman/sang.gif';
import WsangBiman from './woman/sang_biman.gif';
import WsangGwa from './woman/sang_gwa.gif';

export const makeAvaterImg = data => {
  const gender = data.GENDER || 'm';
  const avater = {};

  const gradeGo = data.GRADE_GO || '';
  const gradeBin = data.GRADE_BIN || '';
  const gradeBiman = data.GRADE_BIMAN || '';
  const gradeGan = data.GRADE_GAN || '';
  const gradeGoji = data.GRADE_GOJI || '';
  const gradeDang = data.GRADE_DANG || '';
  avater.GENDER = gender;
  if (gender === 'm') {
    // 남자 머리
    switch (gradeGo) {
      case '1등급':
        avater.head = Mgo1;
        break;
      case '2등급':
        avater.head = Mgo2;
        break;
      case '3등급':
        avater.head = Mgo3;
        break;
      default:
        switch (gradeBin) {
          case '1등급':
            avater.head = Mbin1;
            break;
          case '2등급':
            avater.head = Mbin2;
            break;
          case '3등급':
            avater.head = Mbin3;
            break;
          default:
            avater.head = Mhead;
            break;
        }
        break;
    }
    // 남자 몸, 다리
    switch (gradeBiman) {
      case '표준':
        avater.body = Msang;
        avater.leg = Mleg;
        break;
      case '과체중':
        avater.body = MsangGwa;
        avater.leg = Mleg;
        break;
      case '비만':
        avater.body = MsangBiman;
        avater.leg = MlegBiman;
        break;
      default:
        avater.body = Msang;
        avater.leg = Mleg;
        break;
    }
  } else {
    // 여자 머리
    switch (gradeGo) {
      case '1등급':
        avater.head = Wgo1;
        break;
      case '2등급':
        avater.head = Wgo2;
        break;
      case '3등급':
        avater.head = Wgo3;
        break;
      default:
        switch (gradeBin) {
          case '1등급':
            avater.head = Wbin1;
            break;
          case '2등급':
            avater.head = Wbin2;
            break;
          case '3등급':
            avater.head = Wbin3;
            break;
          default:
            avater.head = Whead;
            break;
        }
        break;
    }

    // 여자 몸, 다리
    switch (gradeBiman) {
      case '표준':
        avater.body = Wsang;
        avater.leg = Wleg;
        break;
      case '과체중':
        avater.body = WsangGwa;
        avater.leg = Wleg;
        break;
      case '비만':
        avater.body = WsangBiman;
        avater.leg = WlegBiman;
        break;
      default:
        avater.body = Wsang;
        avater.leg = Wleg;
        break;
    }
  }
  // 남녀 공통
  // 간장질환
  switch (gradeGan) {
    case '1등급':
      avater.gan = Gan1;
      break;
    case '2등급':
      avater.gan = Gan2;
      break;
    case '3등급':
      avater.gan = Gan3;
      break;
    default:
      break;
  }
  // 고지혈
  switch (gradeGoji) {
    case '1등급':
      avater.goji = Goji1;
      break;
    case '2등급':
      avater.goji = Goji2;
      break;
    case '3등급':
      avater.goji = Goji3;
      break;
    default:
      break;
  }
  // 당뇨
  switch (gradeDang) {
    case '1등급':
      avater.dang = Dang1;
      break;
    case '2등급':
      avater.dang = Dang2;
      break;
    case '3등급':
      avater.dang = Dang3;
      break;
    default:
      break;
  }
  if (gradeBiman === '비만' || gradeGo === '1등급' || gradeGan === '1등급' || gradeGoji === '1등급' || gradeDang === '1등급' || gradeBin === '1등급') {
    avater.signal = Re;
  } else if (gradeGo === '2등급' || gradeGan === '2등급' || gradeGoji === '2등급' || gradeDang === '2등급' || gradeBin === '2등급') {
    avater.signal = Re;
  } else if (gradeBiman === '과체중' || gradeGo === '3등급' || gradeGan === '3등급' || gradeGoji === '3등급' || gradeDang === '3등급' || gradeBin === '3등급') {
    avater.signal = Yellow;
  } else {
    avater.signal = Gre;
  }
  avater.top = Htop;
  return avater;
};

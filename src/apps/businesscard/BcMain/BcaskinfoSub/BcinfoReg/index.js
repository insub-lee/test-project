import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import { basicPath } from 'containers/common/constants';
import bcbg_b from 'apps/businesscard/images/bc_B.png';
import bcbg_f from 'apps/businesscard/images/bc_F.png';

import StyleGlobalAdminDtl from './StyleGlobalAdminDtl';
import StyleGlobalAdminForm from './StyleGlobalAdminForm';
import { LinkBtnLgtGray, BtnDkGray, BtnDelete, LinkBtnList } from './buttons.style';
import messages from './messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';


const FormItem = Form.Item;
const { TextArea } = Input;


class BcAskIUD extends React.Component {
  constructor(prop) {
    super(prop);
   
    // 공통코드 목록에서 넘어온 Data
    const location = this.props.history.location.state;

    console.log('#####################[BcAskIUD...BcinfoReg]#######################');
    console.log('BcinfoDetail_location', location);

    this.state = {
      mode: prop.location.search.replace('?', ''),
      
      //BC_ID:'BCR-151020-0009',
      orgVal: prop.location.state,

      //cardTypeCd: 'AA',   //명함종류
      cardTypeCd: location.BC_ITEM,   //명함종류
     
      //cardReqstNo: 'BCR-180919-0001',  //명함신청번호
      //cardReqstNo: location.BC_ID,  //명함신청번호

      reqstId: '',      //사번
      reqstKorNm: '',   //성명  
      reqstEngNm: '',   //성명(영문)
      jwKorNm: '',  //직위                   
      jwEngNm: '',      //직위(영문)
      tmKorNm: '',      //팀
      tmEngNm: '',      //팀(영문)
      addrKorNm1: '',   //주소1
      addrKorNm2: '',   //주소2
      addrEngNm1: '',   //주소1(영문)
      addrEngNm2: '',   //주소2(영문)
      telNo: '',        //Tel
      faxNo: '',        //Fax
      hpNo: '',         //Mobile
      email: '',        //E-mail
      jmYN: 'Y',         //직무 표기_미표기
      jmKornm: '',      //직무
      jmEngnm: '',      //직무(영문)
      cardRcvCd: '',    //수령방법
      buldingNm: '',    //명함배송건물
      jcKorNm: '',     // 직책
      plUnKorNm: '',    // PL단위업무한글명
      menoDesc: '',     // 메모
      reqstQty: '50',   // 신청수량
      reqstChnNm:'',    // 신청자한자명
      jcYN:'Y',         // 직책 표기유무
      plGbn:'',         // pl구분
      licKorNm:'',      // 자격사항한글명
      licEngNm:'',      // 자격사항영문명
      fileId1:'',       // 첨부파일1
      fileId2:'',       // 첨부파일2

      cardTypeCdValid:  false,   //명함종류
      cardReqstNoValid: false,   //명함신청번호
      reqstIdValid:     false,   //사번
      reqstKorNmValid:  false,   //성명  
      reqstEngNmValid:  false,   //성명(영문)
      jwKorNmValid:     false,   //직위                   
      jwEngNmValid:     false,   //직위(영문)
      tmKorNmValid:     false,   //팀
      tmEngNmValid:     false,   //팀(영문)
      addrKorNm1Valid:  false,   //주소1
      addrKorNm2Valid:  false,   //주소2
      addrEngNm1Valid:  false,   //주소1(영문)
      addrEngNm2Valid:  false,   //주소2(영문)
      telNoValid:       false,   //Tel
      faxNoValid:       false,   //Fax
      hpNoValid:        false,   //Mobile
      emailValid:       false,   //E-mail
      jmYNValid:        false,   //직무(표기,미표기)
      jmKornmValid:     false,   //직무
      jmEngnmValid:     false,   //직무(영문)
      cardRcvCdValid:   false,   //수령방법
      buldingNmValid:   false,   //명함배송건물
      jcKorNmValid:     false,   //직책
      plUnKorNmValid:   false,   //직책명
      menoDescValid:    false,   //메모
      reqstQtyValid:    false,   //신청수량
      reqstChnNmValid:  false,   //한자명 REQST_CHN_NM
      jcYNValid:        false,   //직책표기유무
      plGbnValid:       false,   //pl구분
      licKorNmValid:    false,   //자격사항한글명
      licEngNmValid:    false,   //자격사항영문명
      fileId1Valid:     false,   //첨부파일1
      fileId2Valid:     false,   //첨부파일2

    };
  }
//============================== 이벤트 =======================
  onChangereqstKorNm = (e) => {
    this.setState({ reqstKorNm: e.target.value });   if (e.target.value !== '') this.setState({ reqstKorNmValid: true });    else this.setState({ reqstKorNmValid: false });
  };
  onChangejwKorNm = (e) => {
    this.setState({ jwKorNm: e.target.value });      if (e.target.value !== '') this.setState({ jwKorNmValid: true });    else this.setState({ jwKorNmValid: false });
  };
  onChangetmKorNm = (e) => {
    this.setState({ tmKorNm: e.target.value });      if (e.target.value !== '') this.setState({ tmKorNmValid: true });    else this.setState({ tmKorNmValid: false });
  };
  onChangeaddrKorNm1 = (e) => {
    this.setState({ addrKorNm1: e.target.value });      if (e.target.value !== '') this.setState({ addrKorNm1Valid: true });    else this.setState({ addrKorNm1Valid: false });
  };
  onChangeaddrKorNm2 = (e) => {
    this.setState({ addrKorNm2: e.target.value });      if (e.target.value !== '') this.setState({ addrKorNm2Valid: true });    else this.setState({ addrKorNm2Valid: false });
  };

  onChangereqstEngNm = (e) => {
    this.setState({ reqstEngNm: e.target.value });   if (e.target.value !== '') this.setState({ reqstEngNmValid: true });    else this.setState({ reqstEngNmValid: false });
  };
  onChangejwEngNm = (e) => {
    this.setState({ jwEngNm: e.target.value });      if (e.target.value !== '') this.setState({ jwEngNmValid: true });    else this.setState({ jwEngNmValid: false });
  };
  onChangetmEngNm = (e) => {
    this.setState({ tmEngNm: e.target.value });      if (e.target.value !== '') this.setState({ tmEngNmValid: true });    else this.setState({ tmEngNmValid: false });
  };
  onChangeaddrEngNm1 = (e) => {
    this.setState({ addrEngNm1: e.target.value });      if (e.target.value !== '') this.setState({ addrEngNm1Valid: true });    else this.setState({ addrEngNm1Valid: false });
  };
  onChangeaddrEngNm2 = (e) => {
    this.setState({ addrEngNm2: e.target.value });      if (e.target.value !== '') this.setState({ addrEngNm2Valid: true });    else this.setState({ addrEngNm2Valid: false });
  };
  onChangejmEngnm = (e) => {
    this.setState({ jmEngnm: e.target.value });      if (e.target.value !== '') this.setState({ jmEngnmValid: true });    else this.setState({ jmEngnmValid: false });
  };


  onChangetelNo = (e) => {
    this.setState({ telNo: e.target.value });      if (e.target.value !== '') this.setState({ telNoValid: true });    else this.setState({ telNoValid: false });
  };
  onChangefaxNo = (e) => {
    this.setState({ faxNo: e.target.value });      if (e.target.value !== '') this.setState({ faxNoValid: true });    else this.setState({ faxNoValid: false });
  };
  onChangehpNo = (e) => {
    this.setState({ hpNo: e.target.value });      if (e.target.value !== '') this.setState({ hpNoValid: true });    else this.setState({ hpNoValid: false });
  };
  onChangeemail = (e) => {
    this.setState({ email: e.target.value });      if (e.target.value !== '') this.setState({ emailValid: true });    else this.setState({ emailValid: false });
  };
  onChangejmKornm = (e) => {
    this.setState({ jmKornm: e.target.value });      if (e.target.value !== '') this.setState({ jmKornmValid: true });    else this.setState({ jmKornmValid: false });
  };

  onChangecardRcvCd = (e) => {
    this.setState({ cardRcvCd: e.target.value });      if (e.target.value !== '') this.setState({ cardRcvCdValid: true });    else this.setState({ cardRcvCdValid: false });
  };
  onChangebuldingNm = (e) => {
    this.setState({ buldingNm: e.target.value });      if (e.target.value !== '') this.setState({ buldingNmValid: true });    else this.setState({ buldingNmValid: false });
  };
  onChangejcKorNm = (e) => {
    this.setState({ jcKorNm: e.target.value });      if (e.target.value !== '') this.setState({ jcKorNmValid: true });    else this.setState({ jcKorNmValid: false });
  };
  onChangemenoDesc = (e) => {
    this.setState({ menoDesc: e.target.value });      if (e.target.value !== '') this.setState({ menoDescValid: true });    else this.setState({ menoDescValid: false });
  };
  onChangereqstQty = (e) => {
    this.setState({ reqstQty: e.target.value });      if (e.target.value !== '') this.setState({ reqstQtyValid: true });    else this.setState({ reqstQtyValid: false });
  };

  //신청자 한자명
  onChangereqstChnNm = (e) => {
    this.setState({ reqstChnNm: e.target.value });      if (e.target.value !== '') this.setState({ reqstChnNmValid: true });    else this.setState({ reqstChnNmValid: false });
  };
  // 직무표기유무
  onChangejmYN = (e) => {
    this.setState({ jmYN: e.target.value });      if (e.target.value !== '') this.setState({ jmYNValid: true });    else this.setState({ jmYNValid: false });
  };
  // 직책표기유무
  onChangejcYN = (e) => {
    this.setState({ jcYN: e.target.value });      if (e.target.value !== '') this.setState({ jcYNValid: true });    else this.setState({ jcYNValid: false });
  };
  // PL구분
  onChangeplGbn = (e) => {
    this.setState({ plGbn: e.target.value });      if (e.target.value !== '') this.setState({ plGbnValid: true });    else this.setState({ plGbnValid: false });
  };

  onChangelicKorNm = (e) => {
    this.setState({ licKorNm: e.target.value }); if (e.target.value !== '') this.setState({ licKorNmValid: true }); else this.setState({ licKorNmValid: false });
  };
  onChangelicEngNm = (e) => {
    this.setState({ licEngNm: e.target.value }); if (e.target.value !== '') this.setState({ licEngNmValid: true }); else this.setState({ licEngNmValid: false });
  };


  //============================== 저장 =======================
  regGlobalMsg = () => {
    if (this.vaildChk()) {
      const tempVal = {
        CARD_TYPE_CD:  this.state.cardTypeCd,
        CARD_REQST_NO: this.state.cardReqstNo,
        REQST_ID:      this.state.reqstId,
        REQST_KOR_NM:  this.state.reqstKorNm,
        JW_KOR_NM:     this.state.jwKorNm,
        TM_KOR_NM:     this.state.tmKorNm,        
        ADDR_KOR_NM1:  this.state.addrKorNm1,
        ADDR_KOR_NM2:  this.state.addrKorNm2,
        TEL_NO:        this.state.telNo,
        FAX_NO:        this.state.faxNo,
        HP_NO:         this.state.hpNo,
        EMAIL:         this.state.email,
        JM_KOR_NM:     this.state.jmKornm,
        REQST_ENG_NM:  this.state.reqstEngNm,
        JW_ENG_NM:     this.state.jwEngNm,
        TM_ENG_NM:     this.state.tmEngNm,
        ADDR_ENG_NM1:  this.state.addrEngNm1,
        ADDR_ENG_NM2:  this.state.addrEngNm2,
        JM_ENG_NM:     this.state.jmEngnm,
        CARD_RCV_CD:   this.state.cardRcvCd,
        BULDING_NM:    this.state.buldingNm,
        PL_UN_KOR_NM:  this.state.jcKorNm,
        MEMO_DESC:     this.state.menoDesc,
        REQST_QTY:     this.state.reqstQty,
        REQST_CHN_NM:  this.state.reqstChnNm,
        JM_YN:         this.state.jmYN,
        JC_YN:         this.state.jcYN,
        PL_GBN:        this.state.plGbn,
        LIC_KOR_NM:    this.state.licKorNm,
        LIC_ENG_NM:    this.state.licEngNm,
      };
      this.setState({ orgVal: tempVal });
      this.props.registGlobalMsg(
        this.state.cardTypeCd,
        this.state.cardReqstNo,
        this.state.reqstId,
        this.state.reqstKorNm,
        this.state.jwKorNm,
        this.state.tmKorNm,

        this.state.addrKorNm1,
        this.state.addrKorNm2,
        this.state.telNo,
        this.state.faxNo,
        this.state.hpNo,
        this.state.email,
        this.state.jmKornm,
        this.state.reqstEngNm,
        this.state.jwEngNm,
        this.state.tmEngNm,
        this.state.addrEngNm1,
        this.state.addrEngNm2,
        this.state.jmEngnm,
        this.state.cardRcvCd,
        this.state.buldingNm,
        this.state.jcKorNm,
        this.state.menoDesc,
        this.state.reqstQty,
        this.state.reqstChnNm,
        this.state.jmYN,
        this.state.jcYN,
        this.state.plGbn,
        this.state.licKorNm,
        this.state.licEngNm,
        this.props.history,        
      );
      this.setState({ mode: 'D' });
    }
  }  
  vaildChk = () => {
        return true;
  }

  //직무표기
  ShowJM_YN = () => {  
    if (this.state.jmYN ==='Y' ){  
          return (
                <div>
                  <Input value={this.state.jmKornm}     onChange={this.onChangejmKornm}   size='20'   maxLength="10"  />
                </div>
          );  
    }  
    if (this.state.jmYN ==='N' ){      
      return (
           <div>
           </div>
      );
    }  
    return '';      
  }

  //직책표기 PL_GBN
  ShowJC_YN = () => {  
      if (this.state.jcYN ==='Y' ){  
            return (
                  <div className="searchBox">
                    <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value="담당" />담당&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value='팀장' />팀장&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value='PM' />PM <br></br>
                    <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value='PL' />PL&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value='PM/팀장' />PL/팀장(대외용)                    
                  </div>
            );  
      }  
      if (this.state.jcYN ==='N' ){      
        return (
             <div>
             </div>
        );
      }  
      return '';      
    }

    
//----------------------------- 앞면 ---------------------------------
ShowSetFormatterHEAD = () => {
  if (this.state.cardTypeCd ==='AA' || this.state.cardTypeCd ==='AB') {
      return (
        <div>
              <table>
                <tbody>
                  <tr><th><label htmlFor="d1">성 명 *</label></th> <td> <Input value={this.state.reqstKorNm}    onChange={this.onChangereqstKorNm}  size='20'    maxLength="8"   /> </td> </tr>
                  <tr><th ><label htmlFor="d1">직 위 </label></th> <td> <Input value={this.state.jwKorNm}       onChange={this.onChangejwKorNm}     size='20'   maxLength="10"  /> </td> </tr>
                  <tr><th ><label htmlFor="d1">팀    </label></th> <td> <Input value={this.state.tmKorNm}       onChange={this.onChangetmKorNm}     size='20'   maxLength="10"  /> </td> </tr>
                  <tr><th ><label htmlFor="d1">주 소 *</label></th> <td> <Input value={this.state.addrKorNm1}    onChange={this.onChangeaddrKorNm1}  size='30'   maxLength="10"  /><br></br>
                                                                         <Input value={this.state.addrKorNm2}    onChange={this.onChangeaddrKorNm2}  size='30'   maxLength="10"  /> </td> </tr>
                  <tr><th ><label htmlFor="d1">Tel     </label></th> <td> <Input value={this.state.telNo}       onChange={this.onChangetelNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                  <tr><th ><label htmlFor="d1">Fax     </label></th> <td> <Input value={this.state.faxNo}       onChange={this.onChangefaxNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                  <tr><th ><label htmlFor="d1">Mobile  </label></th> <td> <Input value={this.state.hpNo}        onChange={this.onChangehpNo}     size='20'   maxLength="10"  /> </td> </tr>                  
                  <tr><th ><label htmlFor="d1">E-mail  </label></th> <td> <Input value={this.state.email}       onChange={this.onChangeemail}    size='20'   maxLength="10"  /> </td> </tr>                  
                  <tr><th ><label htmlFor="d1">직 무&nbsp;&nbsp;&nbsp;&nbsp;</label></th> <td> 
                                                              <input type="radio" name="JM_YN" onChange={this.onChangejmYN} value="Y" />표기&nbsp;&nbsp;
                                                              <input type="radio" name="JM_YN" onChange={this.onChangejmYN} value='N' />미표기
                                                              </td> </tr>
                  <tr><th ><label htmlFor="d1">&nbsp;&nbsp;</label></th> <td> {this.ShowJM_YN()} </td> </tr>


                </tbody>
              </table>
        </div>
      );
  }
  else if (this.state.cardTypeCd ==='BA' || this.state.cardTypeCd ==='BB') {
    return (
      <div>
            <table>
              <tbody>
                <tr><th><label htmlFor="d1">성 명 *</label></th> <td> <Input value={this.state.reqstKorNm}    onChange={this.onChangereqstKorNm}  size='20'    maxLength="8"   /> </td> </tr>
                <tr><th><label htmlFor="d1">한자명 </label></th> <td> <Input value={this.state.reqstChnNm}    onChange={this.onChangereqstChnNm}  size='20'    maxLength="8"   /> </td> </tr>  
                <tr><th ><label htmlFor="d1">직 위 </label></th> <td> <Input value={this.state.jwKorNm}       onChange={this.onChangejwKorNm}     size='20'   maxLength="10"  /> </td> </tr>
                <tr><th ><label htmlFor="d1">팀    </label></th> <td> <Input value={this.state.tmKorNm}       onChange={this.onChangetmKorNm}     size='20'   maxLength="10"  /> </td> </tr>
                <tr><th ><label htmlFor="d1">주 소 *</label></th> <td> <Input value={this.state.addrKorNm1}    onChange={this.onChangeaddrKorNm1}  size='30'   maxLength="10"  /><br></br>
                                                                       <Input value={this.state.addrKorNm2}    onChange={this.onChangeaddrKorNm2}  size='30'   maxLength="10"  /> </td> </tr>
               
                <tr><th ><label htmlFor="d1">Tel     </label></th> <td> <Input value={this.state.telNo}       onChange={this.onChangetelNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">Fax     </label></th> <td> <Input value={this.state.faxNo}       onChange={this.onChangefaxNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">Mobile  </label></th> <td> <Input value={this.state.hpNo}        onChange={this.onChangehpNo}     size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">E-mail  </label></th> <td> <Input value={this.state.email}       onChange={this.onChangeemail}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">직 무&nbsp;&nbsp;&nbsp;&nbsp;</label></th> <td> 
                                                              <input type="radio" name="JM_YN" onChange={this.onChangejmYN} value="Y" />표기&nbsp;&nbsp;
                                                              <input type="radio" name="JM_YN" onChange={this.onChangejmYN} value='N' />미표기
                                                              </td> </tr>
                 <tr><th ><label htmlFor="d1">&nbsp;&nbsp;</label></th> <td> {this.ShowJM_YN()} </td> </tr>
              </tbody>
            </table>
      </div>
    );
  }
  else if (this.state.cardTypeCd ==='CA' || this.state.cardTypeCd ==='CB') {
    return (
      <div>
            <table>
              <tbody>
                <tr><th><label htmlFor="d1">성 명 *</label></th> <td> <Input value={this.state.reqstKorNm}    onChange={this.onChangereqstKorNm}  size='20'    maxLength="8"   /> </td> </tr>
                <tr><th><label htmlFor="d1">자격사항 </label></th> <td> <Input value={this.state.licKorNm}    onChange={this.onChangelicKorNm}    size='20'    maxLength="8"   /> </td> </tr>  
                <tr><th ><label htmlFor="d1">직 위 </label></th> <td> <Input value={this.state.jwKorNm}       onChange={this.onChangejwKorNm}     size='20'   maxLength="10"  /> </td> </tr>
                <tr><th ><label htmlFor="d1">팀    </label></th> <td> <Input value={this.state.tmKorNm}       onChange={this.onChangetmKorNm}     size='20'   maxLength="10"  /> </td> </tr>
                <tr><th ><label htmlFor="d1">주 소 *</label></th> <td> <Input value={this.state.addrKorNm1}    onChange={this.onChangeaddrKorNm1}  size='30'   maxLength="10"  /><br></br>
                                                                       <Input value={this.state.addrKorNm2}    onChange={this.onChangeaddrKorNm2}  size='30'   maxLength="10"  /> </td> </tr>
               
                <tr><th ><label htmlFor="d1">Tel     </label></th> <td> <Input value={this.state.telNo}       onChange={this.onChangetelNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">Fax     </label></th> <td> <Input value={this.state.faxNo}       onChange={this.onChangefaxNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">Mobile  </label></th> <td> <Input value={this.state.hpNo}        onChange={this.onChangehpNo}     size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">E-mail  </label></th> <td> <Input value={this.state.email}       onChange={this.onChangeemail}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">직 무&nbsp;&nbsp;&nbsp;&nbsp;</label></th> <td> 
                                                              <input type="radio" name="JM_YN" onChange={this.onChangejmYN} value="Y" />표기&nbsp;&nbsp;
                                                              <input type="radio" name="JM_YN" onChange={this.onChangejmYN} value='N' />미표기
                                                              </td> </tr>
                 <tr><th ><label htmlFor="d1">&nbsp;&nbsp;</label></th> <td> {this.ShowJM_YN()} </td> </tr>
              </tbody>
            </table>
      </div>
    );
  }


 return '';
}

//----------------------------- 뒷면 ---------------------------------
ShowSetFormatterTAIL = () => {
  if (this.state.cardTypeCd ==='AA' || this.state.cardTypeCd ==='AB' || this.state.cardTypeCd ==='BA' || this.state.cardTypeCd ==='BB') {
      return (
        <div>
              <table>
                <tbody>
                  <tr><th><label htmlFor="d1">성명(영문) *</label></th> <td> <Input value={this.state.reqstEngNm} onChange={this.onChangereqstEngNm} maxLength="38"   /> </td> </tr>
                  <tr><th ><label htmlFor="d1">직위(영문) </label></th> <td> <Input value={this.state.jwEngNm}    onChange={this.onChangejwEngNm}    maxLength="30"  /> </td> </tr>
                  <tr><th ><label htmlFor="d1">팀(영문)    </label></th> <td> <Input value={this.state.tmEngNm}    onChange={this.onChangetmEngNm}    maxLength="30"  /> </td> </tr>
                  <tr><th ><label htmlFor="d1">주소(영문) *</label></th> <td> <Input value={this.state.addrEngNm1}    onChange={this.onChangeaddrEngNm1}  size='30'   maxLength="10"  /><br></br>
                                                                             <Input value={this.state.addrEngNm2}    onChange={this.onChangeaddrEngNm2}  size='30'   maxLength="10"  /> </td> </tr>

                  <tr><th ><label htmlFor="d1">Tel     </label></th> <td> <Input value={this.state.telNo}       onChange={this.onChangetelNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                  <tr><th ><label htmlFor="d1">Fax     </label></th> <td> <Input value={this.state.faxNo}       onChange={this.onChangefaxNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                  <tr><th ><label htmlFor="d1">Mobile  </label></th> <td> <Input value={this.state.hpNo}        onChange={this.onChangehpNo}     size='20'   maxLength="10"  /> </td> </tr>                  
                  <tr><th ><label htmlFor="d1">E-mail  </label></th> <td> <Input value={this.state.email}       onChange={this.onChangeemail}    size='20'   maxLength="10"  /> </td> </tr>                  
                  <tr><th ><label htmlFor="d1">직무(영문)</label></th> <td> <Input value={this.state.jmEngnm}     onChange={this.onChangejmEngnm}   size='20'   maxLength="10"  /> </td> </tr>                                                      

                </tbody>
              </table>
        </div>
      );
  }
  if (this.state.cardTypeCd ==='CA' || this.state.cardTypeCd ==='CB') {
    return (
      <div>
            <table>
              <tbody>
                <tr><th><label htmlFor="d1">성명(영문) *</label></th> <td> <Input value={this.state.reqstEngNm} onChange={this.onChangereqstEngNm} maxLength="38"   /> </td> </tr>
                <tr><th><label htmlFor="d1">자격사항 </label></th> <td> <Input value={this.state.licEngNm}    onChange={this.onChangelicEngNm}    size='20'    maxLength="8"   /> </td> </tr>  
                <tr><th ><label htmlFor="d1">직위(영문) </label></th> <td> <Input value={this.state.jwEngNm}    onChange={this.onChangejwEngNm}    maxLength="30"  /> </td> </tr>
                <tr><th ><label htmlFor="d1">팀(영문)    </label></th> <td> <Input value={this.state.tmEngNm}    onChange={this.onChangetmEngNm}    maxLength="30"  /> </td> </tr>
                <tr><th ><label htmlFor="d1">주소(영문) *</label></th> <td> <Input value={this.state.addrEngNm1}    onChange={this.onChangeaddrEngNm1}  size='30'   maxLength="10"  /><br></br>
                                                                           <Input value={this.state.addrEngNm2}    onChange={this.onChangeaddrEngNm2}  size='30'   maxLength="10"  /> </td> </tr>
                <tr><th ><label htmlFor="d1">Tel     </label></th> <td> <Input value={this.state.telNo}       onChange={this.onChangetelNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">Fax     </label></th> <td> <Input value={this.state.faxNo}       onChange={this.onChangefaxNo}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">Mobile  </label></th> <td> <Input value={this.state.hpNo}        onChange={this.onChangehpNo}     size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">E-mail  </label></th> <td> <Input value={this.state.email}       onChange={this.onChangeemail}    size='20'   maxLength="10"  /> </td> </tr>                  
                <tr><th ><label htmlFor="d1">직무(영문)</label></th> <td> <Input value={this.state.jmEngnm}     onChange={this.onChangejmEngnm}   size='20'   maxLength="10"  /> </td> </tr>                                                      

              </tbody>
            </table>
      </div>
    );
}

 return '';
}

//-----------------------------공통 신청사항 ---------------------------------
ShowSetFormatterETC = () => {
  return (
    <div>
<table style={{ display: 'inline-block', width: '100%' }}>
      <tbody style={{ display: 'inline-block', width: '100%' }}>
        <tr><th><label htmlFor="d1">수령방법 *    </label></th> <td> 
                                                                   <input type="radio" name="CARD_RCV_CD" onChange={this.onChangecardRcvCd} value="B" />사내문서수발 &nbsp;&nbsp;&nbsp;
                                                                   <input type="radio" name="CARD_RCV_CD" onChange={this.onChangecardRcvCd} value='A' />직접수령
                                                                </td> </tr>
        <tr><th ><label htmlFor="d1">명함배송건물 </label></th> <td> <Input value={this.state.buldingNm}  onChange={this.onChangebuldingNm} size='20'   maxLength="10"  /> </td> </tr>
        <tr><th ><label htmlFor="d1">직 책&nbsp;&nbsp;&nbsp;&nbsp;</label></th> <td> 
                                                              <input type="radio" name="JC_YN" onChange={this.onChangejcYN} value="Y" />표기&nbsp;&nbsp;
                                                              <input type="radio" name="JC_YN" onChange={this.onChangejcYN} value='N' />미표기
                                                              <hr color='yellow' size='1'></hr>
                                                              </td> </tr>
         <tr><th ><label htmlFor="d1">&nbsp;&nbsp;</label></th> <td> {this.ShowJC_YN()} </td> </tr>

       
        <tr><th ><label htmlFor="d1">메 모       </label></th> <td> <Input value={this.state.menoDesc}   onChange={this.onChangemenoDesc}  size='20'   maxLength="10"  /> </td> </tr>                  
        <tr><th ><label htmlFor="d1">신청수량 *   </label></th> <td> 
                                                                   <input type="radio" name="REQST_QTY" onChange={this.onChangereqstQty} value="50"  />50&nbsp;&nbsp;&nbsp;&nbsp;
                                                                   <input type="radio" name="REQST_QTY" onChange={this.onChangereqstQty} value='100' />100
                                                                </td> </tr>                  
      </tbody>
    </table>
</div>

  );
}

//===============================[render()]=======================================  
  render() {
    console.log(this.props);
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };

    const title = (mode) => {
      if (mode === '') return '명함 신청 등록';
      else if (mode === 'I') return '명함 신청 등록';
      return '';

    };    

    const BcType = (item01) => {
      if (item01 === '') return '한글기본형';
      else if (item01 === 'AA') return '한글기본형';
      else if (item01 === 'AB') return '한글확대형';
      else if (item01 === 'BA') return '한자형';
      else if (item01 === 'BB') return '한자확대형';
      else if (item01 === 'CA') return '별정형';
      else if (item01 === 'CB') return '별정형확대형';
      return '';

    };    


    //---------------------------------------------------
    const botBtn = (mode) => {
        return (
          <React.Fragment>
            <LinkBtnLgtGray>
              <Link to={`/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub`}>취소</Link>
            </LinkBtnLgtGray>
            <BtnDkGray onClick={this.regGlobalMsg}>저장</BtnDkGray>
          </React.Fragment>
        );
    };

    //---------------------------------------------------
    return (
      <div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
        <StyleGlobalAdminDtl>
          <h3 className="pageTitle">{title(this.state.mode)} [  {BcType(this.state.cardTypeCd)} ]</h3>
          <div className="buttonWrapper"> {botBtn(this.state.mode)}</div>
          <StyleGlobalAdminForm >
            <Form>
          <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 110px)' }}>



<table  align='right' style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 110px)' }}>
  <tr style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 110px)' }}> 
       <td style={{ width: '40%' }}>
            <div className="tmp1" style={{visibility: 'visible', width: '100%', height: 'calc(100vh - 110px)' }} >
                <h4>[앞면]</h4>
                -------------------------------------------------------------------
                {this.ShowSetFormatterHEAD()}

                <hr color='green' size='1'></hr>
                <h4>[신청내용]</h4>
                -------------------------------------------------------------------
                {this.ShowSetFormatterETC()}

            </div>
       </td>
       <td style={{ width: '40%' }}>
            <div className="tmp2" style={{visibility: 'visible', width: '100%', height: 'calc(100vh - 110px)' }} >
                <h4>[뒷면]</h4>
                -------------------------------------------------------------------
                {this.ShowSetFormatterTAIL()}
            </div>
       </td>
       <td style={{ width: '20%' }}>
            <div className="tmp3" style={{visibility: 'visible', width: '100%', height: 'calc(100vh - 110px)' }} >
                 <h4>[미리보기]</h4>
                 -------------------------------------------------------------------                           
                 <table>
                    <tbody>
                        <tr>
                            <td>
                                [앞면]
                            </td>
                        </tr>

                        <tr>
                            <td>
                              <img  alt="앞면"    src={bcbg_f}   style={{ width: 320, height:170,}}   />
                              {this.state.reqstKorNm}{this.state.reqstChnNm}
                              ( {this.state.jwKorNm}) <br></br>
                              {this.state.tmKorNm}    <br></br>
                              {this.state.addrKorNm1}{this.state.addrKorNm2}<br></br>
                              {this.state.telNo}    <br></br>
                              {this.state.faxNo}       <br></br>
                              {this.state.hpNo}        <br></br>
                              {this.state.email}                               

                            </td>
                        </tr>

                        <tr>
                            <td>
                            <hr color='blue'></hr>
                                [뒤면]
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                              <img  alt="뒷면"    src={bcbg_b}   style={{ width: 320, height:170,}}   />
                              {this.state.reqstEngNm}
                              ( {this.state.jwEngNm}) <br></br>
                              {this.state.tmEngNm}    <br></br>
                              {this.state.addrEngNm1}{this.state.addrEngNm2}<br></br>
                              {this.state.telNo}    <br></br>
                              {this.state.faxNo}       <br></br>
                              {this.state.hpNo}        <br></br>
                              {this.state.email}                               

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
       </td>
  </tr>      
</table>
</div>   

            </Form>
          </StyleGlobalAdminForm>

        </StyleGlobalAdminDtl>
      </div>          
    );
    //----------------------------------------------------
  }
}

const mapDispatchToProps = dispatch => (
  {
    registGlobalMsg: (CARD_TYPE_CD, 
                      CARD_REQST_NO, 
                      REQST_ID, 
                      REQST_KOR_NM,
                      JW_KOR_NM,
                      TM_KOR_NM, 
                      ADDR_KOR_NM1,
                      ADDR_KOR_NM2,
                      TEL_NO,
                      FAX_NO,
                      HP_NO,
                      EMAIL,
                      JM_KOR_NM,
                      REQST_ENG_NM,
                      JW_ENG_NM,
                      TM_ENG_NM,
                      ADDR_ENG_NM1,
                      ADDR_ENG_NM2,
                      JM_ENG_NM,
                      CARD_RCV_CD,
                      BULDING_NM,
                      PL_UN_KOR_NM,
                      MEMO_DESC,
                      REQST_QTY,
                      REQST_CHN_NM,
                      JM_YN,
                      JC_YN,                      
                      PL_GBN,
                      LIC_KOR_NM,
                      LIC_ENG_NM,
                      history) =>
      dispatch(actions.registGlobalMsg(CARD_TYPE_CD, 
                                       CARD_REQST_NO, 
                                       REQST_ID, 
                                       REQST_KOR_NM,
                                       JW_KOR_NM,
                                       TM_KOR_NM, 
                                       ADDR_KOR_NM1,
                                       ADDR_KOR_NM2,
                                       TEL_NO,
                                       FAX_NO,
                                       HP_NO,
                                       EMAIL,
                                       JM_KOR_NM,
                                       REQST_ENG_NM,
                                       JW_ENG_NM,
                                       TM_ENG_NM,
                                       ADDR_ENG_NM1,
                                       ADDR_ENG_NM2,
                                       JM_ENG_NM,
                                       CARD_RCV_CD,
                                       BULDING_NM,
                                       PL_UN_KOR_NM,
                                       MEMO_DESC,
                                       REQST_QTY,
                                       REQST_CHN_NM,
                                       JM_YN,
                                       JC_YN,
                                       PL_GBN,
                                       LIC_KOR_NM,
                                       LIC_ENG_NM,
                                       history)),
  }
);

const mapStateToProps = createStructuredSelector({
  globalMsgRes: selectors.makeSelectGlobalMsg(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'GlobalAdminDtl', saga });
const withReducer = injectReducer({ key: 'GlobalAdminDtl', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BcAskIUD);

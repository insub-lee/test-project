import React from 'react';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Form, Input, Button } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { Link } from 'react-router-dom';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import { basicPath } from 'containers/common/constants';
import { LinkBtnDkGray,LinkBtnLgtGray,BtnDkGray ,BtnDelete } from 'containers/store/components/uielements/buttons.style';
import bcbg_b from 'apps/businesscard/images/bc_B.png';
import bcbg_f from 'apps/businesscard/images/bc_F.png';
import { Radio } from 'antd';
import AntRadiobox from 'containers/store/components/uielements/radiobox.style';

import StyleNotifyAdminDtl from './StyleNotifyAdminDtl';
import StyleNotifyAdminForm from './StyleNotifyAdminForm';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import StyleVGroup from './StyleVGroup';
import StyleVGroupForm from './StyleVGroupForm';
const RadioGroup = AntRadiobox(Radio.Group);

const FormItem = Form.Item;
const { TextArea } = Input;

class BcinfoEdit extends React.Component {
//  class BcinfoList extends PureComponent {
  constructor(prop) {
    super(prop);
    // 공통코드 목록에서 넘어온 Data
    const location = this.props.history.location.state;

    this.state = {
      mode: prop.location.search.replace('?', ''),
      orgVal: prop.location.state,
      BC_ID: location.BC_ID,
      cardTypeCd:  this.props.siteInfoRow.CARD_TYPE_CD,   //명함종류  
      cardReqstNo: this.props.siteInfoRow.CARD_REQST_NO,  //명함아이디
      reqstId:     this.props.siteInfoRow.REQST_ID,       //사번  
      reqstKorNm:  this.props.siteInfoRow.REQST_KOR_NM,   //성명  
      reqstEngNm:  this.props.siteInfoRow.REQST_ENG_NM,   //성명(영문)
      jwKorNm:     this.props.siteInfoRow.JW_KOR_NM ,     //직위
      jwEngNm:     this.props.siteInfoRow.JW_ENG_NM,      //직위(영문)
      tmKorNm:     this.props.siteInfoRow.TM_KOR_NM,      //팀
      tmEngNm:     this.props.siteInfoRow.TM_ENG_NM,      //팀(영문)
      addrKorNm1:  this.props.siteInfoRow.ADDR_KOR_NM1,   //주소1
      addrKorNm2:  this.props.siteInfoRow.ADDR_KOR_NM2,   //주소2
      addrEngNm1:  this.props.siteInfoRow.ADDR_ENG_NM1,   //주소1(영문)
      addrEngNm2:  this.props.siteInfoRow.ADDR_ENG_NM2,   //주소2(영문)
      telNo:       this.props.siteInfoRow.TEL_NO,         //Tel
      faxNo:       this.props.siteInfoRow.FAX_NO,         //Fax
      hpNo:        this.props.siteInfoRow.HP_NO,          //Mobile
      email:       this.props.siteInfoRow.EMAIL,          //E-mail
      jmKornm:     this.props.siteInfoRow.JM_KOR_NM,      //직무
      jmEngnm:     this.props.siteInfoRow.JM_ENG_NM,      //직무(영문)
      cardRcvCd:   this.props.siteInfoRow.CARD_RCV_CD,    //수령방법
      buldingNm:   this.props.siteInfoRow.BULDING_NM,     //명함배송건물
      jcKorNm:     this.props.siteInfoRow.PL_UN_KOR_NM,
      JC_YN:       this.props.siteInfoRow.JC_YN,          //직책표기유무
      menoDesc:    this.props.siteInfoRow.MEMO_DESC,      //메모
      reqstQty:    this.props.siteInfoRow.REQST_QTY,      //신청수량
      reqstChnNm:  this.props.siteInfoRow.REQST_CHN_NM,   //신청자한자명
      jmYN:        this.props.siteInfoRow.JM_YN,          //직무표기유무
      jcYN:        this.props.siteInfoRow.JC_YN,          //직책표기유무
      plGbn:       this.props.siteInfoRow.PL_GBN,         //PL구분표기
      licKorNm:    this.props.siteInfoRow.LIC_KOR_NM,     //자격한글명
      licEngNm:    this.props.siteInfoRow.LIC_ENG_NM,     //자격영문명


    };
    // 화면 로드 시 데이터 가져옴
    this.props.getBcInfo(this.state.BC_ID);
  }

  onClickToList = () => {
    const data = {
      sortColumn: this.state.listSortColumn,
      sortDirection: this.state.listSortDirection,
      keywordType: this.state.listKeywordType,
      keyword: this.state.listKeyword,
    };
    // console.log('!!!!!!', data);
    this.props.history.push({
      pathname: `/${basicPath.APPS}/businesscard/BcMain/BcAdmin03Sub`, state: data,
    });
  }
  
  onChangereqstKorNm = (e) => {    this.setState({ reqstKorNm: e.target.value });   };
  onChangejwKorNm    = (e) => {    this.setState({ jwKorNm: e.target.value });      };
  onChangetmKorNm    = (e) => {    this.setState({ tmKorNm: e.target.value });      };
  onChangeaddrKorNm1 = (e) => {    this.setState({ addrKorNm1: e.target.value });   };
  onChangeaddrKorNm2 = (e) => {    this.setState({ addrKorNm2: e.target.value });   };

  onChangereqstEngNm = (e) => {    this.setState({ reqstEngNm: e.target.value });   };
  onChangejwEngNm    = (e) => {    this.setState({ jwEngNm: e.target.value });      };
  onChangetmEngNm    = (e) => {    this.setState({ tmEngNm: e.target.value });      };
  onChangeaddrEngNm1 = (e) => {    this.setState({ addrEngNm1: e.target.value });   };
  onChangeaddrEngNm2 = (e) => {    this.setState({ addrEngNm2: e.target.value });   };
  onChangejmEngnm    = (e) => {    this.setState({ jmEngnm: e.target.value });      };


  onChangetelNo   = (e) => {    this.setState({ telNo: e.target.value });    };
  onChangefaxNo   = (e) => {    this.setState({ faxNo: e.target.value });    };
  onChangehpNo    = (e) => {    this.setState({ hpNo: e.target.value });     };
  onChangeemail   = (e) => {    this.setState({ email: e.target.value });    };
  onChangejmKornm = (e) => {    this.setState({ jmKornm: e.target.value });  };

  onChangecardRcvCd = (e) => {    this.setState({ cardRcvCd: e.target.value });     };
  onChangebuldingNm = (e) => {    this.setState({ buldingNm: e.target.value });     };
  
  onChangejcKorNm   = (e) => {    this.setState({ jcKorNm: e.target.value });       };

  onChangemenoDesc  = (e) => {    this.setState({ menoDesc: e.target.value });      };
  onChangereqstQty  = (e) => {    this.setState({ reqstQty: e.target.value });      };

  onChangereqstChnNm  = (e) => {  this.setState({ reqstChnNm: e.target.value });      };
  onChangejmYN        = (e) => {  this.setState({ jmYN: e.target.value });      };
 
  onChangejcYN      = (e) => { this.setState({ jcYN: e.target.value });      };
  onChangeplGbn     = (e) => { this.setState({ plGbn: e.target.value });     };
  onChangelicKorNm  = (e) => { this.setState({ licKorNm: e.target.value });  };
  onChangelicEngNm  = (e) => { this.setState({ licEngNm: e.target.value });  };


  //-----------------------------수정 저장 process --------------------
  vaildChk = () => {
    return true;
  }

  udtConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm(`수정 하시겠습니까 ?`, '', this.udtGlobalMsg);
    }
  }

  udtGlobalMsg = () => {
      this.props.udtGlobalMsg(
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
  
 }

  //------------------------------------------------------ 직무표기 -------------------------------------------------

  ShowJM_YN = () => {  
    if (this.state.jmYN ==='Y' ){  
          return (
                <span>
                        <input type='radio' name='JM_YN' onChange={this.onChangejmYN} checked value='Y' />표기&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='radio' name='JM_YN' onChange={this.onChangejmYN} value='N' />미표기
                        <br></br> <Input value={this.state.jmKornm}     onChange={this.onChangejmKornm}  />
                </span>
          );  
    }  
    if (this.state.jmYN ==='N' ){      
      return (
           <span>
                <input type='radio' name='JM_YN' onChange={this.onChangejmYN} value='Y' />표기&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='radio' name='JM_YN' onChange={this.onChangejmYN} checked value='N' />미표기
            </span>
      );
    }  
    return '';      
  }

 //------------------------------------------------------ 수령방법 ---------------------------------------------------
  ShowCARD_RCV_CD = () => {  
    if (this.state.cardRcvCd ==='A' ){  
          return (
                <span>
                      <input type="radio" name="CARD_RCV_CD" onChange={this.onChangecardRcvCd} value='B' />사내문서수발 &nbsp;&nbsp;&nbsp;
                      <input type="radio" name="CARD_RCV_CD" onChange={this.onChangecardRcvCd} value='A' checked/>직접수령
                </span>
          );  
    }  
    if (this.state.cardRcvCd ==='B' ){  
      return (
           <span>
                      <input type="radio" name="CARD_RCV_CD" onChange={this.onChangecardRcvCd} value='B' checked/>사내문서수발 &nbsp;&nbsp;&nbsp;
                      <input type="radio" name="CARD_RCV_CD" onChange={this.onChangecardRcvCd} value='A' />직접수령
            </span>
      );
    }  
      return '';
  }
  //----------------------------------------------------- 신청수량
  ShowREQST_QTY = () => {  
    if (this.state.reqstQty ==='50' ){  
          return (
                <div>
                      <input type="radio" name="REQST_QTY" onChange={this.onChangereqstQty} value='50' checked/>50&nbsp;&nbsp;&nbsp;
                      <input type="radio" name="REQST_QTY" onChange={this.onChangereqstQty} value='100' />100
                </div>
          );  
    }  
    if (this.state.reqstQty ==='100'){  
      return (
           <div>
                      <input type="radio" name="REQST_QTY" onChange={this.onChangereqstQty} value='50' />50&nbsp;&nbsp;&nbsp;
                      <input type="radio" name="REQST_QTY" onChange={this.onChangereqstQty} value='100' checked />100
            </div>
      );
    }  
    return (
      <div>
                 <input type="radio" name="REQST_QTY" onChange={this.onChangereqstQty} value='50' />50&nbsp;&nbsp;&nbsp;
                 <input type="radio" name="REQST_QTY" onChange={this.onChangereqstQty} value='100'/>100
       </div>
     );

  }

  //---------------------------------------------- 직책표기 PL_GBN ------------------------------------------
  ShowJC_YN = () => {  
    if (this.state.jcYN ==='Y' ){  
          return (
                <span>
                     <input type="radio" name="JC_YN" onChange={this.onChangejcYN} value="Y" checked/>표기&nbsp;&nbsp;&nbsp;&nbsp;
                     <input type="radio" name="JC_YN" onChange={this.onChangejcYN} value='N' />미표기
                     <hr color='yellow' size='1'></hr>

                      <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value="담당" />담당&nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value='팀장' />팀장&nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value='PM' />PM <br></br>
                      <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value='PL' />PL&nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="radio" name="PL_GBN" onChange={this.onChangeplGbn} value='PM/팀장' />PL/팀장(대외용)                    
              </span>
          );  
    }  
    if (this.state.jcYN ==='N' ){      
      return (
             <span>
                     <input type="radio" name="JC_YN" onChange={this.onChangejcYN} value="Y" />표기&nbsp;&nbsp;&nbsp;&nbsp;
                     <input type="radio" name="JC_YN" onChange={this.onChangejcYN} value='N' checked />미표기
             </span>
      );
    }  
    return '';      
  }

//----------------------------- 앞면 ---------------------------------
  ShowSetFormatterHEAD = () => {
    if (this.props.siteInfoRow.CARD_TYPE_CD ==='AA' || this.props.siteInfoRow.CARD_TYPE_CD ==='AB') {
        return (
          <div>
                         <table>
                           <tbody>
                                 <tr><td  width='80' >신청번호</td><td> <Input value={this.props.siteInfoRow.CARD_REQST_NO} readOnly /></td></tr>
                                 <tr><td  width='80' >성 명</td><td>    <Input value={this.state.reqstKorNm}  onChange={this.onChangereqstKorNm}  /></td></tr>
                                 <tr><td  width='80' >직 위</td><td>    <Input value={this.state.jwKorNm}     onChange={this.onChangejwKorNm}  /></td></tr>
                                 <tr><td  width='80' >팀</td><td>       <Input value={this.state.tmKorNm}     onChange={this.onChangetmKorNm}  /></td></tr>
                                 <tr><td  width='80' >주소</td><td>     <Input value={this.state.addrKorNm1}  onChange={this.onChangeaddrKorNm1}  />
                                                                        <Input value={this.state.addrKorNm2}  onChange={this.onChangeaddrKorNm2}  /></td></tr>
                                 <tr><td  width='80' >Tel</td><td>      <Input value={this.state.telNo}       onChange={this.onChangetelNo}  /></td></tr>
                                 <tr><td  width='80' >Fax</td><td>      <Input value={this.state.faxNo}       onChange={this.onChangefaxNo}  /></td></tr>
                                 <tr><td  width='80' >Mobile</td><td>   <Input value={this.state.hpNo}        onChange={this.onChangehpNo}  /></td></tr>
                                 <tr><td  width='80' >E-mail</td><td>   <Input value={this.state.email}       onChange={this.onChangeemail}  /></td></tr>
                                 <tr><td  width='80' >직  무</td> <td> {this.ShowJM_YN()} </td></tr>
                            </tbody>
                          </table>
          </div>
        );
    }
    if (this.props.siteInfoRow.CARD_TYPE_CD ==='BA' || this.props.siteInfoRow.CARD_TYPE_CD ==='BB') {
      return (
        <div>
                       <table>
                         <tbody>
                               <tr><td  width='80' >신청번호</td><td> <Input value={this.props.siteInfoRow.CARD_REQST_NO} readOnly /></td></tr>
                               <tr><td  width='80' >성 명</td><td>    <Input value={this.state.reqstKorNm}  onChange={this.onChangereqstKorNm}  /></td></tr>
                               <tr><td  width='80' >한자명</td><td>    <Input value={this.state.reqstChnNm} onChange={this.onChangereqstChnNm}  /></td></tr>
                               <tr><td  width='80' >직 위</td><td>    <Input value={this.state.jwKorNm}     onChange={this.onChangejwKorNm}  /></td></tr>
                               <tr><td  width='80' >팀</td><td>       <Input value={this.state.tmKorNm}     onChange={this.onChangetmKorNm}  /></td></tr>
                               <tr><td  width='80' >주소</td><td>     <Input value={this.state.addrKorNm1}  onChange={this.onChangeaddrKorNm1}  />
                                                                      <Input value={this.state.addrKorNm2}  onChange={this.onChangeaddrKorNm2}  /></td></tr>
                               <tr><td  width='80' >Tel</td><td>      <Input value={this.state.telNo}       onChange={this.onChangetelNo}  /></td></tr>
                               <tr><td  width='80' >Fax</td><td>      <Input value={this.state.faxNo}       onChange={this.onChangefaxNo}  /></td></tr>
                               <tr><td  width='80' >Mobile</td><td>   <Input value={this.state.hpNo}        onChange={this.onChangehpNo}  /></td></tr>
                               <tr><td  width='80' >E-mail</td><td>   <Input value={this.state.email}       onChange={this.onChangeemail}  /></td></tr>
                               <tr><td  width='80' >직  무</td> <td> {this.ShowJM_YN()} </td></tr>                               
                          </tbody>
                        </table>
        </div>
      );
    }
    if (this.props.siteInfoRow.CARD_TYPE_CD ==='CA' || this.props.siteInfoRow.CARD_TYPE_CD ==='CB') {
      return (
         <div>
                     <table>
                       <tbody>
                             <tr><td  width='80' >신청번호</td><td> <Input value={this.props.siteInfoRow.CARD_REQST_NO} readOnly /></td></tr>
                             <tr><td  width='80' >성 명</td><td>    <Input value={this.state.reqstKorNm}  onChange={this.onChangereqstKorNm}  /></td></tr>
                             <tr><td  width='80' >자격사항</td><td>  <Input value={this.state.licKorNm}   onChange={this.onChangelicKorNm}  /></td></tr>
                             <tr><td  width='80' >직 위</td><td>    <Input value={this.state.jwKorNm}     onChange={this.onChangejwKorNm}  /></td></tr>
                             <tr><td  width='80' >팀</td><td>       <Input value={this.state.tmKorNm}     onChange={this.onChangetmKorNm}  /></td></tr>
                             <tr><td  width='80' >주소</td><td>     <Input value={this.state.addrKorNm1}  onChange={this.onChangeaddrKorNm1}  />
                                                                    <Input value={this.state.addrKorNm2}  onChange={this.onChangeaddrKorNm2}  /></td></tr>
                             <tr><td  width='80' >Tel</td><td>      <Input value={this.state.telNo}       onChange={this.onChangetelNo}  /></td></tr>
                             <tr><td  width='80' >Fax</td><td>      <Input value={this.state.faxNo}       onChange={this.onChangefaxNo}  /></td></tr>
                             <tr><td  width='80' >Mobile</td><td>   <Input value={this.state.hpNo}        onChange={this.onChangehpNo}  /></td></tr>
                             <tr><td  width='80' >E-mail</td><td>   <Input value={this.state.email}       onChange={this.onChangeemail}  /></td></tr>
                             <tr><td  width='80' >직  무</td> <td> {this.ShowJM_YN()} </td></tr>                               
                        </tbody>
                      </table>
         </div>
      );
    }



   return '';
  }

  
//----------------------------- 뒤면 ---------------------------------
  ShowSetFormatterTAIL = () => {
    if (this.props.siteInfoRow.CARD_TYPE_CD ==='AA' || this.props.siteInfoRow.CARD_TYPE_CD ==='AB'|| 
        this.props.siteInfoRow.CARD_TYPE_CD ==='BA' || this.props.siteInfoRow.CARD_TYPE_CD ==='BB') {
        return (
          <div>
                         <table>
                           <tbody>
                                 <tr><td  width='80' >성명(영문)</td><td>    <Input value={this.state.reqstEngNm}  onChange={this.onChangereqstEngNm }  /></td></tr>
                                 <tr><td  width='80' >직위(영문)</td><td>    <Input value={this.state.jwEngNm}     onChange={this.onChangejwEngNm }  /></td></tr>
                                 <tr><td  width='80' >팀(영문)</td><td>      <Input value={this.state.tmEngNm}     onChange={this.onChangetmEngNm }  /></td></tr>
                                 <tr><td  width='80' >주소(영문)</td><td>    <Input value={this.state.addrEngNm1}  onChange={this.onChangeaddrEngNm1 }  />
                                                                            <Input value={this.state.addrEngNm2}   onChange={this.onChangeaddrEngNm2 }  /></td></tr>
                                 <tr><td  width='80' >Tel</td><td>          <Input value={this.state.telNo}        onChange={this.onChangetelNo}  /></td></tr>
                                 <tr><td  width='80' >Fax</td><td>          <Input value={this.state.faxNo}        onChange={this.onChangefaxNo}  /></td></tr>
                                 <tr><td  width='80' >Mobile</td><td>       <Input value={this.state.hpNo}         onChange={this.onChangehpNo}  /></td></tr>
                                 <tr><td  width='80' >E-mail</td><td>       <Input value={this.state.email}        onChange={this.onChangeemail}  /></td></tr>
                                 <tr><td  width='80' >직무(영문)</td><td>    <Input value={this.state.jmEngnm}      onChange={this.onChangejmEngnm }  /></td></tr>
                            </tbody>
                          </table>
          </div>
        );
    }
    if (this.props.siteInfoRow.CARD_TYPE_CD ==='CA'|| this.props.siteInfoRow.CARD_TYPE_CD ==='CB') {
      return (
        <div>
                       <table>
                         <tbody>
                                 <tr><td  width='80' >성명(영문)</td><td>    <Input value={this.state.reqstEngNm}  onChange={this.onChangereqstEngNm }  /></td></tr>
                                 <tr><td  width='80' >자격사항</td><td>      <Input value={this.state.licEngNm}    onChange={this.onChangelicEngNm}  /></td></tr>
                                 <tr><td  width='80' >직위(영문)</td><td>    <Input value={this.state.jwEngNm}     onChange={this.onChangejwEngNm }  /></td></tr>
                                 <tr><td  width='80' >팀(영문)</td><td>      <Input value={this.state.tmEngNm}     onChange={this.onChangetmEngNm }  /></td></tr>
                                 <tr><td  width='80' >주소(영문)</td><td>    <Input value={this.state.addrEngNm1}  onChange={this.onChangeaddrEngNm1 }  />
                                                                            <Input value={this.state.addrEngNm2}   onChange={this.onChangeaddrEngNm2 }  /></td></tr>
                                 <tr><td  width='80' >Tel</td><td>          <Input value={this.state.telNo}        onChange={this.onChangetelNo}  /></td></tr>
                                 <tr><td  width='80' >Fax</td><td>          <Input value={this.state.faxNo}        onChange={this.onChangefaxNo}  /></td></tr>
                                 <tr><td  width='80' >Mobile</td><td>       <Input value={this.state.hpNo}         onChange={this.onChangehpNo}  /></td></tr>
                                 <tr><td  width='80' >E-mail</td><td>       <Input value={this.state.email}        onChange={this.onChangeemail}  /></td></tr>
                                 <tr><td  width='80' >직무(영문)</td><td>    <Input value={this.state.jmEngnm}      onChange={this.onChangejmEngnm }  /></td></tr>
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
                       <table>
                         <tbody>
                               <tr><td  width='130' >수령 방법</td><td> {this.ShowCARD_RCV_CD()} </td></tr>
                               <tr><td  width='130' >명함 배송건물</td><td>  <Input value={this.state.buldingNm} onChange={this.onChangebuldingNm }  /></td></tr>
                               
                               <tr><td  width='130' >직 책</td><td>        {this.ShowJC_YN()} </td></tr>

                               <tr><td  width='130' >메모 </td><td>         <Input value={this.state.menoDesc}  onChange={this.onChangemenoDesc }  /></td></tr>
                               <tr><td  width='130' >신청수량</td><td>&nbsp;&nbsp;&nbsp;{this.ShowREQST_QTY()}</td></tr>
                          </tbody>
                        </table>
        );
  }

//----------------------------- 앞면미리보기 ---------------------------------
ShowSetFormatterHEADview = () => {
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='AA' || this.props.siteInfoRow.CARD_TYPE_CD ==='AB') {
      return (
        <div>
                       <table>
                         <tbody>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.reqstKorNm}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{`${this.state.jwKorNm} || ${this.state.tmKorNm}` }</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.addrKorNm1}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.addrKorNm2}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >tel +{this.state.telNo}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >fax +{this.state.faxNo}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' >Mobile {this.state.hpNo}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' > {this.state.email}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' >www.skhynix.com</td></tr>                                     
                          </tbody>
                        </table>
        </div>
      );
  }
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='BA' || this.props.siteInfoRow.CARD_TYPE_CD ==='BB') {
    return (
      <div>
                     <table>
                       <tbody>
                             <tr><td  width='280' ></td><td  width='380' >{this.state.reqstChnNm}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{`${this.state.jwKorNm} || ${this.state.tmKorNm}` }</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.state.addrKorNm1}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.state.addrKorNm2}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >tel +{this.state.telNo}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >fax +{this.state.faxNo}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' >Mobile {this.state.hpNo}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' > {this.state.email}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' >www.skhynix.com</td></tr>                                     
                        </tbody>
                      </table>
      </div>
    );
  }
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='CA' || this.props.siteInfoRow.CARD_TYPE_CD ==='CB') {
    return (
      <div>
                     <table>
                       <tbody>
                             <tr><td  width='280' ></td><td  width='380' >{this.state.reqstChnNm}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.state.licKorNm}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{`${this.state.jwKorNm} || ${this.state.tmKorNm}` }</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.state.addrKorNm1}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.state.addrKorNm2}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >tel +{this.state.telNo}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >fax +{this.state.faxNo}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' >Mobile {this.state.hpNo}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' > {this.state.email}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' >www.skhynix.com</td></tr>                                     
                        </tbody>
                      </table>
      </div>
    );
  }
  return '';
 }

//----------------------------- 뒷면미리보기 ---------------------------------
ShowSetFormatterTAILview = () => {
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='AA' || this.props.siteInfoRow.CARD_TYPE_CD ==='AB'||
      this.props.siteInfoRow.CARD_TYPE_CD ==='BA' || this.props.siteInfoRow.CARD_TYPE_CD ==='BB') {
      return (
        <div>
                       <table>
                         <tbody>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.reqstEngNm}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.jwEngNm}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.tmEngNm}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.addrEngNm1}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.addrEngNm2}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >tel +{this.state.telNo}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >fax +{this.state.faxNo}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' >Mobile {this.state.hpNo}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' > {this.state.email}</td></tr>      
                          </tbody>
                        </table>
        </div>
      );
  }
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='CA' || this.props.siteInfoRow.CARD_TYPE_CD ==='CB' ) {
      return (
        <div>
                       <table>
                         <tbody>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.reqstEngNm}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.licEngNm}</td></tr>                               
                               <tr><td  width='280' ></td><td  width='380' >{this.state.jwEngNm}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.tmEngNm}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.addrEngNm1}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.state.addrEngNm2}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >tel +{this.state.telNo}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >fax +{this.state.faxNo}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' >Mobile {this.state.hpNo}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' > {this.state.email}</td></tr>      
                          </tbody>
                        </table>
        </div>
      );
   }
   return '';
  }

//================================================================================================
  render() {
    console.log(this.props);
    
    const bInfo = {
    //  BC_ITEM: this.props.siteInfoRow.CARD_TYPE_CD,
    //  BC_ID: this.props.siteInfoRow.CARD_REQST_NO,
    };

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
    const title = '명함신청  수정';

    return (
      <div> <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
       <StyleVGroup>
       <h3 className="pageTitle">{title}   </h3>
       <div className="buttonWrapper">
            <React.Fragment>
              <div style={{ float: 'right' }}>  <LinkBtnLgtGray onClick={this.onClickToList}>목 록</LinkBtnLgtGray>   </div>
              <div className="buttonWrapper">
                       <div style={{ float: 'right' }}>  <BtnDkGray onClick={this.udtConfirm}>저 장</BtnDkGray>  </div>
              </div>
            </React.Fragment>
        </div>

          <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 110px)' }}>

          <table> 
            <tr> 
                 <td style={{ width: '33%' }}>
                      <div className="tmp1" style={{visibility: 'visible', width: '100%', height: 'calc(100vh - 110px)' }} >
                          <h4>[앞면]</h4>
                          -------------------------------------------------------------------
                          {this.ShowSetFormatterHEAD()}

                          <hr color='green'></hr>
                          <h4>[신청내용]</h4>
                          -------------------------------------------------------------------
                          {this.ShowSetFormatterETC()}

                      </div>
                 </td>
                 <td style={{ width: '33%' }}>
                      <div className="tmp2" style={{visibility: 'visible', width: '100%', height: 'calc(100vh - 110px)' }} >
                          <h4>[뒷면]</h4>
                          -------------------------------------------------------------------
                          {this.ShowSetFormatterTAIL()}
                      </div>
                 </td>
                 <td style={{ width: '33%' }}>
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
                                        <img  alt="앞면"    src={bcbg_f}   style={{ width: 320, height:70,}}   />
                                        {this.ShowSetFormatterHEADview()}
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
                                        <img  alt="뒷면"    src={bcbg_b}   style={{ width: 320, height:70,}}   />
                                        {this.ShowSetFormatterTAILview()}
                                      </td>
                                  </tr>

                              </tbody>
                          </table>
                      </div>
                 </td>
            </tr>      
          </table>
          </div>   
       </StyleVGroup>               


      </div>    
    );
  }

}

const mapDispatchToProps = dispatch => (
  {
    getBcInfo: BC_ID =>
      dispatch(actions.getBcInfo(BC_ID)),

     udtGlobalMsg: (CARD_TYPE_CD, 
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
                    history
                   ) =>
      dispatch(actions.udtGlobalMsg(CARD_TYPE_CD, 
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
                                    history
                                  )),
  }
);

const mapStateToProps = createStructuredSelector({
  siteInfoRow: selectors.makeSelectSiteInfo(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'BcEditUp', saga });
const withReducer = injectReducer({ key: 'BcEditUp', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BcinfoEdit);


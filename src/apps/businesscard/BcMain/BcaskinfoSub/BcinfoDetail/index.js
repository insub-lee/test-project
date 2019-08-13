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
import { LinkBtnDkGray,LinkBtnLgtGray, BtnDelete } from 'containers/store/components/uielements/buttons.style';
import bcbg_b from 'apps/businesscard/images/bc_B.png';
import bcbg_f from 'apps/businesscard/images/bc_F.png';

import StyleNotifyAdminDtl from './StyleNotifyAdminDtl';
import StyleNotifyAdminForm from './StyleNotifyAdminForm';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';


import StyleVGroup from './StyleVGroup';
import StyleVGroupForm from './StyleVGroupForm';



const FormItem = Form.Item;
const { TextArea } = Input;

class BcinfoDetail extends React.Component {
//  class BcinfoList extends PureComponent {
  constructor(prop) {
    super(prop);
    // 공통코드 목록에서 넘어온 Data
    const location = this.props.history.location.state;

    console.log('#####################[BcinfoDetail....]#######################');

    console.log('BcinfoDetail_location', location);

   // BCR-151019-0005

    this.state = {
      BC_ID: location.BC_ID,
     // BC_ID:'BCR-151019-0005',
      //BC_ID:'BCR-151020-0007',
      listSortColumn: location.sortColumnParam,
      listSortDirection: location.sortDirectionParam,
      listKeywordType: location.keywordType,
      listKeyword: location.keyword,
    };
    // 화면 로드 시 데이터 가져옴
    //this.props.getNotifyMsg(location.BC_ID);
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
      pathname: `/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub`, state: data,
    });
  }

  delConfirm = () => {
    feed.showConfirm(`삭제 하시겠습니까 ?`, '', this.delGlobalMsg);
  }

  delGlobalMsg = () => {
    const delKeys = [this.state.BC_ID];
    this.props.delGlobalMsg(delKeys, this.props.history);
  }

  //-------------------직무표기---------------------
  ShowJM_YN = () => {  
    if (this.props.siteInfoRow.JM_YN ==='Y' ){  
          return (
                <div>
                  <Input value={this.props.siteInfoRow.JM_KOR_NM}   />
                </div>
          );  
    }  
    if (this.props.siteInfoRow.JM_YN ==='N' ){      
      return (
             <div>
             <Input value='미표기'   />
           </div>
      );
    }  
    return '';      
  }

  //-------------------직책표기---------------------
  ShowJC_YN = () => {  
    if (this.props.siteInfoRow.JC_YN ==='Y' ){  
          return (
                <div>
                  <Input value={this.props.siteInfoRow.PL_GBN}   />
                </div>
          );  
    }  
    if (this.props.siteInfoRow.JC_YN ==='N' ){      
      return (
             <div>
             <Input value='미표기'   />
           </div>
      );
    }  
    return '';      
  }
  
  JC_YN

//----------------------------- 앞면 ---------------------------------
  ShowSetFormatterHEAD = () => {
    if (this.props.siteInfoRow.CARD_TYPE_CD ==='AA' || this.props.siteInfoRow.CARD_TYPE_CD ==='AB') {
        return (
          <div>
                         <table>
                           <tbody>
                                 <tr><td  width='80' >신청번호</td><td><Input value={this.props.siteInfoRow.CARD_REQST_NO} readOnly /></td></tr>
                                 <tr><td  width='80' >성 명</td><td><Input value={`${this.props.siteInfoRow.REQST_KOR_NM}    (${this.props.siteInfoRow.REQST_ID})` } readOnly /> </td></tr>
                                 <tr><td  width='80' >직 위</td><td><Input value={this.props.siteInfoRow.JW_KOR_NM} readOnly /></td></tr>
                                 <tr><td  width='80' >팀</td><td><Input value={this.props.siteInfoRow.TM_KOR_NM} readOnly /></td></tr>
                                 <tr><td  width='80' >주소</td><td><Input value={this.props.siteInfoRow.ADDR_KOR_NM1} readOnly />
                                                                   <Input value={this.props.siteInfoRow.ADDR_KOR_NM2} readOnly /></td></tr>
                                 <tr><td  width='80' >Tel</td><td><Input value={this.props.siteInfoRow.TEL_NO} readOnly /></td></tr>
                                 <tr><td  width='80' >Fax</td><td><Input value={this.props.siteInfoRow.FAX_NO} readOnly /></td></tr>
                                 <tr><td  width='80' >Mobile</td><td><Input value={this.props.siteInfoRow.HP_NO} readOnly /></td></tr>
                                 <tr><td  width='80' >E-mail</td><td><Input value={this.props.siteInfoRow.EMAIL} readOnly /></td></tr>
                                 <tr><td  width='80' >직 무</td><td>{this.ShowJM_YN()}</td></tr>
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
                               <tr><td  width='80' >신청번호</td><td><Input value={this.props.siteInfoRow.CARD_REQST_NO} readOnly /></td></tr>
                               <tr><td  width='80' >성 명</td><td><Input value={`${this.props.siteInfoRow.REQST_KOR_NM}    (${this.props.siteInfoRow.REQST_ID})` } readOnly /> </td></tr>
                               <tr><td  width='80' >한자명</td><td><Input value={this.props.siteInfoRow.REQST_CHN_NM} readOnly /></td></tr>
                               <tr><td  width='80' >직 위</td><td><Input value={this.props.siteInfoRow.JW_KOR_NM} readOnly /></td></tr>
                               <tr><td  width='80' >팀</td><td><Input value={this.props.siteInfoRow.TM_KOR_NM} readOnly /></td></tr>
                               <tr><td  width='80' >주소</td><td><Input value={this.props.siteInfoRow.ADDR_KOR_NM1} readOnly />
                                                                 <Input value={this.props.siteInfoRow.ADDR_KOR_NM2} readOnly /></td></tr>
                               <tr><td  width='80' >Tel</td><td><Input value={this.props.siteInfoRow.TEL_NO} readOnly /></td></tr>
                               <tr><td  width='80' >Fax</td><td><Input value={this.props.siteInfoRow.FAX_NO} readOnly /></td></tr>
                               <tr><td  width='80' >Mobile</td><td><Input value={this.props.siteInfoRow.HP_NO} readOnly /></td></tr>
                               <tr><td  width='80' >E-mail</td><td><Input value={this.props.siteInfoRow.EMAIL} readOnly /></td></tr>
                               <tr><td  width='80' >직 무</td><td>{this.ShowJM_YN()}</td></tr>
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
                              <tr><td  width='80' >신청번호</td><td><Input value={this.props.siteInfoRow.CARD_REQST_NO} readOnly /></td></tr>
                              <tr><td  width='80' >성 명</td><td><Input value={`${this.props.siteInfoRow.REQST_KOR_NM}    (${this.props.siteInfoRow.REQST_ID})` } readOnly /> </td></tr>
                              <tr><td  width='80' >자격사항</td><td><Input value={this.props.siteInfoRow.LIC_KOR_NM} readOnly /></td></tr>
                              <tr><td  width='80' >직 위</td><td><Input value={this.props.siteInfoRow.JW_KOR_NM} readOnly /></td></tr>
                              <tr><td  width='80' >팀</td><td><Input value={this.props.siteInfoRow.TM_KOR_NM} readOnly /></td></tr>
                              <tr><td  width='80' >주소</td><td><Input value={this.props.siteInfoRow.ADDR_KOR_NM1} readOnly />
                                                                <Input value={this.props.siteInfoRow.ADDR_KOR_NM2} readOnly /></td></tr>
                              <tr><td  width='80' >Tel</td><td><Input value={this.props.siteInfoRow.TEL_NO} readOnly /></td></tr>
                              <tr><td  width='80' >Fax</td><td><Input value={this.props.siteInfoRow.FAX_NO} readOnly /></td></tr>
                              <tr><td  width='80' >Mobile</td><td><Input value={this.props.siteInfoRow.HP_NO} readOnly /></td></tr>
                              <tr><td  width='80' >E-mail</td><td><Input value={this.props.siteInfoRow.EMAIL} readOnly /></td></tr>
                              <tr><td  width='80' >직 무</td><td>{this.ShowJM_YN()}</td></tr>
                          </tbody>
                        </table>
        </div>
      );
    }
 
   return '';
  }

  
//----------------------------- 뒤면 ---------------------------------
  ShowSetFormatterTAIL = () => {
    if (this.props.siteInfoRow.CARD_TYPE_CD ==='AA' || this.props.siteInfoRow.CARD_TYPE_CD ==='AB' || this.props.siteInfoRow.CARD_TYPE_CD ==='BA' || this.props.siteInfoRow.CARD_TYPE_CD ==='BB') {
        return (
          <div>
                         <table>
                           <tbody>
                                 <tr><td  width='80' >성명(영문)</td><td><Input value={this.props.siteInfoRow.REQST_ENG_NM} readOnly /> </td></tr>
                                 <tr><td  width='80' >직 위</td><td><Input value={this.props.siteInfoRow.JW_ENG_NM} readOnly /></td></tr>
                                 <tr><td  width='80' >팀</td><td><Input value={this.props.siteInfoRow.TM_ENG_NM} readOnly /></td></tr>
                                 <tr><td  width='80' >주소</td><td><Input value={this.props.siteInfoRow.ADDR_ENG_NM1} readOnly />
                                                                   <Input value={this.props.siteInfoRow.ADDR_ENG_NM2} readOnly /></td></tr>
                                 <tr><td  width='80' >Tel</td><td><Input value={this.props.siteInfoRow.TEL_NO} readOnly /></td></tr>
                                 <tr><td  width='80' >Fax</td><td><Input value={this.props.siteInfoRow.FAX_NO} readOnly /></td></tr>
                                 <tr><td  width='80' >Mobile</td><td><Input value={this.props.siteInfoRow.HP_NO} readOnly /></td></tr>
                                 <tr><td  width='80' >E-mail</td><td><Input value={this.props.siteInfoRow.EMAIL} readOnly /></td></tr>
                                 <tr><td  width='80' >직무</td><td><Input value={this.props.siteInfoRow.JM_ENG_NM} readOnly /> </td></tr>                                 
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
                               <tr><td  width='80' >성명(영문)</td><td><Input value={this.props.siteInfoRow.REQST_ENG_NM} readOnly /> </td></tr>
                               <tr><td  width='80' >자격사항</td><td><Input value={this.props.siteInfoRow.LIC_ENG_NM} readOnly /></td></tr>
                               <tr><td  width='80' >직 위</td><td><Input value={this.props.siteInfoRow.JW_ENG_NM} readOnly /></td></tr>
                               <tr><td  width='80' >팀</td><td><Input value={this.props.siteInfoRow.TM_ENG_NM} readOnly /></td></tr>
                               <tr><td  width='80' >주소</td><td><Input value={this.props.siteInfoRow.ADDR_ENG_NM1} readOnly />
                                                                 <Input value={this.props.siteInfoRow.ADDR_ENG_NM2} readOnly /></td></tr>
                               <tr><td  width='80' >Tel</td><td><Input value={this.props.siteInfoRow.TEL_NO} readOnly /></td></tr>
                               <tr><td  width='80' >Fax</td><td><Input value={this.props.siteInfoRow.FAX_NO} readOnly /></td></tr>
                               <tr><td  width='80' >Mobile</td><td><Input value={this.props.siteInfoRow.HP_NO} readOnly /></td></tr>
                               <tr><td  width='80' >E-mail</td><td><Input value={this.props.siteInfoRow.EMAIL} readOnly /></td></tr>
                               <tr><td  width='80' >직무</td><td><Input value={this.props.siteInfoRow.JM_ENG_NM} readOnly /> </td></tr>                                 
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
                               <tr><td  width='180' >수령 방법</td><td><Input value={this.props.siteInfoRow.CARD_RCV_NM} readOnly /></td></tr>
                               <tr><td  width='180' >명함 배송건물</td><td><Input value={this.props.siteInfoRow.BULDING_NM} readOnly /></td></tr>
                               <tr><td  width='80' >직 무</td><td>{this.ShowJC_YN()}</td></tr>
                               <tr><td  width='180' >메모(출장 및 긴급 등 요청사항)</td><td><Input value={this.props.siteInfoRow.MEMO_DESC} readOnly /></td></tr>
                               <tr><td  width='180' >신청수량</td><td><Input value={this.props.siteInfoRow.REQST_QTY} readOnly /></td></tr>
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
                               <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.REQST_KOR_NM}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{`${this.props.siteInfoRow.JW_KOR_NM} || ${this.props.siteInfoRow.TM_KOR_NM}` }</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.ADDR_KOR_NM1}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.ADDR_KOR_NM2}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >tel +{this.props.siteInfoRow.TEL_NO}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >fax +{this.props.siteInfoRow.FAX_NO}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' >Mobile {this.props.siteInfoRow.HP_NO}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' > {this.props.siteInfoRow.EMAIL}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' >www.skhynix.com</td></tr>                                     
                          </tbody>
                        </table>
        </div>
      );
  }
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='BA' || this.props.siteInfoRow.CARD_TYPE_CD ==='BB') {  //한자형
    return (
      <div>
                     <table>
                       <tbody>
                             <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.REQST_CHN_NM}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{`${this.props.siteInfoRow.JW_KOR_NM} || ${this.props.siteInfoRow.TM_KOR_NM}` }</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.ADDR_KOR_NM1}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.ADDR_KOR_NM2}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >tel +{this.props.siteInfoRow.TEL_NO}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >fax +{this.props.siteInfoRow.FAX_NO}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' >Mobile {this.props.siteInfoRow.HP_NO}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' > {this.props.siteInfoRow.EMAIL}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' >www.skhynix.com</td></tr>                                     
                        </tbody>
                      </table>
      </div>
    );
  }
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='CA' || this.props.siteInfoRow.CARD_TYPE_CD ==='CB') {  //별정
    return (
      <div>
                     <table>
                       <tbody>
                             <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.REQST_CHN_NM}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{`${this.props.siteInfoRow.JW_KOR_NM} || ${this.props.siteInfoRow.TM_KOR_NM}` }</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.ADDR_KOR_NM1}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.ADDR_KOR_NM2}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >tel +{this.props.siteInfoRow.TEL_NO}</td></tr>
                             <tr><td  width='280' ></td><td  width='380' >fax +{this.props.siteInfoRow.FAX_NO}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' >Mobile {this.props.siteInfoRow.HP_NO}</td></tr>      
                             <tr><td  width='280' ></td><td  width='380' > {this.props.siteInfoRow.EMAIL}</td></tr>      
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
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='AA' || 
      this.props.siteInfoRow.CARD_TYPE_CD ==='AB' ||
      this.props.siteInfoRow.CARD_TYPE_CD ==='BA' ||
      this.props.siteInfoRow.CARD_TYPE_CD ==='BB' ||
      this.props.siteInfoRow.CARD_TYPE_CD ==='CA' ||
      this.props.siteInfoRow.CARD_TYPE_CD ==='CB') {
      return (
        <div>
                       <table>
                         <tbody>
                               <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.REQST_ENG_NM}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.JW_ENG_NM}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.TM_ENG_NM}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.ADDR_ENG_NM1}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >{this.props.siteInfoRow.ADDR_ENG_NM2}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >tel +{this.props.siteInfoRow.TEL_NO}</td></tr>
                               <tr><td  width='280' ></td><td  width='380' >fax +{this.props.siteInfoRow.FAX_NO}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' >Mobile {this.props.siteInfoRow.HP_NO}</td></tr>      
                               <tr><td  width='280' ></td><td  width='380' > {this.props.siteInfoRow.EMAIL}</td></tr>      
                          </tbody>
                        </table>
        </div>
      );
  }
  if (this.props.siteInfoRow.CARD_TYPE_CD ==='CB') {
    return (
      <div>

      </div>
    );
}
 return '';
}

//================================================================================================
  render() {
    console.log(this.props);
    
    const bInfo = {
      BC_ITEM: this.props.siteInfoRow.CARD_TYPE_CD,
      BC_ID: this.props.siteInfoRow.CARD_REQST_NO,
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
    const title = '신청명함 상세 정보';

    return (
      <div>         <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
       <StyleVGroup>
       <h3 className="pageTitle">{title}  ( {this.props.siteInfoRow.CARD_TYPE_NM} ) </h3>
       <div className="buttonWrapper">
            <React.Fragment>
              <div style={{ float: 'right' }}>
                <LinkBtnLgtGray onClick={this.delConfirm}>
                  {'삭 제'}
                </LinkBtnLgtGray>
              </div>
              <div style={{ float: 'right' }}>
              <LinkBtnLgtGray onClick={this.onClickToList}>
                {'목록으로'}
              </LinkBtnLgtGray>
              </div>
              <div className="buttonWrapper">
                 <LinkBtnDkGray
                    style={{ float: 'right' }}
                    onClick={() => this.props.history.push({ pathname: `/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub/BcinfoEdt`, search: 'U', state: bInfo })}
                   >수 정
                 </LinkBtnDkGray>
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
    //getSiteInfo: siteId => dispatch(actions.getSiteInfo(siteId)),
    getBcInfo: BC_ID =>
      dispatch(actions.getBcInfo(BC_ID)),

    delGlobalMsg: (delKeys, history) =>
      dispatch(actions.delGlobalMsg(delKeys, history)),

  }
);

const mapStateToProps = createStructuredSelector({
  siteInfoRow: selectors.makeSelectSiteInfo(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'SiteInfo', saga });
const withReducer = injectReducer({ key: 'SiteInfo', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BcinfoDetail);

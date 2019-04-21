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
import { Form, Radio, Input } from 'antd';
import StyleGlobalAdminDtl from './StyleGlobalAdminDtl';
import StyleGlobalAdminForm from './StyleGlobalAdminForm';
import { LinkBtnLgtGray, BtnDkGray, BtnDelete, LinkBtnList,LinkBtnDkGray } from './buttons.style';

import messages from './messages';

import AntRadiobox from 'containers/store/components/uielements/radiobox.style';

import AA_Item from 'apps/businesscard/images/aa.PNG';
import BA_Item from 'apps/businesscard/images/ba.PNG';
import CA_Item from 'apps/businesscard/images/ca.PNG';
import aa_v from 'apps/businesscard/images/aa_v.PNG';
import ab_v from 'apps/businesscard/images/ab_v.PNG';
import ba_v from 'apps/businesscard/images/ba_v.PNG';
import bb_v from 'apps/businesscard/images/bb_v.PNG';
import ca_v from 'apps/businesscard/images/ca_v.PNG';
import cb_v from 'apps/businesscard/images/cb_v.PNG';

//import reducer from './reducer';
//import saga from './saga';
//import * as selectors from './selectors';
//import * as actions from './actions';


const FormItem = Form.Item;
const { TextArea } = Input;

class BcSelectItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      VIEW_TYPE: 'AA',
      BC_ITEM: '',
    }
      this.onChangeTheme = this.onChangeTheme.bind(this);

  }
//----------------------------------------------------------------
  onClickToList = () => {
    const data = {
      BC_ITEM: this.state.VIEW_TYPE,
    };
    console.log("###############111 VIEW_TYPE:"+this.state.VIEW_TYPE);
    console.log("###############222 BC_ITEM:"+this.state.BC_ITEM);

    this.props.history.push({
      pathname: '/apps/businesscard/BcMain/BcaskinfoSub/BcinfoReg', search: 'I', state: data,
    });
  }
 
//--------------------------------------------------------------------  
   onChangeTheme(e) {
    this.setState({
      VIEW_TYPE: e.target.value,
      BC_ITEM: e.target.value,
    });
   }
//--------------------------------------------------------------------  


//----------------------------- 미리보기 ---------------------------------
ShowBcTypeView = () => {
  console.log("######################미리보기#################################");
    if (this.state.VIEW_TYPE ==='AA' || this.state.VIEW_TYPE ==='') {
      return ( <img  alt="한글형"    src={aa_v}   style={{ width: 900, height:300,}}   />     );
    }
    if (this.state.VIEW_TYPE ==='AB') {
      return ( <img  alt="한글확대형"    src={ab_v}   style={{ width: 900, height:200,}}   />     );
    }
    if (this.state.VIEW_TYPE ==='BA') {
      return ( <img  alt="한자형"    src={ba_v}   style={{ width: 900, height:300,}}   />     );
    }
    if (this.state.VIEW_TYPE ==='BB') {
      return ( <img  alt="한자확대형"   src={bb_v}   style={{ width: 900, height:200,}}   />     );
    }

    if (this.state.VIEW_TYPE ==='CA') {
      return ( <img  alt="별정형"   src={ca_v}   style={{ width: 900, height:300,}}   />     );
    }
    if (this.state.VIEW_TYPE ==='CB') {
      return ( <img  alt="별정형확대형"   src={cb_v}   style={{ width: 900, height:200,}}   />     );
    }

    return '';
}

//------------------------------------------------------------------------
  render() {
    console.log(this.props);

    const bInfo = {
      BC_ITEM: this.state.VIEW_TYPE,
      MSG_KEY: '',
      DSCR_KOR: '',
      DSCR_ENG: '',
      DSCR_CHN: '',
    };
	
    return (
      <div>
        <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
          <StyleGlobalAdminDtl>
          <h3 className="pageTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명함 유형을 선택 하세요 
            <LinkBtnDkGray
                        style={{ float: 'right' }}
                        onClick={() => this.props.history.push({ pathname: '/apps/businesscard/BcMain/BcaskinfoSub/BcinfoReg', search: 'I', state: bInfo })}
            >명함신청
            </LinkBtnDkGray>
            </h3>

          <StyleGlobalAdminForm >
            <Form>
              <table align='right'>
                <tr>
                    <td width="310">
                        {/*한글형*/}  
                        <img  alt="한글형"    src={AA_Item}   style={{ width: 300, height:170,}}   />
                    </td>
                    <td width="310">
                        {/*한자형*/}  
                        <img  alt="한자형"    src={BA_Item}   style={{ width: 300, height:170,}}   />                        
                    </td>
                    <td width="310">
                        {/*별정형*/}  
                        <img  alt="별정형"    src={CA_Item}   style={{ width: 300, height:170,}}   />                        
                    </td>
                  </tr>

                  <tr>
                    <td align="center">
                        {/*한글형*/}  
                        <input type="radio" name="CARD_TYPE_CD" onChange={this.onChangeTheme} value="AA" />기본형&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="CARD_TYPE_CD" onChange={this.onChangeTheme} value='AB' />성명확대형
                    </td>
                    <td align="center">
                        {/*한자형*/}  
                        <input type="radio" name="CARD_TYPE_CD"  onChange={this.onChangeTheme} value="BA" />기본형&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="CARD_TYPE_CD"  onChange={this.onChangeTheme} value='BB' />성명확대형
                    </td>
                    <td align="center">
                        {/*별정형*/}  
                        <input type="radio" name="CARD_TYPE_CD"  onChange={this.onChangeTheme} value="CA" />기본형&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="CARD_TYPE_CD"  onChange={this.onChangeTheme} value='CB' />성명확대형
                    </td>
                  </tr>
              </table>
              <table width="930" align='right'>
                <tr>
                    <td>
                           <hr color ='red'></hr>
                    </td>
                  </tr>
                <tr>
                    <td>
                      {this.ShowBcTypeView()}
                    </td>
                  </tr>
              </table>

            </Form>
          </StyleGlobalAdminForm>
        </StyleGlobalAdminDtl>
      </div>        
    );
  }
}

export default BcSelectItem;


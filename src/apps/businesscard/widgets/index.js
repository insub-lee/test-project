import React, { PureComponent } from 'react';
import { compose } from 'redux';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Link } from 'react-router-dom';
import CarouselWrapper from './carousel.style';
import Carousels from './carousel';
import { BannerWrapper } from './bannerStyle';

import { basicPath } from 'containers/common/constants';
import * as selectors from './selectors';
import * as actions from './actions';
import * as feed from 'components/Feedback/functions';
import { intlObj, lang} from 'utils/commonUtils';
import messages from './messages';

import reducer from './reducer';
import saga from './saga';

import bcbg_b from 'apps/businesscard/images/bc_B.png';
import bcbg_f from 'apps/businesscard/images/bc_F.png';

const Carousel = props => (
  <CarouselWrapper>
    <Carousels {...props} />
  </CarouselWrapper>
);

// class BcMain extends PureComponent {
class BcMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageType: 'widget',

      cardTypeCd: 'AA',   //명함종류
      reqstId: '',      //사번
      
      reqstKorNm: '',   //성명
      reqstEngNm: '',   //성명(영문)
      jwKorNm: '',
      jwEngNm: '',
      tmKorNm: '',
      tmEngNm: '',
      addrKorNm1: '',
      addrKorNm2: '',   //주소2
      
      addrEngNm1: '',
      addrEngNm2: '',   //주소2(영문)
      
      telNo: '',
      faxNo: '',
      hpNo: '',
      email: '',

      jmYN: 'N',         //직무 표기_미표기
      jmKornm: '',      //직무
      jmEngnm: '',      //직무(영문)
      cardRcvCd: 'A',    //수령방법_사내문서수발
      buldingNm: '',    //명함배송건물
      jcYN:'N',         // 직책 표기유무
      jcKorNm: '',     // 직책
      plUnKorNm: '',    // PL단위업무한글명
      menoDesc: '',     // 메모
      reqstQty: '50',   // 신청수량
      reqstChnNm:'',    // 신청자한자명
      plGbn:'',         // pl구분
      licKorNm:'',      // 자격사항한글명
      licEngNm:'',      // 자격사항영문명
      // fileId1:'',       // 첨부파일1
      // fileId2:'',       // 첨부파일2
    };

    this.props.getList(
      this.state.pageType,
    );

    this.props.getUserInfoList();

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.reqstId !== nextProps.getUserInfoRow.EMP_ID) {
      this.setState({reqstId: nextProps.getUserInfoRow.EMP_ID });
    }
    if (this.state.reqstKorNm !== nextProps.getUserInfoRow.EMP_KOR_NM) {
      this.setState({ reqstKorNm: nextProps.getUserInfoRow.EMP_KOR_NM });
    }
    if (this.state.reqstEngNm !== nextProps.getUserInfoRow.EMP_ENG_NM) {
      this.setState({ reqstEngNm: nextProps.getUserInfoRow.EMP_ENG_NM });
    }
    if (this.state.jwKorNm !== nextProps.getUserInfoRow.JW_KOR_NM) {
      this.setState({ jwKorNm: nextProps.getUserInfoRow.JW_KOR_NM });
    }
    if (this.state.jwEngNm !== nextProps.getUserInfoRow.JW_ENG_NM) {
      this.setState({ jwEngNm: nextProps.getUserInfoRow.JW_ENG_NM });
    }
    if (this.state.tmKorNm !== nextProps.getUserInfoRow.DEPT_KOR_NM) {
      this.setState({ tmKorNm: nextProps.getUserInfoRow.DEPT_KOR_NM });
    }
    if (this.state.tmEngNm !== nextProps.getUserInfoRow.DEPT_ENG_NM) {
      this.setState({ tmEngNm: nextProps.getUserInfoRow.DEPT_ENG_NM });
    }
    if (this.state.addrKorNm1 !== nextProps.getUserInfoRow.ADDR_KOR_NM) {
      this.setState({ addrKorNm1: nextProps.getUserInfoRow.ADDR_KOR_NM });
    }
    if (this.state.addrEngNm1 !== nextProps.getUserInfoRow.ADDR_ENG_NM) {
      this.setState({ addrEngNm1: nextProps.getUserInfoRow.ADDR_ENG_NM });
    }
    if (this.state.telNo !== nextProps.getUserInfoRow.TEL_NO) {
      this.setState({ telNo: nextProps.getUserInfoRow.TEL_NO });
    }
    if (this.state.faxNo !== nextProps.getUserInfoRow.FAX_NO) {
      this.setState({ faxNo: nextProps.getUserInfoRow.FAX_NO });
    }
    if (this.state.hpNo !== nextProps.getUserInfoRow.MOBILE_NO) {
      this.setState({ hpNo: nextProps.getUserInfoRow.MOBILE_NO });
    }
    if (this.state.email !== nextProps.getUserInfoRow.EMAIL) {
      this.setState({ email: nextProps.getUserInfoRow.EMAIL });
    }
  }
  
    onApplyBtnClick = (e) => {
      feed.showConfirm(intlObj.get(messages.defaultRequest), intlObj.get(messages.confirmRequest), this.handleSave);
    }
    handleSave = () => {
      const {
        handleSaveBusinessCardRequest,
      } = this.props;
      //   initState=0;
  
      let bValidCode = this.vaildChk();
  
      if (bValidCode === 100) { 
        handleSaveBusinessCardRequest(
          this.state.cardTypeCd,
          this.state.reqstId,
          this.state.reqstKorNm,
          this.state.reqstEngNm,
          this.state.jwKorNm,
          this.state.jwEngNm,
          this.state.tmKorNm,
          this.state.tmEngNm,
          this.state.addrKorNm1,
          this.state.addrKorNm2,
          this.state.addrEngNm1,
          this.state.addrEngNm2,
          this.state.telNo,
          this.state.faxNo,
          this.state.hpNo,
          this.state.email,
          this.state.jmYN,
          this.state.jmKornm,
          this.state.jmEngnm,
          this.state.cardRcvCd,
          this.state.buldingNm,
          this.state.jcYN,
          this.state.jcKorNm,
          this.state.plUnKorNm,
          this.state.menoDesc,
          this.state.reqstQty,
          this.state.reqstChnNm,
          this.state.plGbn,
          this.state.licKorNm,
          this.state.licEngNm,
          // this.props.history,
        );
      } 
      else {
        if(bValidCode === 11)
          feed.error(intlObj.get(messages.confirmName));
        else if(bValidCode === 12)
          feed.error(intlObj.get(messages.confirmJw));
        else if(bValidCode === 13)
          feed.error(intlObj.get(messages.confirmDept));
        else if(bValidCode === 14)
          feed.error(intlObj.get(messages.confirmTel));
        else if(bValidCode === 15)
          feed.error(intlObj.get(messages.confirmMail));
      }
    }
   
    vaildChk = () => {
      if((this.state.reqstKorNm.trim() === null || this.state.reqstKorNm.trim() === '') || (this.state.reqstEngNm.trim() === null || this.state.reqstEngNm.trim() === '')){
        return 11;
      }
      if((this.state.jwKorNm.trim() === null || this.state.jwKorNm.trim() === '') || (this.state.jwEngNm.trim() === null || this.state.jwEngNm.trim() === '')){
        return 12;
      }
      if((this.state.tmKorNm.trim() === null || this.state.tmKorNm.trim() === '') || (this.state.tmEngNm.trim() === null || this.state.tmEngNm.trim() === '')){
        return 13;
      }
      if((this.state.telNo.trim() === null || this.state.telNo.trim() === '') && (this.state.reqstEngNm.trim() === null || this.state.reqstEngNm.trim() === '')
          && (this.state.hpNo.trim() === null || this.state.hpNo.trim() === '')){
        return 14;
      }
      if((this.state.email.trim() === null || this.state.email.trim() === '')){
        return 15;
      }
      return 100;
    }
    // execPage = () => {
    //   console.log('5555555', this.props);
    //   this.props.history.push(`/apps/businesscard`);
  
    //   // this.props.history.push({
    //   //   pathname: '/apps/businesscard',
    //   //   //pathname: '/portal/intlSVC/bookroom', state: data,
    //   // }); 
    // }
  
    // getContent = (item) => {
    //     if (item.length > 0) {
    //       let itemData = item;
    //       let itemNum = itemData.length;
    //       for (var i = 0; i < itemNum; i++) {
    //         if (i == 0) {
    //               return 
    //                 <td>
    //                 {itemData.CARD_STD_NM} : {itemData.CNT} 건
    //                 </td>
    //               ;
    //         } else if (i == 1) {
    //           return 
    //           <td>
    //           ( {itemData.CARD_STD_NM} : {itemData.CNT} 건
    //           </td>
    //           ;
    //         } else if (i == 2) {
    //           return 
    //           <td>
    //             {itemData.CARD_STD_NM} : {itemData.CNT} 건 )
    //           </td>
    //           ;
    //         }
    //       }
    //     }
    // }

  render() {
    // console.log(this.props);
    const toBcaskinfoSub = {
      pathname : "/apps/businesscard/BcMain/BcaskinfoSub",
      param : "fromWidget",
    };

    const toBusinesscard = {
      pathname : "/apps/businesscard",
    };

    return (
      <div>
        <table>
          <tbody>
          {
            // (this.props.getRow === null || this.props.getRow === 'undefined'
            //   || this.props.getRow === undefined || this.props.getRow === '') ?
            (this.props.getRow.length === 0) ?
            <tr>
              <td>
              {intlObj.get(messages.myRequest)} : 0 {intlObj.get(messages.count)}
              </td>
            </tr>
            :
            // <tr>
            //   {divisionContent}
            // </tr>
            // {reqList.rownum && '('}              
            // <a onClick={() => this.execPage()}>{reqList.CNT} 건</a>
            // <Link to="/apps/businesscard/BcMain/BcaskinfoSub/:widgets">{reqList.CNT} 건</Link>
            <tr>
            {
            this.props.getRow.map((reqList, index) => (
              <td key={index}>
                {
                  (reqList.ROWNUM === 2) && '('}{(reqList.ROWNUM === 3) && ', '}
                  {lang.get('CARD_STD_NM', reqList)} : <Link to={toBcaskinfoSub}><u>{reqList.CNT} {intlObj.get(messages.count)}</u></Link>
                  {(reqList.ROWNUM === this.props.getRow.length) && ')'
                }
              </td>
            ))
            }
            </tr>
          }
          </tbody>
        </table>
        <div>
        <BannerWrapper>
          {
            <div className="carouselWrapper">
              <Carousel
                // arrows
                dots={true}
                slidesToShow={1}
                adaptiveHeight
                afterChange={this.onChange}
                // autoplay
              >
                {/* <img class="img-responsive"  alt="앞면"    src={bcbg_f}   />
                <img class="img-responsive"  alt="뒷면"    src={bcbg_b}   /> */}
                <div className="carousel-inner">
                {
                  // (this.props.getUserInfoRow.length === 0) ?
                  //   <div class="item-front">
                  //     {/* <div class="item-name">홍길동</div>
                  //     <div class="item-jw-dept">책임/기업문화실/기업문화팀</div>
                  //     <div class="item-addr">경기도 이천시 부발읍 경충대로 2091</div>
                  //     <div class="item-tel">tel 02-3459-1234</div> */}
                  //     {/* <div class="item-fax">fax 02-3459-1235</div> */}
                  //     {/* <div class="item-mobile">mobile 011-987-1234</div>
                  //     <div class="item-email">gdhong@skhynix.com</div>
                  //     <div class="item-homepage">www.skhynix.com</div> */}
                  //   </div>
                  //   :
                  // this.props.getUserInfoRow.map(reqUserList => (
                  //   <div class="item-front">      
                  //     <div class="item-name">{reqUserList.EMP_KOR_NM === ' ' ? '\u00A0' : reqUserList.EMP_KOR_NM}</div>
                  //     <div class="item-jw-dept">{reqUserList.JW_KOR_NM}&nbsp;/&nbsp;{reqUserList.DEPT_KOR_NM}</div>
                  //     <div class="item-addr">{reqUserList.ADDR_KOR_NM} </div>
                  //     <div class="item-tel">tel {reqUserList.TEL_NO}</div>
                  //     {/* <div class="item-fax">fax {reqUserList.FAX_NO}</div> */}
                  //     <div class="item-mobile">mobile {reqUserList.MOBILE_NO}</div>
                  //     <div class="item-email">{reqUserList.EMAIL === ' ' ? '\u00A0' : reqUserList.EMAIL}</div>
                  //     <div class="item-homepage">{reqUserList.HOMEPAGE}</div>
                  //   </div>
                  // ))
                  <div className="item-front">      
                      <div className="item-name">{this.props.getUserInfoRow.EMP_KOR_NM === ' ' ? '\u00A0' : this.props.getUserInfoRow.EMP_KOR_NM}</div>
                      <div className="item-jw-dept">{this.props.getUserInfoRow.JW_KOR_NM}&nbsp;/&nbsp;{this.props.getUserInfoRow.DEPT_KOR_NM}</div>
                      <div className="item-addr">{this.props.getUserInfoRow.ADDR_KOR_NM} </div>
                      <div className="item-tel">tel {this.props.getUserInfoRow.TEL_NO}</div>
                      {/* <div class="item-fax">fax {reqUserList.FAX_NO}</div> */}
                      <div className="item-mobile">mobile {this.props.getUserInfoRow.MOBILE_NO}</div>
                      <div className="item-email">{this.props.getUserInfoRow.EMAIL === ' ' ? '\u00A0' : this.props.getUserInfoRow.EMAIL}</div>
                      <div className="item-homepage">{this.props.getUserInfoRow.HOMEPAGE}</div>
                    </div>
                }
                </div>
                <div className="carousel-inner">
                {
                  // (this.props.getUserInfoRow.length === 0) ?
                  //   <div class="item-back">
                  //     {/* <div class="item-name">홍길동</div>
                  //     <div class="item-jw-dept">책임/기업문화실/기업문화팀</div>
                  //     <div class="item-addr">경기도 이천시 부발읍 경충대로 2091</div>
                  //     <div class="item-tel">tel 02-3459-1234</div> */}
                  //     {/* <div class="item-fax">fax 02-3459-1235</div> */}
                  //     {/* <div class="item-mobile">mobile 011-987-1234</div>
                  //     <div class="item-email">gdhong@skhynix.com</div>
                  //     <div class="item-homepage">www.skhynix.com</div> */}
                  //   </div>
                  //   :
                  // this.props.getUserInfoRow.map(reqUserList => (
                  //   <div class="item-back">
                  //     <div class="item-name">{reqUserList.EMP_ENG_NM === ' '? '\u00A0' : reqUserList.EMP_ENG_NM}</div>
                  //     <div class="item-jw-dept">{reqUserList.JW_ENG_NM}&nbsp;/&nbsp;{reqUserList.DEPT_ENG_NM}</div>
                  //     <div class="item-addr">{reqUserList.ADDR_ENG_NM}</div>
                  //     <div class="item-tel">tel {reqUserList.TEL_NO}</div>
                  //     {/* <div class="item-fax">fax {reqUserList.FAX_NO}</div> */}
                  //     <div class="item-mobile">mobile {reqUserList.MOBILE_NO}</div>
                  //     <div class="item-email">{reqUserList.EMAIL === ' ' ? '\u00A0' : reqUserList.EMAIL}</div>
                  //     <div class="item-homepage">{reqUserList.HOMEPAGE}</div>
                  //   </div>
                  // ))
                  <div className="item-back">
                      <div className="item-name">{this.props.getUserInfoRow.EMP_ENG_NM === ' '? '\u00A0' : this.props.getUserInfoRow.EMP_ENG_NM}</div>
                      <div className="item-jw-dept">{this.props.getUserInfoRow.JW_ENG_NM}&nbsp;/&nbsp;{this.props.getUserInfoRow.DEPT_ENG_NM}</div>
                      <div className="item-addr">{this.props.getUserInfoRow.ADDR_ENG_NM}</div>
                      <div className="item-tel">tel {this.props.getUserInfoRow.TEL_NO}</div>
                      {/* <div class="item-fax">fax {reqUserList.FAX_NO}</div> */}
                      <div className="item-mobile">mobile {this.props.getUserInfoRow.MOBILE_NO}</div>
                      <div className="item-email">{this.props.getUserInfoRow.EMAIL === ' ' ? '\u00A0' : this.props.getUserInfoRow.EMAIL}</div>
                      <div className="item-homepage">{this.props.getUserInfoRow.HOMEPAGE}</div>
                    </div>
                }
                </div>
              </Carousel>
              {/* <div class='text-box'>
                <p class='dataNumber'> 111111 </p>
              </div> */}
              <div className="buttonWrapper">
                <button><Link to={toBusinesscard}>{intlObj.get(messages.link)}</Link></button>
                <button onClick={this.onApplyBtnClick}>{intlObj.get(messages.businessCardRequest)}</button>
                {/* <button onClick={this.regGlobalMsg}>명함신청</button> */}
              </div>
            </div>
          }
        </BannerWrapper>
        </div>
      </div>
    );
  }
}

BcMain.propTypes = {
  history: PropTypes.object,
  // getRow: PropTypes.array.isRequired,
  // getUserInfoRow: PropTypes.array.isRequired,
  // getRow: PropTypes.array,
  // getUserInfoRow: PropTypes.array,
  getRow: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  getUserInfoRow: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

BcMain.defaultProps = {
  getRow: [],
  getUserInfoRow: [],
}
const mapDispatchToProps = dispatch => (
  {
    getList: (
      pageType,
    ) => dispatch(actions.getList(
      pageType,
    )),
    getUserInfoList: () => dispatch(actions.getUserInfoList()),
    // historyPush: url => dispatch(push(url)),
    // handleSave: (this.props.getUserInfoRow) => dispatch(actions.getUserInfoList(this.props.getUserInfoRow)),
    handleSaveBusinessCardRequest: (
      cardTypeCd,
			reqstId,
			reqstKorNm,
			reqstEngNm,
			jwKorNm,
			jwEngNm,
			tmKorNm,
			tmEngNm,
			addrKorNm1,
			addrKorNm2,
			addrEngNm1,
			addrEngNm2,
			telNo,
			faxNo,
			hpNo,
			email,
			jmYN,
			jmKornm,
			jmEngnm,
			cardRcvCd,
			buldingNm,
			jcYN,
			jcKorNm,
			plUnKorNm,
			menoDesc,
			reqstQty,
			reqstChnNm,
			plGbn,
			licKorNm,
			licEngNm,
    ) => dispatch(actions.handleSaveBusinessCardRequest(
      cardTypeCd,
			reqstId,
			reqstKorNm,
			reqstEngNm,
			jwKorNm,
			jwEngNm,
			tmKorNm,
			tmEngNm,
			addrKorNm1,
			addrKorNm2,
			addrEngNm1,
			addrEngNm2,
			telNo,
			faxNo,
			hpNo,
			email,
			jmYN,
			jmKornm,
			jmEngnm,
			cardRcvCd,
			buldingNm,
			jcYN,
			jcKorNm,
			plUnKorNm,
			menoDesc,
			reqstQty,
			reqstChnNm,
			plGbn,
			licKorNm,
			licEngNm,
    )),
  }
);

const mapStateToProps = createStructuredSelector({
  getRow: selectors.makeSelectInfoList(),
  getUserInfoRow: selectors.makeSelectUserInfoList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'BcList', reducer });
const withSaga = injectSaga({ key: 'BcList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BcMain);

